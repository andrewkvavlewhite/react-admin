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
import { Edit, required, SelectArrayInput, SimpleForm, TextInput, } from 'react-admin';
import { ReferenceManyToManyInput, ManyToManyReferenceContextProvider, } from '../../../../src';
var BandEdit = function (props) {
    return (React.createElement(Edit, __assign({}, props),
        React.createElement(ManyToManyReferenceContextProvider, null,
            React.createElement(SimpleForm, { redirect: false },
                React.createElement(TextInput, { source: "name" }),
                React.createElement(ReferenceManyToManyInput, { reference: "venues", through: "performances", using: "band_id,venue_id", fullWidth: true, label: "Performances", validate: required() },
                    React.createElement(SelectArrayInput, { optionText: "name" })),
                React.createElement(ReferenceManyToManyInput, { reference: "artists", through: "members", using: "band_id,artist_id", fullWidth: true, label: "Members", validate: required() },
                    React.createElement(SelectArrayInput, { optionText: "name" }))))));
};
export default BandEdit;
