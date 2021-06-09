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
var BandList = function (props) {
    return (react_1.default.createElement(react_admin_1.List, __assign({}, props, { sort: { field: 'name', order: 'ASC' } }),
        react_1.default.createElement(react_admin_1.Datagrid, null,
            react_1.default.createElement(react_admin_1.TextField, { source: "name" }),
            react_1.default.createElement(react_admin_1.ReferenceArrayField, { source: "genres_ids", label: "Genres", reference: "genres" },
                react_1.default.createElement(react_admin_1.SingleFieldList, { linkType: false },
                    react_1.default.createElement(react_admin_1.ChipField, { source: "name" }))),
            react_1.default.createElement(react_admin_1.EditButton, null))));
};
exports.default = BandList;
