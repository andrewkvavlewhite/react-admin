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
exports.getActiveRecordIdFromRoute = exports.isMenuActive = void 0;
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var classnames_1 = __importDefault(require("classnames"));
var react_router_dom_1 = require("react-router-dom");
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var dataProvider_1 = require("./dataProvider");
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
var RealTimeMenuItemLink = react_1.forwardRef(function (props, ref) {
    var classesOverride = props.classes, className = props.className, primaryText = props.primaryText, leftIcon = props.leftIcon, resource = props.resource, _a = props.badgeColor, badgeColor = _a === void 0 ? 'error' : _a, onClick = props.onClick, sidebarIsOpen = props.sidebarIsOpen, rest = __rest(props, ["classes", "className", "primaryText", "leftIcon", "resource", "badgeColor", "onClick", "sidebarIsOpen"]);
    var classes = useStyles(props);
    var location = react_router_dom_1.useLocation();
    var _b = react_1.useState(0), countEvent = _b[0], setCountEvent = _b[1];
    dataProvider_1.useSubscribeToRecordList(resource, function (event) {
        var count = event.payload.ids.length;
        if (exports.isMenuActive(location, props)) {
            var activeRecordId_1 = exports.getActiveRecordIdFromRoute(location, props);
            if (activeRecordId_1 == null) {
                return;
            }
            count = event.payload.ids.filter(function (id) { return "" + id !== activeRecordId_1; }).length;
        }
        if (count) {
            setCountEvent(function (previous) { return previous + count; });
        }
    });
    react_1.useEffect(function () {
        // Reset the counter when the Menu path is the current path (i.e. when the resource List is displayed)
        if (location.pathname === props.to) {
            setCountEvent(0);
        }
    }, [location, props.to]);
    var handleMenuTap = react_1.useCallback(function (e) {
        onClick && onClick(e);
    }, [onClick]);
    var renderMenuItem = function () {
        return (react_1.default.createElement(core_1.MenuItem, __assign({ className: classnames_1.default(classes.root, className), activeClassName: classes.active, component: NavLinkRef, ref: ref }, rest, { onClick: handleMenuTap }), leftIcon ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(StyledBadgeForIcon, { badgeContent: countEvent, color: badgeColor },
                react_1.default.createElement(core_1.ListItemIcon, { className: classes.icon }, react_1.cloneElement(leftIcon, {
                    titleAccess: primaryText,
                }))),
            primaryText)) : (react_1.default.createElement(StyledBadgeForText, { badgeContent: countEvent, color: badgeColor }, primaryText))));
    };
    if (sidebarIsOpen) {
        return renderMenuItem();
    }
    return (react_1.default.createElement(core_1.Tooltip, { title: primaryText, placement: "right" }, renderMenuItem()));
});
RealTimeMenuItemLink.displayName = 'RealTimeMenuItemLink';
RealTimeMenuItemLink.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    leftIcon: prop_types_1.default.element,
    onClick: prop_types_1.default.func,
    primaryText: prop_types_1.default.node,
    resource: prop_types_1.default.string,
    badgeColor: prop_types_1.default.oneOf(['default', 'error', 'primary', 'secondary']),
    staticContext: prop_types_1.default.object,
    to: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.object]).isRequired,
    sidebarIsOpen: prop_types_1.default.bool,
};
var NavLinkRef = react_1.forwardRef(function (props, ref) { return (react_1.default.createElement(react_router_dom_1.NavLink, __assign({ innerRef: ref }, props))); });
NavLinkRef.displayName = 'NavLinkRef';
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        color: theme.palette.text.secondary,
    },
    active: {
        color: theme.palette.text.primary,
    },
    icon: { minWidth: theme.spacing(5) },
}); }, { name: 'RaMenuItemLink' });
var StyledBadgeForIcon = styles_1.withStyles(function (theme) { return ({
    badge: {
        right: 12,
        top: 3,
        border: "1px solid " + theme.palette.background.paper,
        padding: '0 4px',
    },
}); })(core_1.Badge);
var StyledBadgeForText = styles_1.withStyles(function (theme) { return ({
    badge: {
        top: 3,
        border: "1px solid " + theme.palette.background.paper,
        padding: '0 4px',
    },
}); })(core_1.Badge);
exports.isMenuActive = function (location, menuProps) {
    return location.pathname === menuProps.to ||
        location.pathname.includes(menuProps.to + "/");
};
exports.getActiveRecordIdFromRoute = function (_a, _b) {
    var currentPath = _a.pathname;
    var menuPath = _b.to;
    var startIndex = currentPath.indexOf(menuPath.toString()) +
        menuPath.toString().length +
        1;
    var endIndex = currentPath.indexOf('/', startIndex);
    if (endIndex === -1) {
        endIndex = currentPath.length;
    }
    if (endIndex <= startIndex) {
        return null;
    }
    return currentPath.substring(startIndex, endIndex);
};
exports.default = RealTimeMenuItemLink;
