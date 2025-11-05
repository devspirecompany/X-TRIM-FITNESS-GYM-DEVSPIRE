// Multi-step form logic
let currentStep = 1;
const totalSteps = 5;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize form
    showStep(currentStep);
    updateProgressSteps();
    
    // Add event listeners for step navigation
    document.getElementById('nextBtn')?.addEventListener('click', nextStep);
    document.getElementById('backBtn')?.addEventListener('click', previousStep);
    
    // Add click handlers for step indicators
    document.querySelectorAll('.progress-step').forEach(step => {
        step.addEventListener('click', function() {
            const stepNum = parseInt(this.getAttribute('data-step-num'));
            if (stepNum < currentStep) {
                currentStep = stepNum;
                showStep(currentStep);
            }
        });
    });
});

function showStep(step) {
    // Hide all steps
    const steps = document.querySelectorAll('.form-step');
    steps.forEach(s => s.classList.remove('active'));
    
    // Show current step
    const currentStepElement = document.querySelector(`[data-step="${step}"]`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }
    
    // Update navigation buttons
    updateNavigationButtons(step);
    
    // Update progress steps
    updateProgressSteps();
    
    // Scroll to top of form
    scrollToTop();
}

function updateNavigationButtons(step) {
    const backBtn = document.getElementById('backBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Show/hide back button
    if (backBtn) {
        backBtn.classList.toggle('hidden', step === 1);
    }
    
    // Toggle between next and submit buttons
    if (nextBtn && submitBtn) {
        if (step === totalSteps) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
        }
    }
}

function updateProgressSteps() {
    const steps = document.querySelectorAll('.progress-step');
    
    steps.forEach((step, index) => {
        const stepNum = parseInt(step.getAttribute('data-step-num'));
        
        // Reset all steps
        step.classList.remove('active', 'completed');
        
        // Mark previous steps as completed
        if (stepNum < currentStep) {
            step.classList.add('completed');
        } 
        // Mark current step as active
        else if (stepNum === currentStep) {
            step.classList.add('active');
        }
    });
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        }
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

function validateCurrentStep() {
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    if (!currentStepElement) return false;
    
    const inputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    // Reset all error states
    currentStepElement.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Validate each required field
    inputs.forEach(input => {
        input.style.borderColor = '';
        
        // Check if field is empty
        if (!input.value.trim()) {
            isValid = false;
            showError(input, 'This field is required');
        } 
        // Email validation
        else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
            isValid = false;
            showError(input, 'Please enter a valid email address');
        }
        // Phone validation (basic)
        else if (input.type === 'tel' && !/^[\d\s\+\-\(\)]+$/.test(input.value)) {
            isValid = false;
            showError(input, 'Please enter a valid phone number');
        }
    });
    
    // Validate checkboxes on last step
    if (currentStep === totalSteps) {
        const checkboxes = currentStepElement.querySelectorAll('input[type="checkbox"][required]');
        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                isValid = false;
                const parent = checkbox.closest('.checkbox-group');
                if (parent) {
                    parent.style.borderColor = '#E41E26';
                }
            }
        });
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
    errorDiv.style.color = '#E41E26';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '0.5rem';
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
}

function removeError(input) {
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function updateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const stepIndicator = document.querySelector('.step-indicator');
    
    const progress = (currentStep / totalSteps) * 100;
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    
    if (stepIndicator) {
        stepIndicator.textContent = `Step ${currentStep} of ${totalSteps}`;
    }
}

function scrollToTop() {
    const signupCard = document.querySelector('.signup-card');
    if (signupCard) {
        signupCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Form submission
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateCurrentStep()) {
        // Collect form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        
        // Show success message
        showSuccessMessage();
    }
});

function showSuccessMessage() {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.style.position = 'fixed';
    modalOverlay.style.top = '0';
    modalOverlay.style.left = '0';
    modalOverlay.style.width = '100%';
    modalOverlay.style.height = '100%';
    modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modalOverlay.style.display = 'flex';
    modalOverlay.style.alignItems = 'center';
    modalOverlay.style.justifyContent = 'center';
    modalOverlay.style.zIndex = '2000';
    modalOverlay.style.backdropFilter = 'blur(5px)';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.background = '#1a1d29';
    modalContent.style.borderRadius = '12px';
    modalContent.style.padding = '2.5rem';
    modalContent.style.maxWidth = '400px';
    modalContent.style.width = '90%';
    modalContent.style.textAlign = 'center';
    modalContent.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    modalContent.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    
    // Add success icon
    const iconWrapper = document.createElement('div');
    iconWrapper.style.width = '80px';
    iconWrapper.style.height = '80px';
    iconWrapper.style.margin = '0 auto 1.5rem';
    iconWrapper.style.background = 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(249, 197, 19, 0.1))';
    iconWrapper.style.borderRadius = '50%';
    iconWrapper.style.display = 'flex';
    iconWrapper.style.alignItems = 'center';
    iconWrapper.style.justifyContent = 'center';
    iconWrapper.style.fontSize = '2.5rem';
    iconWrapper.style.color = '#22c55e';
    iconWrapper.innerHTML = '<i class="fas fa-check-circle"></i>';
    
    // Add heading
    const heading = document.createElement('h2');
    heading.textContent = 'Registration Successful!';
    heading.style.color = '#ffffff';
    heading.style.fontSize = '1.5rem';
    heading.style.marginBottom = '1rem';
    heading.style.fontWeight = '700';
    
    // Add message
    const message = document.createElement('p');
    message.textContent = 'Your account has been created successfully. You will be redirected to the dashboard shortly.';
    message.style.color = '#b8bcc8';
    message.style.marginBottom = '2rem';
    message.style.lineHeight = '1.6';
    message.style.fontSize = '0.95rem';
    
    // Add button
    const button = document.createElement('a');
    button.href = 'dashboard.html'; // Update this to your dashboard URL
    button.className = 'cta-button';
    button.style.display = 'inline-flex';
    button.style.alignItems = 'center';
    button.style.gap = '0.5rem';
    button.style.padding = '0.8rem 2rem';
    button.style.background = 'linear-gradient(135deg, #E41E26, #F9C513)';
    button.style.color = 'white';
    button.style.textDecoration = 'none';
    button.style.borderRadius = '50px';
    button.style.fontWeight = '600';
    button.style.transition = 'all 0.3s ease';
    button.innerHTML = '<i class="fas fa-tachometer-alt"></i> Go to Dashboard';
    
    // Assemble modal
    modalContent.appendChild(iconWrapper);
    modalContent.appendChild(heading);
    modalContent.appendChild(message);
    modalContent.appendChild(button);
    modalOverlay.appendChild(modalContent);
    
    // Add to body
    document.body.appendChild(modalOverlay);
    
    // Auto-redirect after 5 seconds
    setTimeout(() => {
        window.location.href = 'dashboard.html'; // Update this to your dashboard URL
    }, 5000);
}

// Modal functions for terms & conditions
function showTerms(e) {
    e.preventDefault();
    alert('Terms and Conditions modal would open here');
}

function showPrivacy(e) {
    e.preventDefault();
    alert('Privacy Policy modal would open here');
}

function showWaiver(e) {
    e.preventDefault();
    alert('Liability Waiver modal would open here');
}

// Clear errors on input
document.addEventListener('input', function(e) {
    if (e.target.matches('input, select, textarea')) {
        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        removeError(e.target);
    }
});

document.addEventListener('change', function(e) {
    if (e.target.matches('input[type="checkbox"]')) {
        e.target.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.05)';
    }
});