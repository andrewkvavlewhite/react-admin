"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowLineDark = exports.ShowLine = void 0;
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var src_1 = require("../../src");
var treeData_1 = __importDefault(require("./treeData"));
exports.ShowLine = function () { return (react_1.default.createElement(core_1.Card, null,
    react_1.default.createElement(core_1.CardContent, null,
        react_1.default.createElement(src_1.Tree, { treeData: treeData_1.default, showLine: true })))); };
exports.ShowLineDark = function () { return (react_1.default.createElement(core_1.ThemeProvider, { theme: core_1.createMuiTheme({ palette: { type: 'dark' } }) },
    react_1.default.createElement(exports.ShowLine, null))); };
exports.default = { title: 'ra-tree/Tree/showLine' };
