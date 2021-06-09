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
exports.MenuItemCategory = void 0;
/* eslint react/display-name:off */
var React = __importStar(require("react"));
var react_1 = require("react");
var react_admin_1 = require("react-admin");
var react_redux_1 = require("react-redux");
var prop_types_1 = __importDefault(require("prop-types"));
var classnames_1 = __importDefault(require("classnames"));
var react_router_dom_1 = require("react-router-dom");
var ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
var ListItemIcon_1 = __importDefault(require("@material-ui/core/ListItemIcon"));
var ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
var Popover_1 = __importDefault(require("@material-ui/core/Popover"));
var IconButton_1 = __importDefault(require("@material-ui/core/IconButton"));
var Slide_1 = __importDefault(require("@material-ui/core/Slide"));
var styles_1 = require("@material-ui/core/styles");
var Close_1 = __importDefault(require("@material-ui/icons/Close"));
var MultiLevelMenuContext_1 = require("./MultiLevelMenuContext");
var app_location_1 = require("../app-location");
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
exports.MenuItemCategory = function (props) {
    var _a;
    var children = props.children, classesOverride = props.classes, className = props.className, label = props.label, icon = props.icon, name = props.name, onClick = props.onClick, to = props.to, exact = props.exact, rest = __rest(props, ["children", "classes", "className", "label", "icon", "name", "onClick", "to", "exact"]);
    var rootRef = react_1.useRef();
    var subMenuRef = react_1.useRef();
    var classes = useStyles(props);
    var theme = styles_1.useTheme();
    var translate = react_admin_1.useTranslate();
    var match = app_location_1.useAppLocationMatcher();
    var multiLevelMenuContext = MultiLevelMenuContext_1.useMultiLevelMenu();
    var sidebarIsOpen = react_redux_1.useSelector(function (state) { return state.admin.ui.sidebarOpen; });
    var isActive = !!match(name);
    var _b = react_1.useState(isActive || multiLevelMenuContext.isOpen(name)), isSubMenuOpen = _b[0], setIsSubMenuOpenState = _b[1];
    var setIsSubmenuOpen = react_1.useCallback(function (isOpen) {
        multiLevelMenuContext.setIsOpen(name, isOpen);
        setIsSubMenuOpenState(isOpen);
    }, [multiLevelMenuContext, name]);
    react_1.useEffect(function () {
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
    var hasSubItems = react_1.Children.count(children) > 0;
    var handleMenuTap = react_1.useCallback(function (event) {
        onClick && onClick(event);
        setIsSubmenuOpen(!isSubMenuOpen);
    }, [isSubMenuOpen, onClick, setIsSubmenuOpen]);
    react_1.useEffect(function () {
        multiLevelMenuContext.setHasCategories(true);
        if (subMenuRef.current) {
            autoFocusFirstSubMenuItem(subMenuRef.current);
        }
    }, [multiLevelMenuContext]);
    var handleCloseSubMenu = function () {
        setIsSubmenuOpen(false);
    };
    react_1.useEffect(function () {
        if (!isActive) {
            setIsSubmenuOpen(false);
        }
    }, [isActive, setIsSubmenuOpen]);
    var translatedLabel = react_1.isValidElement(label)
        ? label
        : translate(label.toString(), { _: label });
    if (to && hasSubItems && process.env.NODE_ENV !== 'production') {
        console.warn('A <MenuItemCategory> cannot have children and a to prop set');
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(ListItem_1.default, __assign({ className: classnames_1.default(classes.root, className, (_a = {},
                _a[classes.active] = isActive,
                _a)), ref: rootRef }, rest, { button: false, onClick: handleMenuTap }), to && !hasSubItems ? (React.createElement(react_router_dom_1.NavLink, { className: classes.link, to: to, exact: exact },
            icon && (React.createElement(ListItemIcon_1.default, { className: classes.icon }, react_1.cloneElement(icon, {
                titleAccess: translatedLabel,
            }))),
            sidebarIsOpen && (React.createElement(ListItemText_1.default, null, translatedLabel)))) : (React.createElement("div", { className: classes.link },
            icon && (React.createElement(ListItemIcon_1.default, { className: classes.icon }, react_1.cloneElement(icon, {
                titleAccess: translatedLabel,
            }))),
            sidebarIsOpen && (React.createElement(ListItemText_1.default, null, translatedLabel))))),
        hasSubItems && (React.createElement(Popover_1.default, { anchorEl: rootRef.current, anchorOrigin: AnchorOrigin, transformOrigin: TransformOrigin, container: multiLevelMenuContext.rootRef.current, open: isSubMenuOpen, onClick: handleCloseSubMenu, onClose: handleCloseSubMenu, classes: {
                paper: classes.popoverPaper,
            }, TransitionComponent: Slide_1.default, 
            // @ts-ignore
            TransitionProps: TransitionProps, style: {
                // @ts-ignore
                zIndex: theme.zIndex.appBar - 100 + " !important",
            } },
            React.createElement(IconButton_1.default, { "aria-label": translate('ra.action.close'), className: classes.closeButton, onClick: handleCloseSubMenu },
                React.createElement(Close_1.default, null)),
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
exports.MenuItemCategory.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    icon: prop_types_1.default.element,
    onClick: prop_types_1.default.func,
    label: prop_types_1.default.node,
    staticContext: prop_types_1.default.object,
    to: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.object]),
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
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
