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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect } from 'react';
import { makeStyles, Typography, Card, CardContent } from '@material-ui/core';
import merge from 'lodash/merge';
import { Admin, Resource, List, Edit, Create, SimpleForm, Show, SimpleShowLayout, TextField, TextInput, Layout, Datagrid, ShowButton, EditButton, ReferenceField, Filter, ReferenceInput, SelectInput, defaultTheme, } from 'react-admin';
import { createMemoryHistory } from 'history';
import { Route, Switch } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from '../src/breadcrumb';
import dataProvider from './dataProvider';
import { ResourceBreadcrumbItems } from '../src/breadcrumb/ResourceBreadcrumbItems';
import { AppLocationContext, useAppLocationState, useResourceAppLocation, } from '../src/app-location';
export default { title: 'ra-navigation/Breadcrumb/Basic' };
var useStyles = makeStyles(function (theme) { return ({
    breadcrumb: {
        '& ul': {
            padding: theme.spacing(1) + "px",
            paddingLeft: 0,
        },
        '& ul:empty': {
            padding: 0,
        },
    },
}); });
var MyBreadcrumb = function (props) {
    var classes = useStyles();
    return (React.createElement(Breadcrumb, __assign({ className: classes.breadcrumb }, props),
        React.createElement(ResourceBreadcrumbItems, { resources: ['songs', 'artists'] }),
        React.createElement(BreadcrumbItem, { name: "songs_by_artist.filter", label: function (_a) {
                var artistId = _a.artistId;
                return "Filtered by artist #" + artistId;
            } })));
};
var MyBreadcrumbCustomHome = function (props) {
    var classes = useStyles();
    return (React.createElement(Breadcrumb, __assign({ className: classes.breadcrumb }, props),
        React.createElement(BreadcrumbItem, { name: "dashboard", label: "My Home" },
            React.createElement(ResourceBreadcrumbItems, { resources: ['songs', 'artists'] }),
            React.createElement(BreadcrumbItem, { name: "songs_by_artist.filter", label: function (_a) {
                    var artistId = _a.artistId;
                    return "Filtered by artist #" + artistId;
                } }))));
};
var RestrictedBreadcrumb = function (props) {
    var classes = useStyles();
    var location = useAppLocationState()[0];
    if (!location.path || location.path.startsWith('artists'))
        return null;
    return (React.createElement(Breadcrumb, __assign({ className: classes.breadcrumb }, props),
        React.createElement(ResourceBreadcrumbItems, { resources: ['songs'] }),
        React.createElement(BreadcrumbItem, { name: "songs_by_artist.filter", label: function (_a) {
                var artistId = _a.artistId;
                return "Filtered by artist #" + artistId;
            } })));
};
var MyLayout = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (React.createElement(AppLocationContext, null,
        React.createElement(Layout, __assign({}, props), children)));
};
var SongFilter = function (props) { return (React.createElement(Filter, __assign({}, props),
    React.createElement(ReferenceInput, { alwaysOn: true, source: "artist_id", reference: "artists" },
        React.createElement(SelectInput, { optionText: "name" })))); };
