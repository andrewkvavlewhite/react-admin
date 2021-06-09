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
import React from 'react';
import { createMemoryHistory } from 'history';
import fakeRestProvider from 'ra-data-fakerest';
import { Resource, ListGuesser, SimpleForm, Datagrid, TextField, TextInput, DateInput, Filter, SearchInput, } from 'react-admin';
import { Typography, Card, CardContent } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Admin, List, Edit, Layout, Breadcrumb } from '../src';
import { addTreeMethodsBasedOnParentAndPosition, EditNode, TreeWithDetails, } from '@react-admin/ra-tree';
export default { title: 'ra-enterprise/Admin' };
var dataProvider = addTreeMethodsBasedOnParentAndPosition(fakeRestProvider({
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
var ArtistFilters = function (props) { return (React.createElement(Filter, __assign({}, props),
    React.createElement(SearchInput, { source: "q", alwaysOn: true }))); };
var ArtistList = function (props) { return (React.createElement(List, __assign({}, props, { filters: React.createElement(ArtistFilters, null), sort: { field: 'id', order: 'DESC' } }),
    React.createElement(Datagrid, { rowClick: "edit" },
        React.createElement(TextField, { source: "id" }),
        React.createElement(TextField, { source: "firstname" }),
        React.createElement(TextField, { source: "name" })))); };
var ArtistEdit = function (props) { return (React.createElement(Edit, __assign({}, props),
    React.createElement(SimpleForm, null,
        React.createElement(TextInput, { source: "firstname", label: "First Name" }),
        React.createElement(TextInput, { source: "name", label: "Last Name" }),
        React.createElement(DateInput, { source: "dob", label: "Born" })))); };
export var Basic = function () { return (React.createElement(Admin, { dataProvider: dataProvider, history: createMemoryHistory() },
    React.createElement(Resource, { name: "artists", list: ArtistList, edit: ArtistEdit }),
    React.createElement(Resource, { name: "events", list: ListGuesser }),
    React.createElement(Resource, { name: "performances", list: ListGuesser }))); };
var Dashboard = function () {
    return (React.createElement(Card, null,
        React.createElement(CardContent, null,
            React.createElement(Typography, { variant: "h4" }, "Here is Homepage"),
            React.createElement(Typography, null, "No breadcrumb is displayed in Home"))));
};
export var WithDashboard = function () { return (React.createElement(Admin, { dashboard: Dashboard, dataProvider: dataProvider, history: createMemoryHistory() },
    React.createElement(Resource, { name: "artists", list: ArtistList, edit: ArtistEdit }),
    React.createElement(Resource, { name: "events", list: ListGuesser }),
    React.createElement(Resource, { name: "performances", list: ListGuesser }))); };
var CategoriesEdit = function (props) { return (React.createElement(EditNode, __assign({}, props),
    React.createElement(SimpleForm, null,
        React.createElement(TextField, { source: "id" }),
        React.createElement(TextInput, { source: "name" })))); };
var CategoriesList = function (props) { return (React.createElement(React.Fragment, null,
    React.createElement(Breadcrumb, null),
    React.createElement(TreeWithDetails, __assign({ titleField: "name", edit: CategoriesEdit }, props)))); };
export var WithTree = function () { return (React.createElement(Admin, { dashboard: Dashboard, dataProvider: dataProvider, history: createMemoryHistory() },
    React.createElement(Resource, { name: "categories", list: CategoriesList }))); };
export var WithResourceLabel = function () { return (React.createElement(Admin, { dataProvider: dataProvider, history: createMemoryHistory() },
    React.createElement(Resource, { name: "artists", options: { label: 'custom' }, list: ArtistList, edit: ArtistEdit }),
    React.createElement(Resource, { name: "events", list: ListGuesser }),
    React.createElement(Resource, { name: "performances", list: ListGuesser }))); };
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
                    backgroundColor: grey[200],
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
                    backgroundColor: grey[200],
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
export var WithCustomizedThemes = function () { return (React.createElement(Admin, { dataProvider: dataProvider, history: createMemoryHistory(), lightTheme: lightTheme, darkTheme: darkTheme },
    React.createElement(Resource, { name: "artists", list: ArtistList, edit: ArtistEdit }))); };
var CustomMenu = function () { return React.createElement("div", null, "Custom Menu"); };
var CustomLayout = function (props) { return (React.createElement(Layout, __assign({}, props, { menu: CustomMenu }))); };
export var WithCustomMenu = function () { return (React.createElement(Admin, { dataProvider: dataProvider, history: createMemoryHistory(), layout: CustomLayout, theme: { overrides: { RaSidebar: null } } },
    React.createElement(Resource, { name: "artists", list: ArtistList, edit: ArtistEdit }))); };
