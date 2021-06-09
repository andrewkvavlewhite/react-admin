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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Basic = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var react_admin_1 = require("react-admin");
var history_1 = require("history");
var ra_data_fakerest_1 = __importDefault(require("ra-data-fakerest"));
var ra_i18n_polyglot_1 = __importDefault(require("ra-i18n-polyglot"));
var ra_language_english_1 = __importDefault(require("ra-language-english"));
var ra_language_french_1 = __importDefault(require("ra-language-french"));
var sub_1 = __importDefault(require("date-fns/sub"));
var core_1 = require("@material-ui/core");
var ra_preferences_1 = require("@react-admin/ra-preferences");
var src_1 = require("../src");
exports.default = { title: 'ra-audit-log/FullApp' };
var i18nProvider = ra_i18n_polyglot_1.default(function (locale) {
    return locale === 'en'
        ? react_admin_1.mergeTranslations(ra_language_english_1.default, src_1.raAuditLogLanguageEnglish)
        : react_admin_1.mergeTranslations(ra_language_french_1.default, src_1.raAuditLogLanguageFrench, {
            resources: {
                events: {
                    name: 'Événement |||| Événements',
                    fields: {
                        author: 'Auteur',
                        resource: 'Resource',
                    },
                },
                products: {
                    name: 'Produit |||| Produits',
                    fields: {
                        name: 'Nom',
                    },
                },
                orders: {
                    name: 'Commande |||| Commandes',
                },
            },
        });
});
var today = new Date();
var users = [
    {
        id: 123,
        fullName: 'Thomas A. Anderson',
        avatar: 'https://upload.wikimedia.org/wikipedia/en/c/c6/NeoTheMatrix.jpg',
    },
    {
        id: 456,
        fullName: 'Takeshi Kovacs',
        avatar: 'https://cdn.images.express.co.uk/img/dynamic/20/285x395/922644_1.jpg',
    },
    {
        id: 890,
        fullName: 'Henry Dorsett Case',
    },
];
var user;
var authProvider = {
    login: function (_a) {
        var username = _a.username;
        if (username === 'neo') {
            user = users[0];
            return Promise.resolve();
        }
        if (username === 'tak') {
            user = users[1];
            return Promise.resolve();
        }
        if (username === 'cowboy') {
            user = users[2];
            return Promise.resolve();
        }
        return Promise.reject();
    },
    logout: function () {
        user = undefined;
        return Promise.resolve();
    },
    getIdentity: function () {
        return Promise.resolve(user);
    },
    getPermissions: function () { return Promise.resolve(); },
    checkError: function () { return Promise.resolve(); },
    checkAuth: function () { return (!!user ? Promise.resolve() : Promise.reject()); },
};
var dataProvider = src_1.addEventsForMutations(ra_data_fakerest_1.default({
    events: [
        {
            id: 1,
            resource: 'products',
            action: 'update',
            date: sub_1.default(today, { seconds: 30 }).toISOString(),
            payload: { data: { id: 123, name: 'SkyLine Poster' } },
            author: {
                id: 123,
                fullName: 'Thomas A. Anderson',
                avatar: 'https://upload.wikimedia.org/wikipedia/en/c/c6/NeoTheMatrix.jpg',
            },
        },
        {
            id: 2,
            resource: 'orders',
            action: 'create',
            date: sub_1.default(today, { seconds: 45 }).toISOString(),
            payload: { data: { id: 456, reference: '#123456' } },
            author: {
                id: 456,
                fullName: 'Takeshi Kovacs',
                avatar: 'https://cdn.images.express.co.uk/img/dynamic/20/285x395/922644_1.jpg',
            },
        },
        {
            id: 3,
            resource: 'products',
            action: 'update',
            date: sub_1.default(today, { days: 2 }).toISOString(),
            payload: {
                id: 123,
                data: { id: 123, name: 'NewYork SkyLine Poster' },
                previousData: { id: 123, name: 'SkyLine Poster' },
            },
            author: {
                id: 456,
                fullName: 'Takeshi Kovacs',
                avatar: 'https://cdn.images.express.co.uk/img/dynamic/20/285x395/922644_1.jpg',
            },
        },
        {
            id: 20,
            resource: 'products',
            action: 'create',
            date: sub_1.default(today, { days: 4 }).toISOString(),
            payload: {
                data: { id: 123, name: 'SkyLine Poster' },
            },
            author: {
                id: 456,
                fullName: 'Takeshi Kovacs',
                avatar: 'https://cdn.images.express.co.uk/img/dynamic/20/285x395/922644_1.jpg',
            },
        },
        {
            id: 4,
            resource: 'orders',
            action: 'updateMany',
            date: sub_1.default(today, { days: 4 }).toISOString(),
            payload: {
                ids: [234, 345, 567],
            },
            author: {
                id: 890,
                fullName: 'Henry Dorsett Case',
            },
        },
        {
            id: 5,
            resource: 'orders',
            action: 'create',
            date: sub_1.default(today, { weeks: 2 }).toISOString(),
            payload: { data: { id: 789, reference: '#123457' } },
            author: {
                id: 456,
                fullName: 'Takeshi Kovacs',
                avatar: 'https://cdn.images.express.co.uk/img/dynamic/20/285x395/922644_1.jpg',
            },
        },
        {
            id: 6,
            resource: 'orders',
            action: 'create',
            date: sub_1.default(today, { months: 2 }).toISOString(),
            payload: { data: { id: 890, reference: '#123458' } },
            author: {
                id: 890,
                fullName: 'Henry Dorsett Case',
            },
        },
        {
            id: 7,
            resource: 'orders',
            action: 'create',
            date: sub_1.default(today, { months: 3 }).toISOString(),
            payload: { data: { id: 1234, reference: '#123459' } },
            author: {
                id: 456,
                fullName: 'Takeshi Kovacs',
                avatar: 'https://cdn.images.express.co.uk/img/dynamic/20/285x395/922644_1.jpg',
            },
        },
        {
            id: 8,
            resource: 'orders',
            action: 'create',
            date: sub_1.default(today, { months: 6 }).toISOString(),
            payload: { data: { id: 2345, reference: '#123461' } },
            author: {
                id: 123,
                fullName: 'Thomas A. Anderson',
                avatar: 'https://upload.wikimedia.org/wikipedia/en/c/c6/NeoTheMatrix.jpg',
            },
        },
    ],
    products: [{ id: 123, name: 'SkyLine Poster' }],
    orders: [
        { id: 1, reference: '#123456' },
        { id: 456, reference: '#123456' },
        { id: 789, reference: '#123457' },
        { id: 890, reference: '#123458' },
        { id: 1234, reference: '#123459' },
        { id: 2345, reference: '#123461' },
    ],
    users: users,
}, true), authProvider);
var history = history_1.createMemoryHistory();
var EventListWithAuthorsResource = function (props) { return (React.createElement(src_1.EventList, __assign({}, props, { authorResource: "users" }))); };
var RecordEventsAside = function () {
    return (React.createElement(core_1.Box, { display: "flex", flexDirection: "column", marginLeft: 4, width: "25%" },
        React.createElement(core_1.Typography, { component: "h2", variant: "h5" }, "Recent events"),
        React.createElement(src_1.RecordTimeline, null)));
};
var ProductCreate = function (props) { return (React.createElement(react_admin_1.Create, __assign({}, props),
    React.createElement(react_admin_1.SimpleForm, null,
        React.createElement(react_admin_1.TextInput, { source: "name" })))); };
