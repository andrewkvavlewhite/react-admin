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
import merge from 'lodash/merge';
import { Admin, AppBar, Layout, Resource, Datagrid, List, TextField, NumberField, DateField, SelectInput, DateInput, } from 'react-admin';
import { Box, Typography } from '@material-ui/core';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import frenchMessages from 'ra-language-french';
import { createMemoryHistory } from 'history';
import { ToggleThemeButton, PreferencesBasedThemeProvider, LanguageSwitcher, FilterWithSave, raPreferencesLanguageFrench, } from '../src';
import dataProvider from './dataProvider';
var SongFilter = function (props) { return (React.createElement(FilterWithSave, __assign({}, props),
    React.createElement(SelectInput, { choices: [
            { id: 'Apple', name: 'Apple' },
            { id: 'Atlantic', name: 'Atlantic' },
            { id: 'Capitol', name: 'Capitol' },
            { id: 'Chess', name: 'Chess' },
            { id: 'Columbia', name: 'Columbia' },
            { id: 'DGC', name: 'DGC' },
            { id: 'London', name: 'London' },
            { id: 'Tamla', name: 'Tamla' },
        ], source: "recordCompany" }),
    React.createElement(DateInput, { source: "released_gte", label: "Released after" }),
    React.createElement(DateInput, { source: "released_lte", label: "Released before" }))); };
var SongList = function (props) { return (React.createElement(List, __assign({}, props, { filters: React.createElement(SongFilter, null) }),
    React.createElement(Datagrid, { rowClick: "edit" },
        React.createElement(TextField, { source: "title" }),
        React.createElement(TextField, { source: "artist" }),
        React.createElement(TextField, { source: "writer" }),
        React.createElement(TextField, { source: "producer" }),
        React.createElement(TextField, { source: "recordCompany" }),
        React.createElement(NumberField, { source: "rank" }),
        React.createElement(DateField, { source: "released" })))); };
export var Basic = function () { return (React.createElement(Admin, { dataProvider: dataProvider },
    React.createElement(Resource, { name: "songs", list: SongList }))); };
/****************** With Theme and Locale Switcher ********************/
var frenchAppMessages = {
    resources: {
        songs: {
            name: 'Morceau |||| Morceaux',
            fields: {
                title: 'Titre',
                artist: 'Artiste',
                writer: 'Auteur',
                producer: 'Producteur',
                recordCompany: 'Label',
                rank: 'Classement',
                released: 'Publication',
            },
        },
    },
    ra: { action: { choose_columns: 'Colonnes' } },
};
var i18nProvider = polyglotI18nProvider(function (locale) {
    return locale === 'fr'
        ? merge(frenchMessages, raPreferencesLanguageFrench, frenchAppMessages)
        : englishMessages;
}, 'en' // Default locale
);
var themes = {
    light: {
        type: 'dark',
        palette: {
            primary: {
                main: '#90caf9',
            },
            type: 'dark',
        },
    },
    dark: {
        type: 'light',
        palette: {
            secondary: {
                light: '#5f5fc4',
                main: '#283593',
                dark: '#001064',
                contrastText: '#fff',
            },
        },
        overrides: {
            MuiFilledInput: {
                root: {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    '&$disabled': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                },
            },
        },
    },
};
var MyAppBar = function (props) { return (React.createElement(AppBar, __assign({}, props),
    React.createElement(Box, { flex: "1" },
        React.createElement(Typography, { variant: "h6", id: "react-admin-title" })),
    React.createElement(ToggleThemeButton, null),
    React.createElement(LanguageSwitcher, { languages: [
            { locale: 'en', name: 'English' },
            { locale: 'fr', name: 'Français' },
        ], defaultLanguage: "English" }))); };
var MyLayout = function (props) { return React.createElement(Layout, __assign({}, props, { appBar: MyAppBar })); };
export var WithThemeAndLocale = function () { return (React.createElement(PreferencesBasedThemeProvider, { themeFromType: function (type) { return themes[type]; } },
    React.createElement(Admin, { history: createMemoryHistory(), i18nProvider: i18nProvider, dataProvider: dataProvider, layout: MyLayout },
        React.createElement(Resource, { name: "songs", list: SongList })))); };
export default { title: 'ra-preferences/FilterWithSave' };
