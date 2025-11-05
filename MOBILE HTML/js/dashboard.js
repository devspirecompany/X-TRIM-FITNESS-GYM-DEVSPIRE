// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
    setupEventListeners();
    animateProgressElements();
});

// Initialize dashboard with user data
function initializeDashboard() {
    // Simulate loading user data
    const userData = {
        name: 'Ashley Quicho',
        dailyGoalProgress: 60,
        nextWorkout: {
            title: 'Upper Body Strength',
            time: 'Today, 6:00 PM',
            duration: '45 min',
            activities: 3
        },
        progress: {
            weightLost: -5,
            muscleGain: 3,
            streak: 7
        },
        nutrition: {
            consumed: 1200,
            goal: 1800,
            protein: 85,
            carbs: 140,
            fats: 45
        },
        latestAchievement: {
            title: '30-Day Streak Master',
            date: 'Oct 8, 2025'
        }
    };

    // Update nutrition progress ring
    updateCaloriesProgress(userData.nutrition.consumed, userData.nutrition.goal);

    console.log('Dashboard initialized with user data:', userData);
}

// Setup event listeners for interactive elements
function setupEventListeners() {
    // Start Workout button
    const startWorkoutBtn = document.querySelector('.btn-start-workout');
    if (startWorkoutBtn) {
        startWorkoutBtn.addEventListener('click', handleStartWorkout);
    }

    // Share Achievement button
    const shareBtn = document.querySelector('.btn-share');
    if (shareBtn) {
        shareBtn.addEventListener('click', handleShareAchievement);
    }

    // Message Coach button
    const messageBtn = document.querySelector('.btn-message');
    if (messageBtn) {
        messageBtn.addEventListener('click', handleMessageCoach);
    }

    // Notification button
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', handleNotifications);
    }

    // Bottom navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', handleNavigation);
    });

    // View all links
    const viewAllLinks = document.querySelectorAll('.view-all');
    viewAllLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.closest('.section');
            const sectionName = section.classList[1] || 'section';
            console.log(`Navigating to ${sectionName} full view`);
            // Add navigation logic here
        });
    });
}

// Handle Start Workout button click
function handleStartWorkout() {
    console.log('Starting workout...');
    
    // Add loading state
    const btn = document.querySelector('.btn-start-workout');
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Starting...';
    btn.disabled = true;

    // Simulate loading
    setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.disabled = false;
        alert('🏋️ Workout session starting!\n\nYou would be redirected to the workout detail page.');
    }, 1000);
}

// Handle Share Achievement button click
function handleShareAchievement() {
    console.log('Sharing achievement...');
    
    // Check if Web Share API is available
    if (navigator.share) {
        navigator.share({
            title: '30-Day Streak Master',
            text: 'I just unlocked the 30-Day Streak Master achievement at X-TRIM FIT GYM! 🏆',
            url: window.location.href
        }).then(() => {
            console.log('Achievement shared successfully');
        }).catch((error) => {
            console.log('Error sharing:', error);
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
}

// Fallback share method
function fallbackShare() {
    const shareText = 'I just unlocked the 30-Day Streak Master achievement! 🏆';
    
    // Copy to clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            showToast('✓ Achievement copied to clipboard!');
        });
    } else {
        alert('Share: ' + shareText);
    }
}

// Handle Message Coach button click
function handleMessageCoach() {
    console.log('Opening coach messaging...');
    alert('💬 Opening message with Coach Mike Rodriguez...\n\nYou would be redirected to the messaging interface.');
}

// Handle Notifications button click
function handleNotifications() {
    console.log('Opening notifications...');
    const badge = document.querySelector('.notification-badge');
    const count = badge ? parseInt(badge.textContent) : 0;
    alert(`🔔 You have ${count} new notification${count !== 1 ? 's' : ''}:\n\n• Session reminder: Your workout starts in 2 hours\n• New achievement unlocked!\n• Coach Mike sent you a message`);
}

// Handle bottom navigation
function handleNavigation(e) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    e.currentTarget.classList.add('active');
    
    const navText = e.currentTarget.querySelector('span').textContent;
    console.log(`Navigating to: ${navText}`);
    
    // Add haptic feedback if available
    if (window.navigator.vibrate) {
        window.navigator.vibrate(10);
    }
}

// Update calories progress ring
function updateCaloriesProgress(consumed, goal) {
    const progressRing = document.querySelector('.progress-ring-progress');
    if (!progressRing) return;

    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const percentage = (consumed / goal) * 100;
    const offset = circumference - (percentage / 100) * circumference;

    // Add gradient definition
    if (!document.querySelector('#gradient')) {
        const svg = document.querySelector('.progress-ring');
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'gradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '100%');
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', '#E41E26');
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', '#F9C513');
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.insertBefore(defs, svg.firstChild);
    }

    progressRing.style.strokeDashoffset = offset;
}

// Animate progress elements on load
function animateProgressElements() {
    // Animate goal progress bar
    const goalProgress = document.querySelector('.goal-progress-fill');
    if (goalProgress) {
        const targetWidth = goalProgress.style.width;
        goalProgress.style.width = '0';
        setTimeout(() => {
            goalProgress.style.width = targetWidth;
        }, 300);
    }

    // Animate progress cards with stagger
    const progressCards = document.querySelectorAll('.progress-card');
    progressCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 400 + (index * 100));
    });

    // Animate achievement badge
    const achievementBadge = document.querySelector('.achievement-badge');
    if (achievementBadge) {
        achievementBadge.style.transform = 'scale(0)';
        setTimeout(() => {
            achievementBadge.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            achievementBadge.style.transform = 'scale(1)';
        }, 600);
    }
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(249, 197, 19, 0.95);
        color: #13161f;
        padding: 12px 24px;
        border-radius: 12px;
        font-weight: 500;
        font-size: 0.9rem;
        z-index: 1000;
        animation: slideUp 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translate(-50%, 20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, 20px);
        }
    }
`;
document.head.appendChild(style);

// Refresh data periodically (for demo purposes)
function refreshDashboardData() {
    console.log('Refreshing dashboard data...');
    // In a real app, this would fetch fresh data from an API
    // For now, we'll just log that it happened
}

// Set up periodic refresh (every 5 minutes)
setInterval(refreshDashboardData, 5 * 60 * 1000);

// Handle pull-to-refresh (basic implementation)
let touchStartY = 0;
let isPulling = false;

document.addEventListener('touchstart', (e) => {
    if (window.scrollY === 0) {
        touchStartY = e.touches[0].clientY;
        isPulling = true;
    }
});

document.addEventListener('touchmove', (e) => {
    if (isPulling) {
        const touchY = e.touches[0].clientY;
        const pullDistance = touchY - touchStartY;
        
        if (pullDistance > 80) {
            isPulling = false;
            showToast('🔄 Refreshing...');
            setTimeout(() => {
                refreshDashboardData();
                showToast('✓ Dashboard updated!');
            }, 1000);
        }
    }
});

document.addEventListener('touchend', () => {
    isPulling = false;
});

// Log when user becomes inactive
let inactivityTimer;
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('User left the app');
        clearTimeout(inactivityTimer);
    } else {
        console.log('User returned to the app');
        // Check if we need to refresh data
        inactivityTimer = setTimeout(refreshDashboardData, 30000);
    }
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Dashboard loaded in ${loadTime.toFixed(2)}ms`);
});

console.log('Dashboard JavaScript initialized successfully');