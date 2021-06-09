var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { mergeTranslations } from 'react-admin';
import raFormLayoutLanguageEnglish from '../src/i18n/raFormLayoutLanguageEnglish';
import raFormLayoutLanguageFrench from '../src/i18n/raFormLayoutLanguageFrench';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import baseEnglishMessages from 'ra-language-english';
import frenchMessages from 'ra-language-french';
var englishMessages = __assign(__assign({}, baseEnglishMessages), { resources: {
        customers: {
            fields: {
                name: 'Job',
                from: 'From',
                to: 'To',
            },
        },
    } });
export default polyglotI18nProvider(function (locale) {
    if (locale === 'fr') {
        return mergeTranslations(frenchMessages, raFormLayoutLanguageFrench);
    }
    // Always fallback on english
    return mergeTranslations(englishMessages, raFormLayoutLanguageEnglish);
}, 'en');
