// Intersection Observer for timeline animations
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Ensure dots and images are properly layered
            const dot = entry.target.querySelector('.timeline-dot');
            const img = dot.querySelector('img');
            
            // Force a repaint to ensure proper z-index stacking
            dot.style.transform = dot.style.transform;
            img.style.transform = img.style.transform;
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
});

// Observe all timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
}); 