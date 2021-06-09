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
import * as React from 'react';
import { Admin, AppBar, Layout, Resource } from 'react-admin';
import { Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Search, SearchResultsPanel } from '../src';
import { dataProvider } from './dataProvider';
import { ArtistEdit, ArtistList, SongEdit } from './common';
import i18nProvider from './i18nProvider';
export default {
    title: 'ra-search/Search',
};
var MySearchResultItem = function (_a) {
    var data = _a.data, onClose = _a.onClose;
    var classes = useSearchResultItemStyles();
    return (React.createElement("li", { key: data.id, className: classes.root },
        React.createElement(Typography, { className: classes.label, component: Link, to: data.url, onClick: onClose }, data.content.label),
        React.createElement(Typography, { component: "p" }, data.content.description)));
};
var useSearchResultItemStyles = makeStyles(function (theme) { return ({
    root: {
        padding: theme.spacing(1, 2),
    },
    label: {
        fontWeight: theme.typography.fontWeightBold,
    },
}); });
var MySearch = function () { return (React.createElement(Search, null,
    React.createElement(SearchResultsPanel, null,
        React.createElement(MySearchResultItem, null)))); };
var MyAppbar = function (props) {
    var classes = useStyles();
    return (React.createElement(AppBar, __assign({}, props),
        React.createElement(Typography, { variant: "h6", color: "inherit", className: classes.title, id: "react-admin-title" }),
        React.createElement(MySearch, null)));
};
var useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
});
var MyLayout = function (props) { return (React.createElement(Layout, __assign({}, props, { appBar: MyAppbar }))); };
export var CustomSearchItem = function () { return (React.createElement(Admin, { dataProvider: dataProvider, i18nProvider: i18nProvider, layout: MyLayout },
    React.createElement(Resource, { name: "artists", list: ArtistList, edit: ArtistEdit }),
    React.createElement(Resource, { name: "songs", edit: SongEdit }))); };
