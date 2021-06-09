import { FC, ReactElement } from 'react';
import { EditProps } from 'react-admin';
import { DialogProps } from '@material-ui/core';
export interface EditDialogProps extends Omit<EditProps, 'classes'>, Omit<DialogProps, 'open' | 'id' | 'title'> {
    children?: ReactElement;
}
/**
 * A component which displays an edition form inside a dialog.
 *
 * @param {EditDialogProps} props
 * @param {string} props.title The dialog's title. It accepts a translation key.
 *
 * @example
 * const PostList = props => (
 *     <>
 *         <List {...props}>
 *             <Datagrid>
 *                 ...
 *             </Datagrid>
 *         </List>
 *         <EditDialog {...props}>
 *             <SimpleForm>
 *                 <TextField source="id" />
 *                 <TextInput source="first_name" validate={required()} />
 *                 <TextInput source="last_name" validate={required()} />
 *                 <DateInput source="dob" label="born" validate={required()} />
 *                 <SelectInput source="sex" choices={sexChoices} />
 *             </SimpleForm>
 *         </EditDialog>
 *     </>
 * );
 */
declare const EditDialog: FC<EditDialogProps>;
export default EditDialog;
