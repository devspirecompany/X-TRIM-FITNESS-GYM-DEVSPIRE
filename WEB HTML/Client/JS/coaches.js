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

// Profile dropdown
function toggleProfileDropdown() {
    const profile = document.querySelector('.user-profile');
    if (profile) {
        profile.classList.toggle('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const profile = document.querySelector('.user-profile');
    if (profile && !profile.contains(e.target)) {
        profile.classList.remove('active');
    }
});

// Notification Panel
function toggleNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    const chatPanel = document.getElementById('chatPanel');
    
    if (chatPanel) chatPanel.classList.remove('active');
    if (panel) panel.classList.toggle('active');
}

function closeNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    if (panel) panel.classList.remove('active');
}

// Chat Panel
function toggleChatPanel() {
    const panel = document.getElementById('chatPanel');
    const notifPanel = document.getElementById('notificationPanel');
    
    if (notifPanel) notifPanel.classList.remove('active');
    if (panel) panel.classList.toggle('active');
}

function closeChatPanel() {
    const panel = document.getElementById('chatPanel');
    if (panel) panel.classList.remove('active');
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

// Chat input event listeners
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
            this.style.height = this.scrollHeight + 'px';
        });
    }
});

// Close chat panel when clicking outside
document.addEventListener('click', function(e) {
    const chatPanel = document.getElementById('chatPanel');
    const chatIcon = document.querySelector('.chat-icon');
    
    if (chatPanel && chatPanel.classList.contains('active') && 
        !chatPanel.contains(e.target) && 
        !chatIcon.contains(e.target)) {
        closeChatPanel();
    }
});

// Rating Modal
let currentRating = 0;
let currentCoachName = '';

function openRatingModal(coachName, currentRatingValue) {
    currentCoachName = coachName;
    currentRating = 0;
    
    const modal = document.getElementById('ratingModal');
    const coachNameElement = document.getElementById('ratingCoachName');
    const stars = document.querySelectorAll('#ratingStars i');
    const valueDisplay = document.getElementById('ratingValueDisplay');
    const submitBtn = document.getElementById('submitRatingBtn');
    const feedback = document.getElementById('ratingFeedback');
    
    if (coachNameElement) coachNameElement.textContent = coachName;
    if (valueDisplay) valueDisplay.style.display = 'none';
    if (submitBtn) submitBtn.disabled = true;
    if (feedback) feedback.value = '';
    
    // Reset stars
    stars.forEach(star => {
        star.className = 'far fa-star';
    });
    
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add star hover and click events
    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.dataset.rating);
            highlightStars(rating);
        });
        
        star.addEventListener('click', function() {
            currentRating = parseInt(this.dataset.rating);
            highlightStars(currentRating);
            if (valueDisplay) {
                valueDisplay.style.display = 'block';
                document.getElementById('selectedRating').textContent = currentRating;
            }
            if (submitBtn) submitBtn.disabled = false;
        });
    });
    
    // Reset stars on mouse leave if no rating selected
    document.getElementById('ratingStars').addEventListener('mouseleave', function() {
        if (currentRating === 0) {
            stars.forEach(star => {
                star.className = 'far fa-star';
            });
        } else {
            highlightStars(currentRating);
        }
    });
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('#ratingStars i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.className = 'fas fa-star';
            star.style.color = 'var(--primary-yellow)';
        } else {
            star.className = 'far fa-star';
            star.style.color = 'var(--text-secondary)';
        }
    });
}

