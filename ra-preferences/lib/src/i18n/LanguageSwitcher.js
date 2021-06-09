"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var Translate_1 = __importDefault(require("@material-ui/icons/Translate"));
var ExpandMore_1 = __importDefault(require("@material-ui/icons/ExpandMore"));
var useSetLocaleAndPreference_1 = __importDefault(require("./useSetLocaleAndPreference"));
/**
 * Language selector. Changes the locale in the app and persists it in
 * preferences so that the app opens with the right locale in the future.
 *
 * @example
 *
 *     const MyAppBar: FC = props => (
 *         <AppBar {...props}>
 *             <Box flex="1">
 *                 <Typography variant="h6" id="react-admin-title"></Typography>
 *             </Box>
 *             <LanguageSwitcher
 *                 languages={[
 *                     { locale: 'en', name: 'English' },
 *                     { locale: 'fr', name: 'Français' },
 *                 ]}
 *             />
 *         </AppBar>
 *     );
 */
var LanguageSwitcher = function (_a) {
    var languages = _a.languages, _b = _a.defaultLanguage, defaultLanguage = _b === void 0 ? '' : _b;
    var classes = useStyles();
    var _c = react_1.default.useState(null), anchorEl = _c[0], setAnchorEl = _c[1];
    var locale = react_admin_1.useLocale();
    var setLocale = useSetLocaleAndPreference_1.default();
    var getNameForLocale = function (locale) {
        var language = languages.find(function (language) { return language.locale === locale; });
        return language ? language.name : defaultLanguage;
    };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    var changeLocale = function (locale) { return function () {
        setLocale(locale);
        setAnchorEl(null);
    }; };
    var handleLanguageClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(core_1.Button, { color: "inherit", "aria-controls": "simple-menu", "aria-haspopup": "true", onClick: handleLanguageClick },
            react_1.default.createElement(Translate_1.default, null),
            react_1.default.createElement("div", { className: classes.languageContainer }, getNameForLocale(locale)),
            react_1.default.createElement(ExpandMore_1.default, { fontSize: "small" })),
        react_1.default.createElement(core_1.Menu, { id: "simple-menu", anchorEl: anchorEl, keepMounted: true, open: Boolean(anchorEl), onClose: handleClose }, languages.map(function (language) { return (react_1.default.createElement(core_1.MenuItem, { key: language.locale, onClick: changeLocale(language.locale) }, language.name)); }))));
};
exports.default = LanguageSwitcher;
var useStyles = styles_1.makeStyles(function (theme) { return ({
    languageContainer: {
        marginLeft: theme.spacing(1),
    },
}); });
