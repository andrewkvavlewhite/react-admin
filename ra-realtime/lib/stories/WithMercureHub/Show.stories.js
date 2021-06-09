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
exports.Show = void 0;
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var history_1 = require("history");
var i18nProvider_1 = __importDefault(require("../i18nProvider"));
var realTimeDataProvider_1 = require("../realTimeDataProvider");
var __1 = require("../");
var src_1 = require("../../src");
exports.default = {
    title: 'ra-realtime/WithMercureHub',
};
var MyListView = function (props) { return (react_1.default.createElement(react_admin_1.List, __assign({}, props),
    react_1.default.createElement(react_admin_1.SimpleList, { primaryText: function (record) { return record.title; }, linkType: "show" }))); };
var MyRealTimeShowView = function (props) { return (react_1.default.createElement(src_1.RealTimeShow
// actions prop is only to add Realitime simulation buttons
, __assign({ 
    // actions prop is only to add Realitime simulation buttons
    actions: react_1.default.createElement(__1.ShowActions, __assign({ dataProvider: realTimeDataProvider_1.mercureDataProvider }, props)) }, props),
    react_1.default.createElement(react_admin_1.SimpleShowLayout, null,
        react_1.default.createElement(react_admin_1.TextField, { source: "title" })))); };
exports.Show = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: realTimeDataProvider_1.mercureDataProvider, i18nProvider: i18nProvider_1.default },
    react_1.default.createElement(react_admin_1.Resource, { name: "posts", list: MyListView, show: MyRealTimeShowView }))); };
