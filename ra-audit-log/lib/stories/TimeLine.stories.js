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
exports.CustomItemComponent = exports.CustomGroupComponent = exports.CustomGrouping = exports.Loaded = exports.NotLoadedYet = void 0;
var React = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var react_admin_1 = require("react-admin");
var ra_i18n_polyglot_1 = __importDefault(require("ra-i18n-polyglot"));
var ra_language_english_1 = __importDefault(require("ra-language-english"));
var react_router_1 = require("react-router");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var src_1 = require("../src");
exports.default = { title: 'ra-audit-log/Timeline' };
exports.NotLoadedYet = function () { return (React.createElement(React.Fragment, null,
    React.createElement(core_1.Box, { bgcolor: "background.default", padding: 2 },
        React.createElement(core_1.Container, { maxWidth: "sm" },
            React.createElement(src_1.Timeline, null))))); };
var records = [
    {
        id: 1,
        resource: 'products',
        action: 'create',
        date: new Date(2020, 0, 14, 13, 14, 0),
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
        date: new Date(2020, 0, 14, 9, 20, 0),
        payload: { data: { id: 456, reference: '#123456' } },
        author: {
            id: 456,
            fullName: 'Takeshi Kovacs',
            avatar: 'https://cdn.images.express.co.uk/img/dynamic/20/285x395/922644_1.jpg',
        },
    },
    {
        id: 3,
        resource: 'products',
        action: 'update',
        date: new Date(2020, 0, 6, 18, 48, 0),
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
        date: new Date(2020, 0, 6, 20, 34, 0),
        payload: {
            ids: [234, 345, 567],
        },
        author: {
            id: 890,
            fullName: 'Henry Dorsett Case',
        },
    },
];
var i18nProvider = ra_i18n_polyglot_1.default(function () {
    return react_admin_1.mergeTranslations(ra_language_english_1.default, src_1.raAuditLogLanguageEnglish);
});
var initialState = {
    admin: {
        resources: {
            products: {
                props: {
                    name: 'products',
                },
            },
            orders: {
                props: {
                    name: 'orders',
                },
            },
            reviews: {
                props: {
                    name: 'reviews',
                },
            },
        },
    },
};
var fakeReducer = function (state) {
    if (state === void 0) { state = initialState; }
    return state;
};
var store = redux_1.createStore(fakeReducer);
exports.Loaded = function () { return (React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(react_router_1.MemoryRouter, null,
        React.createElement(core_1.Box, { bgcolor: "background.default", padding: 2 },
            React.createElement(core_1.Container, { maxWidth: "sm" },
                React.createElement(react_admin_1.TranslationProvider, { locale: "en", i18nProvider: i18nProvider },
                    React.createElement(src_1.Timeline, { loaded: true, records: records }))))))); };
var sortByDate = function (a, b) {
    return new Date(b.date).valueOf() - new Date(a.date).valueOf();
};
var getMonthForAuditLog = function (record) {
    var date = new Date(record.date);
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    date.setDate(1);
    return date.toISOString();
};
var getMonthString = function (date, locale) {
    return new Date(date).toLocaleDateString(locale, {
        month: 'long',
        year: 'numeric',
    });
};
var groupByMonth = function (records, locale) {
    var initialMap = {};
    var map = records.reduce(function (acc, record) {
        var label = getMonthString(getMonthForAuditLog(record), locale);
        acc[label] = acc[label] || [];
        acc[label] = acc[label].concat(record);
        return acc;
    }, initialMap);
    return Object.keys(map).reduce(function (acc, label) {
        acc.push({ label: label, records: map[label].sort(sortByDate) });
        return acc;
    }, []);
};
exports.CustomGrouping = function () { return (React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(react_router_1.MemoryRouter, null,
        React.createElement(core_1.Box, { bgcolor: "background.default", padding: 2 },
            React.createElement(core_1.Container, { maxWidth: "sm" },
                React.createElement(react_admin_1.TranslationProvider, { locale: "en", i18nProvider: i18nProvider },
                    React.createElement(src_1.Timeline, { loaded: true, records: records, groupLogs: groupByMonth }))))))); };
var useMyTimelineGroupStyles = styles_1.makeStyles(function (theme) { return ({
    label: {
        color: theme.palette.primary.main,
        fontWeight: 'bold',
    },
    events: {
        borderRadius: 0,
        boxShadow: 'none',
    },
}); });
var MyTimelineGroup = function () {
    var classes = useMyTimelineGroupStyles();
    return React.createElement(src_1.TimelineGroup, { classes: classes });
};
exports.CustomGroupComponent = function () { return (React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(react_router_1.MemoryRouter, null,
        React.createElement(core_1.Box, { bgcolor: "background.default", padding: 2 },
            React.createElement(core_1.Container, { maxWidth: "sm" },
                React.createElement(react_admin_1.TranslationProvider, { locale: "en", i18nProvider: i18nProvider },
                    React.createElement(src_1.Timeline, { loaded: true, records: records },
                        React.createElement(MyTimelineGroup, null)))))))); };
var MyTimelineItem = function (props) {
    var record = react_admin_1.useRecordContext(props.record);
    var eventLabel = src_1.useEventLabel({ record: record });
    return (React.createElement(core_1.ListItem, null,
        React.createElement(core_1.ListItemText, { primary: record.author.fullName, secondary: eventLabel })));
};
var MyTimelineGroupForCustomItem = function () {
    return (React.createElement(src_1.TimelineGroup, null,
        React.createElement(MyTimelineItem, null)));
};
exports.CustomItemComponent = function () { return (React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(react_router_1.MemoryRouter, null,
        React.createElement(core_1.Box, { bgcolor: "background.default", padding: 2 },
            React.createElement(core_1.Container, { maxWidth: "sm" },
                React.createElement(react_admin_1.TranslationProvider, { locale: "en", i18nProvider: i18nProvider },
                    React.createElement(src_1.Timeline, { loaded: true, records: records },
                        React.createElement(MyTimelineGroupForCustomItem, null)))))))); };
