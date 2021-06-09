import { FC, ReactElement, ReactNode } from 'react';
import { useDatagridStyles } from 'react-admin';
declare const EditableDatagridCreateForm: FC<EditableDatagridCreateFormProps>;
export interface EditableDatagridCreateFormProps {
    basePath?: string;
    classes?: ReturnType<typeof useDatagridStyles>;
    expand?: ReactNode;
    hasBulkActions?: boolean;
    resource?: string;
    createForm?: ReactElement;
    hasStandaloneCreateForm?: boolean;
    isStandaloneCreateFormVisible: boolean;
    closeStandaloneCreateForm: () => void;
}
export default EditableDatagridCreateForm;
