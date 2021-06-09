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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMemoryHistory } from 'history';
import { Typography, CircularProgress, Tooltip, TableRow, TableCell, } from '@material-ui/core';
import { List, Datagrid, SimpleForm, TextInput, Admin, Resource, Edit, SaveButton, Toolbar, DatagridBody, useNotify, TextField, EditButton, DeleteButton, TopToolbar, } from 'react-admin';
import i18nProvider from '../i18nProvider';
import { mercureDataProvider } from '../realTimeDataProvider';
import { reducer as locks, useLock, useHasLock } from '../../src';
import useHasLocks from '../../src/dataProvider/useHasLocks';
import { CustomPopper, UnlockButton, LockButton } from '../simulateActions';
export default {
    title: 'ra-realtime/WithMercureHub',
};
var EditActions = function (props) {
    var lock = useHasLock(props.resource, props.data.id).data;
    if ((lock === null || lock === void 0 ? void 0 : lock.identity) === 'mario') {
        return null;
    }
    return (React.createElement(CustomPopper, null,
        React.createElement(UnlockButton, { lock: {
                recordId: props.data.id,
                resource: props.resource,
                identity: 'luigi',
            } })));
};
var LockableEditButton = function (props) {
    var resource = props.resource, record = props.record;
    var _a = useHasLock(resource, record.id), lock = _a.data, loading = _a.loading;
    if (loading || !!lock) {
        var title = loading
            ? 'Loading...'
            : "This Post is locked by " + lock.identity;
        return (React.createElement(Tooltip, { title: title, "aria-label": title, arrow: true },
            React.createElement("span", null,
                React.createElement(EditButton, __assign({}, props)))));
    }
    return React.createElement(EditButton, __assign({}, props));
};
var MyPostRow = function (_a) {
    var locks = _a.locks, props = __rest(_a, ["locks"]);
    if (!props.record) {
        return null;
    }
    var recordId = props.record.id;
    var lock = locks.find(function (l) { return l.recordId === recordId; });
    return (React.createElement(TableRow, { id: recordId },
        React.createElement(TableCell, null,
            React.createElement(TextField, __assign({ source: "title" }, props)),
            lock && (React.createElement("span", { style: { color: 'red' } }, " (Locked by " + lock.identity + ")"))),
        React.createElement(TableCell, { align: "right" },
            React.createElement(DeleteButton, __assign({}, props, { disabled: !!lock })),
            React.createElement(LockableEditButton, __assign({}, props)))));
};
var MyPostGridBody = function (_a) {
    var locks = _a.locks, props = __rest(_a, ["locks"]);
    return (React.createElement(DatagridBody, __assign({}, props, { row: React.createElement(MyPostRow, { locks: locks }) })));
};
var MyPostGrid = function (props) {
    var locks = useHasLocks(props.resource).data;
    return React.createElement(Datagrid, __assign({}, props, { body: React.createElement(MyPostGridBody, { locks: locks }) }));
};
var ListActions = function () {
    var lock = useHasLock('posts', 2).data;
    if (lock) {
        return null;
    }
    return (React.createElement(TopToolbar, null,
        React.createElement(CustomPopper, null,
            React.createElement(LockButton, { label: "Lock Second Post", lock: {
                    recordId: 2,
                    resource: 'posts',
                    identity: 'luigi',
                } }))));
};
var MyListView = function (props) { return (React.createElement(List, __assign({}, props, { bulkActionButtons: false, actions: React.createElement(ListActions, null) }),
    React.createElement(MyPostGrid, null))); };
var MyLockedEditView = function (props) {
    var resource = props.resource, id = props.id;
    var notify = useNotify();
    var recordId = parseInt(id, 10); // We need to parse back id to int
    var loading = useLock(resource, recordId, 'mario', {
        onSuccess: function () {
            notify('ra-realtime.notification.lock.lockedByMe');
        },
        onFailure: function () {
            notify('ra-realtime.notification.lock.lockedBySomeoneElse');
        },
        onUnlockSuccess: function () {
            notify('ra-realtime.notification.lock.unlocked');
        },
    }).loading;
    if (loading) {
        return React.createElement(CircularProgress, null);
    }
    return (React.createElement(Edit, __assign({}, props, { actions: React.createElement(EditActions, { record: props.data }) }),
        React.createElement(SimpleForm, { toolbar: React.createElement(CustomToolbar, null) },
            React.createElement(TextInput, { source: "title" }))));
};
var CustomToolbar = function (props) {
    var resource = props.resource, record = props.record;
    var _a = useHasLock(resource, record.id), loading = _a.loading, lock = _a.data;
    var isMarioLocker = (lock === null || lock === void 0 ? void 0 : lock.identity) === 'mario';
    return (React.createElement(Toolbar, __assign({}, props),
        React.createElement(SaveButton, { disabled: loading || !isMarioLocker }),
        !(lock === null || lock === void 0 ? void 0 : lock.identity) ? null : isMarioLocker ? (React.createElement(LockMessage, null, "You're locking this record")) : (React.createElement(LockMessage, null, "This record is locked by another inhabitant of the mushroom kingdom: " + (lock === null || lock === void 0 ? void 0 : lock.identity) + "."))));
};
var useLockMessageStyles = makeStyles(function (theme) { return ({
    root: {
        padding: theme.spacing(0, 1),
    },
}); });
var LockMessage = function (props) {
    var _a = props.variant, variant = _a === void 0 ? 'body1' : _a;
    var classes = useLockMessageStyles(props);
    return (React.createElement(Typography, { className: classes.root, variant: variant }, props.children));
};
export var EditWithLock = function () { return (React.createElement(Admin, { history: createMemoryHistory(), dataProvider: mercureDataProvider, i18nProvider: i18nProvider, customReducers: { locks: locks } },
    React.createElement(Resource, { name: "posts", list: MyListView, edit: MyLockedEditView }),
    React.createElement(Resource, { name: "locks" }))); };
