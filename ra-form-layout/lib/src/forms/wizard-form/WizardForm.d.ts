import * as React from 'react';
import { FC, HtmlHTMLAttributes } from 'react';
import { FormProps } from 'react-final-form';
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
declare const WizardForm: FC<any>;
export interface WizardFormProps extends Omit<FormProps, 'onSubmit'>, Omit<HtmlHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children'> {
    progress?: React.ComponentType;
    toolbar?: React.ComponentType;
}
export default WizardForm;
