// Membership Management JavaScript

// Synced Data from Dashboard
const membershipPlans = {
    'Student': {
        id: 'Student',
        name: 'Student',
        price: 500,
        count: 0,
        description: 'Perfect for students with valid student ID',
        status: 'Active',
        duration: 'Monthly',
        features: [
            'Gym access (6am-10pm)',
            'Basic equipment access',
            'Locker facilities',
            '2 group classes/month'
        ]
    },
    'PROMO Student': {
        id: 'PROMO Student',
        name: 'PROMO Student',
        price: 1200,
        count: 1,
        description: 'Special 3-month promo for students - Best value!',
        status: 'Active',
        duration: 'Quarterly',
        features: [
            'Gym access (6am-10pm)',
            'All equipment access',
            'Locker facilities',
            'Unlimited group classes',
            'Custom workout plans',
            'Valid for 3 months'
        ]
    },
    'Non student': {
        id: 'Non student',
        name: 'Non student',
        price: 1300,
        count: 0,
        description: '3-month membership for non-students',
        status: 'Active',
        duration: 'Quarterly',
        features: [
            'Gym access (6am-10pm)',
            'All equipment access',
            'Locker facilities',
            'Unlimited group classes',
            'Custom workout plans',
            'Valid for 3 months'
        ]
    }
};

// Get members data to count members per plan
const membersData = {
    'ashley-quicho': { membership: 'PROMO Student' },
    'john-dela-cruz': { membership: 'PROMO Student' },
    'maria-santos': { membership: 'PROMO Student' },
    'robert-lim': { membership: 'Student' }
};

let currentEditingPlanId = null;
let currentDeletingPlanId = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeProfileDropdown();
    updateMemberCounts();
    displayPlans();
});

// Sidebar Functionality
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    
    sidebar.addEventListener('mouseenter', function() {
        this.classList.add('expanded');
    });
    
    sidebar.addEventListener('mouseleave', function() {
        this.classList.remove('expanded');
    });
}

// Profile Dropdown
function toggleProfileDropdown() {
    const dropdown = document.getElementById('userProfileDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

function initializeProfileDropdown() {
    document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('userProfileDropdown');
        if (dropdown && !dropdown.contains(event.target)) {
            dropdown.classList.remove('active');
        }
    });
}

// Update member counts for each plan
function updateMemberCounts() {
    // Reset counts
    Object.keys(membershipPlans).forEach(planKey => {
        membershipPlans[planKey].count = 0;
    });

    // Count members per plan
    Object.values(membersData).forEach(member => {
        const planName = member.membership;
        if (membershipPlans[planName]) {
            membershipPlans[planName].count++;
        }
    });
}

