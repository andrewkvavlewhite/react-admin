"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Basic = void 0;
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var src_1 = require("../src");
exports.default = { title: 'ra-preferences/usePreferences' };
var Preferences = function () {
    var preferences = src_1.usePreferences()[0];
    return (react_1.default.createElement(core_1.Typography, { component: "p", gutterBottom: true },
        "Preferences: ",
        JSON.stringify(preferences)));
};
var Theme = function () {
    var theme = src_1.usePreferences('theme')[0];
    return (react_1.default.createElement(core_1.Typography, { component: "p", gutterBottom: true },
        "Theme: ",
        theme));
};
var FontSize = function () {
    var fontSize = src_1.usePreferences('fontSize')[0];
    return (react_1.default.createElement(core_1.Typography, { component: "p", gutterBottom: true },
        "Font Size: ",
        fontSize));
};
exports.Basic = function () { return (react_1.default.createElement(core_1.Card, null,
    react_1.default.createElement(core_1.CardContent, null,
        react_1.default.createElement(Preferences, null),
        react_1.default.createElement(Theme, null),
        react_1.default.createElement(FontSize, null)))); };
