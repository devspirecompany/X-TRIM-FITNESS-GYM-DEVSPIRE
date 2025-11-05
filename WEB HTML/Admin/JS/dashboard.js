// Admin Dashboard JavaScript

// Synced Data from Clients and Coaches
const membersData = {
    'ashley-quicho': {
        name: 'Ashley Quicho',
        email: 'ashley.quicho@email.com',
        phone: '+63 912 345 6789',
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
        name: 'John Dela Cruz',
        email: 'john.delacruz@email.com',
        phone: '+63 912 345 6790',
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
        name: 'Maria Santos',
        email: 'maria.santos@email.com',
        phone: '+63 912 345 6792',
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
        name: 'Robert Lim',
        email: 'robert.lim@email.com',
        phone: '+63 912 345 6794',
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

const coachesData = {
    'mike-rodriguez': {
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

// Membership Plans
const membershipPlans = {
    'Student': { price: 500, count: 1 },
    'PROMO Student': { price: 1200, count: 3 },
    'Non student': { price: 1300, count: 0 }
};

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeProfileDropdown();
    loadDashboardData();
    displayRecentMembers();
    displayCoaches();
    updateMembershipDistribution();
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

// Load Dashboard Data
function loadDashboardData() {
    // Total Members
    const totalMembers = Object.keys(membersData).length;
    document.getElementById('totalMembers').textContent = totalMembers;
    
    // New Members (this month - November 2024)
    const newMembers = Object.values(membersData).filter(m => m.joinDate === 'November 2024').length;
    document.getElementById('newMembers').textContent = `+${newMembers}`;
    
    // Total Coaches
    const totalCoaches = Object.keys(coachesData).length;
    document.getElementById('totalCoaches').textContent = totalCoaches;
    
    // Update total coaches stat if needed
    const coachesStatEl = document.getElementById('totalCoaches');
    if (coachesStatEl) {
        coachesStatEl.textContent = totalCoaches;
    }
    
    // Monthly Revenue
    let monthlyRevenue = 0;
    Object.values(membersData).forEach(member => {
        const plan = membershipPlans[member.membership];
        if (plan) {
            monthlyRevenue += plan.price;
        }
    });
    document.getElementById('monthlyRevenue').textContent = `₱${monthlyRevenue.toLocaleString()}`;
    
    // Active Subscriptions
    const activeSubscriptions = Object.values(membersData).filter(m => m.status === 'Active').length;
    document.getElementById('activeSubscriptions').textContent = activeSubscriptions;
    
    // Total Revenue
    document.getElementById('totalRevenue').textContent = `₱${monthlyRevenue.toLocaleString()}`;
    
    // Average Revenue per Member
    const avgRevenue = activeSubscriptions > 0 ? Math.round(monthlyRevenue / activeSubscriptions) : 0;
    document.getElementById('avgRevenue').textContent = `₱${avgRevenue.toLocaleString()}`;
}

// Display Recent Members
function displayRecentMembers() {
    const container = document.getElementById('recentMembersList');
    if (!container) return;
    
    const members = Object.entries(membersData)
        .sort((a, b) => {
            // Sort by join date (most recent first)
            const dates = { 'November 2024': 3, 'October 2024': 2, 'September 2024': 1, 'June 2024': 0 };
            return dates[b[1].joinDate] - dates[a[1].joinDate];
        })
        .slice(0, 3); // Show only 3 most recent
    
    if (members.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">No members yet</p>';
        return;
    }
    
    container.innerHTML = members.map(([id, member]) => `
        <div class="member-item">
            <div class="member-avatar">${member.avatar}</div>
            <div class="member-info">
                <h3>${member.name}</h3>
                <p>${member.membership} Member • Joined ${member.joinDate}</p>
            </div>
            <div class="member-actions">
                <button class="btn-small" onclick="viewMember('${id}')" title="View ${member.name}'s Profile">
                    <i class="fas fa-eye"></i> View
                </button>
            </div>
        </div>
    `).join('');
}

// Display Coaches
function displayCoaches() {
    const container = document.getElementById('coachesList');
    if (!container) return;
    
    const coaches = Object.entries(coachesData);
    
    if (coaches.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">No coaches yet</p>';
        return;
    }
    
    container.innerHTML = coaches.map(([id, coach]) => `
        <div class="coach-item">
            <div class="coach-avatar">${coach.avatar}</div>
            <div class="coach-info">
                <h3>${coach.name}</h3>
                <p>${coach.specialization} • ${coach.yearsExperience} years experience</p>
            </div>
            <div class="member-actions">
                <button class="btn-small" onclick="viewCoach('${id}')" title="View ${coach.name}'s Profile">
                    <i class="fas fa-eye"></i> View
                </button>
            </div>
        </div>
    `).join('');
}

// Update Membership Distribution
function updateMembershipDistribution() {
    // Count members by membership type
    const counts = {
        'Student': 0,
        'PROMO Student': 0,
        'Non student': 0
    };
    
    Object.values(membersData).forEach(member => {
        if (counts.hasOwnProperty(member.membership)) {
            counts[member.membership] = (counts[member.membership] || 0) + 1;
        }
    });
    
    const total = Object.keys(membersData).length;
    
    // Update Student
    const studentCountEl = document.getElementById('studentCount');
    if (studentCountEl) {
        studentCountEl.textContent = counts['Student'] || 0;
        const studentPercent = total > 0 ? Math.round((counts['Student'] / total) * 100) : 0;
        const studentItem = studentCountEl.closest('.membership-item');
        if (studentItem) {
            const percentEl = studentItem.querySelector('.membership-percentage');
            if (percentEl) {
                percentEl.textContent = `${studentPercent}%`;
            }
        }
    }
    
    // Update PROMO Student
    const promoStudentCountEl = document.getElementById('promoStudentCount');
    if (promoStudentCountEl) {
        promoStudentCountEl.textContent = counts['PROMO Student'] || 0;
        const promoStudentPercent = total > 0 ? Math.round((counts['PROMO Student'] / total) * 100) : 0;
        const promoStudentItem = promoStudentCountEl.closest('.membership-item');
        if (promoStudentItem) {
            const percentEl = promoStudentItem.querySelector('.membership-percentage');
            if (percentEl) {
                percentEl.textContent = `${promoStudentPercent}%`;
            }
        }
    }
    
    // Update Non student
    const nonStudentCountEl = document.getElementById('nonStudentCount');
    if (nonStudentCountEl) {
        nonStudentCountEl.textContent = counts['Non student'] || 0;
        const nonStudentPercent = total > 0 ? Math.round((counts['Non student'] / total) * 100) : 0;
        const nonStudentItem = nonStudentCountEl.closest('.membership-item');
        if (nonStudentItem) {
            const percentEl = nonStudentItem.querySelector('.membership-percentage');
            if (percentEl) {
                percentEl.textContent = `${nonStudentPercent}%`;
            }
        }
    }
}

// Update Revenue Chart
function updateRevenueChart() {
    const period = document.getElementById('revenuePeriod').value;
    // In a real app, this would fetch data based on the selected period
    console.log('Revenue period changed to:', period);
}

// View Member
function viewMember(memberId) {
    window.location.href = `../HTML/membermanagement.html?member=${encodeURIComponent(memberId)}`;
}

// View Coach
function viewCoach(coachId) {
    window.location.href = `../HTML/coachmanagement.html?coach=${encodeURIComponent(coachId)}`;
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
        document.body.style.overflow = 'auto';
    }
}

function confirmLogout() {
    // In a real app, this would make an API call to logout
    console.log('Admin logged out');
    
    // Redirect to homepage
    window.location.href = '../../Client/HTML/homepage.html';
}

// Toast Notifications
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    toast.innerHTML = `
        <i class="fas ${icons[type] || icons.info} toast-icon"></i>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()" title="Close" aria-label="Close">
            <i class="fas fa-times"></i>
        </button>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Close modals on outside click
document.addEventListener('click', function(event) {
    const logoutModal = document.getElementById('logoutModal');
    if (logoutModal && event.target === logoutModal) {
        closeLogoutModal();
    }
});

// Close modals on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLogoutModal();
    }
});

