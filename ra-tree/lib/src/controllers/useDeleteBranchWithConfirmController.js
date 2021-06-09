"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_admin_1 = require("react-admin");
var dataProvider_1 = require("../dataProvider");
var actions_1 = require("../actions");
/**
 * Prepare a set of callbacks for a delete branch button guarded by confirmation dialog
 *
 * @example
 *
 * import React from 'react';
 * import ActionDelete from '@material-ui/icons/Delete';
 * import { Button, useDeleteBranchWithConfirmController } from '@react-admin/ra-tree';
 *
 * const DeleteButton = ({
 *     resource,
 *     record,
 *     basePath,
 *     redirect,
 *     onClick,
 *     ...rest
 * }) => {
 *     const {
 *         open,
 *         loading,
 *         handleDialogOpen,
 *         handleDialogClose,
 *         handleDelete,
 *     } = useDeleteWithConfirmController({
 *         resource,
 *         record,
 *         redirect,
 *         basePath,
 *         onClick,
 *     });
 *
 *     return (
 *         <Fragment>
 *             <Button
 *                 onClick={handleDialogOpen}
 *                 label="ra.action.delete"
 *                 {...rest}
 *             >
 *                 {icon}
 *             </Button>
 *             <Confirm
 *                 isOpen={open}
 *                 loading={loading}
 *                 title="ra.message.delete_title"
 *                 content="ra.message.delete_content"
 *                 translateOptions={{
 *                     name: resource,
 *                     id: record.id,
 *                 }}
 *                 onConfirm={handleDelete}
 *                 onClose={handleDialogClose}
 *             />
 *         </Fragment>
 *     );
 * };
 */
var useDeleteBranchWithConfirmController = function (_a) {
    var basePath = _a.basePath, onClick = _a.onClick, record = _a.record, redirectTo = _a.redirect, resource = _a.resource;
    var _b = react_1.useState(false), open = _b[0], setOpen = _b[1];
    var notify = react_admin_1.useNotify();
    var redirect = react_admin_1.useRedirect();
    var refresh = react_admin_1.useRefresh();
    var _c = dataProvider_1.useDeleteBranch(resource, null, {
        action: actions_1.CRUD_DELETE_BRANCH,
        onSuccess: function () {
            setOpen(false);
            notify('ra.notification.deleted', 'info', { smart_count: 1 });
            redirect(redirectTo, basePath);
            refresh();
        },
        onFailure: function (error) {
            setOpen(false);
            notify(typeof error === 'string'
                ? error
                : error.message || 'ra.notification.http_error', 'warning');
        },
        undoable: false,
    }), deleteBranch = _c[0], loading = _c[1].loading;
    var handleDialogOpen = function (e) {
        setOpen(true);
        e.stopPropagation();
    };
    var handleDialogClose = function (e) {
        setOpen(false);
        e.stopPropagation();
    };
    var handleDelete = react_1.useCallback(function (event) {
        deleteBranch({
            payload: { id: record.id, data: record },
        });
        if (typeof onClick === 'function') {
            onClick(event);
        }
    }, [deleteBranch, onClick, record]);
    return { open: open, loading: loading, handleDialogOpen: handleDialogOpen, handleDialogClose: handleDialogClose, handleDelete: handleDelete };
};
exports.default = useDeleteBranchWithConfirmController;
