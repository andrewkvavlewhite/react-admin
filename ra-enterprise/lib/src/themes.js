"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultLightTheme = exports.defaultDarkTheme = exports.buildThemeFromTypeMethod = void 0;
var merge_1 = __importDefault(require("lodash/merge"));
/**
 * Returns a configured theme from type method that builds a theme from a palette type ("light" or "dark").
 *
 * It should be used for example to build the method "themeFromType"
 * required by the <PreferencesBasedThemeProvider> of '@react-admin/ra-preferences'.
 *
 * @param {ThemeOptions} theme The base theme
 * @param {ThemeOptions} lightTheme A special theme for the light mode
 * @param {ThemeOptions} darkTheme A special theme for the dark mode
 *
 * @returns A function that builds the theme from a palette type ("light" or "dark").
 *
 */
exports.buildThemeFromTypeMethod = function (theme, lightTheme, darkTheme) { return function (type) {
    return merge_1.default({}, theme, type === 'dark'
        ? darkTheme || exports.defaultDarkTheme
        : lightTheme || exports.defaultLightTheme);
}; };
var overrides = {
    RaTopToolbar: {
        root: {
            alignItems: 'center',
            minHeight: 'auto',
            paddingTop: 0,
        },
    },
    RaListToolbar: {
        root: {
            alignItems: 'center',
            paddingTop: 0,
        },
        actions: {
            alignItems: 'center',
            minHeight: 'auto',
            paddingTop: 0,
        },
        toolbar: {
            minHeight: 'auto',
        },
    },
};
exports.defaultDarkTheme = {
    palette: {
        type: 'dark',
        primary: {
            main: '#90caf9',
        },
        background: {
            default: '#313131',
        },
    },
    overrides: overrides,
};
exports.defaultLightTheme = {
    palette: {
        type: 'light',
        primary: {
            main: '#4f3cc9',
        },
        secondary: {
            main: '#283593',
        },
        background: {
            default: '#fcfcfe',
        },
    },
    overrides: overrides,
};
