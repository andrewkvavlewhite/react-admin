import { ReactEventHandler } from 'react';
import { Record, RedirectionSideEffect } from 'react-admin';
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
declare const useDeleteBranchWithUndoController: ({ basePath, onClick, record, redirect: redirectTo, resource, }: UseDeleteBranchWithUndoControllerParams) => UseDeleteBranchWithUndoControllerReturn;
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
