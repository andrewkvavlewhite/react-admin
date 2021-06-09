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
exports.WithAuthorsAsResource = exports.Basic = void 0;
var React = __importStar(require("react"));
var react_admin_1 = require("react-admin");
var history_1 = require("history");
var ra_data_fakerest_1 = __importDefault(require("ra-data-fakerest"));
var ra_i18n_polyglot_1 = __importDefault(require("ra-i18n-polyglot"));
var ra_language_english_1 = __importDefault(require("ra-language-english"));
var sub_1 = __importDefault(require("date-fns/sub"));
var src_1 = require("../src");
exports.default = { title: 'ra-audit-log/EventList' };
var i18nProvider = ra_i18n_polyglot_1.default(function () {
    return react_admin_1.mergeTranslations(ra_language_english_1.default, src_1.raAuditLogLanguageEnglish);
});
var today = new Date();
var dataProvider = ra_data_fakerest_1.default({
    events: [
        {
            id: 1,
            resource: 'products',
            action: 'create',
            date: sub_1.default(today, { seconds: 30 }).toISOString(),
            payload: { data: { id: 123, name: 'SkyLine Poster' } },
            author: {
                id: 123,
                fullName: 'Thomas A. Anderson',
                avatar: 'https://upload.wikimedia.org/wikipedia/en/c/c6/NeoTheMatrix.jpg',
            },
        },
        {
            id: 2,
            resource: 'orders',
            action: 'create',
            date: sub_1.default(today, { days: 1 }).toISOString(),
            payload: { data: { id: 456, reference: '#123456' } },
            author: {
                id: 789,
                fullName: 'Takeshi Kovacs',
                avatar: 'https://cdn.images.express.co.uk/img/dynamic/20/285x395/922644_1.jpg',
            },
        },
        {
            id: 3,
            resource: 'products',
            action: 'update',
            date: sub_1.default(today, { weeks: 1 }).toISOString(),
            payload: {
                id: 789,
                data: { id: 789, name: 'NewYork SkyLine Poster' },
                previousData: { id: 789, name: 'SkyLine Poster' },
            },
            author: {
                id: 789,
                fullName: 'Takeshi Kovacs',
                avatar: 'https://cdn.images.express.co.uk/img/dynamic/20/285x395/922644_1.jpg',
            },
        },
        {
            id: 4,
            resource: 'reviews',
            action: 'updateMany',
            date: sub_1.default(today, { months: 2 }).toISOString(),
            payload: {
                ids: [234, 345, 567],
            },
            author: {
                id: 890,
                fullName: 'Henry Dorsett Case',
            },
        },
    ],
    users: [
        {
            id: 123,
            fullName: 'Thomas A. Anderson',
            avatar: 'https://upload.wikimedia.org/wikipedia/en/c/c6/NeoTheMatrix.jpg',
        },
        {
            id: 789,
            fullName: 'Takeshi Kovacs',
            avatar: 'https://cdn.images.express.co.uk/img/dynamic/20/285x395/922644_1.jpg',
        },
        {
            id: 890,
            fullName: 'Henry Dorsett Case',
        },
    ],
}, true);
var history = history_1.createMemoryHistory();
exports.Basic = function () { return (React.createElement(react_admin_1.Admin, { dataProvider: dataProvider, i18nProvider: i18nProvider, history: history },
    React.createElement(react_admin_1.Resource, { name: "events", list: src_1.EventList }),
    React.createElement(react_admin_1.Resource, { name: "products" }),
    React.createElement(react_admin_1.Resource, { name: "orders" }),
    React.createElement(react_admin_1.Resource, { name: "reviews" }))); };
var EventListWithAuthorsResource = function (props) { return (React.createElement(src_1.EventList, __assign({}, props, { authorResource: "users" }))); };
exports.WithAuthorsAsResource = function () { return (React.createElement(react_admin_1.Admin, { dataProvider: dataProvider, i18nProvider: i18nProvider, history: history },
    React.createElement(react_admin_1.Resource, { name: "events", list: EventListWithAuthorsResource }),
    React.createElement(react_admin_1.Resource, { name: "users" }),
    React.createElement(react_admin_1.Resource, { name: "products" }),
    React.createElement(react_admin_1.Resource, { name: "orders" }),
    React.createElement(react_admin_1.Resource, { name: "reviews" }))); };
