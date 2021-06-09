"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_admin_1 = require("react-admin");
var raSearchLanguageEnglish_1 = __importDefault(require("../src/i18n/raSearchLanguageEnglish"));
var raSearchLanguageFrench_1 = __importDefault(require("../src/i18n/raSearchLanguageFrench"));
var ra_i18n_polyglot_1 = __importDefault(require("ra-i18n-polyglot"));
var ra_language_english_1 = __importDefault(require("ra-language-english"));
var ra_language_french_1 = __importDefault(require("ra-language-french"));
exports.default = ra_i18n_polyglot_1.default(function (locale) {
    if (locale === 'fr') {
        return react_admin_1.mergeTranslations(ra_language_french_1.default, raSearchLanguageFrench_1.default);
    }
    // Always fallback on english
    return react_admin_1.mergeTranslations(ra_language_english_1.default, raSearchLanguageEnglish_1.default);
}, 'en');
