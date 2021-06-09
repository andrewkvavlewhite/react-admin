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
exports.ListActions = void 0;
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var simulateActions_1 = require("./simulateActions");
var src_1 = require("../src");
exports.ListActions = function (props) { return (react_1.default.createElement(react_admin_1.TopToolbar, null,
    react_1.default.createElement(simulateActions_1.CustomPopper, null,
        react_1.default.createElement(simulateActions_1.AddPostButton, null),
        react_1.default.createElement(simulateActions_1.DeletePostButton, null)),
    props.hasCreate && react_1.default.createElement(react_admin_1.CreateButton, { basePath: props.basePath }))); };
var PostList = function (props) { return (react_1.default.createElement(src_1.RealTimeList, __assign({}, props, { actions: react_1.default.createElement(exports.ListActions, { hasCreate: props.hasCreate }) }),
    react_1.default.createElement(react_admin_1.SimpleList, { primaryText: function (record) { return record.title; } }))); };
exports.default = PostList;
