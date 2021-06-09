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
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TableBody } from '@material-ui/core';
import EditableDatagridRow from './EditableDatagridRow';
import EditableDatagridCreateForm from './EditableDatagridCreateForm';
var EditableDatagridBody = function (_a) {
    var basePath = _a.basePath, children = _a.children, classes = _a.classes, className = _a.className, data = _a.data, expand = _a.expand, hasBulkActions = _a.hasBulkActions, hover = _a.hover, ids = _a.ids, onToggleItem = _a.onToggleItem, resource = _a.resource, rowClick = _a.rowClick, rowStyle = _a.rowStyle, selectedIds = _a.selectedIds, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    version = _a.version, isRowSelectable = _a.isRowSelectable, editForm = _a.editForm, createForm = _a.createForm, undoable = _a.undoable, _b = _a.hasStandaloneCreateForm, hasStandaloneCreateForm = _b === void 0 ? false : _b, isStandaloneCreateFormVisible = _a.isStandaloneCreateFormVisible, closeStandaloneCreateForm = _a.closeStandaloneCreateForm, rest = __rest(_a, ["basePath", "children", "classes", "className", "data", "expand", "hasBulkActions", "hover", "ids", "onToggleItem", "resource", "rowClick", "rowStyle", "selectedIds", "version", "isRowSelectable", "editForm", "createForm", "undoable", "hasStandaloneCreateForm", "isStandaloneCreateFormVisible", "closeStandaloneCreateForm"]);
    return (React.createElement(TableBody, __assign({ className: classnames('datagrid-body', className) }, rest),
        createForm && (React.createElement(EditableDatagridCreateForm, { basePath: basePath, classes: classes, closeStandaloneCreateForm: closeStandaloneCreateForm, createForm: createForm, expand: expand, hasBulkActions: hasBulkActions, hasStandaloneCreateForm: hasStandaloneCreateForm, isStandaloneCreateFormVisible: isStandaloneCreateFormVisible, resource: resource })),
        ids.map(function (id, rowIndex) {
            var _a;
            return (React.createElement(EditableDatagridRow, { basePath: basePath, classes: classes, className: classnames(classes.row, (_a = {},
                    _a[classes.rowEven] = rowIndex % 2 === 0,
                    _a[classes.rowOdd] = rowIndex % 2 !== 0,
                    _a[classes.clickableRow] = rowClick,
                    _a)), expand: expand, form: editForm, hasBulkActions: hasBulkActions, hover: hover, id: id, key: id, onToggleItem: onToggleItem, record: data[id], resource: resource, rowClick: rowClick, selectable: !isRowSelectable || isRowSelectable(data[id]), selected: selectedIds.includes(id), style: rowStyle ? rowStyle(data[id], rowIndex) : null, undoable: undoable }, children));
        })));
};
EditableDatagridBody.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.any,
    className: PropTypes.string,
    children: PropTypes.node,
    data: PropTypes.object.isRequired,
    expand: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
    hasBulkActions: PropTypes.bool.isRequired,
    hover: PropTypes.bool,
    ids: PropTypes.arrayOf(PropTypes.any).isRequired,
    onToggleItem: PropTypes.func,
    resource: PropTypes.string,
    rowClick: PropTypes.string,
    rowStyle: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any),
    isRowSelectable: PropTypes.func,
    version: PropTypes.number,
};
EditableDatagridBody.defaultProps = {
    data: {},
    hasBulkActions: false,
    ids: [],
};
// trick material-ui Table into thinking this is one of the child type it supports
// @ts-ignore
EditableDatagridBody.muiName = 'TableBody';
export default EditableDatagridBody;
