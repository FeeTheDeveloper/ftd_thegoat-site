const header = document.querySelector('.site-header');
const mainContent = document.querySelector('main');

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

const introOverlay = document.querySelector('#intro-overlay');
const introLogoWrap = introOverlay?.querySelector('.intro-logo-wrap');
const headerLogo = document.querySelector('[data-intro-target]');

// Session key: ftd_intro_seen = "1" means the cinematic intro was already shown this session.
// Query params override: ?intro=0 skips the intro, ?intro=1 forces it to show for testing.
const INTRO_SESSION_KEY = 'ftd_intro_seen';
const INTRO_QUERY_KEY = 'intro';
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let introDismissed = false;
let introLandingStarted = false;
let introFocusReturn = null;

const getIntroPreference = () => {
    const params = new URLSearchParams(window.location.search);
    const introParam = params.get(INTRO_QUERY_KEY);

    if (introParam === '0') {
        return false;
    }

    if (introParam === '1') {
        return true;
    }

    return sessionStorage.getItem(INTRO_SESSION_KEY) !== '1';
};

const lockIntroFocus = () => {
    introFocusReturn = document.activeElement;
    document.body.classList.add('intro-active');

    if (introOverlay) {
        introOverlay.focus();
    }

    if (header) {
        header.setAttribute('aria-hidden', 'true');
        header.setAttribute('inert', '');
    }

    if (mainContent) {
        mainContent.setAttribute('aria-hidden', 'true');
        mainContent.setAttribute('inert', '');
    }
};

const releaseIntroFocus = () => {
    document.body.classList.remove('intro-active');

    if (header) {
        header.removeAttribute('aria-hidden');
        header.removeAttribute('inert');
    }

    if (mainContent) {
        mainContent.removeAttribute('aria-hidden');
        mainContent.removeAttribute('inert');
    }

    if (introFocusReturn && typeof introFocusReturn.focus === 'function') {
        introFocusReturn.focus();
    }
};

const setLandingTransform = () => {
    if (!introLogoWrap || !headerLogo) {
        return;
    }

    const introRect = introLogoWrap.getBoundingClientRect();
    const targetRect = headerLogo.getBoundingClientRect();
    const translateX =
        targetRect.left + targetRect.width / 2 - (introRect.left + introRect.width / 2);
    const translateY =
        targetRect.top + targetRect.height / 2 - (introRect.top + introRect.height / 2);
    const scale = targetRect.height / introRect.height;

    introLogoWrap.style.setProperty('--intro-translate-x', `${translateX}px`);
    introLogoWrap.style.setProperty('--intro-translate-y', `${translateY}px`);
    introLogoWrap.style.setProperty('--intro-scale', `${scale}`);
};

const startLanding = () => {
    if (!introOverlay || introLandingStarted || prefersReducedMotion) {
        return;
    }

    introLandingStarted = true;
    setLandingTransform();
    introOverlay.classList.add('is-landing');
};

const dismissIntro = () => {
    if (!introOverlay || introDismissed) {
        return;
    }

    introDismissed = true;

    if (!introLandingStarted && !prefersReducedMotion) {
        startLanding();
        window.setTimeout(() => {
            introOverlay.classList.add('is-dismissed');
            introOverlay.setAttribute('aria-hidden', 'true');
            releaseIntroFocus();
        }, 900);
    } else {
        introOverlay.classList.add('is-dismissed');
        introOverlay.setAttribute('aria-hidden', 'true');
        releaseIntroFocus();
    }

    introOverlay.addEventListener(
        'transitionend',
        event => {
            if (event.propertyName === 'opacity') {
                introOverlay.style.display = 'none';
            }
        },
        { once: true }
    );
};

const bindIntroDismissEvents = () => {
    const dismissEvents = ['mousemove', 'scroll', 'wheel', 'click', 'keydown', 'touchstart'];

    dismissEvents.forEach(eventName => {
        const options = eventName === 'keydown' ? { once: true } : { passive: true, once: true };
        window.addEventListener(eventName, dismissIntro, options);
    });

    document.addEventListener('keydown', event => {
        if (introOverlay && !introDismissed && event.key === 'Tab') {
            event.preventDefault();
            introOverlay.focus();
        }
    });
};

const showIntro = () => {
    if (!introOverlay) {
        return;
    }

    introOverlay.classList.add('is-active');
    introOverlay.setAttribute('aria-hidden', 'false');
    sessionStorage.setItem(INTRO_SESSION_KEY, '1');
    lockIntroFocus();

    if (!prefersReducedMotion) {
        window.requestAnimationFrame(() => {
            introOverlay.classList.add('is-revealed');
        });
    } else {
        introOverlay.classList.add('is-revealed');
    }

    bindIntroDismissEvents();
};

const initIntro = () => {
    if (!introOverlay) {
        return;
    }

    const shouldShowIntro = getIntroPreference();

    if (!shouldShowIntro) {
        introOverlay.setAttribute('aria-hidden', 'true');
        introOverlay.style.display = 'none';
        return;
    }

    showIntro();
};

initIntro();
