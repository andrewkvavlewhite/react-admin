import React, { FC, ReactElement } from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import useTour from '../useTour';

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

type Step = {
    content: ReactElement;
    hideBackButton: boolean;
    locale: Locale;
    showSkipButton: boolean;
    title: ReactElement;
    styles: any;
};

type Locale = {
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
const Tooltip: FC<Props> = ({
    tooltipProps,
    continuous,
    backProps,
    closeProps,
    primaryProps,
    skipProps,
    index,
    isLastStep,
    step,
}) => {
    const [_, { cancel, stop, next, previous }] = useTour();
    const {
        content,
        hideBackButton,
        locale,
        showSkipButton,
        title,
        styles,
    } = step;

    const output = {
        primary: locale.close,
        back: null,
        skip: null,
        close: null,
    };

    if (continuous) {
        if (isLastStep) {
            output.primary = locale.last;
        } else {
            output.primary = locale.next;
        }
    }

    if (showSkipButton && !isLastStep) {
        output.skip = (
            <Button
                {...skipProps}
                onClick={(): void => {
                    cancel();
                }}
                data-testid="tour-tooltip-skip-button"
            >
                {locale.skip}
            </Button>
        );
    }

    if (!hideBackButton && index > 0) {
        output.back = (
            <Button
                {...backProps}
                onClick={(): void => {
                    previous();
                }}
                data-testid="tour-tooltip-back-button"
            >
                {locale.back}
            </Button>
        );
    }

    output.close = (
        <IconButton
            {...closeProps}
            title={locale.close}
            aria-label={locale.close}
            onClick={(): void => {
                cancel();
            }}
            size="small"
            style={{ position: 'absolute', top: 10, right: 10 }}
        >
            <CloseIcon />
        </IconButton>
    );

    return (
        <div key="JoyrideTooltip" style={styles.tooltip} {...tooltipProps}>
            <div style={styles.tooltipContainer}>
                {output.close}
                {title && <h4 style={styles.tooltipTitle}>{title}</h4>}
                {content && <div style={styles.tooltipContent}>{content}</div>}
            </div>
            <div style={styles.tooltipFooter}>
                {output.skip}
                {output.back}
                <Button
                    variant="contained"
                    color="primary"
                    {...primaryProps}
                    data-testid="tour-tooltip-primary-button"
                    onClick={(): void => {
                        if (isLastStep) {
                            stop();
                            return;
                        }
                        next();
                    }}
                >
                    {output.primary}
                </Button>
            </div>
        </div>
    );
};

export default Tooltip;
