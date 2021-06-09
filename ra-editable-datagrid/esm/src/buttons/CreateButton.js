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
import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useTranslate } from 'react-admin';
var CreateButton = function (props) {
    var translate = useTranslate();
    return (React.createElement(Tooltip, { title: translate('ra.action.create', { _: 'ra.action.create' }) },
        React.createElement(IconButton, __assign({ size: "small", color: "primary", "aria-label": "create" }, props),
            React.createElement(AddIcon, null),
            props.children)));
};
export default CreateButton;