var ProductEdit = function (props) { return (React.createElement(react_admin_1.Edit, __assign({}, props, { aside: React.createElement(RecordEventsAside, null) }),
    React.createElement(react_admin_1.SimpleForm, null,
        React.createElement(react_admin_1.TextInput, { source: "name" })))); };
var ProductList = function (props) { return (React.createElement(react_admin_1.List, __assign({}, props),
    React.createElement(react_admin_1.Datagrid, { rowClick: "edit" },
        React.createElement(react_admin_1.TextField, { source: "name" })))); };
var products = {
    list: ProductList,
    create: ProductCreate,
    edit: ProductEdit,
};
var OrderCreate = function (props) { return (React.createElement(react_admin_1.Create, __assign({}, props),
    React.createElement(react_admin_1.SimpleForm, null,
        React.createElement(react_admin_1.TextInput, { source: "reference" })))); };
var OrderEdit = function (props) { return (React.createElement(react_admin_1.Edit, __assign({}, props, { aside: React.createElement(RecordEventsAside, null) }),
    React.createElement(react_admin_1.SimpleForm, null,
        React.createElement(react_admin_1.TextInput, { source: "reference" })))); };
var OrderList = function (props) { return (React.createElement(react_admin_1.List, __assign({}, props),
    React.createElement(react_admin_1.Datagrid, { rowClick: "edit" },
        React.createElement(react_admin_1.TextField, { source: "reference" })))); };
