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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Basic = void 0;
var react_1 = __importDefault(require("react"));
var history_1 = require("history");
var ra_data_fakerest_1 = __importDefault(require("ra-data-fakerest"));
var react_admin_1 = require("react-admin");
var src_1 = require("../src");
var ra_navigation_1 = require("@react-admin/ra-navigation");
exports.default = { title: 'ra-enterprise/Custom Breadcrumb' };
var dataProvider = ra_data_fakerest_1.default({
    artists: [
        {
            id: 1,
            name: 'Mercury',
            firstname: 'Freddy',
            dob: new Date('1946-09-05'),
            prof: 'singer',
        },
        {
            id: 2,
            name: 'John',
            firstname: 'Elton',
            dob: new Date('1947-03-25'),
            prof: 'singer',
        },
        {
            id: 3,
            name: 'Collins',
            firstname: 'Phil',
            dob: new Date('1951-01-30'),
            prof: 'singer',
        },
        {
            id: 4,
            name: 'Ford',
            firstname: 'Harrison',
            dob: new Date('1942-07-13'),
            prof: 'actor',
        },
        {
            id: 5,
            name: 'Streep',
            firstname: 'Meryl',
            dob: new Date('1949-06-22'),
            prof: 'actor',
        },
    ],
    events: [],
    performances: [],
}, true);
var ArtistListActions = function (props) { return (react_1.default.createElement(src_1.ListActions, __assign({}, props, { breadcrumb: react_1.default.createElement(MyCustomBreadcrumb, { variant: "actions" }) }))); };
var ArtistList = function (props) { return (react_1.default.createElement(src_1.List, __assign({}, props, { sort: { field: 'id', order: 'DESC' }, actions: react_1.default.createElement(ArtistListActions, null) }),
    react_1.default.createElement(react_admin_1.Datagrid, { rowClick: "edit" },
        react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
        react_1.default.createElement(react_admin_1.TextField, { source: "firstname" }),
        react_1.default.createElement(react_admin_1.TextField, { source: "name" })))); };
var ArtistEditActions = function (props) { return (react_1.default.createElement(src_1.EditActions, __assign({}, props, { breadcrumb: react_1.default.createElement(MyCustomBreadcrumb, { variant: "actions" }) }))); };
var ArtistEdit = function (props) { return (react_1.default.createElement(src_1.Edit, __assign({}, props, { actions: react_1.default.createElement(ArtistEditActions, null) }),
    react_1.default.createElement(react_admin_1.SimpleForm, null,
        react_1.default.createElement(react_admin_1.TextInput, { source: "firstname", label: "First Name" }),
        react_1.default.createElement(react_admin_1.TextInput, { source: "name", label: "Last Name" }),
        react_1.default.createElement(react_admin_1.DateInput, { source: "dob", label: "Born" })))); };
var MyCustomBreadcrumb = function (props) { return (react_1.default.createElement(ra_navigation_1.Breadcrumb, __assign({}, props),
    react_1.default.createElement(ra_navigation_1.BreadcrumbItem, { name: "dashboard", label: "My Home" },
        react_1.default.createElement(ra_navigation_1.ResourceBreadcrumbItems, { resources: ['songs', 'artists'] })))); };
exports.Basic = function () { return (react_1.default.createElement(src_1.Admin, { dataProvider: dataProvider, history: history_1.createMemoryHistory() },
    react_1.default.createElement(react_admin_1.Resource, { name: "artists", list: ArtistList, edit: ArtistEdit }),
    react_1.default.createElement(react_admin_1.Resource, { name: "events", list: react_admin_1.ListGuesser }),
    react_1.default.createElement(react_admin_1.Resource, { name: "performances", list: react_admin_1.ListGuesser }))); };
