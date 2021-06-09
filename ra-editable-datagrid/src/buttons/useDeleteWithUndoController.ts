import { useCallback, SyntheticEvent } from 'react';
import {
    useDelete,
    useRefresh,
    useNotify,
    useRedirect,
    CRUD_DELETE,
    Record,
    RedirectionSideEffect,
} from 'react-admin';

const useDeleteWithUndoController = ({
    resource,
    record,
    basePath,
    redirect: redirectTo = 'list',
}: UseDeleteWithUndoControllerParams): UseDeleteWithUndoControllerReturn => {
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
                notify(
                    'ra.notification.deleted',
                    'info',
                    { smart_count: 1 },
                    true
                );
                redirect(redirectTo, basePath);
                refresh();
            },
            onFailure: (error: any): void =>
                notify(
                    typeof error === 'string'
                        ? error
                        : error.message || 'ra.notification.http_error',
                    'warning'
                ),
            undoable: true,
        }
    );
    const handleDelete = useCallback(
        (event: SyntheticEvent) => {
            event.stopPropagation();
            deleteOne();
        },
        [deleteOne]
    );

    return { loading, handleDelete };
};

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
