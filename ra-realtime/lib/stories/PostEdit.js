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
exports.EditActions = void 0;
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var src_1 = require("../src");
var simulateActions_1 = require("./simulateActions");
exports.EditActions = function (props) {
    return (react_1.default.createElement(react_admin_1.TopToolbar, null,
        react_1.default.createElement(simulateActions_1.CustomPopper, null,
            react_1.default.createElement(simulateActions_1.AddPostButton, null),
            react_1.default.createElement(simulateActions_1.DeletePostButton, { record: props.data }),
            react_1.default.createElement(simulateActions_1.UpdatePostButton, { record: props.data, dataProvider: props.dataProvider })),
        props.hasShow && (react_1.default.createElement(react_admin_1.ShowButton, { record: props.data, basePath: props.basePath }))));
};
var BuildPostEdit = function (dataProvider) {
    var BuiltPostEdit = function (props) { return (react_1.default.createElement(src_1.RealTimeEdit, __assign({}, props, { actions: react_1.default.createElement(exports.EditActions, { dataProvider: dataProvider, hasShow: props.hasShow }) }),
        react_1.default.createElement(react_admin_1.SimpleForm, null,
            react_1.default.createElement(react_admin_1.TextInput, { source: "title" })))); };
    return BuiltPostEdit;
};
exports.default = BuildPostEdit;
