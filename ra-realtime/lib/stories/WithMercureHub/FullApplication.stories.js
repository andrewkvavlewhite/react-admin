"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullApplication = void 0;
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var history_1 = require("history");
var i18nProvider_1 = __importDefault(require("../i18nProvider"));
var realTimeDataProvider_1 = require("../realTimeDataProvider");
var __1 = require("../");
exports.default = {
    title: 'ra-realtime/WithMercureHub',
};
exports.FullApplication = function () { return (react_1.default.createElement(react_admin_1.Admin, { dataProvider: realTimeDataProvider_1.mercureDataProvider, layout: __1.Layout, i18nProvider: i18nProvider_1.default, dashboard: __1.Dashboard, history: history_1.createMemoryHistory() },
    react_1.default.createElement(react_admin_1.Resource, { name: "posts", list: __1.PostList, show: __1.PostShow(realTimeDataProvider_1.mercureDataProvider), edit: __1.PostEdit(realTimeDataProvider_1.mercureDataProvider), create: __1.PostCreate }))); };
