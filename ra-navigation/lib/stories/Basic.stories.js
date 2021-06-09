"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithInnerDynamicViews = exports.BasicRestricted = exports.BasicCustomHome = exports.BasicNoHome = exports.DarkMode = exports.Basic = void 0;
/* eslint-disable @typescript-eslint/explicit-function-return-type */
var react_1 = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var merge_1 = __importDefault(require("lodash/merge"));
var react_admin_1 = require("react-admin");
var history_1 = require("history");
var react_router_dom_1 = require("react-router-dom");
var breadcrumb_1 = require("../src/breadcrumb");
var dataProvider_1 = __importDefault(require("./dataProvider"));
var ResourceBreadcrumbItems_1 = require("../src/breadcrumb/ResourceBreadcrumbItems");
var app_location_1 = require("../src/app-location");
exports.default = { title: 'ra-navigation/Breadcrumb/Basic' };
var useStyles = core_1.makeStyles(function (theme) { return ({
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
    return (react_1.default.createElement(breadcrumb_1.Breadcrumb, __assign({ className: classes.breadcrumb }, props),
        react_1.default.createElement(ResourceBreadcrumbItems_1.ResourceBreadcrumbItems, { resources: ['songs', 'artists'] }),
        react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { name: "songs_by_artist.filter", label: function (_a) {
                var artistId = _a.artistId;
                return "Filtered by artist #" + artistId;
            } })));
};
var MyBreadcrumbCustomHome = function (props) {
    var classes = useStyles();
    return (react_1.default.createElement(breadcrumb_1.Breadcrumb, __assign({ className: classes.breadcrumb }, props),
        react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { name: "dashboard", label: "My Home" },
            react_1.default.createElement(ResourceBreadcrumbItems_1.ResourceBreadcrumbItems, { resources: ['songs', 'artists'] }),
            react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { name: "songs_by_artist.filter", label: function (_a) {
                    var artistId = _a.artistId;
                    return "Filtered by artist #" + artistId;
                } }))));
};
var RestrictedBreadcrumb = function (props) {
    var classes = useStyles();
    var location = app_location_1.useAppLocationState()[0];
    if (!location.path || location.path.startsWith('artists'))
        return null;
    return (react_1.default.createElement(breadcrumb_1.Breadcrumb, __assign({ className: classes.breadcrumb }, props),
        react_1.default.createElement(ResourceBreadcrumbItems_1.ResourceBreadcrumbItems, { resources: ['songs'] }),
        react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { name: "songs_by_artist.filter", label: function (_a) {
                var artistId = _a.artistId;
                return "Filtered by artist #" + artistId;
            } })));
};
var MyLayout = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (react_1.default.createElement(app_location_1.AppLocationContext, null,
        react_1.default.createElement(react_admin_1.Layout, __assign({}, props), children)));
};
var SongFilter = function (props) { return (react_1.default.createElement(react_admin_1.Filter, __assign({}, props),
    react_1.default.createElement(react_admin_1.ReferenceInput, { alwaysOn: true, source: "artist_id", reference: "artists" },
        react_1.default.createElement(react_admin_1.SelectInput, { optionText: "name" })))); };
