import React, { FC } from 'react';
import Joyride from 'react-joyride';
import { ErrorBoundary } from 'react-error-boundary';

import useTour from './useTour';
import Tooltip from './ui/Tooltip';
import { TourType } from './types';

interface Props {
    joyrideProps?: any;
    tours: { [id: string]: TourType };
}

interface ErrorFallbackProps {
    error?: any;
    componentStack?: any;
    resetErrorBoundary?: any;
}

const ErrorFallback: FC<ErrorFallbackProps> = ({
    error,
    componentStack,
    resetErrorBoundary,
}) => {
    process.env.NODE_ENV !== 'production' &&
        console.warn('Joyride error', {
            error,
            componentStack,
            resetErrorBoundary,
        });
    return null;
};

/**
 * Component that handles the UI part of the tour.
 *
 * Uses react-joyride
 *
 * @param {TourType} tours List of supported tours
 * @param {any} joyrideProps Props passed down to react-joyride
 */
const Tour: FC<Props> = ({ tours, joyrideProps }) => {
    const [{ running, stepIndex, activeTour }, { stop }] = useTour();

    if (!activeTour) {
        return null;
    }

    const { steps } = tours[activeTour];

    if (!running) {
        return null;
    }

    const stepJoyrideProps = steps[stepIndex]
        ? steps[stepIndex].joyrideProps
        : {};

    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error: Error, componentStack: string): void => {
                process.env.NODE_ENV !== 'production' &&
                    console.warn('Joyride error', { error, componentStack });
            }}
            onReset={(): void => {
                stop();
            }}
        >
            <Joyride
                showProgress
                showSkipButton
                disableCloseOnEsc
                disableOverlayClose
                spotlightClicks
                tooltipComponent={Tooltip}
                {...joyrideProps}
                {...stepJoyrideProps}
                steps={steps}
                run={true}
                stepIndex={stepIndex}
                continuous
            />
        </ErrorBoundary>
    );
};

export default Tour;
