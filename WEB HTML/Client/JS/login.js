// Login Page JavaScript

// Password visibility toggle
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.getElementById('passwordToggle');
    const icon = toggleButton.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        toggleButton.setAttribute('title', 'Hide password');
        toggleButton.setAttribute('aria-label', 'Hide password');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        toggleButton.setAttribute('title', 'Show password');
        toggleButton.setAttribute('aria-label', 'Show password');
    }
}

// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Clear errors on input
    document.addEventListener('input', function(e) {
        if (e.target.matches('input')) {
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            removeError(e.target);
        }
    });
});

// User credentials database
const userCredentials = {
    // Client
    'ashley.quicho@email.com': {
        type: 'client',
        name: 'Ashley Quicho',
        email: 'ashley.quicho@email.com',
        redirect: '../HTML/dashboard.html'
    },
    // Coach
    'mike.rodriguez@xtrimfitness.com': {
        type: 'coach',
        name: 'Mike Rodriguez',
        email: 'mike.rodriguez@xtrimfitness.com',
        redirect: '../../Coaches/HTML/dashboard.html'
    },
    // Admin
    'admin@xtrimfitness.com': {
        type: 'admin',
        name: 'Admin User',
        email: 'admin@xtrimfitness.com',
        redirect: '../../Admin/HTML/dashboard.html'
    }
};

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Validate form
    if (!validateLoginForm(email, password)) {
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Signing in...</span>';
    
    // Simulate API call
    setTimeout(() => {
        // Check if email exists in credentials
        const user = userCredentials[email];
        
        if (user && password.length >= 6) {
            // Store user session
            localStorage.setItem('currentUser', JSON.stringify({
                type: user.type,
                name: user.name,
                email: user.email
            }));
            
            // Store remember me preference
            if (rememberMe) {
                localStorage.setItem('rememberEmail', email);
            } else {
                localStorage.removeItem('rememberEmail');
            }
            
            // Redirect to appropriate dashboard
            window.location.href = user.redirect;
        } else {
            // Invalid credentials
            showError(document.getElementById('email'), 'Invalid email or password. Please check your credentials.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }, 1500);
}

function validateLoginForm(email, password) {
    let isValid = true;
    
    // Remove all existing errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Validate email
    const emailInput = document.getElementById('email');
    if (!email) {
        isValid = false;
        showError(emailInput, 'Email address is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        isValid = false;
        showError(emailInput, 'Please enter a valid email address');
    }
    
    // Validate password
    const passwordInput = document.getElementById('password');
    if (!password) {
        isValid = false;
        showError(passwordInput, 'Password is required');
    } else if (password.length < 6) {
        isValid = false;
        showError(passwordInput, 'Password must be at least 6 characters');
    }
    
    return isValid;
}

function showError(input, message) {
    // Remove any existing error
    removeError(input);
    
    // Add error class to input
    input.style.borderColor = '#E41E26';
    
    // Create and append error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
}

function removeError(input) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
}

// Forgot Password Modal
function showForgotPasswordModal(e) {
    e.preventDefault();
    const modal = document.getElementById('forgotPasswordModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeForgotPasswordModal() {
    const modal = document.getElementById('forgotPasswordModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Reset form
        const form = document.getElementById('forgotPasswordForm');
        if (form) form.reset();
    }
}

function handleForgotPassword(e) {
    e.preventDefault();
    
    const email = document.getElementById('resetEmail').value.trim();
    
    // Validate email
    if (!email) {
        showError(document.getElementById('resetEmail'), 'Email address is required');
        return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError(document.getElementById('resetEmail'), 'Please enter a valid email address');
        return;
    }
    
    // Simulate sending reset link (in real app, this would make an API call)
    console.log('Password reset requested for:', email);
    
    // Close forgot password modal
    closeForgotPasswordModal();
    
    // Show success modal
    const successModal = document.getElementById('forgotPasswordSuccessModal');
    if (successModal) {
        successModal.classList.add('active');
    }
}

function closeForgotPasswordSuccessModal() {
    const modal = document.getElementById('forgotPasswordSuccessModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modals on outside click or ESC key
document.addEventListener('click', function(e) {
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const forgotPasswordSuccessModal = document.getElementById('forgotPasswordSuccessModal');
    
    if (forgotPasswordModal && e.target === forgotPasswordModal) {
        closeForgotPasswordModal();
    }
    
    if (forgotPasswordSuccessModal && e.target === forgotPasswordSuccessModal) {
        closeForgotPasswordSuccessModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeForgotPasswordModal();
        closeForgotPasswordSuccessModal();
    }
});

// Load remembered email if available
document.addEventListener('DOMContentLoaded', function() {
    const rememberedEmail = localStorage.getItem('rememberEmail');
    const emailInput = document.getElementById('email');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    
    if (rememberedEmail && emailInput) {
        emailInput.value = rememberedEmail;
        if (rememberMeCheckbox) {
            rememberMeCheckbox.checked = true;
        }
    }
});

