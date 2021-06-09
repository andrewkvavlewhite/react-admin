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
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Admin, AppBar, Create, Datagrid, Edit, Layout, List, Login, LoginForm, mergeTranslations, Resource, SimpleForm, TextField, TextInput, useDataProvider, } from 'react-admin';
import { createMemoryHistory } from 'history';
import fakeRestDataProvider from 'ra-data-fakerest';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import frenchMessages from 'ra-language-french';
import subFromDate from 'date-fns/sub';
import { Box, Button, CardContent, Container, Typography, } from '@material-ui/core';
import { LanguageSwitcher } from '@react-admin/ra-preferences';
import { EventList, raAuditLogLanguageEnglish, raAuditLogLanguageFrench, addEventsForMutations, Timeline, RecordTimeline, } from '../src';
export default { title: 'ra-audit-log/FullApp' };
var i18nProvider = polyglotI18nProvider(function (locale) {
    return locale === 'en'
        ? mergeTranslations(englishMessages, raAuditLogLanguageEnglish)
        : mergeTranslations(frenchMessages, raAuditLogLanguageFrench, {
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
var dataProvider = addEventsForMutations(fakeRestDataProvider({
    events: [
        {
            id: 1,
            resource: 'products',
            action: 'update',
            date: subFromDate(today, { seconds: 30 }).toISOString(),
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
            date: subFromDate(today, { seconds: 45 }).toISOString(),
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
            date: subFromDate(today, { days: 2 }).toISOString(),
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
            date: subFromDate(today, { days: 4 }).toISOString(),
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
            date: subFromDate(today, { days: 4 }).toISOString(),
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
            date: subFromDate(today, { weeks: 2 }).toISOString(),
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
            date: subFromDate(today, { months: 2 }).toISOString(),
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
            date: subFromDate(today, { months: 3 }).toISOString(),
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
            date: subFromDate(today, { months: 6 }).toISOString(),
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
var history = createMemoryHistory();
var EventListWithAuthorsResource = function (props) { return (React.createElement(EventList, __assign({}, props, { authorResource: "users" }))); };
var RecordEventsAside = function () {
    return (React.createElement(Box, { display: "flex", flexDirection: "column", marginLeft: 4, width: "25%" },
        React.createElement(Typography, { component: "h2", variant: "h5" }, "Recent events"),
        React.createElement(RecordTimeline, null)));
};
var ProductCreate = function (props) { return (React.createElement(Create, __assign({}, props),
    React.createElement(SimpleForm, null,
        React.createElement(TextInput, { source: "name" })))); };
var ProductEdit = function (props) { return (React.createElement(Edit, __assign({}, props, { aside: React.createElement(RecordEventsAside, null) }),
    React.createElement(SimpleForm, null,
        React.createElement(TextInput, { source: "name" })))); };
var ProductList = function (props) { return (React.createElement(List, __assign({}, props),
    React.createElement(Datagrid, { rowClick: "edit" },
        React.createElement(TextField, { source: "name" })))); };
var products = {
    list: ProductList,
    create: ProductCreate,
    edit: ProductEdit,
};
var OrderCreate = function (props) { return (React.createElement(Create, __assign({}, props),
    React.createElement(SimpleForm, null,
        React.createElement(TextInput, { source: "reference" })))); };
var OrderEdit = function (props) { return (React.createElement(Edit, __assign({}, props, { aside: React.createElement(RecordEventsAside, null) }),
    React.createElement(SimpleForm, null,
        React.createElement(TextInput, { source: "reference" })))); };
var OrderList = function (props) { return (React.createElement(List, __assign({}, props),
    React.createElement(Datagrid, { rowClick: "edit" },
        React.createElement(TextField, { source: "reference" })))); };
var orders = {
    list: OrderList,
    create: OrderCreate,
    edit: OrderEdit,
};
var MyAppBar = function (props) { return (React.createElement(AppBar, __assign({}, props),
    React.createElement(Box, { flex: "1" },
        React.createElement(Typography, { variant: "h6", id: "react-admin-title" })),
    React.createElement(LanguageSwitcher, { languages: [
            { locale: 'en', name: 'English' },
            { locale: 'fr', name: 'Français' },
        ] }))); };
var MyLayout = function (props) { return (React.createElement(Layout, __assign({}, props, { appBar: MyAppBar }))); };
var MyLogin = function () { return (React.createElement(Login, null,
    React.createElement(React.Fragment, null,
        React.createElement(CardContent, null,
            React.createElement(Typography, null,
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
        React.createElement(LoginForm, null)))); };
var useInfiniteGetList = function (resource, options) {
    var _a = useState({
        loaded: false,
        data: [],
        total: undefined,
        page: options.pagination.page,
    }), hookData = _a[0], setData = _a[1];
    var dataProvider = useDataProvider();
    useEffect(function () {
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
    return (React.createElement(Container, { maxWidth: "sm" },
        React.createElement(Box, { display: "flex", flexDirection: "column" },
            React.createElement(Typography, { component: "h2", variant: "h5" }, "Recent events"),
            React.createElement(Timeline, { loaded: loaded, records: data }),
            data.length < total && (React.createElement(Button, { onClick: function () { return loadMore(); } }, "Load more")))));
};
export var Basic = function () { return (React.createElement(Admin, { authProvider: authProvider, dataProvider: dataProvider, i18nProvider: i18nProvider, history: history, layout: MyLayout, loginPage: MyLogin, dashboard: Dashboard },
    React.createElement(Resource, { name: "events", list: EventListWithAuthorsResource }),
    React.createElement(Resource, { name: "users" }),
    React.createElement(Resource, __assign({ name: "products" }, products)),
    React.createElement(Resource, __assign({ name: "orders" }, orders)))); };
