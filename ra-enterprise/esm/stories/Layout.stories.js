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
import { Resource, SimpleForm, Datagrid, TextField, TextInput, SimpleShowLayout, Filter, } from 'react-admin';
import { Button } from '@material-ui/core';
import { useTour } from '@react-admin/ra-tour';
import { Admin, AppBar, Layout, List, buildI18nProvider, Edit, Create, Show, } from '../src';
export default { title: 'ra-enterprise/Layout' };
var dataProvider = fakeRestProvider({
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
var ArtistsFilters = function (props) { return (React.createElement(Filter, __assign({}, props),
    React.createElement(TextInput, { label: "Search", source: "q" }),
    React.createElement(TextInput, { source: "name" }),
    React.createElement(TextInput, { source: "firstname" }))); };
var ArtistList = function (props) { return (React.createElement(List, __assign({}, props, { filters: React.createElement(ArtistsFilters, null), sort: { field: 'id', order: 'DESC' } }),
    React.createElement(Datagrid, { rowClick: "edit" },
        React.createElement(TextField, { source: "id" }),
        React.createElement(TextField, { source: "firstname" }),
        React.createElement(TextField, { source: "name" })))); };
var ArtistEdit = function (props) { return (React.createElement(Edit, __assign({}, props),
    React.createElement(SimpleForm, null,
        React.createElement(TextInput, { source: "firstname" }),
        React.createElement(TextInput, { source: "name" })))); };
var ArtistShow = function (props) { return (React.createElement(Show, __assign({}, props),
    React.createElement(SimpleShowLayout, null,
        React.createElement(TextField, { source: "firstname" }),
        React.createElement(TextField, { source: "name" })))); };
var ArtistCreate = function (props) { return (React.createElement(Create, __assign({}, props),
    React.createElement(SimpleForm, null,
        React.createElement(TextInput, { source: "firstname" }),
        React.createElement(TextInput, { source: "name" })))); };
export var DefaultLayout = function () { return (React.createElement(Admin, { dataProvider: dataProvider, history: createMemoryHistory() },
    React.createElement(Resource, { name: "artists", create: ArtistCreate, list: ArtistList, edit: ArtistEdit, show: ArtistShow }))); };
var languages = [
    { locale: 'en', name: 'English 🇬🇧' },
    { locale: 'fr', name: 'Français 🇫🇷' },
];
var CustomAppBar = function (props) { return (React.createElement(AppBar, __assign({ languages: languages }, props))); };
var CustomLayout = function (props) { return (React.createElement(Layout, __assign({ appBar: CustomAppBar }, props))); };
export var WithCustomizedAppBar = function () { return (React.createElement(Admin, { dataProvider: dataProvider, history: createMemoryHistory(), i18nProvider: buildI18nProvider(), layout: CustomLayout },
    React.createElement(Resource, { name: "artists", list: ArtistList, edit: ArtistEdit }))); };
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
export var WithCustomizedTranslations = function () { return (React.createElement(Admin, { dataProvider: dataProvider, history: createMemoryHistory(), i18nProvider: buildI18nProvider(customMessages, 'fr'), layout: CustomLayout },
    React.createElement(Resource, { name: "artists", list: ArtistList, edit: ArtistEdit }))); };
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
    var _a = useTour(), _ = _a[0], start = _a[1].start;
    var handleStart = function () {
        start('example');
    };
    return (React.createElement(AppBar, __assign({}, props),
        React.createElement(Button, { onClick: handleStart, variant: "contained" }, "Start Tour")));
};
var CustomLayoutWithTour = function (props) { return (React.createElement(Layout, __assign({}, props, { appBar: CustomAppBarWithTour, tours: tours }))); };
export var WithTour = function () { return (React.createElement(Admin, { dataProvider: dataProvider, layout: CustomLayoutWithTour },
    React.createElement(Resource, { name: "artists", list: ArtistList, edit: ArtistEdit }))); };
