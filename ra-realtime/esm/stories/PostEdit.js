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
import { ShowButton, SimpleForm, TextInput, TopToolbar } from 'react-admin';
import { RealTimeEdit } from '../src';
import { AddPostButton, DeletePostButton, UpdatePostButton, CustomPopper, } from './simulateActions';
export var EditActions = function (props) {
    return (React.createElement(TopToolbar, null,
        React.createElement(CustomPopper, null,
            React.createElement(AddPostButton, null),
            React.createElement(DeletePostButton, { record: props.data }),
            React.createElement(UpdatePostButton, { record: props.data, dataProvider: props.dataProvider })),
        props.hasShow && (React.createElement(ShowButton, { record: props.data, basePath: props.basePath }))));
};
var BuildPostEdit = function (dataProvider) {
    var BuiltPostEdit = function (props) { return (React.createElement(RealTimeEdit, __assign({}, props, { actions: React.createElement(EditActions, { dataProvider: dataProvider, hasShow: props.hasShow }) }),
        React.createElement(SimpleForm, null,
            React.createElement(TextInput, { source: "title" })))); };
    return BuiltPostEdit;
};
export default BuildPostEdit;
