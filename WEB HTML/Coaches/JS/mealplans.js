// Global Variables
let currentMealPlanId = null;
let mealPlansData = {
    'mealplan-1': {
        id: 'mealplan-1',
        name: 'Weight Loss Meal Plan',
        goal: 'weight-loss',
        dailyCalories: 1800,
        proteinTarget: 140,
        carbsTarget: 180,
        fatsTarget: 60,
        description: 'Balanced meal plan designed for sustainable weight loss with adequate protein for muscle preservation',
        client: 'ashley-quicho',
        status: 'active',
        meals: [
            { type: 'breakfast', time: '07:00', calories: 520, protein: 35, carbs: 62, fats: 15, description: 'Oatmeal with berries and protein' },
            { type: 'lunch', time: '12:30', calories: 680, protein: 52, carbs: 65, fats: 18, description: 'Grilled chicken with rice and vegetables' },
            { type: 'dinner', time: '19:00', calories: 500, protein: 45, carbs: 45, fats: 22, description: 'Salmon with sweet potato and greens' },
            { type: 'snack', time: '15:00', calories: 100, protein: 8, carbs: 8, fats: 5, description: 'Greek yogurt with almonds' }
        ],
        weekProgress: 2,
        totalWeeks: 8,
        complianceRate: 85
    },
    'mealplan-2': {
        id: 'mealplan-2',
        name: 'Muscle Gain Nutrition Plan',
        goal: 'muscle-gain',
        dailyCalories: 2400,
        proteinTarget: 180,
        carbsTarget: 280,
        fatsTarget: 75,
        description: 'High-calorie meal plan optimized for muscle growth and recovery',
        client: 'john-dela-cruz',
        status: 'active',
        meals: [
            { type: 'breakfast', time: '07:00', calories: 600, protein: 40, carbs: 80, fats: 18, description: 'Protein pancakes with fruits' },
            { type: 'pre-workout', time: '10:00', calories: 200, protein: 10, carbs: 40, fats: 2, description: 'Banana and protein shake' },
            { type: 'lunch', time: '13:00', calories: 750, protein: 55, carbs: 85, fats: 20, description: 'Lean beef with rice and vegetables' },
            { type: 'post-workout', time: '16:00', calories: 400, protein: 30, carbs: 50, fats: 8, description: 'Post-workout shake with carbs' },
            { type: 'dinner', time: '19:00', calories: 450, protein: 45, carbs: 25, fats: 27, description: 'Chicken with quinoa and vegetables' }
        ],
        weekProgress: 1,
        totalWeeks: 12,
        complianceRate: 92
    },
    'mealplan-3': {
        id: 'mealplan-3',
        name: 'Cutting Phase Meal Plan',
        goal: 'cutting',
        dailyCalories: 1500,
        proteinTarget: 150,
        carbsTarget: 120,
        fatsTarget: 50,
        description: 'Calorie-restricted plan for fat loss while maintaining muscle mass',
        client: 'maria-santos',
        status: 'active',
        meals: [
            { type: 'breakfast', time: '07:00', calories: 400, protein: 35, carbs: 40, fats: 12, description: 'Egg whites with vegetables' },
            { type: 'lunch', time: '12:30', calories: 500, protein: 50, carbs: 45, fats: 15, description: 'Grilled fish with vegetables' },
            { type: 'dinner', time: '19:00', calories: 450, protein: 50, carbs: 25, fats: 18, description: 'Turkey breast with salad' },
            { type: 'snack', time: '15:00', calories: 150, protein: 15, carbs: 10, fats: 5, description: 'Protein bar' }
        ],
        weekProgress: 3,
        totalWeeks: 6,
        complianceRate: 78
    },
    'mealplan-4': {
        id: 'mealplan-4',
        name: 'Maintenance Nutrition Plan',
        goal: 'maintenance',
        dailyCalories: 2000,
        proteinTarget: 160,
        carbsTarget: 220,
        fatsTarget: 65,
        description: 'Balanced meal plan for maintaining current weight and body composition',
        client: 'robert-lim',
        status: 'inactive',
        meals: [
            { type: 'breakfast', time: '07:00', calories: 550, protein: 35, carbs: 70, fats: 16, description: 'Whole grain toast with eggs and avocado' },
            { type: 'lunch', time: '12:30', calories: 650, protein: 50, carbs: 75, fats: 20, description: 'Chicken salad with quinoa' },
            { type: 'dinner', time: '19:00', calories: 600, protein: 45, carbs: 50, fats: 24, description: 'Salmon with brown rice and vegetables' },
            { type: 'snack', time: '15:00', calories: 200, protein: 30, carbs: 25, fats: 5, description: 'Protein shake with fruit' }
        ],
        weekProgress: 12,
        totalWeeks: 12,
        complianceRate: 88
    }
};

