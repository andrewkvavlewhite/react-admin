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
exports.CustomMenu = void 0;
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var react_admin_1 = require("react-admin");
var history_1 = require("history");
var i18nProvider_1 = __importDefault(require("../i18nProvider"));
var realTimeDataProvider_1 = require("../realTimeDataProvider");
var __1 = require("..");
var src_1 = require("../../src");
exports.default = {
    title: 'ra-realtime/InLocalBrowser',
};
var MyMenu = function (_a) {
    var onMenuClick = _a.onMenuClick;
    var open = react_redux_1.useSelector(function (state) { return state.admin.ui.sidebarOpen; });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(react_admin_1.MenuItemLink, { to: "/", primaryText: "The dashboard", onClick: onMenuClick, sidebarIsOpen: open }),
        react_1.default.createElement(src_1.RealTimeMenuItemLink, { to: "/posts", primaryText: "The Posts", resource: "posts", badgeColor: "primary", onClick: onMenuClick, sidebarIsOpen: open })));
};
var CustomLayout = function (props) { return (react_1.default.createElement(react_admin_1.Layout, __assign({}, props, { menu: react_router_dom_1.withRouter(MyMenu) }))); };
var MyListView = function (props) { return (react_1.default.createElement(react_admin_1.List, __assign({}, props),
    react_1.default.createElement(react_admin_1.SimpleList, { primaryText: function (record) { return record.title; } }))); };
exports.CustomMenu = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: realTimeDataProvider_1.localBrowserDataProvider, layout: CustomLayout, dashboard: __1.Dashboard, i18nProvider: i18nProvider_1.default },
    react_1.default.createElement(react_admin_1.Resource, { name: "posts", list: MyListView }))); };
