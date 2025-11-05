// Settings Page JavaScript

// Edit Mode Functions
let originalValues = {};

function toggleEditMode(section) {
    const sectionEl = document.querySelector(`.settings-section:has(#edit${section.charAt(0).toUpperCase() + section.slice(1)}Btn)`);
    if (!sectionEl) return;
    
    const editBtn = document.getElementById(`edit${section.charAt(0).toUpperCase() + section.slice(1)}Btn`);
    const actions = document.getElementById(`${section}Actions`);
    const inputs = sectionEl.querySelectorAll('input, select, textarea');
    
    if (editBtn.classList.contains('editing')) {
        // Cancel edit mode
        cancelEdit(section);
        return;
    }
    
    // Enter edit mode
    editBtn.classList.add('editing');
    editBtn.innerHTML = '<i class="fas fa-times"></i> Cancel';
    
    if (actions) actions.classList.remove('hidden');
    
    // Store original values
    originalValues[section] = {};
    inputs.forEach(input => {
        if (input.id) {
            originalValues[section][input.id] = input.value;
            input.removeAttribute('readonly');
            input.removeAttribute('disabled');
            input.classList.add('edit-mode');
        }
    });
}

function cancelEdit(section) {
    const sectionEl = document.querySelector(`.settings-section:has(#edit${section.charAt(0).toUpperCase() + section.slice(1)}Btn)`);
    if (!sectionEl) return;
    
    const editBtn = document.getElementById(`edit${section.charAt(0).toUpperCase() + section.slice(1)}Btn`);
    const actions = document.getElementById(`${section}Actions`);
    const inputs = sectionEl.querySelectorAll('input, select, textarea');
    
    // Restore original values
    if (originalValues[section]) {
        inputs.forEach(input => {
            if (input.id && originalValues[section][input.id] !== undefined) {
                input.value = originalValues[section][input.id];
            }
            input.setAttribute('readonly', 'readonly');
            input.setAttribute('disabled', 'disabled');
            input.classList.remove('edit-mode');
        });
    } else {
        inputs.forEach(input => {
            input.setAttribute('readonly', 'readonly');
            input.setAttribute('disabled', 'disabled');
            input.classList.remove('edit-mode');
        });
    }
    
    editBtn.classList.remove('editing');
    editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
    
    if (actions) actions.classList.add('hidden');
    
    delete originalValues[section];
}

function saveChanges(section) {
    const sectionEl = document.querySelector(`.settings-section:has(#edit${section.charAt(0).toUpperCase() + section.slice(1)}Btn)`);
    if (!sectionEl) return;
    
    const inputs = sectionEl.querySelectorAll('input, select, textarea');
    const formData = {};
    
    // Collect form data
    inputs.forEach(input => {
        if (input.id && !input.hasAttribute('readonly') && !input.hasAttribute('disabled')) {
            formData[input.id] = input.value;
        }
    });
    
    // Validate form data
    if (!validateFormData(section, formData)) {
        return;
    }
    
    // Simulate saving (in real app, this would make an API call)
    console.log('Saving data for section:', section, formData);
    
    // Show success message
    showSuccessMessage('Changes saved successfully!');
    
    // Exit edit mode
    cancelEdit(section);
}

function validateFormData(section, formData) {
    // Basic validation
    if (section === 'personal') {
        if (formData.firstName && formData.firstName.trim().length < 2) {
            alert('First name must be at least 2 characters');
            return false;
        }
        if (formData.lastName && formData.lastName.trim().length < 2) {
            alert('Last name must be at least 2 characters');
            return false;
        }
        if (formData.email && !formData.email.includes('@')) {
            alert('Please enter a valid email address');
            return false;
        }
    }
    
    return true;
}

function showSuccessMessage(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #22c55e, #16a34a);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(34, 197, 94, 0.3);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Logout Modal
function openLogoutModal() {
    const modal = document.getElementById('logoutModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLogoutModal() {
    const modal = document.getElementById('logoutModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function confirmLogout() {
    // In a real app, this would make an API call to logout
    console.log('User logged out');
    
    // Redirect to homepage
    window.location.href = '../HTML/homepage.html';
}

// Change Password Modal
function openChangePasswordModal() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeChangePasswordModal() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Reset form
        const form = document.getElementById('changePasswordForm');
        if (form) form.reset();
    }
}

function handleChangePassword(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate
    if (newPassword.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        return;
    }
    
    // Simulate password change (in real app, this would make an API call)
    console.log('Password changed');
    
    // Close change password modal
    closeChangePasswordModal();
    
    // Show success modal
    const successModal = document.getElementById('passwordSuccessModal');
    if (successModal) {
        successModal.classList.add('active');
    }
}

function closePasswordSuccessModal() {
    const modal = document.getElementById('passwordSuccessModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Go Back Function
function goBack() {
    window.history.back();
}

// Close modals on outside click or ESC key
document.addEventListener('click', function(e) {
    const logoutModal = document.getElementById('logoutModal');
    const changePasswordModal = document.getElementById('changePasswordModal');
    const passwordSuccessModal = document.getElementById('passwordSuccessModal');
    
    if (logoutModal && e.target === logoutModal) {
        closeLogoutModal();
    }
    
    if (changePasswordModal && e.target === changePasswordModal) {
        closeChangePasswordModal();
    }
    
    if (passwordSuccessModal && e.target === passwordSuccessModal) {
        closePasswordSuccessModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLogoutModal();
        closeChangePasswordModal();
        closePasswordSuccessModal();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Settings page initialization
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.top-navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

