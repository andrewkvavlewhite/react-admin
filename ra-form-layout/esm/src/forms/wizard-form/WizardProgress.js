import * as React from 'react';
import { Stepper, StepButton, StepLabel, Step } from '@material-ui/core';
/**
 * Progress component rendering a stepper on top of the wizard
 *
 * @prop {number} currentStep Current selected step index
 * @prop {Function} onStepClick Action called when a step is clicked
 * @prop {React.ReactElement[]} steps Array of step elements
 */
var WizardFormProgress = function (_a) {
    var currentStep = _a.currentStep, onStepClick = _a.onStepClick, steps = _a.steps;
    var handleStepClick = function (index) { return function () { return onStepClick(index); }; };
    return (React.createElement(Stepper, { activeStep: currentStep }, steps.map(function (step, index) {
        var label = React.cloneElement(step, { intent: 'label' });
        return (React.createElement(Step, { key: "step_" + index }, !onStepClick ? (React.createElement(StepLabel, null, label)) : (React.createElement(StepButton, { onClick: handleStepClick(index) }, label))));
    })));
};
WizardFormProgress.defaultProps = {
    currentStep: 0,
    steps: [],
};
export default WizardFormProgress;
