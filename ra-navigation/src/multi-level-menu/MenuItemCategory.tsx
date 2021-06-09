/* eslint react/display-name:off */
import * as React from 'react';
import {
    Children,
    FC,
    cloneElement,
    isValidElement,
    MouseEvent,
    ReactElement,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { ReduxState, useTranslate } from 'react-admin';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { StaticContext } from 'react-router';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { LocationDescriptor, Location } from 'history';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Popover, { PopoverOrigin } from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import { useMultiLevelMenu } from './MultiLevelMenuContext';
import { useAppLocationMatcher } from '../app-location';

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
export const MenuItemCategory: FC<MenuItemCategoryProps> = props => {
    const {
        children,
        classes: classesOverride,
        className,
        label,
        icon,
        name,
        onClick,
        to,
        exact,
        ...rest
    } = props;
    const rootRef = useRef<HTMLLIElement>();
    const subMenuRef = useRef();
    const classes = useStyles(props);
    const theme = useTheme();
    const translate = useTranslate();
    const match = useAppLocationMatcher();
    const multiLevelMenuContext = useMultiLevelMenu();
    const sidebarIsOpen = useSelector(
        (state: ReduxState) => state.admin.ui.sidebarOpen
    );

    const isActive = !!match(name);
    const [isSubMenuOpen, setIsSubMenuOpenState] = useState(
        isActive || multiLevelMenuContext.isOpen(name)
    );

    const setIsSubmenuOpen = useCallback(
        (isOpen: boolean): void => {
            multiLevelMenuContext.setIsOpen(name, isOpen);
            setIsSubMenuOpenState(isOpen);
        },
        [multiLevelMenuContext, name]
    );

    useEffect(() => {
        const callback = (openingName: string): void => {
            // We don't close items that starts with the same name
            // It avoid closing item when a submenu is selected
            if (!openingName.startsWith(name)) {
                setIsSubmenuOpen(false);
            }
        };

        multiLevelMenuContext.onOpen(callback);
        return (): void => multiLevelMenuContext.offOpen(callback);
    }, [multiLevelMenuContext, name, setIsSubmenuOpen]);

    const hasSubItems = Children.count(children) > 0;

    const handleMenuTap = useCallback(
        (event: MouseEvent<HTMLLIElement>) => {
            onClick && onClick(event);
            setIsSubmenuOpen(!isSubMenuOpen);
        },
        [isSubMenuOpen, onClick, setIsSubmenuOpen]
    );

    useEffect(() => {
        multiLevelMenuContext.setHasCategories(true);
        if (subMenuRef.current) {
            autoFocusFirstSubMenuItem(subMenuRef.current);
        }
    }, [multiLevelMenuContext]);

    const handleCloseSubMenu = (): void => {
        setIsSubmenuOpen(false);
    };

    useEffect(() => {
        if (!isActive) {
            setIsSubmenuOpen(false);
        }
    }, [isActive, setIsSubmenuOpen]);

    const translatedLabel = isValidElement(label)
        ? label
        : translate(label.toString(), { _: label });

    if (to && hasSubItems && process.env.NODE_ENV !== 'production') {
        console.warn(
            'A <MenuItemCategory> cannot have children and a to prop set'
        );
    }

    return (
        <>
            <ListItem
                className={classnames(classes.root, className, {
                    [classes.active]: isActive,
                })}
                ref={rootRef}
                {...rest}
                button={false}
                onClick={handleMenuTap}
            >
                {to && !hasSubItems ? (
                    <NavLink className={classes.link} to={to} exact={exact}>
                        {icon && (
                            <ListItemIcon className={classes.icon}>
                                {cloneElement(icon, {
                                    titleAccess: translatedLabel,
                                })}
                            </ListItemIcon>
                        )}
                        {sidebarIsOpen && (
                            <ListItemText>{translatedLabel}</ListItemText>
                        )}
                    </NavLink>
                ) : (
                    <div className={classes.link}>
                        {icon && (
                            <ListItemIcon className={classes.icon}>
                                {cloneElement(icon, {
                                    titleAccess: translatedLabel,
                                })}
                            </ListItemIcon>
                        )}
                        {sidebarIsOpen && (
                            <ListItemText>{translatedLabel}</ListItemText>
                        )}
                    </div>
                )}
            </ListItem>
            {hasSubItems && (
                <Popover
                    anchorEl={rootRef.current}
                    anchorOrigin={AnchorOrigin}
                    transformOrigin={TransformOrigin}
                    container={multiLevelMenuContext.rootRef.current}
                    open={isSubMenuOpen}
                    onClick={handleCloseSubMenu}
                    onClose={handleCloseSubMenu}
                    classes={{
                        paper: classes.popoverPaper,
                    }}
                    TransitionComponent={Slide}
                    // @ts-ignore
                    TransitionProps={TransitionProps}
                    style={{
                        // @ts-ignore
                        zIndex: `${theme.zIndex.appBar - 100} !important`,
                    }}
                >
                    <IconButton
                        aria-label={translate('ra.action.close')}
                        className={classes.closeButton}
                        onClick={handleCloseSubMenu}
                    >
                        <CloseIcon />
                    </IconButton>
                    {children}
                </Popover>
            )}
        </>
    );
};

const AnchorOrigin: PopoverOrigin = { vertical: 'top', horizontal: 'right' };
const TransformOrigin: PopoverOrigin = { vertical: 'top', horizontal: 'left' };
const TransitionProps = { direction: 'right' };

function autoFocusFirstSubMenuItem(element: HTMLElement): void {
    setTimeout(() => {
        const focusables = element.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusables.length > 0) {
            focusables[0].focus();
        }
    }, 150);
}

interface Props {
    icon?: ReactElement;
    name: string;
    label?: ReactNode;
    staticContext?: StaticContext;
    to?: LocationDescriptor | ((location: Location) => LocationDescriptor);
}

export type MenuItemCategoryProps = Props &
    Omit<NavLinkProps, 'to'> &
    ListItemProps<'li', { button?: true }>; // HACK: https://github.com/mui-org/material-ui/issues/16245

MenuItemCategory.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    icon: PropTypes.element,
    onClick: PropTypes.func,
    label: PropTypes.node,
    staticContext: PropTypes.object,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

const useStyles = makeStyles(
    theme => ({
        root: {
            color: theme.palette.common.white,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            padding: theme.spacing(1),

            '&:hover': {
                backgroundColor: theme.palette.grey[700],
            },
        },
        link: {
            whiteSpace: 'nowrap',
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& span': {
                fontSize: theme.typography.caption.fontSize,
            },
        },
        active: {
            backgroundColor: theme.palette.grey[300],
            color: theme.palette.common.black,
            '&:hover': {
                backgroundColor: theme.palette.grey[200],
            },
        },
        icon: {
            color: 'inherit',
            minWidth: 0,
        },
        popoverPaper: {
            backgroundColor: theme.palette.background.paper,
            minHeight: '50%',
            minWidth: '25%',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            paddingRight: theme.spacing(4), // Some space to ensure the close button is visible
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
        },
    }),
    {
        name: 'RaMenuItemCategory',
    }
);
