import * as React from 'react';
import { Container, Box, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TranslationProvider, mergeTranslations, useRecordContext, } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import { MemoryRouter } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { raAuditLogLanguageEnglish, Timeline, TimelineGroup, useEventLabel, } from '../src';
export default { title: 'ra-audit-log/Timeline' };
export var NotLoadedYet = function () { return (React.createElement(React.Fragment, null,
    React.createElement(Box, { bgcolor: "background.default", padding: 2 },
        React.createElement(Container, { maxWidth: "sm" },
            React.createElement(Timeline, null))))); };
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
var i18nProvider = polyglotI18nProvider(function () {
    return mergeTranslations(englishMessages, raAuditLogLanguageEnglish);
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
var store = createStore(fakeReducer);
export var Loaded = function () { return (React.createElement(Provider, { store: store },
    React.createElement(MemoryRouter, null,
        React.createElement(Box, { bgcolor: "background.default", padding: 2 },
            React.createElement(Container, { maxWidth: "sm" },
                React.createElement(TranslationProvider, { locale: "en", i18nProvider: i18nProvider },
                    React.createElement(Timeline, { loaded: true, records: records }))))))); };
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
export var CustomGrouping = function () { return (React.createElement(Provider, { store: store },
    React.createElement(MemoryRouter, null,
        React.createElement(Box, { bgcolor: "background.default", padding: 2 },
            React.createElement(Container, { maxWidth: "sm" },
                React.createElement(TranslationProvider, { locale: "en", i18nProvider: i18nProvider },
                    React.createElement(Timeline, { loaded: true, records: records, groupLogs: groupByMonth }))))))); };
var useMyTimelineGroupStyles = makeStyles(function (theme) { return ({
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
    return React.createElement(TimelineGroup, { classes: classes });
};
export var CustomGroupComponent = function () { return (React.createElement(Provider, { store: store },
    React.createElement(MemoryRouter, null,
        React.createElement(Box, { bgcolor: "background.default", padding: 2 },
            React.createElement(Container, { maxWidth: "sm" },
                React.createElement(TranslationProvider, { locale: "en", i18nProvider: i18nProvider },
                    React.createElement(Timeline, { loaded: true, records: records },
                        React.createElement(MyTimelineGroup, null)))))))); };
var MyTimelineItem = function (props) {
    var record = useRecordContext(props.record);
    var eventLabel = useEventLabel({ record: record });
    return (React.createElement(ListItem, null,
        React.createElement(ListItemText, { primary: record.author.fullName, secondary: eventLabel })));
};
var MyTimelineGroupForCustomItem = function () {
    return (React.createElement(TimelineGroup, null,
        React.createElement(MyTimelineItem, null)));
};
export var CustomItemComponent = function () { return (React.createElement(Provider, { store: store },
    React.createElement(MemoryRouter, null,
        React.createElement(Box, { bgcolor: "background.default", padding: 2 },
            React.createElement(Container, { maxWidth: "sm" },
                React.createElement(TranslationProvider, { locale: "en", i18nProvider: i18nProvider },
                    React.createElement(Timeline, { loaded: true, records: records },
                        React.createElement(MyTimelineGroupForCustomItem, null)))))))); };
