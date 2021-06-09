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
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Admin, Resource, Layout, MenuItemLink, List, SimpleList, } from 'react-admin';
import { createMemoryHistory } from 'history';
import i18nProvider from '../i18nProvider';
import { localBrowserDataProvider } from '../realTimeDataProvider';
import { Dashboard } from '..';
import { RealTimeMenuItemLink } from '../../src';
export default {
    title: 'ra-realtime/InLocalBrowser',
};
var MyMenu = function (_a) {
    var onMenuClick = _a.onMenuClick;
    var open = useSelector(function (state) { return state.admin.ui.sidebarOpen; });
    return (React.createElement("div", null,
        React.createElement(MenuItemLink, { to: "/", primaryText: "The dashboard", onClick: onMenuClick, sidebarIsOpen: open }),
        React.createElement(RealTimeMenuItemLink, { to: "/posts", primaryText: "The Posts", resource: "posts", badgeColor: "primary", onClick: onMenuClick, sidebarIsOpen: open })));
};
var CustomLayout = function (props) { return (React.createElement(Layout, __assign({}, props, { menu: withRouter(MyMenu) }))); };
var MyListView = function (props) { return (React.createElement(List, __assign({}, props),
    React.createElement(SimpleList, { primaryText: function (record) { return record.title; } }))); };
export var CustomMenu = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: localBrowserDataProvider, layout: CustomLayout, dashboard: Dashboard, i18nProvider: i18nProvider },
    React.createElement(Resource, { name: "posts", list: MyListView }))); };
