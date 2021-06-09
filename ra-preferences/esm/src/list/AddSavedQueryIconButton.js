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
import * as React from 'react';
import { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { useTranslate } from 'react-admin';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import { AddSavedQueryDialog } from './AddSavedQueryDialog';
export var AddSavedQueryIconButton = function (props) {
    var _a = useState(false), open = _a[0], setOpen = _a[1];
    var handleOpen = function () {
        setOpen(true);
    };
    var handleClose = function () {
        setOpen(false);
    };
    var translate = useTranslate();
    return (React.createElement(React.Fragment, null,
        React.createElement(IconButton, __assign({ "aria-label": translate('ra-preferences.saved_queries.new_label', {
                _: 'Save current query...',
            }), size: "small", onClick: handleOpen }, props),
            React.createElement(AddIcon, null)),
        React.createElement(AddSavedQueryDialog, { open: open, onClose: handleClose })));
};
