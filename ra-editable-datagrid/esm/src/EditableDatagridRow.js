var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { cloneElement, useState, useCallback, } from 'react';
import { useUpdate, useNotify, CRUD_UPDATE, DatagridRow, } from 'react-admin';
import { makeStyles } from '@material-ui/core';
import EditableRowContext from './EditableRowContext';
var EditableRow = function (_a) {
    var form = _a.form, resource = _a.resource, id = _a.id, record = _a.record, basePath = _a.basePath, children = _a.children, rowClick = _a.rowClick, undoable = _a.undoable, rest = __rest(_a, ["form", "resource", "id", "record", "basePath", "children", "rowClick", "undoable"]);
    var _b = useState(false), isEdit = _b[0], setEdit = _b[1];
    var classes = useStyles(emptyObject);
    var openEditMode = function () {
        setEdit(true);
    };
    var quitEditMode = function () {
        setEdit(false);
    };
    var notify = useNotify();
    var _c = useUpdate(resource, id, {}, // set by the caller
    record), update = _c[0], saving = _c[1].loading;
    var handleClick = useCallback(function (event) {
        var _a = getTableClickEventPosition(event), tbody = _a.tbody, row = _a.row, column = _a.column;
        openEditMode();
        // once the row is replaced by a form, focus the input inside the cell clicked
        setTimeout(function () {
            // No way to know the markup of the form in advance, as developers
            // can inject a form element of their own. The only valid assumption
            // is that the form should have the same number of columns as the row.
            // So we select the input based on the column it's in.
            var input = tbody.querySelector("tr:nth-child(" + row + ") td:nth-child(" + column + ") input");
            input && input.focus && input.focus();
        }, 100); // FIXME not super robust
    }, []);
    var save = useCallback(function (data) {
        return update({ payload: { data: data } }, {
            action: CRUD_UPDATE,
            onSuccess: function () {
                notify('ra.notification.updated', 'info', {
                    smart_count: 1,
                }, undoable);
                if (!undoable) {
                    quitEditMode();
                }
            },
            onFailure: function (error) {
                notify(typeof error === 'string'
                    ? error
                    : error.message || 'ra.notification.http_error', 'warning');
            },
            undoable: undoable,
        });
    }, [update, undoable, notify]);
    return isEdit ? (cloneElement(form, __assign({ id: id,
        quitEditMode: quitEditMode,
        resource: resource,
        record: record,
        basePath: basePath,
        save: save,
        saving: saving,
        undoable: undoable }, rest))) : (React.createElement(EditableRowContext.Provider, { value: openEditMode },
        React.createElement(DatagridRow, __assign({ resource: resource, id: id, record: record, basePath: basePath }, rest, { className: classes.td, onClick: rowClick === 'edit' ? handleClick : function () { return undefined; } }), children)));
};
/**
 * Based on a MouseEvent triggered by a click on a table row,
 * get the tbody element, the row and column number of the cell clicked.
 *
 * @param {MouseEvent} event
 */
var getTableClickEventPosition = function (event) {
    var target = event.target;
    var td = target.closest('td');
    var tr = td.parentNode;
    var columns = tr.children;
    var column;
    for (var index = 0; index < columns.length; index++) {
        if (columns.item(index) === td) {
            column = index + 1;
        }
    }
    var tbody = tr.parentNode;
    var rows = tbody.children;
    var row;
    for (var index = 0; index < rows.length; index++) {
        if (rows.item(index) === tr) {
            row = index + 1;
        }
    }
    return { tbody: tbody, row: row, column: column };
};
var useStyles = makeStyles({
    td: {
        '& td:last-of-type > *': {
            visibility: 'hidden',
        },
        '&:hover td:last-of-type > *': {
            visibility: 'visible',
        },
    },
}, {
    name: 'RaEditableDatagridRow',
});
var emptyObject = {};
export default EditableRow;
