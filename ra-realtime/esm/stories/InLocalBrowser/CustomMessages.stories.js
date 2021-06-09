import React from 'react';
import { Admin, Resource, mergeTranslations, } from 'react-admin';
import { createMemoryHistory } from 'history';
import { Layout, Dashboard, PostCreate, PostEdit, PostShow, PostList, } from '..';
import { localBrowserDataProvider } from '../realTimeDataProvider';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import frenchMessages from 'ra-language-french';
import raRealTimeEnglishMessages from '../../src/i18n/raRealTimeLanguageEnglish';
import raRealTimeFrenchMessages from '../../src/i18n/raRealTimeLanguageFrench';
var customEnglishMessages = mergeTranslations(englishMessages, raRealTimeEnglishMessages, {
    'ra-realtime': {
        notification: {
            record: {
                updated: 'Wow, this entry has been modified by a ghost',
                deleted: 'Hey, a ghost has stolen this entry',
            },
            list: {
                refreshed: 'Be carefull, this list has been refreshed with %{smart_count} %{name} %{type} by some ghosts',
            },
        },
    },
});
var i18nCustomProvider = polyglotI18nProvider(function (locale) {
    if (locale === 'fr') {
        return mergeTranslations(frenchMessages, raRealTimeFrenchMessages);
    }
    return customEnglishMessages;
}, 'en');
export default {
    title: 'ra-realtime/InLocalBrowser',
};
export var CustomMessages = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: localBrowserDataProvider, layout: Layout, i18nProvider: i18nCustomProvider, dashboard: Dashboard },
    React.createElement(Resource, { name: "posts", list: PostList, show: PostShow(localBrowserDataProvider), edit: PostEdit(localBrowserDataProvider), create: PostCreate }))); };
