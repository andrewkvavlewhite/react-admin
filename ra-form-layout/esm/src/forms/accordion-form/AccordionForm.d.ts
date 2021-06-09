import { ReactElement, HtmlHTMLAttributes } from 'react';
import { FormProps } from 'react-final-form';
import { Record, RedirectionSideEffect } from 'react-admin';
/**
 * Form component rendering a list of <Accordion> components.
 *
 * Alternative to <SimpleForm>, to be used as child of <Create> or <Edit>.
 * Expects <AccordionFormPanel> elements as children.
 *
 * @param {boolean} autoClose If true, opening an accordion will close the others. Defaults to false.
 * @param {ReactElement} toolbar An alternative toolbar element (to customize form buttons)
 *
 * @example
 *
 * import { Edit, TextField, TextInput, DateInput, SelectInput, ArrayInput, SimpleFormIterator, BooleanInput } from 'react-admin';
 * import { AccordionForm, AccordionFormPanel } from '@react-admin/ra-form-layout';
 *
 * // don't forget the component="div" prop on the main component to disable the main Card
 * const CustomerEdit: FC = props => (
 *     <Edit {...props} component="div">
 *         <AccordionForm>
 *             <AccordionFormPanel label="Identity" defaultExpanded>
 *                 <TextField source="id" />
 *                 <TextInput source="first_name" validate={required()} />
 *                 <TextInput source="last_name" validate={required()} />
 *                 <DateInput source="dob" label="born" validate={required()} />
 *                 <SelectInput source="sex" choices={sexChoices} />
 *             </AccordionFormPanel>
 *             <AccordionFormPanel label="Occupations">
 *                 <ArrayInput source="occupations" label="">
 *                     <SimpleFormIterator>
 *                         <TextInput source="name" validate={required()} />
 *                         <DateInput source="from" validate={required()} />
 *                         <DateInput source="to" />
 *                     </SimpleFormIterator>
 *                 </ArrayInput>
 *             </AccordionFormPanel>
 *             <AccordionFormPanel label="Preferences">
 *                 <SelectInput
 *                     source="language"
 *                     choices={languageChoices}
 *                     defaultValue="en"
 *                 />
 *                 <BooleanInput source="dark_theme" />
 *                 <BooleanInput source="accepts_emails_from_partners" />
 *             </AccordionFormPanel>
 *         </AccordionForm>
 *     </Edit>
 * );
 */
declare const AccordionForm: (props: AccordionFormProps) => JSX.Element;
export interface AccordionFormProps extends Omit<FormProps, 'onSubmit'>, Omit<HtmlHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'children'> {
    autoClose?: boolean;
    basePath?: string;
    className?: string;
    initialValues?: any;
    margin?: 'none' | 'normal' | 'dense';
    record?: Record;
    redirect?: RedirectionSideEffect;
    resource?: string;
    sanitizeEmptyValues?: boolean;
    save?: (data: Partial<Record>, redirectTo: RedirectionSideEffect, options?: {
        onSuccess?: (data?: any) => void;
        onFailure?: (error: any) => void;
    }) => void;
    saving?: boolean;
    submitOnEnter?: boolean;
    toolbar?: ReactElement;
    undoable?: boolean;
    variant?: 'standard' | 'outlined' | 'filled';
    version?: number;
    warnWhenUnsavedChanges?: boolean;
}
export default AccordionForm;
