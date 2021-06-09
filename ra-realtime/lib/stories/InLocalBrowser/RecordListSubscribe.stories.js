"use strict";
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
exports.RecordSubscribe = void 0;
var react_1 = __importStar(require("react"));
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var history_1 = require("history");
var i18nProvider_1 = __importDefault(require("../i18nProvider"));
var realTimeDataProvider_1 = require("../realTimeDataProvider");
var src_1 = require("../../src");
var __1 = require("..");
exports.default = {
    title: 'ra-realtime/InLocalBrowser',
};
var MyDashBoard = function () {
    var _a = react_1.useState(0), postsAdded = _a[0], setPostsAdded = _a[1];
    var _b = react_1.useState(0), postsDeleted = _b[0], setPostsDeleted = _b[1];
    src_1.useSubscribeToRecordList('posts', function (event) {
        if (event.type === src_1.EventType.Created) {
            setPostsAdded(function (previous) { return previous + event.payload.ids.length; });
        }
        else if (event.type === src_1.EventType.Deleted) {
            setPostsDeleted(function (previous) { return previous + event.payload.ids.length; });
        }
    });
    return (react_1.default.createElement(core_1.Box, { maxWidth: 450 },
        react_1.default.createElement(core_1.Card, null,
            react_1.default.createElement(react_admin_1.Title, { title: "Overview of users activity" }),
            react_1.default.createElement(core_1.CardContent, null,
                react_1.default.createElement(core_1.Typography, { gutterBottom: true, variant: "h5", component: "h2" }, "Other users are working now"),
                react_1.default.createElement(core_1.Typography, null,
                    postsAdded,
                    " news Posts"),
                react_1.default.createElement(core_1.Typography, null,
                    postsDeleted,
                    " deleted Posts")),
            react_1.default.createElement(core_1.CardActions, null,
                react_1.default.createElement(__1.ListActions, null)))));
};
exports.RecordSubscribe = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: realTimeDataProvider_1.localBrowserDataProvider, dashboard: MyDashBoard, i18nProvider: i18nProvider_1.default },
    react_1.default.createElement(react_admin_1.Resource, { name: "posts" }))); };
