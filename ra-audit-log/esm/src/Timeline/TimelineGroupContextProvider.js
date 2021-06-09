import * as React from 'react';
import { TimelineGroupContext, } from './TimelineGroupContext';
/**
 * Gives access to a TimelineGroupContext
 * @see TimelineGroupContext
 * @see Timeline
 *
 * @example
 * const MyTimelineGroup = () => {
 *     const { label, records } = useTimelineGroup();
 *
 *     return (
 *         <article>
 *             <h1>{label}</h1>
 *             <ul>
 *                 {records.map(record => (
 *                     <li>{JSON.stringify(record)}</li>
 *                 )}
 *             </ul>
 *         </article>
 *     );
 * }
 *
 * const MyTimeline = () => {
 *     const { loaded, ids, data } = useListContext(props);
 *     const groups = getGroups(data);
 *
 *     return (
 *         <>
 *             {groups.map(group => (
 *                 <TimelineGroupContextProvider key={group.label} value={group}>
 *                     <MyTimelineGroup />
 *                 </TimelineGroupContextProvider>
 *             ))}
 *         </>
 *     )
 * }
 */
export var TimelineGroupContextProvider = function (_a) {
    var children = _a.children, value = _a.value;
    return (React.createElement(TimelineGroupContext.Provider, { value: value }, children));
};
