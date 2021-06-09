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
import fakeRestProvider from 'ra-data-fakerest';
import { Admin, Resource } from 'react-admin';
import { createMemoryHistory } from 'history';
import i18nProvider from '../i18nProvider';
import { reducer as tree, TreeWithDetails, addTreeMethodsBasedOnChildren, } from '../../src';
import CategoriesCreate from '../CategoriesCreate';
import CategoriesEdit from '../CategoriesEdit';
var dataProvider = fakeRestProvider({
    categories: [
        { id: 1, name: 'Clothing', isRoot: true, children: [2, 6] },
        { id: 2, name: 'Men', children: [3] },
        { id: 3, name: 'Suits', children: [4, 5] },
        { id: 4, name: 'Slacks', children: [] },
        { id: 5, name: 'Jackets', children: [] },
        { id: 6, name: 'Women', children: [7, 10, 11] },
        { id: 7, name: 'Dresses', children: [8, 9] },
        { id: 8, name: 'Evening Gowns', children: [] },
        { id: 9, name: 'Sun Dresses', children: [] },
        { id: 10, name: 'Skirts', children: [] },
        { id: 11, name: 'Blouses', children: [] },
    ],
}, true);
var treeDataProvider = addTreeMethodsBasedOnChildren(dataProvider);
var CategoriesList = function (props) { return (React.createElement(TreeWithDetails, __assign({ titleField: "name", draggable: true, create: CategoriesCreate, edit: CategoriesEdit, allowMultipleRoots: true }, props))); };
export var App = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: treeDataProvider, i18nProvider: i18nProvider, customReducers: { tree: tree } },
    React.createElement(Resource, { name: "categories", list: CategoriesList }))); };
export default { title: 'ra-tree/dataProvider/Based on children' };
