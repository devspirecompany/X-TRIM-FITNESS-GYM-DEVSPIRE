// Current date - set to November 5, 2024 for demo (treat as "today")
let demoToday = new Date(2024, 10, 5); // November 5, 2024
let currentDate = demoToday;
// Default to November 2024 where demo sessions are located
let currentMonth = 10; // November (0-indexed)
let currentYear = 2024;

// Selected date filter
let selectedDateFilter = null;

// Get session dates dynamically from DOM
function getSessionDates() {
    const sessionItems = document.querySelectorAll('.session-item[data-date]');
    const dates = new Set();
    
    sessionItems.forEach(item => {
        const dateStr = item.getAttribute('data-date');
        if (dateStr) {
            const date = new Date(dateStr);
            dates.add(date.getDate()); // Add day of month
        }
    });
    
    return Array.from(dates);
}

// Get all session dates for a specific month/year
function getSessionDatesForMonth(month, year) {
    const sessionItems = document.querySelectorAll('.session-item[data-date]');
    const dates = new Set();
    
    sessionItems.forEach(item => {
        const dateStr = item.getAttribute('data-date');
        if (dateStr) {
            const date = new Date(dateStr);
            if (date.getMonth() === month && date.getFullYear() === year) {
                dates.add(date.getDate());
            }
        }
    });
    
    return Array.from(dates);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Wait a tiny bit to ensure DOM is fully ready
    setTimeout(function() {
        // Sort sessions first
        sortSessionsByDateTime();
        
        // Generate calendar (after sessions are sorted)
        const calendarGrid = document.getElementById('calendarGrid');
        if (calendarGrid) {
            generateCalendar(currentMonth, currentYear);
        } else {
            console.error('Calendar grid element not found in DOM');
        }
        
        // Initialize chat
        initializeChatInput();
        
        // Initial display - show all sessions
        filterSessionsByDate();
    }, 50);
});

// Generate calendar
function generateCalendar(month, year) {
    const calendarGrid = document.getElementById('calendarGrid');
    const calendarMonth = document.getElementById('calendarMonth');
    const calendarHeader = document.querySelector('.calendar-header h2');
    
    if (!calendarGrid) {
        console.error('Calendar grid not found');
        return;
    }
    
    if (!calendarMonth) {
        console.error('Calendar month element not found');
        return;
    }
    
    // Clear existing calendar days (keep headers)
    const existingDays = calendarGrid.querySelectorAll('.calendar-day');
    existingDays.forEach(day => day.remove());
    
    // Verify headers exist
    const headers = calendarGrid.querySelectorAll('.calendar-day-header');
    if (headers.length !== 7) {
        console.error('Calendar headers missing or incorrect count:', headers.length);
    }
    
    // Month names
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Update month display in both places
    const monthText = `${monthNames[month]} ${year}`;
    calendarMonth.textContent = monthText;
    if (calendarHeader) {
        calendarHeader.innerHTML = `<i class="fas fa-calendar"></i> ${monthText}`;
    }
    
    // First day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month';
        day.textContent = daysInPrevMonth - i;
        calendarGrid.appendChild(day);
    }
    
    // Current month days
    // Use demoToday (November 5, 2024) as "today" for demo purposes
    const today = demoToday;
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.textContent = i;
        
        // Check if it's today (November 5, 2024 for demo)
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            day.classList.add('today');
        }
        
        // Check if it has a session - dynamically check from actual session items
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const sessionDatesForMonth = getSessionDatesForMonth(month, year);
        
        // Check if any session exists for this date
        let hasSession = sessionDatesForMonth.includes(i);
        
        // Double-check by looking at actual session items in DOM
        const sessionItems = document.querySelectorAll('.session-item[data-date]');
        sessionItems.forEach(item => {
            if (item.getAttribute('data-date') === dateStr) {
                hasSession = true;
            }
        });
        
        if (hasSession) {
            day.classList.add('has-session');
        }
        
        // Add click event - only for days with sessions
        if (hasSession) {
            day.style.cursor = 'pointer';
            day.addEventListener('click', function() {
                if (!this.classList.contains('other-month')) {
                    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                    this.classList.add('selected');
                    
                    // Filter sessions by selected date
                    const clickedDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
                    selectedDateFilter = clickedDateStr;
                    filterSessionsByDate();
                }
            });
        } else {
            day.style.cursor = 'default';
        }
        
        calendarGrid.appendChild(day);
    }
    
    // Next month days
    const remainingCells = 42 - (firstDay + daysInMonth);
    if (remainingCells > 0) {
        for (let i = 1; i <= remainingCells; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day other-month';
            day.textContent = i;
            calendarGrid.appendChild(day);
        }
    }
}

