// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeWorkoutPlans();
    setupEventListeners();
    setupScrollBehaviors();
});

// State management
let currentFilter = 'all';
let searchQuery = '';

// Initialize workout plans page
function initializeWorkoutPlans() {
    console.log('Workout Plans page initialized');
    
    // Simulate loading workout data
    const workoutData = {
        totalPlans: 8,
        activePlans: 2,
        recommendedPlans: 2,
        categories: ['full-body', 'upper-body', 'lower-body', 'cardio', 'hiit', 'yoga', 'strength']
    };
    
    console.log('Workout data loaded:', workoutData);
}

// Setup event listeners
function setupEventListeners() {
    // Search button
    const searchBtn = document.getElementById('searchBtn');
    const searchBarContainer = document.getElementById('searchBarContainer');
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            searchBtn.classList.toggle('active');
            searchBarContainer.classList.toggle('active');
            if (searchBarContainer.classList.contains('active')) {
                setTimeout(() => searchInput.focus(), 300);
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    if (clearSearch) {
        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            searchQuery = '';
            clearSearch.classList.remove('visible');
            filterWorkouts();
        });
    }
    
    // Category filters
    const categoryChips = document.querySelectorAll('.category-chip');
    categoryChips.forEach(chip => {
        chip.addEventListener('click', () => handleCategoryFilter(chip));
    });
    
    // Featured workout buttons
    const featuredBtns = document.querySelectorAll('.btn-featured');
    featuredBtns.forEach(btn => {
        btn.addEventListener('click', () => handleStartPlan(btn));
    });
    
    // Continue buttons
    const continueBtns = document.querySelectorAll('.btn-continue');
    continueBtns.forEach(btn => {
        btn.addEventListener('click', () => handleContinuePlan(btn));
    });
    
    // View workout buttons
    const viewBtns = document.querySelectorAll('.btn-view');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => handleViewWorkout(btn));
    });
    
    // Sort button
    const sortBtn = document.getElementById('sortBtn');
    if (sortBtn) {
        sortBtn.addEventListener('click', handleSort);
    }
    
    // Floating Action Button
    const createNewBtn = document.getElementById('createNewBtn');
    if (createNewBtn) {
        createNewBtn.addEventListener('click', handleCreateNew);
    }
    
    // Bottom navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', handleNavigation);
    });
}

// Handle search input
function handleSearch(e) {
    searchQuery = e.target.value.toLowerCase();
    const clearBtn = document.getElementById('clearSearch');
    
    if (searchQuery.length > 0) {
        clearBtn.classList.add('visible');
    } else {
        clearBtn.classList.remove('visible');
    }
    
    filterWorkouts();
}

// Handle category filtering
function handleCategoryFilter(chip) {
    // Remove active class from all chips
    document.querySelectorAll('.category-chip').forEach(c => {
        c.classList.remove('active');
    });
    
    // Add active class to clicked chip
    chip.classList.add('active');
    
    // Update current filter
    currentFilter = chip.dataset.category;
    
    // Apply filter
    filterWorkouts();
    
    // Haptic feedback
    if (window.navigator.vibrate) {
        window.navigator.vibrate(10);
    }
    
    console.log(`Filter changed to: ${currentFilter}`);
}

// Filter workouts based on category and search
function filterWorkouts() {
    const workoutCards = document.querySelectorAll('.workout-card');
    let visibleCount = 0;
    
    workoutCards.forEach(card => {
        const category = card.dataset.category;
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.workout-description').textContent.toLowerCase();
        
        const matchesCategory = currentFilter === 'all' || category === currentFilter;
        const matchesSearch = searchQuery === '' || 
                             title.includes(searchQuery) || 
                             description.includes(searchQuery);
        
        if (matchesCategory && matchesSearch) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeIn 0.3s ease';
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });
    
    console.log(`${visibleCount} workouts visible`);
}

// Handle start plan button
function handleStartPlan(btn) {
    const workoutId = btn.dataset.workout;
    console.log(`Starting workout plan: ${workoutId}`);
    
    // Add loading state
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Starting...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.disabled = false;
        showToast('🎯 Workout plan started successfully!');
        
        // In real app, navigate to workout detail page
        console.log(`Would navigate to workout detail for: ${workoutId}`);
    }, 1000);
}

