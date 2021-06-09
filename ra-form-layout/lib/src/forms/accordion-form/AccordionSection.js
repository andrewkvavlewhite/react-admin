"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasInputsWithError = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var classnames_1 = __importDefault(require("classnames"));
var ExpandMore_1 = __importDefault(require("@material-ui/icons/ExpandMore"));
var react_admin_1 = require("react-admin");
var react_final_form_1 = require("react-final-form");
var get_1 = __importDefault(require("lodash/get"));
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var DefaultAccordion = styles_1.withStyles(function (theme) { return ({
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
}); })(core_1.Accordion);
var DefaultAccordionSummary = styles_1.withStyles({
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
})(core_1.AccordionSummary);
var DefaultAccordionDetails = styles_1.withStyles(function (theme) { return ({
    root: {
        padding: theme.spacing(2),
    },
}); })(core_1.AccordionDetails);
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
    var _h = react_1.useState(defaultExpanded), expanded = _h[0], setExpanded = _h[1];
    var translate = react_admin_1.useTranslate();
    var form = react_final_form_1.useForm();
    var handleChange = function () {
        setExpanded(function (expanded) { return !expanded; });
    };
    var hasErrors = exports.hasInputsWithError(children, form.getState().errors);
    return (React.createElement(Accordion, __assign({}, rest, { expanded: expanded, onChange: handleChange, disabled: disabled, square: square, className: classnames_1.default(className, classes.root, (_a = {},
            _a[classes.fullWidth] = fullWidth,
            _a)), TransitionComponent: TransitionComponent, TransitionProps: TransitionProps }),
        React.createElement(AccordionSummary, { expandIcon: React.createElement(ExpandMore_1.default, null), "aria-controls": "panel-" + label + "-content", id: "panel-" + label + "-header", className: classes.summary },
            React.createElement(core_1.Typography, { color: hasErrors ? 'error' : 'initial', className: classes.heading }, translate(label, { _: label })),
            React.createElement(core_1.Typography, { className: classes.secondaryHeading }, secondary && translate(secondary, { _: secondary }))),
        React.createElement(AccordionDetails, { className: classes.detail }, React.Children.map(children, function (input) {
            return input && (React.createElement(react_admin_1.FormInput, { basePath: basePath, input: input, record: record, resource: resource, variant: input.props.variant || variant, margin: input.props.margin || margin }));
        }))));
};
AccordionSection.defaultProps = {
    classes: {},
};
exports.hasInputsWithError = function (children, errors) {
    return React.Children.toArray(children).some(function (input) { return React.isValidElement(input) && get_1.default(errors, input.props.source); });
};
var useStyles = styles_1.makeStyles(function (theme) { return ({
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
exports.default = AccordionSection;
