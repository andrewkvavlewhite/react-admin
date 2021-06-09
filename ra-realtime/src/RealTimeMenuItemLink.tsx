import React, {
    forwardRef,
    cloneElement,
    useCallback,
    FC,
    useState,
    useEffect,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom';
import { MenuItem, ListItemIcon, Tooltip, Badge } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { MenuItemLinkProps, Identifier } from 'react-admin';

import { Location } from 'history';

import { useSubscribeToRecordList } from './dataProvider';

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

// This component is a copy of MenuItemLink with some specific changes for the badges
const RealTimeMenuItemLink: FC<RealTimeMenuItemLinkProps> = forwardRef(
    (props, ref) => {
        const {
            classes: classesOverride,
            className,
            primaryText,
            leftIcon,
            resource,
            badgeColor = 'error',
            onClick,
            sidebarIsOpen,
            ...rest
        } = props;
        const classes = useStyles(props);
        const location = useLocation();
        const [countEvent, setCountEvent] = useState(0);
        useSubscribeToRecordList(resource, event => {
            let count = event.payload.ids.length;
            if (isMenuActive(location, props)) {
                const activeRecordId = getActiveRecordIdFromRoute(
                    location,
                    props
                );
                if (activeRecordId == null) {
                    return;
                }
                count = event.payload.ids.filter(
                    id => `${id}` !== activeRecordId
                ).length;
            }

            if (count) {
                setCountEvent(previous => previous + count);
            }
        });

        useEffect(() => {
            // Reset the counter when the Menu path is the current path (i.e. when the resource List is displayed)
            if (location.pathname === props.to) {
                setCountEvent(0);
            }
        }, [location, props.to]);

        const handleMenuTap = useCallback(
            e => {
                onClick && onClick(e);
            },
            [onClick]
        );

        const renderMenuItem = (): any => {
            return (
                <MenuItem
                    className={classnames(classes.root, className)}
                    activeClassName={classes.active}
                    component={NavLinkRef}
                    ref={ref}
                    {...rest}
                    onClick={handleMenuTap}
                >
                    {/* Badge should wrap the icon if it exists, and the menu text instead */}
                    {leftIcon ? (
                        <>
                            <StyledBadgeForIcon
                                badgeContent={countEvent}
                                color={badgeColor}
                            >
                                <ListItemIcon className={classes.icon}>
                                    {cloneElement(leftIcon, {
                                        titleAccess: primaryText,
                                    })}
                                </ListItemIcon>
                            </StyledBadgeForIcon>
                            {primaryText}
                        </>
                    ) : (
                        <StyledBadgeForText
                            badgeContent={countEvent}
                            color={badgeColor}
                        >
                            {primaryText}
                        </StyledBadgeForText>
                    )}
                </MenuItem>
            );
        };

        if (sidebarIsOpen) {
            return renderMenuItem();
        }

        return (
            <Tooltip title={primaryText} placement="right">
                {renderMenuItem()}
            </Tooltip>
        );
    }
);

RealTimeMenuItemLink.displayName = 'RealTimeMenuItemLink';

RealTimeMenuItemLink.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    leftIcon: PropTypes.element,
    onClick: PropTypes.func,
    primaryText: PropTypes.node,
    resource: PropTypes.string,
    badgeColor: PropTypes.oneOf(['default', 'error', 'primary', 'secondary']),
    staticContext: PropTypes.object,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    sidebarIsOpen: PropTypes.bool,
};

interface RealTimeMenuItemLinkProps extends MenuItemLinkProps {
    badgeColor?: 'default' | 'primary' | 'secondary' | 'error';
}

const NavLinkRef = forwardRef<HTMLAnchorElement, NavLinkProps>((props, ref) => (
    <NavLink innerRef={ref} {...props} />
));

NavLinkRef.displayName = 'NavLinkRef';

const useStyles = makeStyles(
    theme => ({
        root: {
            color: theme.palette.text.secondary,
        },
        active: {
            color: theme.palette.text.primary,
        },
        icon: { minWidth: theme.spacing(5) },
    }),
    { name: 'RaMenuItemLink' }
);

const StyledBadgeForIcon = withStyles(theme => ({
    badge: {
        right: 12,
        top: 3,
        border: `1px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

const StyledBadgeForText = withStyles(theme => ({
    badge: {
        top: 3,
        border: `1px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

export const isMenuActive = (
    location: Location,
    menuProps: MenuItemLinkProps
): boolean =>
    location.pathname === menuProps.to ||
    location.pathname.includes(`${menuProps.to}/`);

export const getActiveRecordIdFromRoute = (
    { pathname: currentPath }: Location,
    { to: menuPath }: MenuItemLinkProps
): Identifier => {
    const startIndex =
        currentPath.indexOf(menuPath.toString()) +
        menuPath.toString().length +
        1;
    let endIndex = currentPath.indexOf('/', startIndex);
    if (endIndex === -1) {
        endIndex = currentPath.length;
    }
    if (endIndex <= startIndex) {
        return null;
    }
    return currentPath.substring(startIndex, endIndex);
};

export default RealTimeMenuItemLink;
