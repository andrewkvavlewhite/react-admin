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
import { Box, Typography, makeStyles } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import MusicIcon from '@material-ui/icons/MusicNote';
import { Search, SearchResultItem, SearchResultsPanel, } from '../src';
import { ArtistEdit, ArtistList, SongEdit } from './common';
import { dataProvider } from './dataProvider';
import i18nProvider from './i18nProvider';
export default {
    title: 'ra-search/Search',
};
var Description = function (_a) {
    var data = _a.data;
    return (React.createElement(Typography, { component: "span", variant: "body2", color: "textSecondary" }, data.content.description));
};
var MyAppbar = function (props) {
    var classes = useStyles();
    return (React.createElement(AppBar, __assign({}, props),
        React.createElement(Typography, { variant: "h6", color: "inherit", className: classes.title, id: "react-admin-title" }),
        React.createElement(Search, null,
            React.createElement(SearchResultsPanel, null,
                React.createElement(SearchResultItem, { label: function (record) { return (React.createElement(Box, { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" },
                        record.type === 'artists' ? (React.createElement(PersonIcon, { className: classes.icon })) : (React.createElement(MusicIcon, { className: classes.icon })),
                        React.createElement(Typography, { variant: "body1", color: "textPrimary" }, record.content.label))); }, description: React.createElement(Description, null) })))));
};
var useStyles = makeStyles(function (theme) { return ({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    icon: {
        paddingRight: theme.spacing(1),
    },
}); });
var MyLayout = function (props) { return (React.createElement(Layout, __assign({}, props, { appBar: MyAppbar }))); };
export var CustomizedSearchResultItem = function () { return (React.createElement(Admin, { dataProvider: dataProvider, i18nProvider: i18nProvider, layout: MyLayout },
    React.createElement(Resource, { name: "artists", list: ArtistList, edit: ArtistEdit }),
    React.createElement(Resource, { name: "songs", edit: SongEdit }))); };
