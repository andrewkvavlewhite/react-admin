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
exports.WithThemeAndLocale = exports.Basic = void 0;
var react_1 = __importDefault(require("react"));
var merge_1 = __importDefault(require("lodash/merge"));
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var ra_i18n_polyglot_1 = __importDefault(require("ra-i18n-polyglot"));
var ra_language_english_1 = __importDefault(require("ra-language-english"));
var ra_language_french_1 = __importDefault(require("ra-language-french"));
var history_1 = require("history");
var src_1 = require("../src");
var dataProvider_1 = __importDefault(require("./dataProvider"));
var SongFilter = function (props) { return (react_1.default.createElement(src_1.FilterWithSave, __assign({}, props),
    react_1.default.createElement(react_admin_1.SelectInput, { choices: [
            { id: 'Apple', name: 'Apple' },
            { id: 'Atlantic', name: 'Atlantic' },
            { id: 'Capitol', name: 'Capitol' },
            { id: 'Chess', name: 'Chess' },
            { id: 'Columbia', name: 'Columbia' },
            { id: 'DGC', name: 'DGC' },
            { id: 'London', name: 'London' },
            { id: 'Tamla', name: 'Tamla' },
        ], source: "recordCompany" }),
    react_1.default.createElement(react_admin_1.DateInput, { source: "released_gte", label: "Released after" }),
    react_1.default.createElement(react_admin_1.DateInput, { source: "released_lte", label: "Released before" }))); };
var SongList = function (props) { return (react_1.default.createElement(react_admin_1.List, __assign({}, props, { filters: react_1.default.createElement(SongFilter, null) }),
    react_1.default.createElement(react_admin_1.Datagrid, { rowClick: "edit" },
        react_1.default.createElement(react_admin_1.TextField, { source: "title" }),
        react_1.default.createElement(react_admin_1.TextField, { source: "artist" }),
        react_1.default.createElement(react_admin_1.TextField, { source: "writer" }),
        react_1.default.createElement(react_admin_1.TextField, { source: "producer" }),
        react_1.default.createElement(react_admin_1.TextField, { source: "recordCompany" }),
        react_1.default.createElement(react_admin_1.NumberField, { source: "rank" }),
        react_1.default.createElement(react_admin_1.DateField, { source: "released" })))); };
exports.Basic = function () { return (react_1.default.createElement(react_admin_1.Admin, { dataProvider: dataProvider_1.default },
    react_1.default.createElement(react_admin_1.Resource, { name: "songs", list: SongList }))); };
/****************** With Theme and Locale Switcher ********************/
var frenchAppMessages = {
    resources: {
        songs: {
            name: 'Morceau |||| Morceaux',
            fields: {
                title: 'Titre',
                artist: 'Artiste',
                writer: 'Auteur',
                producer: 'Producteur',
                recordCompany: 'Label',
                rank: 'Classement',
                released: 'Publication',
            },
        },
    },
    ra: { action: { choose_columns: 'Colonnes' } },
};
var i18nProvider = ra_i18n_polyglot_1.default(function (locale) {
    return locale === 'fr'
        ? merge_1.default(ra_language_french_1.default, src_1.raPreferencesLanguageFrench, frenchAppMessages)
        : ra_language_english_1.default;
}, 'en' // Default locale
);
var themes = {
    light: {
        type: 'dark',
        palette: {
            primary: {
                main: '#90caf9',
            },
            type: 'dark',
        },
    },
    dark: {
        type: 'light',
        palette: {
            secondary: {
                light: '#5f5fc4',
                main: '#283593',
                dark: '#001064',
                contrastText: '#fff',
            },
        },
        overrides: {
            MuiFilledInput: {
                root: {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    '&$disabled': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                },
            },
        },
    },
};
var MyAppBar = function (props) { return (react_1.default.createElement(react_admin_1.AppBar, __assign({}, props),
    react_1.default.createElement(core_1.Box, { flex: "1" },
        react_1.default.createElement(core_1.Typography, { variant: "h6", id: "react-admin-title" })),
    react_1.default.createElement(src_1.ToggleThemeButton, null),
    react_1.default.createElement(src_1.LanguageSwitcher, { languages: [
            { locale: 'en', name: 'English' },
            { locale: 'fr', name: 'Français' },
        ], defaultLanguage: "English" }))); };
var MyLayout = function (props) { return react_1.default.createElement(react_admin_1.Layout, __assign({}, props, { appBar: MyAppBar })); };
exports.WithThemeAndLocale = function () { return (react_1.default.createElement(src_1.PreferencesBasedThemeProvider, { themeFromType: function (type) { return themes[type]; } },
    react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), i18nProvider: i18nProvider, dataProvider: dataProvider_1.default, layout: MyLayout },
        react_1.default.createElement(react_admin_1.Resource, { name: "songs", list: SongList })))); };
exports.default = { title: 'ra-preferences/FilterWithSave' };
