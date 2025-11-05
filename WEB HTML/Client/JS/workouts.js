// Workout details data
const workoutDetails = {
    workout1: {
        title: 'Upper Body Strength',
        exercises: [
            {
                name: 'Barbell Bench Press',
                sets: 4,
                reps: '8-10',
                rest: '90s',
                weight: '185 lbs',
                notes: 'Focus on controlled movement. Lower the bar to chest level, pause briefly, then press up explosively.'
            },
            {
                name: 'Incline Dumbbell Press',
                sets: 3,
                reps: '10-12',
                rest: '60s',
                weight: '65 lbs',
                notes: 'Set bench to 30-45 degree angle. Keep dumbbells aligned with upper chest.'
            },
            {
                name: 'Bent Over Barbell Row',
                sets: 4,
                reps: '8-10',
                rest: '90s',
                weight: '155 lbs',
                notes: 'Maintain a flat back with hips hinged. Pull bar to lower chest.'
            },
            {
                name: 'Overhead Shoulder Press',
                sets: 3,
                reps: '10-12',
                rest: '60s',
                weight: '95 lbs',
                notes: 'Keep core tight and avoid excessive back arching.'
            },
            {
                name: 'Cable Tricep Pushdown',
                sets: 3,
                reps: '12-15',
                rest: '45s',
                weight: '80 lbs',
                notes: 'Keep elbows tucked to sides. Full extension at bottom.'
            }
        ]
    },
    workout2: {
        title: 'HIIT Cardio Session',
        exercises: [
            { name: 'Burpees', sets: 4, reps: '15', rest: '30s', notes: 'Explosive movement, full body engagement' },
            { name: 'Mountain Climbers', sets: 4, reps: '20 each', rest: '30s', notes: 'Keep core tight, fast pace' },
            { name: 'Jump Squats', sets: 4, reps: '12', rest: '30s', notes: 'Land softly, full depth' },
            { name: 'High Knees', sets: 4, reps: '30s', rest: '30s', notes: 'Drive knees up, fast tempo' },
            { name: 'Sprint Intervals', sets: 5, reps: '30s', rest: '60s', notes: 'Maximum effort sprints' },
            { name: 'Cool Down Stretch', sets: 1, reps: '5 min', rest: '-', notes: 'Light stretching and walking' }
        ]
    },
    workout3: {
        title: 'Lower Body Power',
        exercises: [
            { name: 'Barbell Squats', sets: 5, reps: '5-8', rest: '120s', weight: '225 lbs', notes: 'Full depth, explosive drive up' },
            { name: 'Romanian Deadlifts', sets: 4, reps: '8-10', rest: '90s', weight: '185 lbs', notes: 'Feel stretch in hamstrings' },
            { name: 'Leg Press', sets: 4, reps: '10-12', rest: '60s', weight: '350 lbs', notes: 'Control descent, explosive press' },
            { name: 'Walking Lunges', sets: 3, reps: '12 each', rest: '60s', weight: '40 lbs', notes: 'Keep torso upright' },
            { name: 'Standing Calf Raises', sets: 4, reps: '15-20', rest: '45s', weight: '135 lbs', notes: 'Full range of motion' }
        ]
    },
    workout4: {
        title: 'Full Body Workout',
        exercises: [
            { name: 'Push-ups', sets: 4, reps: '15-20', rest: '60s', notes: 'Chest to ground, full extension' },
            { name: 'Pull-ups', sets: 4, reps: '8-12', rest: '90s', notes: 'Full range, controlled descent' },
            { name: 'Goblet Squats', sets: 4, reps: '12-15', rest: '60s', weight: '50 lbs', notes: 'Hold dumbbell at chest' },
            { name: 'Planks', sets: 3, reps: '60s', rest: '45s', notes: 'Maintain straight line' },
            { name: 'Russian Twists', sets: 3, reps: '20 each', rest: '45s', weight: '25 lbs', notes: 'Control rotation' },
            { name: 'Burpees', sets: 3, reps: '10', rest: '60s', notes: 'Explosive movement' }
        ]
    },
    workout5: {
        title: 'Yoga & Stretching',
        exercises: [
            { name: 'Sun Salutation', sets: 3, reps: '5', rest: '30s', notes: 'Flow through sequence smoothly' },
            { name: 'Downward Dog', sets: 1, reps: '2 min', rest: '-', notes: 'Hold pose, breathe deeply' },
            { name: 'Warrior Pose', sets: 2, reps: '1 min each', rest: '30s', notes: 'Strong foundation' },
            { name: 'Tree Pose', sets: 2, reps: '1 min each', rest: '30s', notes: 'Focus on balance' },
            { name: "Child's Pose", sets: 1, reps: '3 min', rest: '-', notes: 'Relax and breathe' },
            { name: 'Hamstring Stretch', sets: 2, reps: '1 min each', rest: '30s', notes: 'Feel gentle stretch' },
            { name: 'Hip Flexor Stretch', sets: 2, reps: '1 min each', rest: '30s', notes: 'Maintain upright torso' },
            { name: 'Final Relaxation', sets: 1, reps: '5 min', rest: '-', notes: 'Complete stillness' }
        ]
    },
    workout6: {
        title: 'Chest & Back Focus',
        exercises: [
            { name: 'Flat Bench Press', sets: 4, reps: '8-10', rest: '90s', weight: '185 lbs', notes: 'Control bar path' },
            { name: 'Incline Barbell Press', sets: 4, reps: '8-10', rest: '90s', weight: '155 lbs', notes: '30 degree incline' },
            { name: 'Cable Chest Flyes', sets: 3, reps: '12-15', rest: '60s', weight: '40 lbs', notes: 'Squeeze at center' },
            { name: 'Wide Grip Pull-ups', sets: 4, reps: '8-10', rest: '90s', notes: 'Full range of motion' },
            { name: 'Seated Cable Rows', sets: 4, reps: '10-12', rest: '60s', weight: '120 lbs', notes: 'Squeeze shoulder blades' },
            { name: 'Face Pulls', sets: 3, reps: '15', rest: '45s', weight: '60 lbs', notes: 'Target rear delts' },
            { name: 'Barbell Shrugs', sets: 3, reps: '12-15', rest: '45s', weight: '185 lbs', notes: 'Control at top' }
        ]
    }
};

