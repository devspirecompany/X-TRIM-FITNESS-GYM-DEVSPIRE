function openMessageModal() {
    const modal = document.getElementById('messageModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMessageModal() {
    const modal = document.getElementById('messageModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Toast Notification System
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toastId = 'toast-' + Date.now();
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    const colors = {
        success: '#22c55e',
        error: '#E41E26',
        info: '#F9C513'
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

function sendMessage(event) {
    if (event) event.preventDefault();

    const subject = document.getElementById('messageSubject').value;
    const content = document.getElementById('messageContent').value;

    if (subject && content) {
        closeMessageModal();
        
        // Show toast notification instead of modal
        showToast('Message sent successfully to Coach Mike!', 'success');

        // Reset form
        document.getElementById('messageSubject').value = '';
        document.getElementById('messageContent').value = '';
    }
}

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
    }
}

document.getElementById('chatInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendChatMessage();
    }
});

document.getElementById('chatInput').addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});

function toggleNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    const chatPanel = document.getElementById('chatPanel');

    chatPanel.classList.remove('active');
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

function toggleProfileDropdown() {
    const profile = document.querySelector('.user-profile');
    profile.classList.toggle('active');
}

document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.user-profile');
    const isClickInside = dropdown.contains(event.target);

    if (!isClickInside) {
        dropdown.classList.remove('active');
    }
});

document.getElementById('messageModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeMessageModal();
    }
});

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

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMessageModal();
        closeNotificationPanel();
        closeChatPanel();
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

// Update stat cards with correct arrow directions
function updateStatArrows() {
    const statCards = document.querySelectorAll('.stat-change');
    
    statCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const icon = card.querySelector('i');
        
        if (text.includes('-') || text.includes('decrease')) {
            icon.className = 'fas fa-arrow-down';
            card.style.color = '#E41E26';
        } else {
            icon.className = 'fas fa-arrow-up';
            card.style.color = 'var(--primary-yellow)';
        }
    });
}

// Check for empty stats and show fallback message
function checkEmptyStats() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const value = parseInt(stat.textContent);
        
        if (value === 0 || isNaN(value)) {
            const card = stat.closest('.stat-card');
            if (!card.querySelector('.no-data-message')) {
                card.innerHTML += `
                    <div class="no-data-message" style="
                        margin-top: 1rem;
                        padding: 0.8rem;
                        background: rgba(228, 30, 38, 0.1);
                        border-radius: 10px;
                        text-align: center;
                        color: var(--text-secondary);
                        font-size: 0.85rem;
                    ">
                        <i class="fas fa-info-circle"></i> No activity recorded yet
                    </div>
                `;
            }
        }
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

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const logoutModal = document.getElementById('logoutModal');
        if (logoutModal && logoutModal.classList.contains('active')) {
            closeLogoutModal();
        }
    }
});

// Call on page load
document.addEventListener('DOMContentLoaded', function() {
    updateStatArrows();
    checkEmptyStats();
});