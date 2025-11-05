// Reports & Analytics JavaScript

// Synced Data from Dashboard
const membersData = {
    'ashley-quicho': {
        name: 'Ashley Quicho',
        email: 'ashley.quicho@email.com',
        membership: 'PROMO Student',
        status: 'Active',
        joinDate: 'October 2024',
        progress: {
            weightLost: 12,
            workoutsCompleted: 18
        }
    },
    'john-dela-cruz': {
        name: 'John Dela Cruz',
        email: 'john.delacruz@email.com',
        membership: 'PROMO Student',
        status: 'Active',
        joinDate: 'September 2024',
        progress: {
            weightLost: 8,
            workoutsCompleted: 15
        }
    },
    'maria-santos': {
        name: 'Maria Santos',
        email: 'maria.santos@email.com',
        membership: 'PROMO Student',
        status: 'Active',
        joinDate: 'November 2024',
        progress: {
            weightLost: 5,
            workoutsCompleted: 10
        }
    },
    'robert-lim': {
        name: 'Robert Lim',
        email: 'robert.lim@email.com',
        membership: 'Student',
        status: 'Active',
        joinDate: 'June 2024',
        progress: {
            weightLost: 0,
            workoutsCompleted: 0
        }
    }
};

const coachesData = {
    'mike-rodriguez': {
        name: 'Mike Rodriguez',
        specialization: 'Strength & Conditioning',
        status: 'Active',
        totalClients: 24,
        rating: 4.9
    },
    'sarah-chen': {
        name: 'Sarah Chen',
        specialization: 'Fitness & Nutrition',
        status: 'Active',
        totalClients: 18,
        rating: 4.8
    },
    'james-wilson': {
        name: 'James Wilson',
        specialization: 'HIIT & Cardio',
        status: 'Active',
        totalClients: 22,
        rating: 4.9
    },
    'maria-garcia': {
        name: 'Maria Garcia',
        specialization: 'Body Transformation',
        status: 'Active',
        totalClients: 20,
        rating: 5.0
    }
};

const membershipPlans = {
    'Student': { price: 500, count: 1 },
    'PROMO Student': { price: 1200, count: 3 },
    'Non student': { price: 1300, count: 0 }
};

let revenueChart = null;
let membershipChart = null;
let memberGrowthChart = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeProfileDropdown();
    updateMemberCounts();
    updateReports();
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

// Update member counts
function updateMemberCounts() {
    Object.keys(membershipPlans).forEach(planKey => {
        membershipPlans[planKey].count = 0;
    });

    Object.values(membersData).forEach(member => {
        const planName = member.membership;
        if (membershipPlans[planName]) {
            membershipPlans[planName].count++;
        }
    });
}

// Calculate total revenue
function calculateTotalRevenue() {
    let total = 0;
    Object.keys(membershipPlans).forEach(planKey => {
        const plan = membershipPlans[planKey];
        total += plan.price * plan.count;
    });
    return total;
}

// Calculate total workouts
function calculateTotalWorkouts() {
    let total = 0;
    Object.values(membersData).forEach(member => {
        total += member.progress.workoutsCompleted || 0;
    });
    return total;
}

// Calculate total weight lost
function calculateTotalWeightLost() {
    let total = 0;
    Object.values(membersData).forEach(member => {
        total += member.progress.weightLost || 0;
    });
    return total;
}

// Update all reports
function updateReports() {
    updateSummaryCards();
    updateRevenueChart();
    updateMembershipChart();
    updateMemberGrowthChart();
    updateCoachPerformance();
    updateRevenueBreakdown();
    updateMemberStatistics();
    updateRecentActivity();
}

// Update Summary Cards
function updateSummaryCards() {
    const totalRevenue = calculateTotalRevenue();
    const totalMembers = Object.keys(membersData).length;
    const totalCoaches = Object.keys(coachesData).length;
    const totalWorkouts = calculateTotalWorkouts();

    document.getElementById('totalRevenue').textContent = `₱${totalRevenue.toLocaleString()}`;
    document.getElementById('totalMembers').textContent = totalMembers;
    document.getElementById('totalCoaches').textContent = totalCoaches;
    document.getElementById('totalWorkouts').textContent = totalWorkouts;

    // Calculate changes (simulated)
    const revenueChange = document.getElementById('revenueChange');
    const membersChange = document.getElementById('membersChange');
    const workoutsChange = document.getElementById('workoutsChange');

    if (revenueChange) revenueChange.textContent = '+12.5%';
    if (membersChange) membersChange.textContent = '+25%';
    if (workoutsChange) workoutsChange.textContent = '+18%';
}

// Update Revenue Chart
function updateRevenueChart() {
    const canvas = document.getElementById('revenueChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const period = document.getElementById('reportPeriod')?.value || 'month';

    // Destroy existing chart if it exists
    if (revenueChart) {
        revenueChart.destroy();
    }

    // Sample data for different periods
    let labels = [];
    let data = [];

    if (period === 'week') {
        labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        data = [2500, 3000, 2800, 3200, 3500, 4000, 3800];
    } else if (period === 'month') {
        labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        data = [2500, 3000, 2800, 3200];
    } else if (period === 'year') {
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        data = [8000, 8500, 9000, 9500, 10000, 10500, 11000, 11500, 12000, 12500, 13000, 13500];
    }

    revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Revenue',
                data: data,
                borderColor: '#F9C513',
                backgroundColor: 'rgba(249, 197, 19, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: '#F9C513',
                pointBorderColor: '#F9C513',
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₱' + value.toLocaleString();
                        },
                        color: '#9CA3AF'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        color: '#9CA3AF'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                }
            }
        }
    });
}

