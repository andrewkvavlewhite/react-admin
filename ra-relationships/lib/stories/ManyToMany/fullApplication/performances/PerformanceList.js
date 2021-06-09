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
var PerformanceList = function (props) {
    return (react_1.default.createElement(react_admin_1.List, __assign({}, props, { sort: { field: 'date', order: 'DESC' } }),
        react_1.default.createElement(react_admin_1.Datagrid, null,
            react_1.default.createElement(react_admin_1.DateField, { source: "date" }),
            react_1.default.createElement(react_admin_1.ReferenceField, { source: "band_id", reference: "bands" },
                react_1.default.createElement(react_admin_1.TextField, { source: "name" })),
            react_1.default.createElement(react_admin_1.ReferenceField, { source: "venue_id", reference: "venues" },
                react_1.default.createElement(react_admin_1.TextField, { source: "name" })))));
};
exports.default = PerformanceList;
