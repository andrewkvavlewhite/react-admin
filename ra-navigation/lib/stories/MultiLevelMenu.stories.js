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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithCategoriesDarkMode = exports.WithCategories = exports.WithIconsDarkMode = exports.WithIcons = exports.OpennedOnLoad = exports.InitiallyOpen = exports.Basic = void 0;
/* eslint-disable @typescript-eslint/explicit-function-return-type */
var React = __importStar(require("react"));
var react_1 = require("react");
var react_admin_1 = require("react-admin");
var history_1 = require("history");
var Card_1 = __importDefault(require("@material-ui/core/Card"));
var CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var Dashboard_1 = __importDefault(require("@material-ui/icons/Dashboard"));
var MusicNote_1 = __importDefault(require("@material-ui/icons/MusicNote"));
var People_1 = __importDefault(require("@material-ui/icons/People"));
var Settings_1 = __importDefault(require("@material-ui/icons/Settings"));
var FlashOn_1 = __importDefault(require("@material-ui/icons/FlashOn"));
var styles_1 = require("@material-ui/core/styles");
var merge_1 = __importDefault(require("lodash/merge"));
var app_location_1 = require("../src/app-location");
var multi_level_menu_1 = require("../src/multi-level-menu");
var dataProvider_1 = __importDefault(require("./dataProvider"));
exports.default = { title: 'ra-navigation/MultiLevelMenu/Basic' };
var BasicMultiLevelMenu = function () { return (React.createElement(multi_level_menu_1.MultiLevelMenu, null,
    React.createElement(multi_level_menu_1.MenuItem, { name: "dashboard", to: "/", exact: true, label: "Dashboard" }),
    React.createElement(multi_level_menu_1.MenuItem, { name: "songs", to: "/songs", label: "Songs" }),
    React.createElement(multi_level_menu_1.MenuItem, { name: "artists", to: '/artists?filter={}', label: "Artists" },
        React.createElement(multi_level_menu_1.MenuItem, { name: "artists.rock", to: '/artists?filter={"type":"Rock"}', label: "Rock" },
            React.createElement(multi_level_menu_1.MenuItem, { name: "artists.rock.pop", to: '/artists?filter={"type":"Pop Rock"}', label: "Pop Rock" }),
            React.createElement(multi_level_menu_1.MenuItem, { name: "artists.rock.folk", to: '/artists?filter={"type":"Folk Rock"}', label: "Folk Rock" })),
        React.createElement(multi_level_menu_1.MenuItem, { name: "artists.jazz", to: '/artists?filter={"type":"Jazz"}', label: "Jazz" },
            React.createElement(multi_level_menu_1.MenuItem, { name: "artists.jazz.rb", to: '/artists?filter={"type":"RB"}', label: "R&B" }))))); };
var BasicLayout = function (props) {
    return (React.createElement(app_location_1.AppLocationContext, null,
        React.createElement(react_admin_1.Layout, __assign({}, props, { menu: BasicMultiLevelMenu }))));
};
var Dashboard = function () {
    app_location_1.useDefineAppLocation('dashboard');
    return (React.createElement(Card_1.default, null,
        React.createElement("h1", null, "Dashboard")));
};
var SongList = function (props) { return (React.createElement(react_admin_1.List, __assign({}, props),
    React.createElement(react_admin_1.Datagrid, null,
        React.createElement(react_admin_1.TextField, { source: "id" }),
        React.createElement(react_admin_1.TextField, { source: "title" })))); };
var ArtistList = function (props) { return (React.createElement(react_admin_1.List, __assign({}, props),
    React.createElement(ArtistsDatagrid, null))); };
var types = {
    Rock: 'artists.rock',
    'Folk Rock': 'artists.rock.folk',
    'Pop Rock': 'artists.rock.pop',
    Jazz: 'artists.jazz',
    RB: 'artists.jazz.rb',
};
var ArtistsDatagrid = function (props) {
    var _a = app_location_1.useAppLocationState(), setLocation = _a[1];
    var resourceLocation = app_location_1.useResourceAppLocation();
    react_1.useEffect(function () {
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
    return (React.createElement(react_admin_1.Datagrid, __assign({}, props),
        React.createElement(react_admin_1.TextField, { source: "id" }),
        React.createElement(react_admin_1.TextField, { source: "name" })));
};
exports.Basic = function () { return (React.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default, layout: BasicLayout, dashboard: Dashboard },
    React.createElement(react_admin_1.Resource, { name: "songs", list: SongList }),
    React.createElement(react_admin_1.Resource, { name: "artists", list: ArtistList }))); };
