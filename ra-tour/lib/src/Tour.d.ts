import { FC } from 'react';
import { TourType } from './types';
interface Props {
    joyrideProps?: any;
    tours: {
        [id: string]: TourType;
    };
}
/**
 * Component that handles the UI part of the tour.
 *
 * Uses react-joyride
 *
 * @param {TourType} tours List of supported tours
 * @param {any} joyrideProps Props passed down to react-joyride
 */
declare const Tour: FC<Props>;
export default Tour;
