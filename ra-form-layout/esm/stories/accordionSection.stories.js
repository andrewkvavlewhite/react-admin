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
import React, { useEffect } from 'react';
import { Admin, ArrayInput, BooleanInput, Resource, TextField, TextInput, DateInput, SelectInput, SimpleForm, SimpleFormIterator, Edit, required, } from 'react-admin';
import { createHashHistory } from 'history';
import { makeStyles } from '@material-ui/core/styles';
import { blue, green } from '@material-ui/core/colors';
import { AccordionSection } from '../src';
import i18nProvider from './i18nProvider';
import { dataProvider, sexChoices, languageChoices, CustomerList, CustomerCreate, CustomerTitle, } from './common';
var CustomerEdit = function (props) { return (React.createElement(Edit, __assign({}, props, { title: React.createElement(CustomerTitle, null) }),
    React.createElement(SimpleForm, null,
        React.createElement(TextField, { source: "id" }),
        React.createElement(TextInput, { source: "first_name", validate: required() }),
        React.createElement(TextInput, { source: "last_name", validate: required() }),
        React.createElement(DateInput, { source: "dob", label: "born", validate: required() }),
        React.createElement(SelectInput, { source: "sex", choices: sexChoices }),
        React.createElement(AccordionSection, { label: "Occupations" },
            React.createElement(ArrayInput, { source: "occupations", label: "" },
                React.createElement(SimpleFormIterator, null,
                    React.createElement(TextInput, { source: "name", validate: required() }),
                    React.createElement(DateInput, { source: "from", validate: required() }),
                    React.createElement(DateInput, { source: "to" })))),
        React.createElement(AccordionSection, { label: "Preferences" },
            React.createElement(SelectInput, { source: "language", choices: languageChoices, defaultValue: "en" }),
            React.createElement(BooleanInput, { source: "dark_theme" }),
            React.createElement(BooleanInput, { source: "accepts_emails_from_partners" }))))); };
export var Basic = function () {
    var history = createHashHistory();
    useEffect(function () {
        history.replace('/customers/5/edit');
    }, [history]);
    return (React.createElement(Admin, { dataProvider: dataProvider, i18nProvider: i18nProvider, history: history },
        React.createElement(Resource, { name: "customers", list: CustomerList, edit: CustomerEdit, create: CustomerCreate })));
};
var CustomerEditFullWidth = function (props) { return (React.createElement(Edit, __assign({}, props, { title: React.createElement(CustomerTitle, null) }),
    React.createElement(SimpleForm, null,
        React.createElement(TextField, { source: "id" }),
        React.createElement(TextInput, { source: "first_name", validate: required() }),
        React.createElement(TextInput, { source: "last_name", validate: required() }),
        React.createElement(DateInput, { source: "dob", label: "born", validate: required() }),
        React.createElement(SelectInput, { source: "sex", choices: sexChoices }),
        React.createElement(AccordionSection, { label: "Occupations", fullWidth: true },
            React.createElement(ArrayInput, { source: "occupations", label: "" },
                React.createElement(SimpleFormIterator, null,
                    React.createElement(TextInput, { source: "name", validate: required() }),
                    React.createElement(DateInput, { source: "from", validate: required() }),
                    React.createElement(DateInput, { source: "to" })))),
        React.createElement(AccordionSection, { label: "Preferences", fullWidth: true },
            React.createElement(SelectInput, { source: "language", choices: languageChoices, defaultValue: "en" }),
            React.createElement(BooleanInput, { source: "dark_theme" }),
            React.createElement(BooleanInput, { source: "accepts_emails_from_partners" }))))); };
export var FullWidth = function () {
    var history = createHashHistory();
    useEffect(function () {
        history.replace('/customers/5/edit');
    }, [history]);
    return (React.createElement(Admin, { dataProvider: dataProvider, i18nProvider: i18nProvider, history: history },
        React.createElement(Resource, { name: "customers", list: CustomerList, edit: CustomerEditFullWidth, create: CustomerCreate })));
};
var CustomerEditCustomStyles = function (props) {
    var accordionDetailsBlueClasses = useAccordionDetailsBlueStyles();
    var accordionDetailsGreenClasses = useAccordionDetailsGreenStyles();
    return (React.createElement(Edit, __assign({}, props, { title: React.createElement(CustomerTitle, null) }),
        React.createElement(SimpleForm, null,
            React.createElement(TextField, { source: "id" }),
            React.createElement(TextInput, { source: "first_name", validate: required() }),
            React.createElement(TextInput, { source: "last_name", validate: required() }),
            React.createElement(DateInput, { source: "dob", label: "born", validate: required() }),
            React.createElement(SelectInput, { source: "sex", choices: sexChoices }),
            React.createElement(AccordionSection, { label: "Occupations", classes: accordionDetailsBlueClasses },
                React.createElement(ArrayInput, { source: "occupations", label: "" },
                    React.createElement(SimpleFormIterator, null,
                        React.createElement(TextInput, { source: "name", validate: required() }),
                        React.createElement(DateInput, { source: "from", validate: required() }),
                        React.createElement(DateInput, { source: "to" })))),
            React.createElement(AccordionSection, { label: "Preferences", classes: accordionDetailsGreenClasses },
                React.createElement(SelectInput, { source: "language", choices: languageChoices, defaultValue: "en" }),
                React.createElement(BooleanInput, { source: "dark_theme" }),
                React.createElement(BooleanInput, { source: "accepts_emails_from_partners" })))));
};
var useAccordionDetailsBlueStyles = makeStyles(function () { return ({
    detail: {
        backgroundColor: blue[100],
    },
}); });
var useAccordionDetailsGreenStyles = makeStyles(function () { return ({
    detail: {
        backgroundColor: green[100],
    },
}); });
export var CustomStyles = function () {
    var history = createHashHistory();
    useEffect(function () {
        history.replace('/customers/5/edit');
    }, [history]);
    return (React.createElement(Admin, { dataProvider: dataProvider, i18nProvider: i18nProvider, history: history },
        React.createElement(Resource, { name: "customers", list: CustomerList, edit: CustomerEditCustomStyles, create: CustomerCreate })));
};
export default { title: 'ra-form-layout/AccordionSection' };
