import { StateType, ActionType } from './types';

const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'start': {
            return {
                ...state,
                running: true,
                stepIndex: 0,
                activeTour: action.payload.tour,
            };
        }
        case 'pause': {
            return { ...state, running: false };
        }
        case 'stop': {
            return { ...state, running: false, stepIndex: 0, activeTour: null };
        }
        case 'next': {
            if (!state.activeTour) {
                return state;
            }
            return { ...state, running: true, stepIndex: state.stepIndex + 1 };
        }
        case 'previous': {
            if (!state.activeTour) {
                return state;
            }
            if (state.stepIndex - 1 < 0) {
                return state;
            }
            return { ...state, running: true, stepIndex: state.stepIndex - 1 };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

export default reducer;
