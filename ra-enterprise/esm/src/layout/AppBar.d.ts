import { ReactElement } from 'react';
export interface Languages {
    locale: string;
    name: string;
}
export interface AppBarProps {
    languages?: Array<Languages>;
    defaultLanguage?: string;
    [key: string]: any;
}
/**
 * An <AppBar> component for ra-enterprise which pre-configures the enterprise modules.
 *
 * What is pre-configured?
 * - A theme button to switch between light and dark mode (from @react-admin/ra-preferences)
 * - A language button to switch between the locales (from @react-admin/ra-preferences)
 *
 * It uses the same API as the <AppBar> component from react-admin,
 * and add new props based on the enterprise edition.
 *
 * @param {Array<Languages>} languages A list of languages.
 * @param {Languages} languages[] A object describing the language.
 * @param {string} languages[].locale The locale. It should match those passed to the i18nProvider.
 * @param {string} languages[].name The language name.
 * @param {string} defaultLanguage The default language name. It should correspond to one of the passed languages name. Default to the first language name in the languages props.
 *
 * @example Enable the theme switcher for light and dark mode
 *
 * // Nothing to do, the <AppBar> is used in the default <Admin>
 * // and the theme switcher is enabled by default
 *
 * import { Admin } from '@react-admin/ra-enterprise';
 *
 * const dataProvider = {
 *     // Connect to your API
 * };
 *
 * function App(props) {
 *     return (
 *         <Admin dataProvider={dataProvider}>
 *             // Put your resources here
 *         </Admin>
 *     );
 * }
 *
 * @example Enable the languages switcher
 *
 * import { Admin, AppBar, Layout } from '@react-admin/ra-enterprise';
 * import polyglotI18nProvider from 'ra-i18n-polyglot';
 * import englishMessages from 'ra-language-english';
 * import frenchMessages from 'ra-language-french';
 *
 * const languages = [
 *     { locale: 'en', name: 'English' },
 *     { locale: 'fr', name: 'Français' },
 * ];
 *
 * const messages = {
 *     en: [englishMessages],
 *     fr: [frenchMessages],
 * };
 *
 * const i18nProvider = polyglotI18nProvider(
 *     locale => mergeTranslations(...messages[locale]),
 *     'en'
 * );
 *
 * function CustomAppBar(props) {
 *     return <AppBar languages={languages} {...props} />;
 * };
 *
 * function CustomLayout(props) {
 *     return <Layout appBar={CustomAppBar} {...props} />;
 * };
 *
 * const dataProvider = {
 *     // Connect to your API
 * };
 *
 * function App(props) {
 *     return (
 *         <Admin
 *             dataProvider={dataProvider}
 *             i18nProvider={i18nProvider}
 *             layout={CustomLayout}
 *         >
 *             // Put your resources here
 *         </Admin>
 *     );
 * }
 *
 */
declare function AppBar(props: AppBarProps): ReactElement;
declare namespace AppBar {
    var defaultProps: {
        languages: any[];
    };
}
export default AppBar;
