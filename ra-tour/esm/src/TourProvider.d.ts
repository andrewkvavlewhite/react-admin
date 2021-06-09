import React, { FC, ReactElement } from 'react';
import { TourType, StateType, DispatchStateType } from './types';
export declare const StateContext: React.Context<StateType>;
export declare const DispatchContext: React.Context<DispatchStateType>;
interface Props {
    tours: {
        [id: string]: TourType;
    };
    tools?: any;
    joyrideProps?: any;
    initialState?: StateType;
    children: ReactElement;
}
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
declare const TourProvider: FC<Props>;
export default TourProvider;
