// Mobile Signup JavaScript for X-TRIM FIT GYM

// DOM Elements
const signupForm = document.getElementById('signupForm');
const formSteps = document.querySelectorAll('.form-step');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const progressFill = document.getElementById('progressFill');
const currentStepEl = document.getElementById('currentStep');
const totalStepsEl = document.getElementById('totalSteps');
const successToast = document.getElementById('successToast');
const toastMessage = document.getElementById('toastMessage');
const dobInput = document.getElementById('dob');

// Modal elements
const termsModal = document.getElementById('termsModal');
const termsLink = document.getElementById('termsLink');
const privacyLink = document.getElementById('privacyLink');
const waiverLink = document.getElementById('waiverLink');
const closeTerms = document.getElementById('closeTerms');

// State
let currentStep = 1;
const totalSteps = formSteps.length;

// Initialize
totalStepsEl.textContent = totalSteps;

// Haptic Feedback
function vibrate(duration = 50) {
    if (navigator.vibrate) {
        navigator.vibrate(duration);
    }
}

// Show Toast
function showToast(message, duration = 3000) {
    toastMessage.textContent = message;
    successToast.classList.add('show');
    vibrate(50);
    
    setTimeout(() => {
        successToast.classList.remove('show');
    }, duration);
}

// Update Progress
function updateProgress() {
    const progress = (currentStep / totalSteps) * 100;
    progressFill.style.width = progress + '%';
    currentStepEl.textContent = currentStep;
}

// Show Step
function showStep(step) {
    formSteps.forEach((formStep, index) => {
        formStep.classList.remove('active');
        if (index === step - 1) {
            formStep.classList.add('active');
        }
    });
    
    // Update buttons
    if (step === 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'flex';
        submitBtn.style.display = 'none';
    } else if (step === totalSteps) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'flex';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
        submitBtn.style.display = 'none';
    }
    
    updateProgress();
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Validate Step
function validateStep(step) {
    const currentFormStep = formSteps[step - 1];
    const requiredInputs = currentFormStep.querySelectorAll('[required]');
    
    for (let input of requiredInputs) {
        if (!input.value || (input.type === 'checkbox' && !input.checked)) {
            // Focus on first invalid input
            input.focus();
            
            // Show error based on input type
            if (input.type === 'checkbox') {
                showToast('Please agree to all required terms');
            } else if (input.type === 'radio') {
                showToast('Please select a membership plan');
            } else {
                const label = currentFormStep.querySelector(`label[for="${input.id}"]`);
                const fieldName = label ? label.textContent.replace('*', '').trim() : 'This field';
                showToast(`${fieldName} is required`);
            }
            
            vibrate([50, 100, 50]);
            return false;
        }
        
        // Email validation
        if (input.type === 'email' && !isValidEmail(input.value)) {
            input.focus();
            showToast('Please enter a valid email address');
            vibrate([50, 100, 50]);
            return false;
        }
        
        // Phone validation
        if (input.type === 'tel' && !isValidPhone(input.value)) {
            input.focus();
            showToast('Please enter a valid phone number');
            vibrate([50, 100, 50]);
            return false;
        }
    }
    
    return true;
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone Validation
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Next Button
nextBtn.addEventListener('click', function() {
    if (validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
        vibrate(40);
    }
});

// Previous Button
prevBtn.addEventListener('click', function() {
    currentStep--;
    showStep(currentStep);
    vibrate(40);
});

// Age Verification
dobInput.addEventListener('change', function() {
    const dob = new Date(this.value);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    
    if (age < 18) {
        showToast('You must be at least 18 years old to sign up');
        this.value = '';
        vibrate([50, 100, 50]);
    }
});

// Input Focus Effects
const allInputs = document.querySelectorAll('input, select, textarea');

allInputs.forEach(input => {
    input.addEventListener('focus', function() {
        const icon = this.parentElement.querySelector('.input-icon');
        if (icon) {
            icon.style.color = '#F97316';
        }
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            const icon = this.parentElement.querySelector('.input-icon');
            if (icon) {
                icon.style.color = '#6B7280';
            }
        }
    });
});

// Plan Card Selection Visual Feedback
const planCards = document.querySelectorAll('.plan-card');
planCards.forEach(card => {
    card.addEventListener('click', function() {
        vibrate(40);
        const radio = this.querySelector('input[type="radio"]');
        if (radio) {
            radio.checked = true;
        }
    });
});

// Modal Functions
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    vibrate(30);
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Terms Links
termsLink.addEventListener('click', function(e) {
    e.preventDefault();
    openModal(termsModal);
});

privacyLink.addEventListener('click', function(e) {
    e.preventDefault();
    // Reuse same modal with different content
    const modalHeader = termsModal.querySelector('.modal-header h3');
    const modalBody = termsModal.querySelector('.modal-body');
    
    modalHeader.textContent = 'Privacy Policy';
    modalBody.innerHTML = `
        <p>Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.</p>
        <ul>
            <li>We collect only necessary information</li>
            <li>Your data is securely stored</li>
            <li>We never share your information without consent</li>
            <li>You can request data deletion anytime</li>
            <li>We comply with data protection regulations</li>
        </ul>
        <p>Full privacy policy document would be displayed here.</p>
    `;
    
    openModal(termsModal);
});