// Update Membership Chart
function updateMembershipChart() {
    const canvas = document.getElementById('membershipChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (membershipChart) {
        membershipChart.destroy();
    }

    const labels = Object.keys(membershipPlans);
    const data = Object.values(membershipPlans).map(plan => plan.count);
    const colors = ['#F9C513', '#E41E26', '#10B981'];

    membershipChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#9CA3AF',
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

// Update Member Growth Chart
function updateMemberGrowthChart() {
    const canvas = document.getElementById('memberGrowthChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (memberGrowthChart) {
        memberGrowthChart.destroy();
    }

    const labels = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
    const data = [1, 1, 1, 2, 3, 4];

    memberGrowthChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'New Members',
                data: data,
                backgroundColor: 'rgba(249, 197, 19, 0.8)',
                borderColor: '#F9C513',
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        color: '#9CA3AF'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                x: {
                    ticks: {
                        color: '#9CA3AF'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                }
            }
        }
    });
}

// Update Coach Performance
function updateCoachPerformance() {
    const container = document.getElementById('coachPerformanceList');
    if (!container) return;

    const coaches = Object.values(coachesData).sort((a, b) => b.rating - a.rating);

    container.innerHTML = coaches.map(coach => {
        const avatar = coach.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        const rating = parseFloat(coach.rating).toFixed(1);
        return `
            <div class="coach-performance-item">
                <div class="coach-performance-avatar">${avatar}</div>
                <div class="coach-performance-info">
                    <div class="coach-performance-name">${coach.name}</div>
                    <div class="coach-performance-specialization">${coach.specialization}</div>
                </div>
                <div class="coach-performance-stats">
                    <div class="coach-performance-stat">
                        <span class="coach-performance-stat-value">${coach.totalClients}</span>
                        <span class="coach-performance-stat-label">Clients</span>
                    </div>
                    <div class="coach-performance-rating">
                        <i class="fas fa-star"></i>
                        <span>${rating}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Update Revenue Breakdown
function updateRevenueBreakdown() {
    const tbody = document.getElementById('revenueBreakdownBody');
    if (!tbody) return;

    tbody.innerHTML = Object.entries(membershipPlans).map(([planName, plan]) => {
        const monthlyRevenue = plan.price * plan.count;
        const annualRevenue = monthlyRevenue * 12;
        return `
            <tr>
                <td><strong>${planName}</strong></td>
                <td>${plan.count}</td>
                <td>₱${plan.price.toLocaleString()}</td>
                <td>₱${monthlyRevenue.toLocaleString()}</td>
                <td>₱${annualRevenue.toLocaleString()}</td>
            </tr>
        `;
    }).join('');

    // Add total row
    const totalMonthly = calculateTotalRevenue();
    const totalAnnual = totalMonthly * 12;
    tbody.innerHTML += `
        <tr style="background: rgba(249, 197, 19, 0.05); font-weight: 700;">
            <td>Total</td>
            <td>${Object.values(membershipPlans).reduce((sum, p) => sum + p.count, 0)}</td>
            <td>-</td>
            <td>₱${totalMonthly.toLocaleString()}</td>
            <td>₱${totalAnnual.toLocaleString()}</td>
        </tr>
    `;
}

// Update Member Statistics
function updateMemberStatistics() {
    const activeMembers = Object.values(membersData).filter(m => m.status === 'Active').length;
    const newMembers = Object.values(membersData).filter(m => {
        const joinDate = m.joinDate;
        return joinDate.includes('November') || joinDate.includes('2024');
    }).length;
    const totalWeightLost = calculateTotalWeightLost();
    const workoutsCompleted = calculateTotalWorkouts();

    document.getElementById('activeMembers').textContent = activeMembers;
    document.getElementById('newMembers').textContent = newMembers;
    document.getElementById('totalWeightLost').textContent = `${totalWeightLost} kg`;
    document.getElementById('workoutsCompleted').textContent = workoutsCompleted;
}

// Update Recent Activity
function updateRecentActivity() {
    const container = document.getElementById('activityList');
    if (!container) return;

    const activities = [
        {
            type: 'member',
            icon: 'fa-user-plus',
            text: 'New member joined: Maria Santos',
            time: '2 days ago'
        },
        {
            type: 'revenue',
            icon: 'fa-peso-sign',
            text: 'PROMO Student membership payment received: ₱1,200',
            time: '3 days ago'
        },
        {
            type: 'workout',
            icon: 'fa-dumbbell',
            text: 'Ashley Quicho completed workout session',
            time: '1 day ago'
        },
        {
            type: 'coach',
            icon: 'fa-user-tie',
            text: 'Mike Rodriguez assigned new client',
            time: '4 days ago'
        },
        {
            type: 'member',
            icon: 'fa-user-plus',
            text: 'New member joined: John Dela Cruz',
            time: '1 week ago'
        },
        {
            type: 'revenue',
            icon: 'fa-peso-sign',
            text: 'PROMO Student membership payment received: ₱1,200',
            time: '1 week ago'
        }
    ];

    container.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.type}">
                <i class="fas ${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-text">${activity.text}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        </div>
    `).join('');
}

// Export Report
function exportReport() {
    showToast('Report export functionality will be available soon', 'info');
    // In a real application, this would generate and download a PDF/CSV report
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

