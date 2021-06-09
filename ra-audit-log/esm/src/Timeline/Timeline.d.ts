import { ReactElement, ReactNode } from 'react';
import { EventRecord } from '../types';
import { GroupLogs } from './types';
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
export declare const Timeline: (props: TimelineProps) => ReactElement;
export interface TimelineProps {
    children?: ReactNode;
    className?: string;
    groupLogs?: GroupLogs;
    loaded?: boolean;
    records?: EventRecord[];
    skeletonItems?: number;
}
