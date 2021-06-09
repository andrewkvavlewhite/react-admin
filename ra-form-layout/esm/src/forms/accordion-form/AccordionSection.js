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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import { useState } from 'react';
import classnames from 'classnames';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormInput, useTranslate } from 'react-admin';
import { useForm } from 'react-final-form';
import get from 'lodash/get';
import { Accordion as MuiAccordion, AccordionDetails as MuiAccordionDetails, AccordionSummary as MuiAccordionSummary, Typography, } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
var DefaultAccordion = withStyles(function (theme) { return ({
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
}); })(MuiAccordion);
var DefaultAccordionSummary = withStyles({
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
var DefaultAccordionDetails = withStyles(function (theme) { return ({
    root: {
        padding: theme.spacing(2),
    },
}); })(MuiAccordionDetails);
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
var AccordionSection = function (props) {
    var _a;
    var _b = props.Accordion, Accordion = _b === void 0 ? DefaultAccordion : _b, _c = props.AccordionDetails, AccordionDetails = _c === void 0 ? DefaultAccordionDetails : _c, _d = props.AccordionSummary, AccordionSummary = _d === void 0 ? DefaultAccordionSummary : _d, children = props.children, className = props.className, _e = props.defaultExpanded, defaultExpanded = _e === void 0 ? false : _e, _f = props.disabled, disabled = _f === void 0 ? false : _f, _g = props.fullWidth, fullWidth = _g === void 0 ? false : _g, label = props.label, secondary = props.secondary, square = props.square, TransitionComponent = props.TransitionComponent, TransitionProps = props.TransitionProps, 
    // injected by the parent
    basePath = props.basePath, margin = props.margin, record = props.record, resource = props.resource, variant = props.variant, rest = __rest(props, ["Accordion", "AccordionDetails", "AccordionSummary", "children", "className", "defaultExpanded", "disabled", "fullWidth", "label", "secondary", "square", "TransitionComponent", "TransitionProps", "basePath", "margin", "record", "resource", "variant"]);
    var classes = useStyles(props);
    var _h = useState(defaultExpanded), expanded = _h[0], setExpanded = _h[1];
    var translate = useTranslate();
    var form = useForm();
    var handleChange = function () {
        setExpanded(function (expanded) { return !expanded; });
    };
    var hasErrors = hasInputsWithError(children, form.getState().errors);
    return (React.createElement(Accordion, __assign({}, rest, { expanded: expanded, onChange: handleChange, disabled: disabled, square: square, className: classnames(className, classes.root, (_a = {},
            _a[classes.fullWidth] = fullWidth,
            _a)), TransitionComponent: TransitionComponent, TransitionProps: TransitionProps }),
        React.createElement(AccordionSummary, { expandIcon: React.createElement(ExpandMoreIcon, null), "aria-controls": "panel-" + label + "-content", id: "panel-" + label + "-header", className: classes.summary },
            React.createElement(Typography, { color: hasErrors ? 'error' : 'initial', className: classes.heading }, translate(label, { _: label })),
            React.createElement(Typography, { className: classes.secondaryHeading }, secondary && translate(secondary, { _: secondary }))),
        React.createElement(AccordionDetails, { className: classes.detail }, React.Children.map(children, function (input) {
            return input && (React.createElement(FormInput, { basePath: basePath, input: input, record: record, resource: resource, variant: input.props.variant || variant, margin: input.props.margin || margin }));
        }))));
};
AccordionSection.defaultProps = {
    classes: {},
};
export var hasInputsWithError = function (children, errors) {
    return React.Children.toArray(children).some(function (input) { return React.isValidElement(input) && get(errors, input.props.source); });
};
var useStyles = makeStyles(function (theme) { return ({
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
}); }, {
    name: 'RaAccordionSection',
});
export default AccordionSection;
