"use strict";
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
exports.Breadcrumb = void 0;
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var classnames_1 = __importDefault(require("classnames"));
var app_location_1 = require("../app-location");
var useHasDashboard_1 = require("../app-location/useHasDashboard");
/**
 * The <Breadcrumb /> component allows to include a breadcrumb inside our application.
 * The layout of the app must be inside a AppLocationContext.
 *
 * @see AppLocationContext
 *
 * @param {string} separator Optionnal. Specify the separator caracter between items. Default is '/'.
 * @param {string} className Optionnal. To allow a style customization of this Component.
 * @param {ReactElement} dashboard Optionnal. Passed by Layout to detect if a Dashboard page has been set.
 * @param {boolean} hasDashboard Optionnal. Boolean to manually activate Dashboard navigation. Default is false.
 *
 * By default, the <Breadcrumb /> item will not render anything.
 * To turn on the breadcrumb resolving from your current react-admin resources,
 * you'll need to provide a <ResourceBreacrumbItems /> component as <Breadcrumb /> child.
 *
 * We don't recommend adding the Breadcrumb inside your layout as it would add unecessary
 * space above the current view. Instead, you should add it directly on the views. For react-admin
 * views such as Create, Show and Edit, you can use `<Breadcrumb variant="actions">` which applies custom styles to make it fit inside a `<TopToolbar>` used in actions.
 * The `ra-enterprise` package includes alternative version of all react-admin views with the breadcrumb
 * already included.
 *
 * @example
 *  import React from 'react';
 *  import { AppLocationContext } from '@react-admin/ra-navigation';
 *  import { Breadcrumb, ResourceBreadcrumbItems } from '@react-admin/ra-navigation';
 *  import { Admin, Resource, Layout } from 'react-admin';
 *
 *  import PostList from './PostList';
 *  import PostEdit from './PostEdit';
 *  import PostShow from './PostShow';
 *  import PostCreate from './PostCreate';
 *
 *  const MyLayout = ({ children, ...props }) => (
 *    <AppLocationContext>
 *      <Layout {...props}>
 *          <Breadcrumb {...props}>
 *            <ResourceBreadcrumbItems />
 *          </Breadcrumb>
 *        {children}
 *      </Layout>
 *    </AppLocationContext>
 *  );
 *
 *  const App = () => (
 *    <Admin dataProvider={dataProvider} layout={MyLayout}>
 *      <Resource
 *        name="posts"
 *        list={PostList}
 *        edit={PostEdit}
 *        show={PostShow}
 *        create={PostCreate}
 *      />
 *    </Admin>
 *  );
 *
 * It'll display respectively:
 *   - "Posts" on Post List
 *   - "Posts / Show #1" on Post Show with id = 1
 *   - "Posts / Edit #1" on Post Edit with id = 1
 *   - "Posts / Create" on Post Create
 *
 * If the app have a dashboard page, you can automatically set the root the Breadcrumb to this page in to possible way:
 *
 * 1. By passing the dashboard prop to the Component
 * const MyLayout = ({ children, dashboard, ...props }) => (
 *    <AppLocationContext>
 *      <Layout {...props}>
 *          <Breadcrumb dashboard={dashboard}>
 *            <ResourceBreadcrumbItems />
 *          </Breadcrumb>
 *        {children}
 *      </Layout>
 *    </AppLocationContext>
 *  );
 *
 * 2. By passing a hasDashboard prop to the Component
 * const MyLayout = ({ children, dashboard, ...props }) => (
 *    <AppLocationContext>
 *      <Layout {...props}>
 *          <Breadcrumb hasDashboard={true}>
 *            <ResourceBreadcrumbItems />
 *          </Breadcrumb>
 *        {children}
 *      </Layout>
 *    </AppLocationContext>
 *  );
 *
 * By doing this, the breadcrumb will now show respectively:
 *   - "Dashboard / Posts" on Post List
 *   - "Dashboard / Posts / Show #1" on Post Show with id = 1
 *   - "Dashboard / Posts / Edit #1" on Post Edit with id = 1
 *   - "Dashboard / Posts / Create" on Post Create
 *
 * It's also possible to define a custom breadcrumb tree inside <Breadcrumb />.
 * This way, custom routes can also be displayed inside the breadcrumb.
 *
 *  import React from 'react';
 *  import { AppLocationContext } from '@react-admin/ra-navigation';
 *  import { Breadcrumb } from '@react-admin/ra-navigation';
 *  import { Admin, Resource, Layout } from 'react-admin';
 *  import { Route } from 'react-router-dom';
 *
 *  import PostList from './PostList';
 *  import PostEdit from './PostEdit';
 *  import PostShow from './PostShow';
 *  import PostCreate from './PostCreate';
 *
 *  const UserPreferences = () => {
 *    useDefineAppLocation('myhome.user.preferences');
 *    return <span>My Preferences</span>;
 *  };
 *
 *  const routes = [
 *    <Route exact path="/user/preferences" component={UserPreferences} />,
 *  ];
 *
 *  const MyLayout = ({ children }) => (
 *    <AppLocationContext>
 *      <Layout {...props}>
 *          <Breadcrumb>
 *            <ResourceBreadcrumbItems />
 *            <BreadcrumbItem name="myhome" label="Home">
 *              <BreadcrumbItem name="user" label="User">
 *                <BreadcrumbItem name="preferences" label="Preferences" />
 *              </BreadcrumbItem>
 *            </BreadcrumbItem>
 *          </Breadcrumb>
 *        {children}
 *      </Layout>
 *    </AppLocationContext>
 *  );
 *
 *  const App = () => (
 *    <Admin dataProvider={dataProvider} customRoutes={routes} layout={MyLayout}>
 *      <Resource
 *        name="posts"
 *        list={PostList}
 *        edit={PostEdit}
 *        show={PostShow}
 *        create={PostCreate}
 *      />
 *    </Admin>
 *  );
 *
 * The displayed path will be "Dashboard / User / Preferences" on "/user/preferences"
 *
 * The breadcrumb separator used by default is "/". It can be overridden using a string or a function.
 *
 *   <Breadcrumb separator=">">{items}</Breadcrumb>
 *   <Breadcrumb separator={() => `url('data:image/png;base64,iVBORw0KGgoAA....')`}>
 *      {items}
 *   </Breadcrumb>
 *
 * In some cases, it's useful to override the default resource breadcrumb path
 * eg: to add custom label instead of "Show #1", "Edit #1", ...
 *
 * This can be done by disabling concerned resources (enabling only ones we don't customize) and declare them manually.
 *
 *  import React from 'react';
 *  import { AppLocationContext } from '@react-admin/ra-navigation';
 *  import { Breadcrumb, ResourceBreadcrumbItems } from '@react-admin/ra-navigation';
 *  import { Admin, Resource, Layout, linkToRecord } from 'react-admin';
 *
 *  import PostList from './PostList';
 *  import PostEdit from './PostEdit';
 *  import PostShow from './PostShow';
 *  import PostCreate from './PostCreate';
 *
 *  const MyLayout = ({ children }) => (
 *    <Layout {...props}>
 *        <Breadcrumb {...props}>
 *          <ResourceBreadcrumbItems resources={['otherResources']} />
 *          <BreadcrumbItem name="posts" label="Posts">
 *            <BreadcrumbItem
 *              name="edit"
 *              label={({ record }) => `Edit "${record.title}"`}
 *              to={({ record }) => record && `${linkToRecord('/songs', record.id)}/edit`}
 *            />
 *            <BreadcrumbItem
 *              name="show"
 *              label={({ record }) => record.title}
 *              to={({ record }) => record && `${linkToRecord('/songs', record.id)}/show`}
 *            />
 *            <BreadcrumbItem name="list" label="My Post List" />
 *            <BreadcrumbItem name="create" label="Let's write a Post!" />
 *          </BreadcrumbItem>
 *        </Breadcrumb>
 *      {children}
 *    </Layout>
 *  );
 *
 *  const App = () => (
 *    <AppLocationContext>
 *      <Admin dataProvider={dataProvider} layout={MyLayout}>
 *        <Resource
 *          name="posts"
 *          list={PostList}
 *          edit={PostEdit}
 *          show={PostShow}
 *          create={PostCreate}
 *        />
 *        <Resource name="otherResource" ... />
 *      </Admin>
 *    </AppLocationContext>
 *  );
 */