// Navigate to previous month
function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
}

// Navigate to next month
function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
}

// Sort sessions by date and time
function sortSessionsByDateTime() {
    const sessionList = document.getElementById('sessionList');
    if (!sessionList) return;
    
    const sessions = Array.from(sessionList.querySelectorAll('.session-item'));
    
    sessions.sort((a, b) => {
        const dateA = new Date(a.getAttribute('data-date') + ' ' + a.getAttribute('data-time'));
        const dateB = new Date(b.getAttribute('data-date') + ' ' + b.getAttribute('data-time'));
        return dateA - dateB;
    });
    
    sessions.forEach(session => sessionList.appendChild(session));
}

// Filter functions
function applyFilters() {
    filterSessionsByDate();
}

function filterSessionsByDate() {
    const coachFilter = document.getElementById('coachFilter').value;
    const typeFilter = document.getElementById('sessionTypeFilter').value;
    const sessionList = document.getElementById('sessionList');
    
    if (!sessionList) return;
    
    const sessions = Array.from(sessionList.querySelectorAll('.session-item'));
    
    // Filter sessions
    sessions.forEach(session => {
        const coach = session.getAttribute('data-coach');
        const type = session.getAttribute('data-type');
        const sessionDate = session.getAttribute('data-date');
        
        const coachMatch = coachFilter === 'all' || coach === coachFilter;
        const typeMatch = typeFilter === 'all' || type === typeFilter;
        const dateMatch = !selectedDateFilter || sessionDate === selectedDateFilter;
        
        if (coachMatch && typeMatch && dateMatch) {
            session.style.display = 'block';
        } else {
            session.style.display = 'none';
        }
    });
    
    // Re-sort visible sessions by date and time
    const visibleSessions = sessions.filter(s => s.style.display !== 'none');
    visibleSessions.sort((a, b) => {
        const dateA = new Date(a.getAttribute('data-date') + ' ' + a.getAttribute('data-time'));
        const dateB = new Date(b.getAttribute('data-date') + ' ' + b.getAttribute('data-time'));
        return dateA - dateB;
    });
    
    // Re-append visible sessions in sorted order
    visibleSessions.forEach(session => {
        sessionList.appendChild(session);
    });
    
    // Update "View All" button visibility
    updateViewAllButton();
}

function clearDateFilter() {
    selectedDateFilter = null;
    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
    filterSessionsByDate();
}

function updateViewAllButton() {
    const viewAllBtn = document.getElementById('viewAllSessionsBtn');
    if (viewAllBtn) {
        if (selectedDateFilter) {
            viewAllBtn.style.display = 'flex';
        } else {
            viewAllBtn.style.display = 'none';
        }
    }
}

function resetFilters() {
    document.getElementById('coachFilter').value = 'all';
    document.getElementById('sessionTypeFilter').value = 'all';
    clearDateFilter();
    
    const sessions = document.querySelectorAll('.session-item');
    sessions.forEach(session => {
        session.style.display = 'block';
    });
    
    // Re-sort all sessions after reset
    sortSessionsByDateTime();
}

