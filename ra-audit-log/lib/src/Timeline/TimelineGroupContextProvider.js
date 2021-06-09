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
exports.TimelineGroupContextProvider = void 0;
var React = __importStar(require("react"));
var TimelineGroupContext_1 = require("./TimelineGroupContext");
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
exports.TimelineGroupContextProvider = function (_a) {
    var children = _a.children, value = _a.value;
    return (React.createElement(TimelineGroupContext_1.TimelineGroupContext.Provider, { value: value }, children));
};
