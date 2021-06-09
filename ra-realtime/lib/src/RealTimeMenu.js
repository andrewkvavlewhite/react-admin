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
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var react_redux_1 = require("react-redux");
var inflection_1 = __importDefault(require("inflection"));
var core_1 = require("@material-ui/core");
var ViewList_1 = __importDefault(require("@material-ui/icons/ViewList"));
var classnames_1 = __importDefault(require("classnames"));
var react_admin_1 = require("react-admin");
var RealTimeMenuItemLink_1 = __importDefault(require("./RealTimeMenuItemLink"));
/**
 * <Menu> equivalent, but with real-time update counts in badges
 *
 * @example
 *
 * import { RealTimeMenu } from '@react-admin/ra-realtime'
 *
 * const CustomLayout: FC = (props) => (<Layout {...props} menu={RealTimeMenu} />;
 *
 * const MyAdmin = props => (
 *     <Admin
 *         dataProvider={realTimeDataProvider}
 *         layout={CustomLayout}
 *         i18nProvider={i18nProvider}
 *     >
 *         <Resource
 *             name="posts"
 *             list={PostList}
 *             show={PostShow}
 *         />
 *     </Admin>
 * );
 */
var useStyles = core_1.makeStyles({
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
}, { name: 'RaMenu' });
var translatedResourceName = function (resource, translate) {
    return translate("resources." + resource.name + ".name", {
        smart_count: 2,
        _: resource.options && resource.options.label
            ? translate(resource.options.label, {
                smart_count: 2,
                _: resource.options.label,
            })
            : inflection_1.default.humanize(inflection_1.default.pluralize(resource.name)),
    });
};
// This component is a copy of Menu with some specific changes for the badges
var RealTimeMenu = function (props) {
    var classesOverride = props.classes, className = props.className, dense = props.dense, hasDashboard = props.hasDashboard, onMenuClick = props.onMenuClick, logout = props.logout, rest = __rest(props, ["classes", "className", "dense", "hasDashboard", "onMenuClick", "logout"]);
    var translate = react_admin_1.useTranslate();
    var classes = useStyles(props);
    var isXSmall = core_1.useMediaQuery(function (theme) {
        return theme.breakpoints.down('xs');
    });
    var open = react_redux_1.useSelector(function (state) { return state.admin.ui.sidebarOpen; });
    var resources = react_redux_1.useSelector(react_admin_1.getResources, react_redux_1.shallowEqual);
    // Used to force redraw on navigation
    react_redux_1.useSelector(function (state) { return state.router.location.pathname; });
    return (react_1.default.createElement("div", __assign({ className: classnames_1.default(classes.main, className) }, rest),
        hasDashboard && (react_1.default.createElement(react_admin_1.DashboardMenuItem, { onClick: onMenuClick, dense: dense, sidebarIsOpen: open })),
        resources
            .filter(function (r) { return r.hasList; })
            .map(function (resource) { return (react_1.default.createElement(RealTimeMenuItemLink_1.default, { key: resource.name, to: "/" + resource.name, primaryText: translatedResourceName(resource, translate), leftIcon: resource.icon ? react_1.default.createElement(resource.icon, null) : react_1.default.createElement(ViewList_1.default, null), resource: resource.name, onClick: onMenuClick, dense: dense, sidebarIsOpen: open })); }),
        isXSmall && logout));
};
RealTimeMenu.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    dense: prop_types_1.default.bool,
    hasDashboard: prop_types_1.default.bool,
    logout: prop_types_1.default.element,
    onMenuClick: prop_types_1.default.func,
};
RealTimeMenu.defaultProps = {
    onMenuClick: function () { return null; },
};
exports.default = RealTimeMenu;
