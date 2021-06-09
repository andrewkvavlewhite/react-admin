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
exports.SearchInput = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var prop_types_1 = __importDefault(require("prop-types"));
var classnames_1 = __importDefault(require("classnames"));
var core_1 = require("@material-ui/core");
var Clear_1 = __importDefault(require("@material-ui/icons/Clear"));
var Search_1 = __importDefault(require("@material-ui/icons/Search"));
var react_admin_1 = require("react-admin");
/**
 * A text input built specifically for the search. Very similar to react-admin `SearchInput`,
 * except it does not requires to be inside a final-form `Form` component.
 *
 * It accepts all props of the Material UI [`<TextField>`](https://material-ui.com/components/text-fields/).
 * @param {SearchInputProps} props
 * @param {'light' | 'dark'} props.color The color mode for the input, applying light or dark backgrounds
 */
exports.SearchInput = react_1.forwardRef(function (props, ref) {
    var classesOverride = props.classes, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a = props.color, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    color = _a === void 0 ? 'light' : _a, InputProps = props.InputProps, value = props.value, disabled = props.disabled, _b = props.variant, variant = _b === void 0 ? 'filled' : _b, _c = props.margin, margin = _c === void 0 ? 'dense' : _c, _d = props.placeholder, placeholder = _d === void 0 ? 'ra.action.search' : _d, rest = __rest(props, ["classes", "color", "InputProps", "value", "disabled", "variant", "margin", "placeholder"]);
    var classes = useStyles(props);
    var translate = react_admin_1.useTranslate();
    var onFocus = props.onFocus, onBlur = props.onBlur, onChange = props.onChange;
    var handleClickClearButton = react_1.useCallback(function (event) {
        event.preventDefault();
        // Haven't found a better way yet. We also have this issue in react-admin ResetableTextfield
        // @ts-ignore
        onChange('');
    }, [onChange]);
    var handleFocus = react_1.useCallback(function (event) {
        onFocus && onFocus(event);
    }, [onFocus]);
    var handleBlur = react_1.useCallback(function (event) {
        onBlur && onBlur(event);
    }, [onBlur]);
    var clearButton = classes.clearButton, clearIcon = classes.clearIcon, inputAdornmentEnd = classes.inputAdornmentEnd, inputAdornmentStart = classes.inputAdornmentStart, visibleClearIcon = classes.visibleClearIcon, inputClassName = classes.input, inputBaseClassName = classes.inputBase, restClasses = __rest(classes, ["clearButton", "clearIcon", "inputAdornmentEnd", "inputAdornmentStart", "visibleClearIcon", "input", "inputBase"]);
    return (React.createElement(core_1.TextField, __assign({ classes: restClasses, value: value, inputProps: {
            className: inputClassName,
        }, InputProps: __assign({ className: inputBaseClassName, startAdornment: (React.createElement(core_1.InputAdornment, { className: inputAdornmentStart, position: "start" },
                React.createElement(Search_1.default, null))), endAdornment: (React.createElement(core_1.InputAdornment, { className: inputAdornmentEnd, position: "end" },
                React.createElement(core_1.IconButton, { className: clearButton, "aria-label": translate('ra.action.clear_input_value'), title: translate('ra.action.clear_input_value'), disableRipple: true, onClick: handleClickClearButton, onMouseDown: handleMouseDownClearButton, disabled: !value || disabled },
                    React.createElement(Clear_1.default, { className: classnames_1.default(clearIcon, visibleClearIcon) })))) }, InputProps), disabled: disabled, variant: variant, margin: margin, placeholder: translate(placeholder, { _: placeholder }) }, rest, { onFocus: handleFocus, onBlur: handleBlur, ref: ref })));
});
exports.SearchInput.displayName = 'SearchInput';
var useStyles = core_1.makeStyles(function (theme) { return ({
    root: {
        backgroundColor: function (_a) {
            var color = _a.color;
            return core_1.fade(color === 'light'
                ? theme.palette.common.white
                : theme.palette.common.black, 0.05);
        },
        borderRadius: theme.shape.borderRadius,
        marginTop: 4,
        '&:hover': {
            backgroundColor: function (_a) {
                var color = _a.color;
                return core_1.fade(color === 'light'
                    ? theme.palette.common.white
                    : theme.palette.common.black, color === 'light' ? 0.25 : 0.15);
            },
        },
        '&:focus-within': {
            backgroundColor: function (_a) {
                var color = _a.color;
                return core_1.fade(color === 'light'
                    ? theme.palette.common.white
                    : theme.palette.common.black, color === 'light' ? 0.25 : 0.15);
            },
        },
        '& *': {
            color: 'inherit',
        },
        '& .MuiFilledInput-underline:before': {
            border: 'none',
        },
        '& .MuiFilledInput-underline:after': {
            border: 'none',
        },
        zIndex: theme.zIndex.modal + 1,
    },
    inputBase: {
        background: 'none',
        borderRadius: 0,
        '&:hover': {
            background: 'none',
        },
    },
    input: {
        paddingTop: theme.spacing(1),
        transition: theme.transitions.create('width'),
        width: 120,
        '&:focus': {
            width: 170,
        },
    },
    clearIcon: {
        height: 16,
        width: 0,
    },
    visibleClearIcon: {
        width: 16,
    },
    clearButton: {
        height: 24,
        width: 24,
        padding: 0,
    },
    inputAdornmentStart: {
        marginTop: '0 !important',
    },
    inputAdornmentEnd: {
        transition: theme.transitions.create('opacity'),
        opacity: function (_a) {
            var value = _a.value;
            return (!!value ? 1 : 0);
        },
    },
}); }, { name: 'RaSearchInput' });
var handleMouseDownClearButton = function (event) {
    event.preventDefault();
};
exports.SearchInput.propTypes = {
    classes: prop_types_1.default.object,
    disabled: prop_types_1.default.bool,
    InputProps: prop_types_1.default.object,
    onBlur: prop_types_1.default.func,
    onChange: prop_types_1.default.func.isRequired,
    onFocus: prop_types_1.default.func,
    value: prop_types_1.default.any,
};
