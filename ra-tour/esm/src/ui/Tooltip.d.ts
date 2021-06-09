import { FC, ReactElement } from 'react';
interface Props {
    tooltipProps: any;
    backProps: any;
    closeProps: any;
    continuous: boolean;
    index: number;
    isLastStep: boolean;
    primaryProps: any;
    skipProps: any;
    step: Step;
}
declare type Step = {
    content: ReactElement;
    hideBackButton: boolean;
    locale: Locale;
    showSkipButton: boolean;
    title: ReactElement;
    styles: any;
};
declare type Locale = {
    back: string;
    close: string;
    last: string;
    next: string;
    skip: string;
};
/**
 * Tooltip UI Component that displays one step of a tour
 *
 * @param {Step} step The step to display
 * @param {number} index The index of the step within its tour
 * @param {boolean} isLastStep True if the current step is the last step of its tour
 * @param {boolean} continuous If true, clicking next on last step brings back to first step
 * @param {Object} tooltipProps Props passed down to the tooltip container
 * @param {Object} backProps Props passed down to the back button container
 * @param {Object} closeProps Props passed down to the close button container
 * @param {Object} primaryProps Props passed down to the primary button (next/last) container
 * @param {Object} skipProps Props passed down to the skip button container
 */
declare const Tooltip: FC<Props>;
export default Tooltip;
