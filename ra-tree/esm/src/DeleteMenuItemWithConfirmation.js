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
import inflection from 'inflection';
import { useTranslate, Confirm, } from 'react-admin';
import { useDeleteBranchWithConfirmController } from './controllers';
var DeleteMenuItemWithConfirmation = forwardRef(function (_a, ref) {
    var basePath = _a.basePath, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    classesOverride = _a.classes, className = _a.className, _b = _a.confirmTitle, confirmTitle = _b === void 0 ? 'ra.message.delete_title' : _b, _c = _a.confirmContent, confirmContent = _c === void 0 ? 'ra.message.delete_content' : _c, _d = _a.label, label = _d === void 0 ? 'ra.action.delete' : _d, record = _a.record, resource = _a.resource, _e = _a.redirect, redirectTo = _e === void 0 ? 'list' : _e, props = __rest(_a, ["basePath", "classes", "className", "confirmTitle", "confirmContent", "label", "record", "resource", "redirect"]);
    var _f = useDeleteBranchWithConfirmController({
        record: record,
        resource: resource,
        redirect: redirectTo,
        basePath: basePath,
    }), open = _f.open, loading = _f.loading, handleDialogOpen = _f.handleDialogOpen, handleDialogClose = _f.handleDialogClose, handleDelete = _f.handleDelete;
    var translate = useTranslate();
    return (React.createElement(React.Fragment, null,
        React.createElement(MenuItem, __assign({ className: className, onClick: handleDialogOpen, ref: ref }, props), translate(label, { _: label })),
        React.createElement(Confirm, { isOpen: open, loading: loading, title: confirmTitle, content: confirmContent, translateOptions: {
                name: inflection.humanize(translate("resources." + resource + ".name", {
                    smart_count: 1,
                    _: inflection.singularize(resource),
                }), true),
                id: record.id,
            }, onConfirm: handleDelete, onClose: handleDialogClose })));
});
DeleteMenuItemWithConfirmation.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.any,
    className: PropTypes.string,
    confirmTitle: PropTypes.string,
    confirmContent: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.any,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func,
    ]),
    resource: PropTypes.string,
};
export default DeleteMenuItemWithConfirmation;
