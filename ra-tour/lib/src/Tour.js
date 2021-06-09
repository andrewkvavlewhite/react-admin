"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_joyride_1 = __importDefault(require("react-joyride"));
var react_error_boundary_1 = require("react-error-boundary");
var useTour_1 = __importDefault(require("./useTour"));
var Tooltip_1 = __importDefault(require("./ui/Tooltip"));
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
    var _b = useTour_1.default(), _c = _b[0], running = _c.running, stepIndex = _c.stepIndex, activeTour = _c.activeTour, stop = _b[1].stop;
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
    return (react_1.default.createElement(react_error_boundary_1.ErrorBoundary, { FallbackComponent: ErrorFallback, onError: function (error, componentStack) {
            process.env.NODE_ENV !== 'production' &&
                console.warn('Joyride error', { error: error, componentStack: componentStack });
        }, onReset: function () {
            stop();
        } },
        react_1.default.createElement(react_joyride_1.default, __assign({ showProgress: true, showSkipButton: true, disableCloseOnEsc: true, disableOverlayClose: true, spotlightClicks: true, tooltipComponent: Tooltip_1.default }, joyrideProps, stepJoyrideProps, { steps: steps, run: true, stepIndex: stepIndex, continuous: true }))));
};
exports.default = Tour;
