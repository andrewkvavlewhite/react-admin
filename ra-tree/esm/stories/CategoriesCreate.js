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
import { SimpleForm, TextInput, required } from 'react-admin';
import CreateNode from '../src/CreateNode';
var CategoriesCreate = function (props) { return (React.createElement(CreateNode, __assign({}, props),
    React.createElement(SimpleForm, null,
        React.createElement(TextInput, { source: "name", validate: [required()] })))); };
export default CategoriesCreate;