// Modal functions
function openBookSessionModal() {
    const modal = document.getElementById('bookSessionModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Set minimum date to today
        const dateInput = document.getElementById('bookSessionDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
            dateInput.value = today;
        }
        
        // Set default time to next hour
        const timeInput = document.getElementById('bookSessionTime');
        if (timeInput) {
            const now = new Date();
            const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
            const hours = String(nextHour.getHours()).padStart(2, '0');
            const minutes = String(nextHour.getMinutes()).padStart(2, '0');
            timeInput.value = `${hours}:${minutes}`;
        }
        
        // Reset form
        const form = document.getElementById('bookSessionForm');
        if (form) {
            form.reset();
            if (dateInput) dateInput.value = today;
            if (timeInput) timeInput.value = `${hours}:${minutes}`;
        }
    }
}

function closeBookSessionModal() {
    const modal = document.getElementById('bookSessionModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function bookSession(event) {
    event.preventDefault();
    
    // Get form values
    const coach = document.getElementById('bookCoach').value;
    const date = document.getElementById('bookSessionDate').value;
    const time = document.getElementById('bookSessionTime').value;
    const type = document.getElementById('bookSessionType').value;
    const location = document.getElementById('bookSessionLocation').value;
    const notes = document.getElementById('bookSessionNotes').value;
    
    // Validate required fields
    if (!coach || !date || !time || !type) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Format the booking data
    const bookingData = {
        coach: coach,
        date: date,
        time: time,
        type: type,
        location: location,
        notes: notes
    };
    
    console.log('Booking session:', bookingData);
    
    // Here you would typically send this data to your server
    // For now, we'll just show success message
    
    // Close the booking modal
    closeBookSessionModal();
    
    // Show success modal
    setTimeout(() => {
        openBookingSuccessModal();
    }, 300);
    
    // Optionally, you could refresh the calendar/sessions list here
    // generateCalendar(currentMonth, currentYear);
}

function openBookingSuccessModal() {
    const modal = document.getElementById('bookingSuccessModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeBookingSuccessModal() {
    const modal = document.getElementById('bookingSuccessModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function openRescheduleModal() {
    const modal = document.getElementById('rescheduleModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeRescheduleModal() {
    const modal = document.getElementById('rescheduleModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openCancelModal() {
    const modal = document.getElementById('cancelModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCancelModal() {
    const modal = document.getElementById('cancelModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function confirmCancel() {
    alert('Session cancelled successfully!');
    closeCancelModal();
}

// Profile dropdown
function toggleProfileDropdown() {
    const profile = document.querySelector('.user-profile');
    profile.classList.toggle('active');
}

document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.user-profile');
    if (dropdown && !dropdown.contains(event.target)) {
        dropdown.classList.remove('active');
    }
});

// Sidebar hover functionality with smooth transitions (same as dashboard)
let hoverTimeout;

// Initialize sidebar - runs immediately if script is in head with defer
function initializeSidebarHover() {
    const sidebar = document.getElementById('sidebar');
    
    if (sidebar) {
        // Add hover effect
        sidebar.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            this.classList.add('expanded');
        });
        
        // Remove hover effect with slight delay to prevent flickering
        sidebar.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                this.classList.remove('expanded');
            }, 100);
        });

        // Keep expanded if mouse moves back to sidebar quickly
        sidebar.addEventListener('mousemove', function() {
            clearTimeout(hoverTimeout);
            this.classList.add('expanded');
        });
    }
}

// Initialize sidebar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSidebarHover);
} else {
    // DOM is already ready
    initializeSidebarHover();
}

// Notification Panel
function toggleNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    const chatPanel = document.getElementById('chatPanel');
    
    if (chatPanel) chatPanel.classList.remove('active');
    panel.classList.toggle('active');
    
    if (panel.classList.contains('active')) {
        const badge = document.querySelector('.notification-badge');
        if (badge) badge.style.display = 'none';
    }
}

function closeNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    panel.classList.remove('active');
}

