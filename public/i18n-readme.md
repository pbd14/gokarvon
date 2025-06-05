# Karvon Website Localization

This document provides a quick overview of the localization (i18n) system for the Karvon website. For comprehensive documentation, please see [localization-guide.md](localization-guide.md).

## Overview

The website supports three languages:
- English (en)
- Russian (ru)
- Uzbek (uz)

The localization system uses JSON files to store translations and JavaScript to dynamically update the content based on the user's language preference.

## Files Structure

- `/locales/en.json` - English translations
- `/locales/ru.json` - Russian translations
- `/locales/uz.json` - Uzbek translations
- `/i18n.js` - JavaScript code for handling translations
- `/i18n.css` - CSS styles for the language selector
- `/test-i18n.html` - Basic translation testing page
- `/language-responsive-test.html` - Responsive design and accessibility testing
- `/localization-guide.md` - Comprehensive documentation and guide

## How It Works

1. When the page loads, the system checks for a saved language preference in localStorage (`karvon-language`).
2. If no preference is found, English is used as the default language.
3. The system loads the appropriate translation file and updates all elements marked with the `data-i18n` attribute.
4. Users can change the language by clicking the language buttons in the navigation menu.
5. When a language is selected, the preference is saved to localStorage and all content is updated.

## Adding New Translatable Content

To make new content translatable:

1. Add the `data-i18n` attribute to the HTML element with a key path to the translation.
   ```html
   <p data-i18n="section.key">Default text</p>
   ```

2. Add the translation to each language file:
   ```json
   {
     "section": {
       "key": "Translated text"
     }
   }
   ```

## Adding New Languages

To add a new language:

1. Create a new JSON file in the `/locales` directory (e.g., `/locales/fr.json`)
2. Copy the structure from an existing language file and translate all text
3. Add the language code to the `supportedLanguages` array in `i18n.js`
4. Add a language selector button to the navigation menu

## API

The translation system exposes the following methods via the global `i18n` object:

- `i18n.changeLanguage(lang)` - Change the current language
- `i18n.getCurrentLanguage()` - Get the current language code
- `i18n.getTranslation(key)` - Get a translation for a specific key
- `i18n.setElementTranslation(element, key)` - Set the translation for an element programmatically

## Browser Support

This localization system supports all modern browsers. The language preference is stored using localStorage, which is widely supported.
