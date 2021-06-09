"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var classnames_1 = __importDefault(require("classnames"));
var core_1 = require("@material-ui/core");
var EditableDatagridRow_1 = __importDefault(require("./EditableDatagridRow"));
var EditableDatagridCreateForm_1 = __importDefault(require("./EditableDatagridCreateForm"));
var EditableDatagridBody = function (_a) {
    var basePath = _a.basePath, children = _a.children, classes = _a.classes, className = _a.className, data = _a.data, expand = _a.expand, hasBulkActions = _a.hasBulkActions, hover = _a.hover, ids = _a.ids, onToggleItem = _a.onToggleItem, resource = _a.resource, rowClick = _a.rowClick, rowStyle = _a.rowStyle, selectedIds = _a.selectedIds, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    version = _a.version, isRowSelectable = _a.isRowSelectable, editForm = _a.editForm, createForm = _a.createForm, undoable = _a.undoable, _b = _a.hasStandaloneCreateForm, hasStandaloneCreateForm = _b === void 0 ? false : _b, isStandaloneCreateFormVisible = _a.isStandaloneCreateFormVisible, closeStandaloneCreateForm = _a.closeStandaloneCreateForm, rest = __rest(_a, ["basePath", "children", "classes", "className", "data", "expand", "hasBulkActions", "hover", "ids", "onToggleItem", "resource", "rowClick", "rowStyle", "selectedIds", "version", "isRowSelectable", "editForm", "createForm", "undoable", "hasStandaloneCreateForm", "isStandaloneCreateFormVisible", "closeStandaloneCreateForm"]);
    return (react_1.default.createElement(core_1.TableBody, __assign({ className: classnames_1.default('datagrid-body', className) }, rest),
        createForm && (react_1.default.createElement(EditableDatagridCreateForm_1.default, { basePath: basePath, classes: classes, closeStandaloneCreateForm: closeStandaloneCreateForm, createForm: createForm, expand: expand, hasBulkActions: hasBulkActions, hasStandaloneCreateForm: hasStandaloneCreateForm, isStandaloneCreateFormVisible: isStandaloneCreateFormVisible, resource: resource })),
        ids.map(function (id, rowIndex) {
            var _a;
            return (react_1.default.createElement(EditableDatagridRow_1.default, { basePath: basePath, classes: classes, className: classnames_1.default(classes.row, (_a = {},
                    _a[classes.rowEven] = rowIndex % 2 === 0,
                    _a[classes.rowOdd] = rowIndex % 2 !== 0,
                    _a[classes.clickableRow] = rowClick,
                    _a)), expand: expand, form: editForm, hasBulkActions: hasBulkActions, hover: hover, id: id, key: id, onToggleItem: onToggleItem, record: data[id], resource: resource, rowClick: rowClick, selectable: !isRowSelectable || isRowSelectable(data[id]), selected: selectedIds.includes(id), style: rowStyle ? rowStyle(data[id], rowIndex) : null, undoable: undoable }, children));
        })));
};
EditableDatagridBody.propTypes = {
    basePath: prop_types_1.default.string,
    classes: prop_types_1.default.any,
    className: prop_types_1.default.string,
    children: prop_types_1.default.node,
    data: prop_types_1.default.object.isRequired,
    expand: prop_types_1.default.oneOfType([prop_types_1.default.element, prop_types_1.default.elementType]),
    hasBulkActions: prop_types_1.default.bool.isRequired,
    hover: prop_types_1.default.bool,
    ids: prop_types_1.default.arrayOf(prop_types_1.default.any).isRequired,
    onToggleItem: prop_types_1.default.func,
    resource: prop_types_1.default.string,
    rowClick: prop_types_1.default.string,
    rowStyle: prop_types_1.default.func,
    selectedIds: prop_types_1.default.arrayOf(prop_types_1.default.any),
    isRowSelectable: prop_types_1.default.func,
    version: prop_types_1.default.number,
};
EditableDatagridBody.defaultProps = {
    data: {},
    hasBulkActions: false,
    ids: [],
};
// trick material-ui Table into thinking this is one of the child type it supports
// @ts-ignore
EditableDatagridBody.muiName = 'TableBody';
exports.default = EditableDatagridBody;
