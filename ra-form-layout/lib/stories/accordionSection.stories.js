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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomStyles = exports.FullWidth = exports.Basic = void 0;
/* eslint-disable @typescript-eslint/ban-types */
var react_1 = __importStar(require("react"));
var react_admin_1 = require("react-admin");
var history_1 = require("history");
var styles_1 = require("@material-ui/core/styles");
var colors_1 = require("@material-ui/core/colors");
var src_1 = require("../src");
var i18nProvider_1 = __importDefault(require("./i18nProvider"));
var common_1 = require("./common");
var CustomerEdit = function (props) { return (react_1.default.createElement(react_admin_1.Edit, __assign({}, props, { title: react_1.default.createElement(common_1.CustomerTitle, null) }),
    react_1.default.createElement(react_admin_1.SimpleForm, null,
        react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
        react_1.default.createElement(react_admin_1.TextInput, { source: "first_name", validate: react_admin_1.required() }),
        react_1.default.createElement(react_admin_1.TextInput, { source: "last_name", validate: react_admin_1.required() }),
        react_1.default.createElement(react_admin_1.DateInput, { source: "dob", label: "born", validate: react_admin_1.required() }),
        react_1.default.createElement(react_admin_1.SelectInput, { source: "sex", choices: common_1.sexChoices }),
        react_1.default.createElement(src_1.AccordionSection, { label: "Occupations" },
            react_1.default.createElement(react_admin_1.ArrayInput, { source: "occupations", label: "" },
                react_1.default.createElement(react_admin_1.SimpleFormIterator, null,
                    react_1.default.createElement(react_admin_1.TextInput, { source: "name", validate: react_admin_1.required() }),
                    react_1.default.createElement(react_admin_1.DateInput, { source: "from", validate: react_admin_1.required() }),
                    react_1.default.createElement(react_admin_1.DateInput, { source: "to" })))),
        react_1.default.createElement(src_1.AccordionSection, { label: "Preferences" },
            react_1.default.createElement(react_admin_1.SelectInput, { source: "language", choices: common_1.languageChoices, defaultValue: "en" }),
            react_1.default.createElement(react_admin_1.BooleanInput, { source: "dark_theme" }),
            react_1.default.createElement(react_admin_1.BooleanInput, { source: "accepts_emails_from_partners" }))))); };
exports.Basic = function () {
    var history = history_1.createHashHistory();
    react_1.useEffect(function () {
        history.replace('/customers/5/edit');
    }, [history]);
    return (react_1.default.createElement(react_admin_1.Admin, { dataProvider: common_1.dataProvider, i18nProvider: i18nProvider_1.default, history: history },
        react_1.default.createElement(react_admin_1.Resource, { name: "customers", list: common_1.CustomerList, edit: CustomerEdit, create: common_1.CustomerCreate })));
};
var CustomerEditFullWidth = function (props) { return (react_1.default.createElement(react_admin_1.Edit, __assign({}, props, { title: react_1.default.createElement(common_1.CustomerTitle, null) }),
    react_1.default.createElement(react_admin_1.SimpleForm, null,
        react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
        react_1.default.createElement(react_admin_1.TextInput, { source: "first_name", validate: react_admin_1.required() }),
        react_1.default.createElement(react_admin_1.TextInput, { source: "last_name", validate: react_admin_1.required() }),
        react_1.default.createElement(react_admin_1.DateInput, { source: "dob", label: "born", validate: react_admin_1.required() }),
        react_1.default.createElement(react_admin_1.SelectInput, { source: "sex", choices: common_1.sexChoices }),
        react_1.default.createElement(src_1.AccordionSection, { label: "Occupations", fullWidth: true },
            react_1.default.createElement(react_admin_1.ArrayInput, { source: "occupations", label: "" },
                react_1.default.createElement(react_admin_1.SimpleFormIterator, null,
                    react_1.default.createElement(react_admin_1.TextInput, { source: "name", validate: react_admin_1.required() }),
                    react_1.default.createElement(react_admin_1.DateInput, { source: "from", validate: react_admin_1.required() }),
                    react_1.default.createElement(react_admin_1.DateInput, { source: "to" })))),
        react_1.default.createElement(src_1.AccordionSection, { label: "Preferences", fullWidth: true },
            react_1.default.createElement(react_admin_1.SelectInput, { source: "language", choices: common_1.languageChoices, defaultValue: "en" }),
            react_1.default.createElement(react_admin_1.BooleanInput, { source: "dark_theme" }),
            react_1.default.createElement(react_admin_1.BooleanInput, { source: "accepts_emails_from_partners" }))))); };
