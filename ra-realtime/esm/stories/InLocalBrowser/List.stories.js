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
import { Admin, Resource, SimpleList } from 'react-admin';
import { createMemoryHistory } from 'history';
import i18nProvider from '../i18nProvider';
import { localBrowserDataProvider } from '../realTimeDataProvider';
import { ListActions } from '../';
import { RealTimeList } from '../../src';
export default {
    title: 'ra-realtime/InLocalBrowser',
};
var MyRealTimeListView = function (props) { return (React.createElement(RealTimeList // actions prop is only to add Realitime simulation buttons
, __assign({ actions: React.createElement(ListActions, __assign({ dataProvider: localBrowserDataProvider }, props)) }, props),
    React.createElement(SimpleList, { primaryText: function (record) { return record.title; } }))); };
export var List = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: localBrowserDataProvider, i18nProvider: i18nProvider },
    React.createElement(Resource, { name: "posts", list: MyRealTimeListView }))); };
