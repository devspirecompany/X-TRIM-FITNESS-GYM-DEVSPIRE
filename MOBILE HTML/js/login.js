// Mobile Login JavaScript for X-TRIM FIT GYM

// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const rememberCheckbox = document.getElementById('remember');
const loginBtn = document.getElementById('loginBtn');
const btnText = loginBtn.querySelector('.btn-text');
const btnLoader = loginBtn.querySelector('.btn-loader');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const forgotPasswordLink = document.getElementById('forgotPassword');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const closeModal = document.getElementById('closeModal');
const resetForm = document.getElementById('resetForm');
const successToast = document.getElementById('successToast');
const toastMessage = document.getElementById('toastMessage');
const helpBtn = document.getElementById('helpBtn');
const biometricBtn = document.getElementById('biometricBtn');
const googleLogin = document.getElementById('googleLogin');
const facebookLogin = document.getElementById('facebookLogin');
const appleLogin = document.getElementById('appleLogin');

// Haptic Feedback Function
function vibrate(duration = 50) {
    if (navigator.vibrate) {
        navigator.vibrate(duration);
    }
}

// Show Error Message
function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.add('show');
    vibrate(100);
    
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 4000);
}

// Hide Error Message
function hideError() {
    errorMessage.classList.remove('show');
}

// Show Toast Notification
function showToast(message, duration = 3000) {
    toastMessage.textContent = message;
    successToast.classList.add('show');
    vibrate(50);
    
    setTimeout(() => {
        successToast.classList.remove('show');
    }, duration);
}

// Password Toggle Functionality
togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
    
    vibrate(30);
});

// Input Focus Effects
const allInputs = document.querySelectorAll('input[type="email"], input[type="password"]');

allInputs.forEach(input => {
    input.addEventListener('focus', function() {
        hideError();
        const icon = this.parentElement.querySelector('.input-icon');
        if (icon) {
            icon.style.color = '#F59E0B';
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

    // Auto-fill detection
    input.addEventListener('input', function() {
        if (this.value) {
            const icon = this.parentElement.querySelector('.input-icon');
            if (icon) {
                icon.style.color = '#F59E0B';
            }
        }
    });
});

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password Validation
function isValidPassword(password) {
    return password.length >= 6;
}

// Show Loading State
function setLoadingState(isLoading) {
    if (isLoading) {
        btnText.style.display = 'none';
        btnLoader.style.display = 'flex';
        loginBtn.disabled = true;
        loginBtn.style.opacity = '0.7';
    } else {
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
        loginBtn.disabled = false;
        loginBtn.style.opacity = '1';
    }
}

// Form Submission
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const remember = rememberCheckbox.checked;
    
    // Validation
    if (!email) {
        showError('Please enter your email address');
        emailInput.focus();
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        emailInput.focus();
        return;
    }
    
    if (!password) {
        showError('Please enter your password');
        passwordInput.focus();
        return;
    }
    
    if (!isValidPassword(password)) {
        showError('Password must be at least 6 characters');
        passwordInput.focus();
        return;
    }
    
    // Show loading state
    setLoadingState(true);
    hideError();
    vibrate(40);
    
    // Simulate API call
    try {
        // Replace this with actual authentication logic
        await simulateLogin(email, password, remember);
        
        // Success
        showToast('Login successful! Redirecting...');
        
        // Save remember me preference
        if (remember) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
        
        // Redirect after 1.5 seconds
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    } catch (error) {
        setLoadingState(false);
        showError(error.message || 'Invalid email or password. Please try again.');
    }
});

// Simulate Login (Replace with actual API call)
function simulateLogin(email, password, remember) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Demo behavior for development: accept any @gmail.com address
            // (Keep password validation in the main form logic)
            const gmailRegex = /@gmail\.com$/i;
            if (gmailRegex.test(email)) {
                resolve({ success: true });
            } else {
                reject({ message: 'Invalid email or password' });
            }
        }, 1500);
    });
}

// Forgot Password Modal
forgotPasswordLink.addEventListener('click', function(e) {
    e.preventDefault();
    forgotPasswordModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    vibrate(30);
    
    // Focus on reset email input
    setTimeout(() => {
        document.getElementById('resetEmail').focus();
    }, 300);
});

// Close Modal
function closePasswordModal() {
    forgotPasswordModal.classList.remove('active');
    document.body.style.overflow = '';
    resetForm.reset();
}

closeModal.addEventListener('click', closePasswordModal);

// Close modal on overlay click
forgotPasswordModal.querySelector('.modal-overlay').addEventListener('click', closePasswordModal);

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && forgotPasswordModal.classList.contains('active')) {
        closePasswordModal();
    }
});

