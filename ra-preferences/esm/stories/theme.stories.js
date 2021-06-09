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
import React from 'react';
import { Admin, Resource, List, Datagrid, Layout, TextField, NumberField, DateField, AppBar, TopToolbar, SimpleList, } from 'react-admin';
import { Box, Typography } from '@material-ui/core';
import { createMemoryHistory } from 'history';
import { PreferencesBasedThemeProvider, ToggleThemeButton, SelectColumnsButton, useSelectedColumns, } from '../src';
import dataProvider from './dataProvider';
var SongList = function (props) { return (React.createElement(List, __assign({}, props),
    React.createElement(SimpleList, { primaryText: function (record) { return record.title; } }))); };
var MyAppBar = function (props) { return (React.createElement(AppBar, __assign({}, props),
    React.createElement(Box, { flex: "1" },
        React.createElement(Typography, { variant: "h6", id: "react-admin-title" })),
    React.createElement(ToggleThemeButton, null))); };
var MyLayout = function (props) { return React.createElement(Layout, __assign({}, props, { appBar: MyAppBar })); };
export var Basic = function () { return (React.createElement(PreferencesBasedThemeProvider, null,
    React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider, layout: MyLayout },
        React.createElement(Resource, { name: "songs", list: SongList })))); };
var SongActions = function () { return (React.createElement(TopToolbar, null,
    React.createElement(SelectColumnsButton, { preference: "songs.list.columns", columns: songListColumns }))); };
var songListColumns = {
    title: React.createElement(TextField, { source: "title", key: "title" }),
    artist: React.createElement(TextField, { source: "artist", key: "artist" }),
    writer: React.createElement(TextField, { source: "writer", key: "writer" }),
    producer: React.createElement(TextField, { source: "producer", key: "producer" }),
    recordCompany: React.createElement(TextField, { source: "recordCompany", key: "recordCompany" }),
    rank: React.createElement(NumberField, { source: "rank", key: "rank" }),
    released: React.createElement(DateField, { source: "released", key: "released" }),
};
var SongListWithColumnsSelector = function (props) {
    var columns = useSelectedColumns({
        preferences: 'songs.list.columns',
        columns: songListColumns,
        omit: ['producer'],
    });
    return (React.createElement(List, __assign({}, props, { actions: React.createElement(SongActions, null) }),
        React.createElement(Datagrid, { rowClick: "edit" }, columns)));
};
export var WithColumnsSelector = function () { return (React.createElement(PreferencesBasedThemeProvider, null,
    React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider, layout: MyLayout },
        React.createElement(Resource, { name: "songs", list: SongListWithColumnsSelector })))); };
export default {
    title: 'ra-preferences/ToggleThemeButton',
};
