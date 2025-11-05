// Sidebar hover functionality with smooth transitions (same as dashboard)
let hoverTimeout;

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
document.addEventListener('click', function(e) {
    const profile = document.querySelector('.user-profile');
    if (profile && !profile.contains(e.target)) {
        profile.classList.remove('active');
    }
});

// Notification Panel
function toggleNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    const chatPanel = document.getElementById('chatPanel');
    
    if (chatPanel) chatPanel.classList.remove('active');
    if (panel) {
        panel.classList.toggle('active');
        
        // Hide notification badge when panel is opened
        if (panel.classList.contains('active')) {
            const badge = document.querySelector('.notification-badge');
            if (badge) badge.style.display = 'none';
        }
    }
}

function closeNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    if (panel) panel.classList.remove('active');
}

// Chat Panel
function toggleChatPanel() {
    const panel = document.getElementById('chatPanel');
    const notifPanel = document.getElementById('notificationPanel');
    
    if (notifPanel) notifPanel.classList.remove('active');
    if (panel) panel.classList.toggle('active');
}

function closeChatPanel() {
    const panel = document.getElementById('chatPanel');
    if (panel) panel.classList.remove('active');
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        const messagesContainer = document.getElementById('chatMessages');
        const now = new Date();
        const timeStr = 'Just now';
        
        const messageHTML = `
            <div class="message sent">
                <div class="message-avatar">AQ</div>
                <div>
                    <div class="message-content">
                        <div class="message-text">${message}</div>
                        <div class="message-time">${timeStr}</div>
                    </div>
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        input.value = '';
        input.style.height = 'auto';
    }
}

// Initialize sidebar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSidebarHover);
} else {
    initializeSidebarHover();
}

        // Helper functions for modal body scroll management
        function lockBodyScroll() {
            document.body.classList.add('modal-open');
            // Save scroll position
            document.body.style.top = `-${window.scrollY}px`;
        }

        function unlockBodyScroll() {
            const scrollY = document.body.style.top;
            document.body.classList.remove('modal-open');
            // Restore scroll position
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
            document.body.style.top = '';
        }

        function upgradePlan(planName) {
            showUpgradeModal();
        }

        function showUpgradeModal() {
            document.getElementById('upgradeModal').classList.add('active');
            lockBodyScroll();
        }

        function closeUpgradeModal() {
            document.getElementById('upgradeModal').classList.remove('active');
            unlockBodyScroll();
        }

        function confirmUpgrade() {
            closeUpgradeModal();
            showUpgradeConfirmModal();
        }

        function showUpgradeConfirmModal() {
            document.getElementById('upgradeConfirmModal').classList.add('active');
            lockBodyScroll();
        }

        function closeUpgradeConfirmModal() {
            document.getElementById('upgradeConfirmModal').classList.remove('active');
            unlockBodyScroll();
        }

        function finalizeUpgrade() {
            closeUpgradeConfirmModal();
            showPaymentModal();
        }

        function showPaymentModal() {
            document.getElementById('paymentModal').classList.add('active');
            lockBodyScroll();
            // Initialize payment modal interactions
            initializePaymentModal();
        }

        function initializePaymentModal() {
            const agreeTerms = document.getElementById('agreeTerms');
            const completePaymentBtn = document.getElementById('completePaymentBtn');
            
            if (agreeTerms && completePaymentBtn) {
                // Check agreement checkbox state
                completePaymentBtn.disabled = !agreeTerms.checked;
                completePaymentBtn.style.opacity = agreeTerms.checked ? '1' : '0.6';
                completePaymentBtn.style.cursor = agreeTerms.checked ? 'pointer' : 'not-allowed';
                
                // Listen for checkbox changes
                agreeTerms.addEventListener('change', function() {
                    completePaymentBtn.disabled = !this.checked;
                    completePaymentBtn.style.opacity = this.checked ? '1' : '0.6';
                    completePaymentBtn.style.cursor = this.checked ? 'pointer' : 'not-allowed';
                });
            }
        }

        function closePaymentModal() {
            document.getElementById('paymentModal').classList.remove('active');
            unlockBodyScroll();
        }

        function processPayment() {
            // Simulate payment processing
            const amount = document.querySelector('.modal .modal-content').querySelector('span[style*="1.5rem"]')?.textContent || '₱0';
            
            // Update success modal receipt details
            const transactionId = 'TXN-' + new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0') + '-' + String(Math.floor(Math.random() * 1000)).padStart(3, '0');
            document.getElementById('successReceiptTransactionId').textContent = transactionId;
            document.getElementById('successReceiptAmount').textContent = amount;
            
            closePaymentModal();
            // Show success modal after a brief delay
            setTimeout(() => {
                showSuccessModal();
            }, 300);
        }

        function showSuccessModal() {
            document.getElementById('successModal').classList.add('active');
            lockBodyScroll();
        }

        function closeSuccessModal() {
            document.getElementById('successModal').classList.remove('active');
            unlockBodyScroll();
        }

        function viewMembershipDetails() {
            closeSuccessModal();
            // Scroll to membership overview section
            setTimeout(() => {
                const overviewSection = document.querySelector('.membership-overview');
                if (overviewSection) {
                    overviewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }

        function renewMembership() {
            showRenewConfirmModal();
        }

        function showRenewConfirmModal() {
            document.getElementById('renewConfirmModal').classList.add('active');
            lockBodyScroll();
        }

        function closeRenewConfirmModal() {
            document.getElementById('renewConfirmModal').classList.remove('active');
            unlockBodyScroll();
        }

        function confirmRenewal() {
            // Close confirmation modal first
            closeRenewConfirmModal();
            
            // Show success modal after a brief delay
            setTimeout(() => {
                showRenewSuccessModal();
            }, 300);
        }

        function showRenewSuccessModal() {
            document.getElementById('renewSuccessModal').classList.add('active');
            lockBodyScroll();
        }

        function closeRenewSuccessModal() {
            document.getElementById('renewSuccessModal').classList.remove('active');
            unlockBodyScroll();
        }

        function viewMembershipAfterRenew() {
            closeRenewSuccessModal();
            // Scroll to membership overview section
            setTimeout(() => {
                const overviewSection = document.querySelector('.membership-overview');
                if (overviewSection) {
                    overviewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }

        function showUpgradeOptions() {
            window.scrollTo({ top: document.querySelector('.plans-grid').offsetTop - 100, behavior: 'smooth' });
        }

        function viewReceipt(month, date, description, paymentMethod, amount) {
            showReceiptModal(month, date, description, paymentMethod, amount);
        }

        function downloadReceipt(month) {
            showReceiptModal(month);
        }

        function showReceiptModal(month, date, description, paymentMethod, amount) {
            // Receipt data based on month
            const receiptData = {
                'OCT2025': {
                    date: 'October 9, 2025',
                    period: 'October 2025',
                    description: 'PROMO Student - 3 months',
                    amount: '₱1,200',
                    paymentMethod: 'GCash',
                    transactionId: 'TXN-2025-10-001'
                },
                'SEP2025': {
                    date: 'September 9, 2025',
                    period: 'September 2025',
                    description: 'PROMO Student - 3 months',
                    amount: '₱1,200',
                    paymentMethod: 'GCash',
                    transactionId: 'TXN-2025-09-001'
                },
                'AUG2025': {
                    date: 'August 9, 2025',
                    period: 'August 2025',
                    description: 'PROMO Student - 3 months',
                    amount: '₱1,200',
                    paymentMethod: 'GCash',
                    transactionId: 'TXN-2025-08-001'
                },
                'JUL2025': {
                    date: 'July 9, 2025',
                    period: 'July 2025',
                    description: 'PROMO Student - 3 months',
                    amount: '₱1,200',
                    paymentMethod: 'GCash',
                    transactionId: 'TXN-2025-07-001'
                }
            };

            // Use provided parameters if available, otherwise use receipt data
            const receipt = (date && description && paymentMethod && amount) ? {
                date: date,
                period: month,
                description: description,
                amount: amount,
                paymentMethod: paymentMethod,
                transactionId: receiptData[month]?.transactionId || 'TXN-XXXX-XXXX'
            } : (receiptData[month] || {
                date: date || 'N/A',
                period: month,
                description: description || 'PROMO Student - 3 months',
                amount: amount || '₱1,200',
                paymentMethod: paymentMethod || 'GCash',
                transactionId: 'TXN-XXXX-XXXX'
            });

            // Update modal with receipt data
            document.getElementById('receiptPeriod').textContent = `Payment Period: ${receipt.period}`;
            document.getElementById('receiptDate').textContent = receipt.date;
            document.getElementById('receiptTransactionId').textContent = receipt.transactionId;
            document.getElementById('receiptDescription').textContent = receipt.description;
            document.getElementById('receiptPaymentMethod').textContent = receipt.paymentMethod;
            document.getElementById('receiptAmount').textContent = receipt.amount;

            // Store current month for PDF download
            document.getElementById('receiptModal').setAttribute('data-month', month);

            // Show modal
            document.getElementById('receiptModal').classList.add('active');
            lockBodyScroll();
        }

        function closeReceiptModal() {
            document.getElementById('receiptModal').classList.remove('active');
            unlockBodyScroll();
        }

        function downloadReceiptPDF() {
            const month = document.getElementById('receiptModal').getAttribute('data-month');
            // In a real app, this would generate and download a PDF
            // Close receipt modal first
            closeReceiptModal();
            
            // Show success modal after a brief delay
            setTimeout(() => {
                showDownloadSuccessModal(month);
            }, 300);
        }

        function showDownloadSuccessModal(month) {
            // Generate file name based on month
            const fileName = `receipt_${month.toLowerCase()}_xtrimfitgym.pdf`;
            document.getElementById('downloadFileName').textContent = fileName;
            
            // Show modal
            document.getElementById('downloadSuccessModal').classList.add('active');
            lockBodyScroll();
        }

        function closeDownloadSuccessModal() {
            document.getElementById('downloadSuccessModal').classList.remove('active');
            unlockBodyScroll();
        }

        // Chat input event listeners
        document.addEventListener('DOMContentLoaded', function() {
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                chatInput.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendChatMessage();
                    }
                });

                chatInput.addEventListener('input', function() {
                    this.style.height = 'auto';
                    this.style.height = this.scrollHeight + 'px';
                });
            }
        });

        // Chat input auto-resize and Enter key functionality
        document.addEventListener('DOMContentLoaded', function() {
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                chatInput.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendChatMessage();
                    }
                });

                chatInput.addEventListener('input', function() {
                    this.style.height = 'auto';
                    this.style.height = this.scrollHeight + 'px';
                });
            }
        });

        // Close panels when clicking outside
        document.addEventListener('click', function(e) {
            const chatPanel = document.getElementById('chatPanel');
            const chatIcon = document.querySelector('.chat-icon');
            const notificationPanel = document.getElementById('notificationPanel');
            const notificationIcon = document.querySelector('.notification-icon');
            const addGCashModal = document.getElementById('addGCashModal');
            const addGCashSuccessModal = document.getElementById('addGCashSuccessModal');
            
            if (chatPanel && chatPanel.classList.contains('active') && 
                !chatPanel.contains(e.target) && 
                !chatIcon.contains(e.target)) {
                closeChatPanel();
            }
            
            if (notificationPanel && notificationPanel.classList.contains('active') && 
                !notificationPanel.contains(e.target) && 
                !notificationIcon.contains(e.target)) {
                closeNotificationPanel();
            }

            // Close modals when clicking outside
            if (addGCashModal && addGCashModal.classList.contains('active') && 
                e.target === addGCashModal) {
                closeAddGCashModal();
            }

            if (addGCashSuccessModal && addGCashSuccessModal.classList.contains('active') && 
                e.target === addGCashSuccessModal) {
                closeAddGCashSuccessModal();
            }
        });

        // Close modals on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const addGCashModal = document.getElementById('addGCashModal');
                const addGCashSuccessModal = document.getElementById('addGCashSuccessModal');
                
                if (addGCashModal && addGCashModal.classList.contains('active')) {
                    closeAddGCashModal();
                }
                if (addGCashSuccessModal && addGCashSuccessModal.classList.contains('active')) {
                    closeAddGCashSuccessModal();
                }
            }
        });

        function removePaymentMethod(method) {
            if (confirm(`Are you sure you want to remove this ${method} payment method?`)) {
                alert(`${method} payment method removed successfully.`);
            }
        }

        function addPaymentMethod() {
            // Open the Add GCash modal
            const modal = document.getElementById('addGCashModal');
            if (modal) {
                modal.classList.add('active');
                lockBodyScroll();
                
                // Reset form
                const gcashNumber = document.getElementById('gcashNumber');
                const gcashName = document.getElementById('gcashName');
                if (gcashNumber) gcashNumber.value = '';
                if (gcashName) gcashName.value = '';
                
                // Focus on input
                setTimeout(() => {
                    if (gcashNumber) gcashNumber.focus();
                }, 300);
            }
        }

        function closeAddGCashModal() {
            const modal = document.getElementById('addGCashModal');
            if (modal) {
                modal.classList.remove('active');
                unlockBodyScroll();
            }
        }

        function submitAddGCash() {
            const gcashNumber = document.getElementById('gcashNumber');
            const gcashName = document.getElementById('gcashName');
            
            if (!gcashNumber || !gcashNumber.value.trim()) {
                alert('Please enter your GCash mobile number.');
                return;
            }
            
            // Validate phone number (should be 10 digits)
            const phoneNumber = gcashNumber.value.replace(/\D/g, '');
            if (phoneNumber.length !== 10) {
                alert('Please enter a valid 10-digit GCash mobile number.');
                return;
            }
            
            // Simulate adding GCash account
            const accountName = gcashName && gcashName.value.trim() ? gcashName.value.trim() : 'GCash Account';
            const fullNumber = '+63 ' + phoneNumber.match(/.{1,3}/g).join(' ');
            
            // Close add modal
            closeAddGCashModal();
            
            // Show success modal after a brief delay
            setTimeout(() => {
                openAddGCashSuccessModal();
            }, 300);
        }

        function openAddGCashSuccessModal() {
            const modal = document.getElementById('addGCashSuccessModal');
            if (modal) {
                modal.classList.add('active');
                lockBodyScroll();
            }
        }

        function closeAddGCashSuccessModal() {
            const modal = document.getElementById('addGCashSuccessModal');
            if (modal) {
                modal.classList.remove('active');
                unlockBodyScroll();
            }
        }

        function showCancelModal() {
            document.getElementById('cancelModal').classList.add('active');
            lockBodyScroll();
        }

        function closeModal() {
            document.getElementById('cancelModal').classList.remove('active');
            unlockBodyScroll();
        }

        function confirmCancel() {
            // Close the cancel confirmation modal first
            closeModal();
            
            // Show success modal after a brief delay
            setTimeout(() => {
                showCancelSuccessModal();
            }, 300);
        }

        function showCancelSuccessModal() {
            document.getElementById('cancelSuccessModal').classList.add('active');
            lockBodyScroll();
        }

        function closeCancelSuccessModal() {
            document.getElementById('cancelSuccessModal').classList.remove('active');
            unlockBodyScroll();
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const cancelModal = document.getElementById('cancelModal');
            const upgradeModal = document.getElementById('upgradeModal');
            const upgradeConfirmModal = document.getElementById('upgradeConfirmModal');
            const paymentModal = document.getElementById('paymentModal');
            const successModal = document.getElementById('successModal');
            const receiptModal = document.getElementById('receiptModal');
            const downloadSuccessModal = document.getElementById('downloadSuccessModal');
            const cancelSuccessModal = document.getElementById('cancelSuccessModal');
            const renewConfirmModal = document.getElementById('renewConfirmModal');
            const renewSuccessModal = document.getElementById('renewSuccessModal');
            if (event.target === cancelModal) {
                closeModal();
            }
            if (event.target === upgradeModal) {
                closeUpgradeModal();
            }
            if (event.target === upgradeConfirmModal) {
                closeUpgradeConfirmModal();
            }
            if (event.target === paymentModal) {
                closePaymentModal();
            }
            if (event.target === successModal) {
                closeSuccessModal();
            }
            if (event.target === receiptModal) {
                closeReceiptModal();
            }
            if (event.target === downloadSuccessModal) {
                closeDownloadSuccessModal();
            }
            if (event.target === cancelSuccessModal) {
                closeCancelSuccessModal();
            }
            if (event.target === renewConfirmModal) {
                closeRenewConfirmModal();
            }
            if (event.target === renewSuccessModal) {
                closeRenewSuccessModal();
            }
        }

        // Payment modal interactions
        let paymentModalInitialized = false;
        
        function updatePaymentMethodVisuals() {
            const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
            const allLabels = document.querySelectorAll('#paymentModal label');
            
            // Reset all payment method cards
            allLabels.forEach(label => {
                const checkIcon = label.querySelector('i.fa-check-circle');
                if (checkIcon) {
                    checkIcon.style.display = 'none';
                }
                label.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                label.style.background = 'rgba(255, 255, 255, 0.03)';
            });
            
            // Highlight selected method
            paymentMethods.forEach(method => {
                if (method.checked) {
                    const selectedLabel = method.closest('label');
                    if (selectedLabel) {
                        const checkIcon = selectedLabel.querySelector('i.fa-check-circle');
                        if (checkIcon) {
                            checkIcon.style.display = 'block';
                        }
                        selectedLabel.style.borderColor = 'rgba(0, 255, 157, 0.3)';
                        selectedLabel.style.background = 'rgba(0, 255, 157, 0.05)';
                    }
                }
            });
        }
        
        function initializePaymentModal() {
            if (paymentModalInitialized) {
                // Update visual states only
                updatePaymentMethodVisuals();
                return;
            }
            
            paymentModalInitialized = true;
            
            // Handle payment method selection
            const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
            
            paymentMethods.forEach(method => {
                method.addEventListener('change', updatePaymentMethodVisuals);
            });
            
            updatePaymentMethodVisuals();

            // Handle terms checkbox to enable/disable payment button
            const termsCheckbox = document.getElementById('agreeTerms');
            const paymentBtn = document.getElementById('completePaymentBtn');
            
            if (termsCheckbox && paymentBtn) {
                // Reset checkbox state when modal opens
                termsCheckbox.checked = false;
                paymentBtn.disabled = true;
                paymentBtn.style.opacity = '0.6';
                paymentBtn.style.cursor = 'not-allowed';
                
                // Remove existing listener if any
                const existingHandler = termsCheckbox.onTermsChange;
                if (existingHandler) {
                    termsCheckbox.removeEventListener('change', existingHandler);
                }
                
                // Add new listener
                const termsHandler = function() {
                    if (this.checked) {
                        paymentBtn.disabled = false;
                        paymentBtn.style.opacity = '1';
                        paymentBtn.style.cursor = 'pointer';
                    } else {
                        paymentBtn.disabled = true;
                        paymentBtn.style.opacity = '0.6';
                        paymentBtn.style.cursor = 'not-allowed';
                    }
                };
                
                termsCheckbox.onTermsChange = termsHandler;
                termsCheckbox.addEventListener('change', termsHandler);
            }
        }


        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.top-navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });