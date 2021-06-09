import { mergeTranslations } from 'react-admin';
import raRealTimeEnglishMessages from '../src/i18n/raRealTimeLanguageEnglish';
import raRealTimeFrenchMessages from '../src/i18n/raRealTimeLanguageFrench';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import frenchMessages from 'ra-language-french';
export default polyglotI18nProvider(function (locale) {
    if (locale === 'fr') {
        return mergeTranslations(frenchMessages, raRealTimeFrenchMessages);
    }
    // Always fallback on english
    return mergeTranslations(englishMessages, raRealTimeEnglishMessages);
}, 'en');
