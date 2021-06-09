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
import dataProvider from './dataProvider';
import i18nProvider from '../i18nProvider';
import CategoriesEdit from '../CategoriesEdit';
import CategoriesCreate from '../CategoriesCreate';
import { reducer as tree, TreeWithDetails } from '../../src';
var CategoriesList = function (props) { return (React.createElement(TreeWithDetails, __assign({ titleField: "name", showLine: true, edit: CategoriesEdit, create: CategoriesCreate }, props))); };
export var App = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider, i18nProvider: i18nProvider, customReducers: { tree: tree } },
    React.createElement(Resource, { name: "categories", list: CategoriesList }))); };
export default { title: 'ra-tree/TreeWithDetails/Show Line' };
