// Toast Notification System
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
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

// Chat Panel Functions
function toggleChatPanel() {
    const panel = document.getElementById('chatPanel');
    const notifPanel = document.getElementById('notificationPanel');

    notifPanel.classList.remove('active');
    panel.classList.toggle('active');
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
        const now = new Date();
        const timeStr = 'Just now';

        const messageHTML = `
            <div class="message sent">
                <div class="message-avatar">MR</div>
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
    }
}

// Booking Panel Functions
function toggleBookingPanel() {
    const panel = document.getElementById('bookingPanel');
    const chatPanel = document.getElementById('chatPanel');
    const notificationPanel = document.getElementById('notificationPanel');

    chatPanel.classList.remove('active');
    notificationPanel.classList.remove('active');
    panel.classList.toggle('active');

    if (panel.classList.contains('active')) {
        loadBookingRequests();
    }
}

function closeBookingPanel() {
    const panel = document.getElementById('bookingPanel');
    panel.classList.remove('active');
}

// Booking Requests Data
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

    // Remove from pending requests
    const index = bookingRequests.findIndex(b => b.id === bookingId);
    if (index > -1) {
        bookingRequests.splice(index, 1);
    }

    // Update badge count
    updateBookingBadge();

    // Reload panel
    loadBookingRequests();

    // Show success message
    if (typeof showToast === 'function') {
        showToast(`Booking accepted for ${booking.clientName}`, 'success');
    } else {
        console.log(`Booking accepted for ${booking.clientName}`);
    }

    // In a real app, this would send an API request to accept the booking
}

function declineBooking(bookingId) {
    const booking = bookingRequests.find(b => b.id === bookingId);
    if (!booking) return;

    // Remove from pending requests
    const index = bookingRequests.findIndex(b => b.id === bookingId);
    if (index > -1) {
        bookingRequests.splice(index, 1);
    }

    // Update badge count
    updateBookingBadge();

    // Reload panel
    loadBookingRequests();

    // Show info message
    if (typeof showToast === 'function') {
        showToast(`Booking declined for ${booking.clientName}`, 'info');
    } else {
        console.log(`Booking declined for ${booking.clientName}`);
    }

    // In a real app, this would send an API request to decline the booking
}

function updateBookingBadge() {
    const badge = document.getElementById('bookingBadge');
    if (badge) {
        const count = bookingRequests.length;
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Notification Panel Functions
function toggleNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    const chatPanel = document.getElementById('chatPanel');
    const bookingPanel = document.getElementById('bookingPanel');

    chatPanel.classList.remove('active');
    bookingPanel.classList.remove('active');
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

// Profile Dropdown Functions
function toggleProfileDropdown() {
    const profile = document.querySelector('.user-profile');
    profile.classList.toggle('active');
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.user-profile');
    const isClickInside = dropdown.contains(event.target);

    if (!isClickInside) {
        dropdown.classList.remove('active');
    }
});

// Close panels when clicking outside
document.addEventListener('click', function(e) {
    const panel = document.getElementById('notificationPanel');
    const chatPanel = document.getElementById('chatPanel');
    const notifIcon = document.querySelector('.notification-icon');
    const chatIcon = document.querySelector('.chat-icon');

    if (panel.classList.contains('active') &&
        !panel.contains(e.target) &&
        !notifIcon.contains(e.target)) {
        closeNotificationPanel();
    }

    if (chatPanel.classList.contains('active') &&
        !chatPanel.contains(e.target) &&
        !chatIcon.contains(e.target)) {
        closeChatPanel();
    }
});

// Close modals/panels with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeNotificationPanel();
        closeChatPanel();
        closeLogoutModal();
    }
});

// Sidebar hover functionality with smooth transitions
const sidebar = document.getElementById('sidebar');
let hoverTimeout;

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

// Chat Input Auto-resize
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
        this.style.height = this.scrollHeight + 'px';
    });
}

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
    console.log('Coach logged out');
    
    // Redirect to homepage
    window.location.href = '../../Client/HTML/homepage.html';
}

// Close logout modal on outside click or ESC key
document.addEventListener('click', function(e) {
    const logoutModal = document.getElementById('logoutModal');
    if (logoutModal && e.target === logoutModal) {
        closeLogoutModal();
    }
});

// Client View Functions
function viewClient(clientId) {
    // Show loading notification
    showToast('Loading client details...', 'info');
    
    // Navigate to client detail page with client ID parameter
    // MyClients.html will detect the ?client= parameter and show detailed view
    setTimeout(() => {
        window.location.href = `../HTML/MyClients.html?client=${encodeURIComponent(clientId)}`;
    }, 300);
}

// Task Handler Functions
function handleTask(taskType) {
    switch(taskType) {
        case 'progress-review':
            showToast('Opening progress review...', 'info');
            // Navigate to progress review page with filter
            setTimeout(() => {
                window.location.href = '../HTML/progress.html?filter=pending';
            }, 500);
            break;
        case 'workout-change':
            showToast('Opening workout plan change request...', 'info');
            // Navigate to workouts page with filter
            setTimeout(() => {
                window.location.href = '../HTML/workouts.html?filter=requests';
            }, 500);
            break;
        case 'session-request':
            showToast('Opening session request...', 'info');
            // Navigate to schedule page with filter
            setTimeout(() => {
                window.location.href = '../HTML/schedules.html?filter=pending';
            }, 500);
            break;
        case 'feedback':
            showToast('Opening feedback form...', 'info');
            // Navigate to progress review page
            setTimeout(() => {
                window.location.href = '../HTML/progress.html';
            }, 500);
            break;
        default:
            showToast('Task opened successfully', 'success');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Any initialization code here
    console.log('Coach Dashboard loaded');
    
    // Update notification badge count if needed
    const unreadNotifications = document.querySelectorAll('.notification-list-item.unread');
    const badge = document.querySelector('.notification-badge');
    if (badge && unreadNotifications.length > 0) {
        badge.textContent = unreadNotifications.length > 9 ? '9+' : unreadNotifications.length;
    }
});

