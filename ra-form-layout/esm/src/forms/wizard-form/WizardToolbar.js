import * as React from 'react';
import { Toolbar as MUIToolbar, Button, Grid } from '@material-ui/core';
import { SaveButton, useTranslate } from 'react-admin';
var noop = function () { return null; };
/**
 * The Toolbar displayed at the bottom of WizardForm.
 *
 * @prop {boolean} hasPreviousStep Optionnal. Does the wizard have a previous step?
 * @prop {boolean} hasNextStep Optionnal. Does the wizard have a next step?
 * @prop {Function} onPreviousClick Optionnal. Previous button click action
 * @prop {Function} onNextClick Optionnal. Next button click action
 * @prop {...BaseToolbarSubmitProps}
 */
var WizardToolbar = function (_a) {
    var _b = _a.hasPreviousStep, hasPreviousStep = _b === void 0 ? false : _b, _c = _a.hasNextStep, hasNextStep = _c === void 0 ? false : _c, _d = _a.onPreviousClick, onPreviousClick = _d === void 0 ? noop : _d, _e = _a.onNextClick, onNextClick = _e === void 0 ? noop : _e, handleSubmit = _a.handleSubmit, handleSubmitWithRedirect = _a.handleSubmitWithRedirect, invalid = _a.invalid, redirect = _a.redirect, saving = _a.saving, submitOnEnter = _a.submitOnEnter;
    var translate = useTranslate();
    return (React.createElement(MUIToolbar, null,
        React.createElement(Grid, { container: true, direction: "row", justify: "space-between", alignItems: "center" },
            React.createElement(Grid, { item: true }, hasPreviousStep ? (React.createElement(Button, { variant: "text", onClick: onPreviousClick }, translate('ra-form-layout.action.previous'))) : null),
            React.createElement(Grid, { item: true }, hasNextStep ? (React.createElement(Button, { disabled: invalid, variant: "contained", color: "primary", onClick: onNextClick }, translate('ra-form-layout.action.next'))) : (React.createElement(SaveButton, { handleSubmitWithRedirect: handleSubmitWithRedirect || handleSubmit, disabled: invalid, invalid: invalid, redirect: redirect, saving: saving, submitOnEnter: submitOnEnter }))))));
};
export default WizardToolbar;
