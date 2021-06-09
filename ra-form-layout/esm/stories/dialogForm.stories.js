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
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { Admin, Resource, TabbedForm, FormTab, TextInput, DateInput, SelectInput, required, } from 'react-admin';
import { createHashHistory } from 'history';
import { CreateDialog, EditDialog } from '../src';
import i18nProvider from './i18nProvider';
import { dataProvider, CustomerList, CustomerForm, sexChoices } from './common';
var CustomerListDialogs = function (props) { return (React.createElement(React.Fragment, null,
    React.createElement(CustomerList, __assign({}, props)),
    React.createElement(CreateDialog, __assign({}, props, { fullWidth: true, maxWidth: "md" }),
        React.createElement(CustomerForm, null)),
    React.createElement(EditDialog, __assign({}, props, { fullWidth: true, maxWidth: "md" }),
        React.createElement(CustomerForm, null)))); };
export var Basic = function () {
    var history = createHashHistory();
    return (React.createElement(Admin, { dataProvider: dataProvider, i18nProvider: i18nProvider, history: history },
        React.createElement(Resource, { name: "customers", list: CustomerListDialogs })));
};
var EditDialogTitle = function (_a) {
    var record = _a.record;
    return (React.createElement("span", null, record ? record.last_name + " " + record.first_name : ''));
};
var CustomerListDialogsWithTitles = function (props) { return (React.createElement(React.Fragment, null,
    React.createElement(CustomerList, __assign({}, props)),
    React.createElement(CreateDialog, __assign({}, props, { fullWidth: true, maxWidth: "md", title: "Create a new customer" }),
        React.createElement(CustomerForm, null)),
    React.createElement(EditDialog, __assign({}, props, { fullWidth: true, maxWidth: "md", title: React.createElement(EditDialogTitle, null) }),
        React.createElement(CustomerForm, null)))); };
export var WithCustomTitles = function () {
    var history = createHashHistory();
    return (React.createElement(Admin, { dataProvider: dataProvider, i18nProvider: i18nProvider, history: history },
        React.createElement(Resource, { name: "customers", list: CustomerListDialogsWithTitles })));
};
var CustomerTabbedForm = function (props) { return (React.createElement(TabbedForm, __assign({}, props),
    React.createElement(FormTab, { label: "Identity" },
        React.createElement(TextInput, { source: "first_name", validate: required(), fullWidth: true }),
        React.createElement(TextInput, { source: "last_name", validate: required(), fullWidth: true })),
    React.createElement(FormTab, { label: "Informations" },
        React.createElement(DateInput, { source: "dob", label: "born", validate: required(), fullWidth: true }),
        React.createElement(SelectInput, { source: "sex", choices: sexChoices, fullWidth: true })))); };
var CustomerListDialogsWithTabbedForm = function (props) { return (React.createElement(React.Fragment, null,
    React.createElement(CustomerList, __assign({}, props)),
    React.createElement(CreateDialog, __assign({}, props, { fullWidth: true, maxWidth: "md" }),
        React.createElement(CustomerTabbedForm, null)),
    React.createElement(EditDialog, __assign({}, props, { fullWidth: true, maxWidth: "md", title: React.createElement(EditDialogTitle, null) }),
        React.createElement(CustomerTabbedForm, null)))); };
export var WithTabbedForms = function () {
    var history = createHashHistory();
    return (React.createElement(Admin, { dataProvider: dataProvider, i18nProvider: i18nProvider, history: history },
        React.createElement(Resource, { name: "customers", list: CustomerListDialogsWithTabbedForm })));
};
export default { title: 'ra-form-layout/DialogForm' };
