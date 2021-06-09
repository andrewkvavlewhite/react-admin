# ra-editable-datagrid

The default react-admin user-experience consists of 3 pages: List, Edit, and Create. However, in some cases, users may prefer to do all search and edition tasks in one page. This package offers an "edit-in-place" experience in a `<Datagrid>`.

![ra-editable-datagrid](./assets/ra-editable-datagrid-overview.gif)

Users can click on a row in the datagrid to replace the row with an edition form, and edit the corresponding record without leaving the list. They can also create new records by clicking on the Create button, which inserts an empty editable row as the first line of the list. Finally, they can delete a record by clicking on the Delete button on each row.

You can test this module in the <a href="https://marmelab.com/ra-enterprise-demo/#/tours/ra-editable-datagrid" target="_blank">ra-editable-datagrid live demo</a>.

## Installation

```sh
npm install --save @react-admin/ra-editable-datagrid
# or
yarn add @react-admin/ra-editable-datagrid
```

**Tip**: `ra-editable-datagrid` is part of the [React-Admin Enterprise Edition](https://marmelab.com/ra-enterprise/), and hosted in a private npm registry. You need to subscribe to one of the Enterprise Edition plans to access this package.

## Usage

Use `<EditableDatagrid>` inside a react-admin `<List>` or `<ReferenceManyField>`.
It expects the same props as `<Datagrid>`, plus 4 more props:

- `editForm`: a component to display instead of a row when the users edits a record
- `createForm`: a component to display as the first row when the user creates a record
- `undoable`: whether the edit and delete actions are undoable. Defaults to false.
- `noDelete`: disable the inline Delete button

The `<EditableDatagrid>` component renders the `editForm` and `createForm` elements in a `<table>`, so these elements should render a `<tr>`. We advise you to use the `<RowForm>` component for `editForm` and `createForm`.

Note: No need to include an `<EditButton>` as child, the `<EditableDatagrid>` component adds a column with edit/delete/save/cancel buttons itself.

Note: To display a create button on top of the list, you should add the `hasCreate` prop to the `<List>` component.

Note: To be able to add a new row when the list is empty, you need to bypass the default `<List>` empty page system by following `empty={false}` as `<List>` prop.

```jsx
import React, { FC } from 'react';
import {
    List,
    TextField,
    TextInput,
    DateField,
    DateInput,
    SelectField,
    SelectInput,
    required,
} from 'react-admin';
import { EditableDatagrid, RowForm } from '@react-admin/ra-editable-datagrid';

const ArtistList: FC = props => (
    <List {...props} hasCreate empty={false}>
        <EditableDatagrid
            undoable
            createForm={<ArtistForm />}
            editForm={<ArtistForm />}
        >
            <TextField source="id" />
            <TextField source="firstname" />
            <TextField source="name" />
            <DateField source="dob" label="born" />
            <SelectField
                source="prof"
                label="Profession"
                choices={professionChoices}
            />
        </EditableDatagrid>
    </List>
);

const ArtistForm: FC = props => (
    <RowForm {...props}>
        <TextField source="id" />
        <TextInput source="firstname" validate={required()} />
        <TextInput source="name" validate={required()} />
        <DateInput source="dob" label="born" validate={required()} />
        <SelectInput
            source="prof"
            label="Profession"
            choices={professionChoices}
        />
    </RowForm>
);
```

Here is another example, illustrating the usage of an `<EditableDatagrid>` inside a `<ReferenceManyField>`. The only difference with its usage in a `<List>` is that you have to initialize the foreign key in the create form using the `initialValues` prop:

```jsx
import React, { FC } from 'react';
import {
    Edit,
    SimpleForm,
    TextField,
    DateField,
    NumberField,
    ReferenceManyField,
    TextInput,
    DateInput,
    NumberInput,
    required,
} from 'react-admin';
import { EditableDatagrid, RowForm } from '@react-admin/ra-editable-datagrid';

const OrderEdit = ({ id, ...props }) => (
    <Edit {...props} id={id}>
        <SimpleForm>
            <ReferenceManyField
                fullWidth
                label="Products"
                reference="products"
                target="order_id"
            >
                <EditableDatagrid
                    undoable
                    createForm={
                        <ProductForm initialValues={{ order_id: id }} />
                    }
                    editForm={<ProductForm />}
                    rowClick="edit"
                    hasCreate
                >
                    <TextField source="id" />
                    <TextField source="name" />
                    <NumberField source="price" label="Default Price" />
                    <DateField source="available_since" />
                </EditableDatagrid>
            </ReferenceManyField>
            <DateInput source="purchase_date" />
        </SimpleForm>
    </Edit>
);

const ProductForm = props => (
    <RowForm {...props}>
        <TextField source="id" disabled />
        <TextInput source="name" validate={required()} />
        <NumberInput
            source="price"
            label="Default Price"
            validate={required()}
        />
        <DateInput source="available_since" validate={required()} />
    </RowForm>
);
```

In these examples, the same form component is used in `createForm` and `editForm`, but you can pass different forms (e.g. if some fields can be set at creation but not changed afterwards).

## `<RowForm>`

`<RowForm>` renders a table row with one cell per child. That means that `<RowForm>` and `<EditableDatagrid>` should have the same number of children, and these children should concern the same `source`.

If you want to avoid the edition of a column, use a `<Field>` component instead of an `<Input>` component (like the `<TextField>` in the example above).

Any additional props passed to `<RowForm>` are passed to the underlying react-final-form `<Form>` component. That means that you can pass e.g. `initialValues`, `subscription`, or `validate` props. Refer to [the `<Form>` props documentation](https://final-form.org/docs/react-final-form/types/FormProps) for more details.

```jsx
const ArtistForm: FC = props => (
    <RowForm initialValues={{ firstname: 'John', name: 'Doe' }} {...props}>
        ...
    </RowForm>
);
```

## Using a Custom Row Form

`<RowForm>` is just a component rendering a `<Form>` with a list of inputs in table cells. You can choose to use your own component in `createForm` and `editForm`. Here is a version of the previous editable datagrid without `<RowForm>`:

```jsx
import React, { FC, ReactElement } from 'react';
import {
    List,
    TextField,
    TextInput,
    DateField,
    DateInput,
    SelectField,
    SelectInput,
    required,
} from 'react-admin';
import { Form } from 'react-final-form';
import { TableRow, TableCell, Checkbox } from '@material-ui/core';
import {
    EditableDatagrid,
    SaveRowButton,
    CancelEditButton,
    RowFormProps,
} from '@react-admin/ra-editable-datagrid';

const ArtistForm: FC<Omit<RowFormProps, 'children'>> = props => {
    const {
        record,
        id,
        className,
        quitEditMode,
        selectable,
        basePath,
        resource,
        save,
        saving,
        selected,
        undoable,
        ...rest
    } = props;
    return (
        <Form
            initialValues={{ firstname: 'John', name: 'Doe', ...record }}
            onSubmit={save}
            {...rest}
        >
            {({ handleSubmit, invalid, dirty }): ReactElement => (
                <TableRow className={className} key={id}>
                    <TableCell padding="checkbox">
                        {selectable && (
                            <Checkbox
                                color="primary"
                                checked={selected}
                                disabled
                            />
                        )}
                    </TableCell>
                    <TableCell>
                        <TextField
                            source="id"
                            record={record}
                            resource={resource}
                            basePath={basePath}
                        />
                    </TableCell>
                    <TableCell>
                        <TextInput
                            source="firstname"
                            validate={required()}
                            record={record}
                            resource={resource}
                            basePath={basePath}
                        />
                    </TableCell>
                    <TableCell>
                        <TextInput
                            source="name"
                            validate={required()}
                            record={record}
                            resource={resource}
                            basePath={basePath}
                        />
                    </TableCell>
                    <TableCell>
                        <DateInput
                            source="dob"
                            label="born"
                            validate={required()}
                            record={record}
                            resource={resource}
                            basePath={basePath}
                        />
                    </TableCell>
                    <TableCell>
                        <SelectInput
                            source="prof"
                            label="Profession"
                            choices={professionChoices}
                            record={record}
                            resource={resource}
                            basePath={basePath}
                        />
                    </TableCell>
                    <TableCell>
                        <SaveRowButton
                            dirty={dirty}
                            handleSubmit={handleSubmit}
                            invalid={invalid}
                            quitEditMode={quitEditMode}
                            saving={saving}
                            undoable={undoable}
                        />
                        <CancelEditButton cancel={quitEditMode} />
                    </TableCell>
                </TableRow>
            )}
        </Form>
    );
};

const ArtistList: FC<Props> = props => (
    <List
        {...props}
        hasCreate
        sort={{ field: 'id', order: 'DESC' }}
        empty={false}
    >
        <EditableDatagrid
            undoable
            createForm={<ArtistForm />}
            editForm={<ArtistForm />}
            rowClick="edit"
        >
            <TextField source="id" />
            <TextField source="firstname" />
            <TextField source="name" />
            <DateField source="dob" label="born" />
            <SelectField
                source="prof"
                label="Profession"
                choices={professionChoices}
            />
        </EditableDatagrid>
    </List>
);
```
