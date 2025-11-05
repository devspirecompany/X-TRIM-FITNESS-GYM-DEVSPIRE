// Mobile Homepage JavaScript for X-TRIM FIT GYM

// Prevent default touch behaviors that might interfere with custom interactions
document.addEventListener('touchmove', function(e) {
    if (e.target.closest('.chat-panel') || e.target.closest('.mobile-nav')) {
        // Allow scrolling within these elements
    }
}, { passive: true });

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const closeMenu = document.getElementById('closeMenu');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenuPanel() {
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
}

menuToggle.addEventListener('click', openMenu);
closeMenu.addEventListener('click', closeMenuPanel);
navOverlay.addEventListener('click', closeMenuPanel);

// Close menu when clicking a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            closeMenuPanel();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = 70;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            closeMenuPanel();
        }
    });
});

// Highlight active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNavLink() {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Chat Panel Toggle - safe guards in case chat HTML is removed
const chatBtn = document.getElementById('chatBtn');
const chatPanel = document.getElementById('chatPanel');
const closeChat = document.getElementById('closeChat');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');

function closeChatPanel() {
    if (chatPanel) {
        chatPanel.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openChat() {
    if (chatPanel) {
        chatPanel.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            if (chatInput) chatInput.focus();
        }, 300);
    }
}

// Attach chat-specific listeners only if all required elements exist
if (chatBtn && closeChat && chatInput && sendBtn && chatMessages) {
    chatBtn.addEventListener('click', openChat);
    closeChat.addEventListener('click', closeChatPanel);

    // Auto-resize chat input
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });

    // Helper function to escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        
        if (message) {
            const messageHTML = `
                <div class="message sent">
                    <div class="message-avatar">You</div>
                    <div class="message-bubble">
                        <div class="message-text">${escapeHtml(message)}</div>
                        <div class="message-time">Just now</div>
                    </div>
                </div>
            `;
            
            chatMessages.insertAdjacentHTML('beforeend', messageHTML);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            chatInput.value = '';
            chatInput.style.height = 'auto';
            
            // Simulate coach response after 2 seconds
            setTimeout(() => {
                const responseHTML = `
                    <div class="message received">
                        <div class="message-avatar">CM</div>
                        <div class="message-bubble">
                            <div class="message-sender">Coach Mike</div>
                            <div class="message-text">Thanks for your message! I'll get back to you shortly.</div>
                            <div class="message-time">Just now</div>
                        </div>
                    </div>
                `;
                chatMessages.insertAdjacentHTML('beforeend', responseHTML);
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Add vibration feedback on mobile
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }, 2000);
        }
    }

    sendBtn.addEventListener('click', sendMessage);

    // Send message on Enter key (without Shift)
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

// Coaches Slider with Touch Support
const coachesSlider = document.querySelector('.coaches-slider');
const coachCards = document.querySelectorAll('.coach-card');
const dotsContainer = document.getElementById('coachDots');

// Create slider dots
coachCards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        scrollToSlide(index);
    });
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateActiveDot() {
    const scrollLeft = coachesSlider.scrollLeft;
    const cardWidth = coachCards[0].offsetWidth + 20; // Include gap
    const activeIndex = Math.round(scrollLeft / cardWidth);
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}

function scrollToSlide(index) {
    const cardWidth = coachCards[0].offsetWidth + 20;
    coachesSlider.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
    });
}

let scrollTimeout;
coachesSlider.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveDot, 100);
}, { passive: true });

// Floating Action Button (may be removed from HTML). Keep safe reference and only attach listeners if present.
const fab = document.getElementById('fabBtn');

if (fab) {
    fab.addEventListener('click', function() {
        // Add haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // Default action: scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Hide/show FAB on scroll
let lastScrollTop = 0;
const header = document.querySelector('.mobile-header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show/hide header on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
        if (fab) {
            fab.style.opacity = '0';
            fab.style.pointerEvents = 'none';
        }
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
        if (fab) {
            if (scrollTop > 300) {
                fab.style.opacity = '1';
                fab.style.pointerEvents = 'auto';
            }
        }
    }
    
    lastScrollTop = scrollTop;
}, { passive: true });

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const headerHeight = 70;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Service card interactions
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('learn-more-btn')) {
            // Add subtle haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        }
    });
});

// Learn more button actions
document.querySelectorAll('.learn-more-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (navigator.vibrate) {
            navigator.vibrate(40);
        }
        // Here you would navigate to service detail page or show modal
        alert('Service details coming soon!');
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .coach-card, .stat-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(el);
});

// Pull-to-refresh functionality (optional)
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    if (window.scrollY === 0) {
        touchStartY = e.touches[0].clientY;
    }
}, { passive: true });

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].clientY;
    
    if (touchStartY > 0 && touchEndY - touchStartY > 100 && window.scrollY === 0) {
        // Pull-to-refresh triggered
        // Add your refresh logic here
        console.log('Pull to refresh triggered');
    }
    
    touchStartY = 0;
}, { passive: true });

// Handle orientation change
window.addEventListener('orientationchange', function() {
    // Close any open panels
    closeChatPanel();
    closeMenuPanel();
    
    // Reset scroll positions
    setTimeout(() => {
        coachesSlider.scrollLeft = 0;
        updateActiveDot();
    }, 300);
});

// Contact card interactions with haptic feedback
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('click', function(e) {
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    });
});

// Initialize scroll position indicators
updateActiveNavLink();

// Add loading animation on page load
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.service-card, .stat-card').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 300);
});

// Handle visibility change (when app goes to background/foreground)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // App went to background
        closeChatPanel();
        closeMenuPanel();
    } else {
        // App came to foreground
        // Optionally refresh data or update UI
    }
});

// Prevent context menu on long press for better mobile experience
document.addEventListener('contextmenu', function(e) {
    if (window.innerWidth <= 768) {
        e.preventDefault();
    }
}, { passive: false });

// Add visual feedback for touch interactions
document.addEventListener('touchstart', function(e) {
    const target = e.target.closest('button, a, .service-card, .coach-card');
    if (target) {
        target.style.opacity = '0.7';
    }
}, { passive: true });

document.addEventListener('touchend', function(e) {
    const target = e.target.closest('button, a, .service-card, .coach-card');
    if (target) {
        setTimeout(() => {
            target.style.opacity = '1';
        }, 100);
    }
}, { passive: true });

// Console log for debugging
console.log('X-TRIM FIT GYM Mobile App Initialized');
console.log('Screen width:', window.innerWidth);
console.log('Screen height:', window.innerHeight);
console.log('Device pixel ratio:', window.devicePixelRatio);