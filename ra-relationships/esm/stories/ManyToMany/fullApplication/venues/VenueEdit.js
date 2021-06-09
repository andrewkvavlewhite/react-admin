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
import { Datagrid, Edit, EditButton, SimpleForm, DateField, TextField, TextInput, ReferenceManyField, ReferenceField, SingleFieldList, ChipField, Labeled, } from 'react-admin';
import { ReferenceManyToManyField } from '../../../../src';
var VenueEdit = function (props) { return (React.createElement(Edit, __assign({}, props),
    React.createElement(SimpleForm, null,
        React.createElement(TextInput, { source: "name" }),
        React.createElement(TextInput, { source: "location" }),
        React.createElement(Labeled, { label: "All bands", fullWidth: true },
            React.createElement(ReferenceManyToManyField, { source: "id", reference: "bands", through: "performances", using: "venue_id,band_id" },
                React.createElement(SingleFieldList, null,
                    React.createElement(ChipField, { source: "name" })))),
        React.createElement(ReferenceManyField, { reference: "performances", target: "venue_id", label: "Latest Performances", sort: { field: 'date', order: 'DESC' }, perPage: 10, fullWidth: true },
            React.createElement(Datagrid, { rowClick: "edit" },
                React.createElement(DateField, { source: "date" }),
                React.createElement(ReferenceField, { source: "band_id", reference: "bands" },
                    React.createElement(TextField, { source: "name" })),
                React.createElement(EditButton, null)))))); };
export default VenueEdit;
