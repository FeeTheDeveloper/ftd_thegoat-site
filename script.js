// Scroll reveal logic using IntersectionObserver
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    },
    { threshold: 0.15 }
);

// Observe elements for reveal effect
const revealItems = document.querySelectorAll('[data-reveal], .section');
revealItems.forEach(item => {
    item.classList.add('reveal');
    observer.observe(item);
});
