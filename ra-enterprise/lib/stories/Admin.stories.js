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
exports.WithCustomMenu = exports.WithCustomizedThemes = exports.WithResourceLabel = exports.WithTree = exports.WithDashboard = exports.Basic = void 0;
var react_1 = __importDefault(require("react"));
var history_1 = require("history");
var ra_data_fakerest_1 = __importDefault(require("ra-data-fakerest"));
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var colors_1 = require("@material-ui/core/colors");
var src_1 = require("../src");
var ra_tree_1 = require("@react-admin/ra-tree");
exports.default = { title: 'ra-enterprise/Admin' };
var dataProvider = ra_tree_1.addTreeMethodsBasedOnParentAndPosition(ra_data_fakerest_1.default({
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
    categories: [
        { id: 1, name: 'Clothing', position: 0 },
        { id: 2, name: 'Men', parent_id: 1, position: 0 },
        { id: 3, name: 'Suits', parent_id: 2, position: 0 },
        { id: 4, name: 'Slacks', parent_id: 3, position: 0 },
        { id: 5, name: 'Jackets', parent_id: 3, position: 1 },
        { id: 6, name: 'Women', parent_id: 1, position: 1 },
        { id: 7, name: 'Dresses', parent_id: 6, position: 0 },
        { id: 8, name: 'Evening Gowns', parent_id: 7, position: 0 },
        { id: 9, name: 'Sun Dresses', parent_id: 7, position: 1 },
        { id: 10, name: 'Skirts', parent_id: 6, position: 1 },
        { id: 11, name: 'Blouses', parent_id: 6, position: 2 },
    ],
}, true));
var ArtistFilters = function (props) { return (react_1.default.createElement(react_admin_1.Filter, __assign({}, props),
    react_1.default.createElement(react_admin_1.SearchInput, { source: "q", alwaysOn: true }))); };
var ArtistList = function (props) { return (react_1.default.createElement(src_1.List, __assign({}, props, { filters: react_1.default.createElement(ArtistFilters, null), sort: { field: 'id', order: 'DESC' } }),
    react_1.default.createElement(react_admin_1.Datagrid, { rowClick: "edit" },
        react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
        react_1.default.createElement(react_admin_1.TextField, { source: "firstname" }),
        react_1.default.createElement(react_admin_1.TextField, { source: "name" })))); };
var ArtistEdit = function (props) { return (react_1.default.createElement(src_1.Edit, __assign({}, props),
    react_1.default.createElement(react_admin_1.SimpleForm, null,
        react_1.default.createElement(react_admin_1.TextInput, { source: "firstname", label: "First Name" }),
        react_1.default.createElement(react_admin_1.TextInput, { source: "name", label: "Last Name" }),
        react_1.default.createElement(react_admin_1.DateInput, { source: "dob", label: "Born" })))); };
exports.Basic = function () { return (react_1.default.createElement(src_1.Admin, { dataProvider: dataProvider, history: history_1.createMemoryHistory() },
    react_1.default.createElement(react_admin_1.Resource, { name: "artists", list: ArtistList, edit: ArtistEdit }),
    react_1.default.createElement(react_admin_1.Resource, { name: "events", list: react_admin_1.ListGuesser }),
    react_1.default.createElement(react_admin_1.Resource, { name: "performances", list: react_admin_1.ListGuesser }))); };
var Dashboard = function () {
    return (react_1.default.createElement(core_1.Card, null,
        react_1.default.createElement(core_1.CardContent, null,
            react_1.default.createElement(core_1.Typography, { variant: "h4" }, "Here is Homepage"),
            react_1.default.createElement(core_1.Typography, null, "No breadcrumb is displayed in Home"))));
};
exports.WithDashboard = function () { return (react_1.default.createElement(src_1.Admin, { dashboard: Dashboard, dataProvider: dataProvider, history: history_1.createMemoryHistory() },
    react_1.default.createElement(react_admin_1.Resource, { name: "artists", list: ArtistList, edit: ArtistEdit }),
    react_1.default.createElement(react_admin_1.Resource, { name: "events", list: react_admin_1.ListGuesser }),
    react_1.default.createElement(react_admin_1.Resource, { name: "performances", list: react_admin_1.ListGuesser }))); };
var CategoriesEdit = function (props) { return (react_1.default.createElement(ra_tree_1.EditNode, __assign({}, props),
    react_1.default.createElement(react_admin_1.SimpleForm, null,
        react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
        react_1.default.createElement(react_admin_1.TextInput, { source: "name" })))); };
var CategoriesList = function (props) { return (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(src_1.Breadcrumb, null),
    react_1.default.createElement(ra_tree_1.TreeWithDetails, __assign({ titleField: "name", edit: CategoriesEdit }, props)))); };
exports.WithTree = function () { return (react_1.default.createElement(src_1.Admin, { dashboard: Dashboard, dataProvider: dataProvider, history: history_1.createMemoryHistory() },
    react_1.default.createElement(react_admin_1.Resource, { name: "categories", list: CategoriesList }))); };
