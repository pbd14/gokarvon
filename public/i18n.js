// i18n.js - Localization handling for Karvon website
let currentLanguage = localStorage.getItem('karvon-language') || 'en';
const translations = {};
const supportedLanguages = ['en', 'ru', 'uz'];

// Load translations for a specific language
async function loadTranslations(lang) {
    if (!translations[lang]) {
        try {
            const response = await fetch(`locales/${lang}.json`);
            translations[lang] = await response.json();
        } catch (error) {
            console.error(`Failed to load ${lang} translations:`, error);
            // Fallback to English if loading fails
            if (lang !== 'en') {
                if (!translations['en']) {
                    await loadTranslations('en');
                }
                translations[lang] = translations['en'];
            }
        }
    }
    return translations[lang];
}

// Change the current language and update the page content
async function changeLanguage(lang) {
    if (!supportedLanguages.includes(lang)) {
        console.error(`Language ${lang} is not supported.`);
        return;
    }

    currentLanguage = lang;
    localStorage.setItem('karvon-language', lang);

    await updatePageContent();

    // Update language dropdown
    const dropdownBtn = document.querySelector('.language-dropdown-btn .current-lang');
    if (dropdownBtn) {
        dropdownBtn.textContent = lang.toUpperCase();
    }

    // Update active class on dropdown items
    document.querySelectorAll('.language-dropdown-item').forEach(item => {
        if (item.dataset.lang === lang) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Also update the old language selector buttons if they exist
    document.querySelectorAll('.language-selector button').forEach(button => {
        if (button.dataset.lang === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Update all text content on the page based on the current language
async function updatePageContent() {
    const t = await loadTranslations(currentLanguage);

    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const keys = element.getAttribute('data-i18n').split('.');
        let translation = t;

        // Navigate through the keys to find the correct translation
        for (const key of keys) {
            if (translation && translation[key]) {
                translation = translation[key];
            } else {
                translation = null;
                break;
            }
        }

        if (translation) {
            // Handle different element types
            if (element.tagName === 'INPUT' && element.type !== 'button') {
                if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                } else {
                    element.value = translation;
                }
            } else if (element.tagName === 'TEXTAREA') {
                if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                } else {
                    element.value = translation;
                }
            } else if (element.tagName === 'IMG') {
                element.alt = translation;
            } else if (element.tagName === 'META') {
                element.content = translation;
            } else if (element.tagName === 'A' && !element.childNodes.length) {
                // For empty links just set text
                element.textContent = translation;
            } else if (element.children.length === 0 || element.tagName === 'BUTTON' || element.tagName === 'A') {
                // For elements without children or buttons/links, update text content
                element.textContent = translation;
            }

            // Handle data-i18n-attr for additional attributes
            if (element.hasAttribute('data-i18n-attr')) {
                const attrPairs = element.getAttribute('data-i18n-attr').split(',');
                attrPairs.forEach(pair => {
                    const [attr, keyPath] = pair.split(':');
                    if (attr && keyPath) {
                        const attrKeys = keyPath.split('.');
                        let attrTranslation = t;

                        for (const key of attrKeys) {
                            if (attrTranslation && attrTranslation[key]) {
                                attrTranslation = attrTranslation[key];
                            } else {
                                attrTranslation = null;
                                break;
                            }
                        }

                        if (attrTranslation) {
                            element.setAttribute(attr, attrTranslation);
                        }
                    }
                });
            }
        }
    });

    // Handle elements with placeholder translations (data-i18n-placeholder)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const keys = element.getAttribute('data-i18n-placeholder').split('.');
        let translation = t;

        // Navigate through the keys to find the correct translation
        for (const key of keys) {
            if (translation && translation[key]) {
                translation = translation[key];
            } else {
                translation = null;
                break;
            }
        }

        if (translation && (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA')) {
            element.placeholder = translation;
        }
    });

    // Special handling for platform title to add styling to key words
    const platformTitle = document.querySelector('[data-i18n="sections.platform.title"]');
    if (platformTitle) {
        const titleText = platformTitle.textContent;
        if (titleText && currentLanguage === 'en' && titleText.includes('Every')) {
            // For English
            platformTitle.innerHTML = titleText.replace('Every', '<span class="u-text-custom-color-6">Every</span>');
        } else if (currentLanguage === 'ru' && titleText && titleText.includes('любых')) {
            // For Russian
            platformTitle.innerHTML = titleText.replace('любых', '<span class="u-text-custom-color-6">любых</span>');
        } else if (currentLanguage === 'uz' && titleText && titleText.includes('Har')) {
            // For Uzbek
            platformTitle.innerHTML = titleText.replace('Har', '<span class="u-text-custom-color-6">Har</span>');
        }
    }

    // Set the document language attribute
    document.documentElement.lang = currentLanguage;
    document.body.setAttribute('data-lang', currentLanguage);
}

// Initialize language dropdown functionality
function initLanguageDropdown() {
    const dropdownBtn = document.getElementById('languageDropdownBtn');
    const dropdownContent = document.getElementById('languageDropdownContent');

    if (!dropdownBtn || !dropdownContent) return;

    // Add ARIA attributes for accessibility
    dropdownBtn.setAttribute('aria-haspopup', 'true');
    dropdownBtn.setAttribute('aria-expanded', 'false');
    dropdownBtn.setAttribute('aria-label', 'Select language');
    dropdownContent.setAttribute('role', 'menu');

    // Toggle dropdown on button click
    dropdownBtn.addEventListener('click', function () {
        const expanded = this.classList.toggle('active');
        dropdownContent.classList.toggle('show');
        this.setAttribute('aria-expanded', expanded);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.language-dropdown')) {
            dropdownBtn.classList.remove('active');
            dropdownContent.classList.remove('show');
            dropdownBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Handle language selection
    const languageItems = document.querySelectorAll('.language-dropdown-item');
    languageItems.forEach((item, index) => {
        // Add role and tabindex for accessibility
        item.setAttribute('role', 'menuitem');
        item.setAttribute('tabindex', '0');

        // Click event
        item.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
            dropdownBtn.classList.remove('active');
            dropdownContent.classList.remove('show');
            dropdownBtn.setAttribute('aria-expanded', 'false');
            dropdownBtn.focus(); // Return focus to the button
        });

        // Keyboard navigation
        item.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                // Select this language when Enter or Space is pressed
                e.preventDefault();
                this.click();
            } else if (e.key === 'ArrowDown' || e.key === 'Down') {
                // Move focus to the next item
                e.preventDefault();
                const nextItem = languageItems[index + 1] || languageItems[0];
                nextItem.focus();
            } else if (e.key === 'ArrowUp' || e.key === 'Up') {
                // Move focus to the previous item
                e.preventDefault();
                const prevItem = languageItems[index - 1] || languageItems[languageItems.length - 1];
                prevItem.focus();
            } else if (e.key === 'Escape') {
                // Close the dropdown
                e.preventDefault();
                dropdownBtn.classList.remove('active');
                dropdownContent.classList.remove('show');
                dropdownBtn.setAttribute('aria-expanded', 'false');
                dropdownBtn.focus();
            }
        });
    });

    // Add keyboard support for the dropdown button
    dropdownBtn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'Down') {
            // Open dropdown and focus first item
            e.preventDefault();
            this.classList.add('active');
            dropdownContent.classList.add('show');
            this.setAttribute('aria-expanded', 'true');
            languageItems[0].focus();
        }
    });

    // Set the current language on load
    languageItems.forEach(item => {
        if (item.getAttribute('data-lang') === currentLanguage) {
            item.classList.add('active');
            item.setAttribute('aria-selected', 'true');
        } else {
            item.classList.remove('active');
            item.setAttribute('aria-selected', 'false');
        }
    });

    // Set the current language text in the button
    const currentLangElement = dropdownBtn.querySelector('.current-lang');
    if (currentLangElement) {
        currentLangElement.textContent = currentLanguage.toUpperCase();
    }
}

