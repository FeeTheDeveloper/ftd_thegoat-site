
// Scroll reveal logic using IntersectionObserver
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
});

// Observe sections for reveal effect
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    section.classList.add('reveal');
    observer.observe(section);
});
