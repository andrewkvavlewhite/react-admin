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
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { makeStyles, Typography, Card, CardContent } from '@material-ui/core';
import { linkToRecord, Admin, Resource, List, Edit, Create, SimpleForm, Show, SimpleShowLayout, TextField, TextInput, Layout, Datagrid, ShowButton, EditButton, } from 'react-admin';
import { createMemoryHistory } from 'history';
import { Breadcrumb, BreadcrumbItem } from '../src/breadcrumb';
import dataProvider from './dataProvider';
import { AppLocationContext, DASHBOARD } from '../src/app-location';
export default { title: 'ra-navigation/Breadcrumb/Custom Labels' };
var useStyles = makeStyles(function (theme) { return ({
    breadcrumb: {
        '& ul': {
            padding: theme.spacing(1),
            paddingLeft: 0,
        },
        '& ul:empty': {
            padding: 0,
        },
    },
}); });
var MyBreadcrumb = function (props) {
    var classes = useStyles();
    return (React.createElement(Breadcrumb, __assign({ className: classes.breadcrumb }, props),
        React.createElement(BreadcrumbItem, { name: DASHBOARD, label: "My Home", to: "/" },
            React.createElement(BreadcrumbItem, { name: "songs", label: "My Fabulous Songs", to: "/songs" },
                React.createElement(BreadcrumbItem, { name: "edit", label: function (_a) {
                        var record = _a.record;
                        return "Edit \"" + record.title + "\"";
                    }, to: function (_a) {
                        var record = _a.record;
                        return record
                            ? linkToRecord('/songs', record.id) + "/edit"
                            : undefined;
                    } }),
                React.createElement(BreadcrumbItem, { name: "show", label: function (_a) {
                        var record = _a.record;
                        return "Show \"" + record.title + "\"";
                    }, to: function (_a) {
                        var record = _a.record;
                        return record
                            ? linkToRecord('/songs', record.id) + "/show"
                            : undefined;
                    } }),
                React.createElement(BreadcrumbItem, { name: "create", label: "Yeah! Add Another One" })))));
};
var MyBreadcrumbNoHome = function (props) {
    var classes = useStyles();
    return (React.createElement(Breadcrumb, __assign({ className: classes.breadcrumb }, props),
        React.createElement(BreadcrumbItem, { name: "songs", label: "My Fabulous Songs", to: "/songs" },
            React.createElement(BreadcrumbItem, { name: "edit", label: function (_a) {
                    var record = _a.record;
                    return "Edit \"" + record.title + "\"";
                }, to: function (_a) {
                    var record = _a.record;
                    return record && linkToRecord('/songs', record.id) + "/edit";
                } }),
            React.createElement(BreadcrumbItem, { name: "show", label: function (_a) {
                    var record = _a.record;
                    return "Show \"" + record.title + "\"";
                }, to: function (_a) {
                    var record = _a.record;
                    return record && linkToRecord('/songs', record.id) + "/show";
                } }),
            React.createElement(BreadcrumbItem, { name: "create", label: "Yeah! Add Another One" }))));
};
var MyLayout = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (React.createElement(AppLocationContext, null,
        React.createElement(Layout, __assign({}, props), children)));
};
var SongList = function (_a) {
    var breadcrumb = _a.breadcrumb, props = __rest(_a, ["breadcrumb"]);
    return (React.createElement(React.Fragment, null,
        breadcrumb,
        React.createElement(List, __assign({}, props),
            React.createElement(Datagrid, null,
                React.createElement(TextField, { source: "id" }),
                React.createElement(TextField, { source: "title" }),
                React.createElement(ShowButton, null),
                React.createElement(EditButton, null)))));
};
var SongEdit = function (_a) {
    var breadcrumb = _a.breadcrumb, props = __rest(_a, ["breadcrumb"]);
    return (React.createElement(React.Fragment, null,
        breadcrumb,
        React.createElement(Edit, __assign({}, props),
            React.createElement(SimpleForm, null,
                React.createElement(TextInput, { source: "title" })))));
};
var SongCreate = function (_a) {
    var breadcrumb = _a.breadcrumb, props = __rest(_a, ["breadcrumb"]);
    return (React.createElement(React.Fragment, null,
        breadcrumb,
        React.createElement(Create, __assign({}, props),
            React.createElement(SimpleForm, null,
                React.createElement(TextInput, { source: "title" })))));
};
var SongShow = function (_a) {
    var breadcrumb = _a.breadcrumb, props = __rest(_a, ["breadcrumb"]);
    return (React.createElement(React.Fragment, null,
        breadcrumb,
        React.createElement(Show, __assign({}, props),
            React.createElement(SimpleShowLayout, null,
                React.createElement(TextField, { source: "title" })))));
};
var Dashboard = function (_a) {
    var breadcrumb = _a.breadcrumb;
    return (React.createElement(React.Fragment, null,
        breadcrumb,
        React.createElement(Card, null,
            React.createElement(CardContent, null,
                React.createElement(Typography, { variant: "h4" }, "Here is Homepage"),
                React.createElement(Typography, null, "No breacrumb is displayed in Home")))));
};
export var Labels = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider, layout: MyLayout, dashboard: function (props) { return (React.createElement(Dashboard, __assign({ breadcrumb: React.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); } },
    React.createElement(Resource, { name: "songs", list: function (props) { return (React.createElement(SongList, __assign({ breadcrumb: React.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); }, edit: function (props) { return (React.createElement(SongEdit, __assign({ breadcrumb: React.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); }, create: function (props) { return (React.createElement(SongCreate, __assign({ breadcrumb: React.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); }, show: function (props) { return (React.createElement(SongShow, __assign({ breadcrumb: React.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); } }))); };
export var LabelsNoHome = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider, layout: MyLayout },
    React.createElement(Resource, { name: "songs", list: function (props) { return (React.createElement(SongList, __assign({ breadcrumb: React.createElement(MyBreadcrumbNoHome, null) }, props))); }, edit: function (props) { return (React.createElement(SongEdit, __assign({ breadcrumb: React.createElement(MyBreadcrumbNoHome, null) }, props))); }, create: function (props) { return (React.createElement(SongCreate, __assign({ breadcrumb: React.createElement(MyBreadcrumbNoHome, null) }, props))); }, show: function (props) { return (React.createElement(SongShow, __assign({ breadcrumb: React.createElement(MyBreadcrumbNoHome, null) }, props))); } }))); };
