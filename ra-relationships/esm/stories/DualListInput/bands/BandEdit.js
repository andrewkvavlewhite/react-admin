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
import { Edit, ReferenceArrayInput, SimpleForm, TextInput, } from 'react-admin';
import { DualListInput } from '../../../src';
var BandEdit = function (props) {
    return (React.createElement(Edit, __assign({}, props),
        React.createElement(SimpleForm, null,
            React.createElement(TextInput, { source: "name" }),
            React.createElement(ReferenceArrayInput, { source: "genres_ids", reference: "genres", fullWidth: true, label: "Genres" },
                React.createElement(DualListInput, { optionText: "name" })))));
};
export default BandEdit;
