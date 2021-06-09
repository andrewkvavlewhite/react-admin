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
import { Admin, Resource, List, SimpleList, Layout, TopToolbar, Button, sanitizeListRestProps, } from 'react-admin';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import { createMemoryHistory } from 'history';
import dataProvider from './dataProvider';
import { TourProvider, useTour } from '../src';
export default {
    title: 'ra-tour/basic',
};
var ListActions = function (props) {
    var _a = useTour(), running = _a[0].running, start = _a[1].start;
    return (React.createElement(TopToolbar, __assign({}, sanitizeListRestProps(props)),
        React.createElement(Button, { onClick: function () { return start('first-tour'); }, label: "Please help !!11", disabled: running },
            React.createElement(ContactSupportIcon, null))));
};
var SongList = function (props) { return (React.createElement(List, __assign({}, props, { actions: React.createElement(ListActions, null) }),
    React.createElement(SimpleList, { "data-tour-id": "song-list-line", primaryText: function (record) { return record.title; } }))); };
var tours = {
    'first-tour': {
        steps: [
            {
                target: "[data-tour-id='song-list-line'] a:nth-child(1)",
                event: 'hover',
                disableBeacon: true,
                content: 'This is a song',
            },
            {
                target: "[data-tour-id='song-list-line'] a:nth-child(7)",
                disableBeacon: true,
                content: 'This is another song, it should  be lower on the page',
            },
        ],
    },
};
var MyLayout = function (props) { return (React.createElement(TourProvider, { tours: tours },
    React.createElement(Layout, __assign({}, props)))); };
export var BasicTour = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider, layout: MyLayout },
    React.createElement(Resource, { name: "songs", list: SongList }))); };
