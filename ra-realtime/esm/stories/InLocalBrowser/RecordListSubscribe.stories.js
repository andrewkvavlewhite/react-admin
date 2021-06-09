import React, { useState } from 'react';
import { Admin, Resource, Title } from 'react-admin';
import { Box, Card, CardContent, CardActions, Typography, } from '@material-ui/core';
import { createMemoryHistory } from 'history';
import i18nProvider from '../i18nProvider';
import { localBrowserDataProvider } from '../realTimeDataProvider';
import { EventType, useSubscribeToRecordList } from '../../src';
import { ListActions } from '..';
export default {
    title: 'ra-realtime/InLocalBrowser',
};
var MyDashBoard = function () {
    var _a = useState(0), postsAdded = _a[0], setPostsAdded = _a[1];
    var _b = useState(0), postsDeleted = _b[0], setPostsDeleted = _b[1];
    useSubscribeToRecordList('posts', function (event) {
        if (event.type === EventType.Created) {
            setPostsAdded(function (previous) { return previous + event.payload.ids.length; });
        }
        else if (event.type === EventType.Deleted) {
            setPostsDeleted(function (previous) { return previous + event.payload.ids.length; });
        }
    });
    return (React.createElement(Box, { maxWidth: 450 },
        React.createElement(Card, null,
            React.createElement(Title, { title: "Overview of users activity" }),
            React.createElement(CardContent, null,
                React.createElement(Typography, { gutterBottom: true, variant: "h5", component: "h2" }, "Other users are working now"),
                React.createElement(Typography, null,
                    postsAdded,
                    " news Posts"),
                React.createElement(Typography, null,
                    postsDeleted,
                    " deleted Posts")),
            React.createElement(CardActions, null,
                React.createElement(ListActions, null)))));
};
export var RecordSubscribe = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: localBrowserDataProvider, dashboard: MyDashBoard, i18nProvider: i18nProvider },
    React.createElement(Resource, { name: "posts" }))); };
