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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import fakeRestProvider from 'ra-data-fakerest';
import { Admin, Resource, List, TextField, TextInput, DateField, DateInput, SelectField, SelectInput, required, } from 'react-admin';
import { Form } from 'react-final-form';
import { TableRow, TableCell, Checkbox, makeStyles } from '@material-ui/core';
import { createMemoryHistory } from 'history';
import { EditableDatagrid, SaveRowButton, CancelEditButton, } from '../src';
export default { title: 'ra-editable-datagrid/Custom Form' };
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
var ArtistForm = function (props) {
    var record = props.record, id = props.id, className = props.className, quitEditMode = props.quitEditMode, selectable = props.selectable, basePath = props.basePath, resource = props.resource, save = props.save, saving = props.saving, selected = props.selected, undoable = props.undoable, rest = __rest(props, ["record", "id", "className", "quitEditMode", "selectable", "basePath", "resource", "save", "saving", "selected", "undoable"]);
    return (React.createElement(Form, __assign({ initialValues: __assign({ firstname: 'John', name: 'Doe' }, record), onSubmit: save }, rest), function (_a) {
        var handleSubmit = _a.handleSubmit, invalid = _a.invalid, dirty = _a.dirty;
        return (React.createElement(TableRow, { className: className, key: id, style: { backgroundColor: '#ffe' } },
            React.createElement(TableCell, { padding: "checkbox" }, selectable && (React.createElement(Checkbox, { color: "primary", checked: selected, disabled: true }))),
            React.createElement(TableCell, null,
                React.createElement(TextField, { source: "id", record: record, resource: resource, basePath: basePath })),
            React.createElement(TableCell, null,
                React.createElement(TextInput, { source: "firstname", validate: required(), record: record, resource: resource, basePath: basePath, helperText: false })),
            React.createElement(TableCell, null,
                React.createElement(TextInput, { source: "name", validate: required(), record: record, resource: resource, basePath: basePath, helperText: false })),
            React.createElement(TableCell, null,
                React.createElement(DateInput, { source: "dob", label: "born", validate: required(), record: record, resource: resource, basePath: basePath, helperText: false })),
            React.createElement(TableCell, null,
                React.createElement(SelectInput, { source: "prof", label: "Profession", choices: professionChoices, record: record, resource: resource, basePath: basePath, helperText: false })),
            React.createElement(TableCell, null,
                React.createElement(SaveRowButton, { dirty: dirty, handleSubmit: handleSubmit, invalid: invalid, quitEditMode: quitEditMode, saving: saving, undoable: undoable }),
                React.createElement(CancelEditButton, { cancel: quitEditMode }))));
    }));
};
var useStyles = makeStyles({
    id: {
        width: '4em',
    },
    textField: {
        width: '14em',
    },
    dateField: {
        width: '14em',
    },
});
var ArtistList = function (props) {
    var classes = useStyles(props);
    return (React.createElement(List, __assign({}, props, { hasCreate: true, sort: { field: 'id', order: 'DESC' }, empty: false }),
        React.createElement(EditableDatagrid, { undoable: true, createForm: React.createElement(ArtistForm, null), editForm: React.createElement(ArtistForm, null), rowClick: "edit" },
            React.createElement(TextField, { source: "id", cellClassName: classes.id }),
            React.createElement(TextField, { source: "firstname", cellClassName: classes.textField }),
            React.createElement(TextField, { source: "name", cellClassName: classes.textField }),
            React.createElement(DateField, { source: "dob", label: "born", cellClassName: classes.dateField }),
            React.createElement(SelectField, { source: "prof", label: "Profession", choices: professionChoices }))));
};
export var Custom = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider },
    React.createElement(Resource, { name: "artists", list: ArtistList }))); };
