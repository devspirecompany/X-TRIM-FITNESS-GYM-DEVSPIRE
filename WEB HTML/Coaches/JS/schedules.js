// Global Variables
let currentDate = new Date();
// Set default to November 2024 to show sample sessions
let currentMonth = 10; // November (0-indexed, so 10 = November)
let currentYear = 2024;
let currentView = 'calendar';
let currentSessionId = null;
let sessionToCancel = null;

// Sessions data
let sessionsData = {
    'session-1': {
        id: 'session-1',
        client: 'ashley-quicho',
        type: 'personal-training',
        title: 'Personal Training Session',
        date: '2024-11-05',
        startTime: '10:00',
        endTime: '11:00',
        location: 'main-training-area',
        notes: 'Focus on upper body strength and form correction',
        status: 'upcoming'
    },
    'session-2': {
        id: 'session-2',
        client: 'john-dela-cruz',
        type: 'personal-training',
        title: 'Muscle Building Program',
        date: '2024-11-06',
        startTime: '14:00',
        endTime: '15:00',
        location: 'weight-training-area',
        notes: 'Progressive overload focus - chest and back',
        status: 'upcoming'
    },
    'session-3': {
        id: 'session-3',
        client: 'maria-santos',
        type: 'consultation',
        title: 'Nutrition Consultation',
        date: '2024-11-07',
        startTime: '16:00',
        endTime: '17:00',
        location: 'office',
        notes: 'Review meal plan adjustments and progress',
        status: 'upcoming'
    },
    'session-4': {
        id: 'session-4',
        client: 'group',
        type: 'group-class',
        title: 'HIIT Group Class',
        date: '2024-11-08',
        startTime: '18:00',
        endTime: '19:00',
        location: 'cardio-zone',
        notes: 'High-intensity interval training with 8 participants',
        status: 'upcoming'
    }
};

const clients = {
    'ashley-quicho': 'Ashley Quicho',
    'john-dela-cruz': 'John Dela Cruz',
    'maria-santos': 'Maria Santos',
    'robert-lim': 'Robert Lim',
    'group': 'Group Session'
};

const typeNames = {
    'personal-training': 'Personal Training',
    'group-class': 'Group Class',
    'consultation': 'Consultation',
    'assessment': 'Assessment'
};

const locationNames = {
    'main-training-area': 'Main Training Area',
    'weight-training-area': 'Weight Training Area',
    'cardio-zone': 'Cardio Zone',
    'office': 'Office',
    'studio': 'Studio'
};

// Initialize Page
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeProfileDropdown();
    generateCalendar(currentMonth, currentYear);
    updateMonthYearDisplay();
    
    // Set minimum date for session date input
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const sessionDateInput = document.getElementById('sessionDate');
    if (sessionDateInput) {
        sessionDateInput.min = today.toISOString().split('T')[0];
    }
    
    // Set default view
    switchView('calendar');
});

// Sidebar Functionality
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    
    sidebar.addEventListener('mouseenter', function() {
        this.classList.add('expanded');
    });
    
    sidebar.addEventListener('mouseleave', function() {
        this.classList.remove('expanded');
    });
}

// Profile Dropdown
function toggleProfileDropdown() {
    const profile = document.getElementById('userProfileDropdown');
    if (profile) {
        profile.classList.toggle('active');
    }
}

function initializeProfileDropdown() {
    document.addEventListener('click', function(event) {
        const profile = document.getElementById('userProfileDropdown');
        if (profile && !profile.contains(event.target)) {
            profile.classList.remove('active');
        }
    });
}

// Switch View (Calendar/List)
function switchView(view) {
    currentView = view;
    const calendarView = document.getElementById('calendarView');
    const listView = document.getElementById('listView');
    const calendarBtn = document.getElementById('calendarViewBtn');
    const listBtn = document.getElementById('listViewBtn');
    
    if (view === 'calendar') {
        calendarView.style.display = 'block';
        listView.style.display = 'none';
        if (calendarBtn) calendarBtn.classList.add('active');
        if (listBtn) listBtn.classList.remove('active');
    } else {
        calendarView.style.display = 'none';
        listView.style.display = 'block';
        if (calendarBtn) calendarBtn.classList.remove('active');
        if (listBtn) listBtn.classList.add('active');
    }
}