function closeRatingModal() {
    const modal = document.getElementById('ratingModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentRating = 0;
    currentCoachName = '';
}

function submitRating() {
    if (currentRating === 0) return;
    
    const feedback = document.getElementById('ratingFeedback');
    const feedbackText = feedback ? feedback.value.trim() : '';
    
    // Here you would normally send the rating to the server
    console.log('Rating submitted:', {
        coach: currentCoachName,
        rating: currentRating,
        feedback: feedbackText
    });
    
    closeRatingModal();
    openRatingSuccessModal();
}

function openRatingSuccessModal() {
    const modal = document.getElementById('ratingSuccessModal');
    if (modal) modal.classList.add('active');
}

function closeRatingSuccessModal() {
    const modal = document.getElementById('ratingSuccessModal');
    if (modal) modal.classList.remove('active');
}

// Switch Coach Modal
function openSwitchModal(coachName) {
    const modal = document.getElementById('switchModal');
    const selectedCoachName = document.getElementById('selectedCoachName');
    if (selectedCoachName) selectedCoachName.textContent = coachName;
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSwitchModal() {
    const modal = document.getElementById('switchModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function submitSwitchRequest() {
    const coachNameElement = document.getElementById('selectedCoachName');
    const reasonElement = document.getElementById('switchReason');
    const coachName = coachNameElement ? coachNameElement.textContent : 'the selected coach';
    const reason = reasonElement ? reasonElement.value.trim() : '';
    
    // Validate or process the request here if needed
    
    closeSwitchModal();
    
    // Show success notification modal
    const notificationModal = document.getElementById('notificationModal');
    const notificationMessage = document.getElementById('notificationMessage');
    if (notificationMessage) {
        notificationMessage.textContent = `Switch request submitted for ${coachName}! Our team will review your request and get back to you within 24 hours.`;
    }
    if (notificationModal) notificationModal.classList.add('active');
}

function closeNotificationModal() {
    const notificationModal = document.getElementById('notificationModal');
    if (notificationModal) notificationModal.classList.remove('active');
}

// Filtering and Sorting
function applyFilters() {
    const searchInput = document.getElementById('searchInput');
    const sortFilter = document.getElementById('sortFilter');
    const coachesGrid = document.getElementById('coachesGrid');
    
    if (!coachesGrid) return;
    
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const sortBy = sortFilter ? sortFilter.value : 'name';
    
    // Get all coach cards
    const coachCards = Array.from(coachesGrid.querySelectorAll('.coach-card'));
    
    // Filter by search term
    let filteredCards = coachCards.filter(card => {
        const name = card.dataset.name ? card.dataset.name.toLowerCase() : '';
        const coachNameElement = card.querySelector('.coach-name');
        const coachName = coachNameElement ? coachNameElement.textContent.toLowerCase() : '';
        
        return name.includes(searchTerm) || coachName.includes(searchTerm);
    });
    
    // Sort filtered cards
    filteredCards.sort((a, b) => {
        switch(sortBy) {
            case 'name':
                const nameA = a.dataset.name || '';
                const nameB = b.dataset.name || '';
                return nameA.localeCompare(nameB);
            
            case 'rating':
                const ratingA = parseFloat(a.dataset.rating) || 0;
                const ratingB = parseFloat(b.dataset.rating) || 0;
                return ratingB - ratingA;
            
            case 'rating-low':
                const ratingALow = parseFloat(a.dataset.rating) || 0;
                const ratingBLow = parseFloat(b.dataset.rating) || 0;
                return ratingALow - ratingBLow;
            
            case 'experience':
                const expA = parseInt(a.dataset.experience) || 0;
                const expB = parseInt(b.dataset.experience) || 0;
                return expB - expA;
            
            default:
                return 0;
        }
    });
    
    // Clear grid
    coachesGrid.innerHTML = '';
    
    // Re-append sorted and filtered cards
    filteredCards.forEach(card => {
        coachesGrid.appendChild(card);
    });
    
    // Show message if no results
    if (filteredCards.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.style.cssText = 'text-align: center; padding: 3rem; color: var(--text-secondary);';
        noResults.innerHTML = `
            <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
            <p style="font-size: 1.1rem;">No coaches found matching your search.</p>
        `;
        coachesGrid.appendChild(noResults);
    }
}

function resetFilters() {
    const searchInput = document.getElementById('searchInput');
    const sortFilter = document.getElementById('sortFilter');
    
    if (searchInput) searchInput.value = '';
    if (sortFilter) sortFilter.value = 'name';
    
    applyFilters();
}

// Close modals on outside click
document.addEventListener('click', function(e) {
    const ratingModal = document.getElementById('ratingModal');
    const ratingSuccessModal = document.getElementById('ratingSuccessModal');
    const switchModal = document.getElementById('switchModal');
    const notificationModal = document.getElementById('notificationModal');
    
    if (ratingModal && e.target === ratingModal) {
        closeRatingModal();
    }
    if (ratingSuccessModal && e.target === ratingSuccessModal) {
        closeRatingSuccessModal();
    }
    if (switchModal && e.target === switchModal) {
        closeSwitchModal();
    }
    if (notificationModal && e.target === notificationModal) {
        closeNotificationModal();
    }
    const messageModal = document.getElementById('messageModal');
    const scheduleModal = document.getElementById('scheduleModal');
    if (messageModal && e.target === messageModal) {
        closeMessageModal();
    }
    if (scheduleModal && e.target === scheduleModal) {
        closeScheduleModal();
    }
});

// Message Coach Modal Functions
function openMessageModal(coachName) {
    const modal = document.getElementById('messageModal');
    const nameElement = document.getElementById('messageCoachName');
    
    if (modal && nameElement) {
        nameElement.textContent = coachName;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on message input
        setTimeout(() => {
            const input = document.getElementById('messageInput');
            if (input) input.focus();
        }, 100);
    }
}

function closeMessageModal() {
    const modal = document.getElementById('messageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function sendCoachMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        const container = document.getElementById('messageChatContainer');
        const now = new Date();
        const timeStr = 'Just now';
        
        const messageHTML = `
            <div class="message sent" style="margin-bottom: 1rem; display: flex; justify-content: flex-end;">
                <div style="flex: 1; margin-right: 0.75rem; text-align: right;">
                    <div class="message-content" style="background: linear-gradient(135deg, var(--primary-yellow), #E6B800); padding: 0.75rem 1rem; border-radius: 12px; display: inline-block; max-width: 80%;">
                        <div class="message-text" style="color: #1a1a1a; font-size: 0.9rem; line-height: 1.5;">${message}</div>
                        <div class="message-time" style="color: rgba(26, 26, 26, 0.7); font-size: 0.75rem; margin-top: 0.5rem;">${timeStr}</div>
                    </div>
                </div>
                <div class="message-avatar" style="width: 32px; height: 32px; border-radius: 50%; background: rgba(255, 255, 255, 0.1); display: flex; align-items: center; justify-content: center; font-size: 0.9rem; color: var(--text-primary); font-weight: 600; flex-shrink: 0;">AQ</div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforeend', messageHTML);
        container.scrollTop = container.scrollHeight;
        input.value = '';
        input.style.height = 'auto';
    }
}

// View Schedule Modal Functions
function openScheduleModal(coachName) {
    const modal = document.getElementById('scheduleModal');
    const nameElement = document.getElementById('scheduleCoachName');
    
    if (modal && nameElement) {
        nameElement.textContent = coachName;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeScheduleModal() {
    const modal = document.getElementById('scheduleModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeRatingModal();
        closeRatingSuccessModal();
        closeSwitchModal();
        closeNotificationModal();
        closeMessageModal();
        closeScheduleModal();
        closeChatPanel();
        closeNotificationPanel();
    }
});

// View Profile Modal Functions
function openViewProfileModal(coachName, rating, experience, title) {
    const modal = document.getElementById('viewProfileModal');
    const content = document.getElementById('profileModalContent');
    
    if (!modal || !content) return;
    
    // Get coach data from the card
    const coachCard = Array.from(document.querySelectorAll('.coach-card')).find(card => {
        return card.querySelector('.coach-name')?.textContent.includes(coachName);
    });
    
    if (!coachCard) return;
    
    // Extract data
    const description = coachCard.querySelector('.coach-description')?.textContent || 'No description available.';
    const expertiseTags = Array.from(coachCard.querySelectorAll('.expertise-tag')).map(tag => tag.textContent);
    const availability = coachCard.querySelector('.availability-status')?.textContent.trim() || 'Available';
    
    // Build modal content
    content.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <div class="coach-photo" style="width: 120px; height: 120px; margin: 0 auto 1rem;">
                <i class="fas fa-user"></i>
            </div>
            <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">${coachName}</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                <i class="fas fa-award"></i> ${title}
            </p>
            <div style="display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-star" style="color: var(--primary-yellow);"></i>
                    <strong style="color: var(--text-primary);">${rating}</strong>
                    <span style="color: var(--text-secondary);">Rating</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-calendar" style="color: var(--text-secondary);"></i>
                    <strong style="color: var(--text-primary);">${experience}</strong>
                    <span style="color: var(--text-secondary);">Years Experience</span>
                </div>
            </div>
            <div class="availability-status available" style="display: inline-flex; margin-bottom: 1.5rem;">
                <i class="fas fa-circle"></i> ${availability}
            </div>
        </div>
        
        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: var(--text-primary); margin-bottom: 0.75rem; font-size: 0.95rem;">
                <i class="fas fa-info-circle"></i> About
            </h4>
            <p style="color: var(--text-secondary); line-height: 1.6;">
                ${description}
            </p>
        </div>
        
        <div>
            <h4 style="color: var(--text-primary); margin-bottom: 0.75rem; font-size: 0.95rem;">
                <i class="fas fa-dumbbell"></i> Expertise Areas
            </h4>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center;">
                ${expertiseTags.map(tag => `
                    <span class="expertise-tag" style="display: inline-block;">${tag}</span>
                `).join('')}
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeViewProfileModal() {
    const modal = document.getElementById('viewProfileModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const viewProfileModal = document.getElementById('viewProfileModal');
    if (viewProfileModal && e.target === viewProfileModal) {
        closeViewProfileModal();
    }
});

// Close modal on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeViewProfileModal();
    }
});

// Auto-resize message textarea and send on Enter
document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
        
        messageInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendCoachMessage();
            }
        });
    }
});

// Initialize sidebar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSidebarHover);
} else {
    initializeSidebarHover();
}
