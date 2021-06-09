import * as React from 'react';
import { Form } from 'react-final-form';
import { ListItemText, ListItemIcon, ThemeProvider, createMuiTheme, Card, CardContent, CssBaseline, } from '@material-ui/core';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { TranslationProvider } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import merge from 'lodash/merge';
import { DualListInput, raRelationshipsLanguageEnglish } from '../../src';
export default {
    title: 'ra-relationships/DualListInput',
};
var i18nProvider = polyglotI18nProvider(function () { return merge(englishMessages, raRelationshipsLanguageEnglish); }, 'en' // Default locale
);
var choices = [
    { id: 0, name: 'Rock', icon: React.createElement(MusicNoteIcon, null), disabled: false },
    { id: 1, name: 'Jazz', icon: React.createElement(MusicNoteIcon, null), disabled: false },
    { id: 2, name: 'Country', icon: React.createElement(MusicNoteIcon, null), disabled: true },
    { id: 3, name: 'Pop', icon: React.createElement(MusicNoteIcon, null), disabled: false },
    { id: 4, name: 'Metal', icon: React.createElement(MusicNoteIcon, null), disabled: false },
    { id: 5, name: 'Rap', icon: React.createElement(MusicNoteIcon, null), disabled: false },
    { id: 6, name: 'Raegae', icon: React.createElement(MusicNoteIcon, null), disabled: false },
    { id: 7, name: 'Classical', icon: React.createElement(MusicNoteIcon, null), disabled: false },
];
export var Default = function () { return (React.createElement(TranslationProvider, { i18nProvider: i18nProvider },
    React.createElement(React.Fragment, null,
        React.createElement(CssBaseline, null),
        React.createElement(Card, null,
            React.createElement(CardContent, null,
                React.createElement(Form, { onSubmit: function (_a) {
                        var values = _a.values;
                        console.log({ values: values }); // eslint-disable-line
                    }, render: function () { return (React.createElement(DualListInput, { label: "Items", source: "items", choices: choices })); } })))))); };
export var Loading = function () {
    var _a = React.useState(true), loading = _a[0], setLoading = _a[1];
    React.useEffect(function () {
        setTimeout(function () {
            setLoading(false);
        }, 2000);
    }, []);
    return (React.createElement(TranslationProvider, { i18nProvider: i18nProvider },
        React.createElement(React.Fragment, null,
            React.createElement(CssBaseline, null),
            React.createElement(Card, null,
                React.createElement(CardContent, null,
                    React.createElement(Form, { onSubmit: function (_a) {
                            var values = _a.values;
                            console.log({ values: values }); // eslint-disable-line
                        }, render: function () { return (React.createElement(DualListInput, { label: "Items", source: "items", choices: choices, loading: loading })); } }))))));
};
export var DarkMode = function () { return (React.createElement(ThemeProvider, { theme: createMuiTheme({ palette: { type: 'dark' } }) },
    React.createElement(Default, null))); };
var initialValues = {
    items: [0, 3, 4],
};
export var WithCurrentValue = function () { return (React.createElement(TranslationProvider, { i18nProvider: i18nProvider },
    React.createElement(React.Fragment, null,
        React.createElement(CssBaseline, null),
        React.createElement(Card, null,
            React.createElement(CardContent, null,
                React.createElement(Form, { initialValues: initialValues, onSubmit: function (_a) {
                        var values = _a.values;
                        console.log({ values: values }); // eslint-disable-line
                    }, render: function () { return (React.createElement(DualListInput, { label: "Items", source: "items", choices: choices })); } })))))); };
var CustomItem = function (_a) {
    var record = _a.record;
    return (React.createElement(React.Fragment, null,
        React.createElement(ListItemIcon, null,
            React.createElement(MusicNoteIcon, null)),
        React.createElement(ListItemText, { primary: record.name })));
};
export var CustomItems = function () { return (React.createElement(TranslationProvider, { i18nProvider: i18nProvider },
    React.createElement(React.Fragment, null,
        React.createElement(CssBaseline, null),
        React.createElement(Card, null,
            React.createElement(CardContent, null,
                React.createElement(Form, { onSubmit: function (_a) {
                        var values = _a.values;
                        console.log({ values: values }); // eslint-disable-line
                    }, render: function () { return (React.createElement(DualListInput, { label: "Items", source: "items", choices: choices, optionText: React.createElement(CustomItem, null) })); } })))))); };
