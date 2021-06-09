import React, { useContext } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import ContentCreate from '@material-ui/icons/Create';
import { useTranslate } from 'react-admin';
import EditableRowContext from '../EditableRowContext';
var EditRowButton = function () {
    var openEditMode = useContext(EditableRowContext);
    var translate = useTranslate();
    return (React.createElement(Tooltip, { title: translate('ra.action.edit', { _: 'ra.action.edit' }) },
        React.createElement(IconButton, { onClick: openEditMode, size: "small", color: "primary", "aria-label": "edit" },
            React.createElement(ContentCreate, null))));
};
export default EditRowButton;
