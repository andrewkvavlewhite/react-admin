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
import { SimpleList } from 'react-admin';
import { TestContext } from 'ra-test';
import { withKnobs, text } from '@storybook/addon-knobs';
import data from '../data';
import { ReferenceManyToManyField } from '../../../src';
export default {
    title: 'ra-relationships/many-to-many/ReferenceManyToManyField/SimpleList',
    decorators: [withKnobs],
};
var initialState = {
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
export var LoadedWithData = function () { return (React.createElement(TestContext, { initialState: initialState },
    React.createElement(ReferenceManyToManyField, { resource: text('resource', 'bands'), source: text('source', 'id'), reference: text('reference', 'venues'), through: text('through', 'performances'), using: text('using', 'band_id,venue_id'), label: "performances", record: data.bands[0] },
        React.createElement(SimpleList, { primaryText: function (record) { return record.id.toString(); }, secondaryText: function (record) { return record.name; } })))); };
