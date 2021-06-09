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
exports.Edit = void 0;
var react_1 = __importDefault(require("react"));
var history_1 = require("history");
var react_admin_1 = require("react-admin");
var i18nProvider_1 = __importDefault(require("../i18nProvider"));
var realTimeDataProvider_1 = require("../realTimeDataProvider");
var src_1 = require("../../src");
var simulateActions_1 = require("../simulateActions");
exports.default = {
    title: 'ra-realtime/WithMercureHub',
};
var EditActions = function (props) {
    return (react_1.default.createElement(simulateActions_1.CustomPopper, null,
        react_1.default.createElement(simulateActions_1.AddPostButton, null),
        react_1.default.createElement(simulateActions_1.DeletePostButton, { record: props.data }),
        react_1.default.createElement(simulateActions_1.UpdatePostButton, { record: props.data, dataProvider: props.dataProvider })));
};
var MyListView = function (props) { return (react_1.default.createElement(react_admin_1.List, __assign({}, props),
    react_1.default.createElement(react_admin_1.SimpleList, { primaryText: function (record) { return record.title; } }))); };
var MyRealTimeEditView = function (props) { return (react_1.default.createElement(src_1.RealTimeEdit
// actions prop is only to add Realitime simulation buttons
, __assign({ 
    // actions prop is only to add Realitime simulation buttons
    actions: react_1.default.createElement(EditActions, __assign({ dataProvider: realTimeDataProvider_1.mercureDataProvider }, props)) }, props),
    react_1.default.createElement(react_admin_1.SimpleForm, null,
        react_1.default.createElement(react_admin_1.TextInput, { source: "title" })))); };
exports.Edit = function () { return (react_1.default.createElement(react_admin_1.Admin, { dataProvider: realTimeDataProvider_1.mercureDataProvider, history: history_1.createMemoryHistory(), i18nProvider: i18nProvider_1.default },
    react_1.default.createElement(react_admin_1.Resource, { name: "posts", list: MyListView, edit: MyRealTimeEditView }))); };
