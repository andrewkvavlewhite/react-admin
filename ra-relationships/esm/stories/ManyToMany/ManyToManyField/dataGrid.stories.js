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
import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { Datagrid, DataProviderContext, defaultI18nProvider, defaultTheme, EditButton, TextField, TranslationProvider, } from 'react-admin';
import { TestContext } from 'ra-test';
import data from '../data';
import { ReferenceManyToManyField } from '../../../src';
export default {
    title: 'ra-relationships/many-to-many/ReferenceManyToManyField/Datagrid',
};
var LoadedWithDataState = {
    admin: {
        references: {
            oneToMany: {
                'bands_performances@band_id_1': {
                    ids: data.performances
                        .filter(function (performance) { return performance.band_id === 1; })
                        .map(function (performance) { return performance.id; }),
                    total: data.performances.filter(function (performance) { return performance.band_id === 1; }).length,
                },
            },
            possibleValues: {},
        },
        resources: {
            bands: {
                data: data.bands.reduce(function (acc, band) {
                    var _a;
                    return (__assign(__assign({}, acc), (_a = {}, _a[band.id] = band, _a)));
                }, {}),
                list: {
                    ids: data.bands.map(function (band) { return band.id; }),
                    loadedOnce: true,
                    params: {},
                    selectedIds: [],
                    total: data.bands.length,
                },
            },
            performances: {
                data: data.performances.reduce(function (acc, performance) {
                    var _a;
                    return (__assign(__assign({}, acc), (_a = {}, _a[performance.id] = performance, _a)));
                }, {}),
                list: {
                    ids: data.performances.map(function (performance) { return performance.id; }),
                    loadedOnce: true,
                    params: {},
                    selectedIds: [],
                    total: data.performances.length,
                },
            },
            venues: {
                data: data.venues.reduce(function (acc, venue) {
                    var _a;
                    return (__assign(__assign({}, acc), (_a = {}, _a[venue.id] = venue, _a)));
                }, {}),
                list: {
                    ids: data.venues.map(function (venue) { return venue.id; }),
                    loadedOnce: true,
                    params: {},
                    selectedIds: [],
                    total: data.venues.length,
                },
            },
        },
    },
};
export var LoadedWithData = function () { return (React.createElement(ThemeProvider, { theme: createMuiTheme(defaultTheme) },
    React.createElement(TestContext, { initialState: LoadedWithDataState },
        React.createElement(TranslationProvider, { i18nProvider: defaultI18nProvider },
            React.createElement(ReferenceManyToManyField, { label: "performances", reference: "venues", resource: "bands", through: "performances", using: "band_id,venue_id", record: data.bands[0] },
                React.createElement(Datagrid, null,
                    React.createElement(TextField, { source: "id" }),
                    React.createElement(TextField, { source: "name" }),
                    React.createElement(EditButton, null))))))); };
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
export var NotLoadedYet = function () { return (React.createElement(ThemeProvider, { theme: createMuiTheme(defaultTheme) },
    React.createElement(TestContext, { initialState: EmptyState },
        React.createElement(DataProviderContext.Provider, { value: NotLoadedYetDataProvider },
            React.createElement(TranslationProvider, { i18nProvider: defaultI18nProvider },
                React.createElement(ReferenceManyToManyField, { source: "id", label: "performances", reference: "venues", resource: "bands", through: "performances", using: "band_id,venue_id", record: data.bands[0] },
                    React.createElement(Datagrid, null,
                        React.createElement(TextField, { source: "id" }),
                        React.createElement(TextField, { source: "name" }),
                        React.createElement(EditButton, null)))))))); };
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
export var WithError = function () { return (React.createElement(ThemeProvider, { theme: createMuiTheme(defaultTheme) },
    React.createElement(TestContext, { initialState: EmptyState },
        React.createElement(DataProviderContext.Provider, { value: WithErrorDataProvider },
            React.createElement(TranslationProvider, { i18nProvider: defaultI18nProvider },
                React.createElement(ReferenceManyToManyField, { source: "id", label: "performances", reference: "venues", resource: "bands", through: "performances", using: "band_id,venue_id", record: data.bands[0] },
                    React.createElement(Datagrid, null,
                        React.createElement(TextField, { source: "id" }),
                        React.createElement(TextField, { source: "name" }),
                        React.createElement(EditButton, null)))))))); };
