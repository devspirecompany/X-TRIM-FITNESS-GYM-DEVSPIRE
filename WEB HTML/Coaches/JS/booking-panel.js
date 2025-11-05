// Shared Booking Panel Functions for All Coach Pages

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

function toggleBookingPanel() {
    const panel = document.getElementById('bookingPanel');
    const chatPanel = document.getElementById('chatPanel');
    const notificationPanel = document.getElementById('notificationPanel');

    if (chatPanel) chatPanel.classList.remove('active');
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateBookingBadge();
});

