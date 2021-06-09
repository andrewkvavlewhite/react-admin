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
import { Admin, Resource, List, SimpleList, Layout, TopToolbar, Button, sanitizeListRestProps, useNotify, useRedirect, Edit, SimpleForm, TextInput, DateInput, } from 'react-admin';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import { createMemoryHistory } from 'history';
import dataProvider from './dataProvider';
import { TourProvider, useTour } from '../src';
export default {
    title: 'ra-tour/tools',
};
var ListActions = function (props) {
    var _a = useTour(), running = _a[0].running, start = _a[1].start;
    return (React.createElement(TopToolbar, __assign({}, sanitizeListRestProps(props)),
        React.createElement(Button, { onClick: function () { return start('first-tour'); }, label: "Please help !!11", disabled: running },
            React.createElement(ContactSupportIcon, null))));
};
var SongList = function (props) { return (React.createElement(List, __assign({}, props, { actions: React.createElement(ListActions, null) }),
    React.createElement(SimpleList, { "data-tour-id": "song-list-line", primaryText: function (record) { return record.title; } }))); };
var SongEdit = function (props) { return (React.createElement(Edit, __assign({}, props),
    React.createElement(SimpleForm, null,
        React.createElement(TextInput, { source: "artist" }),
        React.createElement(TextInput, { source: "title" }),
        React.createElement(TextInput, { source: "writer" }),
        React.createElement(TextInput, { source: "producer" }),
        React.createElement(DateInput, { label: "Release date", source: "released" }),
        React.createElement(TextInput, { source: "recordCompany" })))); };
var tours = {
    'first-tour': {
        steps: [
            {
                target: "[data-tour-id='song-list-line'] a:nth-child(1)",
                event: 'hover',
                disableBeacon: true,
                content: 'This is a song',
                after: function (_a) {
                    var target = _a.target, notify = _a.notify;
                    target.click();
                    notify('It should have automatically clicked on the song line');
                },
            },
            {
                target: 'body',
                content: "We're now on the edit form, click next can bring me back to the list if I want to",
                after: function (_a) {
                    var redirect = _a.redirect;
                    redirect('/songs');
                },
            },
            {
                before: function (_a) {
                    var notify = _a.notify;
                    notify('Did it work?');
                },
                target: 'body',
                content: 'Here we are',
            },
        ],
    },
};
var MyLayout = function (props) {
    var notify = useNotify();
    var redirect = useRedirect();
    return (React.createElement(TourProvider, { tours: tours, tools: { notify: notify, redirect: redirect } },
        React.createElement(Layout, __assign({}, props))));
};
export var TourWithTools = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: dataProvider, layout: MyLayout },
    React.createElement(Resource, { name: "songs", list: SongList, edit: SongEdit }))); };
