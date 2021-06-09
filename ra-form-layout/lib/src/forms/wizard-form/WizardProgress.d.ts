import * as React from 'react';
import { FC } from 'react';
export declare type WizardFormProgressProps = {
    currentStep?: number;
    onStepClick?: (index: number) => void;
    steps?: React.ReactElement[];
};
/**
 * Progress component rendering a stepper on top of the wizard
 *
 * @prop {number} currentStep Current selected step index
 * @prop {Function} onStepClick Action called when a step is clicked
 * @prop {React.ReactElement[]} steps Array of step elements
 */
declare const WizardFormProgress: FC<WizardFormProgressProps>;
export default WizardFormProgress;
