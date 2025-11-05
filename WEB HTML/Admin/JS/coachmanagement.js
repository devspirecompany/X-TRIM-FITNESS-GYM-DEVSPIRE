// Coach Management JavaScript

// Synced Data from Dashboard
const coachesData = {
    'mike-rodriguez': {
        id: 'mike-rodriguez',
        name: 'Mike Rodriguez',
        email: 'mike.rodriguez@xtrimfitness.com',
        phone: '+63 912 345 6777',
        specialization: 'Strength & Conditioning',
        yearsExperience: '10+',
        status: 'Active',
        avatar: 'MR',
        totalClients: 24,
        rating: 4.9
    },
    'sarah-chen': {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        email: 'sarah.chen@xtrimfitness.com',
        phone: '+63 912 345 6778',
        specialization: 'Fitness & Nutrition',
        yearsExperience: '8',
        status: 'Active',
        avatar: 'SC',
        totalClients: 18,
        rating: 4.8
    },
    'james-wilson': {
        id: 'james-wilson',
        name: 'James Wilson',
        email: 'james.wilson@xtrimfitness.com',
        phone: '+63 912 345 6779',
        specialization: 'HIIT & Cardio',
        yearsExperience: '12',
        status: 'Active',
        avatar: 'JW',
        totalClients: 22,
        rating: 4.9
    },
    'maria-garcia': {
        id: 'maria-garcia',
        name: 'Maria Garcia',
        email: 'maria.garcia@xtrimfitness.com',
        phone: '+63 912 345 6780',
        specialization: 'Body Transformation',
        yearsExperience: '9',
        status: 'Active',
        avatar: 'MG',
        totalClients: 20,
        rating: 5.0
    }
};

let currentEditingCoachId = null;
let currentDeletingCoachId = null;
let filteredCoaches = { ...coachesData };

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeProfileDropdown();
    displayCoaches();
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

