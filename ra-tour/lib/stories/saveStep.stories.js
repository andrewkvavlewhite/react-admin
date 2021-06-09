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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TourWithSavedStep = void 0;
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var ContactSupport_1 = __importDefault(require("@material-ui/icons/ContactSupport"));
var ra_preferences_1 = require("@react-admin/ra-preferences");
var history_1 = require("history");
var dataProvider_1 = __importDefault(require("./dataProvider"));
var src_1 = require("../src");
exports.default = {
    title: 'ra-tour/saveStep',
};
var ListActions = function (props) {
    var _a = src_1.useTour(), running = _a[0].running, start = _a[1].start;
    return (react_1.default.createElement(react_admin_1.TopToolbar, __assign({}, react_admin_1.sanitizeListRestProps(props)),
        react_1.default.createElement(react_admin_1.Button, { onClick: function () { return start('first-tour'); }, label: "Please help !!11", disabled: running },
            react_1.default.createElement(ContactSupport_1.default, null))));
};
var SongList = function (props) { return (react_1.default.createElement(react_admin_1.List, __assign({}, props, { actions: react_1.default.createElement(ListActions, null) }),
    react_1.default.createElement(react_admin_1.SimpleList, { "data-tour-id": "song-list-line", primaryText: function (record) { return record.title; } }))); };
var SongEdit = function (props) { return (react_1.default.createElement(react_admin_1.Edit, __assign({}, props),
    react_1.default.createElement(react_admin_1.SimpleForm, null,
        react_1.default.createElement(react_admin_1.TextInput, { source: "artist" }),
        react_1.default.createElement(react_admin_1.TextInput, { source: "title" }),
        react_1.default.createElement(react_admin_1.TextInput, { source: "writer" }),
        react_1.default.createElement(react_admin_1.TextInput, { source: "producer" }),
        react_1.default.createElement(react_admin_1.DateInput, { label: "Release date", source: "released" }),
        react_1.default.createElement(react_admin_1.TextInput, { source: "recordCompany" })))); };
var timeout = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
var tours = {
    'first-tour': {
        steps: [
            {
                target: "[data-tour-id='song-list-line'] a:nth-child(1)",
                event: 'hover',
                disableBeacon: true,
                content: 'This is a song',
                after: function (_a) {
                    var target = _a.target, notify = _a.notify;
                    return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    target.click();
                                    return [4 /*yield*/, timeout(3000)];
                                case 1:
                                    _b.sent();
                                    notify('It should have automatically clicked on the song line');
                                    return [2 /*return*/];
                            }
                        });
                    });
                },
            },
            {
                before: function (_a) {
                    var setTourPreferences = _a.setTourPreferences, state = _a.state;
                    setTourPreferences(state);
                },
                target: 'body',
                content: (react_1.default.createElement("div", null,
                    "This step should be saved, you can",
                    ' ',
                    react_1.default.createElement("button", { onClick: function () {
                            window.location.reload();
                        } }, "reload"),
                    "the page, and it should still appear.",
                    react_1.default.createElement("br", null),
                    "By the way, this step is a react component.")),
                after: function (_a) {
                    var redirect = _a.redirect, setTourPreferences = _a.setTourPreferences;
                    redirect('/songs');
                    setTourPreferences({});
                },
            },
            {
                before: function (_a) {
                    var notify = _a.notify;
                    notify('Did it work?');
                },
                target: 'body',
                content: 'Here we are',
            },
        ],
    },
};
var MyLayout = function (props) {
    var notify = react_admin_1.useNotify();
    var redirect = react_admin_1.useRedirect();
    var _a = ra_preferences_1.usePreferences('tour', null), tourPreferences = _a[0], setTourPreferences = _a[1];
    return (react_1.default.createElement(src_1.TourProvider, { tours: tours, tools: { notify: notify, redirect: redirect, setTourPreferences: setTourPreferences }, initialState: tourPreferences },
        react_1.default.createElement(react_admin_1.Layout, __assign({}, props))));
};
exports.TourWithSavedStep = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: dataProvider_1.default, layout: MyLayout },
    react_1.default.createElement(react_admin_1.Resource, { name: "songs", list: SongList, edit: SongEdit }))); };
