"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_admin_1 = require("react-admin");
var useDeleteWithUndoController = function (_a) {
    var resource = _a.resource, record = _a.record, basePath = _a.basePath, _b = _a.redirect, redirectTo = _b === void 0 ? 'list' : _b;
    var notify = react_admin_1.useNotify();
    var redirect = react_admin_1.useRedirect();
    var refresh = react_admin_1.useRefresh();
    var _c = react_admin_1.useDelete(resource, record && record.id, record, {
        action: react_admin_1.CRUD_DELETE,
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
    var handleDelete = react_1.useCallback(function (event) {
        event.stopPropagation();
        deleteOne();
    }, [deleteOne]);
    return { loading: loading, handleDelete: handleDelete };
};
exports.default = useDeleteWithUndoController;