var SongsGrid = function (props) {
    var _a = useAppLocationState(), setLocation = _a[1];
    var resourceLocation = useResourceAppLocation();
    useEffect(function () {
        var artistId = props.filterValues.artist_id;
        if (typeof artistId !== 'undefined') {
            setLocation('songs_by_artist.filter', { artistId: artistId });
        }
        else {
            setLocation('songs');
        }
    }, [
        // eslint-disable-next-line react-hooks/exhaustive-deps
        JSON.stringify({
            resourceLocation: resourceLocation,
            filter: props.filterValues,
        }),
    ]);
    return (React.createElement(Datagrid, __assign({}, props),
        React.createElement(TextField, { source: "id" }),
        React.createElement(TextField, { source: "title" }),
        React.createElement(ReferenceField, { source: "artist_id", reference: "artists" },
            React.createElement(TextField, { source: "name" })),
        React.createElement(ShowButton, null),
        React.createElement(EditButton, null)));
};
var SongList = function (_a) {
    var breadcrumb = _a.breadcrumb, props = __rest(_a, ["breadcrumb"]);
    return (React.createElement(React.Fragment, null,
        breadcrumb,
        React.createElement(List, __assign({}, props, { filters: React.createElement(SongFilter, null) }),
            React.createElement(SongsGrid, null))));
};
var ArtistList = function (_a) {
    var breadcrumb = _a.breadcrumb, props = __rest(_a, ["breadcrumb"]);
    return (React.createElement(React.Fragment, null,
        breadcrumb,
        React.createElement(List, __assign({}, props),
            React.createElement(Datagrid, null,
                React.createElement(TextField, { source: "id" }),
                React.createElement(TextField, { source: "name" }),
                React.createElement(EditButton, null)))));
};
var ArtistEdit = function (_a) {
    var breadcrumb = _a.breadcrumb, props = __rest(_a, ["breadcrumb"]);
    return (React.createElement(React.Fragment, null,
        breadcrumb,
        React.createElement(Edit, __assign({}, props),
            React.createElement(SimpleForm, null,
                React.createElement(TextInput, { source: "name" })))));
};
var SongEdit = function (_a) {
    var breadcrumb = _a.breadcrumb, props = __rest(_a, ["breadcrumb"]);
    return (React.createElement(React.Fragment, null,
        breadcrumb,
        React.createElement(Edit, __assign({}, props),
            React.createElement(SimpleForm, null,
                React.createElement(TextInput, { source: "title" })))));
};
var SongCreate = function (_a) {
    var breadcrumb = _a.breadcrumb, props = __rest(_a, ["breadcrumb"]);
    return (React.createElement(React.Fragment, null,
        breadcrumb,
        React.createElement(Create, __assign({}, props),
            React.createElement(SimpleForm, null,
                React.createElement(TextInput, { source: "title" })))));
};
var SongShow = function (_a) {
    var breadcrumb = _a.breadcrumb, props = __rest(_a, ["breadcrumb"]);
    return (React.createElement(React.Fragment, null,
        breadcrumb,
        React.createElement(Show, __assign({}, props),
            React.createElement(SimpleShowLayout, null,
                React.createElement(TextField, { source: "title" })))));
};
var SongListAside = function () { return (React.createElement(Switch, null,
    React.createElement(Route, { path: "/songs/create", render: function () { return React.createElement(SongCreate, { resource: "songs", basePath: "/songs" }); } }),
    React.createElement(Route, { path: "/songs/:id/show", render: function (routeProps) { return (React.createElement(SongShow, { id: routeProps.match.params
                .id, resource: "songs", basePath: "/songs" })); } }),
    React.createElement(Route, { path: "/songs/:id", render: function (routeProps) { return (React.createElement(SongEdit, { id: routeProps.match.params
                .id, resource: "songs", basePath: "/songs" })); } }))); };
