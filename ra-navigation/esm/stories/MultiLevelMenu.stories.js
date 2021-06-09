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
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { useEffect } from 'react';
import { Admin, Resource, Layout, List, Datagrid, TextField, } from 'react-admin';
import { createMemoryHistory } from 'history';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MusicIcon from '@material-ui/icons/MusicNote';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import FlashIcon from '@material-ui/icons/FlashOn';
import { makeStyles } from '@material-ui/core/styles';
import merge from 'lodash/merge';
import { AppLocationContext, useAppLocationState, useDefineAppLocation, useResourceAppLocation, } from '../src/app-location';
import { Menu, MenuItem, MenuItemCategory, MultiLevelMenu, theme, } from '../src/multi-level-menu';
import dataProvider from './dataProvider';
export default { title: 'ra-navigation/MultiLevelMenu/Basic' };
var BasicMultiLevelMenu = function () { return (React.createElement(MultiLevelMenu, null,
    React.createElement(MenuItem, { name: "dashboard", to: "/", exact: true, label: "Dashboard" }),
    React.createElement(MenuItem, { name: "songs", to: "/songs", label: "Songs" }),
    React.createElement(MenuItem, { name: "artists", to: '/artists?filter={}', label: "Artists" },
        React.createElement(MenuItem, { name: "artists.rock", to: '/artists?filter={"type":"Rock"}', label: "Rock" },
            React.createElement(MenuItem, { name: "artists.rock.pop", to: '/artists?filter={"type":"Pop Rock"}', label: "Pop Rock" }),
            React.createElement(MenuItem, { name: "artists.rock.folk", to: '/artists?filter={"type":"Folk Rock"}', label: "Folk Rock" })),
        React.createElement(MenuItem, { name: "artists.jazz", to: '/artists?filter={"type":"Jazz"}', label: "Jazz" },
            React.createElement(MenuItem, { name: "artists.jazz.rb", to: '/artists?filter={"type":"RB"}', label: "R&B" }))))); };
var BasicLayout = function (props) {
    return (React.createElement(AppLocationContext, null,
        React.createElement(Layout, __assign({}, props, { menu: BasicMultiLevelMenu }))));
};
var Dashboard = function () {
    useDefineAppLocation('dashboard');
    return (React.createElement(Card, null,
        React.createElement("h1", null, "Dashboard")));
};
var SongList = function (props) { return (React.createElement(List, __assign({}, props),
    React.createElement(Datagrid, null,
        React.createElement(TextField, { source: "id" }),
        React.createElement(TextField, { source: "title" })))); };
var ArtistList = function (props) { return (React.createElement(List, __assign({}, props),
    React.createElement(ArtistsDatagrid, null))); };
var types = {
    Rock: 'artists.rock',
    'Folk Rock': 'artists.rock.folk',
    'Pop Rock': 'artists.rock.pop',
    Jazz: 'artists.jazz',
    RB: 'artists.jazz.rb',
};
var ArtistsDatagrid = function (props) {
    var _a = useAppLocationState(), setLocation = _a[1];
    var resourceLocation = useResourceAppLocation();
    useEffect(function () {
        var type = props.filterValues.type;
        if (typeof type !== 'undefined') {
            setLocation(types[type]);
        }
    }, 
    /* eslint-disable react-hooks/exhaustive-deps */
    [
        JSON.stringify({
            resourceLocation: resourceLocation,
            filter: props.filterValues,
        }),
    ]
    /* eslint-enable react-hooks/exhaustive-deps */
    );
    return (React.createElement(Datagrid, __assign({}, props),
        React.createElement(TextField, { source: "id" }),
        React.createElement(TextField, { source: "name" })));
};
export var Basic = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider, layout: BasicLayout, dashboard: Dashboard },
    React.createElement(Resource, { name: "songs", list: SongList }),
    React.createElement(Resource, { name: "artists", list: ArtistList }))); };
var InitiallyOpenMultiLevelMenu = function () { return (React.createElement(MultiLevelMenu, { initialOpen: true },
    React.createElement(MenuItem, { name: "dashboard", to: "/", exact: true, label: "Dashboard" }),
    React.createElement(MenuItem, { name: "songs", to: "/songs", label: "Songs" }),
    React.createElement(MenuItem, { name: "artists", to: '/artists?filter={}', label: "Artists" },
        React.createElement(MenuItem, { name: "artists.rock", to: '/artists?filter={"type":"Rock"}', label: "Rock" },
            React.createElement(MenuItem, { name: "artists.rock.pop", to: '/artists?filter={"type":"Pop Rock"}', label: "Pop Rock" }),
            React.createElement(MenuItem, { name: "artists.rock.folk", to: '/artists?filter={"type":"Folk Rock"}', label: "Folk Rock" })),
        React.createElement(MenuItem, { name: "artists.jazz", to: '/artists?filter={"type":"Jazz"}', label: "Jazz" },
            React.createElement(MenuItem, { name: "artists.jazz.rb", to: '/artists?filter={"type":"RB"}', label: "R&B" }))))); };
var InitiallyOpenLayout = function (props) {
    return (React.createElement(AppLocationContext, null,
        React.createElement(Layout, __assign({}, props, { menu: InitiallyOpenMultiLevelMenu }))));
};
export var InitiallyOpen = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider, layout: InitiallyOpenLayout, dashboard: Dashboard },
    React.createElement(Resource, { name: "songs", list: SongList }),
    React.createElement(Resource, { name: "artists", list: ArtistList }))); };
