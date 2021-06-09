"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var core_1 = require("@material-ui/core");
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
    return (React.createElement(core_1.Stepper, { activeStep: currentStep }, steps.map(function (step, index) {
        var label = React.cloneElement(step, { intent: 'label' });
        return (React.createElement(core_1.Step, { key: "step_" + index }, !onStepClick ? (React.createElement(core_1.StepLabel, null, label)) : (React.createElement(core_1.StepButton, { onClick: handleStepClick(index) }, label))));
    })));
};
WizardFormProgress.defaultProps = {
    currentStep: 0,
    steps: [],
};
exports.default = WizardFormProgress;
