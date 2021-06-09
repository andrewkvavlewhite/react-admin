import * as React from 'react';
import { forwardRef, MutableRefObject, ReactElement, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    InputAdornment,
    IconButton,
    TextField,
    TextFieldProps,
    makeStyles,
    fade,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { useTranslate } from 'react-admin';

import { SearchInputColor } from './types';

/**
 * A text input built specifically for the search. Very similar to react-admin `SearchInput`,
 * except it does not requires to be inside a final-form `Form` component.
 *
 * It accepts all props of the Material UI [`<TextField>`](https://material-ui.com/components/text-fields/).
 * @param {SearchInputProps} props
 * @param {'light' | 'dark'} props.color The color mode for the input, applying light or dark backgrounds
 */
export const SearchInput = forwardRef(function (
    props: SearchInputProps,
    ref: MutableRefObject<HTMLDivElement>
): ReactElement {
    const {
        classes: classesOverride,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        color = 'light',
        InputProps,
        value,
        disabled,
        variant = 'filled',
        margin = 'dense',
        placeholder = 'ra.action.search',
        ...rest
    } = props;
    const classes = useStyles(props);
    const translate = useTranslate();

    const { onFocus, onBlur, onChange } = props;
    const handleClickClearButton = useCallback(
        event => {
            event.preventDefault();
            // Haven't found a better way yet. We also have this issue in react-admin ResetableTextfield
            // @ts-ignore
            onChange('');
        },
        [onChange]
    );

    const handleFocus = useCallback(
        event => {
            onFocus && onFocus(event);
        },
        [onFocus]
    );

    const handleBlur = useCallback(
        event => {
            onBlur && onBlur(event);
        },
        [onBlur]
    );

    const {
        clearButton,
        clearIcon,
        inputAdornmentEnd,
        inputAdornmentStart,
        visibleClearIcon,
        input: inputClassName,
        inputBase: inputBaseClassName,
        ...restClasses
    } = classes;

    return (
        <TextField
            classes={restClasses}
            value={value}
            inputProps={{
                className: inputClassName,
            }}
            InputProps={{
                className: inputBaseClassName,
                startAdornment: (
                    <InputAdornment
                        className={inputAdornmentStart}
                        position="start"
                    >
                        <SearchIcon />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment
                        className={inputAdornmentEnd}
                        position="end"
                    >
                        <IconButton
                            className={clearButton}
                            aria-label={translate(
                                'ra.action.clear_input_value'
                            )}
                            title={translate('ra.action.clear_input_value')}
                            disableRipple
                            onClick={handleClickClearButton}
                            onMouseDown={handleMouseDownClearButton}
                            disabled={!value || disabled}
                        >
                            <ClearIcon
                                className={classNames(
                                    clearIcon,
                                    visibleClearIcon
                                )}
                            />
                        </IconButton>
                    </InputAdornment>
                ),
                ...InputProps,
            }}
            disabled={disabled}
            variant={variant}
            margin={margin}
            placeholder={translate(placeholder, { _: placeholder })}
            {...rest}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={ref}
        />
    );
});

SearchInput.displayName = 'SearchInput';

interface SearchInputProps extends Omit<TextFieldProps, 'color' | 'select'> {
    color?: SearchInputColor;
}

const useStyles = makeStyles(
    theme => ({
        root: {
            backgroundColor: ({ color }: SearchInputProps): string =>
                fade(
                    color === 'light'
                        ? theme.palette.common.white
                        : theme.palette.common.black,
                    0.05
                ),
            borderRadius: theme.shape.borderRadius,
            marginTop: 4,
            '&:hover': {
                backgroundColor: ({ color }: SearchInputProps): string =>
                    fade(
                        color === 'light'
                            ? theme.palette.common.white
                            : theme.palette.common.black,
                        color === 'light' ? 0.25 : 0.15
                    ),
            },
            '&:focus-within': {
                backgroundColor: ({ color }: SearchInputProps): string =>
                    fade(
                        color === 'light'
                            ? theme.palette.common.white
                            : theme.palette.common.black,
                        color === 'light' ? 0.25 : 0.15
                    ),
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
            opacity: ({ value }: SearchInputProps): number => (!!value ? 1 : 0),
        },
    }),
    { name: 'RaSearchInput' }
);

const handleMouseDownClearButton = (event: React.MouseEvent): void => {
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
