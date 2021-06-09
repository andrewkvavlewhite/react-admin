import { FC, ReactElement } from 'react';
import { CreateProps } from 'react-admin';
import { DialogProps } from '@material-ui/core';
export interface CreateDialogProps extends Omit<CreateProps, 'classes'>, Omit<DialogProps, 'open' | 'id' | 'title'> {
    children?: ReactElement;
}
/**
 * A component which displays a creation form inside a dialog.
 *
 * @param {CreateDialogProps} props
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
 *         <CreateDialog {...props}>
 *             <SimpleForm>
 *                 <TextField source="id" />
 *                 <TextInput source="first_name" validate={required()} />
 *                 <TextInput source="last_name" validate={required()} />
 *                 <DateInput source="dob" label="born" validate={required()} />
 *                 <SelectInput source="sex" choices={sexChoices} />
 *             </SimpleForm>
 *         </CreateDialog>
 *     </>
 * );
 */
declare const CreateDialog: FC<CreateDialogProps>;
export default CreateDialog;
