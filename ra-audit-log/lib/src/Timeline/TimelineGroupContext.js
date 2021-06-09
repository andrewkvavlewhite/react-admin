"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineGroupContext = void 0;
var react_1 = require("react");
/**
 * Context which stores the data for a single group of audit logs.
 * Use the useTimelineGroup() hook to read the context.
 * @see useTimelineGroup
 * @see Timeline
 */
exports.TimelineGroupContext = react_1.createContext(undefined);
