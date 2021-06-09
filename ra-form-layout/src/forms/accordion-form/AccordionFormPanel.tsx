import * as React from 'react';
import { useState, ReactElement, ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
    FormGroupContextProvider,
    FormInput,
    Record,
    useFormGroup,
    useTranslate,
} from 'react-admin';
import { useFormState } from 'react-final-form';

/**
 * Renders children (Inputs) inside a material-ui <Accordion> element.
 *
 * To be used as child of an <AccordionForm> element.
 *
 * @param {string} label The main label used as the accordion summary. Appears in red when the accordion has errors
 * @param {string} secondary Optional. The secondary label used as the accordion summary
 * @param {boolean} defaultExpanded Optional. Set to true to have the accordion expanded by default (except if autoClose = true on the parent)
 * @param {boolean} disabled Optional. If true, the accordion will be displayed in a disabled state.
 * @param {boolean} square Optional. If true, rounded corners are disabled.
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
const AccordionFormPanel = (props: AccordionFormPanelProps) => {
    return (
        <FormGroupContextProvider name={props.label}>
            <AccordionFormPanelView {...props} />
        </FormGroupContextProvider>
    );
};

const AccordionFormPanelView = (props: AccordionFormPanelProps) => {
    const {
        children,
        defaultExpanded = false,
        disabled = false,
        label,
        secondary,
        square,
        // injected by the parent
        autoClose = false,
        basePath,
        margin,
        onChange,
        record,
        resource,
        expanded,
        variant,
    } = props;
    const classes = useStyles();
    const [innerExpanded, setExpanded] = useState<boolean>(defaultExpanded);

    const handleChange = (): void => {
        setExpanded(expanded => !expanded);
    };

    const accordionParams = autoClose
        ? {
              expanded,
              onChange,
          }
        : {
              expanded: innerExpanded,
              onChange: handleChange,
          };

    const translate = useTranslate();
    const formGroup = useFormGroup(label);
    const { submitFailed } = useFormState(UseFormStateOptions);
    const hasErrors = formGroup.invalid && (formGroup.touched || submitFailed);

    return (
        <Accordion {...accordionParams} disabled={disabled} square={square}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${label}-content`}
                id={`panel-${label}-header`}
            >
                <Typography
                    color={hasErrors ? 'error' : 'initial'}
                    className={classes.heading}
                >
                    {translate(label, { _: label })}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                    {secondary && translate(secondary, { _: secondary })}
                </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.detail}>
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
            </AccordionDetails>
        </Accordion>
    );
};

export interface AccordionFormPanelProps {
    children: ReactNode;
    defaultExpanded?: boolean;
    disabled?: boolean;
    label: string;
    secondary?: string;
    square?: boolean;
    // injected by the parent
    autoClose?: boolean;
    basePath?: string;
    margin?: 'none' | 'normal' | 'dense';
    onChange?: () => void;
    record?: Record;
    resource?: string;
    expanded?: boolean;
    variant?: 'standard' | 'outlined' | 'filled';
}

const UseFormStateOptions = {
    subscription: {
        submitFailed: true,
    },
};

const useStyles = makeStyles(
    theme => ({
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        detail: {
            display: 'block',
        },
    }),
    {
        name: 'RaAccordionFormPanel',
    }
);

export default AccordionFormPanel;
