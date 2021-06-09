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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongEdit = exports.SongList = exports.ArtistEdit = exports.ArtistList = void 0;
var React = __importStar(require("react"));
var react_admin_1 = require("react-admin");
exports.ArtistList = function (props) { return (React.createElement(react_admin_1.List, __assign({}, props),
    React.createElement(react_admin_1.Datagrid, null,
        React.createElement(react_admin_1.TextField, { source: "id" }),
        React.createElement(react_admin_1.TextField, { source: "name" })))); };
exports.ArtistEdit = function (props) { return (React.createElement(react_admin_1.Edit, __assign({}, props),
    React.createElement(react_admin_1.SimpleForm, null,
        React.createElement(react_admin_1.TextInput, { source: "name" })))); };
exports.SongList = function (props) { return (React.createElement(react_admin_1.List, __assign({}, props),
    React.createElement(react_admin_1.Datagrid, { rowClick: "edit" },
        React.createElement(react_admin_1.TextField, { source: "id" }),
        React.createElement(react_admin_1.TextField, { source: "title" }),
        React.createElement(react_admin_1.ReferenceField, { source: "artist_id", reference: "artists" },
            React.createElement(react_admin_1.TextField, { source: "name" })),
        React.createElement(react_admin_1.TextField, { source: "writer" }),
        React.createElement(react_admin_1.TextField, { source: "producer" }),
        React.createElement(react_admin_1.DateField, { source: "released" }),
        React.createElement(react_admin_1.TextField, { source: "recordCompany" }),
        React.createElement(react_admin_1.NumberField, { source: "rank" })))); };
exports.SongEdit = function (props) { return (React.createElement(react_admin_1.Edit, __assign({}, props),
    React.createElement(react_admin_1.SimpleForm, null,
        React.createElement(react_admin_1.TextInput, { source: "title" }),
        React.createElement(react_admin_1.ReferenceInput, { source: "artist_id", reference: "artists" },
            React.createElement(react_admin_1.SelectInput, { optionText: "name" })),
        React.createElement(react_admin_1.TextInput, { source: "writer" }),
        React.createElement(react_admin_1.TextInput, { source: "producer" }),
        React.createElement(react_admin_1.TextInput, { source: "recordCompany" })))); };
