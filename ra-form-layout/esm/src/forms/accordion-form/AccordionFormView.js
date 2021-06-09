var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as React from 'react';
import { Children, isValidElement } from 'react';
import get from 'lodash/get';
import AccordionFormToolbar from './AccordionFormToolbar';
export var AccordionFormView = function (_a) {
    var _b = _a.autoClose, autoClose = _b === void 0 ? false : _b, basePath = _a.basePath, children = _a.children, className = _a.className, handleSubmit = _a.handleSubmit, handleSubmitWithRedirect = _a.handleSubmitWithRedirect, invalid = _a.invalid, margin = _a.margin, pristine = _a.pristine, record = _a.record, redirect = _a.redirect, resource = _a.resource, saving = _a.saving, _c = _a.submitOnEnter, submitOnEnter = _c === void 0 ? true : _c, _d = _a.toolbar, toolbar = _d === void 0 ? DefaultToolbar : _d, undoable = _a.undoable, variant = _a.variant;
    var childrens = Children.toArray(children);
    var _e = React.useState(childrens.length > 0 ? childrens[0].props.label : ''), expanded = _e[0], setExpanded = _e[1];
    var handleChange = function (panel) { return function (event, isExpanded) {
        setExpanded(isExpanded ? panel : false);
    }; };
    return (React.createElement("form", null,
        React.createElement("div", { className: className }, Children.map(children, function (accordion) {
            return React.cloneElement(accordion, {
                basePath: basePath,
                autoClose: autoClose,
                expanded: expanded === accordion.props.label,
                margin: margin,
                onChange: handleChange(accordion.props.label),
                record: record,
                resource: resource,
                variant: variant,
            });
        })),
        toolbar &&
            React.cloneElement(toolbar, {
                basePath: basePath,
                handleSubmitWithRedirect: handleSubmitWithRedirect,
                handleSubmit: handleSubmit,
                invalid: invalid,
                pristine: pristine,
                record: record,
                redirect: redirect,
                resource: resource,
                saving: saving,
                submitOnEnter: submitOnEnter,
                undoable: undoable,
            })));
};
var DefaultToolbar = React.createElement(AccordionFormToolbar, null);
export var findAccordionsWithErrors = function (children, errors) {
    return Children.toArray(children).reduce(function (acc, child) {
        if (!isValidElement(child)) {
            return acc;
        }
        var inputs = Children.toArray(child.props.children);
        if (inputs.some(function (input) {
            return isValidElement(input) && get(errors, input.props.source);
        })) {
            return __spreadArrays(acc, [child.props.label]);
        }
        return acc;
    }, []);
};
