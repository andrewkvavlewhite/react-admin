import React, { useState, ReactElement, FC } from 'react';
import { Datagrid, DatagridProps, useResourceContext } from 'react-admin';
import { makeStyles } from '@material-ui/core';

import EditableDatagridBody from './EditableDatagridBody';
import EditRowButton from './buttons/EditRowButton';
import DeleteRowButton from './buttons/DeleteRowButton';
import CreateButton from './buttons/CreateButton';
import CreateResourceButton from './buttons/CreateResourceButton';

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
const EditableDatagrid = (props: EditableDatagridProps): JSX.Element => {
    const {
        children,
        createForm,
        editForm,
        noDelete,
        undoable,
        ...rest
    } = props;
    const classes = useStyles(emptyProps);
    const resource = useResourceContext(props);
    const [
        isStandaloneCreateFormVisible,
        setShowStandaloneCreateForm,
    ] = useState<boolean>(false);

    const openStandaloneCreateForm = (): void => {
        setShowStandaloneCreateForm(true);
        // once the row is replaced by a form, focus the first input
        setTimeout(() => {
            const input = document.querySelectorAll('#new_record input')[0] as
                | HTMLInputElement
                | undefined;
            input && input.focus && input.focus();
        }, 100); // FIXME not super robust
    };

    const closeStandaloneCreateForm = (): void => {
        setShowStandaloneCreateForm(false);
    };

    // If EditableDatagrid is in a List view, the create form is displayed based on the route
    // If not, the create form is displayed based on an internal state (see EditableDatagridBody)
    // In order to detect if we are in a List view, we check the props that are passed
    // We choose 'defaultTitle' since it's very unlikely to have this prop in a Reference field
    // Also, we don't want to have 'defaultTitle' in the Props type, to not confuse users
    const isInListView = rest.defaultTitle !== null;
    const hasStandaloneCreateForm = !isInListView && Boolean(createForm);

    const datagridBody = (
        <EditableDatagridBody
            className={rest.className}
            closeStandaloneCreateForm={closeStandaloneCreateForm}
            createForm={createForm}
            editForm={editForm}
            expand={rest.expand}
            hasBulkActions={rest.hasBulkActions}
            hasStandaloneCreateForm={hasStandaloneCreateForm}
            isStandaloneCreateFormVisible={isStandaloneCreateFormVisible}
            undoable={undoable}
            basePath={rest.basePath}
        />
    );

    // Since <Datagrid /> returns null when there's no data
    // We need to bypass it and display our datagrid by ourself
    if (rest.loaded && (rest.ids.length === 0 || rest.total === 0)) {
        return hasStandaloneCreateForm ? (
            <>
                <CreateResourceButton
                    onClick={openStandaloneCreateForm}
                    resource={resource}
                />
                {datagridBody}
            </>
        ) : (
            datagridBody
        );
    }

    return (
        <Datagrid body={datagridBody} resource={resource} {...rest}>
            {children}
            <ActionsColumn
                headerClassName={classes.actionsColumn}
                cellClassName={classes.actionsColumn}
                undoable={undoable}
                noDelete={noDelete}
                redirect={isInListView ? 'list' : false}
                label={
                    hasStandaloneCreateForm ? (
                        <CreateButton onClick={openStandaloneCreateForm} />
                    ) : (
                        ''
                    )
                }
            />
        </Datagrid>
    );
};

export interface EditableDatagridProps extends DatagridProps {
    editForm: ReactElement;
    createForm?: ReactElement;
    undoable?: boolean;
    noDelete?: boolean;
    [key: string]: any;
}

interface ActionsColumnProp {
    headerClassName: string;
    cellClassName: string;
    undoable?: boolean;
    noDelete?: boolean;
    redirect: string | boolean;
    [key: string]: any;
}

const useStyles = makeStyles(
    {
        actionsColumn: {
            width: '5em',
        },
    },
    {
        name: 'RaEditableDatagrid',
    }
);

const emptyProps = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ActionsColumn: FC<ActionsColumnProp> = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    headerClassName,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cellClassName,
    undoable,
    noDelete,
    label,
    ...props
}) => (
    <>
        <EditRowButton />
        {!noDelete && <DeleteRowButton undoable={undoable} {...props} />}
    </>
);

export default EditableDatagrid;
