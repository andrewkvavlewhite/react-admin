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
exports.Basic = void 0;
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var ra_i18n_polyglot_1 = __importDefault(require("ra-i18n-polyglot"));
var ra_language_english_1 = __importDefault(require("ra-language-english"));
var ra_language_french_1 = __importDefault(require("ra-language-french"));
var history_1 = require("history");
var src_1 = require("../src");
var dataProvider_1 = __importDefault(require("./dataProvider"));
var i18nProvider = ra_i18n_polyglot_1.default(function (locale) { return (locale === 'fr' ? ra_language_french_1.default : ra_language_english_1.default); }, 'en' // Default locale
);
var SongList = function (props) { return (react_1.default.createElement(react_admin_1.List, __assign({}, props),
    react_1.default.createElement(react_admin_1.SimpleList, { primaryText: function (record) { return record.title; } }))); };
var MyAppBar = function (props) { return (react_1.default.createElement(react_admin_1.AppBar, __assign({}, props),
    react_1.default.createElement(core_1.Box, { flex: "1" },
        react_1.default.createElement(core_1.Typography, { variant: "h6", id: "react-admin-title" })),
    react_1.default.createElement(src_1.LanguageSwitcher, { languages: [
            { locale: 'en', name: 'English' },
            { locale: 'fr', name: 'Français' },
        ] }))); };
var MyLayout = function (props) { return react_1.default.createElement(react_admin_1.Layout, __assign({}, props, { appBar: MyAppBar })); };
exports.Basic = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), i18nProvider: i18nProvider, dataProvider: dataProvider_1.default, layout: MyLayout },
    react_1.default.createElement(react_admin_1.Resource, { name: "songs", list: SongList }))); };
exports.default = {
    title: 'ra-preferences/LanguageSwitcher',
};