var SongsGrid = function (props) {
    var _a = app_location_1.useAppLocationState(), setLocation = _a[1];
    var resourceLocation = app_location_1.useResourceAppLocation();
    react_1.useEffect(function () {
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
    return (react_1.default.createElement(react_admin_1.Datagrid, __assign({}, props),
        react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
        react_1.default.createElement(react_admin_1.TextField, { source: "title" }),
        react_1.default.createElement(react_admin_1.ReferenceField, { source: "artist_id", reference: "artists" },
            react_1.default.createElement(react_admin_1.TextField, { source: "name" })),
        react_1.default.createElement(react_admin_1.ShowButton, null),
        react_1.default.createElement(react_admin_1.EditButton, null)));
};
var SongList = function (_a) {
    var breadcrumb = _a.breadcrumb, props = __rest(_a, ["breadcrumb"]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        breadcrumb,
        react_1.default.createElement(react_admin_1.List, __assign({}, props, { filters: react_1.default.createElement(SongFilter, null) }),
            react_1.default.createElement(SongsGrid, null))));
};
var ArtistList = function (_a) {
    var breadcrumb = _a.breadcrumb, props = __rest(_a, ["breadcrumb"]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        breadcrumb,
        react_1.default.createElement(react_admin_1.List, __assign({}, props),
            react_1.default.createElement(react_admin_1.Datagrid, null,
                react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
                react_1.default.createElement(react_admin_1.TextField, { source: "name" }),
                react_1.default.createElement(react_admin_1.EditButton, null)))));
};
var ArtistEdit = function (_a) {
    var breadcrumb = _a.breadcrumb, props = __rest(_a, ["breadcrumb"]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        breadcrumb,
        react_1.default.createElement(react_admin_1.Edit, __assign({}, props),
            react_1.default.createElement(react_admin_1.SimpleForm, null,
                react_1.default.createElement(react_admin_1.TextInput, { source: "name" })))));
};
var SongEdit = function (_a) {
    var breadcrumb = _a.breadcrumb, props = __rest(_a, ["breadcrumb"]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        breadcrumb,
        react_1.default.createElement(react_admin_1.Edit, __assign({}, props),
            react_1.default.createElement(react_admin_1.SimpleForm, null,
                react_1.default.createElement(react_admin_1.TextInput, { source: "title" })))));
};
var SongCreate = function (_a) {
    var breadcrumb = _a.breadcrumb, props = __rest(_a, ["breadcrumb"]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        breadcrumb,
        react_1.default.createElement(react_admin_1.Create, __assign({}, props),
            react_1.default.createElement(react_admin_1.SimpleForm, null,
                react_1.default.createElement(react_admin_1.TextInput, { source: "title" })))));
};
var SongShow = function (_a) {
    var breadcrumb = _a.breadcrumb, props = __rest(_a, ["breadcrumb"]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        breadcrumb,
        react_1.default.createElement(react_admin_1.Show, __assign({}, props),
            react_1.default.createElement(react_admin_1.SimpleShowLayout, null,
                react_1.default.createElement(react_admin_1.TextField, { source: "title" })))));
};
var SongListAside = function () { return (react_1.default.createElement(react_router_dom_1.Switch, null,
    react_1.default.createElement(react_router_dom_1.Route, { path: "/songs/create", render: function () { return react_1.default.createElement(SongCreate, { resource: "songs", basePath: "/songs" }); } }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/songs/:id/show", render: function (routeProps) { return (react_1.default.createElement(SongShow, { id: routeProps.match.params
                .id, resource: "songs", basePath: "/songs" })); } }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/songs/:id", render: function (routeProps) { return (react_1.default.createElement(SongEdit, { id: routeProps.match.params
                .id, resource: "songs", basePath: "/songs" })); } }))); };
var Dashboard = function (_a) {
    var breadcrumb = _a.breadcrumb;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        breadcrumb,
        react_1.default.createElement(core_1.Card, null,
            react_1.default.createElement(core_1.CardContent, null,
                react_1.default.createElement(core_1.Typography, { variant: "h4" }, "Here is Homepage"),
                react_1.default.createElement(core_1.Typography, null, "No breadcrumb is displayed in Home")))));
};
exports.Basic = function (props) { return (react_1.default.createElement(react_admin_1.Admin, __assign({ history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default, layout: MyLayout, dashboard: function (props) { return (react_1.default.createElement(Dashboard, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); } }, props),
    react_1.default.createElement(react_admin_1.Resource, { name: "songs", list: function (props) { return (react_1.default.createElement(SongList, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); }, edit: function (props) { return (react_1.default.createElement(SongEdit, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); }, create: function (props) { return (react_1.default.createElement(SongCreate, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); }, show: function (props) { return (react_1.default.createElement(SongShow, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); } }),
    react_1.default.createElement(react_admin_1.Resource, { name: "artists", options: { label: 'Artists' }, list: function (props) { return (react_1.default.createElement(ArtistList, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); }, edit: function (props) { return (react_1.default.createElement(ArtistEdit, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); } }))); };
exports.DarkMode = function () {
    var darkTheme = merge_1.default({}, react_admin_1.defaultTheme, {
        palette: {
            type: 'dark',
        },
    });
    return react_1.default.createElement(exports.Basic, { theme: darkTheme });
};
exports.BasicNoHome = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default, layout: MyLayout },
    react_1.default.createElement(react_admin_1.Resource, { name: "songs", list: function (props) { return (react_1.default.createElement(SongList, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, null) }, props))); }, edit: function (props) { return (react_1.default.createElement(SongEdit, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, null) }, props))); }, create: function (props) { return (react_1.default.createElement(SongCreate, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, null) }, props))); }, show: function (props) { return (react_1.default.createElement(SongShow, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, null) }, props))); } }),
    react_1.default.createElement(react_admin_1.Resource, { name: "artists", list: function (props) { return (react_1.default.createElement(ArtistList, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, null) }, props))); }, edit: function (props) { return (react_1.default.createElement(ArtistEdit, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, null) }, props))); } }))); };
