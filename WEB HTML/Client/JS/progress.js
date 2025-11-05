// Sidebar hover functionality with smooth transitions (same as dashboard)
let hoverTimeout;

// Initialize sidebar - runs immediately if script is in head with defer
function initializeSidebarHover() {
    const sidebar = document.getElementById('sidebar');
    
    if (sidebar) {
        // Add hover effect
        sidebar.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            this.classList.add('expanded');
        });
        
        // Remove hover effect with slight delay to prevent flickering
        sidebar.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                this.classList.remove('expanded');
            }, 100);
        });

        // Keep expanded if mouse moves back to sidebar quickly
        sidebar.addEventListener('mousemove', function() {
            clearTimeout(hoverTimeout);
            this.classList.add('expanded');
        });
    }
}

// Profile dropdown
function toggleProfileDropdown() {
    const profile = document.querySelector('.user-profile');
    if (profile) {
        profile.classList.toggle('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const profile = document.querySelector('.user-profile');
    if (profile && !profile.contains(event.target)) {
        profile.classList.remove('active');
    }
});

// Notification Panel
function toggleNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    if (panel) {
        panel.classList.toggle('active');
    }
}

function closeNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    if (panel) {
        panel.classList.remove('active');
    }
}

// Chat Panel
function toggleChatPanel() {
    const panel = document.getElementById('chatPanel');
    if (panel) {
        panel.classList.toggle('active');
    }
}

function closeChatPanel() {
    const panel = document.getElementById('chatPanel');
    if (panel) {
        panel.classList.remove('active');
    }
}

// Send chat message
function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message sent';
    messageDiv.innerHTML = `
        <div class="message-avatar">AQ</div>
        <div>
            <div class="message-content">
                <div class="message-text">${message}</div>
                <div class="message-time">Just now</div>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatInput.value = '';
    chatInput.style.height = 'auto';
    
    // Auto-resize textarea
    chatInput.style.height = chatInput.scrollHeight + 'px';
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate coach reply after 2 seconds
    setTimeout(() => {
        const replies = [
            "Great progress! Keep up the excellent work!",
            "Your dedication is showing amazing results!",
            "I'm proud of your consistency!",
            "You're on the right track!",
            "Keep pushing, you're doing fantastic!"
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        const replyDiv = document.createElement('div');
        replyDiv.className = 'message received';
        replyDiv.innerHTML = `
            <div class="message-avatar">CM</div>
            <div>
                <div class="message-content">
                    <div class="message-sender">Coach Mike</div>
                    <div class="message-text">${randomReply}</div>
                    <div class="message-time">Just now</div>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(replyDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 2000);
}

// Camera Modal Functions
let stream = null;
let capturedPhotoData = null;

function openCameraModal() {
    const modal = document.getElementById('cameraModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        resetCameraModal();
    }
}

function closeCameraModal() {
    const modal = document.getElementById('cameraModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        stopCamera();
        resetCameraModal();
    }
}

function resetCameraModal() {
    const video = document.getElementById('videoStream');
    const canvas = document.getElementById('photoCanvas');
    const placeholder = document.getElementById('cameraPlaceholder');
    const preview = document.getElementById('capturedPhotoPreview');
    const startBtn = document.getElementById('startCameraBtn');
    const captureBtn = document.getElementById('captureBtn');
    const saveBtn = document.getElementById('savePhotoBtn');
    
    if (video) video.style.display = 'none';
    if (canvas) canvas.style.display = 'none';
    if (placeholder) placeholder.style.display = 'block';
    if (preview) preview.style.display = 'none';
    if (startBtn) startBtn.style.display = 'inline-flex';
    if (captureBtn) captureBtn.style.display = 'none';
    if (saveBtn) saveBtn.style.display = 'none';
    
    capturedPhotoData = null;
}

