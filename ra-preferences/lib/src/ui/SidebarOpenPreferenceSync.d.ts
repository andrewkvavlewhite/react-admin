import { FC } from 'react';
/**
 * Save Sidebar open status in Preferences, and restore it on load.
 *
 * @example
 *
 *     import { SidebarOpenPreferenceSync } from '@react-admin/ra-preferences';
 *
 *     const MyLayout: FC = props => (
 *         <>
 *             <SidebarOpenPreferenceSync />
 *             <Layout {...props} />
 *         </>
 *     );
 *
 *     export const App = () => (
 *         <Admin dataProvider={dataProvider} layout={MyLayout}>
 *             ...
 *         </Admin>
 *     );
 */
declare const SidebarOpenPreferenceSync: FC;
export default SidebarOpenPreferenceSync;
