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
exports.WithError = exports.NotLoadedYet = exports.LoadedWithData = void 0;
var react_1 = __importDefault(require("react"));
var core_1 = require("@material-ui/core");
var react_admin_1 = require("react-admin");
var ra_test_1 = require("ra-test");
var data_1 = __importDefault(require("../data"));
var src_1 = require("../../../src");
exports.default = {
    title: 'ra-relationships/many-to-many/ReferenceManyToManyField/Datagrid',
};
var LoadedWithDataState = {
    admin: {
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
                },
            },
        },
    },
};
exports.LoadedWithData = function () { return (react_1.default.createElement(core_1.ThemeProvider, { theme: core_1.createMuiTheme(react_admin_1.defaultTheme) },
    react_1.default.createElement(ra_test_1.TestContext, { initialState: LoadedWithDataState },
        react_1.default.createElement(react_admin_1.TranslationProvider, { i18nProvider: react_admin_1.defaultI18nProvider },
            react_1.default.createElement(src_1.ReferenceManyToManyField, { label: "performances", reference: "venues", resource: "bands", through: "performances", using: "band_id,venue_id", record: data_1.default.bands[0] },
                react_1.default.createElement(react_admin_1.Datagrid, null,
                    react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
                    react_1.default.createElement(react_admin_1.TextField, { source: "name" }),
                    react_1.default.createElement(react_admin_1.EditButton, null))))))); };
var EmptyState = {
    admin: {
        references: {
            oneToMany: {
                'bands_performances@band_id_1': {},
            },
            possibleValues: {},
        },
        resources: {
            bands: {},
            performances: {},
            venues: {},
        },
    },
};
var NotLoadedYetDataProvider = {
    getList: function () { return Promise.reject(); },
    getOne: function () { return Promise.reject(); },
    getMany: function () { return Promise.reject(); },
    create: function () { return Promise.reject(); },
    update: function () { return Promise.reject(); },
    updateMany: function () { return Promise.reject(); },
    delete: function () { return Promise.reject(); },
    deleteMany: function () { return Promise.reject(); },
    getManyReference: function () {
        return new Promise(function () {
            return null;
        });
    },
};
exports.NotLoadedYet = function () { return (react_1.default.createElement(core_1.ThemeProvider, { theme: core_1.createMuiTheme(react_admin_1.defaultTheme) },
    react_1.default.createElement(ra_test_1.TestContext, { initialState: EmptyState },
        react_1.default.createElement(react_admin_1.DataProviderContext.Provider, { value: NotLoadedYetDataProvider },
            react_1.default.createElement(react_admin_1.TranslationProvider, { i18nProvider: react_admin_1.defaultI18nProvider },
                react_1.default.createElement(src_1.ReferenceManyToManyField, { source: "id", label: "performances", reference: "venues", resource: "bands", through: "performances", using: "band_id,venue_id", record: data_1.default.bands[0] },
                    react_1.default.createElement(react_admin_1.Datagrid, null,
                        react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
                        react_1.default.createElement(react_admin_1.TextField, { source: "name" }),
                        react_1.default.createElement(react_admin_1.EditButton, null)))))))); };
var WithErrorDataProvider = {
    getList: function () { return Promise.reject(); },
    getOne: function () { return Promise.reject(); },
    getMany: function () { return Promise.reject(); },
    create: function () { return Promise.reject(); },
    update: function () { return Promise.reject(); },
    updateMany: function () { return Promise.reject(); },
    delete: function () { return Promise.reject(); },
    deleteMany: function () { return Promise.reject(); },
    getManyReference: function () { return Promise.reject(new Error('Big Fat Error')); },
};
exports.WithError = function () { return (react_1.default.createElement(core_1.ThemeProvider, { theme: core_1.createMuiTheme(react_admin_1.defaultTheme) },
    react_1.default.createElement(ra_test_1.TestContext, { initialState: EmptyState },
        react_1.default.createElement(react_admin_1.DataProviderContext.Provider, { value: WithErrorDataProvider },
            react_1.default.createElement(react_admin_1.TranslationProvider, { i18nProvider: react_admin_1.defaultI18nProvider },
                react_1.default.createElement(src_1.ReferenceManyToManyField, { source: "id", label: "performances", reference: "venues", resource: "bands", through: "performances", using: "band_id,venue_id", record: data_1.default.bands[0] },
                    react_1.default.createElement(react_admin_1.Datagrid, null,
                        react_1.default.createElement(react_admin_1.TextField, { source: "id" }),
                        react_1.default.createElement(react_admin_1.TextField, { source: "name" }),
                        react_1.default.createElement(react_admin_1.EditButton, null)))))))); };
