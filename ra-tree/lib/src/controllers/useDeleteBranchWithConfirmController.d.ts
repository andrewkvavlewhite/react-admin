import { ReactEventHandler, SyntheticEvent } from 'react';
import { Record, RedirectionSideEffect } from 'react-admin';
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
declare const useDeleteBranchWithConfirmController: ({ basePath, onClick, record, redirect: redirectTo, resource, }: UseDeleteBranchWithConfirmControllerParams) => UseDeleteBranchWithConfirmControllerReturn;
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
