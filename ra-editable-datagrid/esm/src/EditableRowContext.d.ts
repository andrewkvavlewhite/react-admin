/// <reference types="react" />
/**
 * We need this context to communicate the callback to enable edit mode on a
 * row between the <EditableDatagridRow> and the <EditRowButton> and through
 * <DatagridRow> (which does not expect this prop).
 */
declare const EditableRowContext: import("react").Context<() => void>;
export default EditableRowContext;
