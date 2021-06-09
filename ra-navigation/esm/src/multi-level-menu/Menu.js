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
import * as React from 'react';
import classnames from 'classnames';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
export var Menu = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    var classes = useStyles();
    return (React.createElement(List, __assign({ className: classnames(classes.root, className), disablePadding: true }, props, props)));
};
var useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
});
