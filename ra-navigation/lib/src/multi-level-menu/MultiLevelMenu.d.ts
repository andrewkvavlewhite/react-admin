import { ReactElement, ReactNode } from 'react';
/**
 * The <MultiLevelMenu> component allows to have complex menus with collapsible
 * sub menus inside our application.
 * The app must be inside a AppLocationContext.
 *
 * @see AppLocationContext
 *
 * It accepts <MenuItem> components as children which accepts <MenuItems> children as well.
 *
 * @example <caption>Simple Menu</caption>
 * import * as React from 'react';
 * import { Admin, Resource, Layout } from 'react-admin';
 * import { MultiLevelMenu, MenuItem } from '@react-admin/ra-navigation';
 * import { Dashboard } from './Dashboard';
 * import { SongList } from './SongList';
 * import { ArtistList } from './ArtistList';
 *
 * const BasicMultiLevelMenu = () => (
 *     <MultiLevelMenu>
 *         <MenuItem name="dashboard" to="/" exact label="Dashboard" />
 *         <MenuItem name="songs" to="/songs" label="Songs" />
 *         <MenuItem name="artists" to={'/artists?filter={}'} label="Artists">
 *             <MenuItem name="artists.rock" to={'/artists?filter={"type":"Rock"}'} label="Rock" />
 *             <MenuItem name="artists.jazz" to={'/artists?filter={"type":"Jazz"}'} label="Jazz" />
 *         </MenuItem>
 *     </MultiLevelMenu>
 * );
 *
 * const BasicLayout = props => (
 *     <AppLocationContext>
 *         <Layout {...props} menu={BasicMultiLevelMenu} />
 *     </AppLocationContext>
 * );
 *
 * export const App = () => (
 *     <Admin
 *         dataProvider={dataProvider}
 *         layout={BasicLayout}
 *         dashboard={Dashboard}
 *     >
 *         <Resource name="songs" list={SongList} />
 *         <Resource name="artists" list={ArtistList} />
 *     </Admin>
 * );
 */
export declare const MultiLevelMenu: (props: MultiLevelMenuProps) => ReactElement;
export declare type MultiLevelMenuVariants = 'categories' | 'default';
export interface MultiLevelMenuProps {
    children?: ReactNode;
    initialOpen?: boolean;
    variant?: MultiLevelMenuVariants;
}
