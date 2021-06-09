import React, { ReactElement } from 'react';
import merge from 'lodash/merge';
import { PreferencesBasedThemeProvider } from '@react-admin/ra-preferences';
import { reducer as tree } from '@react-admin/ra-tree';
import { reducer as locks } from '@react-admin/ra-realtime';
import { theme as navigationTheme } from '@react-admin/ra-navigation';

import {
    Admin as DefaultAdmin,
    AdminProps as DefaultAdminProps,
} from 'react-admin';

import { buildI18nProvider } from './i18nProvider';
import { Layout } from './layout';
import { ThemeOptions, buildThemeFromTypeMethod } from './themes';

export interface AdminProps extends DefaultAdminProps {
    theme?: ThemeOptions;
    lightTheme?: ThemeOptions;
    darkTheme?: ThemeOptions;
    [key: string]: any;
}

/**
 * An <Admin> component for ra-enterprise which pre-configures the enterprise modules.
 *
 * What is pre-configured?
 * - A Breadcrumb based on resources (from @react-admin/ra-navigation)
 * - A light and dark mode for the theme (from @react-admin/ra-preferences)
 * - A preference based sidebar state (from @react-admin/ra-preferences)
 * - The possibility to lock a resource (from @react-admin/ra-realtime)
 *
 * It uses the same API as the <Admin> component from react-admin,
 * and add new props based on the enterprise edition.
 *
 * @param {object} customReducers Augment the data provider with your own reducers (optional). The tree and the locks reducers are added by default.
 * @param {object} i18nProvider Replace the ra-enterprise i18nProvider (optional). The default one enables the translations from ra-enterprise.
 * @param {ThemeOptions} theme The main theme. It will be merged with the light or the dark theme.
 * @param {ThemeOptions} lightTheme Override the light mode with your own light theme (optional).
 * @param {ThemeOptions} darkTheme Override the dark mode with your own dark theme (optional).
 *
 * @example Basic usage
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
 * @example Override the dark theme
 *
 * import { Admin } from '@react-admin/ra-enterprise';
 *
 * const darkTheme = {
 *     palette: {
 *         type: 'dark', // Don't forget to specify the palette type
 *         primary: {
 *             main: '#90caf9',
 *         },
 *         secondary: {
 *             main: '#ffff00',
 *         },
 *     },
 * };
 *
 * const dataProvider = {
 *     // Connect to your API
 * };
 *
 * function App(props) {
 *     return (
 *         <Admin dataProvider={dataProvider} darkTheme={darkTheme}>
 *             // Put your resources here
 *         </Admin>
 *     );
 * }
 *
 * @example Pass your own translations
 *
 * import { Admin, buildI18nProvider } from '@react-admin/ra-enterprise';
 *
 * const messages = {
 *     en: {
 *         // Put your english translations here
 *     },
 *     fr: {
 *         // Put your french translations here
 *     },
 * };
 *
 * const dataProvider = {
 *     // Connect to your API
 * };
 *
 * const i18nProvider = buildI18nProvider(messages)
 *
 * function App(props) {
 *     return (
 *         <Admin
 *             dataProvider={dataProvider}
 *             i18nProvider={i18nProvider}
 *         >
 *             // Put your resources here
 *         </Admin>
 *     );
 * }
 *
 */
function Admin(props: AdminProps): ReactElement {
    const {
        customReducers,
        darkTheme,
        i18nProvider,
        lightTheme,
        theme,
        ...rest
    } = props;

    const mergedCustomReducers = merge(
        {},
        {
            tree,
            locks,
        },
        customReducers
    );
    return (
        <PreferencesBasedThemeProvider
            themeFromType={buildThemeFromTypeMethod(
                merge({}, navigationTheme, theme),
                lightTheme,
                darkTheme
            )}
        >
            <DefaultAdmin
                i18nProvider={i18nProvider || buildI18nProvider()}
                customReducers={mergedCustomReducers}
                {...rest}
            />
        </PreferencesBasedThemeProvider>
    );
}

Admin.defaultProps = {
    layout: Layout,
};

export default Admin;
