// Global Variables
let currentClientId = null;
let clientsData = {
    'ashley-quicho': {
        name: 'Ashley Quicho',
        email: 'ashley.quicho@email.com',
        phone: '+63 912 345 6789',
        dob: 'January 15, 1995',
        gender: 'Female',
        address: '123 Main Street, Quezon City, Metro Manila',
        emergencyContact: 'Maria Quicho - +63 912 345 6788',
        membership: 'PROMO Student',
        status: 'Active',
        joinDate: 'October 2024',
        avatar: 'AQ'
    },
    'john-dela-cruz': {
        name: 'John Dela Cruz',
        email: 'john.delacruz@email.com',
        phone: '+63 912 345 6790',
        dob: 'March 22, 1992',
        gender: 'Male',
        address: '456 Oak Avenue, Makati City, Metro Manila',
        emergencyContact: 'Juan Dela Cruz - +63 912 345 6791',
        membership: 'PROMO Student',
        status: 'Active',
        joinDate: 'September 2024',
        avatar: 'JD'
    },
    'maria-santos': {
        name: 'Maria Santos',
        email: 'maria.santos@email.com',
        phone: '+63 912 345 6792',
        dob: 'June 10, 1998',
        gender: 'Female',
        address: '789 Pine Road, Taguig City, Metro Manila',
        emergencyContact: 'Pedro Santos - +63 912 345 6793',
        membership: 'PROMO Student',
        status: 'Active',
        joinDate: 'November 2024',
        avatar: 'MS'
    },
    'robert-lim': {
        name: 'Robert Lim',
        email: 'robert.lim@email.com',
        phone: '+63 912 345 6794',
        dob: 'August 5, 1990',
        gender: 'Male',
        address: '321 Elm Street, Pasig City, Metro Manila',
        emergencyContact: 'Rosa Lim - +63 912 345 6795',
        membership: 'Student',
        status: 'Active',
        joinDate: 'June 2024',
        avatar: 'RL'
    }
};

// Booking Panel Functions (Shared)
const bookingRequests = [
    {
        id: 'booking-1',
        clientId: 'ashley-quicho',
        clientName: 'Ashley Quicho',
        clientAvatar: 'AQ',
        date: 'November 6, 2024',
        time: '3:00 PM',
        type: 'Strength Training',
        location: 'Main Training Area',
        notes: 'Focus on upper body strength',
        requestedAt: '5 minutes ago'
    },
    {
        id: 'booking-2',
        clientId: 'john-dela-cruz',
        clientName: 'John Dela Cruz',
        clientAvatar: 'JD',
        date: 'November 7, 2024',
        time: '10:00 AM',
        type: 'Cardio & Conditioning',
        location: 'Cardio Zone',
        notes: 'Morning session preferred',
        requestedAt: '1 hour ago'
    }
];

function toggleBookingPanel() {
    const panel = document.getElementById('bookingPanel');
    const notificationPanel = document.getElementById('notificationPanel');
    if (notificationPanel) notificationPanel.classList.remove('active');
    if (panel) {
        panel.classList.toggle('active');
        if (panel.classList.contains('active')) {
            loadBookingRequests();
        }
    }
}

function closeBookingPanel() {
    const panel = document.getElementById('bookingPanel');
    if (panel) panel.classList.remove('active');
}

function loadBookingRequests() {
    const container = document.getElementById('bookingPanelBody');
    if (!container) return;

    if (bookingRequests.length === 0) {
        container.innerHTML = `
            <div class="booking-empty">
                <i class="fas fa-calendar-check"></i>
                <p>No pending booking requests</p>
            </div>
        `;
        return;
    }

    container.innerHTML = bookingRequests.map(booking => `
        <div class="booking-item" data-booking-id="${booking.id}">
            <div class="booking-item-header">
                <div class="booking-avatar">${booking.clientAvatar}</div>
                <div class="booking-client-info">
                    <h4>${booking.clientName}</h4>
                    <p>${booking.requestedAt}</p>
                </div>
            </div>
            <div class="booking-details">
                <div class="booking-detail-item">
                    <i class="fas fa-calendar-day"></i>
                    <span>${booking.date}</span>
                </div>
                <div class="booking-detail-item">
                    <i class="fas fa-clock"></i>
                    <span>${booking.time}</span>
                </div>
                <div class="booking-detail-item">
                    <i class="fas fa-dumbbell"></i>
                    <span>${booking.type}</span>
                </div>
                <div class="booking-detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${booking.location}</span>
                </div>
                ${booking.notes ? `
                <div class="booking-detail-item">
                    <i class="fas fa-sticky-note"></i>
                    <span>${booking.notes}</span>
                </div>
                ` : ''}
            </div>
            <div class="booking-actions">
                <button class="booking-btn booking-btn-accept" onclick="acceptBooking('${booking.id}')">
                    <i class="fas fa-check"></i> Accept
                </button>
                <button class="booking-btn booking-btn-decline" onclick="declineBooking('${booking.id}')">
                    <i class="fas fa-times"></i> Decline
                </button>
            </div>
        </div>
    `).join('');
}

