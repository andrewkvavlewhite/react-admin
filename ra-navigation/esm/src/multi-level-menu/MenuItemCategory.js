var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
/* eslint react/display-name:off */
import * as React from 'react';
import { Children, cloneElement, isValidElement, useCallback, useEffect, useRef, useState, } from 'react';
import { useTranslate } from 'react-admin';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
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
export var MenuItemCategory = function (props) {
    var _a;
    var children = props.children, classesOverride = props.classes, className = props.className, label = props.label, icon = props.icon, name = props.name, onClick = props.onClick, to = props.to, exact = props.exact, rest = __rest(props, ["children", "classes", "className", "label", "icon", "name", "onClick", "to", "exact"]);
    var rootRef = useRef();
    var subMenuRef = useRef();
    var classes = useStyles(props);
    var theme = useTheme();
    var translate = useTranslate();
    var match = useAppLocationMatcher();
    var multiLevelMenuContext = useMultiLevelMenu();
    var sidebarIsOpen = useSelector(function (state) { return state.admin.ui.sidebarOpen; });
    var isActive = !!match(name);
    var _b = useState(isActive || multiLevelMenuContext.isOpen(name)), isSubMenuOpen = _b[0], setIsSubMenuOpenState = _b[1];
    var setIsSubmenuOpen = useCallback(function (isOpen) {
        multiLevelMenuContext.setIsOpen(name, isOpen);
        setIsSubMenuOpenState(isOpen);
    }, [multiLevelMenuContext, name]);
    useEffect(function () {
        var callback = function (openingName) {
            // We don't close items that starts with the same name
            // It avoid closing item when a submenu is selected
            if (!openingName.startsWith(name)) {
                setIsSubmenuOpen(false);
            }
        };
        multiLevelMenuContext.onOpen(callback);
        return function () { return multiLevelMenuContext.offOpen(callback); };
    }, [multiLevelMenuContext, name, setIsSubmenuOpen]);
    var hasSubItems = Children.count(children) > 0;
    var handleMenuTap = useCallback(function (event) {
        onClick && onClick(event);
        setIsSubmenuOpen(!isSubMenuOpen);
    }, [isSubMenuOpen, onClick, setIsSubmenuOpen]);
    useEffect(function () {
        multiLevelMenuContext.setHasCategories(true);
        if (subMenuRef.current) {
            autoFocusFirstSubMenuItem(subMenuRef.current);
        }
    }, [multiLevelMenuContext]);
    var handleCloseSubMenu = function () {
        setIsSubmenuOpen(false);
    };
    useEffect(function () {
        if (!isActive) {
            setIsSubmenuOpen(false);
        }
    }, [isActive, setIsSubmenuOpen]);
    var translatedLabel = isValidElement(label)
        ? label
        : translate(label.toString(), { _: label });
    if (to && hasSubItems && process.env.NODE_ENV !== 'production') {
        console.warn('A <MenuItemCategory> cannot have children and a to prop set');
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(ListItem, __assign({ className: classnames(classes.root, className, (_a = {},
                _a[classes.active] = isActive,
                _a)), ref: rootRef }, rest, { button: false, onClick: handleMenuTap }), to && !hasSubItems ? (React.createElement(NavLink, { className: classes.link, to: to, exact: exact },
            icon && (React.createElement(ListItemIcon, { className: classes.icon }, cloneElement(icon, {
                titleAccess: translatedLabel,
            }))),
            sidebarIsOpen && (React.createElement(ListItemText, null, translatedLabel)))) : (React.createElement("div", { className: classes.link },
            icon && (React.createElement(ListItemIcon, { className: classes.icon }, cloneElement(icon, {
                titleAccess: translatedLabel,
            }))),
            sidebarIsOpen && (React.createElement(ListItemText, null, translatedLabel))))),
        hasSubItems && (React.createElement(Popover, { anchorEl: rootRef.current, anchorOrigin: AnchorOrigin, transformOrigin: TransformOrigin, container: multiLevelMenuContext.rootRef.current, open: isSubMenuOpen, onClick: handleCloseSubMenu, onClose: handleCloseSubMenu, classes: {
                paper: classes.popoverPaper,
            }, TransitionComponent: Slide, 
            // @ts-ignore
            TransitionProps: TransitionProps, style: {
                // @ts-ignore
                zIndex: theme.zIndex.appBar - 100 + " !important",
            } },
            React.createElement(IconButton, { "aria-label": translate('ra.action.close'), className: classes.closeButton, onClick: handleCloseSubMenu },
                React.createElement(CloseIcon, null)),
            children))));
};
var AnchorOrigin = { vertical: 'top', horizontal: 'right' };
var TransformOrigin = { vertical: 'top', horizontal: 'left' };
var TransitionProps = { direction: 'right' };
function autoFocusFirstSubMenuItem(element) {
    setTimeout(function () {
        var focusables = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusables.length > 0) {
            focusables[0].focus();
        }
    }, 150);
}
MenuItemCategory.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    icon: PropTypes.element,
    onClick: PropTypes.func,
    label: PropTypes.node,
    staticContext: PropTypes.object,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
var useStyles = makeStyles(function (theme) { return ({
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
        paddingRight: theme.spacing(4),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
    },
}); }, {
    name: 'RaMenuItemCategory',
});
