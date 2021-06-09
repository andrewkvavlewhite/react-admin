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
exports.RowClick = exports.NoDelete = exports.Undoable = exports.Basic = void 0;
var react_1 = __importDefault(require("react"));
var ra_data_fakerest_1 = __importDefault(require("ra-data-fakerest"));
var react_admin_1 = require("react-admin");
var history_1 = require("history");
var src_1 = require("../src");
exports.default = { title: 'ra-editable-datagrid/EditableDatagrid' };
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
var professionChoices = [
    { id: 'actor', name: 'Actor' },
    { id: 'singer', name: 'Singer' },
    { id: 'other', name: 'Other' },
];
var ArtistForm = function (props) { return (react_1.default.createElement(src_1.RowForm, __assign({ initialValues: { firstname: 'John', name: 'Doe' } }, props),
    react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
    react_1.default.createElement(react_admin_1.TextInput, { source: "firstname", validate: react_admin_1.required() }),
    react_1.default.createElement(react_admin_1.TextInput, { source: "name", validate: react_admin_1.required() }),
    react_1.default.createElement(react_admin_1.DateInput, { source: "dob", label: "born", validate: react_admin_1.required() }),
    react_1.default.createElement(react_admin_1.SelectInput, { source: "prof", label: "Profession", choices: professionChoices }))); };
var ArtistList = function (props) { return (react_1.default.createElement(react_admin_1.List, __assign({}, props, { hasCreate: true, sort: { field: 'id', order: 'DESC' }, empty: false }),
    react_1.default.createElement(src_1.EditableDatagrid, { createForm: react_1.default.createElement(ArtistForm, null), editForm: react_1.default.createElement(ArtistForm, null) },
        react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
        react_1.default.createElement(react_admin_1.TextField, { source: "firstname" }),
        react_1.default.createElement(react_admin_1.TextField, { source: "name" }),
        react_1.default.createElement(react_admin_1.DateField, { source: "dob", label: "born" }),
        react_1.default.createElement(react_admin_1.SelectField, { source: "prof", label: "Profession", choices: professionChoices })))); };
exports.Basic = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider },
    react_1.default.createElement(react_admin_1.Resource, { name: "artists", list: ArtistList }))); };
var ArtistListUndoable = function (props) { return (react_1.default.createElement(react_admin_1.List, __assign({}, props, { hasCreate: true, sort: { field: 'id', order: 'DESC' }, empty: false }),
    react_1.default.createElement(src_1.EditableDatagrid, { undoable: true, createForm: react_1.default.createElement(ArtistForm, null), editForm: react_1.default.createElement(ArtistForm, null) },
        react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
        react_1.default.createElement(react_admin_1.TextField, { source: "firstname" }),
        react_1.default.createElement(react_admin_1.TextField, { source: "name" }),
        react_1.default.createElement(react_admin_1.DateField, { source: "dob", label: "born" }),
        react_1.default.createElement(react_admin_1.SelectField, { source: "prof", label: "Profession", choices: professionChoices })))); };
exports.Undoable = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider },
    react_1.default.createElement(react_admin_1.Resource, { name: "artists", list: ArtistListUndoable }))); };
var ArtistListNoDelete = function (props) { return (react_1.default.createElement(react_admin_1.List, __assign({}, props, { hasCreate: true, sort: { field: 'id', order: 'DESC' }, empty: false }),
    react_1.default.createElement(src_1.EditableDatagrid, { noDelete: true, createForm: react_1.default.createElement(ArtistForm, null), editForm: react_1.default.createElement(ArtistForm, null) },
        react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
        react_1.default.createElement(react_admin_1.TextField, { source: "firstname" }),
        react_1.default.createElement(react_admin_1.TextField, { source: "name" }),
        react_1.default.createElement(react_admin_1.DateField, { source: "dob", label: "born" }),
        react_1.default.createElement(react_admin_1.SelectField, { source: "prof", label: "Profession", choices: professionChoices })))); };
exports.NoDelete = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider },
    react_1.default.createElement(react_admin_1.Resource, { name: "artists", list: ArtistListNoDelete }))); };
var ArtistListRowClick = function (props) { return (react_1.default.createElement(react_admin_1.List, __assign({}, props, { hasCreate: true, sort: { field: 'id', order: 'DESC' }, empty: false }),
    react_1.default.createElement(src_1.EditableDatagrid, { createForm: react_1.default.createElement(ArtistForm, null), editForm: react_1.default.createElement(ArtistForm, null), rowClick: "edit" },
        react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
        react_1.default.createElement(react_admin_1.TextField, { source: "firstname" }),
        react_1.default.createElement(react_admin_1.TextField, { source: "name" }),
        react_1.default.createElement(react_admin_1.DateField, { source: "dob", label: "born" }),
        react_1.default.createElement(react_admin_1.SelectField, { source: "prof", label: "Profession", choices: professionChoices })))); };
exports.RowClick = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider },
    react_1.default.createElement(react_admin_1.Resource, { name: "artists", list: ArtistListRowClick }))); };
