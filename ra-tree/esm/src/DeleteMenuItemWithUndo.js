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
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '@material-ui/core';
import { useTranslate, } from 'react-admin';
import { useDeleteBranchWithUndoController } from './controllers';
var DeleteMenuItemWithUndo = forwardRef(function (_a, ref) {
    var basePath = _a.basePath, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    classesOverride = _a.classes, className = _a.className, _b = _a.label, label = _b === void 0 ? 'ra.action.delete' : _b, record = _a.record, resource = _a.resource, _c = _a.redirect, redirectTo = _c === void 0 ? 'list' : _c, props = __rest(_a, ["basePath", "classes", "className", "label", "record", "resource", "redirect"]);
    var _d = useDeleteBranchWithUndoController({
        record: record,
        resource: resource,
        redirect: redirectTo,
        basePath: basePath,
    }), loading = _d.loading, handleDelete = _d.handleDelete;
    var translate = useTranslate();
    return (React.createElement(MenuItem, __assign({ className: className, disabled: loading, onClick: handleDelete, ref: ref }, props), translate(label, { _: label })));
});
DeleteMenuItemWithUndo.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.any,
    className: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.any,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func,
    ]),
    resource: PropTypes.string,
};
export default DeleteMenuItemWithUndo;
