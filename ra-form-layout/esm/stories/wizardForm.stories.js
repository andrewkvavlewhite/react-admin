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
import { createMemoryHistory } from 'history';
import { required, Admin, Resource, List, SimpleList, Edit, Create, SimpleForm, Show, SimpleShowLayout, TextField, TextInput, } from 'react-admin';
import { WizardForm, WizardFormStep } from '../src';
import i18nProvider from './i18nProvider';
var dataProvider = fakeRestProvider({
    posts: [
        { id: 1, title: 'Lorem Ipsum', description: '' },
        { id: 2, title: 'Sic dolor amet', description: 'Almost empty' },
    ],
}, true);
export default {
    title: 'ra-form-layout/Wizard Form',
};
var PostList = function (props) { return (React.createElement(List, __assign({}, props),
    React.createElement(SimpleList, { primaryText: function (record) { return record.title; } }))); };
var PostEdit = function (props) { return (React.createElement(Edit, __assign({}, props),
    React.createElement(SimpleForm, null,
        React.createElement(TextInput, { source: "title" }),
        React.createElement(TextInput, { source: "description" }),
        React.createElement(TextInput, { source: "fullDescription" })))); };
var PostCreate = function (props) { return (React.createElement(Create, __assign({}, props),
    React.createElement(WizardForm, null,
        React.createElement(WizardFormStep, { label: "First step" },
            React.createElement(TextInput, { source: "title", validate: required() })),
        React.createElement(WizardFormStep, { label: "Second step" },
            React.createElement(TextInput, { source: "description" })),
        React.createElement(WizardFormStep, { label: "Third step" },
            React.createElement(TextInput, { source: "fullDescription", validate: required() }))))); };
var PostShow = function (props) { return (React.createElement(Show, __assign({}, props),
    React.createElement(SimpleShowLayout, null,
        React.createElement(TextField, { source: "title" }),
        React.createElement(TextField, { source: "description" }),
        React.createElement(TextField, { source: "fullDescription" })))); };
export var Basic = function () { return (React.createElement(Admin, { history: createMemoryHistory(), i18nProvider: i18nProvider, dataProvider: dataProvider },
    React.createElement(Resource, { name: "posts", list: PostList, edit: PostEdit, show: PostShow, create: PostCreate }))); };
