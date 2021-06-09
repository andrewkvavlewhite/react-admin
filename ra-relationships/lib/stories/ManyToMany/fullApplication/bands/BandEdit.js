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
var BandEdit = function (props) {
    return (react_1.default.createElement(react_admin_1.Edit, __assign({}, props),
        react_1.default.createElement(src_1.ManyToManyReferenceContextProvider, null,
            react_1.default.createElement(react_admin_1.SimpleForm, { redirect: false },
                react_1.default.createElement(react_admin_1.TextInput, { source: "name" }),
                react_1.default.createElement(src_1.ReferenceManyToManyInput, { reference: "venues", through: "performances", using: "band_id,venue_id", fullWidth: true, label: "Performances", validate: react_admin_1.required() },
                    react_1.default.createElement(react_admin_1.SelectArrayInput, { optionText: "name" })),
                react_1.default.createElement(src_1.ReferenceManyToManyInput, { reference: "artists", through: "members", using: "band_id,artist_id", fullWidth: true, label: "Members", validate: react_admin_1.required() },
                    react_1.default.createElement(react_admin_1.SelectArrayInput, { optionText: "name" }))))));
};
exports.default = BandEdit;
