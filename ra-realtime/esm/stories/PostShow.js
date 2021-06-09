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
import { EditButton, SimpleShowLayout, TextField, TopToolbar, } from 'react-admin';
import { RealTimeShow } from '../src';
import { AddPostButton, DeletePostButton, UpdatePostButton, CustomPopper, } from './simulateActions';
export var ShowActions = function (props) {
    return (React.createElement(TopToolbar, null,
        React.createElement(CustomPopper, null,
            React.createElement(AddPostButton, null),
            React.createElement(DeletePostButton, { record: props.data }),
            React.createElement(UpdatePostButton, { record: props.data, dataProvider: props.dataProvider })),
        props.hasEdit && (React.createElement(EditButton, { record: props.data, basePath: props.basePath }))));
};
var BuildPostShow = function (dataProvider) {
    var BuiltPostShow = function (props) { return (React.createElement(RealTimeShow, __assign({ actions: React.createElement(ShowActions, { dataProvider: dataProvider, hasEdit: props.hasEdit }) }, props),
        React.createElement(SimpleShowLayout, null,
            React.createElement(TextField, { source: "title" })))); };
    return BuiltPostShow;
};
export default BuildPostShow;
