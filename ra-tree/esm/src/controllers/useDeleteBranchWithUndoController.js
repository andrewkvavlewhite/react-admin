import { useCallback } from 'react';
import { useRefresh, useNotify, useRedirect, } from 'react-admin';
import { useDeleteBranch } from '../dataProvider';
import { CRUD_DELETE_BRANCH } from '../actions';
/**
 * Prepare callback for a delete branch button with undo support
 *
 * @example
 *
 * import React from 'react';
 * import ActionDelete from '@material-ui/icons/Delete';
 * import { Button, useDeleteBranchWithUndoController } from '@react-admin/ra-tree';
 *
 * const DeleteButton = ({
 *     resource,
 *     record,
 *     basePath,
 *     redirect,
 *     onClick,
 *     ...rest
 * }) => {
 *     const { loading, handleDelete } = useDeleteBranchWithUndoController({
 *         resource,
 *         record,
 *         basePath,
 *         redirect,
 *         onClick,
 *     });
 *
 *     return (
 *         <Button
 *             onClick={handleDelete}
 *             disabled={loading}
 *             label="ra.action.delete"
 *             {...rest}
 *         >
 *             <ActionDelete />
 *         </Button>
 *     );
 * };
 */
var useDeleteBranchWithUndoController = function (_a) {
    var basePath = _a.basePath, onClick = _a.onClick, record = _a.record, _b = _a.redirect, redirectTo = _b === void 0 ? 'list' : _b, resource = _a.resource;
    var notify = useNotify();
    var redirect = useRedirect();
    var refresh = useRefresh();
    var _c = useDeleteBranch(resource, null, {
        action: CRUD_DELETE_BRANCH,
        onSuccess: function () {
            notify('ra.notification.deleted', 'info', { smart_count: 1 }, true);
            redirect(redirectTo, basePath);
            refresh();
        },
        onFailure: function (error) {
            return notify(typeof error === 'string'
                ? error
                : error.message || 'ra.notification.http_error', 'warning');
        },
        undoable: true,
    }), deleteBranch = _c[0], loading = _c[1].loading;
    var handleDelete = useCallback(function (event) {
        event.stopPropagation();
        deleteBranch({
            payload: { id: record.id, data: record },
        });
        if (typeof onClick === 'function') {
            onClick(event);
        }
    }, [deleteBranch, onClick, record]);
    return { loading: loading, handleDelete: handleDelete };
};
export default useDeleteBranchWithUndoController;
