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
declare const useSetLocaleAndPreference: (defaultLocale?: string) => (locale: string) => void;
export default useSetLocaleAndPreference;
