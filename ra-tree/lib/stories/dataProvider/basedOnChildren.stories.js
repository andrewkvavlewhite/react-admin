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
exports.App = void 0;
var react_1 = __importDefault(require("react"));
var ra_data_fakerest_1 = __importDefault(require("ra-data-fakerest"));
var react_admin_1 = require("react-admin");
var history_1 = require("history");
var i18nProvider_1 = __importDefault(require("../i18nProvider"));
var src_1 = require("../../src");
var CategoriesCreate_1 = __importDefault(require("../CategoriesCreate"));
var CategoriesEdit_1 = __importDefault(require("../CategoriesEdit"));
var dataProvider = ra_data_fakerest_1.default({
    categories: [
        { id: 1, name: 'Clothing', isRoot: true, children: [2, 6] },
        { id: 2, name: 'Men', children: [3] },
        { id: 3, name: 'Suits', children: [4, 5] },
        { id: 4, name: 'Slacks', children: [] },
        { id: 5, name: 'Jackets', children: [] },
        { id: 6, name: 'Women', children: [7, 10, 11] },
        { id: 7, name: 'Dresses', children: [8, 9] },
        { id: 8, name: 'Evening Gowns', children: [] },
        { id: 9, name: 'Sun Dresses', children: [] },
        { id: 10, name: 'Skirts', children: [] },
        { id: 11, name: 'Blouses', children: [] },
    ],
}, true);
var treeDataProvider = src_1.addTreeMethodsBasedOnChildren(dataProvider);
var CategoriesList = function (props) { return (react_1.default.createElement(src_1.TreeWithDetails, __assign({ titleField: "name", draggable: true, create: CategoriesCreate_1.default, edit: CategoriesEdit_1.default, allowMultipleRoots: true }, props))); };
exports.App = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: treeDataProvider, i18nProvider: i18nProvider_1.default, customReducers: { tree: src_1.reducer } },
    react_1.default.createElement(react_admin_1.Resource, { name: "categories", list: CategoriesList }))); };
exports.default = { title: 'ra-tree/dataProvider/Based on children' };
