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
exports.WithTour = exports.WithCustomizedTranslations = exports.WithCustomizedAppBar = exports.DefaultLayout = void 0;
var react_1 = __importDefault(require("react"));
var history_1 = require("history");
var ra_data_fakerest_1 = __importDefault(require("ra-data-fakerest"));
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var ra_tour_1 = require("@react-admin/ra-tour");
var src_1 = require("../src");
exports.default = { title: 'ra-enterprise/Layout' };
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
var ArtistsFilters = function (props) { return (react_1.default.createElement(react_admin_1.Filter, __assign({}, props),
    react_1.default.createElement(react_admin_1.TextInput, { label: "Search", source: "q" }),
    react_1.default.createElement(react_admin_1.TextInput, { source: "name" }),
    react_1.default.createElement(react_admin_1.TextInput, { source: "firstname" }))); };
var ArtistList = function (props) { return (react_1.default.createElement(src_1.List, __assign({}, props, { filters: react_1.default.createElement(ArtistsFilters, null), sort: { field: 'id', order: 'DESC' } }),
    react_1.default.createElement(react_admin_1.Datagrid, { rowClick: "edit" },
        react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
        react_1.default.createElement(react_admin_1.TextField, { source: "firstname" }),
        react_1.default.createElement(react_admin_1.TextField, { source: "name" })))); };
var ArtistEdit = function (props) { return (react_1.default.createElement(src_1.Edit, __assign({}, props),
    react_1.default.createElement(react_admin_1.SimpleForm, null,
        react_1.default.createElement(react_admin_1.TextInput, { source: "firstname" }),
        react_1.default.createElement(react_admin_1.TextInput, { source: "name" })))); };
var ArtistShow = function (props) { return (react_1.default.createElement(src_1.Show, __assign({}, props),
    react_1.default.createElement(react_admin_1.SimpleShowLayout, null,
        react_1.default.createElement(react_admin_1.TextField, { source: "firstname" }),
        react_1.default.createElement(react_admin_1.TextField, { source: "name" })))); };
var ArtistCreate = function (props) { return (react_1.default.createElement(src_1.Create, __assign({}, props),
    react_1.default.createElement(react_admin_1.SimpleForm, null,
        react_1.default.createElement(react_admin_1.TextInput, { source: "firstname" }),
        react_1.default.createElement(react_admin_1.TextInput, { source: "name" })))); };
exports.DefaultLayout = function () { return (react_1.default.createElement(src_1.Admin, { dataProvider: dataProvider, history: history_1.createMemoryHistory() },
    react_1.default.createElement(react_admin_1.Resource, { name: "artists", create: ArtistCreate, list: ArtistList, edit: ArtistEdit, show: ArtistShow }))); };
var languages = [
    { locale: 'en', name: 'English 🇬🇧' },
    { locale: 'fr', name: 'Français 🇫🇷' },
];
var CustomAppBar = function (props) { return (react_1.default.createElement(src_1.AppBar, __assign({ languages: languages }, props))); };
var CustomLayout = function (props) { return (react_1.default.createElement(src_1.Layout, __assign({ appBar: CustomAppBar }, props))); };
exports.WithCustomizedAppBar = function () { return (react_1.default.createElement(src_1.Admin, { dataProvider: dataProvider, history: history_1.createMemoryHistory(), i18nProvider: src_1.buildI18nProvider(), layout: CustomLayout },
    react_1.default.createElement(react_admin_1.Resource, { name: "artists", list: ArtistList, edit: ArtistEdit }))); };
var customMessages = {
    en: {
        resources: {
            artists: {
                name: 'Painter |||| Painters',
            },
        },
    },
    fr: {
        resources: {
            artists: {
                name: 'Peintre |||| Peintres',
            },
        },
    },
};
exports.WithCustomizedTranslations = function () { return (react_1.default.createElement(src_1.Admin, { dataProvider: dataProvider, history: history_1.createMemoryHistory(), i18nProvider: src_1.buildI18nProvider(customMessages, 'fr'), layout: CustomLayout },
    react_1.default.createElement(react_admin_1.Resource, { name: "artists", list: ArtistList, edit: ArtistEdit }))); };
var tours = {
    example: {
        steps: [
            {
                target: "a[href='#/artists']",
                content: 'Hello Storybook',
            },
        ],
    },
};
var CustomAppBarWithTour = function (props) {
    var _a = ra_tour_1.useTour(), _ = _a[0], start = _a[1].start;
    var handleStart = function () {
        start('example');
    };
    return (react_1.default.createElement(src_1.AppBar, __assign({}, props),
        react_1.default.createElement(core_1.Button, { onClick: handleStart, variant: "contained" }, "Start Tour")));
};
var CustomLayoutWithTour = function (props) { return (react_1.default.createElement(src_1.Layout, __assign({}, props, { appBar: CustomAppBarWithTour, tours: tours }))); };
exports.WithTour = function () { return (react_1.default.createElement(src_1.Admin, { dataProvider: dataProvider, layout: CustomLayoutWithTour },
    react_1.default.createElement(react_admin_1.Resource, { name: "artists", list: ArtistList, edit: ArtistEdit }))); };
