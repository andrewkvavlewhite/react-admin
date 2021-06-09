import { SyntheticEvent } from 'react';
import { Record, RedirectionSideEffect } from 'react-admin';
declare const useDeleteWithUndoController: ({ resource, record, basePath, redirect: redirectTo, }: UseDeleteWithUndoControllerParams) => UseDeleteWithUndoControllerReturn;
interface UseDeleteWithUndoControllerParams {
    basePath?: string;
    record?: Record;
    redirect?: RedirectionSideEffect;
    resource?: string;
}
interface UseDeleteWithUndoControllerReturn {
    loading: boolean;
    handleDelete: (event: SyntheticEvent) => void;
}
export default useDeleteWithUndoController;
