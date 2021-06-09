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
import { createMemoryHistory } from 'history';
import { List, SimpleList, SimpleForm, TextInput, Admin, Resource, } from 'react-admin';
import i18nProvider from '../i18nProvider';
import { mercureDataProvider } from '../realTimeDataProvider';
import { RealTimeEdit } from '../../src';
import { AddPostButton, DeletePostButton, UpdatePostButton, CustomPopper, } from '../simulateActions';
export default {
    title: 'ra-realtime/WithMercureHub',
};
var EditActions = function (props) {
    return (React.createElement(CustomPopper, null,
        React.createElement(AddPostButton, null),
        React.createElement(DeletePostButton, { record: props.data }),
        React.createElement(UpdatePostButton, { record: props.data, dataProvider: props.dataProvider })));
};
var MyListView = function (props) { return (React.createElement(List, __assign({}, props),
    React.createElement(SimpleList, { primaryText: function (record) { return record.title; } }))); };
var MyRealTimeEditView = function (props) { return (React.createElement(RealTimeEdit
// actions prop is only to add Realitime simulation buttons
, __assign({ 
    // actions prop is only to add Realitime simulation buttons
    actions: React.createElement(EditActions, __assign({ dataProvider: mercureDataProvider }, props)) }, props),
    React.createElement(SimpleForm, null,
        React.createElement(TextInput, { source: "title" })))); };
export var Edit = function () { return (React.createElement(Admin, { dataProvider: mercureDataProvider, history: createMemoryHistory(), i18nProvider: i18nProvider },
    React.createElement(Resource, { name: "posts", list: MyListView, edit: MyRealTimeEditView }))); };