// Chat Panel
function toggleChatPanel() {
    const panel = document.getElementById('chatPanel');
    const notifPanel = document.getElementById('notificationPanel');
    
    if (notifPanel) notifPanel.classList.remove('active');
    panel.classList.toggle('active');
    
    if (panel.classList.contains('active')) {
        setTimeout(() => {
            const chatInput = document.getElementById('chatInput');
            if (chatInput) chatInput.focus();
        }, 300);
    }
}

function closeChatPanel() {
    const panel = document.getElementById('chatPanel');
    panel.classList.remove('active');
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        const messagesContainer = document.getElementById('chatMessages');
        const timeStr = 'Just now';
        
        const messageHTML = `
            <div class="message sent">
                <div class="message-avatar">AQ</div>
                <div>
                    <div class="message-content">
                        <div class="message-text">${message}</div>
                        <div class="message-time">${timeStr}</div>
                    </div>
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        input.value = '';
        input.style.height = 'auto';
        
        if (Math.random() > 0.3) {
            setTimeout(() => {
                const replies = [
                    "Thanks for reaching out! I'll get back to you shortly.",
                    "Got it! Let me check my schedule.",
                    "Perfect! See you at the session.",
                    "That sounds good. Looking forward to our training!",
                    "I've noted that down. Any other questions?"
                ];
                const randomReply = replies[Math.floor(Math.random() * replies.length)];
                
                const replyHTML = `
                    <div class="message received">
                        <div class="message-avatar">CM</div>
                        <div>
                            <div class="message-content">
                                <div class="message-sender">Coach Mike</div>
                                <div class="message-text">${randomReply}</div>
                                <div class="message-time">Just now</div>
                            </div>
                        </div>
                    </div>
                `;
                
                messagesContainer.insertAdjacentHTML('beforeend', replyHTML);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000);
        }
    }
}

// Initialize chat input
function initializeChatInput() {
    const chatInput = document.getElementById('chatInput');
    
    if (chatInput) {
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendChatMessage();
            }
        });

        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
            
            if (this.scrollHeight > 150) {
                this.style.overflowY = 'auto';
            } else {
                this.style.overflowY = 'hidden';
            }
        });
    }
}

// Close modals when clicking on overlay
document.addEventListener('DOMContentLoaded', function() {
    const modals = ['bookSessionModal', 'rescheduleModal', 'cancelModal'];
    
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
});

// Close panels when clicking outside
document.addEventListener('click', function(e) {
    const notifPanel = document.getElementById('notificationPanel');
    const notifIcon = document.querySelector('.notification-icon');
    const chatPanel = document.getElementById('chatPanel');
    const chatIcon = document.querySelector('.chat-icon');
    
    if (notifPanel && notifIcon && 
        !notifPanel.contains(e.target) && 
        !notifIcon.contains(e.target) &&
        notifPanel.classList.contains('active')) {
        closeNotificationPanel();
    }
    
    if (chatPanel && chatIcon && 
        !chatPanel.contains(e.target) && 
        !chatIcon.contains(e.target) &&
        chatPanel.classList.contains('active')) {
        closeChatPanel();
    }
});

// Logout Modal Functions
function openLogoutModal() {
    const modal = document.getElementById('logoutModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLogoutModal() {
    const modal = document.getElementById('logoutModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function confirmLogout() {
    // In a real app, this would make an API call to logout
    console.log('User logged out');
    
    // Redirect to homepage
    window.location.href = '../HTML/homepage.html';
}

// Close logout modal on outside click or ESC key
document.addEventListener('click', function(e) {
    const logoutModal = document.getElementById('logoutModal');
    if (logoutModal && e.target === logoutModal) {
        closeLogoutModal();
    }
});

// Close everything on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeBookSessionModal();
        closeRescheduleModal();
        closeCancelModal();
        closeNotificationPanel();
        closeChatPanel();
        closeLogoutModal();
    }
});