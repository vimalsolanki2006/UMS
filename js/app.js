document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const sidebar = document.getElementById('sidebar');
    const navMenuBtn = document.querySelector('.nav-menu-btn');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');
    const mainContent = document.querySelector('main');

    // Initialize sidebar state
    function initSidebar() {
        if (window.innerWidth < 768) {
            sidebar.style.transform = 'translateX(-100%)';
            sidebarOverlay.style.display = 'none';
        } else {
            sidebar.style.transform = '';
            sidebarOverlay.style.display = 'none';
        }
    }

    // Toggle sidebar visibility
    function toggleSidebar() {
        if (window.innerWidth < 768) {
            const isOpening = sidebar.style.transform === 'translateX(-100%)' || !sidebar.style.transform;
            
            if (isOpening) {
                sidebar.style.transform = 'translateX(0)';
                sidebarOverlay.style.display = 'block';
                setTimeout(() => {
                    sidebarOverlay.classList.add('show');
                    sidebar.classList.add('show');
                }, 10);
            } else {
                sidebar.style.transform = 'translateX(-100%)';
                sidebarOverlay.classList.remove('show');
                setTimeout(() => {
                    sidebarOverlay.style.display = 'none';
                    sidebar.classList.remove('show');
                }, 300);
            }
        } else {
            sidebar.classList.toggle('show');
            document.body.classList.toggle('sidebar-open');
        }
    }

    // Toggle submenu visibility
    function toggleSubMenu(button) {
        const subMenu = button.nextElementSibling;
        const isOpening = !subMenu.classList.contains('show');
        
        if (isOpening) {
            closeAllSubMenus();
        }
        
        subMenu.classList.toggle('show');
        button.classList.toggle('rotate');
    }

    // Close all submenus
    function closeAllSubMenus() {
        document.querySelectorAll('.sub-menu.show').forEach(menu => {
            menu.classList.remove('show');
        });
        document.querySelectorAll('.dropdown-btn.rotate').forEach(btn => {
            btn.classList.remove('rotate');
        });
    }

    // Set active state based on current page
    function setActiveMenu() {
        const currentPage = window.location.pathname.split('/').pop().toLowerCase() || 'admin.html';
        const menuItems = document.querySelectorAll('#sidebar a');

        
        menuItems.forEach(item => {
            const itemHref = item.getAttribute('href');
            if (itemHref) {
                const hrefPage = itemHref.split('/').pop().toLowerCase();
                
                if (hrefPage === currentPage || 
                    (currentPage === 'admin.html' && hrefPage === 'index.html')) {
                    
                    item.classList.add('active');
                    const parentLi = item.closest('li');
                    if (parentLi) {
                        parentLi.classList.add('active');
                        
                        const parentMenu = item.closest('.sub-menu');
                        if (parentMenu) {
                            parentMenu.classList.add('show');
                            const dropdownBtn = parentMenu.previousElementSibling;
                            if (dropdownBtn?.classList.contains('dropdown-btn')) {
                                dropdownBtn.classList.add('rotate');
                            }
                        }
                    }
                }
            }
        });
    }

    // Handle window resize
    function handleResize() {
        if (window.innerWidth >= 768) {
            // Desktop view
            sidebar.style.transform = '';
            sidebarOverlay.style.display = 'none';
            sidebarOverlay.classList.remove('show');
            sidebar.classList.remove('show');
            mainContent.style.marginLeft = '';
        } else {
            // Mobile view
            if (!sidebar.classList.contains('show')) {
                sidebar.style.transform = 'translateX(-100%)';
            }
            mainContent.style.marginLeft = '0';
        }
    }

    // Event Listeners
    if (navMenuBtn) {
        navMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSidebar();
        });
    }

    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSubMenu(this);
        });
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 768 && 
            sidebar.classList.contains('show') && 
            !sidebar.contains(e.target) && 
            e.target !== navMenuBtn) {
            toggleSidebar();
        }
    });

    // Close sidebar when clicking on overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                toggleSidebar();
            }
        });
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        handleResize();
    });

    // Initialize
    initSidebar();
    setActiveMenu();
    handleResize();
});