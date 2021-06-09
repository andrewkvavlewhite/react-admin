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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { useGetResourceLabel, useTranslate } from 'react-admin';
import { Tooltip, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
var CreateResourceButton = function (_a) {
    var resource = _a.resource, props = __rest(_a, ["resource"]);
    var translate = useTranslate();
    var getResourceLabel = useGetResourceLabel();
    var singularResourceName = getResourceLabel(resource, 1);
    var label = translate('ra.page.create', { name: singularResourceName });
    return (React.createElement(Tooltip, { title: label },
        React.createElement(Button, __assign({ size: "small", color: "primary", "aria-label": label }, props),
            React.createElement(AddIcon, null),
            label)));
};
export default CreateResourceButton;
