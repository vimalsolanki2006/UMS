document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const monthFilter = document.getElementById('month-select');
    const eventFilter = document.getElementById('event-filter');
    const applyBtn = document.getElementById('apply-filters');
    const resetBtn = document.getElementById('reset-filters');
    const emptyState = document.querySelector('.empty-state');
    
    // Apply filters function
    function applyFilters() {
        const selectedMonth = monthFilter.value;
        const selectedEventType = eventFilter.value;
        let hasVisibleEvents = false;
        
        // Filter by month
        document.querySelectorAll('.month-group').forEach(month => {
            if (selectedMonth === 'all' || month.dataset.month === selectedMonth) {
                month.style.display = 'block';
                
                // Filter events within visible months
                let monthHasEvents = false;
                month.querySelectorAll('.calendar-event').forEach(event => {
                    if (selectedEventType === 'all' || event.classList.contains(selectedEventType)) {
                        event.style.display = 'grid';
                        monthHasEvents = true;
                        hasVisibleEvents = true;
                    } else {
                        event.style.display = 'none';
                    }
                });
                
                // Hide month header if no events are visible
                if (selectedEventType !== 'all' && !monthHasEvents) {
                    month.style.display = 'none';
                }
            } else {
                month.style.display = 'none';
            }
        });
        
        // Show empty state if no events match filters
        if (hasVisibleEvents) {
            emptyState.classList.remove('active');
        } else {
            emptyState.classList.add('active');
        }
        
        // Update URL hash for bookmarking
        updateUrlHash();
    }
    
    // Update URL hash with current filters
    function updateUrlHash() {
        const month = monthFilter.value;
        const type = eventFilter.value;
        const hash = month !== 'all' || type !== 'all' ? `#month=${month}&type=${type}` : '';
        history.replaceState(null, null, window.location.pathname + hash);
    }
    
    // Read filters from URL hash on load
    function readUrlHash() {
        const hash = window.location.hash.substr(1);
        const params = new URLSearchParams(hash);
        
        if (params.has('month')) {
            monthFilter.value = params.get('month');
        }
        if (params.has('type')) {
            eventFilter.value = params.get('type');
        }
        
        applyFilters();
    }
    
    // Event listeners
    applyBtn.addEventListener('click', applyFilters);
    resetBtn.addEventListener('click', function() {
        monthFilter.value = 'all';
        eventFilter.value = 'all';
        applyFilters();
    });
    
    // Initialize
    readUrlHash();
    
    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        // Skip if user is typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        // Focus month filter on 'm' key
        if (e.key === 'm') {
            monthFilter.focus();
            e.preventDefault();
        }
        // Focus event filter on 't' key
        else if (e.key === 't') {
            eventFilter.focus();
            e.preventDefault();
        }
    });
});