function acceptBooking(bookingId) {
    const booking = bookingRequests.find(b => b.id === bookingId);
    if (!booking) return;

    const index = bookingRequests.findIndex(b => b.id === bookingId);
    if (index > -1) {
        bookingRequests.splice(index, 1);
    }

    updateBookingBadge();
    loadBookingRequests();
    showToast(`Booking accepted for ${booking.clientName}`, 'success');
}

function declineBooking(bookingId) {
    const booking = bookingRequests.find(b => b.id === bookingId);
    if (!booking) return;

    const index = bookingRequests.findIndex(b => b.id === bookingId);
    if (index > -1) {
        bookingRequests.splice(index, 1);
    }

    updateBookingBadge();
    loadBookingRequests();
    showToast(`Booking declined for ${booking.clientName}`, 'info');
}

function updateBookingBadge() {
    const badge = document.getElementById('bookingBadge');
    if (badge) {
        const count = bookingRequests.length;
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Toast Notification System
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toastId = 'toast-' + Date.now();
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    const colors = {
        success: '#14B8A6',
        error: '#EF4444',
        info: '#3B82F6',
        warning: '#F59E0B'
    };
    
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.style.cssText = `
        background: var(--bg-darker);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-left: 4px solid ${colors[type]};
        border-radius: 12px;
        padding: 1rem 1.5rem;
        min-width: 300px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideIn 0.3s ease;
    `;
    
    toast.innerHTML = `
        <i class="fas ${icons[type]}" style="color: ${colors[type]}; font-size: 1.5rem;"></i>
        <div style="flex: 1; color: var(--text-primary);">${message}</div>
        <button onclick="closeToast('${toastId}')" style="
            background: none;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            font-size: 1.2rem;
            padding: 0;
            width: 24px;
            height: 24px;
        ">
            <i class="fas fa-times"></i>
        </button>
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

// Initialize Page
document.addEventListener('DOMContentLoaded', function() {
    // Check URL for client parameter
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('client');
    
    if (clientId) {
        viewClientDetail(clientId);
    } else {
        showListView();
    }
    
    // Initialize sidebar hover functionality
    initializeSidebar();
    
    // Initialize profile dropdown
    initializeProfileDropdown();
    
});

// View Functions
function showListView() {
    document.getElementById('listView').style.display = 'block';
    document.getElementById('detailView').style.display = 'none';
    currentClientId = null;
    
    // Remove client parameter from URL
    if (window.location.search.includes('client=')) {
        window.history.replaceState({}, '', window.location.pathname);
    }
}

function viewClientDetail(clientId) {
    currentClientId = clientId;
    const client = clientsData[clientId];
    
    if (!client) {
        showToast('Client not found', 'error');
        showListView();
        return;
    }
    
    // Hide list view, show detail view
    document.getElementById('listView').style.display = 'none';
    document.getElementById('detailView').style.display = 'block';
    
    // Update URL without reload
    window.history.pushState({clientId: clientId}, '', `?client=${clientId}`);
    
    // Update client profile header
    updateClientProfile(client);
    
    // Switch to overview tab by default
    switchTab('overview');
    
    // Scroll to top
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function backToListView() {
    showListView();
    
    showToast('Returned to clients list', 'info');
}

function updateClientProfile(client) {
    // Update profile header
    document.getElementById('clientName').textContent = client.name;
    document.querySelector('.profile-avatar-xl').textContent = client.avatar;
    
    // Update other profile details would go here
    // For now, we'll keep the static data in HTML
}

// Tab Switching
function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Add active class to selected tab and content (only if tab exists)
    const tabBtn = document.querySelector(`[data-tab="${tabName}"]`);
    const tabContent = document.getElementById(`tab-${tabName}`);
    
    if (tabBtn && tabContent) {
        tabBtn.classList.add('active');
        tabContent.classList.add('active');
    }
}

// Search and Filter Functions
function filterClients() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const membershipFilter = document.getElementById('membershipFilter').value;
    
    const clientCards = document.querySelectorAll('.client-card');
    
    clientCards.forEach(card => {
        const clientName = card.querySelector('h3').textContent.toLowerCase();
        const clientEmail = card.querySelector('.client-email').textContent.toLowerCase();
        const clientStatus = card.dataset.status;
        const clientMembership = card.dataset.membership;
        
        const matchesSearch = !searchTerm || 
            clientName.includes(searchTerm) || 
            clientEmail.includes(searchTerm);
        
        const matchesStatus = statusFilter === 'all' || clientStatus === statusFilter;
        const matchesMembership = membershipFilter === 'all' || clientMembership === membershipFilter;
        
        if (matchesSearch && matchesStatus && matchesMembership) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show message if no results
    const visibleCards = Array.from(clientCards).filter(card => card.style.display !== 'none');
    if (visibleCards.length === 0) {
        showNoResultsMessage();
    } else {
        hideNoResultsMessage();
    }
}

function showNoResultsMessage() {
    let message = document.getElementById('noResultsMessage');
    if (!message) {
        message = document.createElement('div');
        message.id = 'noResultsMessage';
        message.className = 'no-results-message';
        message.innerHTML = `
            <i class="fas fa-search"></i>
            <h3>No clients found</h3>
            <p>Try adjusting your search or filter criteria</p>
        `;
        document.getElementById('clientsGrid').appendChild(message);
    }
    message.style.display = 'block';
}

function hideNoResultsMessage() {
    const message = document.getElementById('noResultsMessage');
    if (message) {
        message.style.display = 'none';
    }
}

// Quick Actions
function quickMessage(clientId) {
    showToast(`Opening message to ${clientsData[clientId]?.name || 'client'}...`, 'info');
    // Navigate to messages page with client filter
    setTimeout(() => {
        window.location.href = `../HTML/Messages.html?client=${clientId}`;
    }, 500);
}

// Removed sendNewMessage function - Messages tab removed

function assignWorkout() {
    if (!currentClientId) return;
    showToast('Opening workout assignment...', 'info');
    setTimeout(() => {
        window.location.href = `../HTML/workouts.html?assign=${currentClientId}`;
    }, 500);
}

function assignMealPlan() {
    if (!currentClientId) return;
    showToast('Opening meal plan assignment...', 'info');
    setTimeout(() => {
        window.location.href = `../HTML/mealplans.html?assign=${currentClientId}`;
    }, 500);
}

function scheduleSession() {
    if (!currentClientId) return;
    showToast('Opening session scheduling...', 'info');
    setTimeout(() => {
        window.location.href = `../HTML/schedules.html?client=${currentClientId}&action=schedule`;
    }, 500);
}

function viewProgress() {
    if (!currentClientId) return;
    showToast('Opening progress review...', 'info');
    setTimeout(() => {
        window.location.href = `../HTML/progress.html?client=${currentClientId}`;
    }, 500);
}

function openQuickActionModal() {
    showToast('Quick actions modal coming soon...', 'info');
}

function openNotesModal() {
    showToast('Notes editor coming soon...', 'info');
}

// Note: Add Client functionality is handled by Admin module
// Coaches only manage clients assigned to them

function exportClients() {
    showToast('Exporting client data...', 'info');
    // In a real app, this would generate and download a CSV/Excel file
}

// Sidebar Functions
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    
    let hoverTimeout;
    
    sidebar.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimeout);
        this.classList.add('expanded');
    });
    
    sidebar.addEventListener('mouseleave', function() {
        hoverTimeout = setTimeout(() => {
            this.classList.remove('expanded');
        }, 100);
    });
    
    sidebar.addEventListener('mousemove', function() {
        clearTimeout(hoverTimeout);
        this.classList.add('expanded');
    });
}

// Profile Dropdown Functions
function toggleProfileDropdown() {
    const profile = document.querySelector('.user-profile');
    if (profile) {
        profile.classList.toggle('active');
    }
}

function initializeProfileDropdown() {
    document.addEventListener('click', function(event) {
        const dropdown = document.querySelector('.user-profile');
        if (dropdown && !dropdown.contains(event.target)) {
            dropdown.classList.remove('active');
        }
    });
}

// Logout Functions
function openLogoutModal() {
    showToast('Logout functionality coming soon...', 'info');
    // In a real app, this would open a logout confirmation modal
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('client');
    
    if (clientId) {
        viewClientDetail(clientId);
    } else {
        showListView();
    }
});

// Toast Animations CSS (if not already in CSS)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .no-results-message {
        grid-column: 1 / -1;
        text-align: center;
        padding: 4rem 2rem;
        color: var(--text-secondary);
    }
    
    .no-results-message i {
        font-size: 3rem;
        color: var(--primary-teal);
        opacity: 0.5;
        margin-bottom: 1rem;
    }
    
    .no-results-message h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
    }
`;
document.head.appendChild(style);

