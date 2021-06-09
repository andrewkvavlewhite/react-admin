"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var Brightness4_1 = __importDefault(require("@material-ui/icons/Brightness4"));
var Brightness7_1 = __importDefault(require("@material-ui/icons/Brightness7"));
var react_admin_1 = require("react-admin");
var __1 = require("..");
/**
 * Button toggling the theme (light or dark) in the preferences.
 *
 * To be used in conjunction with PreferencesBasedThemeProvider.
 *
 * @see PreferencesBasedThemeProvider
 *
 * @example
 *
 *     const MyAppBar: FC = props => (
 *         <AppBar {...props}>
 *             <Box flex="1">
 *                 <Typography variant="h6" id="react-admin-title"></Typography>
 *             </Box>
 *             <ToggleThemeButton />
 *         </AppBar>
 *     );
 *
 *     const MyLayout: FC = props => <Layout {...props} appBar={MyAppBar} />;
 */
var ToggleThemeButton = function () {
    var translate = react_admin_1.useTranslate();
    var _a = __1.usePreferences('theme', 'light'), theme = _a[0], setTheme = _a[1];
    var handleTogglePaletteType = function () {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    var toggleThemeTitle = translate('ra-preferences.action.toggle_theme', {
        _: 'Toggle Theme',
    });
    return (react_1.default.createElement(core_1.Tooltip, { title: toggleThemeTitle, enterDelay: 300 },
        react_1.default.createElement(core_1.IconButton, { color: "inherit", onClick: handleTogglePaletteType, "aria-label": toggleThemeTitle }, theme === 'light' ? react_1.default.createElement(Brightness4_1.default, null) : react_1.default.createElement(Brightness7_1.default, null))));
};
exports.default = ToggleThemeButton;
