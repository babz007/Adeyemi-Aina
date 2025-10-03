/**
 * Page Transition Animation System
 * Provides smooth loading animations for all pages
 */

class PageTransitions {
    constructor() {
        this.loaderElement = null;
        this.isLoading = false;
        this.loadingDuration = 2000; // Minimum loading time
        this.init();
    }

    init() {
        this.createLoader();
        this.setupEventListeners();
        this.startPageLoad();
    }

    createLoader() {
        // Create loader HTML structure
        const loaderHTML = `
            <div id="page-loader">
                <div class="loader-spinner"></div>
                <div class="loader-text">Loading...</div>
                <div class="loader-subtext">Preparing your experience</div>
                <div class="loader-progress">
                    <div class="loader-progress-bar"></div>
                </div>
            </div>
        `;

        // Insert loader at the beginning of body
        if (document.body) {
            document.body.insertAdjacentHTML('afterbegin', loaderHTML);
            this.loaderElement = document.getElementById('page-loader');
        }
    }

    setupEventListeners() {
        // Listen for page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.isLoading) {
                this.refreshLoader();
            }
        });

        // Intercept link clicks for smooth transitions
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && !link.href.includes('#') && !link.target) {
                const href = link.href;
                const currentDomain = window.location.origin;
                
                // Only apply transitions to same-domain links
                if (href.startsWith(currentDomain) || href.startsWith('/')) {
                    e.preventDefault();
                    this.navigateToPage(href);
                }
            }
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if (!this.isLoading) {
                this.startPageTransition();
            }
        });

        // Listen for page load completion
        window.addEventListener('load', () => {
            this.hideLoader();
        });
    }

    startPageLoad() {
        if (document.readyState === 'loading') {
            this.showLoader();
        } else {
            this.hideLoader();
        }
    }

    showLoader() {
        if (!this.isLoading && this.loaderElement) {
            this.isLoading = true;
            this.loaderElement.classList.add('loading');
            
            // Add fade-out class to page content
            const content = document.querySelector('body');
            if (content) {
                content.classList.add('page-transition-out');
            }
        }
    }

    hideLoader() {
        if (this.isLoading && this.loaderElement) {
            setTimeout(() => {
                this.isLoading = false;
                this.loaderElement.classList.remove('loading');
                this.loaderElement.classList.add('fade-out');
                
                // Remove fade-out class from page content
                const content = document.querySelector('body');
                if (content) {
                    content.classList.remove('page-transition-out');
                    content.classList.add('page-transition-in');
                }

                // Animate content elements
                this.animateElements();
                
                // Clean up after animation
                setTimeout(() => {
                    if (this.loaderElement) {
                        this.loaderElement.remove();
                    }
                }, 400);
            }, this.loadingDuration);
        }
    }

    animateElements() {
        // Add fade-in animation to main content areas
        const elementsToAnimate = [
            'header',
            '.prose',
            '.sidebar-container',
            '.max-w-max-w-2',
            '.btn'
        ];

        elementsToAnimate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((el, index) => {
                el.classList.add('fade-in-element');
                setTimeout(() => {
                    el.classList.add('visible');
                }, index * 100);
            });
        });

        // Animate images
        const images = document.querySelectorAll('img');
        images.forEach((img, index) => {
            img.classList.add('fade-in-element');
            setTimeout(() => {
                img.classList.add('visible');
            }, (index + elementsToAnimate.length) * 100);
        });
    }

    refreshLoader() {
        // Refresh loader animation when page becomes visible
        if (this.loaderElement && this.isLoading) {
            const spinner = this.loaderElement.querySelector('.loader-spinner');
            if (spinner) {
                spinner.style.animation = 'none';
                setTimeout(() => {
                    spinner.style.animation = 'spin 1.2s linear infinite';
                }, 10);
            }
        }
    }

    navigateToPage(url) {
        this.showLoader();
        
        setTimeout(() => {
            if (url.startsWith('/')) {
                window.location.href = window.location.origin + url;
            } else {
                window.location.href = url;
            }
        }, 300);
    }

    startPageTransition() {
        this.showLoader();
        setTimeout(() => {
            this.hideLoader();
        }, this.loadingDuration);
    }
}

// Utility functions for manual control
const PageTransitionUtils = {
    // Manually trigger page transition
    triggerTransition: () => {
        if (window.pageTransitions) {
            window.pageTransitions.hideLoader();
        }
    },

    // Show loading for external actions
    showLoading: (text = 'Loading...') => {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.style.display = 'flex';
            loader.classList.add('loading');
            const textEl = loader.querySelector('.loader-text');
            if (textEl) {
                textEl.textContent = text;
            }
        }
    },

    // Hide loading manually
    hideLoading: () => {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.classList.remove('loading');
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 400);
        }
    },

    // Animate specific elements
    animateElement: (element, delay = 0) => {
        if (element) {
            element.classList.add('fade-in-element');
            setTimeout(() => {
                element.classList.add('visible');
            }, delay);
        }
    },

    // Animate multiple elements with stagger
    animateElements: (selector, stagger = 100) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            PageTransitionUtils.animateElement(el, index * stagger);
        });
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.pageTransitions = new PageTransitions();
    window.pageTransitionUtils = PageTransitionUtils;
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PageTransitions, PageTransitionUtils };
}