exports.FullWidth = function () {
    var history = history_1.createHashHistory();
    react_1.useEffect(function () {
        history.replace('/customers/5/edit');
    }, [history]);
    return (react_1.default.createElement(react_admin_1.Admin, { dataProvider: common_1.dataProvider, i18nProvider: i18nProvider_1.default, history: history },
        react_1.default.createElement(react_admin_1.Resource, { name: "customers", list: common_1.CustomerList, edit: CustomerEditFullWidth, create: common_1.CustomerCreate })));
};
var CustomerEditCustomStyles = function (props) {
    var accordionDetailsBlueClasses = useAccordionDetailsBlueStyles();
    var accordionDetailsGreenClasses = useAccordionDetailsGreenStyles();
    return (react_1.default.createElement(react_admin_1.Edit, __assign({}, props, { title: react_1.default.createElement(common_1.CustomerTitle, null) }),
        react_1.default.createElement(react_admin_1.SimpleForm, null,
            react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
            react_1.default.createElement(react_admin_1.TextInput, { source: "first_name", validate: react_admin_1.required() }),
            react_1.default.createElement(react_admin_1.TextInput, { source: "last_name", validate: react_admin_1.required() }),
            react_1.default.createElement(react_admin_1.DateInput, { source: "dob", label: "born", validate: react_admin_1.required() }),
            react_1.default.createElement(react_admin_1.SelectInput, { source: "sex", choices: common_1.sexChoices }),
            react_1.default.createElement(src_1.AccordionSection, { label: "Occupations", classes: accordionDetailsBlueClasses },
                react_1.default.createElement(react_admin_1.ArrayInput, { source: "occupations", label: "" },
                    react_1.default.createElement(react_admin_1.SimpleFormIterator, null,
                        react_1.default.createElement(react_admin_1.TextInput, { source: "name", validate: react_admin_1.required() }),
                        react_1.default.createElement(react_admin_1.DateInput, { source: "from", validate: react_admin_1.required() }),
                        react_1.default.createElement(react_admin_1.DateInput, { source: "to" })))),
            react_1.default.createElement(src_1.AccordionSection, { label: "Preferences", classes: accordionDetailsGreenClasses },
                react_1.default.createElement(react_admin_1.SelectInput, { source: "language", choices: common_1.languageChoices, defaultValue: "en" }),
                react_1.default.createElement(react_admin_1.BooleanInput, { source: "dark_theme" }),
                react_1.default.createElement(react_admin_1.BooleanInput, { source: "accepts_emails_from_partners" })))));
};
var useAccordionDetailsBlueStyles = styles_1.makeStyles(function () { return ({
    detail: {
        backgroundColor: colors_1.blue[100],
    },
}); });
var useAccordionDetailsGreenStyles = styles_1.makeStyles(function () { return ({
    detail: {
        backgroundColor: colors_1.green[100],
    },
}); });
exports.CustomStyles = function () {
    var history = history_1.createHashHistory();
    react_1.useEffect(function () {
        history.replace('/customers/5/edit');
    }, [history]);
    return (react_1.default.createElement(react_admin_1.Admin, { dataProvider: common_1.dataProvider, i18nProvider: i18nProvider_1.default, history: history },
        react_1.default.createElement(react_admin_1.Resource, { name: "customers", list: common_1.CustomerList, edit: CustomerEditCustomStyles, create: common_1.CustomerCreate })));
};
exports.default = { title: 'ra-form-layout/AccordionSection' };