export var OpennedOnLoad = function () {
    var history = createMemoryHistory({
        initialEntries: ['/artists?filter={"type":"Folk Rock"}'],
    });
    return (React.createElement(Admin, { dataProvider: dataProvider, layout: BasicLayout, dashboard: Dashboard, history: history },
        React.createElement(Resource, { name: "songs", list: SongList }),
        React.createElement(Resource, { name: "artists", list: ArtistList })));
};
var MultiLevelMenuWithIcons = function () { return (React.createElement(MultiLevelMenu, null,
    React.createElement(MenuItem, { name: "dashboard", to: "/", exact: true, label: "Dashboard", icon: React.createElement(DashboardIcon, null) }),
    React.createElement(MenuItem, { name: "songs", to: "/songs", label: "Songs", icon: React.createElement(MusicIcon, null) }),
    React.createElement(MenuItem, { name: "artists", to: '/artists?filter={}', label: "Artists", icon: React.createElement(PeopleIcon, null) },
        React.createElement(MenuItem, { name: "artists.rock", to: '/artists?filter={"type":"Rock"}', label: "Rock" },
            React.createElement(MenuItem, { name: "artists.rock.pop", to: '/artists?filter={"type":"Pop Rock"}', label: "Pop Rock" }),
            React.createElement(MenuItem, { name: "artists.rock.folk", to: '/artists?filter={"type":"Folk Rock"}', label: "Folk Rock" })),
        React.createElement(MenuItem, { name: "artists.jazz", to: '/artists?filter={"type":"Jazz"}', label: "Jazz" },
            React.createElement(MenuItem, { name: "artists.jazz.rb", to: '/artists?filter={"type":"RB"}', label: "R&B" }))))); };
var LayoutWithIcons = function (props) {
    return (React.createElement(AppLocationContext, null,
        React.createElement(Layout, __assign({}, props, { menu: MultiLevelMenuWithIcons }))));
};
export var WithIcons = function () { return (React.createElement(Admin, { dataProvider: dataProvider, layout: LayoutWithIcons, dashboard: Dashboard, history: createMemoryHistory() },
    React.createElement(Resource, { name: "songs", list: SongList }),
    React.createElement(Resource, { name: "artists", list: ArtistList }))); };
export var WithIconsDarkMode = function () {
    var darkTheme = merge({}, theme, {
        palette: {
            type: 'dark',
        },
    });
    return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider, layout: LayoutWithIcons, dashboard: Dashboard, theme: darkTheme },
        React.createElement(Resource, { name: "songs", list: SongList }),
        React.createElement(Resource, { name: "artists", list: ArtistList })));
};
var useStyles = makeStyles({
    configuration: {
        marginTop: 'auto',
    },
});
var MultiLevelMenuWithCategories = function () {
    var classes = useStyles();
    return (React.createElement(MultiLevelMenu, { variant: "categories" },
        React.createElement(MenuItemCategory, { name: "dashboard", to: "/", exact: true, label: "Dashboard", icon: React.createElement(DashboardIcon, null) }),
        React.createElement(MenuItemCategory, { name: "songs", icon: React.createElement(MusicIcon, null), to: "/songs", label: "Songs" }),
        React.createElement(MenuItemCategory, { name: "artists", label: "Artists", icon: React.createElement(PeopleIcon, null) },
            React.createElement(CardContent, null,
                React.createElement(Typography, { variant: "h4", gutterBottom: true }, "All artists"),
                React.createElement(Menu, null,
                    React.createElement(MenuItem, { name: "artists", to: '/artists?filter={}', label: "All Artists" }),
                    React.createElement(MenuItem, { name: "artists.rock", to: '/artists?filter={"type":"Rock"}', label: "Rock" },
                        React.createElement(MenuItem, { name: "artists.rock.pop", to: '/artists?filter={"type":"Pop Rock"}', label: "Pop Rock" }),
                        React.createElement(MenuItem, { name: "artists.rock.folk", to: '/artists?filter={"type":"Folk Rock"}', label: "Folk Rock" })),
                    React.createElement(MenuItem, { name: "artists.jazz", to: '/artists?filter={"type":"Jazz"}', label: "Jazz" },
                        React.createElement(MenuItem, { name: "artists.jazz.rb", to: '/artists?filter={"type":"RB"}', label: "R&B" }))))),
        React.createElement(MenuItemCategory, { name: "rock_artists", label: "Rock Artists", icon: React.createElement(FlashIcon, null) },
            React.createElement(CardContent, null,
                React.createElement(Typography, { variant: "h4", gutterBottom: true }, "Rock artists"),
                React.createElement(Menu, null,
                    React.createElement(MenuItem, { name: "rock_artists.pop", to: '/artists?filter={"type":"Pop Rock"}', label: "Pop Rock" }),
                    React.createElement(MenuItem, { name: "rock_artists.folk", to: '/artists?filter={"type":"Folk Rock"}', label: "Folk Rock" })))),
        React.createElement(MenuItemCategory, { className: classes.configuration, name: "configuration", to: "/", exact: true, label: "Configuration", icon: React.createElement(SettingsIcon, null) })));
};
var LayoutWithCategories = function (props) {
    return (React.createElement(AppLocationContext, null,
        React.createElement(Layout, __assign({}, props, { menu: MultiLevelMenuWithCategories }))));
};
export var WithCategories = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider, layout: LayoutWithCategories, dashboard: Dashboard, theme: theme },
    React.createElement(Resource, { name: "songs", list: SongList }),
    React.createElement(Resource, { name: "artists", list: ArtistList }))); };
export var WithCategoriesDarkMode = function () {
    var darkTheme = merge({}, theme, {
        palette: {
            type: 'dark',
        },
    });
    return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider, layout: LayoutWithCategories, dashboard: Dashboard, theme: darkTheme },
        React.createElement(Resource, { name: "songs", list: SongList }),
        React.createElement(Resource, { name: "artists", list: ArtistList })));
};
