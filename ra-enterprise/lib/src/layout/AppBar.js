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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var styles_1 = require("@material-ui/core/styles");
var ra_preferences_1 = require("@react-admin/ra-preferences");
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
function AppBar(props) {
    var languages = props.languages, defaultLanguage = props.defaultLanguage, rest = __rest(props, ["languages", "defaultLanguage"]);
    var classes = useStyles(rest);
    return (react_1.default.createElement(react_admin_1.AppBar, __assign({}, props, { elevation: 1 }),
        react_1.default.createElement(Typography_1.default, { variant: "h6", color: "inherit", className: classes.title, id: "react-admin-title" }),
        react_1.default.createElement(ra_preferences_1.ToggleThemeButton, null),
        languages && languages.length > 0 ? (react_1.default.createElement(ra_preferences_1.LanguageSwitcher, { languages: languages, defaultLanguage: defaultLanguage || languages[0].name })) : null,
        props.children));
}
AppBar.defaultProps = {
    languages: [],
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        position: 'relative',
    },
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        paddingLeft: theme.spacing(1),
    },
}); }, {
    name: 'RaEnterpriseAppBar',
});
exports.default = AppBar;
