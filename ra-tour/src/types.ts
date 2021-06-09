import { ReactNode } from 'react';

/**
 * Type of tour reducer actions
 */
export type ActionType = {
    type: 'start' | 'stop' | 'next' | 'previous' | 'pause';
    payload?: any;
};

/**
 * Type of the tour mechanism control functions
 */
export type DispatchStateType = {
    start?: (tour: string) => void;
    next?: () => void;
    stop?: () => void;
    cancel?: () => void;
    previous?: () => void;
};

/**
 * Type of a the tour mechanism state
 */
export type StateType = {
    running: boolean;
    stepIndex: number;
    activeTour?: string;
};

/**
 * Type of a single step
 */
export type StepType = {
    /**
     * Function called before the step starts.
     * @param tools: The tools passed to the TourProvider.
     * @see TourProvider
     * @returns May return a Promise.
     */
    before?: (tools?: any) => void | Promise<void>;
    /**
     * A string containing a CSS selector which will be used to get the node to highlight.
     */
    target: string;
    /**
     * A boolean indicating whether the beacon should be disabled.
     */
    disableBeacon?: boolean;
    /**
     * The name of the event which will activate the tooltip from the Joyride beacon. It has no effect if `disableBeacon` is set to `false`.
     */
    event?: 'hover' | 'click';
    /**
     * The content of the Tooltip header. Accepts a React node.
     */
    title?: ReactNode;
    /**
     * The content of the Tooltip. Accepts a React node.
     */
    content: ReactNode;
    /**
     * The Joyride options which extend and may override the Joyride options set on TourProvider.
     */
    joyrideProps?: any;
    /**
     * Function called after the step ends.
     * @param tools: The tools passed to the TourProvider.
     * @see TourProvider
     * @returns May return a Promise.
     */
    after?: (tools?: any) => void | Promise<void>;
};

/**
 * Type of a single tour
 */
export type TourType = {
    /**
     * Function called before the tour starts.
     * @param tools: The tools passed to the TourProvider.
     * @see TourProvider
     * @returns May return a Promise.
     */
    before?: (tools?: any) => void | Promise<void>;
    /**
     * The tour steps.
     * @see StepType
     */
    steps: StepType[];
    /**
     * Function called after the tour ends.
     * @param tools: The tools passed to the TourProvider.
     * @see TourProvider
     * @returns May return a Promise.
     */
    after?: (tools?: any) => void | Promise<void>;
};
