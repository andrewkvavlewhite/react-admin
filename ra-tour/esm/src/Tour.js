var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import Joyride from 'react-joyride';
import { ErrorBoundary } from 'react-error-boundary';
import useTour from './useTour';
import Tooltip from './ui/Tooltip';
var ErrorFallback = function (_a) {
    var error = _a.error, componentStack = _a.componentStack, resetErrorBoundary = _a.resetErrorBoundary;
    process.env.NODE_ENV !== 'production' &&
        console.warn('Joyride error', {
            error: error,
            componentStack: componentStack,
            resetErrorBoundary: resetErrorBoundary,
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
var Tour = function (_a) {
    var tours = _a.tours, joyrideProps = _a.joyrideProps;
    var _b = useTour(), _c = _b[0], running = _c.running, stepIndex = _c.stepIndex, activeTour = _c.activeTour, stop = _b[1].stop;
    if (!activeTour) {
        return null;
    }
    var steps = tours[activeTour].steps;
    if (!running) {
        return null;
    }
    var stepJoyrideProps = steps[stepIndex]
        ? steps[stepIndex].joyrideProps
        : {};
    return (React.createElement(ErrorBoundary, { FallbackComponent: ErrorFallback, onError: function (error, componentStack) {
            process.env.NODE_ENV !== 'production' &&
                console.warn('Joyride error', { error: error, componentStack: componentStack });
        }, onReset: function () {
            stop();
        } },
        React.createElement(Joyride, __assign({ showProgress: true, showSkipButton: true, disableCloseOnEsc: true, disableOverlayClose: true, spotlightClicks: true, tooltipComponent: Tooltip }, joyrideProps, stepJoyrideProps, { steps: steps, run: true, stepIndex: stepIndex, continuous: true }))));
};
export default Tour;
