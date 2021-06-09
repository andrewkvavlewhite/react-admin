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
import { Admin, Resource, ListGuesser, Datagrid, TextField, TextInput, ReferenceManyField, mergeTranslations, } from 'react-admin';
import { createMemoryHistory } from 'history';
import dataProvider from './dataProvider';
import CategoriesCreate from '../CategoriesCreate';
import { reducer as tree, TreeWithDetails, EditNode } from '../../src';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import frenchMessages from 'ra-language-french';
import raTreeEnglishMessages from '../../src/i18n/ra-tree-language-english';
import raTreeFrenchMessages from '../../src/i18n/ra-tree-language-french';
import SimpleForm from '../../src/SimpleForm';
var customEnglishMessages = mergeTranslations(englishMessages, raTreeEnglishMessages, {
    'ra-tree': {
        action: {
            add_child: 'Add a daughter',
            add_root: 'Add a god',
        },
    },
});
var i18nCustomProvider = polyglotI18nProvider(function (locale) {
    if (locale === 'fr') {
        return mergeTranslations(frenchMessages, raTreeFrenchMessages);
    }
    return customEnglishMessages;
}, 'en');
var CategoriesEdit = function (props) { return (React.createElement(EditNode, __assign({}, props),
    React.createElement(SimpleForm, null,
        React.createElement(TextField, { source: "id" }),
        React.createElement(TextInput, { source: "name" }),
        React.createElement(ReferenceManyField, { label: "Products", reference: "products", target: "category_id" },
            React.createElement(Datagrid, null,
                React.createElement(TextField, { source: "name" })))))); };
var CategoriesList = function (props) { return (React.createElement(TreeWithDetails, __assign({ titleField: "name", edit: CategoriesEdit, create: CategoriesCreate }, props))); };
export var App = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider, i18nProvider: i18nCustomProvider, customReducers: { tree: tree } },
    React.createElement(Resource, { name: "categories", list: CategoriesList }),
    React.createElement(Resource, { name: "products", list: ListGuesser }))); };
export default { title: 'ra-tree/TreeWithDetails/CustomMessages' };
