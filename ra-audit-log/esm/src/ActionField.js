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
import { Typography } from '@material-ui/core';
import { sanitizeFieldRestProps, useRecordContext, } from 'react-admin';
import { useEventLabel } from './useEventLabel';
/**
 * A react-admin field which displays a label specific to an event action.
 */
export var ActionField = function (props) {
    var record = useRecordContext(props);
    var actionLabel = useEventLabel({ record: record, variant: 'inline' });
    if (!record) {
        return null;
    }
    return (React.createElement(Typography, __assign({ component: "span", variant: "body2" }, sanitizeFieldRestProps(props)), actionLabel));
};
ActionField.defaultProps = {
    addLabel: true,
};
