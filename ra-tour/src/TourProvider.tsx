import React, { FC, useReducer, createContext, ReactElement } from 'react';

import Tour from './Tour';
import { TourType, StateType, DispatchStateType } from './types';

import reducer from './reducer';

export const StateContext = createContext<StateType>({
    running: false,
    stepIndex: 0,
    activeTour: null,
} as StateType);

export const DispatchContext = createContext<DispatchStateType>({});

interface Props {
    tours: { [id: string]: TourType };
    tools?: any;
    joyrideProps?: any;
    initialState?: StateType;
    children: ReactElement;
}

/**
 * Wait until getter returns something not null, tries every {interval}ms for {maxTries} times.
 *
 * @param {() => any} getter Function to call repetively
 * @param {number} interval Time between each function call in ms. Defaults to 100.
 * @param {number} maxTries Maximum number of function call before failing. Defaults to 10.
 *
 * @returns {any} What getter returns
 */
const waitAndReturn = (
    getter: () => any,
    interval = 100,
    maxTries = 10
): Promise<any> => {
    return new Promise((resolve, reject) => {
        let iterations: number;
        iterations = 0;
        const getterInterval = setInterval(() => {
            const result = getter();
            iterations++;
            if (result) {
                clearInterval(getterInterval);
                resolve(result);
            }
            if (iterations > maxTries) {
                reject();
            }
        }, interval);
    });
};

/**
 * A provider that handles tour logic and injects UI
 *
 * @example
 *   import tours from './tours';
 *
 *   const MyLayout: FC = props => (
 *       <TourProvider
 *           tours={tours}
 *       >
 *           <Layout {...props} />
 *       </TourProvider>
 *   );
 *
 * @param {{ [id: string]: TourType }} tours List of supported tours
 * @param {Object} tools Tools to be injected into before and after functions
 * @param {StateType} initialState State the tour should be initialized to
 * @param {any} joyrideProps Props passed down to react-joyride
 */
const TourProvider: FC<Props> = ({
    tours = {},
    tools = {},
    joyrideProps = {},
    initialState,
    children,
}): ReactElement => {
    const [state, dispatch] = useReducer(
        reducer,
        initialState || {
            running: false,
            stepIndex: 0,
            activeTour: null,
        }
    );

    const actions = {
        start: async (tour: string): Promise<void> => {
            const { before } = tours[tour];
            if (before) {
                await before({ ...tools, state: { ...state } });
            }

            const step = tours[tour].steps[0];
            const { before: stepBefore } = step;
            const target = await waitAndReturn(() =>
                document.querySelector(step.target)
            );
            if (stepBefore) {
                await stepBefore({ ...tools, state: { ...state }, target });
            }

            dispatch({ type: 'start', payload: { tour } });
        },
        stop: async (): Promise<void> => {
            const step = tours[state.activeTour].steps[state.stepIndex];
            const { after: stepAfter } = step;
            const target = await waitAndReturn(() =>
                document.querySelector(step.target)
            );
            if (stepAfter) {
                dispatch({ type: 'pause' });
                await stepAfter({ ...tools, state: { ...state }, target });
            }

            const { after: globalAfter } = tours[state.activeTour];
            if (globalAfter) {
                await globalAfter({ ...tools, state: { ...state } });
            }
            dispatch({ type: 'stop' });
        },
        cancel: async (): Promise<void> => {
            const { after: globalAfter } = tours[state.activeTour];
            if (globalAfter) {
                await globalAfter({ ...tools, state: { ...state } });
            }
            dispatch({ type: 'stop' });
        },
        next: async (): Promise<void> => {
            const step = tours[state.activeTour].steps[state.stepIndex];
            const { after } = step;
            const target = await waitAndReturn(() =>
                document.querySelector(step.target)
            );
            if (after) {
                dispatch({ type: 'pause' });
                await after({ ...tools, state: { ...state }, target });
            }

            // if there's a next step
            if (tours[state.activeTour].steps.length > state.stepIndex + 1) {
                dispatch({ type: 'pause' });
                const nextStep =
                    tours[state.activeTour].steps[state.stepIndex + 1];
                const { before } = nextStep;
                const nextTarget = await waitAndReturn(() =>
                    document.querySelector(nextStep.target)
                );
                if (before) {
                    await before({
                        ...tools,
                        state: { ...state, stepIndex: state.stepIndex + 1 },
                        target: nextTarget,
                    });
                }
            }
            dispatch({ type: 'next' });
        },
        previous: async (): Promise<void> => {
            const step = tours[state.activeTour].steps[state.stepIndex];
            const { after } = step;
            const target = await waitAndReturn(() =>
                document.querySelector(step.target)
            );
            if (after) {
                dispatch({ type: 'pause' });
                await after({ ...tools, state: { ...state }, target });
            }

            // if there's an previous step
            if (state.stepIndex - 1 >= 0) {
                dispatch({ type: 'pause' });
                const previousStep =
                    tours[state.activeTour].steps[state.stepIndex - 1];
                const { before } = previousStep;
                const previousTarget = await waitAndReturn(() =>
                    document.querySelector(previousStep.target)
                );
                if (before) {
                    await before({
                        ...tools,
                        state: { ...state, stepIndex: state.stepIndex - 1 },
                        target: previousTarget,
                    });
                }
            }

            dispatch({ type: 'previous' });
        },
    };

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={actions}>
                <Tour joyrideProps={joyrideProps} tours={tours} />
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};

export default TourProvider;
