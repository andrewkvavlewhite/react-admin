import React from 'react';
import { useTranslate } from 'react-admin';
import { Tooltip, IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
var CancelEditButton = function (_a) {
    var cancel = _a.cancel;
    var translate = useTranslate();
    return (React.createElement(Tooltip, { title: translate('ra.action.cancel', {
            _: 'ra.action.cancel',
        }) },
        React.createElement(IconButton, { onClick: cancel, size: "small" },
            React.createElement(CancelIcon, null))));
};
export default CancelEditButton;
