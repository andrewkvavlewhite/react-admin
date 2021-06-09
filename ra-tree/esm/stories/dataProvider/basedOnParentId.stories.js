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
import { reducer as tree, TreeWithDetails, addTreeMethodsBasedOnParentAndPosition, } from '../../src';
import CategoriesCreate from '../CategoriesCreate';
import CategoriesEdit from '../CategoriesEdit';
var dataProvider = fakeRestProvider({
    categories: [
        { id: 1, name: 'Clothing', position: 0 },
        { id: 2, name: 'Men', parent_id: 1, position: 0 },
        { id: 3, name: 'Suits', parent_id: 2, position: 0 },
        { id: 4, name: 'Slacks', parent_id: 3, position: 0 },
        { id: 5, name: 'Jackets', parent_id: 3, position: 1 },
        { id: 6, name: 'Women', parent_id: 1, position: 1 },
        { id: 7, name: 'Dresses', parent_id: 6, position: 0 },
        { id: 8, name: 'Evening Gowns', parent_id: 7, position: 0 },
        { id: 9, name: 'Sun Dresses', parent_id: 7, position: 1 },
        { id: 10, name: 'Skirts', parent_id: 6, position: 1 },
        { id: 11, name: 'Blouses', parent_id: 6, position: 2 },
    ],
}, true);
var treeDataProvider = addTreeMethodsBasedOnParentAndPosition(dataProvider);
var CategoriesList = function (props) { return (React.createElement(TreeWithDetails, __assign({ titleField: "name", draggable: true, create: CategoriesCreate, edit: CategoriesEdit, allowMultipleRoots: true }, props))); };
export var App = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: treeDataProvider, i18nProvider: i18nProvider, customReducers: { tree: tree } },
    React.createElement(Resource, { name: "categories", list: CategoriesList }))); };
export default { title: 'ra-tree/dataProvider/Based on parentId' };
