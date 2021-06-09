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
import { Create, CheckboxGroupInput, SimpleForm, TextInput, SelectArrayInput, } from 'react-admin';
import { ReferenceManyToManyInput, ManyToManyReferenceContextProvider, } from '../../../../src';
var BandCreate = function (props) { return (React.createElement(Create, __assign({}, props),
    React.createElement(ManyToManyReferenceContextProvider, null,
        React.createElement(SimpleForm, null,
            React.createElement(TextInput, { disabled: true, source: "id" }),
            React.createElement(TextInput, { source: "name" }),
            React.createElement(ReferenceManyToManyInput, { reference: "venues", through: "performances", using: "band_id,venue_id", fullWidth: true, label: "Performances" },
                React.createElement(CheckboxGroupInput, { optionText: "name" })),
            React.createElement(ReferenceManyToManyInput, { source: "id", reference: "artists", through: "members", using: "band_id,artist_id", fullWidth: true, label: "Members" },
                React.createElement(SelectArrayInput, { optionText: "name" })))))); };
export default BandCreate;
