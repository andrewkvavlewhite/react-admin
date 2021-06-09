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
exports.DarkApp = exports.App = void 0;
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var history_1 = require("history");
var dataProvider_1 = __importDefault(require("./dataProvider"));
var i18nProvider_1 = __importDefault(require("../i18nProvider"));
var CategoriesCreate_1 = __importDefault(require("../CategoriesCreate"));
var src_1 = require("../../src");
var CategoriesEdit = function (props) { return (react_1.default.createElement(src_1.EditNode, __assign({}, props),
    react_1.default.createElement(src_1.SimpleForm, null,
        react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
        react_1.default.createElement(react_admin_1.TextInput, { source: "name" }),
        react_1.default.createElement(react_admin_1.ReferenceManyField, { label: "Products", reference: "products", target: "category_id" },
            react_1.default.createElement(react_admin_1.Datagrid, null,
                react_1.default.createElement(react_admin_1.TextField, { source: "name" })))))); };
var CategoriesList = function (props) { return (react_1.default.createElement(src_1.TreeWithDetails, __assign({ titleField: "name", edit: CategoriesEdit, create: CategoriesCreate_1.default, lazy: true }, props))); };
exports.App = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default, i18nProvider: i18nProvider_1.default, customReducers: { tree: src_1.reducer } },
    react_1.default.createElement(react_admin_1.Resource, { name: "categories", list: CategoriesList }),
    react_1.default.createElement(react_admin_1.Resource, { name: "products", list: react_admin_1.ListGuesser }))); };
exports.DarkApp = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default, i18nProvider: i18nProvider_1.default, customReducers: { tree: src_1.reducer }, theme: { palette: { type: 'dark' } } },
    react_1.default.createElement(react_admin_1.Resource, { name: "categories", list: CategoriesList }),
    react_1.default.createElement(react_admin_1.Resource, { name: "products", list: react_admin_1.ListGuesser }))); };
exports.default = { title: 'ra-tree/TreeWithDetails/Lazy' };
