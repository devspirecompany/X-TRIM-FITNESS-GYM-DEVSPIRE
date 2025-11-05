        // Sidebar Hover Expand
        function initializeSidebarHover() {
            const sidebar = document.getElementById('sidebar');
            if (!sidebar) return;
            
            let hoverTimeout;
            
            sidebar.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
                sidebar.classList.add('expanded');
            });
            
            sidebar.addEventListener('mouseleave', () => {
                hoverTimeout = setTimeout(() => {
                    sidebar.classList.remove('expanded');
                }, 300);
            });
            
            sidebar.addEventListener('mousemove', () => {
                clearTimeout(hoverTimeout);
                if (!sidebar.classList.contains('expanded')) {
                    sidebar.classList.add('expanded');
                }
            });
        }

        // Filter Functionality
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                filterAchievements(filter);
            });
        });

        // Category Filter
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        function filterAchievements(filter) {
            const cards = document.querySelectorAll('.achievement-card');
            cards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (filter === 'earned' && !card.classList.contains('locked')) {
                    card.style.display = 'block';
                } else if (filter === 'locked' && card.classList.contains('locked')) {
                    card.style.display = 'block';
                } else if (filter === 'progress' && card.classList.contains('locked')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Search Functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.achievement-card');
            
            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });

        // Profile Dropdown
        function toggleProfileDropdown() {
            const profile = document.querySelector('.user-profile');
            if (profile) {
                profile.classList.toggle('active');
            }
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            const profile = document.querySelector('.user-profile');
            if (profile && !profile.contains(e.target)) {
                profile.classList.remove('active');
            }
        });

        // Chat Panel Functions
        function toggleChatPanel() {
            const chatPanel = document.getElementById('chatPanel');
            const notificationPanel = document.getElementById('notificationPanel');
            if (chatPanel) {
                chatPanel.classList.toggle('active');
                if (notificationPanel && notificationPanel.classList.contains('active')) {
                    notificationPanel.classList.remove('active');
                }
            }
        }

        function closeChatPanel() {
            const chatPanel = document.getElementById('chatPanel');
            if (chatPanel) {
                chatPanel.classList.remove('active');
            }
        }

        function sendChatMessage() {
            const chatInput = document.getElementById('chatInput');
            const chatMessages = document.getElementById('chatMessages');
            
            if (!chatInput || !chatMessages) return;
            
            const message = chatInput.value.trim();
            if (!message) return;
            
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'message sent';
            userMessage.innerHTML = `
                <div class="message-avatar">AQ</div>
                <div>
                    <div class="message-content">
                        <div class="message-text">${message}</div>
                        <div class="message-time">Just now</div>
                    </div>
                </div>
            `;
            chatMessages.appendChild(userMessage);
            
            chatInput.value = '';
            chatInput.style.height = 'auto';
            
            // Auto-resize
            chatInput.style.height = chatInput.scrollHeight + 'px';
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate coach reply
            setTimeout(() => {
                const coachReplies = [
                    "Great progress on your achievements! Keep pushing!",
                    "That's an amazing milestone! You're doing fantastic!",
                    "Your dedication is inspiring! Keep up the excellent work!",
                    "I'm proud of your consistency! You're on the right track!"
                ];
                const randomReply = coachReplies[Math.floor(Math.random() * coachReplies.length)];
                
                const coachMessage = document.createElement('div');
                coachMessage.className = 'message received';
                coachMessage.innerHTML = `
                    <div class="message-avatar">CM</div>
                    <div>
                        <div class="message-content">
                            <div class="message-sender">Coach Mike</div>
                            <div class="message-text">${randomReply}</div>
                            <div class="message-time">Just now</div>
                        </div>
                    </div>
                `;
                chatMessages.appendChild(coachMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }

        // Notification Panel Functions
        function toggleNotificationPanel() {
            const notificationPanel = document.getElementById('notificationPanel');
            const chatPanel = document.getElementById('chatPanel');
            if (notificationPanel) {
                notificationPanel.classList.toggle('active');
                if (chatPanel && chatPanel.classList.contains('active')) {
                    chatPanel.classList.remove('active');
                }
            }
        }

        function closeNotificationPanel() {
            const notificationPanel = document.getElementById('notificationPanel');
            if (notificationPanel) {
                notificationPanel.classList.remove('active');
            }
        }

        // Animate progress bars on load
        window.addEventListener('load', () => {
            const progressFills = document.querySelectorAll('.progress-fill');
            progressFills.forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0';
                setTimeout(() => {
                    fill.style.width = width;
                }, 100);
            });
        });

        // Initialize sidebar hover on DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeSidebarHover);
        } else {
            initializeSidebarHover();
        }

        // Chat input auto-resize and Enter key functionality
        document.addEventListener('DOMContentLoaded', function() {
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                // Auto-resize textarea
                chatInput.addEventListener('input', function() {
                    this.style.height = 'auto';
                    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
                });
                
                // Send on Enter (Shift+Enter for new line)
                chatInput.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendChatMessage();
                    }
                });
            }
        });