import * as React from 'react';
import { cloneElement, isValidElement, } from 'react';
import { DialogTitle, IconButton, makeStyles, } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslate } from 'react-admin';
var FormDialogTitle = function (props) {
    var translate = useTranslate();
    var classes = useStyles(props);
    var defaultTitle = props.defaultTitle, onClose = props.onClose, record = props.record, title = props.title;
    return (React.createElement(DialogTitle, { id: "edit-dialog-title" },
        isValidElement(title)
            ? cloneElement(title, { record: record })
            : title
                ? translate(title, { _: title })
                : defaultTitle,
        React.createElement(IconButton, { "aria-label": translate('ra.action.close'), className: classes.closeButton, onClick: onClose },
            React.createElement(CloseIcon, null))));
};
export default FormDialogTitle;
var useStyles = makeStyles(function (theme) { return ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}); }, {
    name: 'RaFormDialogTitle',
});
