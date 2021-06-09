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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelsNoHome = exports.Labels = void 0;
/* eslint-disable @typescript-eslint/explicit-function-return-type */
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var react_admin_1 = require("react-admin");
var history_1 = require("history");
var breadcrumb_1 = require("../src/breadcrumb");
var dataProvider_1 = __importDefault(require("./dataProvider"));
var app_location_1 = require("../src/app-location");
exports.default = { title: 'ra-navigation/Breadcrumb/Custom Labels' };
var useStyles = core_1.makeStyles(function (theme) { return ({
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
    return (react_1.default.createElement(breadcrumb_1.Breadcrumb, __assign({ className: classes.breadcrumb }, props),
        react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { name: app_location_1.DASHBOARD, label: "My Home", to: "/" },
            react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { name: "songs", label: "My Fabulous Songs", to: "/songs" },
                react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { name: "edit", label: function (_a) {
                        var record = _a.record;
                        return "Edit \"" + record.title + "\"";
                    }, to: function (_a) {
                        var record = _a.record;
                        return record
                            ? react_admin_1.linkToRecord('/songs', record.id) + "/edit"
                            : undefined;
                    } }),
                react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { name: "show", label: function (_a) {
                        var record = _a.record;
                        return "Show \"" + record.title + "\"";
                    }, to: function (_a) {
                        var record = _a.record;
                        return record
                            ? react_admin_1.linkToRecord('/songs', record.id) + "/show"
                            : undefined;
                    } }),
                react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { name: "create", label: "Yeah! Add Another One" })))));
};
var MyBreadcrumbNoHome = function (props) {
    var classes = useStyles();
    return (react_1.default.createElement(breadcrumb_1.Breadcrumb, __assign({ className: classes.breadcrumb }, props),
        react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { name: "songs", label: "My Fabulous Songs", to: "/songs" },
            react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { name: "edit", label: function (_a) {
                    var record = _a.record;
                    return "Edit \"" + record.title + "\"";
                }, to: function (_a) {
                    var record = _a.record;
                    return record && react_admin_1.linkToRecord('/songs', record.id) + "/edit";
                } }),
            react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { name: "show", label: function (_a) {
                    var record = _a.record;
                    return "Show \"" + record.title + "\"";
                }, to: function (_a) {
                    var record = _a.record;
                    return record && react_admin_1.linkToRecord('/songs', record.id) + "/show";
                } }),
            react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { name: "create", label: "Yeah! Add Another One" }))));
};
var MyLayout = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (react_1.default.createElement(app_location_1.AppLocationContext, null,
        react_1.default.createElement(react_admin_1.Layout, __assign({}, props), children)));
};
var SongList = function (_a) {
    var breadcrumb = _a.breadcrumb, props = __rest(_a, ["breadcrumb"]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        breadcrumb,
        react_1.default.createElement(react_admin_1.List, __assign({}, props),
            react_1.default.createElement(react_admin_1.Datagrid, null,
                react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
                react_1.default.createElement(react_admin_1.TextField, { source: "title" }),
                react_1.default.createElement(react_admin_1.ShowButton, null),
                react_1.default.createElement(react_admin_1.EditButton, null)))));
};
var SongEdit = function (_a) {
    var breadcrumb = _a.breadcrumb, props = __rest(_a, ["breadcrumb"]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        breadcrumb,
        react_1.default.createElement(react_admin_1.Edit, __assign({}, props),
            react_1.default.createElement(react_admin_1.SimpleForm, null,
                react_1.default.createElement(react_admin_1.TextInput, { source: "title" })))));
};
var SongCreate = function (_a) {
    var breadcrumb = _a.breadcrumb, props = __rest(_a, ["breadcrumb"]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        breadcrumb,
        react_1.default.createElement(react_admin_1.Create, __assign({}, props),
            react_1.default.createElement(react_admin_1.SimpleForm, null,
                react_1.default.createElement(react_admin_1.TextInput, { source: "title" })))));
};
var SongShow = function (_a) {
    var breadcrumb = _a.breadcrumb, props = __rest(_a, ["breadcrumb"]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        breadcrumb,
        react_1.default.createElement(react_admin_1.Show, __assign({}, props),
            react_1.default.createElement(react_admin_1.SimpleShowLayout, null,
                react_1.default.createElement(react_admin_1.TextField, { source: "title" })))));
};
var Dashboard = function (_a) {
    var breadcrumb = _a.breadcrumb;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        breadcrumb,
        react_1.default.createElement(core_1.Card, null,
            react_1.default.createElement(core_1.CardContent, null,
                react_1.default.createElement(core_1.Typography, { variant: "h4" }, "Here is Homepage"),
                react_1.default.createElement(core_1.Typography, null, "No breacrumb is displayed in Home")))));
};
exports.Labels = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default, layout: MyLayout, dashboard: function (props) { return (react_1.default.createElement(Dashboard, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); } },
    react_1.default.createElement(react_admin_1.Resource, { name: "songs", list: function (props) { return (react_1.default.createElement(SongList, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); }, edit: function (props) { return (react_1.default.createElement(SongEdit, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); }, create: function (props) { return (react_1.default.createElement(SongCreate, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); }, show: function (props) { return (react_1.default.createElement(SongShow, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); } }))); };
exports.LabelsNoHome = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default, layout: MyLayout },
    react_1.default.createElement(react_admin_1.Resource, { name: "songs", list: function (props) { return (react_1.default.createElement(SongList, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumbNoHome, null) }, props))); }, edit: function (props) { return (react_1.default.createElement(SongEdit, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumbNoHome, null) }, props))); }, create: function (props) { return (react_1.default.createElement(SongCreate, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumbNoHome, null) }, props))); }, show: function (props) { return (react_1.default.createElement(SongShow, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumbNoHome, null) }, props))); } }))); };
