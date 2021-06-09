import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { useTranslate } from 'react-admin';
import { usePreferences } from '..';
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
    var translate = useTranslate();
    var _a = usePreferences('theme', 'light'), theme = _a[0], setTheme = _a[1];
    var handleTogglePaletteType = function () {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    var toggleThemeTitle = translate('ra-preferences.action.toggle_theme', {
        _: 'Toggle Theme',
    });
    return (React.createElement(Tooltip, { title: toggleThemeTitle, enterDelay: 300 },
        React.createElement(IconButton, { color: "inherit", onClick: handleTogglePaletteType, "aria-label": toggleThemeTitle }, theme === 'light' ? React.createElement(Brightness4Icon, null) : React.createElement(Brightness7Icon, null))));
};
export default ToggleThemeButton;