function startCamera() {
    const video = document.getElementById('videoStream');
    const placeholder = document.getElementById('cameraPlaceholder');
    const startBtn = document.getElementById('startCameraBtn');
    const captureBtn = document.getElementById('captureBtn');
    
    if (!video) return;
    
    navigator.mediaDevices.getUserMedia({ 
        video: { 
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
        } 
    })
    .then(function(mediaStream) {
        stream = mediaStream;
        video.srcObject = stream;
        video.style.display = 'block';
        if (placeholder) placeholder.style.display = 'none';
        if (startBtn) startBtn.style.display = 'none';
        if (captureBtn) captureBtn.style.display = 'inline-flex';
    })
    .catch(function(err) {
        console.error('Error accessing camera:', err);
        alert('Unable to access camera. Please ensure you have granted camera permissions and try again.');
    });
}

function capturePhoto() {
    const video = document.getElementById('videoStream');
    const canvas = document.getElementById('photoCanvas');
    const preview = document.getElementById('capturedPhotoPreview');
    const image = document.getElementById('capturedImage');
    const captureBtn = document.getElementById('captureBtn');
    const saveBtn = document.getElementById('savePhotoBtn');
    
    if (!video || !canvas || !image) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    capturedPhotoData = canvas.toDataURL('image/png');
    image.src = capturedPhotoData;
    
    video.style.display = 'none';
    if (preview) preview.style.display = 'block';
    if (captureBtn) captureBtn.style.display = 'none';
    if (saveBtn) saveBtn.style.display = 'inline-flex';
    
    stopCamera();
}

function retakePhoto() {
    resetCameraModal();
    startCamera();
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
}

function saveProgressPhoto() {
    if (!capturedPhotoData) {
        alert('Please capture a photo first.');
        return;
    }
    
    // In a real application, you would send the photo data to a server
    // For demonstration, we'll just show a success message
    console.log('Photo captured:', capturedPhotoData.substring(0, 50) + '...');
    
    closeCameraModal();
    
    setTimeout(() => {
        openPhotoSuccessModal();
    }, 300);
}

