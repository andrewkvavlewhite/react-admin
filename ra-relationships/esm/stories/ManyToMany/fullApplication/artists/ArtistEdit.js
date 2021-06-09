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
import { Edit, SelectArrayInput, SimpleForm, TextInput, } from 'react-admin';
import { ReferenceManyToManyInput, ManyToManyReferenceContextProvider, } from '../../../../src';
var ArtistEdit = function (props) {
    return (React.createElement(Edit, __assign({}, props),
        React.createElement(ManyToManyReferenceContextProvider, null,
            React.createElement(SimpleForm, null,
                React.createElement(TextInput, { disabled: true, source: "id" }),
                React.createElement(TextInput, { source: "name" }),
                React.createElement(ReferenceManyToManyInput, { reference: "bands", through: "members", using: "artist_id,band_id", fullWidth: true, label: "Bands" },
                    React.createElement(SelectArrayInput, { optionText: "name" }))))));
};
export default ArtistEdit;
