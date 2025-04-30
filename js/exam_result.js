document.addEventListener('DOMContentLoaded', function() {
    // Toggle between result types (Internal/External)
    const resultTypeBtns = document.querySelectorAll('.result-type-btn');
    const resultSections = document.querySelectorAll('.result-section');
    
    resultTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and sections
            resultTypeBtns.forEach(b => b.classList.remove('active'));
            resultSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding section
            const resultType = this.getAttribute('data-result-type');
            document.getElementById(`${resultType}-results`).classList.add('active');
        });
    });
    
    // Toggle between semesters in internal assessment
    const semesterBtns = document.querySelectorAll('.semester-btn');
    const semesterContents = document.querySelectorAll('.semester-content');
    
    semesterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            semesterBtns.forEach(b => b.classList.remove('active'));
            semesterContents.forEach(content => content.style.display = 'none');
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const semester = this.getAttribute('data-semester');
            document.getElementById(`semester${semester}-content`).style.display = 'block';
        });
    });
    
    // Initialize the page
    function initPage() {
        // Show external results by default
        document.querySelector('.result-type-btn[data-result-type="external"]').click();
        
        // Initialize with semester 1 shown in internal assessment
        document.querySelector('.semester-btn[data-semester="1"]').click();
    }
    
    // Initialize the page
    initPage();
});

// Reuse sidebar toggle functions from app.js
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