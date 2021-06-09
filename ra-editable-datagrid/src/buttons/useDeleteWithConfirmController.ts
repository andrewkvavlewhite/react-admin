import { useState, useCallback, SyntheticEvent } from 'react';
import {
    useDelete,
    useRefresh,
    useNotify,
    useRedirect,
    CRUD_DELETE,
    Record,
    RedirectionSideEffect,
} from 'react-admin';

const useDeleteWithConfirmController = ({
    resource,
    record,
    redirect: redirectTo,
    basePath,
}: UseDeleteWithConfirmControllerParams): UseDeleteWithConfirmControllerReturn => {
    const [open, setOpen] = useState(false);
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();

    const [deleteOne, { loading }] = useDelete(
        resource,
        record && record.id,
        record,
        {
            action: CRUD_DELETE,
            onSuccess: (): void => {
                notify('ra.notification.deleted', 'info', { smart_count: 1 });
                redirect(redirectTo, basePath);
                refresh();
            },
            onFailure: (error: any): void => {
                notify(
                    typeof error === 'string'
                        ? error
                        : error.message || 'ra.notification.http_error',
                    'warning'
                );
                setOpen(false);
            },
            undoable: false,
        }
    );

    const handleClick = (e: SyntheticEvent): void => {
        setOpen(true);
        e.stopPropagation();
    };

    const handleDialogClose = (e: SyntheticEvent): void => {
        setOpen(false);
        e.stopPropagation();
    };

    const handleDelete = useCallback((): void => {
        deleteOne();
    }, [deleteOne]);

    return { open, loading, handleClick, handleDialogClose, handleDelete };
};

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
