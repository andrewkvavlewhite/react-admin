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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSearchMethods = void 0;
var React = __importStar(require("react"));
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var src_1 = require("../src");
var dataProvider_1 = require("./dataProvider");
var common_1 = require("./common");
exports.default = {
    title: 'ra-search/addSearchMethods',
};
var MyAppbar = function (props) {
    var classes = useStyles();
    return (React.createElement(react_admin_1.AppBar, __assign({}, props),
        React.createElement(core_1.Typography, { variant: "h6", color: "inherit", className: classes.title, id: "react-admin-title" }),
        React.createElement(src_1.Search, null)));
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
var dataProviderWithAutoSearch = src_1.addSearchMethod(dataProvider_1.dataProvider, {
    artists: {},
    songs: {
        description: function (record) {
            return "Released in " + new Date(record.released).getFullYear() + " by " + record.recordCompany;
        },
    },
});
exports.addSearchMethods = function () { return (React.createElement(react_admin_1.Admin, { dataProvider: dataProviderWithAutoSearch, layout: MyLayout },
    React.createElement(react_admin_1.Resource, { name: "artists", list: common_1.ArtistList, edit: common_1.ArtistEdit }),
    React.createElement(react_admin_1.Resource, { name: "songs", list: common_1.SongList, edit: common_1.SongEdit }))); };
