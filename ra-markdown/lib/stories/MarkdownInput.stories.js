"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleDark = exports.Simple = void 0;
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var ra_test_1 = require("ra-test");
var core_1 = require("@material-ui/core");
var MarkdownInput_1 = __importDefault(require("../src/MarkdownInput"));
exports.default = { title: 'ra-markdown/MarkdownInput' };
var MyToolbar = function () { return (react_1.default.createElement(core_1.Toolbar, null,
    react_1.default.createElement("span", null))); };
var record = { id: 0 };
exports.Simple = function () { return (react_1.default.createElement(ra_test_1.TestContext, { initialState: initialState },
    react_1.default.createElement(core_1.Card, null,
        react_1.default.createElement(core_1.CardContent, null,
            react_1.default.createElement(react_admin_1.SimpleForm, { resource: "posts", record: record, toolbar: react_1.default.createElement(MyToolbar, null) },
                react_1.default.createElement(MarkdownInput_1.default, { label: "Body", source: "body" })))))); };
exports.SimpleDark = function () { return (react_1.default.createElement(core_1.ThemeProvider, { theme: core_1.createMuiTheme({ palette: { type: 'dark' } }) },
    react_1.default.createElement(exports.Simple, null))); };
var initialState = {
    admin: {
        resources: {
            posts: {
                data: { 7: { id: 7 } },
            },
        },
    },
};
