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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAccordionsWithErrors = exports.AccordionFormView = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var get_1 = __importDefault(require("lodash/get"));
var AccordionFormToolbar_1 = __importDefault(require("./AccordionFormToolbar"));
exports.AccordionFormView = function (_a) {
    var _b = _a.autoClose, autoClose = _b === void 0 ? false : _b, basePath = _a.basePath, children = _a.children, className = _a.className, handleSubmit = _a.handleSubmit, handleSubmitWithRedirect = _a.handleSubmitWithRedirect, invalid = _a.invalid, margin = _a.margin, pristine = _a.pristine, record = _a.record, redirect = _a.redirect, resource = _a.resource, saving = _a.saving, _c = _a.submitOnEnter, submitOnEnter = _c === void 0 ? true : _c, _d = _a.toolbar, toolbar = _d === void 0 ? DefaultToolbar : _d, undoable = _a.undoable, variant = _a.variant;
    var childrens = react_1.Children.toArray(children);
    var _e = React.useState(childrens.length > 0 ? childrens[0].props.label : ''), expanded = _e[0], setExpanded = _e[1];
    var handleChange = function (panel) { return function (event, isExpanded) {
        setExpanded(isExpanded ? panel : false);
    }; };
    return (React.createElement("form", null,
        React.createElement("div", { className: className }, react_1.Children.map(children, function (accordion) {
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
var DefaultToolbar = React.createElement(AccordionFormToolbar_1.default, null);
exports.findAccordionsWithErrors = function (children, errors) {
    return react_1.Children.toArray(children).reduce(function (acc, child) {
        if (!react_1.isValidElement(child)) {
            return acc;
        }
        var inputs = react_1.Children.toArray(child.props.children);
        if (inputs.some(function (input) {
            return react_1.isValidElement(input) && get_1.default(errors, input.props.source);
        })) {
            return __spreadArrays(acc, [child.props.label]);
        }
        return acc;
    }, []);
};
