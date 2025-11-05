// Multi-step form logic for Coach Registration
let currentStep = 1;
const totalSteps = 5;
let certificationCount = 0;

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

    // File upload handlers
    setupFileUploads();
});

function showStep(step) {
    // Hide all steps
    const steps = document.querySelectorAll('.form-step');
    steps.forEach(s => s.classList.remove('active'));
    
    // Show current step
    const currentStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
    if (currentStepEl) {
        currentStepEl.classList.add('active');
    }
    
    // Update progress steps
    updateProgressSteps();
    
    // Update navigation buttons
    updateNavigationButtons();
}

function updateProgressSteps() {
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNum < currentStep) {
            step.classList.add('completed');
        } else if (stepNum === currentStep) {
            step.classList.add('active');
        }
    });
}

function updateNavigationButtons() {
    const backBtn = document.getElementById('backBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Back button
    if (backBtn) {
        if (currentStep === 1) {
            backBtn.classList.add('hidden');
        } else {
            backBtn.classList.remove('hidden');
        }
    }
    
    // Next/Submit buttons
    if (nextBtn && submitBtn) {
        if (currentStep === totalSteps) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
        }
    }
}

function nextStep() {
    const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (currentStepEl) {
        const form = currentStepEl.closest('form');
        const inputs = currentStepEl.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#EF4444';
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 2000);
            } else {
                input.style.borderColor = '';
            }
        });
        
        // Special validation for Step 4 (Certifications)
        if (currentStep === 4) {
            const certInputs = document.querySelectorAll('.certification-item input');
            if (certInputs.length === 0) {
                isValid = false;
                showToast('Please add at least one certification', 'error');
            } else {
                let hasValue = false;
                certInputs.forEach(input => {
                    if (input.value.trim()) {
                        hasValue = true;
                    }
                });
                if (!hasValue) {
                    isValid = false;
                    showToast('Please fill in at least one certification', 'error');
                }
            }
        }
        
        // Special validation for Step 5 (Agreements)
        if (currentStep === 5) {
            const checkboxes = currentStepEl.querySelectorAll('input[type="checkbox"][required]');
            checkboxes.forEach(checkbox => {
                if (!checkbox.checked) {
                    isValid = false;
                    checkbox.style.outline = '2px solid #EF4444';
                    setTimeout(() => {
                        checkbox.style.outline = '';
                    }, 2000);
                }
            });
        }
        
        if (isValid) {
            if (currentStep < totalSteps) {
                currentStep++;
                showStep(currentStep);
            }
        } else {
            showToast('Please fill in all required fields', 'error');
        }
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

