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
exports.WithTabbedForms = exports.WithCustomTitles = exports.Basic = void 0;
/* eslint-disable @typescript-eslint/ban-types */
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var history_1 = require("history");
var src_1 = require("../src");
var i18nProvider_1 = __importDefault(require("./i18nProvider"));
var common_1 = require("./common");
var CustomerListDialogs = function (props) { return (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(common_1.CustomerList, __assign({}, props)),
    react_1.default.createElement(src_1.CreateDialog, __assign({}, props, { fullWidth: true, maxWidth: "md" }),
        react_1.default.createElement(common_1.CustomerForm, null)),
    react_1.default.createElement(src_1.EditDialog, __assign({}, props, { fullWidth: true, maxWidth: "md" }),
        react_1.default.createElement(common_1.CustomerForm, null)))); };
exports.Basic = function () {
    var history = history_1.createHashHistory();
    return (react_1.default.createElement(react_admin_1.Admin, { dataProvider: common_1.dataProvider, i18nProvider: i18nProvider_1.default, history: history },
        react_1.default.createElement(react_admin_1.Resource, { name: "customers", list: CustomerListDialogs })));
};
var EditDialogTitle = function (_a) {
    var record = _a.record;
    return (react_1.default.createElement("span", null, record ? record.last_name + " " + record.first_name : ''));
};
var CustomerListDialogsWithTitles = function (props) { return (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(common_1.CustomerList, __assign({}, props)),
    react_1.default.createElement(src_1.CreateDialog, __assign({}, props, { fullWidth: true, maxWidth: "md", title: "Create a new customer" }),
        react_1.default.createElement(common_1.CustomerForm, null)),
    react_1.default.createElement(src_1.EditDialog, __assign({}, props, { fullWidth: true, maxWidth: "md", title: react_1.default.createElement(EditDialogTitle, null) }),
        react_1.default.createElement(common_1.CustomerForm, null)))); };
exports.WithCustomTitles = function () {
    var history = history_1.createHashHistory();
    return (react_1.default.createElement(react_admin_1.Admin, { dataProvider: common_1.dataProvider, i18nProvider: i18nProvider_1.default, history: history },
        react_1.default.createElement(react_admin_1.Resource, { name: "customers", list: CustomerListDialogsWithTitles })));
};
var CustomerTabbedForm = function (props) { return (react_1.default.createElement(react_admin_1.TabbedForm, __assign({}, props),
    react_1.default.createElement(react_admin_1.FormTab, { label: "Identity" },
        react_1.default.createElement(react_admin_1.TextInput, { source: "first_name", validate: react_admin_1.required(), fullWidth: true }),
        react_1.default.createElement(react_admin_1.TextInput, { source: "last_name", validate: react_admin_1.required(), fullWidth: true })),
    react_1.default.createElement(react_admin_1.FormTab, { label: "Informations" },
        react_1.default.createElement(react_admin_1.DateInput, { source: "dob", label: "born", validate: react_admin_1.required(), fullWidth: true }),
        react_1.default.createElement(react_admin_1.SelectInput, { source: "sex", choices: common_1.sexChoices, fullWidth: true })))); };
var CustomerListDialogsWithTabbedForm = function (props) { return (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(common_1.CustomerList, __assign({}, props)),
    react_1.default.createElement(src_1.CreateDialog, __assign({}, props, { fullWidth: true, maxWidth: "md" }),
        react_1.default.createElement(CustomerTabbedForm, null)),
    react_1.default.createElement(src_1.EditDialog, __assign({}, props, { fullWidth: true, maxWidth: "md", title: react_1.default.createElement(EditDialogTitle, null) }),
        react_1.default.createElement(CustomerTabbedForm, null)))); };
exports.WithTabbedForms = function () {
    var history = history_1.createHashHistory();
    return (react_1.default.createElement(react_admin_1.Admin, { dataProvider: common_1.dataProvider, i18nProvider: i18nProvider_1.default, history: history },
        react_1.default.createElement(react_admin_1.Resource, { name: "customers", list: CustomerListDialogsWithTabbedForm })));
};
exports.default = { title: 'ra-form-layout/DialogForm' };