// Document ready event
document.addEventListener('DOMContentLoaded', function () {
    // Initialize the dropdown
    initLanguageDropdown();

    // Initialize the page content with current language
    updatePageContent().then(() => {
        // After initial translation is applied, show the page (prevents flickering)
        document.documentElement.style.visibility = 'visible';

        // Add event listeners to language selector buttons
        document.querySelectorAll('.language-selector button').forEach(button => {
            button.addEventListener('click', () => {
                changeLanguage(button.dataset.lang);
            });

            // Set initial active state
            if (button.dataset.lang === currentLanguage) {
                button.classList.add('active');
            }
        });
    });
});

// Add a small style in the head to hide content until translation is loaded (prevents flickering)
const styleEl = document.createElement('style');
styleEl.textContent = 'html { visibility: hidden; }';
document.head.appendChild(styleEl);

// Expose functions for external use
window.i18n = {
    changeLanguage,
    getCurrentLanguage: () => currentLanguage,
    getTranslation: async (key) => {
        const t = await loadTranslations(currentLanguage);
        const keys = key.split('.');
        let value = t;

        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return null;
            }
        }

        return value;
    },
    // Helper to set translations programmatically
    setElementTranslation: async (element, translationKey) => {
        if (!element) return;
        element.setAttribute('data-i18n', translationKey);
        const t = await loadTranslations(currentLanguage);
        const keys = translationKey.split('.');
        let translation = t;

        for (const key of keys) {
            if (translation && translation[key]) {
                translation = translation[key];
            } else {
                return;
            }
        }

        if (translation) {
            element.textContent = translation;
        }
    }
};
