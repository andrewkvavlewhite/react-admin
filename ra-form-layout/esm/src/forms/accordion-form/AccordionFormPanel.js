var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionDetails, AccordionSummary, Typography, } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormGroupContextProvider, FormInput, useFormGroup, useTranslate, } from 'react-admin';
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
var AccordionFormPanel = function (props) {
    return (React.createElement(FormGroupContextProvider, { name: props.label },
        React.createElement(AccordionFormPanelView, __assign({}, props))));
};
var AccordionFormPanelView = function (props) {
    var children = props.children, _a = props.defaultExpanded, defaultExpanded = _a === void 0 ? false : _a, _b = props.disabled, disabled = _b === void 0 ? false : _b, label = props.label, secondary = props.secondary, square = props.square, 
    // injected by the parent
    _c = props.autoClose, 
    // injected by the parent
    autoClose = _c === void 0 ? false : _c, basePath = props.basePath, margin = props.margin, onChange = props.onChange, record = props.record, resource = props.resource, expanded = props.expanded, variant = props.variant;
    var classes = useStyles();
    var _d = useState(defaultExpanded), innerExpanded = _d[0], setExpanded = _d[1];
    var handleChange = function () {
        setExpanded(function (expanded) { return !expanded; });
    };
    var accordionParams = autoClose
        ? {
            expanded: expanded,
            onChange: onChange,
        }
        : {
            expanded: innerExpanded,
            onChange: handleChange,
        };
    var translate = useTranslate();
    var formGroup = useFormGroup(label);
    var submitFailed = useFormState(UseFormStateOptions).submitFailed;
    var hasErrors = formGroup.invalid && (formGroup.touched || submitFailed);
    return (React.createElement(Accordion, __assign({}, accordionParams, { disabled: disabled, square: square }),
        React.createElement(AccordionSummary, { expandIcon: React.createElement(ExpandMoreIcon, null), "aria-controls": "panel-" + label + "-content", id: "panel-" + label + "-header" },
            React.createElement(Typography, { color: hasErrors ? 'error' : 'initial', className: classes.heading }, translate(label, { _: label })),
            React.createElement(Typography, { className: classes.secondaryHeading }, secondary && translate(secondary, { _: secondary }))),
        React.createElement(AccordionDetails, { className: classes.detail }, React.Children.map(children, function (input) {
            return input && (React.createElement(FormInput, { basePath: basePath, input: input, record: record, resource: resource, variant: input.props.variant || variant, margin: input.props.margin || margin }));
        }))));
};
var UseFormStateOptions = {
    subscription: {
        submitFailed: true,
    },
};
var useStyles = makeStyles(function (theme) { return ({
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
}); }, {
    name: 'RaAccordionFormPanel',
});
export default AccordionFormPanel;
