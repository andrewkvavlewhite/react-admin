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
import { Admin, Resource, List, SimpleList, Layout, AppBar, } from 'react-admin';
import { Box, Typography } from '@material-ui/core';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import frenchMessages from 'ra-language-french';
import { createMemoryHistory } from 'history';
import { LanguageSwitcher } from '../src';
import dataProvider from './dataProvider';
var i18nProvider = polyglotI18nProvider(function (locale) { return (locale === 'fr' ? frenchMessages : englishMessages); }, 'en' // Default locale
);
var SongList = function (props) { return (React.createElement(List, __assign({}, props),
    React.createElement(SimpleList, { primaryText: function (record) { return record.title; } }))); };
var MyAppBar = function (props) { return (React.createElement(AppBar, __assign({}, props),
    React.createElement(Box, { flex: "1" },
        React.createElement(Typography, { variant: "h6", id: "react-admin-title" })),
    React.createElement(LanguageSwitcher, { languages: [
            { locale: 'en', name: 'English' },
            { locale: 'fr', name: 'Français' },
        ] }))); };
var MyLayout = function (props) { return React.createElement(Layout, __assign({}, props, { appBar: MyAppBar })); };
export var Basic = function () { return (React.createElement(Admin, { history: createMemoryHistory(), i18nProvider: i18nProvider, dataProvider: dataProvider, layout: MyLayout },
    React.createElement(Resource, { name: "songs", list: SongList }))); };
export default {
    title: 'ra-preferences/LanguageSwitcher',
};
