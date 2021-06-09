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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicTour = void 0;
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var ContactSupport_1 = __importDefault(require("@material-ui/icons/ContactSupport"));
var history_1 = require("history");
var dataProvider_1 = __importDefault(require("./dataProvider"));
var src_1 = require("../src");
exports.default = {
    title: 'ra-tour/basic',
};
var ListActions = function (props) {
    var _a = src_1.useTour(), running = _a[0].running, start = _a[1].start;
    return (react_1.default.createElement(react_admin_1.TopToolbar, __assign({}, react_admin_1.sanitizeListRestProps(props)),
        react_1.default.createElement(react_admin_1.Button, { onClick: function () { return start('first-tour'); }, label: "Please help !!11", disabled: running },
            react_1.default.createElement(ContactSupport_1.default, null))));
};
var SongList = function (props) { return (react_1.default.createElement(react_admin_1.List, __assign({}, props, { actions: react_1.default.createElement(ListActions, null) }),
    react_1.default.createElement(react_admin_1.SimpleList, { "data-tour-id": "song-list-line", primaryText: function (record) { return record.title; } }))); };
var tours = {
    'first-tour': {
        steps: [
            {
                target: "[data-tour-id='song-list-line'] a:nth-child(1)",
                event: 'hover',
                disableBeacon: true,
                content: 'This is a song',
            },
            {
                target: "[data-tour-id='song-list-line'] a:nth-child(7)",
                disableBeacon: true,
                content: 'This is another song, it should  be lower on the page',
            },
        ],
    },
};
var MyLayout = function (props) { return (react_1.default.createElement(src_1.TourProvider, { tours: tours },
    react_1.default.createElement(react_admin_1.Layout, __assign({}, props)))); };
exports.BasicTour = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default, layout: MyLayout },
    react_1.default.createElement(react_admin_1.Resource, { name: "songs", list: SongList }))); };
