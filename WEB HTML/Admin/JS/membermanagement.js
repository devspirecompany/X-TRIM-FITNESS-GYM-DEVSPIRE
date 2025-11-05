// Member Management JavaScript

// Synced Data from Dashboard
const membersData = {
    'ashley-quicho': {
        id: 'ashley-quicho',
        name: 'Ashley Quicho',
        email: 'ashley.quicho@email.com',
        phone: '+63 912 345 6789',
        dob: '1995-01-15',
        gender: 'Female',
        address: '123 Main Street, Quezon City, Metro Manila',
        emergencyContact: 'Maria Quicho - +63 912 345 6788',
        membership: 'PROMO Student',
        status: 'Active',
        joinDate: 'October 2024',
        avatar: 'AQ',
        progress: {
            weightLost: 12,
            workoutsCompleted: 18
        }
    },
    'john-dela-cruz': {
        id: 'john-dela-cruz',
        name: 'John Dela Cruz',
        email: 'john.delacruz@email.com',
        phone: '+63 912 345 6790',
        dob: '1992-03-22',
        gender: 'Male',
        address: '456 Oak Avenue, Makati City, Metro Manila',
        emergencyContact: 'Juan Dela Cruz - +63 912 345 6791',
        membership: 'PROMO Student',
        status: 'Active',
        joinDate: 'September 2024',
        avatar: 'JD',
        progress: {
            weightLost: 8,
            workoutsCompleted: 15
        }
    },
    'maria-santos': {
        id: 'maria-santos',
        name: 'Maria Santos',
        email: 'maria.santos@email.com',
        phone: '+63 912 345 6792',
        dob: '1998-06-10',
        gender: 'Female',
        address: '789 Pine Road, Taguig City, Metro Manila',
        emergencyContact: 'Pedro Santos - +63 912 345 6793',
        membership: 'PROMO Student',
        status: 'Active',
        joinDate: 'November 2024',
        avatar: 'MS',
        progress: {
            weightLost: 5,
            workoutsCompleted: 10
        }
    },
    'robert-lim': {
        id: 'robert-lim',
        name: 'Robert Lim',
        email: 'robert.lim@email.com',
        phone: '+63 912 345 6794',
        dob: '1990-08-05',
        gender: 'Male',
        address: '321 Elm Street, Pasig City, Metro Manila',
        emergencyContact: 'Rosa Lim - +63 912 345 6795',
        membership: 'Student',
        status: 'Active',
        joinDate: 'June 2024',
        avatar: 'RL',
        progress: {
            weightLost: 0,
            workoutsCompleted: 0
        }
    }
};

let currentEditingMemberId = null;
let currentDeletingMemberId = null;
let filteredMembers = { ...membersData };

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeProfileDropdown();
    displayMembers();
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

