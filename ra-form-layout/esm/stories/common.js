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
import { List, Datagrid, TextField, TextInput, DateField, DateInput, SelectField, SelectInput, SimpleForm, Create, required, } from 'react-admin';
export var dataProvider = fakeRestProvider({
    customers: [
        {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            dob: new Date('1966-09-05'),
            sex: 'male',
        },
        {
            id: 2,
            first_name: 'Elmer',
            last_name: 'Jones',
            dob: new Date('1947-03-25'),
            sex: 'male',
        },
        {
            id: 3,
            first_name: 'Jane',
            last_name: 'Doe',
            dob: new Date('1951-01-30'),
            sex: 'female',
        },
        {
            id: 4,
            first_name: 'Anita',
            last_name: 'Johnson',
            dob: new Date('1942-07-13'),
            sex: 'female',
        },
        {
            id: 5,
            first_name: 'Alan',
            last_name: 'Smith',
            dob: new Date('1949-06-22'),
            sex: 'male',
            occupations: [
                {
                    name: 'Construction manager',
                    from: new Date('2017-05-13'),
                },
                {
                    name: 'Construction worker',
                    from: new Date('2003-09-08'),
                    to: new Date('2017-05-12'),
                },
                {
                    name: 'Salesman',
                    from: new Date('2003-05-01'),
                    to: new Date('2003-09-07'),
                },
                {
                    name: 'Fisher',
                    from: new Date('1992-12-02'),
                    to: new Date('2003-04-16'),
                },
                {
                    name: 'Farmer',
                    from: new Date('1984-03-12'),
                    to: new Date('1992-10-17'),
                },
            ],
        },
    ],
    events: [],
    performances: [],
}, true);
export var sexChoices = [
    { id: 'male', name: 'Male' },
    { id: 'female', name: 'Female' },
];
export var languageChoices = [
    { id: 'en', name: 'English' },
    { id: 'fr', name: 'French' },
];
export var CustomerTitle = function (_a) {
    var record = _a.record;
    return (React.createElement("span", null,
        "Customer ",
        record ? record.first_name + " " + record.last_name : ''));
};
export var CustomerForm = function (props) { return (React.createElement(SimpleForm, __assign({ initialValues: { firstname: 'John', name: 'Doe' } }, props),
    React.createElement(TextInput, { source: "first_name", validate: required(), fullWidth: true }),
    React.createElement(TextInput, { source: "last_name", validate: required(), fullWidth: true }),
    React.createElement(DateInput, { source: "dob", label: "born", validate: required(), fullWidth: true }),
    React.createElement(SelectInput, { source: "sex", choices: sexChoices, fullWidth: true }))); };
export var CustomerCreate = function (props) { return (React.createElement(Create, __assign({}, props),
    React.createElement(CustomerForm, null))); };
export var CustomerList = function (props) { return (React.createElement(List, __assign({}, props, { hasCreate: true, sort: { field: 'id', order: 'DESC' }, empty: false }),
    React.createElement(Datagrid, { rowClick: "edit" },
        React.createElement(TextField, { source: "id" }),
        React.createElement(TextField, { source: "first_name" }),
        React.createElement(TextField, { source: "last_name" }),
        React.createElement(DateField, { source: "dob", label: "born" }),
        React.createElement(SelectField, { source: "sex", choices: sexChoices })))); };
