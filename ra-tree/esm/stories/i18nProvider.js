import { mergeTranslations } from 'react-admin';
import raTreeEnglishMessages from '../src/i18n/ra-tree-language-english';
import raTreeFrenchMessages from '../src/i18n/ra-tree-language-french';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import frenchMessages from 'ra-language-french';
export default polyglotI18nProvider(function (locale) {
    if (locale === 'fr') {
        return mergeTranslations(frenchMessages, raTreeFrenchMessages);
    }
    // Always fallback on english
    return mergeTranslations(englishMessages, raTreeEnglishMessages);
}, 'en');
