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
import * as React from 'react';
import { useState } from 'react';
import { Edit, useTranslate } from 'react-admin';
import { Collapse } from '@material-ui/core';
import { useSubscribeToRecord } from './dataProvider';
import { EventType } from './types';
import Warning from './Warning';
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
export var RealTimeEdit = function (_a) {
    var children = _a.children, id = _a.id, resource = _a.resource, props = __rest(_a, ["children", "id", "resource"]);
    var translate = useTranslate();
    var _b = useState(false), deleted = _b[0], setDeleted = _b[1];
    var _c = useState(false), updated = _c[0], setUpdated = _c[1];
    var _d = useState(false), updatedDisplayed = _d[0], setUpdatedDisplayed = _d[1];
    var defaultHandleEventReceived = function (event) {
        if (event.type === EventType.Updated) {
            setUpdated(true);
            setUpdatedDisplayed(true);
        }
        else if (event.type === EventType.Deleted) {
            setDeleted(true);
            setUpdated(false);
            setUpdatedDisplayed(true);
        }
    };
    var _e = props.onEventReceived, onEventReceived = _e === void 0 ? defaultHandleEventReceived : _e, rest = __rest(props, ["onEventReceived"]);
    useSubscribeToRecord(resource, id, onEventReceived);
    return (React.createElement(React.Fragment, null,
        React.createElement(Collapse, { in: deleted || updatedDisplayed },
            deleted && (React.createElement(Warning, { message: translate('ra-realtime.notification.record.deleted') })),
            updated && (React.createElement(Warning, { message: translate('ra-realtime.notification.record.updated'), refresh: true, onRefresh: function () {
                    // we want the collapse to happen after the refresh
                    // but if we setUpdated(false) right away, the content is empty
                    // so we delay the setUpdated(false)
                    setUpdatedDisplayed(false);
                    setTimeout(function () {
                        setUpdated(false);
                    }, 500);
                } }))),
        React.createElement(Edit, __assign({ resource: resource, id: id }, rest), children)));
};
