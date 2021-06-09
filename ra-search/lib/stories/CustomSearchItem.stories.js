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
exports.CustomSearchItem = void 0;
var React = __importStar(require("react"));
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var react_router_dom_1 = require("react-router-dom");
var src_1 = require("../src");
var dataProvider_1 = require("./dataProvider");
var common_1 = require("./common");
var i18nProvider_1 = __importDefault(require("./i18nProvider"));
exports.default = {
    title: 'ra-search/Search',
};
var MySearchResultItem = function (_a) {
    var data = _a.data, onClose = _a.onClose;
    var classes = useSearchResultItemStyles();
    return (React.createElement("li", { key: data.id, className: classes.root },
        React.createElement(core_1.Typography, { className: classes.label, component: react_router_dom_1.Link, to: data.url, onClick: onClose }, data.content.label),
        React.createElement(core_1.Typography, { component: "p" }, data.content.description)));
};
var useSearchResultItemStyles = core_1.makeStyles(function (theme) { return ({
    root: {
        padding: theme.spacing(1, 2),
    },
    label: {
        fontWeight: theme.typography.fontWeightBold,
    },
}); });
var MySearch = function () { return (React.createElement(src_1.Search, null,
    React.createElement(src_1.SearchResultsPanel, null,
        React.createElement(MySearchResultItem, null)))); };
var MyAppbar = function (props) {
    var classes = useStyles();
    return (React.createElement(react_admin_1.AppBar, __assign({}, props),
        React.createElement(core_1.Typography, { variant: "h6", color: "inherit", className: classes.title, id: "react-admin-title" }),
        React.createElement(MySearch, null)));
};
var useStyles = core_1.makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
});
var MyLayout = function (props) { return (React.createElement(react_admin_1.Layout, __assign({}, props, { appBar: MyAppbar }))); };
exports.CustomSearchItem = function () { return (React.createElement(react_admin_1.Admin, { dataProvider: dataProvider_1.dataProvider, i18nProvider: i18nProvider_1.default, layout: MyLayout },
    React.createElement(react_admin_1.Resource, { name: "artists", list: common_1.ArtistList, edit: common_1.ArtistEdit }),
    React.createElement(react_admin_1.Resource, { name: "songs", edit: common_1.SongEdit }))); };
