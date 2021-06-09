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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordTimeline = void 0;
var React = __importStar(require("react"));
var dataProvider_1 = require("../dataProvider");
var RecordTimelineItem_1 = require("./RecordTimelineItem");
var Timeline_1 = require("./Timeline");
var TimelineGroup_1 = require("./TimelineGroup");
/**
 * Displays a list of events which targets a specific record, the most recent first, grouped by day. It's the ideal component for checking the recent activity of an admin.
 *
 * @param props The component props
 * @param props.children Optional. A component which will be rendered for each group of audit logs.
 * @param props.record Optional. The record for which to fetch the events. Will be inferred from the RecordContext if not provided
 * @param props.resource Optional. The resource of the record. Will be inferred from the ResourceContext if not provided
 * @param props.eventResource Optional. The resource for the events. Defaults to `events`
 * @param props.page Optional. The page of events to fetch. Defaults to 1
 * @param props.perPage Optional. The number of events to fetch. Defaults to 25
 * @param props.sort Optional. The field used to sort the events. Defaults to `date`
 * @param props.order Optional. The order into which to sort the events. Defaults to `DESC`
 * @param props.skeletonItems Optional. The number of items to display in the skeleton used when data is being fetched.
 *
 * @example <caption>Basic usage</caption>
 * import { Edit, SimpleForm, TextField } from 'react-admin';
 * import { RecordTimeline } from '@react-admin/ra-audit-log';
 *
 * const ProductEdit = (props) => {
 *     return (
 *         <Edit {...props} aside={<RecordTimeline />}>
 *             <SimpleForm>
 *                 <TextField source="name" />
 *             </SimpleForm>
 *         </Edit>
 *     );
 * }
 *
 * @example <caption>With custom group component</caption>
 * import { useGetList } from 'react-admin';
 * import { Timeline, useTimelineGroup } from '@react-admin/ra-audit-log';
 *
 * const MyTimelineGroup = () => {
 *     const { label, records } = useTimelineGroup();
 *
 *     return (
 *         <article>
 *             <h1>{label}</h1>
 *             <ul>
 *                 {records.map(record => (
 *                     <li>{JSON.stringify(record)}</li>
 *                 ))}
 *             </ul>
 *         </article>
 *     );
 * };
 *
 * const ProductEdit = (props) => {
 *     return (
 *         <Edit
 *             {...props}
 *             aside={<RecordTimeline><MyTimelineGroup /></RecordTimeline>}
 *         >
 *             <SimpleForm>
 *                 <TextField source="name" />
 *             </SimpleForm>
 *         </Edit>
 *     );
 * }
 */
exports.RecordTimeline = function (props) {
    var _a = dataProvider_1.useRecordEvents(props), loaded = _a.loaded, data = _a.data, ids = _a.ids;
    var page = props.page, perPage = props.perPage, sort = props.sort, order = props.order, record = props.record, resource = props.resource, rest = __rest(props, ["page", "perPage", "sort", "order", "record", "resource"]);
    return (React.createElement(Timeline_1.Timeline, __assign({ loaded: loaded, records: ids.map(function (id) { return data[id]; }) }, rest),
        React.createElement(TimelineGroup_1.TimelineGroup, null,
            React.createElement(RecordTimelineItem_1.RecordTimelineItem, null))));
};
