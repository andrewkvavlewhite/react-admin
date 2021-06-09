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
import { forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InputAdornment, IconButton, TextField, makeStyles, fade, } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { useTranslate } from 'react-admin';
/**
 * A text input built specifically for the search. Very similar to react-admin `SearchInput`,
 * except it does not requires to be inside a final-form `Form` component.
 *
 * It accepts all props of the Material UI [`<TextField>`](https://material-ui.com/components/text-fields/).
 * @param {SearchInputProps} props
 * @param {'light' | 'dark'} props.color The color mode for the input, applying light or dark backgrounds
 */
export var SearchInput = forwardRef(function (props, ref) {
    var classesOverride = props.classes, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a = props.color, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    color = _a === void 0 ? 'light' : _a, InputProps = props.InputProps, value = props.value, disabled = props.disabled, _b = props.variant, variant = _b === void 0 ? 'filled' : _b, _c = props.margin, margin = _c === void 0 ? 'dense' : _c, _d = props.placeholder, placeholder = _d === void 0 ? 'ra.action.search' : _d, rest = __rest(props, ["classes", "color", "InputProps", "value", "disabled", "variant", "margin", "placeholder"]);
    var classes = useStyles(props);
    var translate = useTranslate();
    var onFocus = props.onFocus, onBlur = props.onBlur, onChange = props.onChange;
    var handleClickClearButton = useCallback(function (event) {
        event.preventDefault();
        // Haven't found a better way yet. We also have this issue in react-admin ResetableTextfield
        // @ts-ignore
        onChange('');
    }, [onChange]);
    var handleFocus = useCallback(function (event) {
        onFocus && onFocus(event);
    }, [onFocus]);
    var handleBlur = useCallback(function (event) {
        onBlur && onBlur(event);
    }, [onBlur]);
    var clearButton = classes.clearButton, clearIcon = classes.clearIcon, inputAdornmentEnd = classes.inputAdornmentEnd, inputAdornmentStart = classes.inputAdornmentStart, visibleClearIcon = classes.visibleClearIcon, inputClassName = classes.input, inputBaseClassName = classes.inputBase, restClasses = __rest(classes, ["clearButton", "clearIcon", "inputAdornmentEnd", "inputAdornmentStart", "visibleClearIcon", "input", "inputBase"]);
    return (React.createElement(TextField, __assign({ classes: restClasses, value: value, inputProps: {
            className: inputClassName,
        }, InputProps: __assign({ className: inputBaseClassName, startAdornment: (React.createElement(InputAdornment, { className: inputAdornmentStart, position: "start" },
                React.createElement(SearchIcon, null))), endAdornment: (React.createElement(InputAdornment, { className: inputAdornmentEnd, position: "end" },
                React.createElement(IconButton, { className: clearButton, "aria-label": translate('ra.action.clear_input_value'), title: translate('ra.action.clear_input_value'), disableRipple: true, onClick: handleClickClearButton, onMouseDown: handleMouseDownClearButton, disabled: !value || disabled },
                    React.createElement(ClearIcon, { className: classNames(clearIcon, visibleClearIcon) })))) }, InputProps), disabled: disabled, variant: variant, margin: margin, placeholder: translate(placeholder, { _: placeholder }) }, rest, { onFocus: handleFocus, onBlur: handleBlur, ref: ref })));
});
SearchInput.displayName = 'SearchInput';
var useStyles = makeStyles(function (theme) { return ({
    root: {
        backgroundColor: function (_a) {
            var color = _a.color;
            return fade(color === 'light'
                ? theme.palette.common.white
                : theme.palette.common.black, 0.05);
        },
        borderRadius: theme.shape.borderRadius,
        marginTop: 4,
        '&:hover': {
            backgroundColor: function (_a) {
                var color = _a.color;
                return fade(color === 'light'
                    ? theme.palette.common.white
                    : theme.palette.common.black, color === 'light' ? 0.25 : 0.15);
            },
        },
        '&:focus-within': {
            backgroundColor: function (_a) {
                var color = _a.color;
                return fade(color === 'light'
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
SearchInput.propTypes = {
    classes: PropTypes.object,
    disabled: PropTypes.bool,
    InputProps: PropTypes.object,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    value: PropTypes.any,
};
