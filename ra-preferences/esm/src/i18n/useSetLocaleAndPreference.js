import { useEffect, useCallback } from 'react';
import { useSetLocale } from 'react-admin';
import { usePreferences } from '..';
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
    var setLocale = useSetLocale();
    var _a = usePreferences('locale', defaultLocale), locale = _a[0], setLocaleInPreferences = _a[1];
    // set language based on preferences
    useEffect(function () {
        if (locale) {
            setLocale(locale);
        }
    }, [locale, setLocale]);
    return useCallback(function (locale) {
        setLocale(locale);
        setLocaleInPreferences(locale);
    }, [setLocale, setLocaleInPreferences]);
};
export default useSetLocaleAndPreference;
