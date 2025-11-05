// Global Variables
let currentWorkoutId = null;
let workoutsData = {
    'workout-1': {
        id: 'workout-1',
        name: 'Upper Body Strength',
        type: 'strength',
        difficulty: 'intermediate',
        duration: 60,
        scheduleDays: ['monday', 'wednesday', 'friday'],
        description: 'Focus on building upper body strength and muscle mass',
        client: 'ashley-quicho',
        status: 'active',
        exercises: [
            { name: 'Bench Press', sets: 4, reps: '8-10', rest: '90s', weight: '185 lbs', notes: 'Control bar path' },
            { name: 'Rows', sets: 4, reps: '8-10', rest: '90s', weight: '155 lbs', notes: 'Squeeze shoulder blades' },
            { name: 'Shoulder Press', sets: 3, reps: '10-12', rest: '60s', weight: '95 lbs', notes: 'Full range of motion' },
            { name: 'Tricep Dips', sets: 3, reps: '12-15', rest: '45s', notes: 'Body weight or weighted' },
            { name: 'Bicep Curls', sets: 3, reps: '12-15', rest: '45s', weight: '30 lbs', notes: 'Control the negative' }
        ],
        weekProgress: 2,
        totalWeeks: 12
    },
    'workout-2': {
        id: 'workout-2',
        name: 'HIIT Cardio Session',
        type: 'cardio',
        difficulty: 'beginner',
        duration: 45,
        scheduleDays: ['tuesday', 'thursday', 'saturday'],
        description: 'High-intensity interval training for cardiovascular fitness',
        client: 'john-dela-cruz',
        status: 'active',
        exercises: [
            { name: 'Burpees', sets: 4, reps: '15', rest: '30s', notes: 'Explosive movement' },
            { name: 'Mountain Climbers', sets: 4, reps: '20 each', rest: '30s', notes: 'Keep core tight' },
            { name: 'Jump Squats', sets: 4, reps: '12', rest: '30s', notes: 'Land softly' },
            { name: 'High Knees', sets: 4, reps: '30s', rest: '30s', notes: 'Fast tempo' },
            { name: 'Sprint Intervals', sets: 5, reps: '30s', rest: '60s', notes: 'Maximum effort' },
            { name: 'Cool Down Stretch', sets: 1, reps: '5 min', rest: '-', notes: 'Light stretching' }
        ],
        weekProgress: 1,
        totalWeeks: 8
    },
    'workout-3': {
        id: 'workout-3',
        name: 'Lower Body Power',
        type: 'strength',
        difficulty: 'advanced',
        duration: 75,
        scheduleDays: ['monday', 'thursday'],
        description: 'Advanced lower body strength and power development',
        client: 'maria-santos',
        status: 'active',
        exercises: [
            { name: 'Barbell Squats', sets: 5, reps: '5-8', rest: '120s', weight: '225 lbs', notes: 'Full depth' },
            { name: 'Romanian Deadlifts', sets: 4, reps: '8-10', rest: '90s', weight: '185 lbs', notes: 'Feel stretch' },
            { name: 'Leg Press', sets: 4, reps: '10-12', rest: '60s', weight: '350 lbs', notes: 'Control descent' },
            { name: 'Walking Lunges', sets: 3, reps: '12 each', rest: '60s', weight: '40 lbs', notes: 'Keep upright' },
            { name: 'Standing Calf Raises', sets: 4, reps: '15-20', rest: '45s', weight: '135 lbs', notes: 'Full ROM' }
        ],
        weekProgress: 3,
        totalWeeks: 10
    },
    'workout-4': {
        id: 'workout-4',
        name: 'Full Body Workout',
        type: 'full-body',
        difficulty: 'intermediate',
        duration: 90,
        scheduleDays: ['monday', 'wednesday', 'friday'],
        description: 'Complete full body strength training',
        client: 'robert-lim',
        status: 'inactive',
        exercises: [
            { name: 'Deadlifts', sets: 4, reps: '5-8', rest: '120s', weight: '275 lbs', notes: 'Keep back straight' },
            { name: 'Bench Press', sets: 4, reps: '8-10', rest: '90s', weight: '185 lbs', notes: 'Control bar' },
            { name: 'Squats', sets: 4, reps: '8-10', rest: '90s', weight: '225 lbs', notes: 'Full depth' },
            { name: 'Pull-ups', sets: 4, reps: '8-10', rest: '90s', notes: 'Full range' },
            { name: 'Overhead Press', sets: 3, reps: '10-12', rest: '60s', weight: '95 lbs', notes: 'Stable core' },
            { name: 'Rows', sets: 4, reps: '10-12', rest: '60s', weight: '155 lbs', notes: 'Squeeze blades' }
        ],
        weekProgress: 12,
        totalWeeks: 12
    }
};

