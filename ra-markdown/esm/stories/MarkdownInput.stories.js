import React from 'react';
import { SimpleForm } from 'react-admin';
import { TestContext } from 'ra-test';
import { ThemeProvider, createMuiTheme, Card, CardContent, Toolbar, } from '@material-ui/core';
import MarkdownInput from '../src/MarkdownInput';
export default { title: 'ra-markdown/MarkdownInput' };
var MyToolbar = function () { return (React.createElement(Toolbar, null,
    React.createElement("span", null))); };
var record = { id: 0 };
export var Simple = function () { return (React.createElement(TestContext, { initialState: initialState },
    React.createElement(Card, null,
        React.createElement(CardContent, null,
            React.createElement(SimpleForm, { resource: "posts", record: record, toolbar: React.createElement(MyToolbar, null) },
                React.createElement(MarkdownInput, { label: "Body", source: "body" })))))); };
export var SimpleDark = function () { return (React.createElement(ThemeProvider, { theme: createMuiTheme({ palette: { type: 'dark' } }) },
    React.createElement(Simple, null))); };
var initialState = {
    admin: {
        resources: {
            posts: {
                data: { 7: { id: 7 } },
            },
        },
    },
};
