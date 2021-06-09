import { FC, ReactElement, ReactNode } from 'react';
import { StaticContext } from 'react-router';
import { NavLinkProps } from 'react-router-dom';
import { LocationDescriptor, Location } from 'history';
import { ListItemProps } from '@material-ui/core/ListItem';
/**
 * The <MenuItemCategory> component is used to display a single category item inside a <MultiLevelMenu> component.
 * @see MultiLevelMenu
 *
 * It accepts <MenuItems> children which will be displayed inside a collapsible container.
 *
 * @example <caption>Category Menu</caption>
 * import * as React from 'react';
 * import { Admin, Resource, Layout } from 'react-admin';
 * import { MultiLevelMenu, MenuItem } from '@react-admin/ra-navigation';
 * import { Dashboard } from './Dashboard';
 * import { SongList } from './SongList';
 * import { ArtistList } from './ArtistList';
 *
 * const MyMenu = () => (
 *     <MultiLevelMenu variant="categories">
 *         <MenuItemCategory name="dashboard" to="/" exact label="Dashboard" />
 *         <MenuItemCategory name="songs" to="/songs" label="Songs" />
 *         <MenuItemCategory name="artists" to={'/artists?filter={}'} label="Artists">
 *             <Typography variant="h3">By genre</Typography>
 *             <Menu>
 *                 <MenuItem name="artists.rock" to={'/artists?filter={"type":"Rock"}'} label="Rock" />
 *                 <MenuItem name="artists.jazz" to={'/artists?filter={"type":"Jazz"}'} label="Jazz" />
 *             </Menu>
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
export declare const MenuItemCategory: FC<MenuItemCategoryProps>;
interface Props {
    icon?: ReactElement;
    name: string;
    label?: ReactNode;
    staticContext?: StaticContext;
    to?: LocationDescriptor | ((location: Location) => LocationDescriptor);
}
export declare type MenuItemCategoryProps = Props & Omit<NavLinkProps, 'to'> & ListItemProps<'li', {
    button?: true;
}>;
export {};
