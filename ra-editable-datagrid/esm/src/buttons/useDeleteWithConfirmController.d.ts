import { SyntheticEvent } from 'react';
import { Record, RedirectionSideEffect } from 'react-admin';
declare const useDeleteWithConfirmController: ({ resource, record, redirect: redirectTo, basePath, }: UseDeleteWithConfirmControllerParams) => UseDeleteWithConfirmControllerReturn;
export interface UseDeleteWithConfirmControllerParams {
    basePath?: string;
    record?: Record;
    redirect?: RedirectionSideEffect;
    resource?: string;
}
export interface UseDeleteWithConfirmControllerReturn {
    open: boolean;
    loading: boolean;
    handleClick: (e: SyntheticEvent) => void;
    handleDialogClose: (e: SyntheticEvent) => void;
    handleDelete: () => void;
}
export default useDeleteWithConfirmController;
