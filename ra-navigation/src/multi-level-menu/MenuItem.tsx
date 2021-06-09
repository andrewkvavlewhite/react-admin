/* eslint react/display-name:off */
import * as React from 'react';
import {
    Children,
    FC,
    cloneElement,
    isValidElement,
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
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useAppLocationMatcher } from '../app-location';
import { useMultiLevelMenu } from './MultiLevelMenuContext';

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
export const MenuItem: FC<MenuItemProps> = props => {
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
        disableGutters,
        ...rest
    } = props;
    const rootRef = useRef();
    const classes = useStyles(props);
    const translate = useTranslate();
    const sidebarIsOpen = useSelector(
        (state: ReduxState) => state.admin.ui.sidebarOpen
    );
    const hasSubItems = Children.count(children) > 0;

    const match = useAppLocationMatcher();
    const multiLevelMenuContext = useMultiLevelMenu();
    const isActive = !!match(name);
    const [isOpen, setIsOpenState] = useState(
        isActive || multiLevelMenuContext.isOpen(name)
    );
    const showSubMenuToggle =
        hasSubItems && (sidebarIsOpen || multiLevelMenuContext.hasCategories);

    useEffect(() => {
        if (
            multiLevelMenuContext.isFirstLoad &&
            multiLevelMenuContext.initialOpen
        ) {
            multiLevelMenuContext.open(name);
            setIsOpenState(true);
        }
    }, []); // eslint-disable-line

    useEffect(() => {
        // Automatically open submenu if needed on location change
        if (isActive && !multiLevelMenuContext.isOpen(name)) {
            multiLevelMenuContext.open(name);
            setIsOpenState(true);
        }
    }, [isActive, multiLevelMenuContext, name]);

    const setIsOpen = (isOpen: boolean): void => {
        multiLevelMenuContext.setIsOpen(name, isOpen);
        setIsOpenState(isOpen);
    };

    const handleMenuTap = useCallback(
        e => {
            onClick && onClick(e);
        },
        [onClick]
    );

    const handleToggleSubMenu = (event): void => {
        event.stopPropagation();
        event.preventDefault();
        setIsOpen(!isOpen);
    };

    const translatedLabel = isValidElement(label)
        ? label
        : translate(label.toString(), { _: label });

    return (
        <>
            <ListItem
                className={classnames(classes.root, className)}
                ref={rootRef}
                {...rest}
                button={false}
                disableGutters
                onClick={handleMenuTap}
            >
                <NavLink
                    className={classnames(classes.link, {
                        [classes.active]: !!isActive,
                        [classes.gutters]: !disableGutters,
                    })}
                    to={to}
                    exact={exact}
                >
                    {icon && (
                        <ListItemIcon className={classes.icon}>
                            {cloneElement(icon, {
                                titleAccess: translatedLabel,
                            })}
                        </ListItemIcon>
                    )}
                    {(sidebarIsOpen || multiLevelMenuContext.hasCategories) && (
                        <ListItemText>{translatedLabel}</ListItemText>
                    )}
                    {showSubMenuToggle && (
                        <ListItemSecondaryAction className={classes.icon}>
                            <IconButton
                                onClick={handleToggleSubMenu}
                                edge="end"
                                aria-expanded={isOpen}
                                aria-controls={`${name}-submenu`}
                                aria-label={translate(
                                    isOpen
                                        ? 'ra.action.close'
                                        : 'ra.action.expand'
                                )}
                            >
                                {isOpen ? (
                                    <ExpandLessIcon />
                                ) : (
                                    <ExpandMoreIcon />
                                )}
                            </IconButton>
                        </ListItemSecondaryAction>
                    )}
                </NavLink>
            </ListItem>
            {hasSubItems && (
                <Collapse
                    in={isOpen}
                    component={(props): ReactElement => (
                        <li id={`${name}-submenu`} {...props} />
                    )}
                    unmountOnExit
                >
                    <List
                        className={classnames(classes.nestedList, {
                            [classes.hiddenNestedList]: !showSubMenuToggle,
                        })}
                        disablePadding
                    >
                        {children}
                    </List>
                </Collapse>
            )}
        </>
    );
};

interface Props {
    icon?: ReactElement;
    name: string;
    label?: ReactNode;
    staticContext?: StaticContext;
    sidebarIsOpen?: boolean;
}

export type MenuItemProps = Props &
    NavLinkProps &
    ListItemProps<'li', { button?: true }>; // HACK: https://github.com/mui-org/material-ui/issues/16245

MenuItem.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    icon: PropTypes.element,
    onClick: PropTypes.func,
    label: PropTypes.node,
    staticContext: PropTypes.object,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    sidebarIsOpen: PropTypes.bool,
};

const useStyles = makeStyles(
    theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            padding: theme.spacing(0),
        },
        link: {
            color: theme.palette.text.secondary,
            whiteSpace: 'nowrap',
            textDecoration: 'none',
            display: 'flex',
            padding: theme.spacing(1, 0),
            '&:hover': {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.grey[200],
            },
        },
        gutters: {
            padding: theme.spacing(1, 2),
        },
        active: {
            color: theme.palette.text.primary,
        },
        icon: {
            color: 'inherit',
            minWidth: theme.spacing(5),
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        nestedList: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            paddingLeft: theme.spacing(4),
        },
        hiddenNestedList: {
            display: 'none',
        },
    }),
    { name: 'RaMenuItem' }
);
