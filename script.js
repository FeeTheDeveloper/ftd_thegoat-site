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

const header = document.querySelector('.site-header');
const updateHeaderTransparency = () => {
    if (!header) {
        return;
    }

    const isAtTop = window.scrollY < 24;
    header.classList.toggle('is-transparent', isAtTop);
    header.classList.toggle('is-splash', !isAtTop);
};

updateHeaderTransparency();
window.addEventListener('scroll', () => {
    window.requestAnimationFrame(updateHeaderTransparency);
});
