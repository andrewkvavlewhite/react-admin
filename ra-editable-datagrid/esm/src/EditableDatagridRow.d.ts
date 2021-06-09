import { ReactElement, ReactNode, FC } from 'react';
import { Record, Identifier, useDatagridStyles } from 'react-admin';
declare const EditableRow: FC<EditableRowProps>;
export interface EditableRowProps {
    classes?: ReturnType<typeof useDatagridStyles>;
    form: ReactElement;
    resource?: string;
    id?: Identifier;
    record?: Record;
    basePath?: string;
    children?: ReactNode;
    undoable?: boolean;
    rowClick?: string;
    [key: string]: any;
}
export default EditableRow;
