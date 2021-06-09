"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_admin_1 = require("react-admin");
var useDeleteWithConfirmController = function (_a) {
    var resource = _a.resource, record = _a.record, redirectTo = _a.redirect, basePath = _a.basePath;
    var _b = react_1.useState(false), open = _b[0], setOpen = _b[1];
    var notify = react_admin_1.useNotify();
    var redirect = react_admin_1.useRedirect();
    var refresh = react_admin_1.useRefresh();
    var _c = react_admin_1.useDelete(resource, record && record.id, record, {
        action: react_admin_1.CRUD_DELETE,
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
    var handleDelete = react_1.useCallback(function () {
        deleteOne();
    }, [deleteOne]);
    return { open: open, loading: loading, handleClick: handleClick, handleDialogClose: handleDialogClose, handleDelete: handleDelete };
};
exports.default = useDeleteWithConfirmController;
