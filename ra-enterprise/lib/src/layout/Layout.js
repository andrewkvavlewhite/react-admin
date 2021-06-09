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
var react_admin_1 = require("react-admin");
var react_redux_1 = require("react-redux");
var ra_preferences_1 = require("@react-admin/ra-preferences");
var ra_navigation_1 = require("@react-admin/ra-navigation");
var ra_tour_1 = require("@react-admin/ra-tour");
var AppBar_1 = __importDefault(require("./AppBar"));
var Sidebar_1 = __importDefault(require("./Sidebar"));
var Menu_1 = __importDefault(require("./Menu"));
var RA_TOUR_PREFERENCE_KEY = '@react-admin/ra-tour';
/**
 * A <Layout> component for ra-enterprise which pre-configures the enterprise modules.
 *
 * What is pre-configured?
 * - A breadcrumb on every pages based on the resources (from @react-admin/ra-navigation)
 * - A synchronized sidebar which saves its open/close state in the preferences (from @react-admin/ra-preferences)
 *
 * It uses the same API as the <Layout> component from react-admin,
 * and add new props based on the enterprise edition.
 *
 * @param {object} appBar The customized <AppBar>. Default to the @react-admin/ra-enterprise <AppBar>.
 * @param {object} breadcrumb The customized <Breadcrumb>. Default to the @react-admin/ra-enterprise <Breadcrumb>.
 * @param {object} sidebar The customized <Sidebar>. Default to the @react-admin/ra-enterprise <Sidebar>.
 * @param {object} tours An object describing the tours. Default to an empty object.
 *
 * @example Customize the <Layout> main elements (the <AppBar>, the <Breadcrumb> and the <Sidebar>)
 *
 * import {
 *     Admin,
 *     AppBar,
 *     Breadcrumb,
 *     Layout,
 *     Sidebar
 * } from '@react-admin/ra-enterprise';
 *
 * function CustomAppBar(props) {
 *     return <AppBar {...props} />;
 * };
 *
 * function CustomBreadcrumb(props) {
 *     return (
 *         <Breadcrumb {...props}>
 *             // You custom beadcrumb.
 *             // See @react-admin/ra-navigation for more details about breadcrumbs.
 *         </Breadcrumb>
 *     );
 * };
 *
 * function CustomSidebar(props) {
 *     return <Sidebar {...props} />;
 * };
 *
 * function CustomLayout(props) {
 *     return (
 *         <Layout
 *             appBar={CustomAppBar}
 *             breadcrumb={CustomBreadcrumb}
 *             sidebar={CustomSidebar}
 *             {...props}
 *         />
 *     );
 * };
 *
 * const dataProvider = {
 *     // Connect to your API
 * };
 *
 * function App(props) {
 *     return (
 *         <Admin
 *              dataProvider={dataProvider}
 *              layout={CustomLayout}
 *         >
 *             // Put your resources here
 *         </Admin>
 *     );
 * }
 *
 * @example Activate the tour (from @react-admin/ra-tour)
 *
 * import { Admin, Layout } from '@react-admin/ra-enterprise';
 *
 * const tours = {
 *     example: {
 *         steps: [
 *             // Put your tour steps here
 *         ]
 *     }
 * };
 *
 * function CustomLayout(props) {
 *     return (
 *         <Layout tours={tours} {...props} />
 *     );
 * };
 *
 * const dataProvider = {
 *     // Connect to your API
 * };
 *
 * function App(props) {
 *     return (
 *         <Admin dataProvider={dataProvider}>
 *             // Put your resources here
 *         </Admin>
 *     );
 * }
 *
 */
function Layout(props) {
    var appBar = props.appBar, dashboard = props.dashboard, sidebar = props.sidebar, menu = props.menu, tours = props.tours, rest = __rest(props, ["appBar", "dashboard", "sidebar", "menu", "tours"]);
    var notify = react_admin_1.useNotify();
    var redirect = react_admin_1.useRedirect();
    var refresh = react_admin_1.useRefresh();
    var dataProvider = react_admin_1.useDataProvider();
    var dispatch = react_redux_1.useDispatch();
    var _a = ra_preferences_1.usePreferences(RA_TOUR_PREFERENCE_KEY), tourPreferences = _a[0], setTourPreferences = _a[1];
    return (react_1.default.createElement(ra_navigation_1.AppLocationContext, { hasDashboard: !!dashboard },
        react_1.default.createElement(ra_tour_1.TourProvider, { initialState: tourPreferences, tours: tours, tools: {
                notify: notify,
                redirect: redirect,
                refresh: refresh,
                dataProvider: dataProvider,
                setTourPreferences: setTourPreferences,
                dispatch: dispatch,
            } },
            react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ra_preferences_1.SidebarOpenPreferenceSync, null),
                react_1.default.createElement(react_admin_1.Layout, __assign({ appBar: appBar, sidebar: sidebar, menu: menu }, rest), props.children)))));
}
Layout.defaultProps = {
    appBar: AppBar_1.default,
    sidebar: Sidebar_1.default,
    menu: Menu_1.default,
    tours: {},
};
exports.default = Layout;
