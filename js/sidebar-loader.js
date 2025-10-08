// Sidebar Loader Component
class SidebarLoader {
    constructor() {
        this.sidebarContainer = null;
        this.init();
    }

    async init() {
        // Find the sidebar container
        this.sidebarContainer = document.querySelector('.sidebar-container');
        
        // Check if we're on an article page (sidebar already exists)
        const existingSidebar = document.querySelector('.sidebar');
        
        if (this.sidebarContainer && !existingSidebar) {
            // Only load sidebar if it doesn't already exist (for main pages)
            await this.loadSidebar();
        } else if (this.sidebarContainer && existingSidebar) {
            // For article pages with existing sidebar, just initialize functionality
            this.initializeSidebarFunctionality();
        }
    }

    async loadSidebar() {
        try {
            const response = await fetch('sidebar.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const sidebarHTML = await response.text();
            
            // Insert the sidebar HTML
            this.sidebarContainer.innerHTML = sidebarHTML;
            
            // Reinitialize any sidebar-specific functionality
            this.initializeSidebarFunctionality();
            
        } catch (error) {
            console.error('Error loading sidebar:', error);
            // Fallback: show a simple error message
            this.sidebarContainer.innerHTML = '<div class="p-4 text-red-500">Error loading sidebar</div>';
        }
    }

    initializeSidebarFunctionality() {
        // Reinitialize theme switcher
        this.initializeThemeSwitcher();
        
        // Reinitialize mobile sidebar toggle
        this.initializeMobileToggle();
        
        // Reinitialize any other sidebar-specific functionality
        this.initializeColorMode();
    }

    initializeThemeSwitcher() {
        const themeLinks = document.querySelectorAll('.color-mode a');
        themeLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const mode = link.getAttribute('data-mode');
                this.setTheme(mode);
            });
        });
    }

    initializeMobileToggle() {
        const triggerSidebar = document.querySelector('.trigger-sidebar');
        const sidebar = document.querySelector('.sidebar');
        const backdrop = document.querySelector('.backdrop');
        
        if (triggerSidebar && sidebar) {
            triggerSidebar.addEventListener('click', (e) => {
                e.preventDefault();
                // Toggle sidebar visibility without slide animation
                sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
                if (backdrop) {
                    backdrop.classList.toggle('opacity-0');
                    backdrop.classList.toggle('pointer-events-none');
                }
            });
        }
        
        if (backdrop) {
            backdrop.addEventListener('click', () => {
                sidebar.style.display = 'none';
                backdrop.classList.add('opacity-0', 'pointer-events-none');
            });
        }
    }

    initializeColorMode() {
        const colorMode = document.querySelector('.color-mode');
        if (colorMode) {
            const links = colorMode.querySelectorAll('a');
            const span = colorMode.querySelector('span');
            
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const mode = link.getAttribute('data-mode');
                    this.setTheme(mode);
                    
                    // Update active state
                    links.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Update span position
                    if (span) {
                        const linkRect = link.getBoundingClientRect();
                        const colorModeRect = colorMode.getBoundingClientRect();
                        span.style.left = (linkRect.left - colorModeRect.left) + 'px';
                        span.style.width = linkRect.width + 'px';
                    }
                });
            });
        }
    }

    setTheme(mode) {
        localStorage.setItem('theme', mode);
        
        // Remove all theme classes
        document.documentElement.classList.remove('light', 'dark', 'auto');
        
        if (mode === 'light') {
            document.documentElement.classList.add('light');
        } else if (mode === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (mode === 'auto') {
            document.documentElement.classList.add('auto');
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.add('light');
            }
        }
    }
}

// Initialize sidebar loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SidebarLoader();
}); 