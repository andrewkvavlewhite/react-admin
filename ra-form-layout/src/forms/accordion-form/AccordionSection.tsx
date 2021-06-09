import * as React from 'react';
import { ComponentType, useState, ReactElement, FC } from 'react';
import classnames from 'classnames';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormInput, useTranslate, ClassesOverride } from 'react-admin';
import { useForm } from 'react-final-form';
import get from 'lodash/get';
import {
    Accordion as MuiAccordion,
    AccordionDetails as MuiAccordionDetails,
    AccordionSummary as MuiAccordionSummary,
    AccordionProps,
    AccordionDetailsProps,
    AccordionSummaryProps,
    Typography,
} from '@material-ui/core';
import { withStyles, makeStyles, Theme } from '@material-ui/core/styles';

const DefaultAccordion = withStyles(theme => ({
    root: {
        width: theme.spacing(55),
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded:last-child': {
            marginBottom: theme.spacing(2),
        },
    },
    expanded: {},
}))(MuiAccordion);

const DefaultAccordionSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const DefaultAccordionDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

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
const AccordionSection: FC<AccordionSectionProps> = props => {
    const {
        Accordion = DefaultAccordion,
        AccordionDetails = DefaultAccordionDetails,
        AccordionSummary = DefaultAccordionSummary,
        children,
        className,
        defaultExpanded = false,
        disabled = false,
        fullWidth = false,
        label,
        secondary,
        square,
        TransitionComponent,
        TransitionProps,
        // injected by the parent
        basePath,
        margin,
        record,
        resource,
        variant,
        ...rest
    } = props;
    const classes = useStyles(props);
    const [expanded, setExpanded] = useState<boolean>(defaultExpanded);
    const translate = useTranslate();
    const form = useForm();

    const handleChange = (): void => {
        setExpanded(expanded => !expanded);
    };
    const hasErrors = hasInputsWithError(children, form.getState().errors);

    return (
        <Accordion
            {...rest}
            expanded={expanded}
            onChange={handleChange}
            disabled={disabled}
            square={square}
            className={classnames(className, classes.root, {
                [classes.fullWidth]: fullWidth,
            })}
            TransitionComponent={TransitionComponent}
            TransitionProps={TransitionProps}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${label}-content`}
                id={`panel-${label}-header`}
                className={classes.summary}
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

AccordionSection.defaultProps = {
    classes: {},
};

export const hasInputsWithError = (
    children: React.ReactNode,
    errors: unknown
): boolean =>
    React.Children.toArray(children).some(
        input => React.isValidElement(input) && get(errors, input.props.source)
    );

const useStyles = makeStyles(
    (theme: Theme) => ({
        root: {},
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        summary: {},
        detail: {
            display: 'block',
        },
        fullWidth: {
            width: '100%',
        },
    }),
    {
        name: 'RaAccordionSection',
    }
);

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