function openPhotoSuccessModal() {
    const modal = document.getElementById('photoSuccessModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePhotoSuccessModal() {
    const modal = document.getElementById('photoSuccessModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Add Measurement Modal
function openAddMeasurementModal() {
    const modal = document.getElementById('addMeasurementModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Set today's date as default
        const dateInput = document.getElementById('measurementDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.value = today;
        }
        
        // Reset form
        const form = document.getElementById('measurementForm');
        if (form) {
            form.reset();
            if (dateInput) dateInput.value = today;
        }
    }
}

function closeAddMeasurementModal() {
    const modal = document.getElementById('addMeasurementModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function saveMeasurement(event) {
    event.preventDefault();
    
    const date = document.getElementById('measurementDate').value;
    const weight = document.getElementById('measurementWeight').value;
    const bodyFat = document.getElementById('measurementBodyFat').value;
    const muscleMass = document.getElementById('measurementMuscleMass').value;
    const notes = document.getElementById('measurementNotes').value;
    
    // Calculate BMI (assuming average height of 5'10" = 70 inches)
    // BMI = (weight in lbs / (height in inches)^2) * 703
    // For demo purposes, using a standard calculation
    const heightInches = 70; // This would come from user profile
    const bmi = ((parseFloat(weight) / (heightInches * heightInches)) * 703).toFixed(1);
    
    const measurementData = {
        date: date,
        weight: weight,
        bmi: bmi,
        bodyFat: bodyFat,
        muscleMass: muscleMass || null,
        notes: notes || null
    };
    
    console.log('Measurement saved:', measurementData);
    
    closeAddMeasurementModal();
    
    // Show success modal with details
    setTimeout(() => {
        openMeasurementSuccessModal(measurementData);
    }, 300);
}

function openMeasurementSuccessModal(data) {
    const modal = document.getElementById('measurementSuccessModal');
    const detailsDiv = document.getElementById('measurementSuccessDetails');
    
    if (modal && detailsDiv) {
        // Format date
        const dateObj = new Date(data.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        // Build details HTML
        let detailsHTML = `
            <div style="margin-bottom: 0.8rem;"><strong>Date:</strong> ${formattedDate}</div>
            <div style="margin-bottom: 0.8rem;"><strong>Weight:</strong> ${data.weight} lbs</div>
            <div style="margin-bottom: 0.8rem;"><strong>BMI:</strong> ${data.bmi}</div>
            <div style="margin-bottom: 0.8rem;"><strong>Body Fat:</strong> ${data.bodyFat}%</div>
        `;
        
        if (data.muscleMass) {
            detailsHTML += `<div style="margin-bottom: 0.8rem;"><strong>Muscle Mass:</strong> ${data.muscleMass} lbs</div>`;
        }
        
        if (data.notes) {
            detailsHTML += `<div><strong>Notes:</strong> ${data.notes}</div>`;
        }
        
        detailsDiv.innerHTML = detailsHTML;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMeasurementSuccessModal() {
    const modal = document.getElementById('measurementSuccessModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Save Description Function
function saveDescription(weekId, weekName) {
    const textarea = document.getElementById(weekId + 'Description');
    if (!textarea) return;
    
    const description = textarea.value.trim();
    
    if (!description) {
        alert('Please enter a description before saving.');
        return;
    }
    
    // In a real application, you would send this to a server
    const descriptionData = {
        weekId: weekId,
        weekName: weekName,
        description: description,
        date: new Date().toISOString()
    };
    
    console.log('Description saved:', descriptionData);
    
    // Show success modal
    setTimeout(() => {
        openDescriptionSuccessModal();
    }, 100);
}

function openDescriptionSuccessModal() {
    const modal = document.getElementById('descriptionSuccessModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeDescriptionSuccessModal() {
    const modal = document.getElementById('descriptionSuccessModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// View Photo Modal
function viewPhoto(month, date) {
    const modal = document.getElementById('viewPhotoModal');
    const image = document.getElementById('viewPhotoImage');
    const dateText = document.getElementById('viewPhotoDate');
    
    if (modal && image && dateText) {
        // In a real app, this would load the actual photo
        // For demo, we'll use a placeholder
        image.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="800"%3E%3Crect width="600" height="800" fill="%2313161f"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="24" fill="%23F9C513" text-anchor="middle" dominant-baseline="middle"%3E' + month + ' Progress Photo%3C/text%3E%3C/svg%3E';
        dateText.textContent = date;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeViewPhotoModal() {
    const modal = document.getElementById('viewPhotoModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Stop camera if camera modal is closed
            if (modal.id === 'cameraModal') {
                stopCamera();
                resetCameraModal();
            }
        }
    });
});

// Keyboard shortcuts - ESC to close modals
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Stop camera if camera modal is closed
            if (activeModal.id === 'cameraModal') {
                stopCamera();
                resetCameraModal();
            }
        }
    }
});

// All Feedback Modal Functions
function openAllFeedbackModal() {
    const modal = document.getElementById('allFeedbackModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeAllFeedbackModal() {
    const modal = document.getElementById('allFeedbackModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Initialize sidebar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSidebarHover);
} else {
    // DOM is already ready
    initializeSidebarHover();
}

// Chat input auto-resize and Enter key functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    
    if (chatInput) {
        // Auto-resize textarea
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
        
        // Send message on Enter (but allow Shift+Enter for new line)
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendChatMessage();
            }
        });
    }
});

// Simulate chart data (in real app, this would use a charting library like Chart.js)
console.log('Progress tracking initialized');
console.log('Weight data: 190, 189, 187, 185, 182, 178 lbs over 6 months');
console.log('BMI data: 26.3, 25.7, 25.4, 25.1, 24.7, 24.2 over 6 months');