exports.WithResourceLabel = function () { return (react_1.default.createElement(src_1.Admin, { dataProvider: dataProvider, history: history_1.createMemoryHistory() },
    react_1.default.createElement(react_admin_1.Resource, { name: "artists", options: { label: 'custom' }, list: ArtistList, edit: ArtistEdit }),
    react_1.default.createElement(react_admin_1.Resource, { name: "events", list: react_admin_1.ListGuesser }),
    react_1.default.createElement(react_admin_1.Resource, { name: "performances", list: react_admin_1.ListGuesser }))); };
var darkTheme = {
    palette: {
        type: 'dark',
        primary: {
            main: '#90caf9',
        },
    },
    overrides: {
        RaAppBar: {
            menuButton: {
                // Since sub-<Menu /> hide labels when sidebar is closed
                // We need to disallow sidebar closing (hiding button is simpler)
                display: 'none',
            },
        },
        RaSidebar: {
            drawerPaper: {
                paddingRight: 16,
                width: 'auto',
            },
        },
        MuiAppBar: {
            // Hide MenuItemCategory shadow behind the appbar
            zIndex: 9999,
        },
        RaMenuItemCategory: {
            closeButton: {
                color: 'white',
            },
            popoverPaper: {
                backgroundColor: '#424242',
            },
        },
        RaMenuItem: {
            root: {
                color: 'white',
            },
            link: {
                '&:hover': {
                    color: 'black',
                    backgroundColor: colors_1.grey[200],
                },
            },
        },
        RaFilterFormInput: {
            body: {
                // Fixes search filter breadcrumb overlap
                '& > div': { marginTop: 8 },
            },
        },
    },
};
var lightTheme = {
    palette: {
        type: 'light',
        primary: {
            main: '#4f3cc9',
        },
        secondary: {
            light: '#5f5fc4',
            main: '#283593',
            dark: '#001064',
            contrastText: '#fff',
        },
        background: {
            default: '#fcfcfe',
        },
    },
    shape: {
        borderRadius: 10,
    },
    overrides: {
        RaAppBar: {
            menuButton: {
                // Since sub-<Menu /> hide labels when sidebar is closed
                // We need to disallow sidebar closing (hiding button is simpler)
                display: 'none',
            },
        },
        RaMenuItemLink: {
            root: {
                borderLeft: '3px solid #fff',
            },
            active: {
                borderLeft: '3px solid #808080',
            },
        },
        RaMenuItemCategory: {
            root: {
                color: '#808080',
                '&:hover': {
                    color: 'black',
                    backgroundColor: colors_1.grey[200],
                },
            },
        },
        RaMenuItem: {
            root: {
                color: '#808080',
            },
        },
        RaMultiLevelMenu: {
            navWithCategories: {
                backgroundColor: '#fff',
            },
        },
        MuiPaper: {
            elevation1: {
                boxShadow: 'none',
            },
            root: {
                border: '1px solid #e0e0e3',
                backgroundClip: 'padding-box',
            },
        },
        MuiButton: {
            contained: {
                backgroundColor: '#fff',
                color: '#4f3cc9',
                boxShadow: 'none',
            },
        },
        MuiAppBar: {
            // Hide MenuItemCategory shadow behind the appbar
            root: { zIndex: 9999 },
            colorSecondary: {
                color: '#808080',
                backgroundColor: '#fff',
            },
        },
        MuiLinearProgress: {
            colorPrimary: {
                backgroundColor: '#f5f5f5',
            },
            barColorPrimary: {
                backgroundColor: '#d7d7d7',
            },
        },
        MuiFilledInput: {
            root: {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                '&$disabled': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
            },
        },
        RaSidebar: {
            drawerPaper: {
                paddingRight: 16,
                width: 'auto',
            },
        },
        RaFilterFormInput: {
            body: {
                // Fixes search filter breadcrumb overlap
                '& > div': { marginTop: 8 },
            },
        },
    },
};
exports.WithCustomizedThemes = function () { return (react_1.default.createElement(src_1.Admin, { dataProvider: dataProvider, history: history_1.createMemoryHistory(), lightTheme: lightTheme, darkTheme: darkTheme },
    react_1.default.createElement(react_admin_1.Resource, { name: "artists", list: ArtistList, edit: ArtistEdit }))); };
var CustomMenu = function () { return react_1.default.createElement("div", null, "Custom Menu"); };
var CustomLayout = function (props) { return (react_1.default.createElement(src_1.Layout, __assign({}, props, { menu: CustomMenu }))); };
exports.WithCustomMenu = function () { return (react_1.default.createElement(src_1.Admin, { dataProvider: dataProvider, history: history_1.createMemoryHistory(), layout: CustomLayout, theme: { overrides: { RaSidebar: null } } },
    react_1.default.createElement(react_admin_1.Resource, { name: "artists", list: ArtistList, edit: ArtistEdit }))); };
