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
import { Admin, Resource } from 'react-admin';
import { createMemoryHistory } from 'history';
import dataprovider from './dataprovider';
import bands from './bands';
export default {
    title: 'ra-relationships/DualListInput/FullApplication',
};
export var FullApplication = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataprovider },
    React.createElement(Resource, __assign({ name: "bands" }, bands)),
    React.createElement(Resource, { name: "genres" }))); };
