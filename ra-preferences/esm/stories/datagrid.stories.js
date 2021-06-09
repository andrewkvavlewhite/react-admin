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
import { Admin, AppBar, Layout, Resource, Datagrid, List, TextField, NumberField, DateField, Filter, SearchInput, TopToolbar, } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import frenchMessages from 'ra-language-french';
import { Box, Typography } from '@material-ui/core';
import { createMemoryHistory } from 'history';
import { SelectColumnsButton, useSelectedColumns, ToggleThemeButton, PreferencesBasedThemeProvider, LanguageSwitcher, } from '../src';
import dataProvider from './dataProvider';
var songListColumns = {
    title: React.createElement(TextField, { source: "title" }),
    artist: React.createElement(TextField, { source: "artist" }),
    writer: React.createElement(TextField, { source: "writer" }),
    producer: React.createElement(TextField, { source: "producer" }),
    recordCompany: React.createElement(TextField, { source: "recordCompany" }),
    rank: React.createElement(NumberField, { source: "rank" }),
    released: React.createElement(DateField, { source: "released" }),
};
var SongFilter = function (props) { return (React.createElement(Filter, __assign({}, props),
    React.createElement(SearchInput, { source: "q", alwaysOn: true }))); };
var SongActions = function () { return (React.createElement(TopToolbar, null,
    React.createElement(SelectColumnsButton, { preference: "songs.list.columns", columns: songListColumns }))); };
var SongList = function (props) {
    var columns = useSelectedColumns({
        preferences: 'songs.list.columns',
        columns: songListColumns,
        omit: ['producer'],
    });
    return (React.createElement(List, __assign({ actions: React.createElement(SongActions, null), filters: React.createElement(SongFilter, null) }, props),
        React.createElement(Datagrid, { rowClick: "edit" }, columns)));
};
export var Basic = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider },
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
        ? merge(frenchMessages, frenchAppMessages)
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
export default { title: 'ra-preferences/SelectColumnsButton' };
