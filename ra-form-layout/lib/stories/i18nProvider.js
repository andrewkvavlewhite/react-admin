"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_admin_1 = require("react-admin");
var raFormLayoutLanguageEnglish_1 = __importDefault(require("../src/i18n/raFormLayoutLanguageEnglish"));
var raFormLayoutLanguageFrench_1 = __importDefault(require("../src/i18n/raFormLayoutLanguageFrench"));
var ra_i18n_polyglot_1 = __importDefault(require("ra-i18n-polyglot"));
var ra_language_english_1 = __importDefault(require("ra-language-english"));
var ra_language_french_1 = __importDefault(require("ra-language-french"));
var englishMessages = __assign(__assign({}, ra_language_english_1.default), { resources: {
        customers: {
            fields: {
                name: 'Job',
                from: 'From',
                to: 'To',
            },
        },
    } });
exports.default = ra_i18n_polyglot_1.default(function (locale) {
    if (locale === 'fr') {
        return react_admin_1.mergeTranslations(ra_language_french_1.default, raFormLayoutLanguageFrench_1.default);
    }
    // Always fallback on english
    return react_admin_1.mergeTranslations(englishMessages, raFormLayoutLanguageEnglish_1.default);
}, 'en');
