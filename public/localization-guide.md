# Karvon Website Localization Guide

## Overview

This guide provides detailed instructions for maintaining and expanding the localization (i18n) system implemented on the Karvon website. The system supports English, Russian, and Uzbek languages, with the ability to add more languages in the future.

## File Structure

```
/locales/           - Translation files directory
  en.json           - English translations
  ru.json           - Russian translations
  uz.json           - Uzbek translations
i18n.js             - Main JavaScript localization functionality
i18n.css            - Styling for language selector dropdown
```

## How the System Works

1. The website loads with a hidden visibility to prevent showing untranslated content (prevents flickering).
2. When the page loads, the system checks localStorage for a saved language preference (`karvon-language`).
3. If no preference exists, English (`en`) is used as the default.
4. The system loads the appropriate JSON translation file and updates all elements with `data-i18n` attributes.
5. After translations are applied, the page becomes visible.
6. Users can change the language via the dropdown menu in the header.

## Translatable Elements

### Special Cases for Form Elements

For form elements with placeholders, you can use the `data-i18n-placeholder` attribute to translate the placeholder text separately from the label:

```html
<!-- For input fields -->
<label for="name" data-i18n="sections.contacts.form.name">Name</label>
<input type="text" id="name" data-i18n-placeholder="sections.contacts.form.namePlaceholder" placeholder="Enter your name">

<!-- For textareas -->
<label for="message" data-i18n="sections.contacts.form.message">Message</label>
<textarea id="message" data-i18n-placeholder="sections.contacts.form.messagePlaceholder" placeholder="Enter your message"></textarea>
```

Add the corresponding keys to each language JSON file:

```json
{
  "sections": {
    "contacts": {
      "form": {
        "name": "Name",
        "namePlaceholder": "Enter your name",
        "message": "Message",
        "messagePlaceholder": "Enter your message"
      }
    }
  }
}
```

### Adding New Translatable Content

To make HTML content translatable:

1. Add the `data-i18n` attribute to any HTML element that needs translation:

```html
<h1 data-i18n="section.title">Default English Text</h1>
<p data-i18n="section.description">Default English description</p>
<button data-i18n="buttons.submit">Submit</button>
```

2. Add the corresponding keys to each language JSON file:

```json
// en.json
{
  "section": {
    "title": "Title in English",
    "description": "Description in English"
  },
  "buttons": {
    "submit": "Submit"
  }
}
```

```json
// ru.json
{
  "section": {
    "title": "Заголовок на русском",
    "description": "Описание на русском"
  },
  "buttons": {
    "submit": "Отправить"
  }
}
```

### Translation Keys Structure

It's recommended to organize translation keys hierarchically:

- Use sections as top-level categories (e.g., `nav`, `home`, `footer`)
- Use descriptive subcategories (e.g., `nav.links`, `home.hero`)
- Use specific identifiers for elements (e.g., `nav.links.about`, `home.hero.title`)

## Translation Files

### JSON Structure

Each language file should have the same structure. Keep keys consistent across all files to ensure all content can be translated.

### Adding a New Language

To add a new language:

1. Create a new JSON file in the `/locales/` directory (e.g., `/locales/fr.json`)
2. Copy the structure from an existing language file (e.g., `en.json`)
3. Translate all text values while keeping the keys unchanged
4. Add the language to the `supportedLanguages` array in `i18n.js`:

```javascript
const supportedLanguages = ['en', 'ru', 'uz', 'fr'];
```

5. Add the language option to the dropdown menu in the HTML:

```html
<div data-lang="fr" class="language-dropdown-item">
  <span class="language-flag">🇫🇷</span>
  <span class="language-name" data-i18n="language.fr">French</span>
</div>
```

## Testing Translations

A comprehensive test page has been created to verify that all translations are working properly:

1. Open [`test-i18n-all.html`](/test-i18n-all.html) in your browser
2. Use the language dropdown to switch between languages
3. Verify that all content updates correctly

This test page includes examples of all translatable elements:
- Navigation links
- Hero section content
- Buttons
- Category sections
- Form elements with placeholders
- Footer content

You can access this test page from the link at the bottom of the main website footer.
</div>
```

6. Add the language name to all language files:

```json
"language": {
  "fr": "French" // in en.json
  "fr": "Французский" // in ru.json
  "fr": "Fransuz" // in uz.json
  "fr": "Français" // in fr.json
}
```

## Advanced Features

### Translating Attributes

To translate attributes like placeholders, titles, or alt text:

```html
<input 
  data-i18n="form.email" 
  data-i18n-attr="placeholder:form.emailPlaceholder,title:form.emailTitle"
>
```

Add corresponding keys to your language files:

```json
"form": {
  "email": "Email",
  "emailPlaceholder": "Enter your email address",
  "emailTitle": "Please enter a valid email address"
}
```

### Programmatic Translation

You can translate content dynamically using the exposed JavaScript API:

```javascript
// Change current language
i18n.changeLanguage('ru');

// Get current language code
const currentLang = i18n.getCurrentLanguage();

// Get a specific translation
const buttonText = await i18n.getTranslation('buttons.submit');

// Set translation for an element
await i18n.setElementTranslation(document.getElementById('myElement'), 'section.title');
```

## Testing Localization

1. Use the test files:
   - `test-i18n.html` - Test basic translations
   - `language-responsive-test.html` - Test responsive layout and accessibility

2. Test across different browsers and screen sizes
   - Make sure the language dropdown is properly positioned
   - Verify that translations don't break layouts
   - Check that the dropdown works well on mobile devices

3. Test keyboard navigation:
   - Tab to the language dropdown
   - Open with Enter/Space
   - Navigate with arrow keys
   - Select with Enter
   - Close with Escape

## Troubleshooting

### Missing Translations

If content is not translating:

1. Check that the element has the correct `data-i18n` attribute
2. Verify that the translation key exists in all language files
3. Check the browser console for any errors
4. Make sure the translation files are being loaded correctly

### Layout Issues

If translations cause layout problems:

1. Consider that some languages may need more space than English
2. Use flexible layouts that can accommodate longer text
3. Test with all languages to ensure the design works for all content lengths

## Best Practices

1. **Consistency**: Use the same translation keys across all files
2. **Organization**: Group related translations under logical categories
3. **Documentation**: Comment complex translations or special formatting requirements
4. **Testing**: Test all languages before deploying changes
5. **Maintenance**: Regularly audit pages for untranslated content

## Accessibility Considerations

The language selector has been enhanced with several accessibility features:

1. **ARIA attributes** for screen reader support:
   - `aria-haspopup="true"` on the dropdown button
   - `aria-expanded` state changes with dropdown state
   - `role="menu"` for the dropdown content
   - `role="menuitem"` for each language option

2. **Keyboard navigation**:
   - Tab to focus the dropdown button
   - Enter/Space to open dropdown
   - Arrow keys to navigate options
   - Enter to select a language
   - Escape to close dropdown

3. **Focus styles** for keyboard users

4. **Screen reader support** for language changes
