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
import { TextField, TextInput } from 'react-admin';
import EditNode from '../src/EditNode';
import SimpleForm from '../src/SimpleForm';
var CategoriesEdit = function (props) { return (React.createElement(EditNode, __assign({}, props),
    React.createElement(SimpleForm, null,
        React.createElement(TextField, { source: "id" }),
        React.createElement(TextInput, { source: "name" })))); };
export default CategoriesEdit;
