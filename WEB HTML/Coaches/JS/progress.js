// Global Variables
let currentView = 'overview';
let currentClientId = null;

// Progress Data
let progressData = {
    'ashley-quicho': {
        clientId: 'ashley-quicho',
        name: 'Ashley Quicho',
        avatar: 'AQ',
        currentWeight: 178,
        startWeight: 190,
        bodyFat: 18.5,
        startBodyFat: 23.0,
        bmi: 24.2,
        startBmi: 26.3,
        muscleMass: 145,
        startMuscleMass: 137,
        measurements: [
            { date: '2025-05-01', weight: 190, bodyFat: 23.0, bmi: 26.3, muscleMass: 137 },
            { date: '2025-06-01', weight: 189, bodyFat: 22.5, bmi: 25.7, muscleMass: 138 },
            { date: '2025-07-01', weight: 187, bodyFat: 22.0, bmi: 25.4, muscleMass: 139 },
            { date: '2025-08-01', weight: 185, bodyFat: 21.2, bmi: 25.1, muscleMass: 140 },
            { date: '2025-09-01', weight: 182, bodyFat: 19.8, bmi: 24.7, muscleMass: 142 },
            { date: '2025-10-01', weight: 178, bodyFat: 18.5, bmi: 24.2, muscleMass: 145 }
        ],
        trend: 'down',
        status: 'active',
        lastUpdate: '2025-10-01',
        comments: []
    },
    'john-dela-cruz': {
        clientId: 'john-dela-cruz',
        name: 'John Dela Cruz',
        avatar: 'JD',
        currentWeight: 195,
        startWeight: 200,
        bodyFat: 15.2,
        startBodyFat: 18.5,
        bmi: 26.8,
        startBmi: 27.5,
        muscleMass: 165,
        startMuscleMass: 160,
        measurements: [
            { date: '2024-09-15', weight: 200, bodyFat: 18.5, bmi: 27.5, muscleMass: 160 },
            { date: '2024-09-22', weight: 198, bodyFat: 17.8, bmi: 27.2, muscleMass: 161 },
            { date: '2024-09-29', weight: 197, bodyFat: 17.2, bmi: 27.1, muscleMass: 162 },
            { date: '2024-10-06', weight: 196, bodyFat: 16.5, bmi: 27.0, muscleMass: 163 },
            { date: '2024-10-13', weight: 195, bodyFat: 15.8, bmi: 26.8, muscleMass: 164 },
            { date: '2024-10-20', weight: 195, bodyFat: 15.2, bmi: 26.8, muscleMass: 165 }
        ],
        trend: 'down',
        status: 'active',
        lastUpdate: '2024-10-20',
        comments: []
    },
    'maria-santos': {
        clientId: 'maria-santos',
        name: 'Maria Santos',
        avatar: 'MS',
        currentWeight: 145,
        startWeight: 150,
        bodyFat: 22.0,
        startBodyFat: 25.5,
        bmi: 22.1,
        startBmi: 22.9,
        muscleMass: 113,
        startMuscleMass: 110,
        measurements: [
            { date: '2024-11-01', weight: 150, bodyFat: 25.5, bmi: 22.9, muscleMass: 110 },
            { date: '2024-11-08', weight: 148, bodyFat: 24.8, bmi: 22.6, muscleMass: 111 },
            { date: '2024-11-15', weight: 146, bodyFat: 23.5, bmi: 22.3, muscleMass: 112 },
            { date: '2024-11-22', weight: 145, bodyFat: 22.0, bmi: 22.1, muscleMass: 113 }
        ],
        trend: 'down',
        status: 'active',
        lastUpdate: '2024-11-22',
        comments: []
    },
    'robert-lim': {
        clientId: 'robert-lim',
        name: 'Robert Lim',
        avatar: 'RL',
        currentWeight: 175,
        startWeight: 170,
        bodyFat: 12.5,
        startBodyFat: 13.0,
        bmi: 24.5,
        startBmi: 23.8,
        muscleMass: 153,
        startMuscleMass: 148,
        measurements: [
            { date: '2024-09-01', weight: 170, bodyFat: 13.0, bmi: 23.8, muscleMass: 148 },
            { date: '2024-09-15', weight: 172, bodyFat: 12.8, bmi: 24.1, muscleMass: 150 },
            { date: '2024-10-01', weight: 174, bodyFat: 12.6, bmi: 24.3, muscleMass: 152 },
            { date: '2024-10-15', weight: 175, bodyFat: 12.5, bmi: 24.5, muscleMass: 153 }
        ],
        trend: 'up',
        status: 'active',
        lastUpdate: '2024-10-15',
        comments: []
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeProfileDropdown();
    displayProgressTable();
    filterProgress();
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

// Profile dropdown
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

// Toast notifications
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

function closeToast(toast) {
    toast.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
}

// Chat and Notification Panels
function toggleChatPanel() {
    const panel = document.getElementById('chatPanel');
    if (panel) {
        panel.classList.toggle('active');
        document.body.style.overflow = panel.classList.contains('active') ? 'hidden' : 'auto';
    }
}

function closeChatPanel() {
    const panel = document.getElementById('chatPanel');
    if (panel) {
        panel.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    if (input && input.value.trim()) {
        showToast('Message sent!', 'success');
        input.value = '';
    }
}

function toggleNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    if (panel) {
        panel.classList.toggle('active');
        document.body.style.overflow = panel.classList.contains('active') ? 'hidden' : 'auto';
    }
}

function closeNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    if (panel) {
        panel.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Logout modal
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
    showToast('Logging out...', 'info');
    setTimeout(() => {
        window.location.href = '../../index.html';
    }, 1000);
}

// Close modals on outside click
document.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        if (event.target === modal) {
            if (modal.id === 'logoutModal') {
                closeLogoutModal();
            } else if (modal.id === 'viewProgressModal') {
                closeViewProgressModal();
            } else if (modal.id === 'commentModal') {
                closeCommentModal();
            }
        }
    });
});

