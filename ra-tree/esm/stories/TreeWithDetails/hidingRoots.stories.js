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
import { Admin, Resource, ListGuesser, Datagrid, TextField, TextInput, ReferenceManyField, } from 'react-admin';
import { createMemoryHistory } from 'history';
import dataProvider from './dataProvider';
import i18nProvider from '../i18nProvider';
import CategoriesCreate from '../CategoriesCreate';
import { reducer as tree, TreeWithDetails, EditNode, SimpleForm, } from '../../src';
var CategoriesEdit = function (props) { return (React.createElement(EditNode, __assign({}, props),
    React.createElement(SimpleForm, null,
        React.createElement(TextField, { source: "id" }),
        React.createElement(TextInput, { source: "name" }),
        React.createElement(ReferenceManyField, { label: "Products", reference: "products", target: "category_id" },
            React.createElement(Datagrid, null,
                React.createElement(TextField, { source: "name" })))))); };
var CategoriesList = function (props) { return (React.createElement(TreeWithDetails, __assign({ titleField: "name", edit: CategoriesEdit, create: CategoriesCreate, hideRootNodes: true }, props))); };
export var HideRootNodes = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider, i18nProvider: i18nProvider, customReducers: { tree: tree } },
    React.createElement(Resource, { name: "categories", list: CategoriesList }),
    React.createElement(Resource, { name: "products", list: ListGuesser }))); };
export default { title: 'ra-tree/TreeWithDetails/HideRootNodes' };
