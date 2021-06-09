import {
    Theme,
    ThemeOptions as MuiThemeOptions,
    PaletteType,
} from '@material-ui/core';
import merge from 'lodash/merge';

export type Overrides = {
    [key: string]: any;
};

export interface ThemeOptions extends MuiThemeOptions {
    overrides?: Overrides;
}

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
export const buildThemeFromTypeMethod = (
    theme: ThemeOptions,
    lightTheme: ThemeOptions,
    darkTheme: ThemeOptions
) => (type: PaletteType): Theme =>
    merge(
        {},
        theme,
        type === 'dark'
            ? darkTheme || defaultDarkTheme
            : lightTheme || defaultLightTheme
    );

const overrides = {
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

export const defaultDarkTheme: ThemeOptions = {
    palette: {
        type: 'dark',
        primary: {
            main: '#90caf9',
        },
        background: {
            default: '#313131',
        },
    },
    overrides,
};

export const defaultLightTheme: ThemeOptions = {
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
    overrides,
};