exports.Breadcrumb = function (_a) {
    var _b;
    var children = _a.children, className = _a.className, variant = _a.variant, props = __rest(_a, ["children", "className", "variant"]);
    var location = app_location_1.useAppLocationState()[0];
    var classes = useStyles(props);
    var hasDashboard = useHasDashboard_1.useHasDashboard(props);
    var finalHasDashboard = props.dashboard != undefined ? !!props.dashboard : hasDashboard;
    if (!location.path)
        return null;
    return (react_1.default.createElement("nav", { "aria-label": "Breadcrumb", className: classnames_1.default(className, (_b = {},
            _b[classes.actions] = variant === 'actions',
            _b)) },
        react_1.default.createElement("ul", { className: classes.root }, react_1.default.Children.map(children, function (child) {
            return react_1.default.cloneElement(child, {
                hasDashboard: finalHasDashboard,
            });
        }))));
};
var separatorResolver = function (_a) {
    var separator = _a.separator;
    return typeof separator === 'function' ? separator() : "\"" + (separator || '/') + "\"";
};
var useStyles = core_1.makeStyles(function (theme) { return ({
    root: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        '& li': {
            display: 'inline',
            color: theme.palette.text.secondary,
            '&+li::before': {
                content: separatorResolver,
                padding: "0 " + theme.spacing(1) + "px",
            },
            '&+li:last-child': {
                color: theme.palette.text.primary,
            },
            '& a': {
                textDecoration: 'none',
                '&:hover': {
                    textDecoration: 'underline',
                },
            },
        },
    },
    actions: {
        // Same padding as the MuiButton with small text
        padding: '4px 5px',
        // Ensure the breadcrumb is at the left of the view
        marginRight: 'auto',
    },
}); }, { name: 'ra-navigation/Breadcrumb' });
