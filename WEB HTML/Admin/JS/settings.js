// Admin Settings JavaScript

let originalValues = {};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // No initialization needed for settings page
});

// Go Back Function
function goBack() {
    window.location.href = '../HTML/dashboard.html';
}

// Edit Mode Functions
function toggleEditMode(section) {
    const sectionEl = document.querySelector(`.settings-section:has(#edit${section.charAt(0).toUpperCase() + section.slice(1)}Btn)`);
    if (!sectionEl) return;
    
    const editBtn = document.getElementById(`edit${section.charAt(0).toUpperCase() + section.slice(1)}Btn`);
    const actions = document.getElementById(`${section}Actions`);
    const inputs = sectionEl.querySelectorAll('input, select, textarea');
    
    if (editBtn.classList.contains('editing')) {
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

    // Enable checkboxes for notifications
    if (section === 'notifications') {
        const checkboxes = sectionEl.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.removeAttribute('disabled');
        });
    }
}

function cancelEdit(section) {
    const sectionEl = document.querySelector(`.settings-section:has(#edit${section.charAt(0).toUpperCase() + section.slice(1)}Btn)`);
    if (!sectionEl) return;
    
    const editBtn = document.getElementById(`edit${section.charAt(0).toUpperCase() + section.slice(1)}Btn`);
    const actions = document.getElementById(`${section}Actions`);
    const inputs = sectionEl.querySelectorAll('input, select, textarea');
    
    editBtn.classList.remove('editing');
    editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
    
    if (actions) actions.classList.add('hidden');
    
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

        // Disable checkboxes for notifications
        if (section === 'notifications') {
            const checkboxes = sectionEl.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.setAttribute('disabled', 'disabled');
            });
        }
    }
}

function saveChanges(section) {
    const sectionEl = document.querySelector(`.settings-section:has(#edit${section.charAt(0).toUpperCase() + section.slice(1)}Btn)`);
    if (!sectionEl) return;

    const inputs = sectionEl.querySelectorAll('input, select, textarea');
    const formData = {};

    inputs.forEach(input => {
        if (input.id) {
            if (input.type === 'checkbox') {
                formData[input.id] = input.checked;
            } else {
                formData[input.id] = input.value;
            }
        }
    });

    // Validation
    if (section === 'account') {
        if (!formData.email) {
            showToast('Please enter an email address', 'error');
            return;
        }
        if (!isValidEmail(formData.email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }
    }

    // Save changes (in a real app, this would make an API call)
    console.log(`Saving ${section} settings:`, formData);
    showToast(`${section.charAt(0).toUpperCase() + section.slice(1)} settings updated successfully`, 'success');

    // Exit edit mode
    cancelEdit(section);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Change Password
function openChangePasswordModal() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.getElementById('changePasswordForm').reset();
    }
}

function closeChangePasswordModal() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function handleChangePassword(event) {
    event.preventDefault();

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    if (newPassword.length < 8) {
        showToast('Password must be at least 8 characters long', 'error');
        return;
    }

    if (newPassword !== confirmPassword) {
        showToast('New passwords do not match', 'error');
        return;
    }

    // In a real app, this would make an API call
    console.log('Changing password...');
    
    closeChangePasswordModal();
    setTimeout(() => {
        openPasswordSuccessModal();
    }, 300);
}

function openPasswordSuccessModal() {
    const modal = document.getElementById('passwordSuccessModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePasswordSuccessModal() {
    const modal = document.getElementById('passwordSuccessModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Login History
function viewLoginHistory() {
    const modal = document.getElementById('loginHistoryModal');
    const container = document.getElementById('loginHistoryList');
    
    if (!modal || !container) return;

    // Sample login history data
    const loginHistory = [
        {
            status: 'success',
            location: 'Manila, Philippines',
            device: 'Chrome on Windows',
            ip: '192.168.1.1',
            time: '2 hours ago'
        },
        {
            status: 'success',
            location: 'Manila, Philippines',
            device: 'Chrome on Windows',
            ip: '192.168.1.1',
            time: '1 day ago'
        },
        {
            status: 'success',
            location: 'Manila, Philippines',
            device: 'Firefox on Windows',
            ip: '192.168.1.2',
            time: '3 days ago'
        },
        {
            status: 'failed',
            location: 'Unknown',
            device: 'Unknown',
            ip: '192.168.1.100',
            time: '5 days ago'
        }
    ];

    container.innerHTML = loginHistory.map(login => `
        <div class="login-history-item">
            <div class="login-history-icon ${login.status}">
                <i class="fas fa-${login.status === 'success' ? 'check-circle' : 'times-circle'}"></i>
            </div>
            <div class="login-history-info">
                <h4>${login.status === 'success' ? 'Successful Login' : 'Failed Login Attempt'}</h4>
                <p>${login.device} • ${login.location} • ${login.ip}</p>
            </div>
            <div class="login-history-time">${login.time}</div>
        </div>
    `).join('');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLoginHistoryModal() {
    const modal = document.getElementById('loginHistoryModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Logout Functions
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
        document.body.style.overflow = 'auto';
    }
}

function confirmLogout() {
    console.log('Admin logged out');
    window.location.href = '../../Client/HTML/homepage.html';
}

// Toast Notification System
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toastId = 'toast-' + Date.now();
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${icons[type] || icons.info}"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close" onclick="closeToast('${toastId}')">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        closeToast(toastId);
    }, 5000);
}

function closeToast(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
});

