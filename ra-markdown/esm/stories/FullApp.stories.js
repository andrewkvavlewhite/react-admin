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
import { Admin, Resource, List, SimpleList, Edit, Create, SimpleForm, Show, SimpleShowLayout, TextField, TextInput, } from 'react-admin';
import fakeRestProvider from 'ra-data-fakerest';
import { createMemoryHistory } from 'history';
import { MarkdownField, MarkdownInput } from '../src';
var description = "\nAn h1 header\n============\n\nParagraphs are separated by a blank line.\n\n2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists\nlook like:\n\n  * this one\n  * that one\n  * the other one\n\nNote that --- not considering the asterisk --- the actual text\ncontent starts at 4-columns in.\n\n> Block quotes are\n> written like so.\n>\n> They can span multiple paragraphs,\n> if you like.\n\nUse 3 dashes for an em-dash. Use 2 dashes for ranges (ex., \"it's all\nin chapters 12--14\"). Three dots ... will be converted to an ellipsis.\nUnicode is supported. \u263A\n";
var dataProvider = fakeRestProvider({
    posts: [
        { id: 1, title: 'Lorem Ipsum', description: description },
        { id: 2, title: 'Sic dolor amet', description: 'Almost empty' },
    ],
}, true);
export default {
    title: 'ra-markdown/Full Application',
};
var PostList = function (props) { return (React.createElement(List, __assign({}, props),
    React.createElement(SimpleList, { primaryText: function (record) { return record.title; } }))); };
var PostEdit = function (props) { return (React.createElement(Edit, __assign({}, props),
    React.createElement(SimpleForm, null,
        React.createElement(TextInput, { source: "title" }),
        React.createElement(MarkdownInput, { source: "description" })))); };
var PostCreate = function (props) { return (React.createElement(Create, __assign({}, props),
    React.createElement(SimpleForm, null,
        React.createElement(TextInput, { source: "title" }),
        React.createElement(MarkdownInput, { source: "description" })))); };
var PostShow = function (props) { return (React.createElement(Show, __assign({}, props),
    React.createElement(SimpleShowLayout, null,
        React.createElement(TextField, { source: "title" }),
        React.createElement(MarkdownField, { source: "description" })))); };
export var FullApplication = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider },
    React.createElement(Resource, { name: "posts", list: PostList, edit: PostEdit, show: PostShow, create: PostCreate }))); };
