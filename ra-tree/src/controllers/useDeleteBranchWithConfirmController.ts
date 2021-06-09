import {
    useState,
    useCallback,
    ReactEventHandler,
    SyntheticEvent,
} from 'react';
import {
    Record,
    RedirectionSideEffect,
    useNotify,
    useRedirect,
    useRefresh,
} from 'react-admin';

import { useDeleteBranch } from '../dataProvider';
import { CRUD_DELETE_BRANCH } from '../actions';

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
const useDeleteBranchWithConfirmController = ({
    basePath,
    onClick,
    record,
    redirect: redirectTo,
    resource,
}: UseDeleteBranchWithConfirmControllerParams): UseDeleteBranchWithConfirmControllerReturn => {
    const [open, setOpen] = useState(false);
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();
    const [deleteBranch, { loading }] = useDeleteBranch(resource, null, {
        action: CRUD_DELETE_BRANCH,
        onSuccess: () => {
            setOpen(false);
            notify('ra.notification.deleted', 'info', { smart_count: 1 });
            redirect(redirectTo, basePath);
            refresh();
        },
        onFailure: error => {
            setOpen(false);
            notify(
                typeof error === 'string'
                    ? error
                    : error.message || 'ra.notification.http_error',
                'warning'
            );
        },
        undoable: false,
    });

    const handleDialogOpen = e => {
        setOpen(true);
        e.stopPropagation();
    };

    const handleDialogClose = e => {
        setOpen(false);
        e.stopPropagation();
    };

    const handleDelete = useCallback(
        event => {
            deleteBranch({
                payload: { id: record.id, data: record },
            });
            if (typeof onClick === 'function') {
                onClick(event);
            }
        },
        [deleteBranch, onClick, record]
    );

    return { open, loading, handleDialogOpen, handleDialogClose, handleDelete };
};

export interface UseDeleteBranchWithConfirmControllerParams {
    basePath?: string;
    onClick?: ReactEventHandler<any>;
    record?: Record;
    redirect?: RedirectionSideEffect;
    resource: string;
}

export interface UseDeleteBranchWithConfirmControllerReturn {
    open: boolean;
    loading: boolean;
    handleDialogOpen: (e: SyntheticEvent) => void;
    handleDialogClose: (e: SyntheticEvent) => void;
    handleDelete: ReactEventHandler<any>;
}

export default useDeleteBranchWithConfirmController;