// Display Members
function displayMembers() {
    const tbody = document.getElementById('membersTableBody');
    if (!tbody) return;

    if (Object.keys(filteredMembers).length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7">
                    <div class="empty-state">
                        <i class="fas fa-users"></i>
                        <h3>No members found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = Object.values(filteredMembers).map(member => `
        <tr>
            <td>
                <div class="member-info">
                    <div class="member-avatar">${member.avatar}</div>
                    <div class="member-details">
                        <h4>${member.name}</h4>
                        <p>ID: ${member.id}</p>
                    </div>
                </div>
            </td>
            <td>
                <div class="contact-info">
                    <span><i class="fas fa-envelope"></i> ${member.email}</span>
                    <span><i class="fas fa-phone"></i> ${member.phone}</span>
                </div>
            </td>
            <td>
                <span class="membership-badge ${member.membership.toLowerCase().replace(/\s+/g, '-')}">${member.membership}</span>
            </td>
            <td>
                <span class="status-badge ${member.status.toLowerCase()}">${member.status}</span>
            </td>
            <td>${member.joinDate}</td>
            <td>
                <div class="progress-info">
                    <span class="progress-value">${member.progress.weightLost} lbs lost</span>
                    <span>${member.progress.workoutsCompleted} workouts</span>
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-small btn-view" onclick="viewMember('${member.id}')" title="View member">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn-small btn-edit" onclick="editMember('${member.id}')" title="Edit member">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-small btn-delete" onclick="deleteMember('${member.id}')" title="Delete member">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Filter Members
function filterMembers() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const membershipFilter = document.getElementById('membershipFilter').value;

    filteredMembers = {};

    Object.keys(membersData).forEach(key => {
        const member = membersData[key];
        const matchesSearch = !searchTerm || 
            member.name.toLowerCase().includes(searchTerm) ||
            member.email.toLowerCase().includes(searchTerm) ||
            member.phone.includes(searchTerm);
        
        const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
        const matchesMembership = membershipFilter === 'all' || member.membership === membershipFilter;

        if (matchesSearch && matchesStatus && matchesMembership) {
            filteredMembers[key] = member;
        }
    });

    displayMembers();
}

// View Member
function viewMember(memberId) {
    const member = membersData[memberId];
    if (!member) return;

    const modal = document.getElementById('viewMemberModal');
    const content = document.getElementById('viewMemberContent');
    
    if (!modal || !content) return;

    content.innerHTML = `
        <div class="member-detail-grid">
            <div class="detail-section">
                <h4><i class="fas fa-user"></i> Personal Information</h4>
                <div class="detail-item">
                    <span class="detail-label">Full Name</span>
                    <span class="detail-value">${member.name}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Email</span>
                    <span class="detail-value">${member.email}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Phone</span>
                    <span class="detail-value">${member.phone}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Date of Birth</span>
                    <span class="detail-value">${member.dob ? new Date(member.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Gender</span>
                    <span class="detail-value">${member.gender || 'N/A'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Address</span>
                    <span class="detail-value">${member.address || 'N/A'}</span>
                </div>
            </div>
            <div class="detail-section">
                <h4><i class="fas fa-credit-card"></i> Membership & Status</h4>
                <div class="detail-item">
                    <span class="detail-label">Membership Plan</span>
                    <span class="detail-value"><span class="membership-badge ${member.membership.toLowerCase()}">${member.membership}</span></span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Status</span>
                    <span class="detail-value"><span class="status-badge ${member.status.toLowerCase()}">${member.status}</span></span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Join Date</span>
                    <span class="detail-value">${member.joinDate}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Emergency Contact</span>
                    <span class="detail-value">${member.emergencyContact || 'N/A'}</span>
                </div>
            </div>
            <div class="detail-section">
                <h4><i class="fas fa-chart-line"></i> Progress</h4>
                <div class="detail-item">
                    <span class="detail-label">Weight Lost</span>
                    <span class="detail-value">${member.progress.weightLost} lbs</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Workouts Completed</span>
                    <span class="detail-value">${member.progress.workoutsCompleted}</span>
                </div>
            </div>
        </div>
    `;

    currentEditingMemberId = memberId;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeViewMemberModal() {
    const modal = document.getElementById('viewMemberModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function editMemberFromView() {
    closeViewMemberModal();
    setTimeout(() => {
        editMember(currentEditingMemberId);
    }, 300);
}

// Edit Member
function editMember(memberId) {
    const member = membersData[memberId];
    if (!member) return;

    currentEditingMemberId = memberId;
    const modal = document.getElementById('addEditMemberModal');
    const title = document.getElementById('addEditModalTitle');
    
    if (!modal || !title) return;

    title.innerHTML = '<i class="fas fa-edit"></i> Edit Member';
    
    // Populate form
    document.getElementById('memberName').value = member.name;
    document.getElementById('memberEmail').value = member.email;
    document.getElementById('memberPhone').value = member.phone;
    document.getElementById('memberDOB').value = member.dob || '';
    document.getElementById('memberGender').value = member.gender || '';
    document.getElementById('memberAddress').value = member.address || '';
    document.getElementById('memberEmergencyContact').value = member.emergencyContact || '';
    document.getElementById('memberMembership').value = member.membership;
    document.getElementById('memberStatus').value = member.status;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Add Member
function openAddMemberModal() {
    currentEditingMemberId = null;
    const modal = document.getElementById('addEditMemberModal');
    const title = document.getElementById('addEditModalTitle');
    const form = document.getElementById('memberForm');
    
    if (!modal || !title || !form) return;

    title.innerHTML = '<i class="fas fa-user-plus"></i> Add New Member';
    form.reset();

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAddEditMemberModal() {
    const modal = document.getElementById('addEditMemberModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        currentEditingMemberId = null;
    }
}

// Save Member
function saveMember(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('memberName').value.trim(),
        email: document.getElementById('memberEmail').value.trim(),
        phone: document.getElementById('memberPhone').value.trim(),
        dob: document.getElementById('memberDOB').value,
        gender: document.getElementById('memberGender').value,
        address: document.getElementById('memberAddress').value.trim(),
        emergencyContact: document.getElementById('memberEmergencyContact').value.trim(),
        membership: document.getElementById('memberMembership').value,
        status: document.getElementById('memberStatus').value
    };

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.membership || !formData.status) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    if (currentEditingMemberId) {
        // Update existing member
        const member = membersData[currentEditingMemberId];
        if (member) {
            Object.assign(member, formData);
            showToast(`Member ${member.name} updated successfully`, 'success');
        }
    } else {
        // Add new member
        const memberId = formData.name.toLowerCase().replace(/\s+/g, '-');
        const avatar = formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        
        membersData[memberId] = {
            id: memberId,
            ...formData,
            avatar: avatar,
            joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            progress: {
                weightLost: 0,
                workoutsCompleted: 0
            }
        };
        
        showToast(`Member ${formData.name} added successfully`, 'success');
    }

    // Update filtered members
    filterMembers();
    closeAddEditMemberModal();
}

// Delete Member
function deleteMember(memberId) {
    const member = membersData[memberId];
    if (!member) return;

    currentDeletingMemberId = memberId;
    const modal = document.getElementById('deleteMemberModal');
    const text = document.getElementById('deleteMemberText');
    
    if (!modal || !text) return;

    text.textContent = `Are you sure you want to delete ${member.name}? This action cannot be undone.`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDeleteMemberModal() {
    const modal = document.getElementById('deleteMemberModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        currentDeletingMemberId = null;
    }
}

function confirmDeleteMember() {
    if (!currentDeletingMemberId) return;

    const member = membersData[currentDeletingMemberId];
    if (member) {
        delete membersData[currentDeletingMemberId];
        showToast(`Member ${member.name} deleted successfully`, 'success');
    }

    filterMembers();
    closeDeleteMemberModal();
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

