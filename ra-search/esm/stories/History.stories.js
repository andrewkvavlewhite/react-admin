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
import { Search } from '../src';
import { dataProvider } from './dataProvider';
import { ArtistList, ArtistEdit, SongList, SongEdit } from './common';
import i18nProvider from './i18nProvider';
export default {
    title: 'ra-search/Search/Basic',
};
var MyAppbar = function (props) {
    var classes = useStyles();
    return (React.createElement(AppBar, __assign({}, props),
        React.createElement(Typography, { variant: "h6", color: "inherit", className: classes.title, id: "react-admin-title" }),
        React.createElement(Search, { options: { historySize: 3 } })));
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
export var ChangeSizeTo3 = function () { return (React.createElement(Admin, { dataProvider: dataProvider, i18nProvider: i18nProvider, layout: MyLayout },
    React.createElement(Resource, { name: "artists", list: ArtistList, edit: ArtistEdit }),
    React.createElement(Resource, { name: "songs", list: SongList, edit: SongEdit }))); };
