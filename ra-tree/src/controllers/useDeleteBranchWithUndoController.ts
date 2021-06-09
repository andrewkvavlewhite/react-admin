import { useCallback, ReactEventHandler } from 'react';
import {
    Record,
    RedirectionSideEffect,
    useRefresh,
    useNotify,
    useRedirect,
} from 'react-admin';

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
const useDeleteBranchWithUndoController = ({
    basePath,
    onClick,
    record,
    redirect: redirectTo = 'list',
    resource,
}: UseDeleteBranchWithUndoControllerParams): UseDeleteBranchWithUndoControllerReturn => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const [deleteBranch, { loading }] = useDeleteBranch(resource, null, {
        action: CRUD_DELETE_BRANCH,
        onSuccess: () => {
            notify('ra.notification.deleted', 'info', { smart_count: 1 }, true);
            redirect(redirectTo, basePath);
            refresh();
        },
        onFailure: error =>
            notify(
                typeof error === 'string'
                    ? error
                    : error.message || 'ra.notification.http_error',
                'warning'
            ),
        undoable: true,
    });
    const handleDelete = useCallback(
        event => {
            event.stopPropagation();
            deleteBranch({
                payload: { id: record.id, data: record },
            });
            if (typeof onClick === 'function') {
                onClick(event);
            }
        },
        [deleteBranch, onClick, record]
    );

    return { loading, handleDelete };
};

export interface UseDeleteBranchWithUndoControllerParams {
    basePath?: string;
    onClick?: ReactEventHandler<any>;
    record?: Record;
    redirect?: RedirectionSideEffect;
    resource: string;
}

export interface UseDeleteBranchWithUndoControllerReturn {
    loading: boolean;
    handleDelete: ReactEventHandler<any>;
}

export default useDeleteBranchWithUndoController;