var InitiallyOpenMultiLevelMenu = function () { return (React.createElement(multi_level_menu_1.MultiLevelMenu, { initialOpen: true },
    React.createElement(multi_level_menu_1.MenuItem, { name: "dashboard", to: "/", exact: true, label: "Dashboard" }),
    React.createElement(multi_level_menu_1.MenuItem, { name: "songs", to: "/songs", label: "Songs" }),
    React.createElement(multi_level_menu_1.MenuItem, { name: "artists", to: '/artists?filter={}', label: "Artists" },
        React.createElement(multi_level_menu_1.MenuItem, { name: "artists.rock", to: '/artists?filter={"type":"Rock"}', label: "Rock" },
            React.createElement(multi_level_menu_1.MenuItem, { name: "artists.rock.pop", to: '/artists?filter={"type":"Pop Rock"}', label: "Pop Rock" }),
            React.createElement(multi_level_menu_1.MenuItem, { name: "artists.rock.folk", to: '/artists?filter={"type":"Folk Rock"}', label: "Folk Rock" })),
        React.createElement(multi_level_menu_1.MenuItem, { name: "artists.jazz", to: '/artists?filter={"type":"Jazz"}', label: "Jazz" },
            React.createElement(multi_level_menu_1.MenuItem, { name: "artists.jazz.rb", to: '/artists?filter={"type":"RB"}', label: "R&B" }))))); };
var InitiallyOpenLayout = function (props) {
    return (React.createElement(app_location_1.AppLocationContext, null,
        React.createElement(react_admin_1.Layout, __assign({}, props, { menu: InitiallyOpenMultiLevelMenu }))));
};
exports.InitiallyOpen = function () { return (React.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default, layout: InitiallyOpenLayout, dashboard: Dashboard },
    React.createElement(react_admin_1.Resource, { name: "songs", list: SongList }),
    React.createElement(react_admin_1.Resource, { name: "artists", list: ArtistList }))); };
exports.OpennedOnLoad = function () {
    var history = history_1.createMemoryHistory({
        initialEntries: ['/artists?filter={"type":"Folk Rock"}'],
    });
    return (React.createElement(react_admin_1.Admin, { dataProvider: dataProvider_1.default, layout: BasicLayout, dashboard: Dashboard, history: history },
        React.createElement(react_admin_1.Resource, { name: "songs", list: SongList }),
        React.createElement(react_admin_1.Resource, { name: "artists", list: ArtistList })));
};
var MultiLevelMenuWithIcons = function () { return (React.createElement(multi_level_menu_1.MultiLevelMenu, null,
    React.createElement(multi_level_menu_1.MenuItem, { name: "dashboard", to: "/", exact: true, label: "Dashboard", icon: React.createElement(Dashboard_1.default, null) }),
    React.createElement(multi_level_menu_1.MenuItem, { name: "songs", to: "/songs", label: "Songs", icon: React.createElement(MusicNote_1.default, null) }),
    React.createElement(multi_level_menu_1.MenuItem, { name: "artists", to: '/artists?filter={}', label: "Artists", icon: React.createElement(People_1.default, null) },
        React.createElement(multi_level_menu_1.MenuItem, { name: "artists.rock", to: '/artists?filter={"type":"Rock"}', label: "Rock" },
            React.createElement(multi_level_menu_1.MenuItem, { name: "artists.rock.pop", to: '/artists?filter={"type":"Pop Rock"}', label: "Pop Rock" }),
            React.createElement(multi_level_menu_1.MenuItem, { name: "artists.rock.folk", to: '/artists?filter={"type":"Folk Rock"}', label: "Folk Rock" })),
        React.createElement(multi_level_menu_1.MenuItem, { name: "artists.jazz", to: '/artists?filter={"type":"Jazz"}', label: "Jazz" },
            React.createElement(multi_level_menu_1.MenuItem, { name: "artists.jazz.rb", to: '/artists?filter={"type":"RB"}', label: "R&B" }))))); };
var LayoutWithIcons = function (props) {
    return (React.createElement(app_location_1.AppLocationContext, null,
        React.createElement(react_admin_1.Layout, __assign({}, props, { menu: MultiLevelMenuWithIcons }))));
};
exports.WithIcons = function () { return (React.createElement(react_admin_1.Admin, { dataProvider: dataProvider_1.default, layout: LayoutWithIcons, dashboard: Dashboard, history: history_1.createMemoryHistory() },
    React.createElement(react_admin_1.Resource, { name: "songs", list: SongList }),
    React.createElement(react_admin_1.Resource, { name: "artists", list: ArtistList }))); };
