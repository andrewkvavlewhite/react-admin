"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleTree = void 0;
var react_1 = __importDefault(require("react"));
var src_1 = require("../../src");
var treeData_1 = __importDefault(require("./treeData"));
exports.SimpleTree = function () { return (react_1.default.createElement(src_1.Tree, { treeData: treeData_1.default, defaultSelectedKeys: ['10'], defaultExpandedKeys: ['10'] })); };
exports.default = { title: 'ra-tree/Tree/defaultSelectedKeys' };
