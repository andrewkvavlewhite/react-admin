"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_admin_1 = require("react-admin");
var __1 = require("..");
/**
 * Set the locale in the app and in the preferences.
 *
 * On mount, set the app locale based on preferences.
 *
 * @example
 *
 * import { useSetLocaleAndPreference } from '@react-admin/ra-preferences';
 *
 * const availableLanguages = {
 *     en: 'English',
 *     fr: 'Français',
 * }
 * const LanguageSwitcher = () => {
 *     const setLocale = useSetLocaleAndPreference();
 *     return (
 *         <ul>{
 *             Object.keys(availableLanguages).map(locale => {
 *                  <li key={locale} onClick={() => setLocale(locale)}>
 *                      {availableLanguages[locale]}
 *                  </li>
 *              })
 *         }</ul>
 *     );
 * }
 *
 * @param {string} defaultLocale Default locale
 */
var useSetLocaleAndPreference = function (defaultLocale) {
    var setLocale = react_admin_1.useSetLocale();
    var _a = __1.usePreferences('locale', defaultLocale), locale = _a[0], setLocaleInPreferences = _a[1];
    // set language based on preferences
    react_1.useEffect(function () {
        if (locale) {
            setLocale(locale);
        }
    }, [locale, setLocale]);
    return react_1.useCallback(function (locale) {
        setLocale(locale);
        setLocaleInPreferences(locale);
    }, [setLocale, setLocaleInPreferences]);
};
exports.default = useSetLocaleAndPreference;
