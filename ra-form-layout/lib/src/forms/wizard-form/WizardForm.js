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
var React = __importStar(require("react"));
var react_1 = require("react");
var classnames_1 = __importDefault(require("classnames"));
var react_admin_1 = require("react-admin");
var WizardProgress_1 = __importDefault(require("./WizardProgress"));
var WizardToolbar_1 = __importDefault(require("./WizardToolbar"));
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
var WizardForm = function (props) { return (React.createElement(react_admin_1.FormWithRedirect, __assign({}, props, { render: function (formProps) { return (React.createElement(WizardFormView, __assign({}, formProps))); } }))); };
var WizardFormView = function (_a) {
    var basePath = _a.basePath, children = _a.children, className = _a.className, handleSubmit = _a.handleSubmit, handleSubmitWithRedirect = _a.handleSubmitWithRedirect, invalid = _a.invalid, pristine = _a.pristine, redirect = _a.redirect, saving = _a.saving, _b = _a.submitOnEnter, submitOnEnter = _b === void 0 ? true : _b, _c = _a.toolbar, toolbar = _c === void 0 ? WizardToolbar_1.default : _c, _d = _a.progress, progress = _d === void 0 ? WizardProgress_1.default : _d, rest = __rest(_a, ["basePath", "children", "className", "handleSubmit", "handleSubmitWithRedirect", "invalid", "pristine", "redirect", "saving", "submitOnEnter", "toolbar", "progress"]);
    var _e = react_1.useState(0), currentStep = _e[0], setCurrentStep = _e[1];
    var handleNext = function (e) {
        e.preventDefault();
        setCurrentStep(function (step) { return step + 1; });
    };
    var handlePrevious = function (e) {
        e.preventDefault();
        setCurrentStep(function (step) { return step - 1; });
    };
    // We can't go forward using the progress stepper
    // So we don't need extra checks here
    var handleIndexNavigation = function (index) {
        setCurrentStep(index);
    };
    var handleKeyPress = function (event) {
        if (event.key === 'Enter' &&
            // @ts-ignore
            typeof event.target.tagName !== 'undefined' &&
            // @ts-ignore
            event.target.tagName !== 'button') {
            // Even if we don't have a next step, we should prevent the default form submit
            // in case users have set the submitOnEnter prop.
            event.preventDefault();
            if (hasNextStep) {
                setCurrentStep(function (step) { return step + 1; });
            }
        }
    };
    var steps = React.Children.toArray(children);
    var hasPreviousStep = currentStep > 0;
    var hasNextStep = currentStep < steps.length - 1;
    return (React.createElement(React.Fragment, null,
        React.createElement(progress, {
            steps: steps,
            currentStep: currentStep,
            onStepClick: handleIndexNavigation,
        }),
        React.createElement("form", __assign({ className: classnames_1.default('wizard-form', className), onKeyPress: handleKeyPress }, sanitizeRestProps(rest)),
            React.createElement(react_admin_1.CardContentInner, null, React.cloneElement(steps[currentStep], rest)),
            toolbar &&
                React.createElement(toolbar, {
                    hasNextStep: hasNextStep,
                    hasPreviousStep: hasPreviousStep,
                    onNextClick: handleNext,
                    onPreviousClick: handlePrevious,
                    invalid: invalid,
                    handleSubmit: handleSubmit,
                    handleSubmitWithRedirect: handleSubmitWithRedirect,
                    pristine: pristine,
                    redirect: redirect,
                    saving: saving,
                    submitOnEnter: submitOnEnter,
                }))));
};
var sanitizeRestProps = function (_a) {
    var active = _a.active, dirty = _a.dirty, dirtyFields = _a.dirtyFields, dirtyFieldsSinceLastSubmit = _a.dirtyFieldsSinceLastSubmit, dirtySinceLastSubmit = _a.dirtySinceLastSubmit, error = _a.error, errors = _a.errors, form = _a.form, hasSubmitErrors = _a.hasSubmitErrors, hasValidationErrors = _a.hasValidationErrors, initialValues = _a.initialValues, modified = _a.modified, modifiedSinceLastSubmit = _a.modifiedSinceLastSubmit, save = _a.save, submitError = _a.submitError, submitErrors = _a.submitErrors, submitFailed = _a.submitFailed, submitSucceeded = _a.submitSucceeded, submitting = _a.submitting, touched = _a.touched, valid = _a.valid, validating = _a.validating, values = _a.values, visited = _a.visited, __versions = _a.__versions, props = __rest(_a, ["active", "dirty", "dirtyFields", "dirtyFieldsSinceLastSubmit", "dirtySinceLastSubmit", "error", "errors", "form", "hasSubmitErrors", "hasValidationErrors", "initialValues", "modified", "modifiedSinceLastSubmit", "save", "submitError", "submitErrors", "submitFailed", "submitSucceeded", "submitting", "touched", "valid", "validating", "values", "visited", "__versions"]);
    return props;
};
exports.default = WizardForm;
