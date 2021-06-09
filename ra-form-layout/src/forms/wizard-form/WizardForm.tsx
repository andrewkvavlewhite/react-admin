import * as React from 'react';
import { FC, useState, HtmlHTMLAttributes, KeyboardEvent } from 'react';
import classnames from 'classnames';
import { CardContentInner, FormWithRedirect } from 'react-admin';
import { FormProps } from 'react-final-form';

import WizardProgress from './WizardProgress';
import WizardToolbar from './WizardToolbar';

/**
 * Form component rendering a wizard form with stepper
 *
 * Alternative to <SimpleForm>, to be used as child of <Create>.
 * Expects <WizardFormStep> elements as children.
 *
 * @param {ComponentType} toolbar An alternative toolbar element (to customize form buttons)
 * @param {ComponentType} progress An alternative progress bar element (to customize stepper)
 *
 * @example
 *
 * import React, { FC } from 'react';
 * import { Create, TextInput, required } from 'react-admin';
 * import { WizardForm, WizardFormStep } from '@react-admin/ra-form-layout';
 *
 * const PostCreate: FC = props => (
 *   <Create {...props}>
 *       <WizardForm>
 *           <WizardFormStep label="First step">
 *               <TextInput source="title" validate={required()} />
 *           </WizardFormStep>
 *           <WizardFormStep label="Second step">
 *               <TextInput source="description" />
 *           </WizardFormStep>
 *           <WizardFormStep label="Third step">
 *               <TextInput source="fullDescription" validate={required()} />
 *           </WizardFormStep>
 *       </WizardForm>
 *   </Create>
 * );
 */
const WizardForm: FC<any> = props => (
    <FormWithRedirect
        {...props}
        render={(formProps): React.ReactElement => (
            <WizardFormView {...formProps} />
        )}
    />
);

const WizardFormView: FC<any> = ({
    basePath,
    children,
    className,
    handleSubmit,
    handleSubmitWithRedirect,
    invalid,
    pristine,
    redirect,
    saving,
    submitOnEnter = true,
    toolbar = WizardToolbar,
    progress = WizardProgress,
    ...rest
}) => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        e.preventDefault();
        setCurrentStep(step => step + 1);
    };

    const handlePrevious = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        e.preventDefault();
        setCurrentStep(step => step - 1);
    };

    // We can't go forward using the progress stepper
    // So we don't need extra checks here
    const handleIndexNavigation = (index: number): void => {
        setCurrentStep(index);
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLFormElement>): void => {
        if (
            event.key === 'Enter' &&
            // @ts-ignore
            typeof event.target.tagName !== 'undefined' &&
            // @ts-ignore
            event.target.tagName !== 'button'
        ) {
            // Even if we don't have a next step, we should prevent the default form submit
            // in case users have set the submitOnEnter prop.
            event.preventDefault();
            if (hasNextStep) {
                setCurrentStep(step => step + 1);
            }
        }
    };

    const steps = React.Children.toArray(children);

    const hasPreviousStep = currentStep > 0;
    const hasNextStep = currentStep < steps.length - 1;

    return (
        <>
            {React.createElement(progress, {
                steps,
                currentStep,
                onStepClick: handleIndexNavigation,
            })}
            {/* eslint-disable-next-line */}
            <form
                className={classnames('wizard-form', className)}
                onKeyPress={handleKeyPress}
                {...sanitizeRestProps(rest)}
            >
                <CardContentInner>
                    {React.cloneElement(
                        steps[currentStep] as React.ReactElement,
                        rest
                    )}
                </CardContentInner>
                {toolbar &&
                    React.createElement(toolbar, {
                        hasNextStep,
                        hasPreviousStep,
                        onNextClick: handleNext,
                        onPreviousClick: handlePrevious,
                        invalid,
                        handleSubmit,
                        handleSubmitWithRedirect,
                        pristine,
                        redirect,
                        saving,
                        submitOnEnter,
                    })}
            </form>
        </>
    );
};

const sanitizeRestProps = ({
    active,
    dirty,
    dirtyFields,
    dirtyFieldsSinceLastSubmit,
    dirtySinceLastSubmit,
    error,
    errors,
    form,
    hasSubmitErrors,
    hasValidationErrors,
    initialValues,
    modified,
    modifiedSinceLastSubmit,
    save,
    submitError,
    submitErrors,
    submitFailed,
    submitSucceeded,
    submitting,
    touched,
    valid,
    validating,
    values,
    visited,
    __versions,
    ...props
}): any => props;

export interface WizardFormProps
    extends Omit<FormProps, 'onSubmit'>,
        Omit<HtmlHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children'> {
    progress?: React.ComponentType;
    toolbar?: React.ComponentType;
}

export default WizardForm;
