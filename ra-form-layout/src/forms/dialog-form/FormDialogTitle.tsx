import * as React from 'react';
import {
    cloneElement,
    isValidElement,
    MouseEventHandler,
    ReactElement,
} from 'react';
import {
    DialogTitle,
    DialogTitleProps,
    IconButton,
    makeStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Record, useTranslate } from 'react-admin';

interface FormDialogTitleProps extends Omit<DialogTitleProps, 'title'> {
    defaultTitle?: string;
    onClose: MouseEventHandler;
    record?: Partial<Record>;
    title?: ReactElement | string;
}

const FormDialogTitle = (props: FormDialogTitleProps): ReactElement => {
    const translate = useTranslate();
    const classes = useStyles(props);

    const { defaultTitle, onClose, record, title } = props;

    return (
        <DialogTitle id="edit-dialog-title">
            {isValidElement(title)
                ? cloneElement<any>(title, { record })
                : title
                ? translate(title, { _: title })
                : defaultTitle}
            <IconButton
                aria-label={translate('ra.action.close')}
                className={classes.closeButton}
                onClick={onClose}
            >
                <CloseIcon />
            </IconButton>
        </DialogTitle>
    );
};

export default FormDialogTitle;

const useStyles = makeStyles(
    theme => ({
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    }),
    {
        name: 'RaFormDialogTitle',
    }
);
