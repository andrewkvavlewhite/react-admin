import * as React from 'react';
import { FC, ReactElement } from 'react';
import { FormInput, Record } from 'react-admin';

export interface WizardFormStepProps {
    basePath?: string;
    record?: Record;
    resource?: string;
    variant?: 'standard' | 'outlined' | 'filled';
    margin?: 'none' | 'normal' | 'dense';
    intent?: 'step' | 'label';
    label: string;
}

/**
 * Renders children (Inputs) or a step label according to the passed `intent` prop thanks to the React Multipass pattern
 * @see https://marmelab.com/blog/2018/10/18/react-render-context-pattern.html
 *
 * To be used as child of an <WizardForm> element.
 *
 * @param {string} basePath Optional.
 * @param {Record} record Optional.
 * @param {string} resource Optional.
 * @param {string} variant Optional.
 * @param {margin} margin Optional.
 * @param {intent} intent Optional. "step" for step inputs display or "label" for step label display
 * @param {string} label Optional. Label of the step (used inside the stepper)
 */
const WizardFormStep: FC<WizardFormStepProps> = ({
    basePath,
    record,
    resource,
    variant,
    margin,
    children,
    intent,
    label,
}) => {
    if (intent === 'label') {
        return <span>{label}</span>;
    }

    return (
        <>
            {React.Children.map(
                children,
                (input: ReactElement) =>
                    input && (
                        <FormInput
                            basePath={basePath}
                            input={input}
                            record={record}
                            resource={resource}
                            variant={input.props.variant || variant}
                            margin={input.props.margin || margin}
                        />
                    )
            )}
        </>
    );
};

export default WizardFormStep;
