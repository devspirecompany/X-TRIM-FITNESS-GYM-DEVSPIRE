// coaches.js - placeholder interactivity for My Coach page
document.addEventListener('DOMContentLoaded', function () {
    // Message Coach
    const messageBtn = document.getElementById('messageCoachBtn');
    if (messageBtn) {
        messageBtn.addEventListener('click', function () {
            // Placeholder: open chat panel or navigate to chat screen
            console.log('Message Coach clicked');
            // simple visual feedback
            messageBtn.disabled = true;
            messageBtn.innerHTML = '<i class="fas fa-check"></i> Opened';
            setTimeout(() => {
                messageBtn.disabled = false;
                messageBtn.innerHTML = '<i class="fas fa-comment-dots"></i> Message Coach';
            }, 900);
        });
    }

    // Acknowledge/update items
    document.querySelectorAll('.ack-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.item-card');
            if (!card) return;
            const was = btn.classList.contains('acknowledged');
            btn.classList.toggle('acknowledged');
            if (!was) {
                // mark as read/acknowledged
                console.log('Acknowledged:', card.dataset.id);
                btn.title = 'Acknowledged';
            } else {
                console.log('Unacknowledged:', card.dataset.id);
                btn.title = 'Acknowledge';
            }
        });
    });

    // Resource download and remove
    document.querySelectorAll('.res-download').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const file = btn.dataset.file || 'file';
            console.log('Download requested for', file);
            // Fake download: create an anchor (would normally point to actual URL)
            const a = document.createElement('a');
            a.href = '#';
            a.download = file;
            document.body.appendChild(a);
            a.click();
            a.remove();
        });
    });

    document.querySelectorAll('.res-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.resource-card');
            if (!card) return;
            const id = card.dataset.id;
            // For demo, hide the card and log action
            card.classList.add('hidden');
            console.log('Removed resource', id);
        });
    });

    // Book 1:1 Session
    const bookBtn = document.getElementById('bookSessionBtn');
    if (bookBtn) {
        bookBtn.addEventListener('click', () => {
            console.log('Book 1:1 Session clicked');
            bookBtn.disabled = true;
            bookBtn.innerHTML = '<i class="fas fa-clock"></i> Booking...';
            // simulate booking result
            setTimeout(() => {
                bookBtn.innerHTML = '<i class="fas fa-calendar-check"></i> Booked';
                bookBtn.classList.add('booked');
            }, 900);
        });
    }
});
