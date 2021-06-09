import { ReactElement, ReactNode } from 'react';
import { TimelineGroupContextValue } from './TimelineGroupContext';
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
export declare const TimelineGroupContextProvider: ({ children, value, }: {
    children: ReactNode;
    value: TimelineGroupContextValue;
}) => ReactElement;
