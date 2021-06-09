import { FC } from 'react';
import { MenuItemLinkProps, Identifier } from 'react-admin';
import { Location } from 'history';
/**
 * <MenuItemLink> equivalent, but with real-time update counts in badges
 *
 * @example
 *
 * import { RealTimeMenuItemLink } from '@react-admin/ra-realtime'
 *
 * const CustomMenu = ({ onMenuClick, logout }) => {
 *   const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
 *   const open = useSelector(state => state.admin.ui.sidebarOpen);
 *   const resources = useSelector(getResources);
 *   return (
 *       <div>
 *           {resources.map(resource => (
 *               <RealTimeMenuItemLink
 *                   key={resource.name}
 *                   to={`/${resource.name}`}
 *                   primaryText={resource.options && resource.options.label || resource.name}
 *                   leftIcon={createElement(resource.icon)}
 *                   resource={resource.name}
 *                   badgeColor={'primary'}
 *                   onClick={onMenuClick}
 *                   sidebarIsOpen={open}
 *               />
 *           ))}
 *           <RealTimeMenuItemLink
 *               to="/custom-route"
 *               primaryText="Miscellaneous"
 *               leftIcon={<LabelIcon />}
 *               resource={resource.name}
 *               badgeColor={'error'}
 *               onClick={onMenuClick}
 *               sidebarIsOpen={open}
 *           />
 *           {isXSmall && logout}
 *       </div>
 *   );
 * }
 */
declare const RealTimeMenuItemLink: FC<RealTimeMenuItemLinkProps>;
interface RealTimeMenuItemLinkProps extends MenuItemLinkProps {
    badgeColor?: 'default' | 'primary' | 'secondary' | 'error';
}
export declare const isMenuActive: (location: Location, menuProps: MenuItemLinkProps) => boolean;
export declare const getActiveRecordIdFromRoute: ({ pathname: currentPath }: Location, { to: menuPath }: MenuItemLinkProps) => Identifier;
export default RealTimeMenuItemLink;
