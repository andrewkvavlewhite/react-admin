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
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var EditNode_1 = __importDefault(require("../src/EditNode"));
var SimpleForm_1 = __importDefault(require("../src/SimpleForm"));
var CategoriesEdit = function (props) { return (react_1.default.createElement(EditNode_1.default, __assign({}, props),
    react_1.default.createElement(SimpleForm_1.default, null,
        react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
        react_1.default.createElement(react_admin_1.TextInput, { source: "name" })))); };
exports.default = CategoriesEdit;
