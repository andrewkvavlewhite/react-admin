"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomMessages = void 0;
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var history_1 = require("history");
var __1 = require("..");
var realTimeDataProvider_1 = require("../realTimeDataProvider");
var ra_i18n_polyglot_1 = __importDefault(require("ra-i18n-polyglot"));
var ra_language_english_1 = __importDefault(require("ra-language-english"));
var ra_language_french_1 = __importDefault(require("ra-language-french"));
var raRealTimeLanguageEnglish_1 = __importDefault(require("../../src/i18n/raRealTimeLanguageEnglish"));
var raRealTimeLanguageFrench_1 = __importDefault(require("../../src/i18n/raRealTimeLanguageFrench"));
var customEnglishMessages = react_admin_1.mergeTranslations(ra_language_english_1.default, raRealTimeLanguageEnglish_1.default, {
    'ra-realtime': {
        notification: {
            record: {
                updated: 'Wow, this entry has been modified by a ghost',
                deleted: 'Hey, a ghost has stolen this entry',
            },
            list: {
                refreshed: 'Be carefull, this list has been refreshed with %{smart_count} %{name} %{type} by some ghosts',
            },
        },
    },
});
var i18nCustomProvider = ra_i18n_polyglot_1.default(function (locale) {
    if (locale === 'fr') {
        return react_admin_1.mergeTranslations(ra_language_french_1.default, raRealTimeLanguageFrench_1.default);
    }
    return customEnglishMessages;
}, 'en');
exports.default = {
    title: 'ra-realtime/InLocalBrowser',
};
exports.CustomMessages = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: realTimeDataProvider_1.localBrowserDataProvider, layout: __1.Layout, i18nProvider: i18nCustomProvider, dashboard: __1.Dashboard },
    react_1.default.createElement(react_admin_1.Resource, { name: "posts", list: __1.PostList, show: __1.PostShow(realTimeDataProvider_1.localBrowserDataProvider), edit: __1.PostEdit(realTimeDataProvider_1.localBrowserDataProvider), create: __1.PostCreate }))); };