// Toggle profile dropdown
function toggleProfileDropdown() {
    const profile = document.querySelector('.user-profile');
    profile.classList.toggle('active');
}

// Close dropdown when clicking outside
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

// Filter functions
function applyFilters() {
    const typeFilter = document.getElementById('workoutTypeFilter').value;
    const difficultyFilter = document.getElementById('difficultyFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    const workoutCards = document.querySelectorAll('.workout-card');
    
    workoutCards.forEach(card => {
        const type = card.getAttribute('data-type');
        const difficulty = card.getAttribute('data-difficulty');
        const status = card.getAttribute('data-status');
        
        const typeMatch = typeFilter === 'all' || type === typeFilter;
        const difficultyMatch = difficultyFilter === 'all' || difficulty === difficultyFilter;
        const statusMatch = statusFilter === 'all' || status === statusFilter;
        
        if (typeMatch && difficultyMatch && statusMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function resetFilters() {
    document.getElementById('workoutTypeFilter').value = 'all';
    document.getElementById('difficultyFilter').value = 'all';
    document.getElementById('statusFilter').value = 'all';
    
    const workoutCards = document.querySelectorAll('.workout-card');
    workoutCards.forEach(card => {
        card.style.display = 'block';
    });
}

// Sort workouts by date on page load
document.addEventListener('DOMContentLoaded', function() {
    sortWorkoutsByDateTime();
});

function sortWorkoutsByDateTime() {
    const container = document.getElementById('workoutsContainer');
    if (!container) return;
    
    const cards = Array.from(container.querySelectorAll('.workout-card'));
    
    cards.sort((a, b) => {
        const dateA = new Date(a.getAttribute('data-date') + ' ' + a.getAttribute('data-time'));
        const dateB = new Date(b.getAttribute('data-date') + ' ' + b.getAttribute('data-time'));
        return dateA - dateB;
    });
    
    cards.forEach(card => container.appendChild(card));
}

// Workout Details Modal
function openWorkoutDetails(workoutId, isActive = false) {
    const modal = document.getElementById('workoutDetailsModal');
    const content = document.getElementById('workoutDetailsContent');
    const footer = modal.querySelector('.modal-footer');
    const workout = workoutDetails[workoutId];
    
    if (!workout) return;
    
    // Store workoutId for start button
    modal.dataset.workoutId = workoutId;
    modal.dataset.isActive = isActive;
    
    let html = `
        <h4 style="color: var(--text-primary); margin-bottom: 1.5rem;">${workout.title}</h4>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
    `;
    
    workout.exercises.forEach((exercise, index) => {
        html += `
            <div style="background: rgba(255, 255, 255, 0.03); padding: 1.25rem; border-radius: 12px; border-left: 3px solid var(--primary-yellow);">
                <h5 style="color: var(--text-primary); font-size: 1rem; margin-bottom: 0.75rem; font-weight: 600;">
                    ${index + 1}. ${exercise.name}
                </h5>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 0.75rem; margin-bottom: 0.75rem;">
                    <div>
                        <div style="color: var(--text-secondary); font-size: 0.75rem; margin-bottom: 0.25rem;">Sets</div>
                        <div style="color: var(--text-primary); font-weight: 600;">${exercise.sets}</div>
                    </div>
                    <div>
                        <div style="color: var(--text-secondary); font-size: 0.75rem; margin-bottom: 0.25rem;">Reps</div>
                        <div style="color: var(--text-primary); font-weight: 600;">${exercise.reps}</div>
                    </div>
                    <div>
                        <div style="color: var(--text-secondary); font-size: 0.75rem; margin-bottom: 0.25rem;">Rest</div>
                        <div style="color: var(--text-primary); font-weight: 600;">${exercise.rest}</div>
                    </div>
                    ${exercise.weight ? `
                    <div>
                        <div style="color: var(--text-secondary); font-size: 0.75rem; margin-bottom: 0.25rem;">Weight</div>
                        <div style="color: var(--text-primary); font-weight: 600;">${exercise.weight}</div>
                    </div>
                    ` : ''}
                </div>
                ${exercise.notes ? `
                <div style="background: rgba(59, 130, 246, 0.08); border-left: 2px solid #3b82f6; padding: 0.75rem; border-radius: 6px; margin-top: 0.5rem;">
                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin: 0; line-height: 1.5;">
                        <strong style="color: #3b82f6;">Note:</strong> ${exercise.notes}
                    </p>
                </div>
                ` : ''}
            </div>
        `;
    });
    
    html += '</div>';
    content.innerHTML = html;
    
    // Update footer based on isActive
    if (isActive) {
        footer.innerHTML = `
            <button class="btn-secondary" onclick="closeWorkoutDetailsModal()">
                <i class="fas fa-times"></i> Cancel
            </button>
            <button class="btn-primary" onclick="startWorkoutSession('${workoutId}')">
                <i class="fas fa-play"></i> Start Workout
            </button>
        `;
    } else {
        footer.innerHTML = `
            <button class="btn-secondary" onclick="closeWorkoutDetailsModal()">
                <i class="fas fa-times"></i> Close
            </button>
        `;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeWorkoutDetailsModal() {
    const modal = document.getElementById('workoutDetailsModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function startWorkoutSession(workoutId) {
    const workout = workoutDetails[workoutId];
    if (!workout) return;
    
    // Close the modal
    closeWorkoutDetailsModal();
    
    // Show success message
    showToast(`🏋️ Starting ${workout.title} workout!`, 'success');
    
    // In a real app, this would redirect to a workout session/tracking page
    // For now, we'll just show a message
    console.log(`Starting workout session: ${workoutId}`);
    console.log(`Workout: ${workout.title}`);
    console.log(`Exercises: ${workout.exercises.length}`);
    
    // TODO: Redirect to workout session page when available
    // window.location.href = `workout-session.html?workout=${workoutId}`;
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Request Change Modal
function openRequestChangeModal() {
    const modal = document.getElementById('requestChangeModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeRequestChangeModal() {
    const modal = document.getElementById('requestChangeModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function submitPlanChangeRequest(event) {
    event.preventDefault();
    
    closeRequestChangeModal();
    
    const successModal = document.getElementById('successModal');
    successModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    document.getElementById('requestChangeForm').reset();
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
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
                    "Great! Let me know if you need any adjustments to your plan.",
                    "Got it! I'll review and get back to you soon.",
                    "Thanks for the update! Keep up the good work!",
                    "I've noted that down. Is there anything else you'd like to discuss?",
                    "Perfect! I'll make those changes to your schedule."
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

// Close modals when clicking on overlay
document.addEventListener('DOMContentLoaded', function() {
    const modals = ['workoutDetailsModal', 'requestChangeModal', 'successModal'];
    
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

// Close everything on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeWorkoutDetailsModal();
        closeRequestChangeModal();
        closeSuccessModal();
        closeNotificationPanel();
        closeChatPanel();
    }
});