exports.WithIconsDarkMode = function () {
    var darkTheme = merge_1.default({}, multi_level_menu_1.theme, {
        palette: {
            type: 'dark',
        },
    });
    return (React.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default, layout: LayoutWithIcons, dashboard: Dashboard, theme: darkTheme },
        React.createElement(react_admin_1.Resource, { name: "songs", list: SongList }),
        React.createElement(react_admin_1.Resource, { name: "artists", list: ArtistList })));
};
var useStyles = styles_1.makeStyles({
    configuration: {
        marginTop: 'auto',
    },
});
var MultiLevelMenuWithCategories = function () {
    var classes = useStyles();
    return (React.createElement(multi_level_menu_1.MultiLevelMenu, { variant: "categories" },
        React.createElement(multi_level_menu_1.MenuItemCategory, { name: "dashboard", to: "/", exact: true, label: "Dashboard", icon: React.createElement(Dashboard_1.default, null) }),
        React.createElement(multi_level_menu_1.MenuItemCategory, { name: "songs", icon: React.createElement(MusicNote_1.default, null), to: "/songs", label: "Songs" }),
        React.createElement(multi_level_menu_1.MenuItemCategory, { name: "artists", label: "Artists", icon: React.createElement(People_1.default, null) },
            React.createElement(CardContent_1.default, null,
                React.createElement(Typography_1.default, { variant: "h4", gutterBottom: true }, "All artists"),
                React.createElement(multi_level_menu_1.Menu, null,
                    React.createElement(multi_level_menu_1.MenuItem, { name: "artists", to: '/artists?filter={}', label: "All Artists" }),
                    React.createElement(multi_level_menu_1.MenuItem, { name: "artists.rock", to: '/artists?filter={"type":"Rock"}', label: "Rock" },
                        React.createElement(multi_level_menu_1.MenuItem, { name: "artists.rock.pop", to: '/artists?filter={"type":"Pop Rock"}', label: "Pop Rock" }),
                        React.createElement(multi_level_menu_1.MenuItem, { name: "artists.rock.folk", to: '/artists?filter={"type":"Folk Rock"}', label: "Folk Rock" })),
                    React.createElement(multi_level_menu_1.MenuItem, { name: "artists.jazz", to: '/artists?filter={"type":"Jazz"}', label: "Jazz" },
                        React.createElement(multi_level_menu_1.MenuItem, { name: "artists.jazz.rb", to: '/artists?filter={"type":"RB"}', label: "R&B" }))))),
        React.createElement(multi_level_menu_1.MenuItemCategory, { name: "rock_artists", label: "Rock Artists", icon: React.createElement(FlashOn_1.default, null) },
            React.createElement(CardContent_1.default, null,
                React.createElement(Typography_1.default, { variant: "h4", gutterBottom: true }, "Rock artists"),
                React.createElement(multi_level_menu_1.Menu, null,
                    React.createElement(multi_level_menu_1.MenuItem, { name: "rock_artists.pop", to: '/artists?filter={"type":"Pop Rock"}', label: "Pop Rock" }),
                    React.createElement(multi_level_menu_1.MenuItem, { name: "rock_artists.folk", to: '/artists?filter={"type":"Folk Rock"}', label: "Folk Rock" })))),
        React.createElement(multi_level_menu_1.MenuItemCategory, { className: classes.configuration, name: "configuration", to: "/", exact: true, label: "Configuration", icon: React.createElement(Settings_1.default, null) })));
};
var LayoutWithCategories = function (props) {
    return (React.createElement(app_location_1.AppLocationContext, null,
        React.createElement(react_admin_1.Layout, __assign({}, props, { menu: MultiLevelMenuWithCategories }))));
};
exports.WithCategories = function () { return (React.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default, layout: LayoutWithCategories, dashboard: Dashboard, theme: multi_level_menu_1.theme },
    React.createElement(react_admin_1.Resource, { name: "songs", list: SongList }),
    React.createElement(react_admin_1.Resource, { name: "artists", list: ArtistList }))); };
exports.WithCategoriesDarkMode = function () {
    var darkTheme = merge_1.default({}, multi_level_menu_1.theme, {
        palette: {
            type: 'dark',
        },
    });
    return (React.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default, layout: LayoutWithCategories, dashboard: Dashboard, theme: darkTheme },
        React.createElement(react_admin_1.Resource, { name: "songs", list: SongList }),
        React.createElement(react_admin_1.Resource, { name: "artists", list: ArtistList })));
};
