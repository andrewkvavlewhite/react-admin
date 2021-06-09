"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 * We need this context to communicate the callback to enable edit mode on a
 * row between the <EditableDatagridRow> and the <EditRowButton> and through
 * <DatagridRow> (which does not expect this prop).
 */
var EditableRowContext = react_1.createContext(function () { return undefined; });
exports.default = EditableRowContext;
