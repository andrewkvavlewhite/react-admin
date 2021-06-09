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
exports.Menu = void 0;
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var history_1 = require("history");
var i18nProvider_1 = __importDefault(require("../i18nProvider"));
var realTimeDataProvider_1 = require("../realTimeDataProvider");
var __1 = require("../");
var src_1 = require("../../src");
exports.default = {
    title: 'ra-realtime/InLocalBrowser',
};
var CustomLayout = function (props) { return react_1.default.createElement(react_admin_1.Layout, __assign({}, props, { menu: src_1.RealTimeMenu })); };
var MyListView = function (props) { return (react_1.default.createElement(react_admin_1.List, __assign({}, props),
    react_1.default.createElement(react_admin_1.SimpleList, { primaryText: function (record) { return record.title; } }))); };
exports.Menu = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: realTimeDataProvider_1.localBrowserDataProvider, layout: CustomLayout, dashboard: __1.Dashboard, i18nProvider: i18nProvider_1.default },
    react_1.default.createElement(react_admin_1.Resource, { name: "posts", list: MyListView }))); };
