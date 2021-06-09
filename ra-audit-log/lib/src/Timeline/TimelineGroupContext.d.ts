/// <reference types="react" />
import { EventRecord } from '../types';
/**
 * Context which stores the data for a single group of audit logs.
 * Use the useTimelineGroup() hook to read the context.
 * @see useTimelineGroup
 * @see Timeline
 */
export declare const TimelineGroupContext: import("react").Context<any>;
export interface TimelineGroupContextValue {
    label: string;
    records: EventRecord[];
}