waiverLink.addEventListener('click', function(e) {
    e.preventDefault();
    const modalHeader = termsModal.querySelector('.modal-header h3');
    const modalBody = termsModal.querySelector('.modal-body');
    
    modalHeader.textContent = 'Liability Waiver';
    modalBody.innerHTML = `
        <p>By signing this waiver, you acknowledge that:</p>
        <ul>
            <li>Exercise involves inherent risks</li>
            <li>You are in good physical condition</li>
            <li>You will consult a physician if needed</li>
            <li>You will follow safety guidelines</li>
            <li>You release the gym from liability</li>
        </ul>
        <p>Full liability waiver document would be displayed here.</p>
    `;
    
    openModal(termsModal);
});

closeTerms.addEventListener('click', function() {
    closeModal(termsModal);
});

// Close modal on overlay click
termsModal.querySelector('.modal-overlay').addEventListener('click', function() {
    closeModal(termsModal);
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && termsModal.classList.contains('active')) {
        closeModal(termsModal);
    }
});

// Form Submission
signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
        return;
    }
    
    // Collect form data
    const formData = new FormData(signupForm);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    console.log('Signup Data:', data);
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    vibrate(50);
    
    // Simulate API call
    try {
        await simulateSignup(data);
        
        // Success
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Success!';
        showToast('Registration successful! Redirecting...', 3000);
        
        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
        
    } catch (error) {
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Complete Sign Up';
        submitBtn.disabled = false;
        showToast(error.message || 'Registration failed. Please try again.');
        vibrate([50, 100, 50]);
    }
});

// Simulate Signup (Replace with actual API call)
function simulateSignup(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Check if email already exists (demo check)
            if (data.email === 'test@xtrimfitgym.com') {
                reject({ message: 'Email already registered' });
            } else {
                resolve({ success: true });
            }
        }, 2000);
    });
}

// Phone Number Formatting
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Format as +63 XXX XXX XXXX
        if (value.startsWith('63')) {
            value = value.substring(2);
        }
        
        if (value.length > 0) {
            if (value.length <= 3) {
                e.target.value = '+63 ' + value;
            } else if (value.length <= 6) {
                e.target.value = '+63 ' + value.substring(0, 3) + ' ' + value.substring(3);
            } else {
                e.target.value = '+63 ' + value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6, 10);
            }
        }
    });
});

// Prevent zoom on input focus (iOS)
document.addEventListener('touchstart', function() {}, { passive: true });

// Auto-save form data to localStorage
function autoSaveForm() {
    const formData = new FormData(signupForm);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        if (key !== 'terms' && key !== 'privacy' && key !== 'waiver') {
            data[key] = value;
        }
    }
    
    localStorage.setItem('signupFormData', JSON.stringify(data));
}

// Restore form data from localStorage
function restoreFormData() {
    const savedData = localStorage.getItem('signupFormData');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        
        Object.keys(data).forEach(key => {
            const input = document.querySelector(`[name="${key}"]`);
            if (input && data[key]) {
                if (input.type === 'radio') {
                    const radio = document.querySelector(`[name="${key}"][value="${data[key]}"]`);
                    if (radio) radio.checked = true;
                } else {
                    input.value = data[key];
                }
            }
        });
        
        showToast('Previous form data restored', 2000);
    }
}

// Auto-save on input change
allInputs.forEach(input => {
    input.addEventListener('change', autoSaveForm);
});

// Clear saved data on successful submission
signupForm.addEventListener('submit', function() {
    localStorage.removeItem('signupFormData');
});

// Ask to restore data on load
window.addEventListener('load', function() {
    const savedData = localStorage.getItem('signupFormData');
    if (savedData) {
        if (confirm('Would you like to restore your previous form data?')) {
            restoreFormData();
        } else {
            localStorage.removeItem('signupFormData');
        }
    }
});

// Handle visibility change
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // App came to foreground
        updateProgress();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        
        if (currentStep < totalSteps) {
            nextBtn.click();
        } else {
            submitBtn.click();
        }
    }
});

// Swipe Gestures for navigation
let touchStartX = 0;
let touchEndX = 0;

signupForm.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

signupForm.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 100;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentStep < totalSteps) {
            // Swipe left - next step
            nextBtn.click();
        } else if (diff < 0 && currentStep > 1) {
            // Swipe right - previous step
            prevBtn.click();
        }
    }
}

// Orientation change handler
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
});

// Network status
window.addEventListener('offline', function() {
    showToast('No internet connection. Your progress is saved locally.');
});

window.addEventListener('online', function() {
    showToast('Connection restored', 2000);
});

// Console log for debugging
console.log('X-TRIM FIT GYM Mobile Signup Initialized');
console.log('Total Steps:', totalSteps);
console.log('Auto-save enabled');

// Initialize
showStep(currentStep);