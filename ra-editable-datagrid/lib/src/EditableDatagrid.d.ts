import { ReactElement } from 'react';
import { DatagridProps } from 'react-admin';
/**
 * Component to display and edit tabular data.
 *
 * To be used as child of <List> or <ReferenceManyField>.
 * The <EditableDatagrid> expects the same props as <Datagrid>, plus 4 more props:
 *
 * - editForm: a component to display instead of a row when the users edits a record
 * - createForm: a component to display as the first row when the user creates a record
 * - undoable: whether the edit and delete actions are undoable. Defaults to false.
 * - noDelete: disable the inline Delete button
 *
 * The component renders the editForm and createForm elements in a <table>, so they
 * should render a <tr>. We advise you to use <RowForm> for editForm and createForm.
 *
 * Note: No need to include an <EditButton> as child, the <EditableDatagrid>
 * component adds a column with edit/delete/save/cancel buttons itself.
 *
 * Note: To enable the create form in a <List>, you should add the `hasCreate`
 * prop to the <List> component.
 *
 * @example
 *
 *     const ArtistList = props => (
 *         <List {...props} hasCreate>
 *             <EditableDatagrid
 *                 undoable
 *                 createForm={<ArtistForm />}
 *                 editForm={<ArtistForm />}
 *             >
 *                 <TextField source="id" />
 *                 <TextField source="firstname" />
 *                 <TextField source="name" />
 *                 <DateField source="dob" label="born" />
 *                 <SelectField
 *                     source="prof"
 *                     label="Profession"
 *                     choices={professionChoices}
 *                 />
 *             </EditableDatagrid>
 *         </List>
 *     );
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
 * @example // inside a <ReferenceManyField> - remember to set the foreign ket in the createForm using initialValues
 *
 *     const OrderEdit = ({ id, ...props }) => (
 *         <Edit {...props} id={id}>
 *             <SimpleForm>
 *                 <ReferenceManyField
 *                     fullWidth
 *                     label="Products"
 *                     reference="products"
 *                     target="order_id"
 *                 >
 *                     <EditableDatagrid
 *                         undoable
 *                         createForm={<ProductForm initialValues={{ order_id: id }} />}
 *                         editForm={<ProductForm />}
 *                     >
 *                         <TextField source="id" />
 *                         <TextField source="name" />
 *                         <NumberField source="price" label="Default Price" />
 *                         <DateField source="available_since" />
 *                     </EditableDatagrid>
 *                 </ReferenceManyField>
 *                 <DateInput source="purchase_date" />
 *             </SimpleForm>
 *         </Edit>
 *     );
 *
 *     const ProductForm = props => (
 *         <RowForm {...props}>
 *             <TextField source="id" disabled />
 *             <TextInput source="name" validate={required()} />
 *             <NumberInput
 *                 source="price"
 *                 label="Default Price"
 *                 validate={required()}
 *             />
 *             <DateInput source="available_since" validate={required()} />
 *         </RowForm>
 *     );
 *
 * @see Datagrid for the other props
 * @see RowForm for the create and edit form
 */
declare const EditableDatagrid: (props: EditableDatagridProps) => JSX.Element;
export interface EditableDatagridProps extends DatagridProps {
    editForm: ReactElement;
    createForm?: ReactElement;
    undoable?: boolean;
    noDelete?: boolean;
    [key: string]: any;
}
export default EditableDatagrid;
