"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var TourProvider_1 = require("./TourProvider");
/**
 * Hook that handles the tour
 *
 * @returns {[StateType, DispatchStateType]} Current tour state, Tour control functions
 *
 * @example // Accessing tour state
 *
 * import { useTour } from '@react-admin/ra-tour';
 * import tours from './tours';
 *
 * const StepIndicator = () => {
 *     const [{ running, stepIndex, activeTour }] = useTour();
 *     return (
 *         <span>Step ${stepIndex} / ${tours[activeTour].steps.length}</span>
 *     );
 * };
 *
 * @example // Controlling tour
 *
 * import { useTour } from '@react-admin/ra-tour';
 *
 * const StartTourButton = ({ tourName }) => {
 *     const [_, { start, stop, next, previous }] = useTour();
 *     return (
 *         <button onClick={() => start(tourName)}>HELP</button>
 *     );
 * };
 */
var useTour = function () {
    var stateContextHook = react_1.useContext(TourProvider_1.StateContext);
    var dispatchContextHook = react_1.useContext(TourProvider_1.DispatchContext);
    if (dispatchContextHook === undefined || stateContextHook === undefined) {
        throw new Error('useTour must be used within a TourProvider');
    }
    return [stateContextHook, dispatchContextHook];
};
exports.default = useTour;
