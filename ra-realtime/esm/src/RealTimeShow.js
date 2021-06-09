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
import { Show, useNotify, useRefresh, useTranslate, } from 'react-admin';
import { Collapse } from '@material-ui/core';
import { useSubscribeToRecord } from './dataProvider';
import { EventType } from './types';
import Warning from './Warning';
/**
 * <Show> equivalent, but with real-time updates
 *
 * Shows a event and refreshes the page when the record is modified by
 * another user. Also, it displays a warning when the record is deleted by
 * another user.
 *
 * @example
 *
 * import { RealTimeShow } from '@react-admin/ra-realtime'
 *
 * const PostShow = props => (
 *     <RealTimeShow {...props}>
 *         <SimpleShowLayout>
 *             <TextField source="title" />
 *         </SimpleShowLayout>
 *     </RealTimeShow>
 * );
 *
 * @example <caption>With custom side effects on new event</caption>
 *
 * import { SimpleShowLayout, TextField, useRefresh } from 'react-admin';
 * import { RealTimeShow } from '@react-admin/ra-realtime';
 *
 * const PostShow = props => {
 *    const refresh = useRefresh();
 *    const handleEventReceived = (event) => {
 *        refresh();
 *    };
 *
 *    return (
 *        <RealTimeShow {...props} onEventReceived={handleEventReceived}>
 *            <SimpleShowLayout>
 *                <TextField source="title" />
 *            </SimpleShowLayout>
 *        </RealTimeShow>
 *    );
 * };
 */
export var RealTimeShow = function (_a) {
    var children = _a.children, id = _a.id, resource = _a.resource, props = __rest(_a, ["children", "id", "resource"]);
    var notify = useNotify();
    var refresh = useRefresh();
    var translate = useTranslate();
    var _b = useState(false), deleted = _b[0], setDeleted = _b[1];
    var defaultHandleEventReceived = function (event) {
        if (event.type === EventType.Updated) {
            refresh();
            notify('ra-realtime.notification.record.updated');
        }
        else if (event.type === EventType.Deleted) {
            setDeleted(true);
        }
    };
    var _c = props.onEventReceived, onEventReceived = _c === void 0 ? defaultHandleEventReceived : _c, rest = __rest(props, ["onEventReceived"]);
    useSubscribeToRecord(resource, id, onEventReceived);
    return (React.createElement(React.Fragment, null,
        React.createElement(Collapse, { in: deleted }, deleted && (React.createElement(Warning, { message: translate('ra-realtime.notification.record.deleted') }))),
        React.createElement(Show, __assign({ resource: resource, id: id }, rest), children)));
};
