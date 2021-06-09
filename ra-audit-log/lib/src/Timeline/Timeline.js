"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeline = void 0;
var React = __importStar(require("react"));
var react_admin_1 = require("react-admin");
var groupByDay_1 = require("./groupByDay");
var TimelineGroup_1 = require("./TimelineGroup");
var TimelineGroupContextProvider_1 = require("./TimelineGroupContextProvider");
var TimelineSkeleton_1 = require("./TimelineSkeleton");
/**
 * Displays a list of events, the most recent first, grouped by day. It's the ideal component for checking the recent activity of an admin.
 *
 * @param props The component props
 * @param props.children Optional. A component which will be rendered for each group of audit logs.
 * @param props.loaded Optional. A boolean indicating whether the data has been loaded at least once.
 * @param props.records An array of the audit log records
 * @param props.skeletonItems Optional. The number of items to display in the skeleton used when data is being fetched.
 *
 * @example <caption>Basic usage</caption>
 * import { useGetList } from 'react-admin';
 * import { Timeline } from '@react-admin/ra-audit-log';
 *
 * const Dashboard = () => {
 *     const { data, ids, loaded } = useGetList(
 *         'audit-logs',
 *         { page: 1, perPage: 25 },
 *         { field: 'date', order: 'desc' },
 *     });
 *     const records = ids.map(id => data[id]);
 *
 *     return (
 *         <Timeline loaded={loaded} records={records} />
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
 * const Dashboard = () => {
 *     const { data, ids, loaded } = useGetList(
 *         'audit-logs',
 *         { page: 1, perPage: 25 },
 *         { field: 'date', order: 'desc' },
 *     });
 *     const records = ids.map(id => data[id]);
 *
 *     return (
 *         <Timeline loaded={loaded} records={records}>
 *             <MyTimelineGroup />
 *         </Timeline>
 *     );
 * }
 */
exports.Timeline = function (props) {
    var _a = props.children, children = _a === void 0 ? React.createElement(TimelineGroup_1.TimelineGroup, null) : _a, _b = props.groupLogs, groupLogs = _b === void 0 ? groupByDay_1.groupByDay : _b, loaded = props.loaded, _c = props.records, records = _c === void 0 ? [] : _c, _d = props.skeletonItems, skeletonItems = _d === void 0 ? 10 : _d;
    var locale = react_admin_1.useLocale();
    if (!loaded) {
        return React.createElement(TimelineSkeleton_1.TimelineSkeleton, { length: skeletonItems });
    }
    var groups = groupLogs(records, locale);
    return (React.createElement(React.Fragment, null, groups.map(function (group) { return (React.createElement(TimelineGroupContextProvider_1.TimelineGroupContextProvider, { key: group.label, value: group }, children)); })));
};