// Close modals on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLogoutModal();
        closeViewProgressModal();
        closeCommentModal();
        closeChatPanel();
        closeNotificationPanel();
    }
});

// View switching
function switchView(view) {
    currentView = view;
    
    const overviewView = document.getElementById('overviewView');
    const detailedView = document.getElementById('detailedView');
    const overviewBtn = document.getElementById('overviewBtn');
    const detailedBtn = document.getElementById('detailedBtn');

    if (view === 'overview') {
        overviewView.style.display = 'block';
        detailedView.style.display = 'none';
        overviewBtn.classList.add('active');
        detailedBtn.classList.remove('active');
        displayProgressTable();
    } else {
        overviewView.style.display = 'none';
        detailedView.style.display = 'block';
        overviewBtn.classList.remove('active');
        detailedBtn.classList.add('active');
        displayDetailedView();
    }
}

// Display progress table
function displayProgressTable() {
    const tbody = document.getElementById('progressTableBody');
    if (!tbody) return;

    const filteredData = getFilteredProgress();
    
    if (filteredData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <i class="fas fa-inbox" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                    No progress data found
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filteredData.map(client => {
        const weightChange = client.currentWeight - client.startWeight;
        const weightChangeText = weightChange > 0 ? `+${weightChange.toFixed(1)}` : weightChange.toFixed(1);
        const trendIcon = client.trend === 'down' ? 'fa-arrow-down' : client.trend === 'up' ? 'fa-arrow-up' : 'fa-minus';
        const trendClass = client.trend === 'down' ? 'trend-down' : client.trend === 'up' ? 'trend-up' : 'trend-neutral';
        const statusClass = client.status === 'active' ? 'active' : client.status === 'pending' ? 'pending' : 'needs-attention';
        const statusText = client.status === 'active' ? 'Active' : client.status === 'pending' ? 'Pending Review' : 'Needs Attention';
        const lastUpdateDate = new Date(client.lastUpdate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        return `
            <tr>
                <td>
                    <div class="client-info">
                        <div class="client-avatar">${client.avatar}</div>
                        <div>
                            <div class="client-name">${client.name}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <strong>${client.currentWeight} lbs</strong>
                    <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">
                        ${weightChangeText} lbs
                    </div>
                </td>
                <td>
                    <strong>${client.bodyFat}%</strong>
                    <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">
                        ${(client.bodyFat - client.startBodyFat).toFixed(1)}%
                    </div>
                </td>
                <td>
                    <strong>${client.bmi}</strong>
                    <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">
                        ${(client.bmi - client.startBmi).toFixed(1)}
                    </div>
                </td>
                <td>
                    <div class="progress-trend ${trendClass}">
                        <i class="fas ${trendIcon}"></i>
                        <span>${client.trend === 'down' ? 'Decreasing' : client.trend === 'up' ? 'Increasing' : 'Stable'}</span>
                    </div>
                </td>
                <td style="color: var(--text-secondary); font-size: 0.85rem;">${lastUpdateDate}</td>
                <td>
                    <span class="status-badge ${statusClass}">
                        <i class="fas fa-circle" style="font-size: 0.5rem;"></i>
                        ${statusText}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="viewClientProgress('${client.clientId}')" title="View Details" aria-label="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon" onclick="addComment('${client.clientId}')" title="Add Comment" aria-label="Add Comment">
                            <i class="fas fa-comment"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// Display detailed view
function displayDetailedView() {
    const container = document.getElementById('clientProgressContainer');
    if (!container) return;

    const filteredData = getFilteredProgress();
    
    if (filteredData.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary); grid-column: 1 / -1;">
                <i class="fas fa-inbox" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                No progress data found
            </div>
        `;
        return;
    }

    container.innerHTML = filteredData.map(client => {
        const chartData = generateChartData(client.measurements, 'weight');
        const chartBars = chartData.map((point, index) => {
            const maxValue = Math.max(...chartData);
            const height = (point / maxValue) * 100;
            return `
                <div class="chart-bar" style="height: ${height}%;" title="${point} lbs on ${new Date(client.measurements[index].date).toLocaleDateString()}">
                    <div class="chart-bar-label">${new Date(client.measurements[index].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                </div>
            `;
        }).join('');

        const weightChange = client.currentWeight - client.startWeight;
        const bodyFatChange = client.bodyFat - client.startBodyFat;
        const bmiChange = client.bmi - client.startBmi;
        const muscleMassChange = client.muscleMass - client.startMuscleMass;

        return `
            <div class="client-progress-card">
                <div class="client-progress-header">
                    <div class="client-progress-title">
                        <div class="client-avatar">${client.avatar}</div>
                        <div>
                            <h3 style="margin: 0; font-size: 1.1rem; color: var(--text-primary);">${client.name}</h3>
                            <p style="margin: 0.25rem 0 0 0; font-size: 0.8rem; color: var(--text-secondary);">Last updated: ${new Date(client.lastUpdate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                    </div>
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="viewClientProgress('${client.clientId}')" title="View Details" aria-label="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="client-progress-chart">
                    ${chartBars}
                </div>
                <div class="progress-metrics">
                    <div class="progress-metric">
                        <div class="progress-metric-label">Weight</div>
                        <div class="progress-metric-value">${client.currentWeight} lbs</div>
                        <div class="progress-metric-change" style="color: ${weightChange < 0 ? '#10B981' : weightChange > 0 ? '#EF4444' : 'var(--text-secondary)'};">
                            ${weightChange > 0 ? '+' : ''}${weightChange.toFixed(1)} lbs
                        </div>
                    </div>
                    <div class="progress-metric">
                        <div class="progress-metric-label">Body Fat</div>
                        <div class="progress-metric-value">${client.bodyFat}%</div>
                        <div class="progress-metric-change" style="color: ${bodyFatChange < 0 ? '#10B981' : bodyFatChange > 0 ? '#EF4444' : 'var(--text-secondary)'};">
                            ${bodyFatChange > 0 ? '+' : ''}${bodyFatChange.toFixed(1)}%
                        </div>
                    </div>
                    <div class="progress-metric">
                        <div class="progress-metric-label">BMI</div>
                        <div class="progress-metric-value">${client.bmi}</div>
                        <div class="progress-metric-change" style="color: ${bmiChange < 0 ? '#10B981' : bmiChange > 0 ? '#EF4444' : 'var(--text-secondary)'};">
                            ${bmiChange > 0 ? '+' : ''}${bmiChange.toFixed(1)}
                        </div>
                    </div>
                    <div class="progress-metric">
                        <div class="progress-metric-label">Muscle Mass</div>
                        <div class="progress-metric-value">${client.muscleMass} lbs</div>
                        <div class="progress-metric-change" style="color: ${muscleMassChange > 0 ? '#10B981' : muscleMassChange < 0 ? '#EF4444' : 'var(--text-secondary)'};">
                            ${muscleMassChange > 0 ? '+' : ''}${muscleMassChange.toFixed(1)} lbs
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Generate chart data
function generateChartData(measurements, metric) {
    return measurements.map(m => m[metric === 'weight' ? 'weight' : metric === 'body-fat' ? 'bodyFat' : metric === 'bmi' ? 'bmi' : 'muscleMass']);
}

// Filter progress
function filterProgress() {
    if (currentView === 'overview') {
        displayProgressTable();
    } else {
        displayDetailedView();
    }
}

function getFilteredProgress() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const clientFilter = document.getElementById('clientFilter')?.value || 'all';
    const metricFilter = document.getElementById('metricFilter')?.value || 'all';
    const dateRangeFilter = document.getElementById('dateRangeFilter')?.value || 'all';

    let filtered = Object.values(progressData);

    // Search filter
    if (searchTerm) {
        filtered = filtered.filter(client => 
            client.name.toLowerCase().includes(searchTerm)
        );
    }

    // Client filter
    if (clientFilter !== 'all') {
        filtered = filtered.filter(client => client.clientId === clientFilter);
    }

    // Date range filter
    if (dateRangeFilter !== 'all') {
        const days = parseInt(dateRangeFilter);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        
        filtered = filtered.filter(client => {
            const lastUpdate = new Date(client.lastUpdate);
            return lastUpdate >= cutoffDate;
        });
    }

    return filtered;
}

// View client progress modal
function viewClientProgress(clientId) {
    const client = progressData[clientId];
    if (!client) return;

    currentClientId = clientId;
    const modal = document.getElementById('viewProgressModal');
    const detailsContainer = document.getElementById('clientProgressDetails');
    
    if (!modal || !detailsContainer) return;

    // Generate charts for all metrics
    const weightChart = generateChartData(client.measurements, 'weight');
    const bodyFatChart = generateChartData(client.measurements, 'body-fat');
    const bmiChart = generateChartData(client.measurements, 'bmi');
    const muscleMassChart = generateChartData(client.measurements, 'muscle-mass');

    const maxWeight = Math.max(...weightChart);
    const maxBodyFat = Math.max(...bodyFatChart);
    const maxBmi = Math.max(...bmiChart);
    const maxMuscleMass = Math.max(...muscleMassChart);

    const weightBars = weightChart.map((point, index) => {
        const height = (point / maxWeight) * 100;
        return `<div class="chart-bar" style="height: ${height}%;" title="${point} lbs"></div>`;
    }).join('');

    const bodyFatBars = bodyFatChart.map((point, index) => {
        const height = (point / maxBodyFat) * 100;
        return `<div class="chart-bar" style="height: ${height}%;" title="${point}%"></div>`;
    }).join('');

    const bmiBars = bmiChart.map((point, index) => {
        const height = (point / maxBmi) * 100;
        return `<div class="chart-bar" style="height: ${height}%;" title="${point}"></div>`;
    }).join('');

    const muscleMassBars = muscleMassChart.map((point, index) => {
        const height = (point / maxMuscleMass) * 100;
        return `<div class="chart-bar" style="height: ${height}%;" title="${point} lbs"></div>`;
    }).join('');

    detailsContainer.innerHTML = `
        <div style="margin-bottom: 2rem;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                <div class="client-avatar" style="width: 60px; height: 60px; font-size: 1.3rem;">${client.avatar}</div>
                <div>
                    <h3 style="margin: 0; font-size: 1.5rem; color: var(--text-primary);">${client.name}</h3>
                    <p style="margin: 0.25rem 0 0 0; font-size: 0.9rem; color: var(--text-secondary);">Progress Overview</p>
                </div>
            </div>

            <div class="progress-metrics" style="grid-template-columns: repeat(4, 1fr); margin-bottom: 2rem;">
                <div class="progress-metric">
                    <div class="progress-metric-label">Current Weight</div>
                    <div class="progress-metric-value">${client.currentWeight} lbs</div>
                    <div class="progress-metric-change" style="color: ${client.currentWeight < client.startWeight ? '#10B981' : '#EF4444'};">
                        ${client.currentWeight < client.startWeight ? '-' : '+'}${Math.abs(client.currentWeight - client.startWeight).toFixed(1)} lbs from start
                    </div>
                </div>
                <div class="progress-metric">
                    <div class="progress-metric-label">Body Fat %</div>
                    <div class="progress-metric-value">${client.bodyFat}%</div>
                    <div class="progress-metric-change" style="color: ${client.bodyFat < client.startBodyFat ? '#10B981' : '#EF4444'};">
                        ${client.bodyFat < client.startBodyFat ? '-' : '+'}${Math.abs(client.bodyFat - client.startBodyFat).toFixed(1)}% from start
                    </div>
                </div>
                <div class="progress-metric">
                    <div class="progress-metric-label">BMI</div>
                    <div class="progress-metric-value">${client.bmi}</div>
                    <div class="progress-metric-change" style="color: ${client.bmi < client.startBmi ? '#10B981' : '#EF4444'};">
                        ${client.bmi < client.startBmi ? '-' : '+'}${Math.abs(client.bmi - client.startBmi).toFixed(1)} from start
                    </div>
                </div>
                <div class="progress-metric">
                    <div class="progress-metric-label">Muscle Mass</div>
                    <div class="progress-metric-value">${client.muscleMass} lbs</div>
                    <div class="progress-metric-change" style="color: ${client.muscleMass > client.startMuscleMass ? '#10B981' : '#EF4444'};">
                        ${client.muscleMass > client.startMuscleMass ? '+' : '-'}${Math.abs(client.muscleMass - client.startMuscleMass).toFixed(1)} lbs from start
                    </div>
                </div>
            </div>

            <h4 style="margin-bottom: 1rem; color: var(--text-primary); font-size: 1.1rem;">Weight Progress</h4>
            <div class="client-progress-chart" style="margin-bottom: 2rem;">
                ${weightBars}
            </div>

            <h4 style="margin-bottom: 1rem; color: var(--text-primary); font-size: 1.1rem;">Body Fat % Progress</h4>
            <div class="client-progress-chart" style="margin-bottom: 2rem;">
                ${bodyFatBars}
            </div>

            <h4 style="margin-bottom: 1rem; color: var(--text-primary); font-size: 1.1rem;">BMI Progress</h4>
            <div class="client-progress-chart" style="margin-bottom: 2rem;">
                ${bmiBars}
            </div>

            <h4 style="margin-bottom: 1rem; color: var(--text-primary); font-size: 1.1rem;">Muscle Mass Progress</h4>
            <div class="client-progress-chart" style="margin-bottom: 2rem;">
                ${muscleMassBars}
            </div>

            <h4 style="margin-bottom: 1rem; color: var(--text-primary); font-size: 1.1rem;">Measurement History</h4>
            <div class="progress-table-container">
                <table class="progress-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Weight</th>
                            <th>Body Fat %</th>
                            <th>BMI</th>
                            <th>Muscle Mass</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${client.measurements.map(m => `
                            <tr>
                                <td>${new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                <td>${m.weight} lbs</td>
                                <td>${m.bodyFat}%</td>
                                <td>${m.bmi}</td>
                                <td>${m.muscleMass} lbs</td>
                            </tr>
                        `).reverse().join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeViewProgressModal() {
    const modal = document.getElementById('viewProgressModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Add comment modal
function addComment(clientId) {
    const client = progressData[clientId];
    if (!client) return;

    currentClientId = clientId;
    const modal = document.getElementById('commentModal');
    const clientInput = document.getElementById('commentClient');
    
    if (modal && clientInput) {
        clientInput.value = client.name;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCommentModal() {
    const modal = document.getElementById('commentModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        const form = document.getElementById('commentForm');
        if (form) form.reset();
    }
}

function saveComment(event) {
    event.preventDefault();
    
    const commentText = document.getElementById('commentText')?.value;
    const commentType = document.getElementById('commentType')?.value;
    
    if (!commentText || !currentClientId) return;

    const client = progressData[currentClientId];
    if (client) {
        client.comments.push({
            date: new Date().toISOString(),
            text: commentText,
            type: commentType
        });
    }

    showToast('Comment added successfully!', 'success');
    closeCommentModal();
}

// Export progress report
function exportProgressReport() {
    showToast('Exporting progress report...', 'info');
    // In a real application, this would generate and download a PDF/CSV file
    setTimeout(() => {
        showToast('Progress report exported successfully!', 'success');
    }, 1500);
}