// Calendar Functions
function generateCalendar(month, year) {
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return;
    
    calendarGrid.innerHTML = '';
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const today = new Date();
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month';
        day.innerHTML = `<div class="calendar-day-number">${daysInPrevMonth - i}</div>`;
        calendarGrid.appendChild(day);
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        
        const dayNumber = document.createElement('div');
        dayNumber.className = 'calendar-day-number';
        dayNumber.textContent = i;
        day.appendChild(dayNumber);
        
        // Check if it's today (highlight November 5, 2024 as "today" for demo)
        const isToday = (i === 5 && month === 10 && year === 2024) || 
                       (i === today.getDate() && month === today.getMonth() && year === today.getFullYear());
        if (isToday) {
            day.classList.add('today');
        }
        
        // Check if it has sessions
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const daySessions = getSessionsForDate(dateStr);
        
        if (daySessions.length > 0) {
            day.classList.add('has-session');
        }
        
        // Add click event only for days with sessions
        if (daySessions.length > 0) {
            day.addEventListener('click', function() {
                if (!this.classList.contains('other-month')) {
                    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                    this.classList.add('selected');
                    
                    // Show sessions in right panel
                    showDaySessionsInPanel(dateStr, daySessions);
                }
            });
        }
        
        calendarGrid.appendChild(day);
    }
    
    // Next month days
    const remainingCells = 42 - (firstDay + daysInMonth);
    if (remainingCells > 0) {
        for (let i = 1; i <= remainingCells; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day other-month';
            day.innerHTML = `<div class="calendar-day-number">${i}</div>`;
            calendarGrid.appendChild(day);
        }
    }
}

function getSessionsForDate(dateStr) {
    // Get all sessions for this date (prioritize upcoming, but show all)
    const allSessions = Object.values(sessionsData).filter(session => {
        return session.date === dateStr;
    });
    // Sort: upcoming first, then others
    return allSessions.sort((a, b) => {
        if (a.status === 'upcoming' && b.status !== 'upcoming') return -1;
        if (a.status !== 'upcoming' && b.status === 'upcoming') return 1;
        return 0;
    });
}

function updateMonthYearDisplay() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const monthYearElement = document.getElementById('currentMonthYear');
    if (monthYearElement) {
        monthYearElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    }
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
    updateMonthYearDisplay();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
    updateMonthYearDisplay();
}

function goToToday() {
    const today = new Date();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    generateCalendar(currentMonth, currentYear);
    updateMonthYearDisplay();
}

// Filter Sessions
let selectedDateFilter = null;

