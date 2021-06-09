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
import { Datagrid, List, TextField, DateField, ReferenceField, } from 'react-admin';
var PerformanceList = function (props) {
    return (React.createElement(List, __assign({}, props, { sort: { field: 'date', order: 'DESC' } }),
        React.createElement(Datagrid, null,
            React.createElement(DateField, { source: "date" }),
            React.createElement(ReferenceField, { source: "band_id", reference: "bands" },
                React.createElement(TextField, { source: "name" })),
            React.createElement(ReferenceField, { source: "venue_id", reference: "venues" },
                React.createElement(TextField, { source: "name" })))));
};
export default PerformanceList;
