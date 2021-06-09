"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullApplication = void 0;
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var ra_data_fakerest_1 = __importDefault(require("ra-data-fakerest"));
var history_1 = require("history");
var src_1 = require("../src");
var description = "\nAn h1 header\n============\n\nParagraphs are separated by a blank line.\n\n2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists\nlook like:\n\n  * this one\n  * that one\n  * the other one\n\nNote that --- not considering the asterisk --- the actual text\ncontent starts at 4-columns in.\n\n> Block quotes are\n> written like so.\n>\n> They can span multiple paragraphs,\n> if you like.\n\nUse 3 dashes for an em-dash. Use 2 dashes for ranges (ex., \"it's all\nin chapters 12--14\"). Three dots ... will be converted to an ellipsis.\nUnicode is supported. \u263A\n";
var dataProvider = ra_data_fakerest_1.default({
    posts: [
        { id: 1, title: 'Lorem Ipsum', description: description },
        { id: 2, title: 'Sic dolor amet', description: 'Almost empty' },
    ],
}, true);
exports.default = {
    title: 'ra-markdown/Full Application',
};
var PostList = function (props) { return (react_1.default.createElement(react_admin_1.List, __assign({}, props),
    react_1.default.createElement(react_admin_1.SimpleList, { primaryText: function (record) { return record.title; } }))); };
var PostEdit = function (props) { return (react_1.default.createElement(react_admin_1.Edit, __assign({}, props),
    react_1.default.createElement(react_admin_1.SimpleForm, null,
        react_1.default.createElement(react_admin_1.TextInput, { source: "title" }),
        react_1.default.createElement(src_1.MarkdownInput, { source: "description" })))); };
var PostCreate = function (props) { return (react_1.default.createElement(react_admin_1.Create, __assign({}, props),
    react_1.default.createElement(react_admin_1.SimpleForm, null,
        react_1.default.createElement(react_admin_1.TextInput, { source: "title" }),
        react_1.default.createElement(src_1.MarkdownInput, { source: "description" })))); };
var PostShow = function (props) { return (react_1.default.createElement(react_admin_1.Show, __assign({}, props),
    react_1.default.createElement(react_admin_1.SimpleShowLayout, null,
        react_1.default.createElement(react_admin_1.TextField, { source: "title" }),
        react_1.default.createElement(src_1.MarkdownField, { source: "description" })))); };
exports.FullApplication = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider },
    react_1.default.createElement(react_admin_1.Resource, { name: "posts", list: PostList, edit: PostEdit, show: PostShow, create: PostCreate }))); };