function filterSessions() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const clientFilter = document.getElementById('clientFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    const sessionCards = document.querySelectorAll('.session-card');
    
    sessionCards.forEach(card => {
        const sessionTitle = card.querySelector('h3').textContent.toLowerCase();
        const sessionNotes = card.querySelector('.session-notes')?.textContent.toLowerCase() || '';
        const client = card.getAttribute('data-client');
        const type = card.getAttribute('data-type');
        const status = card.getAttribute('data-status');
        const sessionDate = card.getAttribute('data-date');
        
        const matchesSearch = !searchTerm || 
            sessionTitle.includes(searchTerm) || 
            sessionNotes.includes(searchTerm) ||
            clients[client]?.toLowerCase().includes(searchTerm);
        
        const matchesClient = clientFilter === 'all' || client === clientFilter;
        const matchesType = typeFilter === 'all' || type === typeFilter;
        const matchesStatus = statusFilter === 'all' || status === statusFilter;
        const matchesDate = !selectedDateFilter || sessionDate === selectedDateFilter;
        
        if (matchesSearch && matchesClient && matchesType && matchesStatus && matchesDate) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterSessionsByDate(dateStr) {
    selectedDateFilter = dateStr;
    filterSessions();
}

function clearDateFilter() {
    selectedDateFilter = null;
    filterSessions();
}

// Show Day Sessions in Right Panel
function showDaySessionsInPanel(dateStr, sessions) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date(dateStr);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[date.getDay()];
    const formattedDate = `${dayName}, ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    
    // Update panel header
    document.getElementById('sessionsPanelTitle').innerHTML = `<i class="fas fa-calendar-day"></i> ${formattedDate}`;
    document.getElementById('sessionsPanelSubtitle').textContent = `${sessions.length} session${sessions.length > 1 ? 's' : ''} scheduled`;
    
    // Sort sessions by time
    const sortedSessions = [...sessions].sort((a, b) => {
        return a.startTime.localeCompare(b.startTime);
    });
    
    let sessionsHTML = `
        <div class="panel-view-all-wrapper">
            <button class="btn-view-all" onclick="viewAllSessions()">
                <i class="fas fa-list"></i> View All Sessions
            </button>
        </div>
        <div class="panel-sessions-list">
    `;
    sortedSessions.forEach(session => {
        const clientName = clients[session.client] || 'Group Session';
        sessionsHTML += `
            <div class="panel-session-item" onclick="viewSessionDetails('${session.id}')">
                <div class="panel-session-time">
                    <i class="fas fa-clock"></i>
                    <span>${formatTime(session.startTime)} - ${formatTime(session.endTime)}</span>
                </div>
                <h4 class="panel-session-title">${session.title || typeNames[session.type]}</h4>
                <div class="panel-session-meta">
                    <span>
                        <i class="fas ${session.client === 'group' ? 'fa-users' : 'fa-user'}"></i>
                        ${clientName}
                    </span>
                    <span>
                        <i class="fas fa-dumbbell"></i>
                        ${typeNames[session.type]}
                    </span>
                    <span>
                        <i class="fas fa-map-marker-alt"></i>
                        ${locationNames[session.location]}
                    </span>
                </div>
                ${session.notes ? `<p class="panel-session-notes">${session.notes}</p>` : ''}
            </div>
        `;
    });
    sessionsHTML += '</div>';
    
    document.getElementById('sessionsPanelContent').innerHTML = sessionsHTML;
}

function viewAllSessions() {
    // Clear date selection
    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
    
    // Reset panel to default state
    document.getElementById('sessionsPanelTitle').innerHTML = `<i class="fas fa-calendar-check"></i> Select a Date`;
    document.getElementById('sessionsPanelSubtitle').textContent = 'Click on a date with sessions to view details';
    document.getElementById('sessionsPanelContent').innerHTML = `
        <div class="empty-sessions-state">
            <div class="empty-icon">
                <i class="fas fa-calendar-day"></i>
            </div>
            <p>No date selected</p>
            <span>Click on a date in the calendar to view its sessions</span>
        </div>
    `;
}

// Create Session Modal
function openCreateSessionModal() {
    currentSessionId = null;
    document.getElementById('modalTitle').textContent = 'Schedule New Session';
    document.getElementById('sessionForm').reset();
    
    // Set default date to tomorrow
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const sessionDateInput = document.getElementById('sessionDate');
    if (sessionDateInput) {
        sessionDateInput.value = tomorrow.toISOString().split('T')[0];
    }
    
    document.getElementById('sessionModal').classList.add('active');
}

function closeSessionModal() {
    document.getElementById('sessionModal').classList.remove('active');
    currentSessionId = null;
}

// Edit Session
function editSession(sessionId) {
    currentSessionId = sessionId;
    const session = sessionsData[sessionId];
    
    if (!session) {
        showToast('Session not found', 'error');
        return;
    }
    
    document.getElementById('modalTitle').textContent = 'Edit Session';
    document.getElementById('sessionClient').value = session.client;
    document.getElementById('sessionType').value = session.type;
    document.getElementById('sessionDate').value = session.date;
    document.getElementById('sessionStartTime').value = session.startTime;
    document.getElementById('sessionEndTime').value = session.endTime;
    document.getElementById('sessionLocation').value = session.location;
    document.getElementById('sessionTitle').value = session.title || '';
    document.getElementById('sessionNotes').value = session.notes || '';
    
    document.getElementById('sessionModal').classList.add('active');
}

// Save Session
function saveSession(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    const sessionData = {
        client: formData.get('sessionClient'),
        type: formData.get('sessionType'),
        date: formData.get('sessionDate'),
        startTime: formData.get('sessionStartTime'),
        endTime: formData.get('sessionEndTime'),
        location: formData.get('sessionLocation'),
        title: formData.get('sessionTitle') || '',
        notes: formData.get('sessionNotes') || '',
        status: 'upcoming'
    };
    
    // Validate time
    if (sessionData.startTime >= sessionData.endTime) {
        showToast('End time must be after start time', 'error');
        return;
    }
    
    if (currentSessionId) {
        // Update existing session
        sessionsData[currentSessionId] = {
            ...sessionsData[currentSessionId],
            ...sessionData
        };
        showToast('Session updated successfully', 'success');
    } else {
        // Create new session
        const newId = 'session-' + Date.now();
        sessionsData[newId] = {
            id: newId,
            ...sessionData
        };
        showToast('Session scheduled successfully', 'success');
    }
    
    closeSessionModal();
    setTimeout(() => {
        location.reload();
    }, 1000);
}

// View Session Details
function viewSessionDetails(sessionId) {
    const session = sessionsData[sessionId];
    
    if (!session) {
        showToast('Session not found', 'error');
        return;
    }
    
    const content = `
        <div class="session-details-view">
            <div class="detail-section">
                <h4><i class="fas fa-info-circle"></i> Session Information</h4>
                <div class="detail-grid">
                    <div class="detail-item-view">
                        <span class="label">Title:</span>
                        <span class="value">${session.title || 'N/A'}</span>
                    </div>
                    <div class="detail-item-view">
                        <span class="label">Client:</span>
                        <span class="value">${clients[session.client] || 'N/A'}</span>
                    </div>
                    <div class="detail-item-view">
                        <span class="label">Type:</span>
                        <span class="value badge ${session.type}">${typeNames[session.type]}</span>
                    </div>
                    <div class="detail-item-view">
                        <span class="label">Date:</span>
                        <span class="value">${formatDate(session.date)}</span>
                    </div>
                    <div class="detail-item-view">
                        <span class="label">Time:</span>
                        <span class="value">${formatTime(session.startTime)} - ${formatTime(session.endTime)}</span>
                    </div>
                    <div class="detail-item-view">
                        <span class="label">Location:</span>
                        <span class="value">${locationNames[session.location]}</span>
                    </div>
                    <div class="detail-item-view">
                        <span class="label">Status:</span>
                        <span class="value badge ${session.status}">${session.status.charAt(0).toUpperCase() + session.status.slice(1)}</span>
                    </div>
                </div>
                ${session.notes ? `<p class="description"><strong>Notes:</strong> ${session.notes}</p>` : ''}
            </div>
        </div>
    `;
    
    document.getElementById('viewModalContent').innerHTML = content;
    document.getElementById('viewModal').classList.add('active');
}

function closeViewModal() {
    document.getElementById('viewModal').classList.remove('active');
}

// Cancel Session
function cancelSession(sessionId) {
    sessionToCancel = sessionId;
    document.getElementById('cancelModal').classList.add('active');
}

function closeCancelModal() {
    document.getElementById('cancelModal').classList.remove('active');
    sessionToCancel = null;
}

function confirmCancelSession() {
    if (sessionToCancel && sessionsData[sessionToCancel]) {
        sessionsData[sessionToCancel].status = 'cancelled';
        showToast('Session cancelled successfully', 'success');
        closeCancelModal();
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
}

// Utility Functions
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatTime(timeStr) {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Logout Functions
function openLogoutModal() {
    document.getElementById('logoutModal').classList.add('active');
}

function closeLogoutModal() {
    document.getElementById('logoutModal').classList.remove('active');
}

function confirmLogout() {
    showToast('Logging out...', 'info');
    setTimeout(() => {
        window.location.href = '../../index.html';
    }, 1000);
}

// Toast Notifications
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    const toastId = 'toast-' + Date.now();
    toast.id = toastId;
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas ${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => closeToast(toastId), 5000);
}

function closeToast(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }
}

// Close modals on outside click
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
    }
});

// Close modals on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

