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

        // View switching
        function switchView(view) {
            const buttons = document.querySelectorAll('.view-toggle button');
            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            // Here you would implement the logic to switch between daily and weekly views
            if (view === 'weekly') {
                alert('Weekly view coming soon! This would show a condensed overview of all 7 days.');
            }
        }

        // Download meal plan
        function downloadPlan() {
            alert('Downloading your meal plan as PDF...\n\nThis would generate a printable PDF with all your meal details, portions, and nutritional information.');
        }

// Request Adjustment Modal
function requestAdjustment() {
    const modal = document.getElementById('adjustmentModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reset form
        const form = document.getElementById('adjustmentForm');
        if (form) {
            form.reset();
        }
    }
}

function closeAdjustmentModal() {
    const modal = document.getElementById('adjustmentModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function submitAdjustmentRequest(event) {
    event.preventDefault();
    
    // Get form values
    const type = document.getElementById('adjustmentType').value;
    const details = document.getElementById('adjustmentDetails').value;
    const priority = document.getElementById('adjustmentPriority').value;
    const notes = document.getElementById('adjustmentNotes').value;
    
    // Validate required fields
    if (!type || !details) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Format the adjustment data
    const adjustmentData = {
        type: type,
        details: details,
        priority: priority,
        notes: notes
    };
    
    console.log('Adjustment request:', adjustmentData);
    
    // Close the adjustment modal
    closeAdjustmentModal();
    
    // Show success modal
    setTimeout(() => {
        openAdjustmentSuccessModal();
    }, 300);
}

function openAdjustmentSuccessModal() {
    const modal = document.getElementById('adjustmentSuccessModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeAdjustmentSuccessModal() {
    const modal = document.getElementById('adjustmentSuccessModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

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
                    "Got it! Let me check your meal plan.",
                    "Great! I'll review your nutrition goals.",
                    "Perfect! I've noted that down. Keep up the great work!",
                    "I've received your message. I'll respond soon!"
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
document.addEventListener('DOMContentLoaded', function() {
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
});