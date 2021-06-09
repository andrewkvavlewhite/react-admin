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
exports.WithColumnsSelector = exports.Basic = void 0;
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var history_1 = require("history");
var src_1 = require("../src");
var dataProvider_1 = __importDefault(require("./dataProvider"));
var SongList = function (props) { return (react_1.default.createElement(react_admin_1.List, __assign({}, props),
    react_1.default.createElement(react_admin_1.SimpleList, { primaryText: function (record) { return record.title; } }))); };
var MyAppBar = function (props) { return (react_1.default.createElement(react_admin_1.AppBar, __assign({}, props),
    react_1.default.createElement(core_1.Box, { flex: "1" },
        react_1.default.createElement(core_1.Typography, { variant: "h6", id: "react-admin-title" })),
    react_1.default.createElement(src_1.ToggleThemeButton, null))); };
var MyLayout = function (props) { return react_1.default.createElement(react_admin_1.Layout, __assign({}, props, { appBar: MyAppBar })); };
exports.Basic = function () { return (react_1.default.createElement(src_1.PreferencesBasedThemeProvider, null,
    react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default, layout: MyLayout },
        react_1.default.createElement(react_admin_1.Resource, { name: "songs", list: SongList })))); };
var SongActions = function () { return (react_1.default.createElement(react_admin_1.TopToolbar, null,
    react_1.default.createElement(src_1.SelectColumnsButton, { preference: "songs.list.columns", columns: songListColumns }))); };
var songListColumns = {
    title: react_1.default.createElement(react_admin_1.TextField, { source: "title", key: "title" }),
    artist: react_1.default.createElement(react_admin_1.TextField, { source: "artist", key: "artist" }),
    writer: react_1.default.createElement(react_admin_1.TextField, { source: "writer", key: "writer" }),
    producer: react_1.default.createElement(react_admin_1.TextField, { source: "producer", key: "producer" }),
    recordCompany: react_1.default.createElement(react_admin_1.TextField, { source: "recordCompany", key: "recordCompany" }),
    rank: react_1.default.createElement(react_admin_1.NumberField, { source: "rank", key: "rank" }),
    released: react_1.default.createElement(react_admin_1.DateField, { source: "released", key: "released" }),
};
var SongListWithColumnsSelector = function (props) {
    var columns = src_1.useSelectedColumns({
        preferences: 'songs.list.columns',
        columns: songListColumns,
        omit: ['producer'],
    });
    return (react_1.default.createElement(react_admin_1.List, __assign({}, props, { actions: react_1.default.createElement(SongActions, null) }),
        react_1.default.createElement(react_admin_1.Datagrid, { rowClick: "edit" }, columns)));
};
exports.WithColumnsSelector = function () { return (react_1.default.createElement(src_1.PreferencesBasedThemeProvider, null,
    react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default, layout: MyLayout },
        react_1.default.createElement(react_admin_1.Resource, { name: "songs", list: SongListWithColumnsSelector })))); };
exports.default = {
    title: 'ra-preferences/ToggleThemeButton',
};
