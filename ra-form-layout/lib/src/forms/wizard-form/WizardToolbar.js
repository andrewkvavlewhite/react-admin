"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var react_admin_1 = require("react-admin");
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
    var translate = react_admin_1.useTranslate();
    return (React.createElement(core_1.Toolbar, null,
        React.createElement(core_1.Grid, { container: true, direction: "row", justify: "space-between", alignItems: "center" },
            React.createElement(core_1.Grid, { item: true }, hasPreviousStep ? (React.createElement(core_1.Button, { variant: "text", onClick: onPreviousClick }, translate('ra-form-layout.action.previous'))) : null),
            React.createElement(core_1.Grid, { item: true }, hasNextStep ? (React.createElement(core_1.Button, { disabled: invalid, variant: "contained", color: "primary", onClick: onNextClick }, translate('ra-form-layout.action.next'))) : (React.createElement(react_admin_1.SaveButton, { handleSubmitWithRedirect: handleSubmitWithRedirect || handleSubmit, disabled: invalid, invalid: invalid, redirect: redirect, saving: saving, submitOnEnter: submitOnEnter }))))));
};
exports.default = WizardToolbar;
