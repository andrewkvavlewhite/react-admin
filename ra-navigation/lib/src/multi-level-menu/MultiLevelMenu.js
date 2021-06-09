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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiLevelMenu = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var styles_1 = require("@material-ui/core/styles");
var MultiLevelMenuContext_1 = require("./MultiLevelMenuContext");
var Menu_1 = require("./Menu");
/**
 * The <MultiLevelMenu> component allows to have complex menus with collapsible
 * sub menus inside our application.
 * The app must be inside a AppLocationContext.
 *
 * @see AppLocationContext
 *
 * It accepts <MenuItem> components as children which accepts <MenuItems> children as well.
 *
 * @example <caption>Simple Menu</caption>
 * import * as React from 'react';
 * import { Admin, Resource, Layout } from 'react-admin';
 * import { MultiLevelMenu, MenuItem } from '@react-admin/ra-navigation';
 * import { Dashboard } from './Dashboard';
 * import { SongList } from './SongList';
 * import { ArtistList } from './ArtistList';
 *
 * const BasicMultiLevelMenu = () => (
 *     <MultiLevelMenu>
 *         <MenuItem name="dashboard" to="/" exact label="Dashboard" />
 *         <MenuItem name="songs" to="/songs" label="Songs" />
 *         <MenuItem name="artists" to={'/artists?filter={}'} label="Artists">
 *             <MenuItem name="artists.rock" to={'/artists?filter={"type":"Rock"}'} label="Rock" />
 *             <MenuItem name="artists.jazz" to={'/artists?filter={"type":"Jazz"}'} label="Jazz" />
 *         </MenuItem>
 *     </MultiLevelMenu>
 * );
 *
 * const BasicLayout = props => (
 *     <AppLocationContext>
 *         <Layout {...props} menu={BasicMultiLevelMenu} />
 *     </AppLocationContext>
 * );
 *
 * export const App = () => (
 *     <Admin
 *         dataProvider={dataProvider}
 *         layout={BasicLayout}
 *         dashboard={Dashboard}
 *     >
 *         <Resource name="songs" list={SongList} />
 *         <Resource name="artists" list={ArtistList} />
 *     </Admin>
 * );
 */
exports.MultiLevelMenu = function (props) {
    var children = props.children, _a = props.initialOpen, initialOpen = _a === void 0 ? false : _a, _b = props.variant, variant = _b === void 0 ? 'default' : _b, rest = __rest(props, ["children", "initialOpen", "variant"]);
    var classes = useStyles(props);
    var openedItems = react_1.useRef([]);
    var _c = react_1.useState(true), isFirstLoad = _c[0], setIsFirstLoad = _c[1];
    var rootRef = react_1.useRef();
    var openingListeners = react_1.useRef([]);
    var onOpen = function (callback) {
        openingListeners.current.push(callback);
    };
    var offOpen = function (callback) {
        openingListeners.current = openingListeners.current.filter(function (l) { return l !== callback; });
    };
    var isOpen = react_1.useCallback(function (name) { return Array.from(openedItems.current).includes(name); }, []);
    var close = react_1.useCallback(function (name) {
        openedItems.current = openedItems.current.filter(function (item) { return item !== name; });
    }, []);
    var open = react_1.useCallback(function (name) {
        var set = new Set(openedItems.current);
        set.add(name);
        openedItems.current = Array.from(set);
        openingListeners.current.forEach(function (callback) { return callback(name); });
    }, []);
    var setIsOpen = react_1.useCallback(function (name, isOpen) {
        if (isOpen) {
            return open(name);
        }
        close(name);
    }, [open, close]);
    var toggle = react_1.useCallback(function (name) {
        setIsOpen(name, !isOpen);
    }, [setIsOpen, isOpen]);
    var _d = react_1.useState(false), hasCategories = _d[0], setHasCategories = _d[1];
    var context = {
        close: close,
        hasCategories: hasCategories,
        initialOpen: initialOpen,
        isFirstLoad: isFirstLoad,
        isOpen: isOpen,
        offOpen: offOpen,
        onOpen: onOpen,
        open: open,
        rootRef: rootRef,
        setHasCategories: setHasCategories,
        setIsOpen: setIsOpen,
        toggle: toggle,
    };
    react_1.useEffect(function () {
        setTimeout(function () { return setIsFirstLoad(false); }, 150);
    }, []);
    return (React.createElement("div", __assign({ ref: rootRef, className: classes.root }, rest),
        React.createElement(MultiLevelMenuContext_1.MultiLevelMenuContext.Provider, { value: context },
            React.createElement("nav", { className: variant === 'categories'
                    ? classes.navWithCategories
                    : classes.nav },
                React.createElement(Menu_1.Menu, { className: classes.list }, children)))));
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        zIndex: theme.zIndex.appBar - 1,
    },
    navWithCategories: {
        backgroundColor: theme.palette.grey[800],
        display: 'flex',
        height: '100%',
        zIndex: theme.zIndex.appBar - 1,
    },
    nav: {
        display: 'flex',
        flexDirection: 'column',
    },
    list: {},
}); }, {
    name: 'RaMultiLevelMenu',
});
