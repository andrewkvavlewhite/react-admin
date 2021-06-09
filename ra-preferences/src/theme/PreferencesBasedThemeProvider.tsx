import { useMemo, cloneElement, isValidElement, FC, ReactNode } from 'react';

import { usePreferences } from '..';

const defaultThemeFromType = (type: 'light' | 'dark'): any => ({
    palette: { type },
});

interface Props {
    children: ReactNode;
    themeFromType?: (type: 'light' | 'dark') => any;
}

/**
 * Inject a MUI theme object to its child component based on the theme in preferences
 *
 * @example
 *
 *     export const App = () => (
 *         <PreferencesBasedThemeProvider>
 *             <Admin dataProvider={dataProvider}>
 *                 <Resource name="posts" list={PostList} />
 *             </Admin>
 *         </PreferencesBasedThemeProvider>
 *     );
 *
 * @param {function} themeFromType Function returning a MUI Theme based on the theme string stored in preferences. Defaults to type => ({ palette: { type } }).
 *
 * Additional props are passed down to the child component.
 */
const PreferencesBasedThemeProvider: FC<Props> = ({
    children,
    themeFromType = defaultThemeFromType,
    ...rest
}) => {
    const [type] = usePreferences('theme', 'light');
    const theme = useMemo(
        () => themeFromType(type as 'light' | 'dark'),
        [type] // eslint-disable-line react-hooks/exhaustive-deps
    );
    if (!isValidElement(children)) {
        throw new Error(
            'PreferencesBasedThemeProvider must be used with a valid child'
        );
    }
    return cloneElement(children, { theme, ...rest });
};

export default PreferencesBasedThemeProvider;
