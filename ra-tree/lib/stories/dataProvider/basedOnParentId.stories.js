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
        { id: 1, name: 'Clothing', position: 0 },
        { id: 2, name: 'Men', parent_id: 1, position: 0 },
        { id: 3, name: 'Suits', parent_id: 2, position: 0 },
        { id: 4, name: 'Slacks', parent_id: 3, position: 0 },
        { id: 5, name: 'Jackets', parent_id: 3, position: 1 },
        { id: 6, name: 'Women', parent_id: 1, position: 1 },
        { id: 7, name: 'Dresses', parent_id: 6, position: 0 },
        { id: 8, name: 'Evening Gowns', parent_id: 7, position: 0 },
        { id: 9, name: 'Sun Dresses', parent_id: 7, position: 1 },
        { id: 10, name: 'Skirts', parent_id: 6, position: 1 },
        { id: 11, name: 'Blouses', parent_id: 6, position: 2 },
    ],
}, true);
var treeDataProvider = src_1.addTreeMethodsBasedOnParentAndPosition(dataProvider);
var CategoriesList = function (props) { return (react_1.default.createElement(src_1.TreeWithDetails, __assign({ titleField: "name", draggable: true, create: CategoriesCreate_1.default, edit: CategoriesEdit_1.default, allowMultipleRoots: true }, props))); };
exports.App = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: treeDataProvider, i18nProvider: i18nProvider_1.default, customReducers: { tree: src_1.reducer } },
    react_1.default.createElement(react_admin_1.Resource, { name: "categories", list: CategoriesList }))); };
exports.default = { title: 'ra-tree/dataProvider/Based on parentId' };