// Reset Form Submission
resetForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const resetEmail = document.getElementById('resetEmail').value.trim();
    
    if (!resetEmail) {
        showError('Please enter your email address');
        return;
    }
    
    if (!isValidEmail(resetEmail)) {
        showError('Please enter a valid email address');
        return;
    }
    
    // Show loading on submit button
    const resetBtn = resetForm.querySelector('.btn-login');
    const originalText = resetBtn.innerHTML;
    resetBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    resetBtn.disabled = true;
    
    vibrate(40);
    
    // Simulate sending reset email
    setTimeout(() => {
        closePasswordModal();
        showToast('Password reset link sent to your email!', 4000);
        resetBtn.innerHTML = originalText;
        resetBtn.disabled = false;
    }, 2000);
});

// Social Login Handlers
googleLogin.addEventListener('click', function() {
    vibrate(50);
    showToast('Google login coming soon!');
    // Implement Google OAuth here
});

facebookLogin.addEventListener('click', function() {
    vibrate(50);
    showToast('Facebook login coming soon!');
    // Implement Facebook OAuth here
});

appleLogin.addEventListener('click', function() {
    vibrate(50);
    showToast('Apple login coming soon!');
    // Implement Apple Sign In here
});

// Help Button
helpBtn.addEventListener('click', function() {
    vibrate(50);
    // Show help modal or redirect to help page
    alert('Need help?\n\n• Forgot your password? Click "Forgot Password"\n• New user? Click "Sign Up Now"\n• Contact support: support@xtrimfitgym.com');
});

// Biometric Authentication (if supported)
async function checkBiometricSupport() {
    // Check if Web Authentication API is available
    if (window.PublicKeyCredential) {
        try {
            const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
            if (available) {
                biometricBtn.style.display = 'flex';
            }
        } catch (error) {
            console.log('Biometric not available:', error);
        }
    }
}

// Biometric Login Handler
if (biometricBtn) {
    biometricBtn.addEventListener('click', async function() {
        vibrate(50);
        showToast('Biometric login coming soon!');
        // Implement WebAuthn/biometric authentication here
    });
}

// Check for biometric support on load
checkBiometricSupport();

// Remember Me - Auto-fill email
window.addEventListener('load', function() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        rememberCheckbox.checked = true;
        
        // Update icon color
        const emailIcon = emailInput.parentElement.querySelector('.input-icon');
        if (emailIcon) {
            emailIcon.style.color = '#F59E0B';
        }
    }
});

// Prevent zoom on input focus (iOS)
document.addEventListener('touchstart', function() {}, { passive: true });

// Handle form auto-fill detection
window.addEventListener('load', function() {
    setTimeout(() => {
        allInputs.forEach(input => {
            if (input.value) {
                const icon = input.parentElement.querySelector('.input-icon');
                if (icon) {
                    icon.style.color = '#F59E0B';
                }
            }
        });
    }, 100);
});

// Add animation to form elements on load
window.addEventListener('load', function() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        setTimeout(() => {
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Initialize form group animations
document.querySelectorAll('.form-group').forEach(group => {
    group.style.opacity = '0';
    group.style.transform = 'translateY(20px)';
    group.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
});

// Network Status Check
window.addEventListener('online', function() {
    showToast('Connection restored', 2000);
});

window.addEventListener('offline', function() {
    showError('No internet connection. Please check your network.');
});

// Prevent default form submission on Enter in modal
document.getElementById('resetEmail').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        resetForm.dispatchEvent(new Event('submit'));
    }
});

// Handle visibility change (app goes to background)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // App went to background - clear sensitive data if needed
        setLoadingState(false);
    }
});

// Visual feedback for button presses
const allButtons = document.querySelectorAll('button, .btn-login, .social-btn');
allButtons.forEach(button => {
    button.addEventListener('touchstart', function() {
        this.style.opacity = '0.7';
    }, { passive: true });
    
    button.addEventListener('touchend', function() {
        setTimeout(() => {
            this.style.opacity = '1';
        }, 100);
    }, { passive: true });
});

// Auto-resize text for small screens
function adjustFontSize() {
    if (window.innerWidth < 360) {
        document.documentElement.style.fontSize = '14px';
    } else {
        document.documentElement.style.fontSize = '16px';
    }
}

window.addEventListener('resize', adjustFontSize);
adjustFontSize();

// Orientation change handler
window.addEventListener('orientationchange', function() {
    closePasswordModal();
    hideError();
});

// Console log for debugging
console.log('X-TRIM FIT GYM Mobile Login Initialized');
console.log('Demo behavior: any @gmail.com email (with a valid password) will be accepted for demo login');
console.log('Screen dimensions:', window.innerWidth, 'x', window.innerHeight);