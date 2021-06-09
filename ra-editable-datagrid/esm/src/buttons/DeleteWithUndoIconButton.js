import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@material-ui/core';
import ActionDelete from '@material-ui/icons/Delete';
import classnames from 'classnames';
import { useTranslate } from 'react-admin';
import useDeleteWithUndoController from './useDeleteWithUndoController';
var DeleteWithConfirmIconButton = function (_a) {
    var basePath = _a.basePath, className = _a.className, _b = _a.label, label = _b === void 0 ? 'ra.action.delete' : _b, record = _a.record, resource = _a.resource, _c = _a.redirect, redirectTo = _c === void 0 ? 'list' : _c;
    var _d = useDeleteWithUndoController({
        resource: resource,
        record: record,
        redirect: redirectTo,
        basePath: basePath,
    }), loading = _d.loading, handleDelete = _d.handleDelete;
    var translate = useTranslate();
    return (React.createElement(Tooltip, { title: translate(label, { _: label }) },
        React.createElement(IconButton, { disabled: loading, onClick: handleDelete, className: classnames('ra-delete-button', className), key: "button", size: "small" },
            React.createElement(ActionDelete, { color: "error" }))));
};
DeleteWithConfirmIconButton.propTypes = {
    basePath: PropTypes.string,
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
    icon: PropTypes.element,
};
export default DeleteWithConfirmIconButton;
