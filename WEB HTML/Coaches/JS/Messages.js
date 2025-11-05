// Global Variables
let currentConversationId = null;
let conversationsData = {};

// Clients Data (from MyClients.js)
const clientsData = {
    'ashley-quicho': {
        name: 'Ashley Quicho',
        avatar: 'AQ',
        email: 'ashley.quicho@email.com',
        status: 'online'
    },
    'john-dela-cruz': {
        name: 'John Dela Cruz',
        avatar: 'JD',
        email: 'john.delacruz@email.com',
        status: 'offline'
    },
    'maria-santos': {
        name: 'Maria Santos',
        avatar: 'MS',
        email: 'maria.santos@email.com',
        status: 'online'
    },
    'robert-lim': {
        name: 'Robert Lim',
        avatar: 'RL',
        email: 'robert.lim@email.com',
        status: 'offline'
    }
};

// Conversations Data with Messages
const initialConversations = {
    'ashley-quicho': {
        clientId: 'ashley-quicho',
        lastMessage: 'Thank you Coach! I\'m feeling stronger already. Can we schedule an extra session this week?',
        lastMessageTime: '2025-11-05T10:30:00',
        unreadCount: 0,
        messages: [
            {
                id: 'msg-1',
                sender: 'ashley-quicho',
                text: 'Hi Coach! I have a question about my workout plan. Can we schedule a quick session?',
                timestamp: '2025-11-05T08:00:00',
                read: true
            },
            {
                id: 'msg-2',
                sender: 'coach',
                text: 'Of course! I have availability tomorrow at 3 PM. Does that work for you?',
                timestamp: '2025-11-05T08:15:00',
                read: true
            },
            {
                id: 'msg-3',
                sender: 'ashley-quicho',
                text: 'That works perfectly! Thank you so much!',
                timestamp: '2025-11-05T08:20:00',
                read: true
            },
            {
                id: 'msg-4',
                sender: 'coach',
                text: 'Great! See you tomorrow. Keep up the excellent work on your form!',
                timestamp: '2025-11-05T08:25:00',
                read: true
            },
            {
                id: 'msg-5',
                sender: 'ashley-quicho',
                text: 'Thank you Coach! I\'m feeling stronger already. Can we schedule an extra session this week?',
                timestamp: '2025-11-05T10:30:00',
                read: true
            }
        ]
    },
    'john-dela-cruz': {
        clientId: 'john-dela-cruz',
        lastMessage: 'Thank you for the feedback on my progress! I\'m seeing great results.',
        lastMessageTime: '2025-11-05T09:45:00',
        unreadCount: 0,
        messages: [
            {
                id: 'msg-6',
                sender: 'coach',
                text: 'Hi John! I reviewed your progress photos from this week. Excellent work on your form improvement!',
                timestamp: '2025-11-04T14:00:00',
                read: true
            },
            {
                id: 'msg-7',
                sender: 'john-dela-cruz',
                text: 'Thank you Coach! I\'ve been focusing on the technique you showed me last session.',
                timestamp: '2025-11-04T14:30:00',
                read: true
            },
            {
                id: 'msg-8',
                sender: 'coach',
                text: 'It shows! Your squat depth has improved significantly. Keep it up!',
                timestamp: '2025-11-04T15:00:00',
                read: true
            },
            {
                id: 'msg-9',
                sender: 'john-dela-cruz',
                text: 'Thank you for the feedback on my progress! I\'m seeing great results.',
                timestamp: '2025-11-05T09:45:00',
                read: true
            }
        ]
    },
    'maria-santos': {
        clientId: 'maria-santos',
        lastMessage: 'I completed all the workouts this week! Feeling great!',
        lastMessageTime: '2025-11-05T11:00:00',
        unreadCount: 2,
        messages: [
            {
                id: 'msg-10',
                sender: 'maria-santos',
                text: 'Hi Coach! I completed all the workouts this week! Feeling great!',
                timestamp: '2025-11-05T11:00:00',
                read: false
            },
            {
                id: 'msg-11',
                sender: 'maria-santos',
                text: 'Should I continue with the same plan for next week?',
                timestamp: '2025-11-05T11:05:00',
                read: false
            }
        ]
    },
    'robert-lim': {
        clientId: 'robert-lim',
        lastMessage: 'Sounds good! I\'ll be there.',
        lastMessageTime: '2025-11-03T16:00:00',
        unreadCount: 0,
        messages: [
            {
                id: 'msg-12',
                sender: 'coach',
                text: 'Hey Robert! Just a reminder about our session tomorrow at 6 PM.',
                timestamp: '2025-11-03T15:30:00',
                read: true
            },
            {
                id: 'msg-13',
                sender: 'robert-lim',
                text: 'Sounds good! I\'ll be there.',
                timestamp: '2025-11-03T16:00:00',
                read: true
            }
        ]
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    conversationsData = { ...initialConversations };
    initializeSidebar();
    initializeProfileDropdown();
    displayConversations();
    
    // Check URL parameter for opening specific conversation
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('client');
    if (clientId && conversationsData[clientId]) {
        openConversation(clientId);
    }
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

// Display Conversations List
function displayConversations() {
    const container = document.getElementById('conversationsItems');
    if (!container) return;

    const conversations = Object.values(conversationsData).sort((a, b) => {
        return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
    });

    if (conversations.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                <i class="fas fa-inbox" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                <p>No conversations yet</p>
            </div>
        `;
        return;
    }

    container.innerHTML = conversations.map(conv => {
        const client = clientsData[conv.clientId];
        if (!client) return '';

        const lastMessageDate = new Date(conv.lastMessageTime);
        const timeStr = formatMessageTime(lastMessageDate);
        const onlineClass = client.status === 'online' ? 'online' : '';
        const activeClass = currentConversationId === conv.clientId ? 'active' : '';
        const badge = conv.unreadCount > 0 ? `<span class="conversation-badge">${conv.unreadCount > 9 ? '9+' : conv.unreadCount}</span>` : '';

        return `
            <div class="conversation-item ${activeClass}" onclick="openConversation('${conv.clientId}')">
                <div class="conversation-avatar ${onlineClass}">${client.avatar}</div>
                <div class="conversation-info">
                    <div class="conversation-header">
                        <span class="conversation-name">${client.name}</span>
                        <span class="conversation-time">${timeStr}</span>
                    </div>
                    <div class="conversation-preview">${conv.lastMessage}</div>
                </div>
                ${badge}
            </div>
        `;
    }).join('');
}

// Format message time
function formatMessageTime(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// Format message time for chat
function formatChatTime(date) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    if (date >= today) {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    } else if (date >= new Date(today - 86400000)) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
    }
}

// Open Conversation
function openConversation(clientId) {
    if (!conversationsData[clientId] || !clientsData[clientId]) return;

    currentConversationId = clientId;
    const conversation = conversationsData[clientId];
    const client = clientsData[clientId];
    
    // Mark messages as read
    conversation.messages.forEach(msg => {
        if (msg.sender !== 'coach') {
            msg.read = true;
        }
    });
    conversation.unreadCount = 0;

    // Update conversations list
    displayConversations();

    // Display chat view
    const chatView = document.getElementById('chatView');
    if (!chatView) return;

    const messagesHTML = conversation.messages.map(msg => {
        const isSent = msg.sender === 'coach';
        const sender = isSent ? 'coach' : client;
        const avatar = isSent ? 'MR' : client.avatar;
        const messageDate = new Date(msg.timestamp);
        const timeStr = formatChatTime(messageDate);

        return `
            <div class="message-wrapper ${isSent ? 'sent' : 'received'}">
                <div class="message-avatar">${avatar}</div>
                <div class="message-content">
                    <div class="message-bubble">${escapeHtml(msg.text)}</div>
                    <div class="message-time">${timeStr}</div>
                </div>
            </div>
        `;
    }).join('');

    chatView.innerHTML = `
        <div class="chat-header">
            <div class="chat-header-avatar ${client.status === 'online' ? 'online' : ''}">${client.avatar}</div>
            <div class="chat-header-info">
                <div class="chat-header-name">${client.name}</div>
                <div class="chat-header-status">${client.status === 'online' ? 'Online' : 'Offline'}</div>
            </div>
            <div class="chat-header-actions">
                <button class="chat-header-btn" onclick="viewClientProfile('${clientId}')" title="View Profile" aria-label="View Profile">
                    <i class="fas fa-user"></i>
                </button>
            </div>
        </div>
        <div class="chat-messages-area" id="chatMessagesArea">
            ${messagesHTML}
        </div>
        <div class="chat-input-area">
            <div class="chat-input-wrapper">
                <textarea class="chat-input" id="chatInput" placeholder="Type a message..." rows="1" onkeydown="handleChatInputKeydown(event)"></textarea>
                <button class="chat-send-btn" onclick="sendMessage()" id="sendBtn" title="Send message" aria-label="Send message">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;

    chatView.classList.add('active');
    scrollToBottom();

    // Auto-resize textarea
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }
}

// Send Message
function sendMessage() {
    if (!currentConversationId) return;

    const input = document.getElementById('chatInput');
    if (!input) return;

    const messageText = input.value.trim();
    if (!messageText) return;

    const conversation = conversationsData[currentConversationId];
    if (!conversation) return;

    // Create new message
    const newMessage = {
        id: 'msg-' + Date.now(),
        sender: 'coach',
        text: messageText,
        timestamp: new Date().toISOString(),
        read: true
    };

    conversation.messages.push(newMessage);
    conversation.lastMessage = messageText;
    conversation.lastMessageTime = newMessage.timestamp;

    // Update UI
    const messagesArea = document.getElementById('chatMessagesArea');
    if (messagesArea) {
        const messageDate = new Date(newMessage.timestamp);
        const timeStr = formatChatTime(messageDate);
        
        const messageHTML = `
            <div class="message-wrapper sent">
                <div class="message-avatar">MR</div>
                <div class="message-content">
                    <div class="message-bubble">${escapeHtml(messageText)}</div>
                    <div class="message-time">${timeStr}</div>
                </div>
            </div>
        `;
        
        messagesArea.insertAdjacentHTML('beforeend', messageHTML);
        scrollToBottom();
    }

    // Clear input
    input.value = '';
    input.style.height = 'auto';

    // Update conversations list
    displayConversations();

    // Simulate client reply after 2-5 seconds (for demo)
    setTimeout(() => {
        simulateClientReply(currentConversationId);
    }, Math.random() * 3000 + 2000);
}

// Simulate client reply (for demo purposes)
function simulateClientReply(clientId) {
    const conversation = conversationsData[clientId];
    if (!conversation || currentConversationId !== clientId) return;

    const replies = [
        'Thank you Coach!',
        'Sounds good!',
        'I\'ll work on that.',
        'Got it, thanks!',
        'I\'ll keep that in mind.',
        'Perfect! See you soon.',
        'I appreciate the feedback!'
    ];

    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    
    const newMessage = {
        id: 'msg-' + Date.now(),
        sender: clientId,
        text: randomReply,
        timestamp: new Date().toISOString(),
        read: false
    };

    conversation.messages.push(newMessage);
    conversation.lastMessage = randomReply;
    conversation.lastMessageTime = newMessage.timestamp;
    conversation.unreadCount++;

    // Update UI if conversation is open
    if (currentConversationId === clientId) {
        const messagesArea = document.getElementById('chatMessagesArea');
        if (messagesArea) {
            const client = clientsData[clientId];
            const messageDate = new Date(newMessage.timestamp);
            const timeStr = formatChatTime(messageDate);
            
            const messageHTML = `
                <div class="message-wrapper received">
                    <div class="message-avatar">${client.avatar}</div>
                    <div class="message-content">
                        <div class="message-bubble">${escapeHtml(randomReply)}</div>
                        <div class="message-time">${timeStr}</div>
                    </div>
                </div>
            `;
            
            messagesArea.insertAdjacentHTML('beforeend', messageHTML);
            scrollToBottom();
        }
        conversation.unreadCount = 0;
        conversation.messages.forEach(msg => msg.read = true);
    }

    // Update conversations list
    displayConversations();
}

// Handle chat input keydown
function handleChatInputKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// Scroll to bottom of chat
function scrollToBottom() {
    const messagesArea = document.getElementById('chatMessagesArea');
    if (messagesArea) {
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }
}

// Search Conversations
function searchConversations() {
    const searchTerm = document.getElementById('conversationsSearch')?.value.toLowerCase() || '';
    const items = document.querySelectorAll('.conversation-item');
    
    items.forEach(item => {
        const name = item.querySelector('.conversation-name')?.textContent.toLowerCase() || '';
        const preview = item.querySelector('.conversation-preview')?.textContent.toLowerCase() || '';
        
        if (name.includes(searchTerm) || preview.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// New Message Modal
function showNewMessageModal() {
    const modal = document.getElementById('newMessageModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeNewMessageModal() {
    const modal = document.getElementById('newMessageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        const select = document.getElementById('newMessageClient');
        if (select) select.value = '';
    }
}

function startNewConversation() {
    const clientId = document.getElementById('newMessageClient')?.value;
    if (!clientId) return;

    // Create new conversation if it doesn't exist
    if (!conversationsData[clientId]) {
        const client = clientsData[clientId];
        if (!client) return;

        conversationsData[clientId] = {
            clientId: clientId,
            lastMessage: '',
            lastMessageTime: new Date().toISOString(),
            unreadCount: 0,
            messages: []
        };
    }

    closeNewMessageModal();
    openConversation(clientId);
    
    // Focus on input
    setTimeout(() => {
        const input = document.getElementById('chatInput');
        if (input) input.focus();
    }, 100);
}

// View Client Profile
function viewClientProfile(clientId) {
    window.location.href = `../HTML/MyClients.html?client=${encodeURIComponent(clientId)}`;
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Notification Panel
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
    showToast('Logging out...', 'info');
    setTimeout(() => {
        window.location.href = '../../index.html';
    }, 1000);
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
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        if (event.target === modal) {
            if (modal.id === 'logoutModal') {
                closeLogoutModal();
            } else if (modal.id === 'newMessageModal') {
                closeNewMessageModal();
            }
        }
    });
});

// Close modals on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLogoutModal();
        closeNewMessageModal();
        closeNotificationPanel();
    }
});

