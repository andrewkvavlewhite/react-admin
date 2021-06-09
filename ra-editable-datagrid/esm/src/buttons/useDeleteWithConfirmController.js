import { useState, useCallback } from 'react';
import { useDelete, useRefresh, useNotify, useRedirect, CRUD_DELETE, } from 'react-admin';
var useDeleteWithConfirmController = function (_a) {
    var resource = _a.resource, record = _a.record, redirectTo = _a.redirect, basePath = _a.basePath;
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var notify = useNotify();
    var redirect = useRedirect();
    var refresh = useRefresh();
    var _c = useDelete(resource, record && record.id, record, {
        action: CRUD_DELETE,
        onSuccess: function () {
            notify('ra.notification.deleted', 'info', { smart_count: 1 });
            redirect(redirectTo, basePath);
            refresh();
        },
        onFailure: function (error) {
            notify(typeof error === 'string'
                ? error
                : error.message || 'ra.notification.http_error', 'warning');
            setOpen(false);
        },
        undoable: false,
    }), deleteOne = _c[0], loading = _c[1].loading;
    var handleClick = function (e) {
        setOpen(true);
        e.stopPropagation();
    };
    var handleDialogClose = function (e) {
        setOpen(false);
        e.stopPropagation();
    };
    var handleDelete = useCallback(function () {
        deleteOne();
    }, [deleteOne]);
    return { open: open, loading: loading, handleClick: handleClick, handleDialogClose: handleDialogClose, handleDelete: handleDelete };
};
export default useDeleteWithConfirmController;
