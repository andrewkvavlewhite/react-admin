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
var src_1 = require("../../../../src");
var VenueEdit = function (props) { return (react_1.default.createElement(react_admin_1.Edit, __assign({}, props),
    react_1.default.createElement(react_admin_1.SimpleForm, null,
        react_1.default.createElement(react_admin_1.TextInput, { source: "name" }),
        react_1.default.createElement(react_admin_1.TextInput, { source: "location" }),
        react_1.default.createElement(react_admin_1.Labeled, { label: "All bands", fullWidth: true },
            react_1.default.createElement(src_1.ReferenceManyToManyField, { source: "id", reference: "bands", through: "performances", using: "venue_id,band_id" },
                react_1.default.createElement(react_admin_1.SingleFieldList, null,
                    react_1.default.createElement(react_admin_1.ChipField, { source: "name" })))),
        react_1.default.createElement(react_admin_1.ReferenceManyField, { reference: "performances", target: "venue_id", label: "Latest Performances", sort: { field: 'date', order: 'DESC' }, perPage: 10, fullWidth: true },
            react_1.default.createElement(react_admin_1.Datagrid, { rowClick: "edit" },
                react_1.default.createElement(react_admin_1.DateField, { source: "date" }),
                react_1.default.createElement(react_admin_1.ReferenceField, { source: "band_id", reference: "bands" },
                    react_1.default.createElement(react_admin_1.TextField, { source: "name" })),
                react_1.default.createElement(react_admin_1.EditButton, null)))))); };
exports.default = VenueEdit;
