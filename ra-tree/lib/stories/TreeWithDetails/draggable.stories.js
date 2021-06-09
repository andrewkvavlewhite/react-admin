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
var react_admin_1 = require("react-admin");
var history_1 = require("history");
var dataProvider_1 = __importDefault(require("./dataProvider"));
var i18nProvider_1 = __importDefault(require("../i18nProvider"));
var CategoriesEdit_1 = __importDefault(require("../CategoriesEdit"));
var CategoriesCreate_1 = __importDefault(require("../CategoriesCreate"));
var src_1 = require("../../src");
var CategoriesList = function (props) { return (react_1.default.createElement(src_1.TreeWithDetails, __assign({ draggable: true, titleField: "name", edit: CategoriesEdit_1.default, create: CategoriesCreate_1.default }, props))); };
exports.App = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default, i18nProvider: i18nProvider_1.default, customReducers: { tree: src_1.reducer } },
    react_1.default.createElement(react_admin_1.Resource, { name: "categories", list: CategoriesList }))); };
exports.default = { title: 'ra-tree/TreeWithDetails/Draggable' };
