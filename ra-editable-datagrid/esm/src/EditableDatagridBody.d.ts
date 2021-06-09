import { ReactNode, ReactElement, FC } from 'react';
import { Identifier, Record, useDatagridStyles } from 'react-admin';
declare const EditableDatagridBody: FC<EditableDatagridProps>;
export interface EditableDatagridProps {
    basePath?: string;
    children?: ReactNode;
    className?: string;
    classes?: ReturnType<typeof useDatagridStyles>;
    data?: any;
    expand?: ReactNode;
    hasBulkActions?: boolean;
    hover?: boolean;
    ids?: Identifier[];
    onToggleItem?: () => void;
    resource?: string;
    rowClick?: string;
    rowStyle?: (record: Record, index: number) => void;
    selectedIds?: Identifier[];
    version?: number;
    isRowSelectable?: (record: Record) => boolean;
    editForm?: ReactElement;
    createForm?: ReactElement;
    undoable?: boolean;
    hasStandaloneCreateForm?: boolean;
    isStandaloneCreateFormVisible: boolean;
    closeStandaloneCreateForm: () => void;
}
export default EditableDatagridBody;
