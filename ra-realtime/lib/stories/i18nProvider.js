"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_admin_1 = require("react-admin");
var raRealTimeLanguageEnglish_1 = __importDefault(require("../src/i18n/raRealTimeLanguageEnglish"));
var raRealTimeLanguageFrench_1 = __importDefault(require("../src/i18n/raRealTimeLanguageFrench"));
var ra_i18n_polyglot_1 = __importDefault(require("ra-i18n-polyglot"));
var ra_language_english_1 = __importDefault(require("ra-language-english"));
var ra_language_french_1 = __importDefault(require("ra-language-french"));
exports.default = ra_i18n_polyglot_1.default(function (locale) {
    if (locale === 'fr') {
        return react_admin_1.mergeTranslations(ra_language_french_1.default, raRealTimeLanguageFrench_1.default);
    }
    // Always fallback on english
    return react_admin_1.mergeTranslations(ra_language_english_1.default, raRealTimeLanguageEnglish_1.default);
}, 'en');
