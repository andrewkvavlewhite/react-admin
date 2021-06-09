import React from 'react';
import { Admin, Resource } from 'react-admin';
import { createMemoryHistory } from 'history';
import i18nProvider from '../i18nProvider';
import { mercureDataProvider } from '../realTimeDataProvider';
import { Layout, Dashboard, PostCreate, PostEdit, PostShow, PostList, } from '../';
export default {
    title: 'ra-realtime/WithMercureHub',
};
export var FullApplication = function () { return (React.createElement(Admin, { dataProvider: mercureDataProvider, layout: Layout, i18nProvider: i18nProvider, dashboard: Dashboard, history: createMemoryHistory() },
    React.createElement(Resource, { name: "posts", list: PostList, show: PostShow(mercureDataProvider), edit: PostEdit(mercureDataProvider), create: PostCreate }))); };
