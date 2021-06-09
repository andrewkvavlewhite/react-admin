"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTimelineGroup = void 0;
var react_1 = require("react");
var TimelineGroupContext_1 = require("./TimelineGroupContext");
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
exports.useTimelineGroup = function () {
    var context = react_1.useContext(TimelineGroupContext_1.TimelineGroupContext);
    if (context === undefined) {
        throw new Error('useTimelineGroup must be used within a TimelineGroupContextProvider');
    }
    return context;
};
