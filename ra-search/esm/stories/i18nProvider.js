import { mergeTranslations } from 'react-admin';
import raSearchEnglishMessages from '../src/i18n/raSearchLanguageEnglish';
import raSearchFrenchMessages from '../src/i18n/raSearchLanguageFrench';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import frenchMessages from 'ra-language-french';
export default polyglotI18nProvider(function (locale) {
    if (locale === 'fr') {
        return mergeTranslations(frenchMessages, raSearchFrenchMessages);
    }
    // Always fallback on english
    return mergeTranslations(englishMessages, raSearchEnglishMessages);
}, 'en');
