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
import { Search, useSearchResults } from '../src';
import { dataProvider } from './dataProvider';
import { Link } from 'react-router-dom';
import { ArtistEdit, ArtistList, SongEdit } from './common';
import i18nProvider from './i18nProvider';
export default {
    title: 'ra-search/Search',
};
var MySearchResultsPanel = function () {
    var _a = useSearchResults(), data = _a.data, onClose = _a.onClose;
    return (React.createElement("ul", { style: { maxHeight: '250px' } }, data.map(function (item) { return (React.createElement("li", { key: item.id },
        React.createElement(Link, { to: item.url, onClick: onClose },
            React.createElement("strong", null, item.content.label)),
        React.createElement("p", null, item.content.description))); })));
};
var MySearch = function () { return (React.createElement(Search, null,
    React.createElement(MySearchResultsPanel, null))); };
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
export var CustomSearchResultsPanel = function () { return (React.createElement(Admin, { dataProvider: dataProvider, i18nProvider: i18nProvider, layout: MyLayout },
    React.createElement(Resource, { name: "artists", list: ArtistList, edit: ArtistEdit }),
    React.createElement(Resource, { name: "songs", edit: SongEdit }))); };
