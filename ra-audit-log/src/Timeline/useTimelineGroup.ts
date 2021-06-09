import { useContext } from 'react';
import {
    TimelineGroupContext,
    TimelineGroupContextValue,
} from './TimelineGroupContext';

/**
 * Hook to read the data of an audit logs group from the TimelineGroupContext.
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
 */
export const useTimelineGroup = (): TimelineGroupContextValue => {
    const context = useContext(TimelineGroupContext);

    if (context === undefined) {
        throw new Error(
            'useTimelineGroup must be used within a TimelineGroupContextProvider'
        );
    }

    return context;
};