var orders = {
    list: OrderList,
    create: OrderCreate,
    edit: OrderEdit,
};
var MyAppBar = function (props) { return (React.createElement(react_admin_1.AppBar, __assign({}, props),
    React.createElement(core_1.Box, { flex: "1" },
        React.createElement(core_1.Typography, { variant: "h6", id: "react-admin-title" })),
    React.createElement(ra_preferences_1.LanguageSwitcher, { languages: [
            { locale: 'en', name: 'English' },
            { locale: 'fr', name: 'Français' },
        ] }))); };
var MyLayout = function (props) { return (React.createElement(react_admin_1.Layout, __assign({}, props, { appBar: MyAppBar }))); };
var MyLogin = function () { return (React.createElement(react_admin_1.Login, null,
    React.createElement(React.Fragment, null,
        React.createElement(core_1.CardContent, null,
            React.createElement(core_1.Typography, null,
                "Available users:",
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "neo"),
                        " / ",
                        React.createElement("code", null, "password")),
                    React.createElement("li", null,
                        React.createElement("code", null, "tak"),
                        " / ",
                        React.createElement("code", null, "password")),
                    React.createElement("li", null,
                        React.createElement("code", null, "cowboy"),
                        " / ",
                        React.createElement("code", null, "password"))))),
        React.createElement(react_admin_1.LoginForm, null)))); };
var useInfiniteGetList = function (resource, options) {
    var _a = react_1.useState({
        loaded: false,
        data: [],
        total: undefined,
        page: options.pagination.page,
    }), hookData = _a[0], setData = _a[1];
    var dataProvider = react_admin_1.useDataProvider();
    react_1.useEffect(function () {
        dataProvider.getList(resource, options).then(function (_a) {
            var data = _a.data, total = _a.total;
            setData(function (prev) { return (__assign(__assign({}, prev), { loaded: true, data: data, total: total })); });
        });
    }, [dataProvider, resource, JSON.stringify(options)]); // eslint-disable-line
    var loadMore = function (perPage) {
        if (perPage === void 0) { perPage = options.pagination.perPage; }
        dataProvider
            .getList(resource, __assign(__assign({}, options), { pagination: { page: hookData.page + 1, perPage: perPage } }))
            .then(function (_a) {
            var data = _a.data, total = _a.total;
            setData(function (prev) { return ({
                loaded: true,
                data: prev.data.concat(data),
                total: total,
                page: prev.page + 1,
            }); });
        });
    };
    return [hookData, loadMore];
};
var Dashboard = function () {
    var _a = useInfiniteGetList('events', {
        pagination: { page: 1, perPage: 5 },
        sort: { field: 'date', order: 'desc' },
        filter: {},
    }), _b = _a[0], data = _b.data, loaded = _b.loaded, total = _b.total, loadMore = _a[1];
    return (React.createElement(core_1.Container, { maxWidth: "sm" },
        React.createElement(core_1.Box, { display: "flex", flexDirection: "column" },
            React.createElement(core_1.Typography, { component: "h2", variant: "h5" }, "Recent events"),
            React.createElement(src_1.Timeline, { loaded: loaded, records: data }),
            data.length < total && (React.createElement(core_1.Button, { onClick: function () { return loadMore(); } }, "Load more")))));
};
exports.Basic = function () { return (React.createElement(react_admin_1.Admin, { authProvider: authProvider, dataProvider: dataProvider, i18nProvider: i18nProvider, history: history, layout: MyLayout, loginPage: MyLogin, dashboard: Dashboard },
    React.createElement(react_admin_1.Resource, { name: "events", list: EventListWithAuthorsResource }),
    React.createElement(react_admin_1.Resource, { name: "users" }),
    React.createElement(react_admin_1.Resource, __assign({ name: "products" }, products)),
    React.createElement(react_admin_1.Resource, __assign({ name: "orders" }, orders)))); };
