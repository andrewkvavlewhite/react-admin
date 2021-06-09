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
import { sanitizeFieldRestProps, useRecordContext, } from 'react-admin';
import get from 'lodash/get';
import { Typography } from '@material-ui/core';
import { useGetResourceLabel } from './useGetResourceLabel';
/**
 * A react-admin field which displays a the name of the resource targeted by an event.
 */
export var ResourceField = function (props) {
    var record = useRecordContext(props);
    var getResourceLabel = useGetResourceLabel();
    if (!record) {
        return null;
    }
    var _a = props.source, source = _a === void 0 ? 'resource' : _a;
    var resource = get(record, source);
    return (React.createElement(Typography, __assign({ component: "span", variant: "body2" }, sanitizeFieldRestProps(props)), getResourceLabel(resource, 1)));
};
ResourceField.defaultProps = {
    addLabel: true,
};
