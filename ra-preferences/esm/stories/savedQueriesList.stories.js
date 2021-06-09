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
import { Admin, AppBar, Layout, Resource, Datagrid, List, TextField, NumberField, DateField, FilterList, FilterListItem, } from 'react-admin';
import { Card as MuiCard, CardContent, Box, Typography, } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { withStyles } from '@material-ui/core/styles';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import frenchMessages from 'ra-language-french';
import { createMemoryHistory } from 'history';
import { ToggleThemeButton, PreferencesBasedThemeProvider, LanguageSwitcher, SavedQueriesList, raPreferencesLanguageFrench, } from '../src';
import dataProvider from './dataProvider';
var Card = withStyles(function (theme) {
    var _a;
    return ({
        root: (_a = {},
            _a[theme.breakpoints.up('sm')] = {
                order: -1,
                minWidth: '15em',
                marginRight: '1em',
            },
            _a[theme.breakpoints.down('sm')] = {
                display: 'none',
            },
            _a),
    });
})(MuiCard);
var Aside = function () { return (React.createElement(Card, null,
    React.createElement(CardContent, null,
        React.createElement(SavedQueriesList, null),
        React.createElement(FilterList, { label: "Record Company", icon: React.createElement(BusinessIcon, null) },
            React.createElement(FilterListItem, { label: "Apple", value: {
                    recordCompany: 'Apple',
                } }),
            React.createElement(FilterListItem, { label: "Atlantic", value: {
                    recordCompany: 'Atlantic',
                } }),
            React.createElement(FilterListItem, { label: "Capitol", value: {
                    recordCompany: 'Capitol',
                } }),
            React.createElement(FilterListItem, { label: "Chess", value: {
                    recordCompany: 'Chess',
                } }),
            React.createElement(FilterListItem, { label: "Columbia", value: {
                    recordCompany: 'Columbia',
                } }),
            React.createElement(FilterListItem, { label: "DGC", value: {
                    recordCompany: 'DGC',
                } }),
            React.createElement(FilterListItem, { label: "London", value: {
                    recordCompany: 'London',
                } }),
            React.createElement(FilterListItem, { label: "Tamla", value: {
                    recordCompany: 'Tamla',
                } })),
        React.createElement(FilterList, { label: "Released", icon: React.createElement(DateRangeIcon, null) },
            React.createElement(FilterListItem, { label: "50s", value: {
                    released_gte: '1950-01-01',
                    released_lte: '1959-12-31',
                } }),
            React.createElement(FilterListItem, { label: "60s", value: {
                    released_gte: '1960-01-01',
                    released_lte: '1969-12-31',
                } }),
            React.createElement(FilterListItem, { label: "70s", value: {
                    released_gte: '1970-01-01',
                    released_lte: '1979-12-31',
                } }),
            React.createElement(FilterListItem, { label: "80s", value: {
                    released_gte: '1980-01-01',
                    released_lte: '1989-12-31',
                } }),
            React.createElement(FilterListItem, { label: "90s", value: {
                    released_gte: '1990-01-01',
                    released_lte: '1999-12-31',
                } }))))); };
var SongList = function (props) { return (React.createElement(List, __assign({}, props, { aside: React.createElement(Aside, null) }),
    React.createElement(Datagrid, { rowClick: "edit" },
        React.createElement(TextField, { source: "title" }),
        React.createElement(TextField, { source: "artist" }),
        React.createElement(TextField, { source: "writer" }),
        React.createElement(TextField, { source: "producer" }),
        React.createElement(TextField, { source: "recordCompany" }),
        React.createElement(NumberField, { source: "rank" }),
        React.createElement(DateField, { source: "released" })))); };
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
export default { title: 'ra-preferences/SavedQueriesList' };
