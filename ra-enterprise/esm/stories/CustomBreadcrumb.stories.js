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
import { Resource, ListGuesser, SimpleForm, Datagrid, TextField, TextInput, DateInput, } from 'react-admin';
import { Admin, List, Edit, ListActions, EditActions, } from '../src';
import { Breadcrumb, BreadcrumbItem, ResourceBreadcrumbItems, } from '@react-admin/ra-navigation';
export default { title: 'ra-enterprise/Custom Breadcrumb' };
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
var ArtistListActions = function (props) { return (React.createElement(ListActions, __assign({}, props, { breadcrumb: React.createElement(MyCustomBreadcrumb, { variant: "actions" }) }))); };
var ArtistList = function (props) { return (React.createElement(List, __assign({}, props, { sort: { field: 'id', order: 'DESC' }, actions: React.createElement(ArtistListActions, null) }),
    React.createElement(Datagrid, { rowClick: "edit" },
        React.createElement(TextField, { source: "id" }),
        React.createElement(TextField, { source: "firstname" }),
        React.createElement(TextField, { source: "name" })))); };
var ArtistEditActions = function (props) { return (React.createElement(EditActions, __assign({}, props, { breadcrumb: React.createElement(MyCustomBreadcrumb, { variant: "actions" }) }))); };
var ArtistEdit = function (props) { return (React.createElement(Edit, __assign({}, props, { actions: React.createElement(ArtistEditActions, null) }),
    React.createElement(SimpleForm, null,
        React.createElement(TextInput, { source: "firstname", label: "First Name" }),
        React.createElement(TextInput, { source: "name", label: "Last Name" }),
        React.createElement(DateInput, { source: "dob", label: "Born" })))); };
var MyCustomBreadcrumb = function (props) { return (React.createElement(Breadcrumb, __assign({}, props),
    React.createElement(BreadcrumbItem, { name: "dashboard", label: "My Home" },
        React.createElement(ResourceBreadcrumbItems, { resources: ['songs', 'artists'] })))); };
export var Basic = function () { return (React.createElement(Admin, { dataProvider: dataProvider, history: createMemoryHistory() },
    React.createElement(Resource, { name: "artists", list: ArtistList, edit: ArtistEdit }),
    React.createElement(Resource, { name: "events", list: ListGuesser }),
    React.createElement(Resource, { name: "performances", list: ListGuesser }))); };
