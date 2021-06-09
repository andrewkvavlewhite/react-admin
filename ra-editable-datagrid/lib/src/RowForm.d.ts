import { ReactNode, FC } from 'react';
import { FormProps } from 'react-final-form';
import { Record, Identifier, useDatagridStyles } from 'react-admin';
/**
 * A form to be rendered as a table row in an <EditableDatagrid>.
 *
 * All the props it expects are injected by <EditableDatagrid>. You should only
 * provide children to be rendered in each table cell.
 *
 * The children should be Input components, just like in a <SimpleForm>. You
 * can also pass a <Field> component as child.
 *
 * <RowForm> should have as many children as the <EditableDatagrid> that calls
 * it, or there will be a colSpan issue.
 *
 * @example
 *
 *     const ArtistForm: FC = props => (
 *         <RowForm {...props}>
 *             <TextField source="id" />
 *             <TextInput source="firstname" validate={required()} />
 *             <TextInput source="name" validate={required()} />
 *             <DateInput source="dob" label="born" validate={required()} />
 *             <SelectInput
 *                 source="prof"
 *                 label="Profession"
 *                 choices={professionChoices}
 *             />
 *         </RowForm>
 *     );
 *
 * @see EditableDatagrid
 */
declare const RowForm: FC<RowFormProps & Omit<FormProps, 'onSubmit'>>;
export interface RowFormProps {
    record?: Record;
    quitEditMode?: () => void;
    children: ReactNode;
    className?: string;
    classes?: ReturnType<typeof useDatagridStyles>;
    id?: Identifier;
    expand?: boolean;
    hasBulkActions?: boolean;
    selectable?: boolean;
    selected?: boolean;
    basePath?: string;
    resource?: string;
    undoable?: boolean;
    save?: (data: Partial<Record>) => void;
    saving?: boolean;
}
export default RowForm;
