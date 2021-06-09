import * as React from 'react';
import { FormInput } from 'react-admin';
/**
 * Renders children (Inputs) or a step label according to the passed `intent` prop thanks to the React Multipass pattern
 * @see https://marmelab.com/blog/2018/10/18/react-render-context-pattern.html
 *
 * To be used as child of an <WizardForm> element.
 *
 * @param {string} basePath Optional.
 * @param {Record} record Optional.
 * @param {string} resource Optional.
 * @param {string} variant Optional.
 * @param {margin} margin Optional.
 * @param {intent} intent Optional. "step" for step inputs display or "label" for step label display
 * @param {string} label Optional. Label of the step (used inside the stepper)
 */
var WizardFormStep = function (_a) {
    var basePath = _a.basePath, record = _a.record, resource = _a.resource, variant = _a.variant, margin = _a.margin, children = _a.children, intent = _a.intent, label = _a.label;
    if (intent === 'label') {
        return React.createElement("span", null, label);
    }
    return (React.createElement(React.Fragment, null, React.Children.map(children, function (input) {
        return input && (React.createElement(FormInput, { basePath: basePath, input: input, record: record, resource: resource, variant: input.props.variant || variant, margin: input.props.margin || margin }));
    })));
};
export default WizardFormStep;
