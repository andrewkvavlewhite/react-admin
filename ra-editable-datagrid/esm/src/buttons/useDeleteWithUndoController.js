import { useCallback } from 'react';
import { useDelete, useRefresh, useNotify, useRedirect, CRUD_DELETE, } from 'react-admin';
var useDeleteWithUndoController = function (_a) {
    var resource = _a.resource, record = _a.record, basePath = _a.basePath, _b = _a.redirect, redirectTo = _b === void 0 ? 'list' : _b;
    var notify = useNotify();
    var redirect = useRedirect();
    var refresh = useRefresh();
    var _c = useDelete(resource, record && record.id, record, {
        action: CRUD_DELETE,
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
    }), deleteOne = _c[0], loading = _c[1].loading;
    var handleDelete = useCallback(function (event) {
        event.stopPropagation();
        deleteOne();
    }, [deleteOne]);
    return { loading: loading, handleDelete: handleDelete };
};
export default useDeleteWithUndoController;
