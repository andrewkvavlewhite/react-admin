import { useContext } from 'react';
import { StateContext, DispatchContext } from './TourProvider';
import { StateType, DispatchStateType } from './types';

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

const useTour = (): [StateType, DispatchStateType] => {
    const stateContextHook = useContext<StateType>(StateContext);
    const dispatchContextHook = useContext<DispatchStateType>(DispatchContext);
    if (dispatchContextHook === undefined || stateContextHook === undefined) {
        throw new Error('useTour must be used within a TourProvider');
    }
    return [stateContextHook, dispatchContextHook];
};

export default useTour;
