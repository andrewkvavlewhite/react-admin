import * as React from 'react';
import { ComponentType, FC } from 'react';
import { ClassesOverride } from 'react-admin';
import { AccordionProps, AccordionDetailsProps, AccordionSummaryProps } from '@material-ui/core';
/**
 * Renders children (Inputs) inside a material-ui <Accordion> element without a Card style.
 *
 * To be used as child of a <SimpleForm> or a <TabbedForm> element.
 *
 * @param {string} label The main label used as the accordion summary. Appears in red when the accordion has errors
 * @param {string} secondary Optional. The secondary label used as the accordion summary
 * @param {boolean} fullWidth Optional. If true, the Accordion take sthe entire form width.
 * @param {string} className Optional. A class name to style the underlying <Accordion>.
 * @param {object} classes Optional. Override styles of the <Accordion>, the <AccordionSummary> and the <AccordionDetails> internal components.
 * @param {boolean} defaultExpanded Optional. Set to true to have the accordion expanded by default.
 * @param {boolean} disabled Optional. If true, the accordion will be displayed in a disabled state.
 * @param {boolean} square Optional. If true, rounded corners are disabled.
 * @param {elementType} TransitionComponent Optional. If true, rounded corners are disabled.
 * @param {object} TransitionProps Optional. If true, rounded corners are disabled.
 *
 * @example
 *
 * import { Edit, TextField, TextInput, DateInput, SelectInput, ArrayInput, SimpleForm, SimpleFormIterator, BooleanInput } from 'react-admin';
 * import { AccordionSection } from '@react-admin/ra-form-layout';
 *
 * const CustomerEdit: FC = props => (
 *     <Edit {...props} component="div">
 *         <SimpleForm>
 *             <TextField source="id" />
 *             <TextInput source="first_name" validate={required()} />
 *             <TextInput source="last_name" validate={required()} />
 *             <DateInput source="dob" label="born" validate={required()} />
 *             <SelectInput source="sex" choices={sexChoices} />
 *             <AccordionSection label="Occupations">
 *                 <ArrayInput source="occupations" label="">
 *                     <SimpleFormIterator>
 *                         <TextInput source="name" validate={required()} />
 *                         <DateInput source="from" validate={required()} />
 *                         <DateInput source="to" />
 *                     </SimpleFormIterator>
 *                 </ArrayInput>
 *             </AccordionSection>
 *             <AccordionSection label="Preferences">
 *                 <SelectInput
 *                     source="language"
 *                     choices={languageChoices}
 *                     defaultValue="en"
 *                 />
 *                 <BooleanInput source="dark_theme" />
 *                 <BooleanInput source="accepts_emails_from_partners" />
 *             </AccordionSection>
 *         </SimpleFormForm>
 *     </Edit>
 * );
 *
 */
declare const AccordionSection: FC<AccordionSectionProps>;
export declare const hasInputsWithError: (children: React.ReactNode, errors: unknown) => boolean;
declare const useStyles: (props?: any) => Record<"root" | "summary" | "fullWidth" | "heading" | "secondaryHeading" | "detail", string>;
export interface AccordionSectionProps extends Omit<AccordionProps, 'classes'> {
    Accordion?: ComponentType<AccordionProps>;
    AccordionDetails?: ComponentType<AccordionDetailsProps>;
    AccordionSummary?: ComponentType<AccordionSummaryProps>;
    label?: string;
    secondary?: string;
    fullWidth?: boolean;
    basePath?: any;
    margin?: any;
    record?: any;
    resource?: any;
    variant?: any;
    classes?: ClassesOverride<typeof useStyles>;
}
export default AccordionSection;
