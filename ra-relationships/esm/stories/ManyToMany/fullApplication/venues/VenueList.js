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
var VenueList = function (props) {
    return (React.createElement(List, __assign({}, props, { sort: { field: 'name', order: 'ASC' } }),
        React.createElement(Datagrid, null,
            React.createElement(TextField, { source: "name" }),
            React.createElement(TextField, { source: "location" }),
            React.createElement(ReferenceManyToManyField, { source: "id", label: "Bands", reference: "bands", through: "performances", using: "venue_id,band_id" },
                React.createElement(SingleFieldList, { linkType: false },
                    React.createElement(ChipField, { source: "name" }))),
            React.createElement(EditButton, null))));
};
export default VenueList;
