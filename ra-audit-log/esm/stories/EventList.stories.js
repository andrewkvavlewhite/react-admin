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
import * as React from 'react';
import { Admin, mergeTranslations, Resource } from 'react-admin';
import { createMemoryHistory } from 'history';
import fakeRestDataProvider from 'ra-data-fakerest';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import subFromDate from 'date-fns/sub';
import { EventList, raAuditLogLanguageEnglish } from '../src';
export default { title: 'ra-audit-log/EventList' };
var i18nProvider = polyglotI18nProvider(function () {
    return mergeTranslations(englishMessages, raAuditLogLanguageEnglish);
});
var today = new Date();
var dataProvider = fakeRestDataProvider({
    events: [
        {
            id: 1,
            resource: 'products',
            action: 'create',
            date: subFromDate(today, { seconds: 30 }).toISOString(),
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
            date: subFromDate(today, { days: 1 }).toISOString(),
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
            date: subFromDate(today, { weeks: 1 }).toISOString(),
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
            date: subFromDate(today, { months: 2 }).toISOString(),
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
var history = createMemoryHistory();
export var Basic = function () { return (React.createElement(Admin, { dataProvider: dataProvider, i18nProvider: i18nProvider, history: history },
    React.createElement(Resource, { name: "events", list: EventList }),
    React.createElement(Resource, { name: "products" }),
    React.createElement(Resource, { name: "orders" }),
    React.createElement(Resource, { name: "reviews" }))); };
var EventListWithAuthorsResource = function (props) { return (React.createElement(EventList, __assign({}, props, { authorResource: "users" }))); };
export var WithAuthorsAsResource = function () { return (React.createElement(Admin, { dataProvider: dataProvider, i18nProvider: i18nProvider, history: history },
    React.createElement(Resource, { name: "events", list: EventListWithAuthorsResource }),
    React.createElement(Resource, { name: "users" }),
    React.createElement(Resource, { name: "products" }),
    React.createElement(Resource, { name: "orders" }),
    React.createElement(Resource, { name: "reviews" }))); };