// Display Plans
function displayPlans() {
    const grid = document.getElementById('plansGrid');
    if (!grid) return;

    if (Object.keys(membershipPlans).length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-credit-card"></i>
                <h3>No membership plans found</h3>
                <p>Add your first membership plan to get started</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = Object.values(membershipPlans).map(plan => {
        const isFeatured = plan.count > 0;
        return `
            <div class="plan-card ${isFeatured ? 'featured' : ''}">
                <div class="plan-header">
                    <div class="plan-name-section">
                        ${isFeatured ? `<span class="plan-badge"><i class="fas fa-crown"></i> Popular</span>` : ''}
                        <h3 class="plan-name">${plan.name}</h3>
                    </div>
                    <span class="plan-status-badge ${plan.status.toLowerCase().replace(' ', '-')}">${plan.status}</span>
                </div>
                <div class="plan-price">
                    <span class="plan-price-value">₱${plan.price.toLocaleString()}</span>
                    <span class="plan-price-period">/${plan.duration.toLowerCase()}</span>
                </div>
                <p class="plan-description">${plan.description}</p>
                <ul class="plan-features">
                    ${plan.features.map(feature => `
                        <li>
                            <i class="fas fa-check"></i>
                            <span>${feature}</span>
                        </li>
                    `).join('')}
                </ul>
                <div class="plan-stats">
                    <div class="plan-stat">
                        <span class="plan-stat-value">${plan.count}</span>
                        <span class="plan-stat-label">Active Members</span>
                    </div>
                    <div class="plan-stat">
                        <span class="plan-stat-value">₱${(plan.price * plan.count).toLocaleString()}</span>
                        <span class="plan-stat-label">Monthly Revenue</span>
                    </div>
                </div>
                <div class="plan-actions">
                    <button class="btn-small btn-view" onclick="viewPlan('${plan.id}')" title="View plan">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn-small btn-edit" onclick="editPlan('${plan.id}')" title="Edit plan">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-small btn-delete" onclick="deletePlan('${plan.id}')" title="Delete plan">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// View Plan
function viewPlan(planId) {
    const plan = membershipPlans[planId];
    if (!plan) return;

    const modal = document.getElementById('viewPlanModal');
    const content = document.getElementById('viewPlanContent');
    
    if (!modal || !content) return;

    content.innerHTML = `
        <div class="plan-detail-grid">
            <div class="detail-section">
                <h4><i class="fas fa-info-circle"></i> Plan Information</h4>
                <div class="detail-item">
                    <span class="detail-label">Plan Name</span>
                    <span class="detail-value">${plan.name}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Monthly Price</span>
                    <span class="detail-value">₱${plan.price.toLocaleString()}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Duration Type</span>
                    <span class="detail-value">${plan.duration}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Status</span>
                    <span class="detail-value"><span class="plan-status-badge ${plan.status.toLowerCase().replace(' ', '-')}">${plan.status}</span></span>
                </div>
            </div>
            <div class="detail-section">
                <h4><i class="fas fa-chart-bar"></i> Statistics</h4>
                <div class="detail-item">
                    <span class="detail-label">Active Members</span>
                    <span class="detail-value">${plan.count}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Monthly Revenue</span>
                    <span class="detail-value">₱${(plan.price * plan.count).toLocaleString()}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Annual Revenue (Est.)</span>
                    <span class="detail-value">₱${(plan.price * plan.count * 12).toLocaleString()}</span>
                </div>
            </div>
            <div class="detail-section detail-features">
                <h4><i class="fas fa-list-check"></i> Features</h4>
                <ul>
                    ${plan.features.map(feature => `
                        <li>
                            <i class="fas fa-check"></i>
                            <span>${feature}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="detail-section">
                <h4><i class="fas fa-file-alt"></i> Description</h4>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-top: 0.5rem;">${plan.description}</p>
            </div>
        </div>
    `;

    currentEditingPlanId = planId;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeViewPlanModal() {
    const modal = document.getElementById('viewPlanModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function editPlanFromView() {
    closeViewPlanModal();
    setTimeout(() => {
        editPlan(currentEditingPlanId);
    }, 300);
}

// Edit Plan
function editPlan(planId) {
    const plan = membershipPlans[planId];
    if (!plan) return;

    currentEditingPlanId = planId;
    const modal = document.getElementById('addEditPlanModal');
    const title = document.getElementById('addEditModalTitle');
    
    if (!modal || !title) return;

    title.innerHTML = '<i class="fas fa-edit"></i> Edit Membership Plan';
    
    // Populate form
    document.getElementById('planName').value = plan.name;
    document.getElementById('planPrice').value = plan.price;
    document.getElementById('planDescription').value = plan.description;
    document.getElementById('planStatus').value = plan.status;
    document.getElementById('planDuration').value = plan.duration;

    // Populate features
    const featuresList = document.getElementById('featuresList');
    featuresList.innerHTML = '';
    plan.features.forEach((feature, index) => {
        addFeatureInput(feature, index);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Add Plan
function openAddPlanModal() {
    currentEditingPlanId = null;
    const modal = document.getElementById('addEditPlanModal');
    const title = document.getElementById('addEditModalTitle');
    const form = document.getElementById('planForm');
    const featuresList = document.getElementById('featuresList');
    
    if (!modal || !title || !form || !featuresList) return;

    title.innerHTML = '<i class="fas fa-plus"></i> Add New Membership Plan';
    form.reset();
    featuresList.innerHTML = '';
    
    // Add at least one feature input
    addFeatureInput();

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAddEditPlanModal() {
    const modal = document.getElementById('addEditPlanModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        currentEditingPlanId = null;
    }
}

// Feature Management
function addFeatureInput(value = '', index = null) {
    const featuresList = document.getElementById('featuresList');
    if (!featuresList) return;

    const featureIndex = index !== null ? index : featuresList.children.length;
    const featureDiv = document.createElement('div');
    featureDiv.className = 'feature-input-group';
    featureDiv.innerHTML = `
        <input type="text" 
               class="feature-input" 
               placeholder="Enter feature (e.g., 24/7 gym access)" 
               value="${value}"
               required>
        <button type="button" class="btn-remove-feature" onclick="removeFeatureInput(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    featuresList.appendChild(featureDiv);
}

function removeFeatureInput(button) {
    const featuresList = document.getElementById('featuresList');
    if (!featuresList) return;

    const featureGroup = button.closest('.feature-input-group');
    if (featureGroup && featuresList.children.length > 1) {
        featureGroup.remove();
    } else if (featuresList.children.length === 1) {
        showToast('At least one feature is required', 'error');
    }
}

// Save Plan
function savePlan(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('planName').value.trim(),
        price: parseFloat(document.getElementById('planPrice').value),
        description: document.getElementById('planDescription').value.trim(),
        status: document.getElementById('planStatus').value,
        duration: document.getElementById('planDuration').value
    };

    // Get features
    const featureInputs = document.querySelectorAll('.feature-input');
    const features = Array.from(featureInputs)
        .map(input => input.value.trim())
        .filter(feature => feature.length > 0);

    // Validation
    if (!formData.name || !formData.price || !formData.description || !formData.status || !formData.duration) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    if (features.length === 0) {
        showToast('Please add at least one feature', 'error');
        return;
    }

    if (formData.price <= 0) {
        showToast('Price must be greater than 0', 'error');
        return;
    }

    if (currentEditingPlanId) {
        // Update existing plan
        const plan = membershipPlans[currentEditingPlanId];
        if (plan) {
            const oldName = plan.name;
            const newId = formData.name.toLowerCase().replace(/\s+/g, '-');
            
            // Update plan data
            Object.assign(plan, {
                ...formData,
                features: features
            });

            // If name changed, update the key
            if (oldName !== formData.name) {
                plan.id = newId;
                delete membershipPlans[currentEditingPlanId];
                membershipPlans[newId] = plan;
            }

            showToast(`Membership plan "${formData.name}" updated successfully`, 'success');
        }
    } else {
        // Add new plan
        const planId = formData.name.toLowerCase().replace(/\s+/g, '-');
        
        if (membershipPlans[planId]) {
            showToast('A plan with this name already exists', 'error');
            return;
        }

        membershipPlans[planId] = {
            id: planId,
            ...formData,
            features: features,
            count: 0
        };
        
        showToast(`Membership plan "${formData.name}" added successfully`, 'success');
    }

    updateMemberCounts();
    displayPlans();
    closeAddEditPlanModal();
}

// Delete Plan
function deletePlan(planId) {
    const plan = membershipPlans[planId];
    if (!plan) return;

    currentDeletingPlanId = planId;
    const modal = document.getElementById('deletePlanModal');
    const text = document.getElementById('deletePlanText');
    
    if (!modal || !text) return;

    if (plan.count > 0) {
        text.textContent = `Cannot delete "${plan.name}" because it has ${plan.count} active member(s). Please reassign or remove members first.`;
        const deleteBtn = modal.querySelector('.btn-danger');
        if (deleteBtn) {
            deleteBtn.style.display = 'none';
        }
    } else {
        text.textContent = `Are you sure you want to delete the "${plan.name}" membership plan? This action cannot be undone.`;
        const deleteBtn = modal.querySelector('.btn-danger');
        if (deleteBtn) {
            deleteBtn.style.display = 'inline-flex';
        }
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDeletePlanModal() {
    const modal = document.getElementById('deletePlanModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        currentDeletingPlanId = null;
    }
}

function confirmDeletePlan() {
    if (!currentDeletingPlanId) return;

    const plan = membershipPlans[currentDeletingPlanId];
    if (!plan) return;

    if (plan.count > 0) {
        showToast(`Cannot delete plan with active members`, 'error');
        closeDeletePlanModal();
        return;
    }

    delete membershipPlans[currentDeletingPlanId];
    showToast(`Membership plan "${plan.name}" deleted successfully`, 'success');

    displayPlans();
    closeDeletePlanModal();
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
    // In a real app, this would make an API call to logout
    console.log('Admin logged out');
    
    // Redirect to homepage
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
    
    // Auto remove after 5 seconds
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