const clients = {
    'ashley-quicho': 'Ashley Quicho',
    'john-dela-cruz': 'John Dela Cruz',
    'maria-santos': 'Maria Santos',
    'robert-lim': 'Robert Lim'
};

const mealTypeIcons = {
    'breakfast': 'fa-sun',
    'lunch': 'fa-cloud-sun',
    'dinner': 'fa-moon',
    'snack': 'fa-apple-alt',
    'pre-workout': 'fa-bolt',
    'post-workout': 'fa-dumbbell'
};

// Initialize Page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar hover functionality
    initializeSidebar();
    
    // Initialize profile dropdown
    initializeProfileDropdown();
    
    // Set default date for assignment modal
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('assignStartDate').min = tomorrow.toISOString().split('T')[0];
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
    const profile = document.getElementById('userProfileDropdown');
    if (profile) {
        profile.classList.toggle('active');
    }
}

function initializeProfileDropdown() {
    document.addEventListener('click', function(event) {
        const profile = document.getElementById('userProfileDropdown');
        if (profile && !profile.contains(event.target)) {
            profile.classList.remove('active');
        }
    });
}

// Filter Meal Plans
function filterMealPlans() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const clientFilter = document.getElementById('clientFilter').value;
    const goalFilter = document.getElementById('goalFilter').value;
    const calorieFilter = document.getElementById('calorieFilter').value;
    
    const mealPlanCards = document.querySelectorAll('.mealplan-card');
    
    mealPlanCards.forEach(card => {
        const mealPlanName = card.querySelector('h3').textContent.toLowerCase();
        const client = card.getAttribute('data-client');
        const goal = card.getAttribute('data-goal');
        const calories = card.getAttribute('data-calories');
        const mealsText = card.querySelector('.mealplan-meals-preview').textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || 
            mealPlanName.includes(searchTerm) || 
            mealsText.includes(searchTerm) ||
            clients[client]?.toLowerCase().includes(searchTerm);
        
        const matchesClient = clientFilter === 'all' || client === clientFilter;
        const matchesGoal = goalFilter === 'all' || goal === goalFilter;
        const matchesCalories = calorieFilter === 'all' || calories === calorieFilter;
        
        if (matchesSearch && matchesClient && matchesGoal && matchesCalories) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Create Meal Plan Modal
function openCreateMealPlanModal() {
    currentMealPlanId = null;
    document.getElementById('modalTitle').textContent = 'Create Meal Plan';
    document.getElementById('mealPlanForm').reset();
    
    // Reset meals table to single row
    const tbody = document.getElementById('mealsTableBody');
    tbody.innerHTML = `
        <tr>
            <td>
                <select required>
                    <option value="">Select</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                    <option value="pre-workout">Pre-Workout</option>
                    <option value="post-workout">Post-Workout</option>
                </select>
            </td>
            <td><input type="time" required></td>
            <td><input type="number" placeholder="500" min="0" required></td>
            <td><input type="number" placeholder="35" min="0" required></td>
            <td><input type="number" placeholder="62" min="0" required></td>
            <td><input type="number" placeholder="15" min="0" required></td>
            <td><input type="text" placeholder="Optional"></td>
            <td>
                <button type="button" class="btn-icon-small danger" onclick="removeMealRow(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `;
    
    document.getElementById('mealPlanModal').classList.add('active');
}

function closeMealPlanModal() {
    document.getElementById('mealPlanModal').classList.remove('active');
    currentMealPlanId = null;
}

// Edit Meal Plan
function editMealPlan(mealPlanId) {
    currentMealPlanId = mealPlanId;
    const mealPlan = mealPlansData[mealPlanId];
    
    if (!mealPlan) {
        showToast('Meal plan not found', 'error');
        return;
    }
    
    document.getElementById('modalTitle').textContent = 'Edit Meal Plan';
    document.getElementById('mealPlanName').value = mealPlan.name;
    document.getElementById('mealPlanGoal').value = mealPlan.goal;
    document.getElementById('dailyCalories').value = mealPlan.dailyCalories;
    document.getElementById('proteinTarget').value = mealPlan.proteinTarget;
    document.getElementById('carbsTarget').value = mealPlan.carbsTarget;
    document.getElementById('fatsTarget').value = mealPlan.fatsTarget;
    document.getElementById('mealPlanDescription').value = mealPlan.description || '';
    
    // Populate meals
    const tbody = document.getElementById('mealsTableBody');
    tbody.innerHTML = mealPlan.meals.map(meal => `
        <tr>
            <td>
                <select required>
                    <option value="">Select</option>
                    <option value="breakfast" ${meal.type === 'breakfast' ? 'selected' : ''}>Breakfast</option>
                    <option value="lunch" ${meal.type === 'lunch' ? 'selected' : ''}>Lunch</option>
                    <option value="dinner" ${meal.type === 'dinner' ? 'selected' : ''}>Dinner</option>
                    <option value="snack" ${meal.type === 'snack' ? 'selected' : ''}>Snack</option>
                    <option value="pre-workout" ${meal.type === 'pre-workout' ? 'selected' : ''}>Pre-Workout</option>
                    <option value="post-workout" ${meal.type === 'post-workout' ? 'selected' : ''}>Post-Workout</option>
                </select>
            </td>
            <td><input type="time" value="${meal.time}" required></td>
            <td><input type="number" value="${meal.calories}" min="0" required></td>
            <td><input type="number" value="${meal.protein}" min="0" required></td>
            <td><input type="number" value="${meal.carbs}" min="0" required></td>
            <td><input type="number" value="${meal.fats}" min="0" required></td>
            <td><input type="text" value="${meal.description || ''}" placeholder="Optional"></td>
            <td>
                <button type="button" class="btn-icon-small danger" onclick="removeMealRow(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    document.getElementById('mealPlanModal').classList.add('active');
}

// Add Meal Row
function addMealRow() {
    const tbody = document.getElementById('mealsTableBody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <select required>
                <option value="">Select</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
                <option value="pre-workout">Pre-Workout</option>
                <option value="post-workout">Post-Workout</option>
            </select>
        </td>
        <td><input type="time" required></td>
        <td><input type="number" placeholder="500" min="0" required></td>
        <td><input type="number" placeholder="35" min="0" required></td>
        <td><input type="number" placeholder="62" min="0" required></td>
        <td><input type="number" placeholder="15" min="0" required></td>
        <td><input type="text" placeholder="Optional"></td>
        <td>
            <button type="button" class="btn-icon-small danger" onclick="removeMealRow(this)">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    tbody.appendChild(row);
}

// Remove Meal Row
function removeMealRow(button) {
    const tbody = document.getElementById('mealsTableBody');
    if (tbody.children.length > 1) {
        button.closest('tr').remove();
    } else {
        showToast('At least one meal is required', 'error');
    }
}

// Save Meal Plan
function saveMealPlan(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    const meals = [];
    const rows = document.querySelectorAll('#mealsTableBody tr');
    rows.forEach(row => {
        const inputs = row.querySelectorAll('input, select');
        if (inputs[0].value.trim()) {
            meals.push({
                type: inputs[0].value.trim(),
                time: inputs[1].value.trim(),
                calories: parseInt(inputs[2].value) || 0,
                protein: parseInt(inputs[3].value) || 0,
                carbs: parseInt(inputs[4].value) || 0,
                fats: parseInt(inputs[5].value) || 0,
                description: inputs[6].value.trim() || undefined
            });
        }
    });
    
    if (meals.length === 0) {
        showToast('Please add at least one meal', 'error');
        return;
    }
    
    // Calculate total calories and macros
    const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
    const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
    const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
    const totalFats = meals.reduce((sum, meal) => sum + meal.fats, 0);
    
    // Validate against targets
    const targetCalories = parseInt(formData.get('dailyCalories'));
    const targetProtein = parseInt(formData.get('proteinTarget'));
    const targetCarbs = parseInt(formData.get('carbsTarget'));
    const targetFats = parseInt(formData.get('fatsTarget'));
    
    if (Math.abs(totalCalories - targetCalories) > 100) {
        if (!confirm(`Total calories (${totalCalories}) differs from target (${targetCalories}). Continue anyway?`)) {
            return;
        }
    }
    
    const mealPlanData = {
        name: formData.get('mealPlanName'),
        goal: formData.get('mealPlanGoal'),
        dailyCalories: targetCalories,
        proteinTarget: targetProtein,
        carbsTarget: targetCarbs,
        fatsTarget: targetFats,
        description: formData.get('mealPlanDescription'),
        meals: meals
    };
    
    if (currentMealPlanId) {
        // Update existing meal plan
        mealPlansData[currentMealPlanId] = {
            ...mealPlansData[currentMealPlanId],
            ...mealPlanData
        };
        showToast('Meal plan updated successfully', 'success');
    } else {
        // Create new meal plan
        const newId = 'mealplan-' + Date.now();
        mealPlansData[newId] = {
            id: newId,
            ...mealPlanData,
            status: 'inactive',
            weekProgress: 0,
            totalWeeks: 8,
            complianceRate: 0
        };
        showToast('Meal plan created successfully', 'success');
    }
    
    closeMealPlanModal();
    setTimeout(() => {
        location.reload();
    }, 1000);
}

// Duplicate Meal Plan
function duplicateMealPlan(mealPlanId) {
    const mealPlan = mealPlansData[mealPlanId];
    if (!mealPlan) {
        showToast('Meal plan not found', 'error');
        return;
    }
    
    const newId = 'mealplan-' + Date.now();
    mealPlansData[newId] = {
        ...mealPlan,
        id: newId,
        name: mealPlan.name + ' (Copy)',
        status: 'inactive',
        client: null
    };
    
    showToast('Meal plan duplicated successfully', 'success');
    setTimeout(() => {
        location.reload();
    }, 1000);
}

// Delete Meal Plan
let mealPlanToDelete = null;

function deleteMealPlan(mealPlanId) {
    mealPlanToDelete = mealPlanId;
    document.getElementById('deleteModal').classList.add('active');
}

function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('active');
    mealPlanToDelete = null;
}

function confirmDeleteMealPlan() {
    if (mealPlanToDelete) {
        delete mealPlansData[mealPlanToDelete];
        showToast('Meal plan deleted successfully', 'success');
        closeDeleteModal();
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
}

// Assign Meal Plan Modal
let mealPlanToAssign = null;

function assignMealPlanToClient(mealPlanId) {
    mealPlanToAssign = mealPlanId;
    document.getElementById('assignModal').classList.add('active');
}

function closeAssignModal() {
    document.getElementById('assignModal').classList.remove('active');
    document.getElementById('assignForm').reset();
    mealPlanToAssign = null;
}

function confirmAssignMealPlan(event) {
    event.preventDefault();
    
    if (!mealPlanToAssign) {
        showToast('No meal plan selected', 'error');
        return;
    }
    
    const formData = new FormData(event.target);
    const clientId = formData.get('assignClient');
    const startDate = formData.get('assignStartDate');
    const duration = formData.get('assignDuration');
    const notes = formData.get('assignNotes');
    
    // Update meal plan data
    if (mealPlansData[mealPlanToAssign]) {
        mealPlansData[mealPlanToAssign].client = clientId;
        mealPlansData[mealPlanToAssign].status = 'active';
        mealPlansData[mealPlanToAssign].startDate = startDate;
        mealPlansData[mealPlanToAssign].weekProgress = 0;
        mealPlansData[mealPlanToAssign].totalWeeks = parseInt(duration);
        mealPlansData[mealPlanToAssign].assignmentNotes = notes;
    }
    
    showToast(`Meal plan assigned to ${clients[clientId]} successfully`, 'success');
    closeAssignModal();
    setTimeout(() => {
        location.reload();
    }, 1000);
}

// View Meal Plan Details
function viewMealPlanDetails(mealPlanId) {
    const mealPlan = mealPlansData[mealPlanId];
    
    if (!mealPlan) {
        showToast('Meal plan not found', 'error');
        return;
    }
    
    const clientName = mealPlan.client ? clients[mealPlan.client] : 'Unassigned';
    const goalNames = {
        'weight-loss': 'Weight Loss',
        'muscle-gain': 'Muscle Gain',
        'maintenance': 'Maintenance',
        'cutting': 'Cutting',
        'bulking': 'Bulking'
    };
    
    const totalCalories = mealPlan.meals.reduce((sum, meal) => sum + meal.calories, 0);
    const totalProtein = mealPlan.meals.reduce((sum, meal) => sum + meal.protein, 0);
    const totalCarbs = mealPlan.meals.reduce((sum, meal) => sum + meal.carbs, 0);
    const totalFats = mealPlan.meals.reduce((sum, meal) => sum + meal.fats, 0);
    
    const content = `
        <div class="mealplan-details-view">
            <div class="detail-section">
                <h4><i class="fas fa-info-circle"></i> Meal Plan Information</h4>
                <div class="detail-grid">
                    <div class="detail-item-view">
                        <span class="label">Name:</span>
                        <span class="value">${mealPlan.name}</span>
                    </div>
                    <div class="detail-item-view">
                        <span class="label">Goal:</span>
                        <span class="value badge ${mealPlan.goal}">${goalNames[mealPlan.goal]}</span>
                    </div>
                    <div class="detail-item-view">
                        <span class="label">Daily Calories:</span>
                        <span class="value">${mealPlan.dailyCalories} cal</span>
                    </div>
                    <div class="detail-item-view">
                        <span class="label">Assigned To:</span>
                        <span class="value">${clientName}</span>
                    </div>
                </div>
                ${mealPlan.description ? `<p class="description">${mealPlan.description}</p>` : ''}
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-chart-pie"></i> Macro Targets</h4>
                <div class="mealplan-macros-summary" style="margin-top: 1rem;">
                    <div class="macro-summary-item">
                        <span class="macro-label">Protein</span>
                        <span class="macro-value">${mealPlan.proteinTarget}g</span>
                    </div>
                    <div class="macro-summary-item">
                        <span class="macro-label">Carbs</span>
                        <span class="macro-value">${mealPlan.carbsTarget}g</span>
                    </div>
                    <div class="macro-summary-item">
                        <span class="macro-label">Fats</span>
                        <span class="macro-value">${mealPlan.fatsTarget}g</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-list"></i> Meals (${mealPlan.meals.length})</h4>
                <div class="meals-list">
                    ${mealPlan.meals.map((meal, index) => `
                        <div class="meal-item">
                            <div class="meal-icon">
                                <i class="fas ${mealTypeIcons[meal.type] || 'fa-utensils'}"></i>
                            </div>
                            <div class="meal-content">
                                <h5>${meal.type.charAt(0).toUpperCase() + meal.type.slice(1).replace('-', ' ')} <span style="color: var(--text-secondary); font-size: 0.85rem; font-weight: 400;">• ${meal.time}</span></h5>
                                <div class="meal-macros-view">
                                    <span><strong>Calories:</strong> ${meal.calories} cal</span>
                                    <span><strong>Protein:</strong> ${meal.protein}g</span>
                                    <span><strong>Carbs:</strong> ${meal.carbs}g</span>
                                    <span><strong>Fats:</strong> ${meal.fats}g</span>
                                </div>
                                ${meal.description ? `<p class="meal-description-view">${meal.description}</p>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-calculator"></i> Daily Totals</h4>
                <div class="mealplan-macros-summary" style="margin-top: 1rem;">
                    <div class="macro-summary-item">
                        <span class="macro-label">Total Calories</span>
                        <span class="macro-value">${totalCalories} cal</span>
                    </div>
                    <div class="macro-summary-item">
                        <span class="macro-label">Total Protein</span>
                        <span class="macro-value">${totalProtein}g</span>
                    </div>
                    <div class="macro-summary-item">
                        <span class="macro-label">Total Carbs</span>
                        <span class="macro-value">${totalCarbs}g</span>
                    </div>
                    <div class="macro-summary-item">
                        <span class="macro-label">Total Fats</span>
                        <span class="macro-value">${totalFats}g</span>
                    </div>
                </div>
            </div>
            
            ${mealPlan.status === 'active' ? `
            <div class="detail-section">
                <h4><i class="fas fa-chart-line"></i> Progress</h4>
                <div class="progress-info-view">
                    <p>Week ${mealPlan.weekProgress} of ${mealPlan.totalWeeks} • ${mealPlan.complianceRate}% Compliance</p>
                    <div class="progress-bar-view">
                        <div class="progress-fill-view" style="width: ${(mealPlan.weekProgress / mealPlan.totalWeeks) * 100}%"></div>
                    </div>
                </div>
            </div>
            ` : ''}
        </div>
    `;
    
    document.getElementById('viewModalContent').innerHTML = content;
    document.getElementById('viewModal').classList.add('active');
}

function closeViewModal() {
    document.getElementById('viewModal').classList.remove('active');
}

// Template Library
function openTemplateLibrary() {
    showToast('Meal plan template library coming soon...', 'info');
    // Future: This will open a modal showing pre-made meal plan templates
}

// Logout Functions
function openLogoutModal() {
    document.getElementById('logoutModal').classList.add('active');
}

function closeLogoutModal() {
    document.getElementById('logoutModal').classList.remove('active');
}

function confirmLogout() {
    showToast('Logging out...', 'info');
    setTimeout(() => {
        window.location.href = '../../index.html';
    }, 1000);
}

// Toast Notifications
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    const toastId = 'toast-' + Date.now();
    toast.id = toastId;
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <i class="fas ${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => closeToast(toastId), 5000);
}

function closeToast(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }
}

// Close modals on outside click
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
    }
});

// Close modals on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

