import { FC, ReactNode } from 'react';
/**
 * Extract a value from the preferences and inject if to the child as prop
 *
 * Avoids creating an extra component just to get a preference
 *
 * @example
 *
 *     // set the admin 'theme' prop based on the 'ui.theme' preference
 *     const App = () => (
 *         <WithPreference path="ui.theme" name="theme">
 *             <Admin dataProvider={dataProvider}>
 *                 ...
 *             </Admin>
 *         </WithPreference>
 *     );
 *
 *     // equivalent of
 *     const App = () => {
 *         const [theme] = usePreferences('ui.theme');
 *         return (
 *             // set the admin 'theme' prop based on the 'ui.theme' preference
 *             <WithPreference path="ui.theme" name="theme">
 *                 <Admin dataProvider={dataProvider}>
 *                     ...
 *                 </Admin>
 *             </WithPreference>
 *         );
 *     };
 *
 * @param {string} path The path to use to get the preference, e.g. 'ui.theme'
 * @param {string} name The name of the prop to inject to the child, e.g. 'theme'
 */
declare const WithPreference: FC<Props>;
export interface Props {
    path: string;
    name?: string;
    children: ReactNode;
}
export default WithPreference;
