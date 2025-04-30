document.addEventListener('DOMContentLoaded', function() {
    // Toggle between exam types (Internal/External)
    const examTypeBtns = document.querySelectorAll('.exam-type-btn');
    const examSections = document.querySelectorAll('.exam-section');
    
    examTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and sections
            examTypeBtns.forEach(b => b.classList.remove('active'));
            examSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding section
            const examType = this.getAttribute('data-exam-type');
            document.getElementById(`${examType}-exams`).classList.add('active');
            
            // Reset sessional selector when switching exam types
            if (examType === 'internal') {
                resetSessionalSelector();
            }
        });
    });
    
    // Sessional exam selector functionality
    const sessionalSelect = document.getElementById('sessional-select');
    const sessionalContents = document.querySelectorAll('.sessional-content');
    
    sessionalSelect.addEventListener('change', function() {
        // Hide all sessional contents
        sessionalContents.forEach(content => {
            content.style.display = 'none';
        });
        
        // Show selected sessional content
        const selectedContent = document.getElementById(`${this.value}-content`);
        if (selectedContent) {
            selectedContent.style.display = 'block';
        }
        
        // Update date range based on selection
        updateDateRange(this.value);
    });
    
    function updateDateRange(sessional) {
        const dateRange = document.querySelector('#internal-exams .exam-date-range');
        
        // Date ranges for different sessional exams
        const ranges = {
            'sessional1': '(15-11-2024 to 20-11-2024)',
            'sessional2': '(24-03-2025 to 29-03-2025)',
            'sessional3': '(15-05-2025 to 20-05-2025)'
        };
        
        if (ranges[sessional]) {
            dateRange.textContent = ranges[sessional];
        }
    }
    
    function resetSessionalSelector() {
        // Reset to Sessional 3
        sessionalSelect.value = 'sessional3';
        
        // Hide all sessional contents
        sessionalContents.forEach(content => {
            content.style.display = 'none';
        });
        
        // Show Sessional 3 content
        document.getElementById('sessional3-content').style.display = 'block';
        updateDateRange('sessional3');
    }
    
    // Initialize the page
    function initPage() {
        // Show internal exams by default
        document.querySelector('.exam-type-btn[data-exam-type="internal"]').click();
        
        // Initialize with Sessional 3 shown and selected
        resetSessionalSelector();
    }
    
    // Initialize the page
    initPage();
});

// Sidebar toggle functions
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');
    
    // Toggle body scroll when sidebar is open
    document.body.style.overflow = sidebar.classList.contains('show') ? 'hidden' : '';
}

function toggleSubMenu(button) {
    const subMenu = button.nextElementSibling;
    subMenu.classList.toggle('show');
    button.classList.toggle('rotate');
}