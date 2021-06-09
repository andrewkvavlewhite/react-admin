"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItem = void 0;
/* eslint react/display-name:off */
var React = __importStar(require("react"));
var react_1 = require("react");
var react_admin_1 = require("react-admin");
var react_redux_1 = require("react-redux");
var prop_types_1 = __importDefault(require("prop-types"));
var classnames_1 = __importDefault(require("classnames"));
var react_router_dom_1 = require("react-router-dom");
var ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
var List_1 = __importDefault(require("@material-ui/core/List"));
var ListItemIcon_1 = __importDefault(require("@material-ui/core/ListItemIcon"));
var ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
var ListItemSecondaryAction_1 = __importDefault(require("@material-ui/core/ListItemSecondaryAction"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Collapse_1 = __importDefault(require("@material-ui/core/Collapse"));
var styles_1 = require("@material-ui/core/styles");
var ExpandLess_1 = __importDefault(require("@material-ui/icons/ExpandLess"));
var ExpandMore_1 = __importDefault(require("@material-ui/icons/ExpandMore"));
var app_location_1 = require("../app-location");
var MultiLevelMenuContext_1 = require("./MultiLevelMenuContext");
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
exports.MenuItem = function (props) {
    var _a, _b;
    var children = props.children, classesOverride = props.classes, className = props.className, label = props.label, icon = props.icon, name = props.name, onClick = props.onClick, to = props.to, exact = props.exact, disableGutters = props.disableGutters, rest = __rest(props, ["children", "classes", "className", "label", "icon", "name", "onClick", "to", "exact", "disableGutters"]);
    var rootRef = react_1.useRef();
    var classes = useStyles(props);
    var translate = react_admin_1.useTranslate();
    var sidebarIsOpen = react_redux_1.useSelector(function (state) { return state.admin.ui.sidebarOpen; });
    var hasSubItems = react_1.Children.count(children) > 0;
    var match = app_location_1.useAppLocationMatcher();
    var multiLevelMenuContext = MultiLevelMenuContext_1.useMultiLevelMenu();
    var isActive = !!match(name);
    var _c = react_1.useState(isActive || multiLevelMenuContext.isOpen(name)), isOpen = _c[0], setIsOpenState = _c[1];
    var showSubMenuToggle = hasSubItems && (sidebarIsOpen || multiLevelMenuContext.hasCategories);
    react_1.useEffect(function () {
        if (multiLevelMenuContext.isFirstLoad &&
            multiLevelMenuContext.initialOpen) {
            multiLevelMenuContext.open(name);
            setIsOpenState(true);
        }
    }, []); // eslint-disable-line
    react_1.useEffect(function () {
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
    var handleMenuTap = react_1.useCallback(function (e) {
        onClick && onClick(e);
    }, [onClick]);
    var handleToggleSubMenu = function (event) {
        event.stopPropagation();
        event.preventDefault();
        setIsOpen(!isOpen);
    };
    var translatedLabel = react_1.isValidElement(label)
        ? label
        : translate(label.toString(), { _: label });
    return (React.createElement(React.Fragment, null,
        React.createElement(ListItem_1.default, __assign({ className: classnames_1.default(classes.root, className), ref: rootRef }, rest, { button: false, disableGutters: true, onClick: handleMenuTap }),
            React.createElement(react_router_dom_1.NavLink, { className: classnames_1.default(classes.link, (_a = {},
                    _a[classes.active] = !!isActive,
                    _a[classes.gutters] = !disableGutters,
                    _a)), to: to, exact: exact },
                icon && (React.createElement(ListItemIcon_1.default, { className: classes.icon }, react_1.cloneElement(icon, {
                    titleAccess: translatedLabel,
                }))),
                (sidebarIsOpen || multiLevelMenuContext.hasCategories) && (React.createElement(ListItemText_1.default, null, translatedLabel)),
                showSubMenuToggle && (React.createElement(ListItemSecondaryAction_1.default, { className: classes.icon },
                    React.createElement(IconButton_1.default, { onClick: handleToggleSubMenu, edge: "end", "aria-expanded": isOpen, "aria-controls": name + "-submenu", "aria-label": translate(isOpen
                            ? 'ra.action.close'
                            : 'ra.action.expand') }, isOpen ? (React.createElement(ExpandLess_1.default, null)) : (React.createElement(ExpandMore_1.default, null))))))),
        hasSubItems && (React.createElement(Collapse_1.default, { in: isOpen, component: function (props) { return (React.createElement("li", __assign({ id: name + "-submenu" }, props))); }, unmountOnExit: true },
            React.createElement(List_1.default, { className: classnames_1.default(classes.nestedList, (_b = {},
                    _b[classes.hiddenNestedList] = !showSubMenuToggle,
                    _b)), disablePadding: true }, children)))));
};
exports.MenuItem.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    icon: prop_types_1.default.element,
    onClick: prop_types_1.default.func,
    label: prop_types_1.default.node,
    staticContext: prop_types_1.default.object,
    to: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.object]).isRequired,
    sidebarIsOpen: prop_types_1.default.bool,
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
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