exports.BasicCustomHome = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default, layout: MyLayout },
    react_1.default.createElement(react_admin_1.Resource, { name: "songs", list: function (props) { return (react_1.default.createElement(SongList, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumbCustomHome, null) }, props))); }, edit: function (props) { return (react_1.default.createElement(SongEdit, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumbCustomHome, null) }, props))); }, create: function (props) { return (react_1.default.createElement(SongCreate, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumbCustomHome, null) }, props))); }, show: function (props) { return (react_1.default.createElement(SongShow, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumbCustomHome, null) }, props))); } }),
    react_1.default.createElement(react_admin_1.Resource, { name: "artists", list: function (props) { return (react_1.default.createElement(ArtistList, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); }, edit: function (props) { return (react_1.default.createElement(ArtistEdit, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); } }))); };
exports.BasicRestricted = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default, layout: MyLayout, dashboard: function (props) { return (react_1.default.createElement(Dashboard, __assign({ breadcrumb: react_1.default.createElement(RestrictedBreadcrumb, { hasDashboard: true }) }, props))); } },
    react_1.default.createElement(react_admin_1.Resource, { name: "songs", list: function (props) { return (react_1.default.createElement(SongList, __assign({ breadcrumb: react_1.default.createElement(RestrictedBreadcrumb, { hasDashboard: true }) }, props))); }, edit: function (props) { return (react_1.default.createElement(SongEdit, __assign({ breadcrumb: react_1.default.createElement(RestrictedBreadcrumb, { hasDashboard: true }) }, props))); }, create: function (props) { return (react_1.default.createElement(SongCreate, __assign({ breadcrumb: react_1.default.createElement(RestrictedBreadcrumb, { hasDashboard: true }) }, props))); }, show: function (props) { return (react_1.default.createElement(SongShow, __assign({ breadcrumb: react_1.default.createElement(RestrictedBreadcrumb, { hasDashboard: true }) }, props))); } }),
    react_1.default.createElement(react_admin_1.Resource, { name: "artists", options: { label: 'Artists (no breadcrumb)' }, list: function (props) { return (react_1.default.createElement(ArtistList, __assign({ breadcrumb: react_1.default.createElement(RestrictedBreadcrumb, { hasDashboard: true }) }, props))); }, edit: function (props) { return (react_1.default.createElement(ArtistEdit, __assign({ breadcrumb: react_1.default.createElement(RestrictedBreadcrumb, { hasDashboard: true }) }, props))); } }))); };
exports.WithInnerDynamicViews = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default, layout: MyLayout, dashboard: function (props) { return (react_1.default.createElement(Dashboard, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); } },
    react_1.default.createElement(react_admin_1.Resource, { name: "songs", list: function (props) { return (react_1.default.createElement(SongList, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, { hasDashboard: true }), aside: react_1.default.createElement(SongListAside, null) }, props, { hasCreate: true }))); } }),
    react_1.default.createElement(react_admin_1.Resource, { name: "artists", options: { label: 'Artists' }, list: function (props) { return (react_1.default.createElement(ArtistList, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); }, edit: function (props) { return (react_1.default.createElement(ArtistEdit, __assign({ breadcrumb: react_1.default.createElement(MyBreadcrumb, { hasDashboard: true }) }, props))); } }))); };
