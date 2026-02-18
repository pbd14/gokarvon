/* ===================================================================
   KARVON — gokarvon.com
   JavaScript: Scroll animations, navbar, mobile menu, counter
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Shared Footer Loader ───
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('/components/footer.html')
            .then(res => res.text())
            .then(html => {
                footerPlaceholder.outerHTML = html;
            })
            .catch(() => {
                console.warn('Failed to load shared footer.');
            });
    }

    // ─── Create Modal Container ───
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.id = 'modalOverlay';
    modalOverlay.innerHTML = `
        <div class="modal" id="modalContent">
            <button class="modal__close" id="modalClose" aria-label="Close">&times;</button>
            <div class="modal__body" id="modalBody"></div>
        </div>
    `;
    document.body.appendChild(modalOverlay);

    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    function openModal(content) {
        modalBody.innerHTML = content;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // ─── Download Dialog ───
    // ─── Download Dialog ───
    window.openDownloadDialog = function (e) {
        if (e) e.preventDefault();
        const lang = document.documentElement.lang || 'en';
        // Fallback to English if translation missing
        const t = (window.translations && window.translations[lang] && window.translations[lang].modals)
            ? window.translations[lang].modals
            : (window.translations.en.modals);

        openModal(`
            <div class="modal__icon">📱</div>
            <h3 class="modal__title">${t.downloadTitle}</h3>
            <p class="modal__subtitle">${t.downloadSubtitle}</p>
            <div class="modal__options">
                <a href="https://play.google.com/store/apps/details?id=com.karvon" class="modal__option" target="_blank" rel="noopener">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>
                    <div>
                        <span class="modal__option-label">${t.googlePlay}</span>
                        <span class="modal__option-desc">${t.android}</span>
                    </div>
                </a>
                <a href="https://apps.apple.com/us/app/karvon/id6478936482" class="modal__option" target="_blank" rel="noopener">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                    <div>
                        <span class="modal__option-label">${t.appStore}</span>
                        <span class="modal__option-desc">${t.ios}</span>
                    </div>
                </a>
            </div>
            <p class="modal__footnote">${t.downloadFootnote}</p>
        `);
    };

    // ─── Partner Dialog ───
    // ─── Partner Dialog ───
    window.openPartnerDialog = function (e) {
        if (e) e.preventDefault();
        const lang = document.documentElement.lang || 'en';
        // Fallback to English if translation missing
        const t = (window.translations && window.translations[lang] && window.translations[lang].modals)
            ? window.translations[lang].modals
            : (window.translations.en.modals);

        openModal(`
            <div class="modal__icon">🏢</div>
            <h3 class="modal__title">${t.partnerTitle}</h3>
            <p class="modal__subtitle">${t.partnerSubtitle}</p>
            <div class="modal__options">
                <a href="https://host.gokarvon.com" class="modal__option" target="_blank" rel="noopener">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                    <div>
                        <span class="modal__option-label">${t.yesPartner}</span>
                        <span class="modal__option-desc">${t.descPartner}</span>
                    </div>
                </a>
                <a href="mailto:host@gokarvon.com?subject=Interested in partnering with Karvon" class="modal__option modal__option--alt">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <div>
                        <span class="modal__option-label">${t.newPartner}</span>
                        <span class="modal__option-desc">${t.descNew}</span>
                    </div>
                </a>
            </div>
        `);
    };

    // ─── Scroll Animations (IntersectionObserver) ───
    const animElements = document.querySelectorAll('.anim-fade-up');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    animElements.forEach(el => observer.observe(el));

    // ─── Navbar scroll effect ───
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ─── Mobile menu ───
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    const mobileMenuClose = document.getElementById('mobileMenuClose');
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ─── Smooth scroll for anchor links ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });

                // Close mobile menu if open
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // ─── Animated Counters ───
    const counters = document.querySelectorAll('.traction__number[data-target]');
    let countersAnimated = false;

    const animateCounters = () => {
        if (countersAnimated) return;
        countersAnimated = true;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const startTime = performance.now();

            const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutQuart(progress);
                const current = Math.round(easedProgress * target);

                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };

            requestAnimationFrame(updateCounter);
        });
    };

    const tractionSection = document.getElementById('traction');
    if (tractionSection) {
        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );
        counterObserver.observe(tractionSection);
    }

    // ─── Active nav link highlighting ───
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__link');

    const highlightNav = () => {
        const scrollPos = window.scrollY + navbar.offsetHeight + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });

    // ─── LANGUAGE SWITCHING ───

    const setLanguage = (lang) => {
        if (!window.translations || !window.translations[lang]) return;

        localStorage.setItem('karvonHelperLang', lang);
        document.documentElement.lang = lang;

        // Update all data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const keys = el.getAttribute('data-i18n').split('.');
            let value = window.translations[lang];

            keys.forEach(key => {
                if (value) value = value[key];
            });

            if (value) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = value;
                } else {
                    el.innerHTML = value;
                }
            }
        });

        // Update active state in switcher
        document.querySelectorAll('.lang-switcher__btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    };

    // Initialize Language
    const savedLang = localStorage.getItem('karvonHelperLang');
    const userLang = navigator.language || navigator.userLanguage;
    const defaultLang = savedLang ? savedLang : (userLang.startsWith('ru') ? 'ru' : (userLang.startsWith('uz') ? 'uz' : 'en'));

    // Ensure translations are loaded before setting language
    // In production, you might want to load this differently
    if (window.translations) {
        setLanguage(defaultLang);
    } else {
        // Retry a few times if script loading is delayed
        let retries = 0;
        const checkTranslations = setInterval(() => {
            if (window.translations) {
                setLanguage(defaultLang);
                clearInterval(checkTranslations);
            }
            retries++;
            if (retries > 20) clearInterval(checkTranslations);
        }, 100);
    }

    // Expose to window for onclick handlers
    window.changeLanguage = (lang) => {
        setLanguage(lang);
    };

    // Add language switcher to existing navs if not present (simplified for this task)
    // We will manually add the HTML structure in index.html and ai.html
});
