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
exports.LoadedWithData = void 0;
var react_1 = __importDefault(require("react"));
var react_admin_1 = require("react-admin");
var ra_test_1 = require("ra-test");
var core_1 = require("@material-ui/core");
var addon_knobs_1 = require("@storybook/addon-knobs");
var data_1 = __importDefault(require("../data"));
var src_1 = require("../../../src");
exports.default = {
    title: 'ra-relationships/many-to-many/ReferenceManyToManyInput/SelectArrayInput',
    decorators: [addon_knobs_1.withKnobs],
};
var initialState = {
    admin: {
        customQueries: {},
        references: {
            oneToMany: {
                'bands_performances@band_id_1': {
                    ids: data_1.default.performances
                        .filter(function (performance) { return performance.band_id === 1; })
                        .map(function (performance) { return performance.id; }),
                    total: data_1.default.performances.filter(function (performance) { return performance.band_id === 1; }).length,
                },
            },
            possibleValues: {},
        },
        resources: {
            bands: {
                data: data_1.default.bands.reduce(function (acc, band) {
                    var _a;
                    return (__assign(__assign({}, acc), (_a = {}, _a[band.id] = band, _a)));
                }, {}),
                list: {
                    ids: data_1.default.bands.map(function (band) { return band.id; }),
                    loadedOnce: true,
                    params: {},
                    selectedIds: [],
                    total: data_1.default.bands.length,
                },
            },
            performances: {
                data: data_1.default.performances.reduce(function (acc, performance) {
                    var _a;
                    return (__assign(__assign({}, acc), (_a = {}, _a[performance.id] = performance, _a)));
                }, {}),
                list: {
                    ids: data_1.default.performances.map(function (performance) { return performance.id; }),
                    loadedOnce: true,
                    params: {},
                    selectedIds: [],
                    total: data_1.default.performances.length,
                },
            },
            venues: {
                data: data_1.default.venues.reduce(function (acc, venue) {
                    var _a;
                    return (__assign(__assign({}, acc), (_a = {}, _a[venue.id] = venue, _a)));
                }, {}),
                list: {
                    ids: data_1.default.venues.map(function (venue) { return venue.id; }),
                    loadedOnce: true,
                    params: {},
                    selectedIds: [],
                    total: data_1.default.venues.length,
                    cachedRequests: {
                        '{"pagination":{"page":1,"perPage":25},"sort":{"field":"id","order":"DESC"},"filter":{}}': {
                            ids: data_1.default.venues.map(function (venue) { return venue.id; }),
                        },
                    },
                },
            },
        },
    },
};
exports.LoadedWithData = function () { return (react_1.default.createElement(core_1.ThemeProvider, { theme: core_1.createMuiTheme(react_admin_1.defaultTheme) },
    react_1.default.createElement(ra_test_1.TestContext, { initialState: initialState },
        react_1.default.createElement(react_admin_1.TranslationProvider, { i18nProvider: react_admin_1.defaultI18nProvider },
            react_1.default.createElement(react_admin_1.Edit, { id: "1", basePath: "/bands", resource: "bands" },
                react_1.default.createElement(src_1.ManyToManyReferenceContextProvider, null,
                    react_1.default.createElement(react_admin_1.SimpleForm, null,
                        react_1.default.createElement(src_1.ReferenceManyToManyInput, { resource: addon_knobs_1.text('resource', 'bands'), source: addon_knobs_1.text('source', 'id'), reference: addon_knobs_1.text('reference', 'venues'), through: addon_knobs_1.text('through', 'performances'), using: addon_knobs_1.text('using', 'band_id,venue_id'), label: "performances", record: data_1.default.bands[0] },
                            react_1.default.createElement(react_admin_1.SelectArrayInput, null))))))))); };