const clients = {
    'ashley-quicho': 'Ashley Quicho',
    'john-dela-cruz': 'John Dela Cruz',
    'maria-santos': 'Maria Santos',
    'robert-lim': 'Robert Lim'
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

// Filter Workouts
function filterWorkouts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const clientFilter = document.getElementById('clientFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const difficultyFilter = document.getElementById('difficultyFilter').value;
    
    const workoutCards = document.querySelectorAll('.workout-card');
    
    workoutCards.forEach(card => {
        const workoutName = card.querySelector('h3').textContent.toLowerCase();
        const client = card.getAttribute('data-client');
        const type = card.getAttribute('data-type');
        const difficulty = card.getAttribute('data-difficulty');
        const exercisesText = card.querySelector('.workout-exercises-preview').textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || 
            workoutName.includes(searchTerm) || 
            exercisesText.includes(searchTerm) ||
            clients[client]?.toLowerCase().includes(searchTerm);
        
        const matchesClient = clientFilter === 'all' || client === clientFilter;
        const matchesType = typeFilter === 'all' || type === typeFilter;
        const matchesDifficulty = difficultyFilter === 'all' || difficulty === difficultyFilter;
        
        if (matchesSearch && matchesClient && matchesType && matchesDifficulty) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Create Workout Modal
function openCreateWorkoutModal() {
    currentWorkoutId = null;
    document.getElementById('modalTitle').textContent = 'Create Workout Plan';
    document.getElementById('workoutForm').reset();
    
    // Reset exercises table to single row
    const tbody = document.getElementById('exercisesTableBody');
    tbody.innerHTML = `
        <tr>
            <td><input type="text" placeholder="Exercise name" required></td>
            <td><input type="number" placeholder="3" min="1" required></td>
            <td><input type="text" placeholder="8-10" required></td>
            <td><input type="text" placeholder="60s" required></td>
            <td><input type="text" placeholder="Optional"></td>
            <td><input type="text" placeholder="Optional"></td>
            <td>
                <button type="button" class="btn-icon-small danger" onclick="removeExerciseRow(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `;
    
    document.getElementById('workoutModal').classList.add('active');
}

function closeWorkoutModal() {
    document.getElementById('workoutModal').classList.remove('active');
    currentWorkoutId = null;
}

// Edit Workout
function editWorkout(workoutId) {
    currentWorkoutId = workoutId;
    const workout = workoutsData[workoutId];
    
    if (!workout) {
        showToast('Workout not found', 'error');
        return;
    }
    
    document.getElementById('modalTitle').textContent = 'Edit Workout Plan';
    document.getElementById('workoutName').value = workout.name;
    document.getElementById('workoutType').value = workout.type;
    document.getElementById('workoutDifficulty').value = workout.difficulty;
    document.getElementById('workoutDuration').value = workout.duration;
    document.getElementById('workoutDescription').value = workout.description || '';
    
    // Set schedule days
    document.querySelectorAll('input[name="scheduleDays"]').forEach(checkbox => {
        checkbox.checked = workout.scheduleDays.includes(checkbox.value);
    });
    
    // Populate exercises
    const tbody = document.getElementById('exercisesTableBody');
    tbody.innerHTML = workout.exercises.map(ex => `
        <tr>
            <td><input type="text" value="${ex.name}" required></td>
            <td><input type="number" value="${ex.sets}" min="1" required></td>
            <td><input type="text" value="${ex.reps}" required></td>
            <td><input type="text" value="${ex.rest}" required></td>
            <td><input type="text" value="${ex.weight || ''}" placeholder="Optional"></td>
            <td><input type="text" value="${ex.notes || ''}" placeholder="Optional"></td>
            <td>
                <button type="button" class="btn-icon-small danger" onclick="removeExerciseRow(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    document.getElementById('workoutModal').classList.add('active');
}

// Add Exercise Row
function addExerciseRow() {
    const tbody = document.getElementById('exercisesTableBody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" placeholder="Exercise name" required></td>
        <td><input type="number" placeholder="3" min="1" required></td>
        <td><input type="text" placeholder="8-10" required></td>
        <td><input type="text" placeholder="60s" required></td>
        <td><input type="text" placeholder="Optional"></td>
        <td><input type="text" placeholder="Optional"></td>
        <td>
            <button type="button" class="btn-icon-small danger" onclick="removeExerciseRow(this)">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    tbody.appendChild(row);
}

// Remove Exercise Row
function removeExerciseRow(button) {
    const tbody = document.getElementById('exercisesTableBody');
    if (tbody.children.length > 1) {
        button.closest('tr').remove();
    } else {
        showToast('At least one exercise is required', 'error');
    }
}

// Save Workout
function saveWorkout(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const scheduleDays = Array.from(document.querySelectorAll('input[name="scheduleDays"]:checked')).map(cb => cb.value);
    
    const exercises = [];
    const rows = document.querySelectorAll('#exercisesTableBody tr');
    rows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        if (inputs[0].value.trim()) {
            exercises.push({
                name: inputs[0].value.trim(),
                sets: parseInt(inputs[1].value),
                reps: inputs[2].value.trim(),
                rest: inputs[3].value.trim(),
                weight: inputs[4].value.trim() || undefined,
                notes: inputs[5].value.trim() || undefined
            });
        }
    });
    
    if (exercises.length === 0) {
        showToast('Please add at least one exercise', 'error');
        return;
    }
    
    const workoutData = {
        name: formData.get('workoutName'),
        type: formData.get('workoutType'),
        difficulty: formData.get('workoutDifficulty'),
        duration: parseInt(formData.get('workoutDuration')),
        scheduleDays: scheduleDays,
        description: formData.get('workoutDescription'),
        exercises: exercises
    };
    
    if (currentWorkoutId) {
        // Update existing workout
        workoutsData[currentWorkoutId] = {
            ...workoutsData[currentWorkoutId],
            ...workoutData
        };
        showToast('Workout updated successfully', 'success');
    } else {
        // Create new workout
        const newId = 'workout-' + Date.now();
        workoutsData[newId] = {
            id: newId,
            ...workoutData,
            status: 'inactive',
            weekProgress: 0,
            totalWeeks: 12
        };
        showToast('Workout created successfully', 'success');
    }
    
    closeWorkoutModal();
    // In a real app, you would reload the workout cards here
    setTimeout(() => {
        location.reload();
    }, 1000);
}

// Duplicate Workout
function duplicateWorkout(workoutId) {
    const workout = workoutsData[workoutId];
    if (!workout) {
        showToast('Workout not found', 'error');
        return;
    }
    
    const newId = 'workout-' + Date.now();
    workoutsData[newId] = {
        ...workout,
        id: newId,
        name: workout.name + ' (Copy)',
        status: 'inactive',
        client: null
    };
    
    showToast('Workout duplicated successfully', 'success');
    setTimeout(() => {
        location.reload();
    }, 1000);
}

// Delete Workout
let workoutToDelete = null;

function deleteWorkout(workoutId) {
    workoutToDelete = workoutId;
    document.getElementById('deleteModal').classList.add('active');
}

function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('active');
    workoutToDelete = null;
}

function confirmDeleteWorkout() {
    if (workoutToDelete) {
        delete workoutsData[workoutToDelete];
        showToast('Workout deleted successfully', 'success');
        closeDeleteModal();
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
}

// Assign Workout Modal
let workoutToAssign = null;

function assignWorkoutToClient(workoutId) {
    workoutToAssign = workoutId;
    document.getElementById('assignModal').classList.add('active');
}

function closeAssignModal() {
    document.getElementById('assignModal').classList.remove('active');
    document.getElementById('assignForm').reset();
    workoutToAssign = null;
}

function confirmAssignWorkout(event) {
    event.preventDefault();
    
    if (!workoutToAssign) {
        showToast('No workout selected', 'error');
        return;
    }
    
    const formData = new FormData(event.target);
    const clientId = formData.get('assignClient');
    const startDate = formData.get('assignStartDate');
    const duration = formData.get('assignDuration');
    const notes = formData.get('assignNotes');
    
    // Update workout data
    if (workoutsData[workoutToAssign]) {
        workoutsData[workoutToAssign].client = clientId;
        workoutsData[workoutToAssign].status = 'active';
        workoutsData[workoutToAssign].startDate = startDate;
        workoutsData[workoutToAssign].weekProgress = 0;
        workoutsData[workoutToAssign].totalWeeks = parseInt(duration);
        workoutsData[workoutToAssign].assignmentNotes = notes;
    }
    
    showToast(`Workout assigned to ${clients[clientId]} successfully`, 'success');
    closeAssignModal();
    setTimeout(() => {
        location.reload();
    }, 1000);
}

// View Workout Details
function viewWorkoutDetails(workoutId) {
    const workout = workoutsData[workoutId];
    
    if (!workout) {
        showToast('Workout not found', 'error');
        return;
    }
    
    const clientName = workout.client ? clients[workout.client] : 'Unassigned';
    const scheduleDays = workout.scheduleDays.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(', ');
    
    const content = `
        <div class="workout-details-view">
            <div class="detail-section">
                <h4><i class="fas fa-info-circle"></i> Workout Information</h4>
                <div class="detail-grid">
                    <div class="detail-item-view">
                        <span class="label">Name:</span>
                        <span class="value">${workout.name}</span>
                    </div>
                    <div class="detail-item-view">
                        <span class="label">Type:</span>
                        <span class="value badge ${workout.type}">${workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}</span>
                    </div>
                    <div class="detail-item-view">
                        <span class="label">Difficulty:</span>
                        <span class="value badge ${workout.difficulty}">${workout.difficulty.charAt(0).toUpperCase() + workout.difficulty.slice(1)}</span>
                    </div>
                    <div class="detail-item-view">
                        <span class="label">Duration:</span>
                        <span class="value">${workout.duration} minutes</span>
                    </div>
                    <div class="detail-item-view">
                        <span class="label">Schedule:</span>
                        <span class="value">${scheduleDays || 'Not scheduled'}</span>
                    </div>
                    <div class="detail-item-view">
                        <span class="label">Assigned To:</span>
                        <span class="value">${clientName}</span>
                    </div>
                </div>
                ${workout.description ? `<p class="description">${workout.description}</p>` : ''}
            </div>
            
            <div class="detail-section">
                <h4><i class="fas fa-list"></i> Exercises (${workout.exercises.length})</h4>
                <div class="exercises-list">
                    ${workout.exercises.map((ex, index) => `
                        <div class="exercise-item">
                            <div class="exercise-number">${index + 1}</div>
                            <div class="exercise-content">
                                <h5>${ex.name}</h5>
                                <div class="exercise-details">
                                    <span><strong>Sets:</strong> ${ex.sets}</span>
                                    <span><strong>Reps:</strong> ${ex.reps}</span>
                                    <span><strong>Rest:</strong> ${ex.rest}</span>
                                    ${ex.weight ? `<span><strong>Weight:</strong> ${ex.weight}</span>` : ''}
                                </div>
                                ${ex.notes ? `<p class="exercise-notes">${ex.notes}</p>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            ${workout.status === 'active' ? `
            <div class="detail-section">
                <h4><i class="fas fa-chart-line"></i> Progress</h4>
                <div class="progress-info-view">
                    <p>Week ${workout.weekProgress} of ${workout.totalWeeks}</p>
                    <div class="progress-bar-view">
                        <div class="progress-fill-view" style="width: ${(workout.weekProgress / workout.totalWeeks) * 100}%"></div>
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
// Templates are pre-made workout plans that coaches can use as a starting point
// Instead of creating workouts from scratch, coaches can browse templates and customize them
// This saves time and ensures consistency across different clients
function openTemplateLibrary() {
    showToast('Workout template library coming soon...', 'info');
    // Future: This will open a modal showing:
    // - Pre-made workout templates (e.g., "Beginner Strength", "HIIT Fat Loss", "Marathon Training")
    // - Filter by type, difficulty, goals
    // - Preview template details
    // - "Use Template" button to create a workout from template
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

