import { Theme, ThemeOptions as MuiThemeOptions, PaletteType } from '@material-ui/core';
export declare type Overrides = {
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
export declare const buildThemeFromTypeMethod: (theme: ThemeOptions, lightTheme: ThemeOptions, darkTheme: ThemeOptions) => (type: PaletteType) => Theme;
export declare const defaultDarkTheme: ThemeOptions;
export declare const defaultLightTheme: ThemeOptions;
