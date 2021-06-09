import React from 'react';
import { useTranslate } from 'react-admin';
import { Tooltip, IconButton } from '@material-ui/core';
import ContentSave from '@material-ui/icons/Save';
var SaveRowButton = function (_a) {
    var dirty = _a.dirty, handleSubmit = _a.handleSubmit, invalid = _a.invalid, quitEditMode = _a.quitEditMode, saving = _a.saving, undoable = _a.undoable;
    var translate = useTranslate();
    var onClick = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        if (dirty && invalid) {
            return;
        }
        handleSubmit();
        if (undoable) {
            quitEditMode();
        }
    };
    return (React.createElement(Tooltip, { title: translate('ra.action.save', {
            _: 'ra.action.save',
        }) },
        React.createElement(IconButton, { disabled: saving, onClick: onClick, size: "small", color: "primary" },
            React.createElement(ContentSave, null))));
};
export default SaveRowButton;
