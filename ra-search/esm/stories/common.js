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
import * as React from 'react';
import { Edit, SimpleForm, TextInput, ReferenceInput, SelectInput, List, Datagrid, TextField, NumberField, ReferenceField, DateField, } from 'react-admin';
export var ArtistList = function (props) { return (React.createElement(List, __assign({}, props),
    React.createElement(Datagrid, null,
        React.createElement(TextField, { source: "id" }),
        React.createElement(TextField, { source: "name" })))); };
export var ArtistEdit = function (props) { return (React.createElement(Edit, __assign({}, props),
    React.createElement(SimpleForm, null,
        React.createElement(TextInput, { source: "name" })))); };
export var SongList = function (props) { return (React.createElement(List, __assign({}, props),
    React.createElement(Datagrid, { rowClick: "edit" },
        React.createElement(TextField, { source: "id" }),
        React.createElement(TextField, { source: "title" }),
        React.createElement(ReferenceField, { source: "artist_id", reference: "artists" },
            React.createElement(TextField, { source: "name" })),
        React.createElement(TextField, { source: "writer" }),
        React.createElement(TextField, { source: "producer" }),
        React.createElement(DateField, { source: "released" }),
        React.createElement(TextField, { source: "recordCompany" }),
        React.createElement(NumberField, { source: "rank" })))); };
export var SongEdit = function (props) { return (React.createElement(Edit, __assign({}, props),
    React.createElement(SimpleForm, null,
        React.createElement(TextInput, { source: "title" }),
        React.createElement(ReferenceInput, { source: "artist_id", reference: "artists" },
            React.createElement(SelectInput, { optionText: "name" })),
        React.createElement(TextInput, { source: "writer" }),
        React.createElement(TextInput, { source: "producer" }),
        React.createElement(TextInput, { source: "recordCompany" })))); };
