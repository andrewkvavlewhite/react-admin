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
exports.RealTimeList = void 0;
var React = __importStar(require("react"));
var react_admin_1 = require("react-admin");
var inflection_1 = __importDefault(require("inflection"));
var get_1 = __importDefault(require("lodash/get"));
var ra_realtime_1 = require("@react-admin/ra-realtime");
var List_1 = require("./List");
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
exports.RealTimeList = function (_a) {
    var children = _a.children, resource = _a.resource, props = __rest(_a, ["children", "resource"]);
    var notify = react_admin_1.useNotify();
    var refresh = react_admin_1.useRefresh();
    var translate = react_admin_1.useTranslate();
    var defaultHandleEventReceived = function (event) {
        var count = get_1.default(event, 'payload.ids.length', 1);
        notify('ra-realtime.notification.list.refreshed', 'info', {
            smart_count: count,
            name: inflection_1.default.humanize(translate("resources." + resource + ".name", {
                smart_count: 1,
                _: inflection_1.default.singularize(resource),
            }), true),
            type: translate("ra-realtime.event_type." + event.type, {
                smart_count: count,
            }),
        });
        refresh();
    };
    var _b = props.onEventReceived, onEventReceived = _b === void 0 ? defaultHandleEventReceived : _b, rest = __rest(props, ["onEventReceived"]);
    ra_realtime_1.useSubscribeToRecordList(resource, onEventReceived);
    return (React.createElement(List_1.List, __assign({ resource: resource }, rest), children));
};