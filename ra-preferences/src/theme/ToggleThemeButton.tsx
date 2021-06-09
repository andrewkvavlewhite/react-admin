import React, { FC } from 'react';
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
const ToggleThemeButton: FC = () => {
    const translate = useTranslate();
    const [theme, setTheme] = usePreferences('theme', 'light');

    const handleTogglePaletteType = (): void => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    const toggleThemeTitle = translate('ra-preferences.action.toggle_theme', {
        _: 'Toggle Theme',
    });

    return (
        <Tooltip title={toggleThemeTitle} enterDelay={300}>
            <IconButton
                color="inherit"
                onClick={handleTogglePaletteType}
                aria-label={toggleThemeTitle}
            >
                {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
        </Tooltip>
    );
};

export default ToggleThemeButton;