// Add Certification Field
function addCertificationField() {
    const certificationsList = document.getElementById('certificationsList');
    if (!certificationsList) return;
    
    certificationCount++;
    const certItem = document.createElement('div');
    certItem.className = 'certification-item';
    certItem.innerHTML = `
        <input type="text" placeholder="e.g., NASM Certified Personal Trainer, ACE Fitness Certification" required>
        <button type="button" class="btn-remove-cert" onclick="removeCertificationField(this)" title="Remove certification" aria-label="Remove certification">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    certificationsList.appendChild(certItem);
    
    // Focus on the new input
    const input = certItem.querySelector('input');
    if (input) {
        input.focus();
    }
}

// Remove Certification Field
function removeCertificationField(button) {
    const certItem = button.closest('.certification-item');
    if (certItem) {
        certItem.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            certItem.remove();
        }, 300);
    }
}

// Setup File Uploads
function setupFileUploads() {
    const certificateUpload = document.getElementById('certificateUpload');
    const resumeUpload = document.getElementById('resumeUpload');
    
    if (certificateUpload) {
        certificateUpload.addEventListener('change', function(e) {
            handleFileUpload(e, 'certificates');
        });
    }
    
    if (resumeUpload) {
        resumeUpload.addEventListener('change', function(e) {
            handleFileUpload(e, 'resume');
        });
    }
}

// Handle File Upload
function handleFileUpload(event, type) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const maxSize = 5 * 1024 * 1024; // 5MB
    const validTypes = type === 'certificates' 
        ? ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
        : ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    Array.from(files).forEach(file => {
        if (file.size > maxSize) {
            showToast(`File "${file.name}" exceeds 5MB limit`, 'error');
            return;
        }
        
        if (!validTypes.includes(file.type)) {
            showToast(`Invalid file type for "${file.name}"`, 'error');
            return;
        }
        
        // Create preview (optional - you can enhance this)
        console.log(`File uploaded: ${file.name} (${type})`);
    });
}

// Form Submission
document.getElementById('coachSignupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        // Step 1: Basic Information
        firstName: document.getElementById('firstName')?.value,
        lastName: document.getElementById('lastName')?.value,
        email: document.getElementById('email')?.value,
        phone: document.getElementById('phone')?.value,
        dob: document.getElementById('dob')?.value,
        gender: document.getElementById('gender')?.value,
        
        // Step 2: Contact & Address
        address: document.getElementById('address')?.value,
        emergencyName: document.getElementById('emergencyName')?.value,
        emergencyPhone: document.getElementById('emergencyPhone')?.value,
        
        // Step 3: Professional Information
        yearsExperience: document.getElementById('yearsExperience')?.value,
        specialization: document.getElementById('specialization')?.value,
        otherSpecializations: document.getElementById('otherSpecializations')?.value,
        bio: document.getElementById('bio')?.value,
        availability: document.getElementById('availability')?.value,
        preferredTime: document.getElementById('preferredTime')?.value,
        
        // Step 4: Credentials
        certifications: Array.from(document.querySelectorAll('.certification-item input')).map(input => input.value).filter(v => v.trim()),
        education: document.getElementById('education')?.value,
        previousExperience: document.getElementById('previousExperience')?.value,
        
        // Step 5: Agreements
        terms: document.getElementById('terms')?.checked,
        privacy: document.getElementById('privacy')?.checked,
        coachAgreement: document.getElementById('coachAgreement')?.checked,
        backgroundCheck: document.getElementById('backgroundCheck')?.checked
    };
    
    // Validate all required fields
    if (validateForm(formData)) {
        // Simulate form submission
        submitCoachApplication(formData);
    }
});

function validateForm(data) {
    // Check basic info
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.dob) {
        showToast('Please complete all basic information fields', 'error');
        return false;
    }
    
    // Check contact info
    if (!data.address || !data.emergencyName || !data.emergencyPhone) {
        showToast('Please complete all contact information fields', 'error');
        return false;
    }
    
    // Check professional info
    if (!data.yearsExperience || !data.specialization || !data.bio || !data.availability) {
        showToast('Please complete all professional information fields', 'error');
        return false;
    }
    
    // Check certifications
    if (!data.certifications || data.certifications.length === 0) {
        showToast('Please add at least one certification', 'error');
        return false;
    }
    
    // Check agreements
    if (!data.terms || !data.privacy || !data.coachAgreement || !data.backgroundCheck) {
        showToast('Please agree to all terms and conditions', 'error');
        return false;
    }
    
    return true;
}

function submitCoachApplication(data) {
    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    }
    
    // Simulate API call
    setTimeout(() => {
        console.log('Coach Application Data:', data);
        
        // Show success modal
        const successModal = document.getElementById('successModal');
        if (successModal) {
            successModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        // Reset form
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> <span>Submit Application</span>';
        }
    }, 1500);
}

function closeSuccessModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Redirect to login page after a delay
        setTimeout(() => {
            window.location.href = '../../Client/HTML/login.html';
        }, 500);
    }
}

// Terms & Agreements Modals
function showTerms(event) {
    event.preventDefault();
    alert('Terms and Conditions\n\n[Terms and conditions content would be displayed here in a real application]');
}

function showPrivacy(event) {
    event.preventDefault();
    alert('Privacy Policy\n\n[Privacy policy content would be displayed here in a real application]');
}

function showCoachAgreement(event) {
    event.preventDefault();
    alert('Coach Agreement\n\n[Coach agreement content would be displayed here in a real application]\n\nThis includes terms about:\n- Coaching responsibilities\n- Client confidentiality\n- Payment structure\n- Code of conduct');
}

// Toast Notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? '#EF4444' : '#14B8A6'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
        max-width: 400px;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

