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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { Admin, Resource, List, TextField, TextInput, DateField, DateInput, required, Datagrid, Edit, SimpleForm, ReferenceManyField, } from 'react-admin';
import { makeStyles } from '@material-ui/core';
import { createMemoryHistory } from 'history';
import { EditableDatagrid, RowForm } from '../src';
import dataProvider from './dataProvider';
export default { title: 'ra-editable-datagrid/Inside a Form' };
var useAsideStyles = makeStyles({
    root: {
        marginLeft: '1em',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        width: 150,
    },
});
var Aside = function () {
    var classes = useAsideStyles();
    return (React.createElement("div", { className: classes.root }, "Click on a post to see an Editable datagrid of comments"));
};
var usePostListStyles = makeStyles({
    root: {
        marginTop: '1em',
    },
});
var PostList = function (props) {
    var classes = usePostListStyles(props);
    return (React.createElement(List, __assign({}, props, { aside: React.createElement(Aside, null), actions: false, className: classes.root }),
        React.createElement(Datagrid, { rowClick: "edit" },
            React.createElement(TextField, { source: "id" }),
            React.createElement(TextField, { source: "title" }),
            React.createElement(DateField, { source: "published_at" }))));
};
var CommentForm = function (props) { return (React.createElement(RowForm, __assign({}, props),
    React.createElement(TextInput, { source: "author.name", validate: required() }),
    React.createElement(TextInput, { source: "body", validate: required() }),
    React.createElement(DateInput, { source: "created_at", validate: required() }))); };
var usePostEditStyles = makeStyles({
    body: {
        maxWidth: '15em',
    },
});
var PostEdit = function (_a) {
    var id = _a.id, props = __rest(_a, ["id"]);
    var classes = usePostEditStyles();
    return (React.createElement(Edit, __assign({}, props, { id: id }),
        React.createElement(SimpleForm, null,
            React.createElement(TextInput, { source: "title", fullWidth: true }),
            React.createElement(DateInput, { source: "published_at" }),
            React.createElement(ReferenceManyField, { fullWidth: true, label: "Comments", reference: "comments", target: "post_id" },
                React.createElement(EditableDatagrid, { undoable: true, createForm: React.createElement(CommentForm, { initialValues: { post_id: id } }), editForm: React.createElement(CommentForm, null), rowClick: "edit" },
                    React.createElement(TextField, { source: "author.name", label: "Author" }),
                    React.createElement(TextField, { source: "body", cellClassName: classes.body }),
                    React.createElement(DateField, { source: "created_at" }))))));
};
export var InsideAForm = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider },
    React.createElement(Resource, { name: "posts", list: PostList, edit: PostEdit }),
    React.createElement(Resource, { name: "comments" }))); };
