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
import { List, SimpleList, SimpleShowLayout, TextField, Admin, Resource, } from 'react-admin';
import { createMemoryHistory } from 'history';
import i18nProvider from '../i18nProvider';
import { mercureDataProvider } from '../realTimeDataProvider';
import { ShowActions } from '../';
import { RealTimeShow } from '../../src';
export default {
    title: 'ra-realtime/WithMercureHub',
};
var MyListView = function (props) { return (React.createElement(List, __assign({}, props),
    React.createElement(SimpleList, { primaryText: function (record) { return record.title; }, linkType: "show" }))); };
var MyRealTimeShowView = function (props) { return (React.createElement(RealTimeShow
// actions prop is only to add Realitime simulation buttons
, __assign({ 
    // actions prop is only to add Realitime simulation buttons
    actions: React.createElement(ShowActions, __assign({ dataProvider: mercureDataProvider }, props)) }, props),
    React.createElement(SimpleShowLayout, null,
        React.createElement(TextField, { source: "title" })))); };
export var Show = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: mercureDataProvider, i18nProvider: i18nProvider },
    React.createElement(Resource, { name: "posts", list: MyListView, show: MyRealTimeShowView }))); };