// Display Coaches
function displayCoaches() {
    const tbody = document.getElementById('coachesTableBody');
    if (!tbody) return;

    if (Object.keys(filteredCoaches).length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7">
                    <div class="empty-state">
                        <i class="fas fa-user-tie"></i>
                        <h3>No coaches found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = Object.values(filteredCoaches).map(coach => `
        <tr>
            <td>
                <div class="coach-info">
                    <div class="coach-avatar">${coach.avatar}</div>
                    <div class="coach-details">
                        <h4>${coach.name}</h4>
                        <p>ID: ${coach.id}</p>
                    </div>
                </div>
            </td>
            <td>
                <div class="contact-info">
                    <span><i class="fas fa-envelope"></i> ${coach.email}</span>
                    <span><i class="fas fa-phone"></i> ${coach.phone}</span>
                </div>
            </td>
            <td>
                <span class="specialization-badge">${coach.specialization}</span>
            </td>
            <td>
                <div class="experience-info">
                    <i class="fas fa-calendar-alt"></i>
                    <span>${coach.yearsExperience} years</span>
                </div>
            </td>
            <td>
                <span class="status-badge ${coach.status.toLowerCase().replace(' ', '-')}">${coach.status}</span>
            </td>
            <td>
                <div class="performance-info">
                    <div class="performance-item">
                        <i class="fas fa-star"></i>
                        <span class="performance-value">${coach.rating}</span>
                        <span class="rating-stars">${'★'.repeat(Math.floor(coach.rating))}</span>
                    </div>
                    <div class="performance-item">
                        <i class="fas fa-users"></i>
                        <span>${coach.totalClients} clients</span>
                    </div>
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-small btn-view" onclick="viewCoach('${coach.id}')" title="View coach">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn-small btn-edit" onclick="editCoach('${coach.id}')" title="Edit coach">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-small btn-delete" onclick="deleteCoach('${coach.id}')" title="Delete coach">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Filter Coaches
function filterCoaches() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const specializationFilter = document.getElementById('specializationFilter').value;

    filteredCoaches = {};

    Object.keys(coachesData).forEach(key => {
        const coach = coachesData[key];
        const matchesSearch = !searchTerm || 
            coach.name.toLowerCase().includes(searchTerm) ||
            coach.email.toLowerCase().includes(searchTerm) ||
            coach.specialization.toLowerCase().includes(searchTerm);
        
        const matchesStatus = statusFilter === 'all' || coach.status === statusFilter;
        const matchesSpecialization = specializationFilter === 'all' || coach.specialization === specializationFilter;

        if (matchesSearch && matchesStatus && matchesSpecialization) {
            filteredCoaches[key] = coach;
        }
    });

    displayCoaches();
}

// View Coach
function viewCoach(coachId) {
    const coach = coachesData[coachId];
    if (!coach) return;

    const modal = document.getElementById('viewCoachModal');
    const content = document.getElementById('viewCoachContent');
    
    if (!modal || !content) return;

    content.innerHTML = `
        <div class="coach-detail-grid">
            <div class="detail-section">
                <h4><i class="fas fa-user"></i> Personal Information</h4>
                <div class="detail-item">
                    <span class="detail-label">Full Name</span>
                    <span class="detail-value">${coach.name}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Email</span>
                    <span class="detail-value">${coach.email}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Phone</span>
                    <span class="detail-value">${coach.phone}</span>
                </div>
            </div>
            <div class="detail-section">
                <h4><i class="fas fa-dumbbell"></i> Professional Information</h4>
                <div class="detail-item">
                    <span class="detail-label">Specialization</span>
                    <span class="detail-value"><span class="specialization-badge">${coach.specialization}</span></span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Years of Experience</span>
                    <span class="detail-value">${coach.yearsExperience} years</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Status</span>
                    <span class="detail-value"><span class="status-badge ${coach.status.toLowerCase().replace(' ', '-')}">${coach.status}</span></span>
                </div>
            </div>
            <div class="detail-section">
                <h4><i class="fas fa-chart-line"></i> Performance Metrics</h4>
                <div class="detail-item">
                    <span class="detail-label">Rating</span>
                    <span class="detail-value">
                        <span class="performance-value">${coach.rating}</span>
                        <span class="rating-stars">${'★'.repeat(Math.floor(coach.rating))}</span>
                    </span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Total Clients</span>
                    <span class="detail-value">${coach.totalClients}</span>
                </div>
            </div>
        </div>
    `;

    currentEditingCoachId = coachId;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeViewCoachModal() {
    const modal = document.getElementById('viewCoachModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function editCoachFromView() {
    closeViewCoachModal();
    setTimeout(() => {
        editCoach(currentEditingCoachId);
    }, 300);
}

// Edit Coach
function editCoach(coachId) {
    const coach = coachesData[coachId];
    if (!coach) return;

    currentEditingCoachId = coachId;
    const modal = document.getElementById('addEditCoachModal');
    const title = document.getElementById('addEditModalTitle');
    
    if (!modal || !title) return;

    title.innerHTML = '<i class="fas fa-edit"></i> Edit Coach';
    
    // Populate form
    document.getElementById('coachName').value = coach.name;
    document.getElementById('coachEmail').value = coach.email;
    document.getElementById('coachPhone').value = coach.phone;
    document.getElementById('coachSpecialization').value = coach.specialization;
    document.getElementById('coachExperience').value = coach.yearsExperience;
    document.getElementById('coachStatus').value = coach.status;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Add Coach
function openAddCoachModal() {
    currentEditingCoachId = null;
    const modal = document.getElementById('addEditCoachModal');
    const title = document.getElementById('addEditModalTitle');
    const form = document.getElementById('coachForm');
    
    if (!modal || !title || !form) return;

    title.innerHTML = '<i class="fas fa-user-plus"></i> Add New Coach';
    form.reset();

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAddEditCoachModal() {
    const modal = document.getElementById('addEditCoachModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        currentEditingCoachId = null;
    }
}

// Save Coach
function saveCoach(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('coachName').value.trim(),
        email: document.getElementById('coachEmail').value.trim(),
        phone: document.getElementById('coachPhone').value.trim(),
        specialization: document.getElementById('coachSpecialization').value,
        yearsExperience: document.getElementById('coachExperience').value.trim(),
        status: document.getElementById('coachStatus').value
    };

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.specialization || !formData.yearsExperience || !formData.status) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    if (currentEditingCoachId) {
        // Update existing coach
        const coach = coachesData[currentEditingCoachId];
        if (coach) {
            Object.assign(coach, formData);
            showToast(`Coach ${coach.name} updated successfully`, 'success');
        }
    } else {
        // Add new coach
        const coachId = formData.name.toLowerCase().replace(/\s+/g, '-');
        const avatar = formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        
        coachesData[coachId] = {
            id: coachId,
            ...formData,
            avatar: avatar,
            totalClients: 0,
            rating: 0.0
        };
        
        showToast(`Coach ${formData.name} added successfully`, 'success');
    }

    // Update filtered coaches
    filterCoaches();
    closeAddEditCoachModal();
}

// Delete Coach
function deleteCoach(coachId) {
    const coach = coachesData[coachId];
    if (!coach) return;

    currentDeletingCoachId = coachId;
    const modal = document.getElementById('deleteCoachModal');
    const text = document.getElementById('deleteCoachText');
    
    if (!modal || !text) return;

    text.textContent = `Are you sure you want to delete ${coach.name}? This action cannot be undone.`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDeleteCoachModal() {
    const modal = document.getElementById('deleteCoachModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        currentDeletingCoachId = null;
    }
}

function confirmDeleteCoach() {
    if (!currentDeletingCoachId) return;

    const coach = coachesData[currentDeletingCoachId];
    if (coach) {
        delete coachesData[currentDeletingCoachId];
        showToast(`Coach ${coach.name} deleted successfully`, 'success');
    }

    filterCoaches();
    closeDeleteCoachModal();
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

