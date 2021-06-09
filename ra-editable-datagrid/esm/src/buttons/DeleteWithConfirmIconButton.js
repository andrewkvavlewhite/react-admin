import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@material-ui/core';
import ActionDelete from '@material-ui/icons/Delete';
import classnames from 'classnames';
import inflection from 'inflection';
import { Confirm, useTranslate, } from 'react-admin';
import useDeleteWithConfirmController from './useDeleteWithConfirmController';
var DeleteWithConfirmIconButton = function (_a) {
    var basePath = _a.basePath, className = _a.className, _b = _a.confirmTitle, confirmTitle = _b === void 0 ? 'ra.message.delete_title' : _b, _c = _a.confirmContent, confirmContent = _c === void 0 ? 'ra.message.delete_content' : _c, _d = _a.label, label = _d === void 0 ? 'ra.action.delete' : _d, record = _a.record, resource = _a.resource, _e = _a.redirect, redirectTo = _e === void 0 ? 'list' : _e;
    var _f = useDeleteWithConfirmController({
        resource: resource,
        record: record,
        redirect: redirectTo,
        basePath: basePath,
    }), open = _f.open, loading = _f.loading, handleClick = _f.handleClick, handleDialogClose = _f.handleDialogClose, handleDelete = _f.handleDelete;
    var translate = useTranslate();
    return (React.createElement(Fragment, null,
        React.createElement(Tooltip, { title: translate(label, { _: label }) },
            React.createElement(IconButton, { onClick: handleClick, className: classnames('ra-delete-button', className), key: "button", size: "small" },
                React.createElement(ActionDelete, { color: "error" }))),
        React.createElement(Confirm, { isOpen: open, loading: loading, title: confirmTitle, content: confirmContent, translateOptions: {
                name: inflection.humanize(translate("resources." + resource + ".name", {
                    smart_count: 1,
                    _: inflection.singularize(resource),
                }), true),
                id: record ? record.id : undefined,
            }, onConfirm: handleDelete, onClose: handleDialogClose })));
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
