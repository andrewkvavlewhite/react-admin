"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditWithLock = void 0;
var react_1 = __importDefault(require("react"));
var styles_1 = require("@material-ui/core/styles");
var history_1 = require("history");
var core_1 = require("@material-ui/core");
var react_admin_1 = require("react-admin");
var i18nProvider_1 = __importDefault(require("../i18nProvider"));
var realTimeDataProvider_1 = require("../realTimeDataProvider");
var src_1 = require("../../src");
var useHasLocks_1 = __importDefault(require("../../src/dataProvider/useHasLocks"));
var simulateActions_1 = require("../simulateActions");
exports.default = {
    title: 'ra-realtime/InLocalBrowser',
};
var EditActions = function (props) {
    var lock = src_1.useHasLock(props.resource, props.data.id).data;
    if ((lock === null || lock === void 0 ? void 0 : lock.identity) === 'mario') {
        return null;
    }
    return (react_1.default.createElement(simulateActions_1.CustomPopper, null,
        react_1.default.createElement(simulateActions_1.UnlockButton, { lock: {
                recordId: props.data.id,
                resource: props.resource,
                identity: 'luigi',
            } })));
};
var LockableEditButton = function (props) {
    var resource = props.resource, record = props.record;
    var _a = src_1.useHasLock(resource, record.id), lock = _a.data, loading = _a.loading;
    if (loading || !!lock) {
        var title = loading
            ? 'Loading...'
            : "This Post is locked by " + lock.identity;
        return (react_1.default.createElement(core_1.Tooltip, { title: title, "aria-label": title, arrow: true },
            react_1.default.createElement("span", null,
                react_1.default.createElement(react_admin_1.EditButton, __assign({}, props)))));
    }
    return react_1.default.createElement(react_admin_1.EditButton, __assign({}, props));
};
var MyPostRow = function (_a) {
    var locks = _a.locks, props = __rest(_a, ["locks"]);
    if (!props.record) {
        return null;
    }
    var recordId = props.record.id;
    var lock = locks.find(function (l) { return l.recordId === recordId; });
    return (react_1.default.createElement(core_1.TableRow, { id: recordId },
        react_1.default.createElement(core_1.TableCell, null,
            react_1.default.createElement(react_admin_1.TextField, __assign({ source: "title" }, props)),
            lock && (react_1.default.createElement("span", { style: { color: 'red' } }, " (Locked by " + lock.identity + ")"))),
        react_1.default.createElement(core_1.TableCell, { align: "right" },
            react_1.default.createElement(react_admin_1.DeleteButton, __assign({}, props, { disabled: !!lock })),
            react_1.default.createElement(LockableEditButton, __assign({}, props)))));
};
var MyPostGridBody = function (_a) {
    var locks = _a.locks, props = __rest(_a, ["locks"]);
    return (react_1.default.createElement(react_admin_1.DatagridBody, __assign({}, props, { row: react_1.default.createElement(MyPostRow, { locks: locks }) })));
};
var MyPostGrid = function (props) {
    var locks = useHasLocks_1.default(props.resource).data;
    return react_1.default.createElement(react_admin_1.Datagrid, __assign({}, props, { body: react_1.default.createElement(MyPostGridBody, { locks: locks }) }));
};
var ListActions = function () {
    var lock = src_1.useHasLock('posts', 2).data;
    if (lock) {
        return null;
    }
    return (react_1.default.createElement(react_admin_1.TopToolbar, null,
        react_1.default.createElement(simulateActions_1.CustomPopper, null,
            react_1.default.createElement(simulateActions_1.LockButton, { label: "Lock Second Post", lock: {
                    recordId: 2,
                    resource: 'posts',
                    identity: 'luigi',
                } }))));
};
var MyListView = function (props) { return (react_1.default.createElement(react_admin_1.List, __assign({}, props, { bulkActionButtons: false, actions: react_1.default.createElement(ListActions, null) }),
    react_1.default.createElement(MyPostGrid, null))); };
var MyLockedEditView = function (props) {
    var resource = props.resource, id = props.id;
    var notify = react_admin_1.useNotify();
    var recordId = parseInt(id, 10); // We need to parse back id to int
    var loading = src_1.useLock(resource, recordId, 'mario', {
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
        return react_1.default.createElement(core_1.CircularProgress, null);
    }
    return (react_1.default.createElement(react_admin_1.Edit, __assign({}, props, { actions: react_1.default.createElement(EditActions, { record: props.data }) }),
        react_1.default.createElement(react_admin_1.SimpleForm, { toolbar: react_1.default.createElement(CustomToolbar, null) },
            react_1.default.createElement(react_admin_1.TextInput, { source: "title" }))));
};
var CustomToolbar = function (props) {
    var resource = props.resource, record = props.record;
    var _a = src_1.useHasLock(resource, record.id), loading = _a.loading, lock = _a.data;
    var isMarioLocker = (lock === null || lock === void 0 ? void 0 : lock.identity) === 'mario';
    return (react_1.default.createElement(react_admin_1.Toolbar, __assign({}, props),
        react_1.default.createElement(react_admin_1.SaveButton, { disabled: loading || !isMarioLocker }),
        !(lock === null || lock === void 0 ? void 0 : lock.identity) ? null : isMarioLocker ? (react_1.default.createElement(LockMessage, null, "You're locking this record")) : (react_1.default.createElement(LockMessage, null, "This record is locked by another inhabitant of the mushroom kingdom: " + (lock === null || lock === void 0 ? void 0 : lock.identity) + "."))));
};
var useLockMessageStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        padding: theme.spacing(0, 1),
    },
}); });
var LockMessage = function (props) {
    var _a = props.variant, variant = _a === void 0 ? 'body1' : _a;
    var classes = useLockMessageStyles(props);
    return (react_1.default.createElement(core_1.Typography, { className: classes.root, variant: variant }, props.children));
};
exports.EditWithLock = function () { return (react_1.default.createElement(react_admin_1.Admin, { history: history_1.createMemoryHistory(), dataProvider: realTimeDataProvider_1.localBrowserDataProvider, i18nProvider: i18nProvider_1.default, customReducers: { locks: src_1.reducer } },
    react_1.default.createElement(react_admin_1.Resource, { name: "posts", list: MyListView, edit: MyLockedEditView }),
    react_1.default.createElement(react_admin_1.Resource, { name: "locks" }))); };
