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
import { Admin, Resource, Layout, List, SimpleList, } from 'react-admin';
import { createMemoryHistory } from 'history';
import i18nProvider from '../i18nProvider';
import { localBrowserDataProvider } from '../realTimeDataProvider';
import { Dashboard } from '../';
import { RealTimeMenu } from '../../src';
export default {
    title: 'ra-realtime/InLocalBrowser',
};
var CustomLayout = function (props) { return React.createElement(Layout, __assign({}, props, { menu: RealTimeMenu })); };
var MyListView = function (props) { return (React.createElement(List, __assign({}, props),
    React.createElement(SimpleList, { primaryText: function (record) { return record.title; } }))); };
export var Menu = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: localBrowserDataProvider, layout: CustomLayout, dashboard: Dashboard, i18nProvider: i18nProvider },
    React.createElement(Resource, { name: "posts", list: MyListView }))); };
