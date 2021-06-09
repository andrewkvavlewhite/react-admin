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
exports.ShowActions = void 0;
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var src_1 = require("../src");
var simulateActions_1 = require("./simulateActions");
exports.ShowActions = function (props) {
    return (react_1.default.createElement(react_admin_1.TopToolbar, null,
        react_1.default.createElement(simulateActions_1.CustomPopper, null,
            react_1.default.createElement(simulateActions_1.AddPostButton, null),
            react_1.default.createElement(simulateActions_1.DeletePostButton, { record: props.data }),
            react_1.default.createElement(simulateActions_1.UpdatePostButton, { record: props.data, dataProvider: props.dataProvider })),
        props.hasEdit && (react_1.default.createElement(react_admin_1.EditButton, { record: props.data, basePath: props.basePath }))));
};
var BuildPostShow = function (dataProvider) {
    var BuiltPostShow = function (props) { return (react_1.default.createElement(src_1.RealTimeShow, __assign({ actions: react_1.default.createElement(exports.ShowActions, { dataProvider: dataProvider, hasEdit: props.hasEdit }) }, props),
        react_1.default.createElement(react_admin_1.SimpleShowLayout, null,
            react_1.default.createElement(react_admin_1.TextField, { source: "title" })))); };
    return BuiltPostShow;
};
exports.default = BuildPostShow;
