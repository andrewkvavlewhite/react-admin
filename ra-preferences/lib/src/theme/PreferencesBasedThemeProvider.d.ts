import { FC, ReactNode } from 'react';
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
declare const PreferencesBasedThemeProvider: FC<Props>;
export default PreferencesBasedThemeProvider;
