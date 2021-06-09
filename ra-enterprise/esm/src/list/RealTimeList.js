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
import { useNotify, useRefresh, useTranslate } from 'react-admin';
import inflection from 'inflection';
import get from 'lodash/get';
import { useSubscribeToRecordList, } from '@react-admin/ra-realtime';
import { List } from './List';
/**
 * <List> equivalent, but with real-time updates.
 *
 * Shows a event and refreshes the page when a record is created,
 * updated, or deleted.
 *
 * @example
 *
 * import { RealTimeList } from '@react-admin/ra-realtime';
 *
 * const PostList = props => (
 *     <RealTimeList {...props}>
 *         <Datagrid>
 *             <TextField source="title" />
 *         </Datagrid>
 *     </RealTimeList>
 * );
 *
 * @example <caption>With custom side effect on new event</caption>
 *
 * import { useRefresh } from 'react-admin';
 * import { RealTimeList } from '@react-admin/ra-realtime';
 *
 * const PostList = props => {
 *     const refresh = useRefresh();
 *
 *     const handleEventReceived = (event) => {
 *         refresh();
 *     };
 *
 *     return (
 *         <RealTimeList {...props} onEventReceived={handleListEventReceived}>
 *             <Datagrid>
 *                 <TextField source="title" />
 *             </Datagrid>
 *         </RealTimeList>
 *     );
 * };
 */
export var RealTimeList = function (_a) {
    var children = _a.children, resource = _a.resource, props = __rest(_a, ["children", "resource"]);
    var notify = useNotify();
    var refresh = useRefresh();
    var translate = useTranslate();
    var defaultHandleEventReceived = function (event) {
        var count = get(event, 'payload.ids.length', 1);
        notify('ra-realtime.notification.list.refreshed', 'info', {
            smart_count: count,
            name: inflection.humanize(translate("resources." + resource + ".name", {
                smart_count: 1,
                _: inflection.singularize(resource),
            }), true),
            type: translate("ra-realtime.event_type." + event.type, {
                smart_count: count,
            }),
        });
        refresh();
    };
    var _b = props.onEventReceived, onEventReceived = _b === void 0 ? defaultHandleEventReceived : _b, rest = __rest(props, ["onEventReceived"]);
    useSubscribeToRecordList(resource, onEventReceived);
    return (React.createElement(List, __assign({ resource: resource }, rest), children));
};
