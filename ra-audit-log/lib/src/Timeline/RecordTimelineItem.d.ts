import { ReactElement } from 'react';
import { ClassesOverride } from 'react-admin';
import { EventRecord } from '../types';
import { TimelineItemProps } from './TimelineItem';
/**
 * Default component to display an audit logs.
 * @see Timeline
 */
export declare const RecordTimelineItem: (props: RecordTimelineItemProps) => ReactElement;
declare const useStyles: (props?: any) => Record<"root" | "action" | "content" | "date" | "author", string>;
export interface RecordTimelineItemProps extends Omit<TimelineItemProps, 'link' | 'button'> {
    className?: string;
    classes?: ClassesOverride<typeof useStyles>;
    record?: EventRecord;
}
export {};
