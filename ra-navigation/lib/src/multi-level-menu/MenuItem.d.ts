import { FC, ReactElement, ReactNode } from 'react';
import { StaticContext } from 'react-router';
import { NavLinkProps } from 'react-router-dom';
import { ListItemProps } from '@material-ui/core/ListItem';
/**
 * The <MenuItem> component is used to display a single item inside a <MultiLevelMenu> component.
 * @see Breadcrumb
 *
 * It accepts <MenuItems> children which will be displayed inside a collapsible container.
 *
 * @example <caption>Simple Menu</caption>
 * import * as React from 'react';
 * import { Admin, Resource, Layout } from 'react-admin';
 * import { MultiLevelMenu, MenuItem } from '@react-admin/ra-navigation';
 * import { Dashboard } from './Dashboard';
 * import { SongList } from './SongList';
 * import { ArtistList } from './ArtistList';
 *
 * const MyMenu = () => (
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
 * const MyLayout = props => (
 *     <AppLocationContext>
 *         <Layout {...props} menu={MyMenu} />
 *     </AppLocationContext>
 * );
 *
 * export const App = () => (
 *     <Admin
 *         dataProvider={dataProvider}
 *         layout={MyLayout}
 *         dashboard={Dashboard}
 *     >
 *         <Resource name="songs" list={SongList} />
 *         <Resource name="artists" list={ArtistList} />
 *     </Admin>
 * );
 */
export declare const MenuItem: FC<MenuItemProps>;
interface Props {
    icon?: ReactElement;
    name: string;
    label?: ReactNode;
    staticContext?: StaticContext;
    sidebarIsOpen?: boolean;
}
export declare type MenuItemProps = Props & NavLinkProps & ListItemProps<'li', {
    button?: true;
}>;
export {};
