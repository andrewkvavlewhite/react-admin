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
import { CreateButton, SimpleList, TopToolbar } from 'react-admin';
import { AddPostButton, DeletePostButton, CustomPopper, } from './simulateActions';
import { RealTimeList } from '../src';
export var ListActions = function (props) { return (React.createElement(TopToolbar, null,
    React.createElement(CustomPopper, null,
        React.createElement(AddPostButton, null),
        React.createElement(DeletePostButton, null)),
    props.hasCreate && React.createElement(CreateButton, { basePath: props.basePath }))); };
var PostList = function (props) { return (React.createElement(RealTimeList, __assign({}, props, { actions: React.createElement(ListActions, { hasCreate: props.hasCreate }) }),
    React.createElement(SimpleList, { primaryText: function (record) { return record.title; } }))); };
export default PostList;
