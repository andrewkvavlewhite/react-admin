import React from 'react';
import { Admin, Resource } from 'react-admin';
import { createMemoryHistory } from 'history';
import i18nProvider from '../i18nProvider';
import { Layout, Dashboard, PostCreate, PostEdit, PostShow, PostList, } from '../';
import { localBrowserDataProvider } from '../realTimeDataProvider';
export default {
    title: 'ra-realtime/InLocalBrowser',
};
export var FullApplication = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: localBrowserDataProvider, layout: Layout, i18nProvider: i18nProvider, dashboard: Dashboard },
    React.createElement(Resource, { name: "posts", list: PostList, show: PostShow(localBrowserDataProvider), edit: PostEdit(localBrowserDataProvider), create: PostCreate }))); };