// Handle continue plan button
function handleContinuePlan(btn) {
    const planId = btn.dataset.plan;
    console.log(`Continuing plan: ${planId}`);
    
    showToast('▶️ Resuming your workout...');
    
    setTimeout(() => {
        console.log(`Would navigate to workout session for: ${planId}`);
    }, 500);
}

// Handle view workout button
function handleViewWorkout(btn) {
    const workoutId = btn.dataset.workout;
    console.log(`Viewing workout: ${workoutId}`);
    
    // Animate button
    btn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        btn.style.transform = '';
    }, 200);
    
    // In real app, navigate to workout detail page
    setTimeout(() => {
        showToast('📋 Opening workout details...');
        console.log(`Would navigate to workout detail for: ${workoutId}`);
    }, 300);
}

// Handle sort button
function handleSort() {
    const sortOptions = [
        'Most Popular',
        'Newest First',
        'Shortest Duration',
        'Longest Duration',
        'Easiest First',
        'Hardest First'
    ];
    
    const option = sortOptions[Math.floor(Math.random() * sortOptions.length)];
    showToast(`🔄 Sorting by: ${option}`);
    
    console.log(`Would sort workouts by: ${option}`);
}

// Handle create new workout
function handleCreateNew() {
    console.log('Create new custom workout');
    
    // Animate FAB
    const fab = document.getElementById('createNewBtn');
    fab.style.transform = 'rotate(45deg) scale(0.9)';
    
    setTimeout(() => {
        fab.style.transform = '';
        showToast('➕ Opening custom workout creator...');
        console.log('Would navigate to custom workout creation page');
    }, 200);
}

// Handle bottom navigation
function handleNavigation(e) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    e.currentTarget.classList.add('active');
    
    const navText = e.currentTarget.querySelector('span').textContent;
    console.log(`Navigating to: ${navText}`);
    
    // Haptic feedback
    if (window.navigator.vibrate) {
        window.navigator.vibrate(10);
    }
}

// Setup scroll behaviors
function setupScrollBehaviors() {
    // Active plans scroll indicator
    const activePlansScroll = document.getElementById('activePlansScroll');
    const scrollIndicators = document.getElementById('scrollIndicators');
    
    if (activePlansScroll && scrollIndicators) {
        activePlansScroll.addEventListener('scroll', () => {
            updateScrollIndicators(activePlansScroll, scrollIndicators);
        });
    }
    
    // Smooth scroll for categories
    const categoriesScroll = document.getElementById('categoriesScroll');
    if (categoriesScroll) {
        // Auto-scroll active category into view
        const activeCategory = categoriesScroll.querySelector('.category-chip.active');
        if (activeCategory) {
            activeCategory.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }
}

// Update scroll indicators for active plans
function updateScrollIndicators(scrollContainer, indicators) {
    const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const scrollPosition = scrollContainer.scrollLeft;
    const scrollPercentage = scrollWidth > 0 ? scrollPosition / scrollWidth : 0;
    
    const dots = indicators.querySelectorAll('.dot');
    const activeDotIndex = Math.round(scrollPercentage * (dots.length - 1));
    
    dots.forEach((dot, index) => {
        if (index === activeDotIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
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
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        max-width: 80%;
        text-align: center;
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
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Pull-to-refresh functionality
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
            showToast('🔄 Refreshing workout plans...');
            setTimeout(() => {
                showToast('✓ Workouts updated!');
            }, 1000);
        }
    }
});

document.addEventListener('touchend', () => {
    isPulling = false;
});

// Keyboard shortcuts for search
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const searchBarContainer = document.getElementById('searchBarContainer');
        const searchBtn = document.getElementById('searchBtn');
        if (searchBarContainer.classList.contains('active')) {
            searchBtn.click();
        }
    }
});

// Track scroll position for header shadow
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.top-header');
    
    if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScrollY = window.scrollY;
});

// Initialize animations on load
window.addEventListener('load', () => {
    const workoutCards = document.querySelectorAll('.workout-card');
    workoutCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
    });
    
    const loadTime = performance.now();
    console.log(`Workout Plans page loaded in ${loadTime.toFixed(2)}ms`);
});

// Handle visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('User left the workout plans page');
    } else {
        console.log('User returned to workout plans page');
    }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleCategoryFilter,
        filterWorkouts,
        handleSearch
    };
}

console.log('Workout Plans JavaScript initialized successfully');