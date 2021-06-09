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
export var MenuItem = function (props) {
    var _a, _b;
    var children = props.children, classesOverride = props.classes, className = props.className, label = props.label, icon = props.icon, name = props.name, onClick = props.onClick, to = props.to, exact = props.exact, disableGutters = props.disableGutters, rest = __rest(props, ["children", "classes", "className", "label", "icon", "name", "onClick", "to", "exact", "disableGutters"]);
    var rootRef = useRef();
    var classes = useStyles(props);
    var translate = useTranslate();
    var sidebarIsOpen = useSelector(function (state) { return state.admin.ui.sidebarOpen; });
    var hasSubItems = Children.count(children) > 0;
    var match = useAppLocationMatcher();
    var multiLevelMenuContext = useMultiLevelMenu();
    var isActive = !!match(name);
    var _c = useState(isActive || multiLevelMenuContext.isOpen(name)), isOpen = _c[0], setIsOpenState = _c[1];
    var showSubMenuToggle = hasSubItems && (sidebarIsOpen || multiLevelMenuContext.hasCategories);
    useEffect(function () {
        if (multiLevelMenuContext.isFirstLoad &&
            multiLevelMenuContext.initialOpen) {
            multiLevelMenuContext.open(name);
            setIsOpenState(true);
        }
    }, []); // eslint-disable-line
    useEffect(function () {
        // Automatically open submenu if needed on location change
        if (isActive && !multiLevelMenuContext.isOpen(name)) {
            multiLevelMenuContext.open(name);
            setIsOpenState(true);
        }
    }, [isActive, multiLevelMenuContext, name]);
    var setIsOpen = function (isOpen) {
        multiLevelMenuContext.setIsOpen(name, isOpen);
        setIsOpenState(isOpen);
    };
    var handleMenuTap = useCallback(function (e) {
        onClick && onClick(e);
    }, [onClick]);
    var handleToggleSubMenu = function (event) {
        event.stopPropagation();
        event.preventDefault();
        setIsOpen(!isOpen);
    };
    var translatedLabel = isValidElement(label)
        ? label
        : translate(label.toString(), { _: label });
    return (React.createElement(React.Fragment, null,
        React.createElement(ListItem, __assign({ className: classnames(classes.root, className), ref: rootRef }, rest, { button: false, disableGutters: true, onClick: handleMenuTap }),
            React.createElement(NavLink, { className: classnames(classes.link, (_a = {},
                    _a[classes.active] = !!isActive,
                    _a[classes.gutters] = !disableGutters,
                    _a)), to: to, exact: exact },
                icon && (React.createElement(ListItemIcon, { className: classes.icon }, cloneElement(icon, {
                    titleAccess: translatedLabel,
                }))),
                (sidebarIsOpen || multiLevelMenuContext.hasCategories) && (React.createElement(ListItemText, null, translatedLabel)),
                showSubMenuToggle && (React.createElement(ListItemSecondaryAction, { className: classes.icon },
                    React.createElement(IconButton, { onClick: handleToggleSubMenu, edge: "end", "aria-expanded": isOpen, "aria-controls": name + "-submenu", "aria-label": translate(isOpen
                            ? 'ra.action.close'
                            : 'ra.action.expand') }, isOpen ? (React.createElement(ExpandLessIcon, null)) : (React.createElement(ExpandMoreIcon, null))))))),
        hasSubItems && (React.createElement(Collapse, { in: isOpen, component: function (props) { return (React.createElement("li", __assign({ id: name + "-submenu" }, props))); }, unmountOnExit: true },
            React.createElement(List, { className: classnames(classes.nestedList, (_b = {},
                    _b[classes.hiddenNestedList] = !showSubMenuToggle,
                    _b)), disablePadding: true }, children)))));
};
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
var useStyles = makeStyles(function (theme) { return ({
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
}); }, { name: 'RaMenuItem' });
