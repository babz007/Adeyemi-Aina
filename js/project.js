// Intersection Observer for project card animations
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
});

// Observe all project cards
document.querySelectorAll('.project-card').forEach(card => {
    projectObserver.observe(card);
});

document.addEventListener('DOMContentLoaded', function() {
    // Get all project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    // Preload images
    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach(img => {
        if (img.src) {
            const tempImage = new Image();
            tempImage.src = img.src;
            tempImage.onload = function() {
                img.classList.add('loaded');
            };
        }
    });
    
    // Add hover effect for project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}); 