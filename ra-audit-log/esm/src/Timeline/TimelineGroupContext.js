import { createContext } from 'react';
/**
 * Context which stores the data for a single group of audit logs.
 * Use the useTimelineGroup() hook to read the context.
 * @see useTimelineGroup
 * @see Timeline
 */
export var TimelineGroupContext = createContext(undefined);
