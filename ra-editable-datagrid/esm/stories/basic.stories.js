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
import fakeRestProvider from 'ra-data-fakerest';
import { Admin, Resource, List, TextField, TextInput, DateField, DateInput, SelectField, SelectInput, required, } from 'react-admin';
import { createMemoryHistory } from 'history';
import { EditableDatagrid, RowForm } from '../src';
export default { title: 'ra-editable-datagrid/EditableDatagrid' };
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
var professionChoices = [
    { id: 'actor', name: 'Actor' },
    { id: 'singer', name: 'Singer' },
    { id: 'other', name: 'Other' },
];
var ArtistForm = function (props) { return (React.createElement(RowForm, __assign({ initialValues: { firstname: 'John', name: 'Doe' } }, props),
    React.createElement(TextField, { source: "id" }),
    React.createElement(TextInput, { source: "firstname", validate: required() }),
    React.createElement(TextInput, { source: "name", validate: required() }),
    React.createElement(DateInput, { source: "dob", label: "born", validate: required() }),
    React.createElement(SelectInput, { source: "prof", label: "Profession", choices: professionChoices }))); };
var ArtistList = function (props) { return (React.createElement(List, __assign({}, props, { hasCreate: true, sort: { field: 'id', order: 'DESC' }, empty: false }),
    React.createElement(EditableDatagrid, { createForm: React.createElement(ArtistForm, null), editForm: React.createElement(ArtistForm, null) },
        React.createElement(TextField, { source: "id" }),
        React.createElement(TextField, { source: "firstname" }),
        React.createElement(TextField, { source: "name" }),
        React.createElement(DateField, { source: "dob", label: "born" }),
        React.createElement(SelectField, { source: "prof", label: "Profession", choices: professionChoices })))); };
export var Basic = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider },
    React.createElement(Resource, { name: "artists", list: ArtistList }))); };
var ArtistListUndoable = function (props) { return (React.createElement(List, __assign({}, props, { hasCreate: true, sort: { field: 'id', order: 'DESC' }, empty: false }),
    React.createElement(EditableDatagrid, { undoable: true, createForm: React.createElement(ArtistForm, null), editForm: React.createElement(ArtistForm, null) },
        React.createElement(TextField, { source: "id" }),
        React.createElement(TextField, { source: "firstname" }),
        React.createElement(TextField, { source: "name" }),
        React.createElement(DateField, { source: "dob", label: "born" }),
        React.createElement(SelectField, { source: "prof", label: "Profession", choices: professionChoices })))); };
export var Undoable = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider },
    React.createElement(Resource, { name: "artists", list: ArtistListUndoable }))); };
var ArtistListNoDelete = function (props) { return (React.createElement(List, __assign({}, props, { hasCreate: true, sort: { field: 'id', order: 'DESC' }, empty: false }),
    React.createElement(EditableDatagrid, { noDelete: true, createForm: React.createElement(ArtistForm, null), editForm: React.createElement(ArtistForm, null) },
        React.createElement(TextField, { source: "id" }),
        React.createElement(TextField, { source: "firstname" }),
        React.createElement(TextField, { source: "name" }),
        React.createElement(DateField, { source: "dob", label: "born" }),
        React.createElement(SelectField, { source: "prof", label: "Profession", choices: professionChoices })))); };
export var NoDelete = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider },
    React.createElement(Resource, { name: "artists", list: ArtistListNoDelete }))); };
var ArtistListRowClick = function (props) { return (React.createElement(List, __assign({}, props, { hasCreate: true, sort: { field: 'id', order: 'DESC' }, empty: false }),
    React.createElement(EditableDatagrid, { createForm: React.createElement(ArtistForm, null), editForm: React.createElement(ArtistForm, null), rowClick: "edit" },
        React.createElement(TextField, { source: "id" }),
        React.createElement(TextField, { source: "firstname" }),
        React.createElement(TextField, { source: "name" }),
        React.createElement(DateField, { source: "dob", label: "born" }),
        React.createElement(SelectField, { source: "prof", label: "Profession", choices: professionChoices })))); };
export var RowClick = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider },
    React.createElement(Resource, { name: "artists", list: ArtistListRowClick }))); };