var Dashboard = function (_a) {
    var breadcrumb = _a.breadcrumb;
    return (React.createElement(React.Fragment, null,
        breadcrumb,
        React.createElement(Card, null,
            React.createElement(CardContent, null,
                React.createElement(Typography, { variant: "h4" }, "Here is Homepage"),
                React.createElement(Typography, null, "No breadcrumb is displayed in Home")))));
};
export var Basic = function (props) { return (React.createElement(Admin, __assign({ history: createMemoryHistory(), dataProvider: dataProvider, layout: MyLayout, dashboard: function (props) { return (React.createElement(Dashboard, __assign({ breadcrumb: React.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); } }, props),
    React.createElement(Resource, { name: "songs", list: function (props) { return (React.createElement(SongList, __assign({ breadcrumb: React.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); }, edit: function (props) { return (React.createElement(SongEdit, __assign({ breadcrumb: React.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); }, create: function (props) { return (React.createElement(SongCreate, __assign({ breadcrumb: React.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); }, show: function (props) { return (React.createElement(SongShow, __assign({ breadcrumb: React.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); } }),
    React.createElement(Resource, { name: "artists", options: { label: 'Artists' }, list: function (props) { return (React.createElement(ArtistList, __assign({ breadcrumb: React.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); }, edit: function (props) { return (React.createElement(ArtistEdit, __assign({ breadcrumb: React.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); } }))); };
export var DarkMode = function () {
    var darkTheme = merge({}, defaultTheme, {
        palette: {
            type: 'dark',
        },
    });
    return React.createElement(Basic, { theme: darkTheme });
};
export var BasicNoHome = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider, layout: MyLayout },
    React.createElement(Resource, { name: "songs", list: function (props) { return (React.createElement(SongList, __assign({ breadcrumb: React.createElement(MyBreadcrumb, null) }, props))); }, edit: function (props) { return (React.createElement(SongEdit, __assign({ breadcrumb: React.createElement(MyBreadcrumb, null) }, props))); }, create: function (props) { return (React.createElement(SongCreate, __assign({ breadcrumb: React.createElement(MyBreadcrumb, null) }, props))); }, show: function (props) { return (React.createElement(SongShow, __assign({ breadcrumb: React.createElement(MyBreadcrumb, null) }, props))); } }),
    React.createElement(Resource, { name: "artists", list: function (props) { return (React.createElement(ArtistList, __assign({ breadcrumb: React.createElement(MyBreadcrumb, null) }, props))); }, edit: function (props) { return (React.createElement(ArtistEdit, __assign({ breadcrumb: React.createElement(MyBreadcrumb, null) }, props))); } }))); };
export var BasicCustomHome = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider, layout: MyLayout },
    React.createElement(Resource, { name: "songs", list: function (props) { return (React.createElement(SongList, __assign({ breadcrumb: React.createElement(MyBreadcrumbCustomHome, null) }, props))); }, edit: function (props) { return (React.createElement(SongEdit, __assign({ breadcrumb: React.createElement(MyBreadcrumbCustomHome, null) }, props))); }, create: function (props) { return (React.createElement(SongCreate, __assign({ breadcrumb: React.createElement(MyBreadcrumbCustomHome, null) }, props))); }, show: function (props) { return (React.createElement(SongShow, __assign({ breadcrumb: React.createElement(MyBreadcrumbCustomHome, null) }, props))); } }),
    React.createElement(Resource, { name: "artists", list: function (props) { return (React.createElement(ArtistList, __assign({ breadcrumb: React.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); }, edit: function (props) { return (React.createElement(ArtistEdit, __assign({ breadcrumb: React.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); } }))); };
export var BasicRestricted = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider, layout: MyLayout, dashboard: function (props) { return (React.createElement(Dashboard, __assign({ breadcrumb: React.createElement(RestrictedBreadcrumb, { hasDashboard: true }) }, props))); } },
    React.createElement(Resource, { name: "songs", list: function (props) { return (React.createElement(SongList, __assign({ breadcrumb: React.createElement(RestrictedBreadcrumb, { hasDashboard: true }) }, props))); }, edit: function (props) { return (React.createElement(SongEdit, __assign({ breadcrumb: React.createElement(RestrictedBreadcrumb, { hasDashboard: true }) }, props))); }, create: function (props) { return (React.createElement(SongCreate, __assign({ breadcrumb: React.createElement(RestrictedBreadcrumb, { hasDashboard: true }) }, props))); }, show: function (props) { return (React.createElement(SongShow, __assign({ breadcrumb: React.createElement(RestrictedBreadcrumb, { hasDashboard: true }) }, props))); } }),
    React.createElement(Resource, { name: "artists", options: { label: 'Artists (no breadcrumb)' }, list: function (props) { return (React.createElement(ArtistList, __assign({ breadcrumb: React.createElement(RestrictedBreadcrumb, { hasDashboard: true }) }, props))); }, edit: function (props) { return (React.createElement(ArtistEdit, __assign({ breadcrumb: React.createElement(RestrictedBreadcrumb, { hasDashboard: true }) }, props))); } }))); };
export var WithInnerDynamicViews = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider, layout: MyLayout, dashboard: function (props) { return (React.createElement(Dashboard, __assign({ breadcrumb: React.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); } },
    React.createElement(Resource, { name: "songs", list: function (props) { return (React.createElement(SongList, __assign({ breadcrumb: React.createElement(MyBreadcrumb, { hasDashboard: true }), aside: React.createElement(SongListAside, null) }, props, { hasCreate: true }))); } }),
    React.createElement(Resource, { name: "artists", options: { label: 'Artists' }, list: function (props) { return (React.createElement(ArtistList, __assign({ breadcrumb: React.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); }, edit: function (props) { return (React.createElement(ArtistEdit, __assign({ breadcrumb: React.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); } }))); };
