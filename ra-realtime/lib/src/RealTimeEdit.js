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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.RealTimeEdit = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var dataProvider_1 = require("./dataProvider");
var types_1 = require("./types");
var Warning_1 = __importDefault(require("./Warning"));
/**
 * <Edit> equivalent, but with real-time updates
 *
 * Displays a warning when editing a record that was modified by another user,
 * and offers to refresh the page. Also, displays a warning when editing a
 * record that was deleted by another user.
 *
 * @example
 *
 * import { RealTimeEdit } from '@react-admin/ra-realtime'
 *
 * const PostEdit = props => (
 *     <RealTimeEdit {...props}>
 *         <SimpleForm>
 *             <TextInput source="title" />
 *         </SimpleForm>
 *     </RealTimeEdit>
 * );
 *
 * @example
 * import React from 'react';
 * import { SimpleForm, TextInput, useRefresh } from 'react-admin';
 * import { RealTimeEdit } from '@react-admin/ra-realtime';
 *
 * const PostEdit = props => {
 *     const refresh = useRefresh();
 *     const handleEventReceived = (event) => {
 *         refresh();
 *     };
 *
 *     return (
 *         <RealTimeEdit {...props} onEventReceived={handleEventReceived}>
 *             <SimpleForm>
 *                 <TextInput source="title" />
 *             </SimpleForm>
 *         </RealTimeEdit>
 *     );
 * };
 */
exports.RealTimeEdit = function (_a) {
    var children = _a.children, id = _a.id, resource = _a.resource, props = __rest(_a, ["children", "id", "resource"]);
    var translate = react_admin_1.useTranslate();
    var _b = react_1.useState(false), deleted = _b[0], setDeleted = _b[1];
    var _c = react_1.useState(false), updated = _c[0], setUpdated = _c[1];
    var _d = react_1.useState(false), updatedDisplayed = _d[0], setUpdatedDisplayed = _d[1];
    var defaultHandleEventReceived = function (event) {
        if (event.type === types_1.EventType.Updated) {
            setUpdated(true);
            setUpdatedDisplayed(true);
        }
        else if (event.type === types_1.EventType.Deleted) {
            setDeleted(true);
            setUpdated(false);
            setUpdatedDisplayed(true);
        }
    };
    var _e = props.onEventReceived, onEventReceived = _e === void 0 ? defaultHandleEventReceived : _e, rest = __rest(props, ["onEventReceived"]);
    dataProvider_1.useSubscribeToRecord(resource, id, onEventReceived);
    return (React.createElement(React.Fragment, null,
        React.createElement(core_1.Collapse, { in: deleted || updatedDisplayed },
            deleted && (React.createElement(Warning_1.default, { message: translate('ra-realtime.notification.record.deleted') })),
            updated && (React.createElement(Warning_1.default, { message: translate('ra-realtime.notification.record.updated'), refresh: true, onRefresh: function () {
                    // we want the collapse to happen after the refresh
                    // but if we setUpdated(false) right away, the content is empty
                    // so we delay the setUpdated(false)
                    setUpdatedDisplayed(false);
                    setTimeout(function () {
                        setUpdated(false);
                    }, 500);
                } }))),
        React.createElement(react_admin_1.Edit, __assign({ resource: resource, id: id }, rest), children)));
};
