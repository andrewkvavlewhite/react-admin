import { ReactElement, ReactNode } from 'react';
import { ClassesOverride } from 'react-admin';
/**
 * Default component to display a group of audit logs.
 * @see Timeline
 *
 * @example <caption>To use a custom item component</caption>
 * import { TimelineGroup } from '@react-admin/ra-audit-log';
 * import { useRecordContext } from 'react-admin';
 * import { ListItem, ListItemText } from '@material-ui/core';
 * import { getTextFromRecord } from './getTextFromRecord';
 *
 * const MyTimelineItem => {
 *     const record = useRecordContext();
 *     const label = getTextFromRecord(record);
 *
 *     return (
 *         <ListItem>
 *             <ListItemText>{label}</ListItemText>
 *         </ListItem>
 *     );
 * }
 *
 * const MyTimelineGroup = () => {
 *     return (
 *         <TimelineGroup>
 *             <MyTimelineItem />
 *         </TimelineGroup>
 *     );
 * };
 */
export declare const TimelineGroup: (props: TimelineGroupProps) => ReactElement;
declare const useStyles: (props?: any) => Record<"label" | "root" | "events", string>;
export interface TimelineGroupProps {
    children?: ReactNode;
    className?: string;
    classes?: ClassesOverride<typeof useStyles>;
}
export {};
