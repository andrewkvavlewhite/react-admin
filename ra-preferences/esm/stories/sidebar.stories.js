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
import { Admin, Resource, List, SimpleList, Layout, } from 'react-admin';
import { createMemoryHistory } from 'history';
import { SidebarOpenPreferenceSync } from '../src';
import dataProvider from './dataProvider';
var SongList = function (props) { return (React.createElement(List, __assign({}, props),
    React.createElement(SimpleList, { primaryText: function (record) { return record.title; } }))); };
var MyLayout = function (props) { return (React.createElement(React.Fragment, null,
    React.createElement(SidebarOpenPreferenceSync, null),
    React.createElement(Layout, __assign({}, props)))); };
export var Basic = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider, layout: MyLayout },
    React.createElement(Resource, { name: "songs", list: SongList }))); };
export default {
    title: 'ra-preferences/SidebarOpenPreferenceSync',
};
