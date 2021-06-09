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
import { ChipField, Datagrid, EditButton, List, SingleFieldList, TextField, } from 'react-admin';
import { ReferenceManyToManyField } from '../../../../src';
var BandList = function (props) {
    return (React.createElement(List, __assign({}, props, { sort: { field: 'name', order: 'ASC' } }),
        React.createElement(Datagrid, null,
            React.createElement(TextField, { source: "name" }),
            React.createElement(ReferenceManyToManyField, { label: "Bands", reference: "bands", through: "members", using: "artist_id,band_id", perPage: 50 },
                React.createElement(SingleFieldList, { linkType: false },
                    React.createElement(ChipField, { source: "name" }))),
            React.createElement(EditButton, null))));
};
export default BandList;
