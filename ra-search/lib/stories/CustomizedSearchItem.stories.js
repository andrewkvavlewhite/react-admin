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
exports.CustomizedSearchResultItem = void 0;
var React = __importStar(require("react"));
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var Person_1 = __importDefault(require("@material-ui/icons/Person"));
var MusicNote_1 = __importDefault(require("@material-ui/icons/MusicNote"));
var src_1 = require("../src");
var common_1 = require("./common");
var dataProvider_1 = require("./dataProvider");
var i18nProvider_1 = __importDefault(require("./i18nProvider"));
exports.default = {
    title: 'ra-search/Search',
};
var Description = function (_a) {
    var data = _a.data;
    return (React.createElement(core_1.Typography, { component: "span", variant: "body2", color: "textSecondary" }, data.content.description));
};
var MyAppbar = function (props) {
    var classes = useStyles();
    return (React.createElement(react_admin_1.AppBar, __assign({}, props),
        React.createElement(core_1.Typography, { variant: "h6", color: "inherit", className: classes.title, id: "react-admin-title" }),
        React.createElement(src_1.Search, null,
            React.createElement(src_1.SearchResultsPanel, null,
                React.createElement(src_1.SearchResultItem, { label: function (record) { return (React.createElement(core_1.Box, { display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" },
                        record.type === 'artists' ? (React.createElement(Person_1.default, { className: classes.icon })) : (React.createElement(MusicNote_1.default, { className: classes.icon })),
                        React.createElement(core_1.Typography, { variant: "body1", color: "textPrimary" }, record.content.label))); }, description: React.createElement(Description, null) })))));
};
var useStyles = core_1.makeStyles(function (theme) { return ({
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
var MyLayout = function (props) { return (React.createElement(react_admin_1.Layout, __assign({}, props, { appBar: MyAppbar }))); };
exports.CustomizedSearchResultItem = function () { return (React.createElement(react_admin_1.Admin, { dataProvider: dataProvider_1.dataProvider, i18nProvider: i18nProvider_1.default, layout: MyLayout },
    React.createElement(react_admin_1.Resource, { name: "artists", list: common_1.ArtistList, edit: common_1.ArtistEdit }),
    React.createElement(react_admin_1.Resource, { name: "songs", edit: common_1.SongEdit }))); };
