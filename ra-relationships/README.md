# ra-relationships

A set of alternative inputs and fields to edit relationships, including many-to-many relationships using a join table.

## Installation

```sh
npm install --save @react-admin/ra-relationships
# or
yarn add @react-admin/ra-relationships
```

**Tip**: `ra-relationships` is part of the [React-Admin Enterprise Edition](https://marmelab.com/ra-enterprise/), and hosted in a private npm registry. You need to subscribe to one of the Enterprise Edition plans to access this package.

## DualListInput

![DualListInput](assets/ra-relationships-duallistinput.gif)

To let users choose mulitple values by moving them from a list of available choices to a list of selected choices, use a `DualListInput`. It renders using two [Material ui's <List>](https://material-ui.com/components/lists/). Set the `choices` prop to determine the options (with `id`, `name` tuples):

```jsx
const choices = [
   { id: 'programming', name: 'Programming' },
   { id: 'lifestyle', name: 'Lifestyle' },
   { id: 'photography', name: 'Photography' },
];
<DualListInput source="tags" choices={choices} />
```
### Properties

| Prop                  | Required | Type                       | Default                                         | Description                                                                                                                                                                                  |
| --------------------- | -------- | -------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `choices`             | Required | `Object[]`                 | -                                               | List of items to show as options                                                                                                                                                             |
| `emptyText`           | Optional | `string`                   | ''                                              | The text to display for the empty option                                                                                                                                                     |
| `optionText`          | Optional | `string` &#124; `Function` | `name`                                          | Fieldname of record to display in the suggestion item, function which accepts the current record as argument (`(record)=> {string}`) or an element which will be cloned with a `record` prop |
| `optionValue`         | Optional | `string`                   | `id`                                            | Fieldname of record containing the value to use as input value                                                                                                                               |
| `disableValue`        | Optional | `string`                   | `disabled`                                      | Fieldname of record containing the value to use to determine if an item should be disabled                                                                                                   |
| `translateChoice`     | Optional | `boolean`                  | `true`                                          | Whether the choices should be translated                                                                                                                                                     |
| `addButtonLabel`      | Optional | `string`                   | `ra-relationships.duallistinput.select`         | The text or translation key to use as the label for the add button                                                                                                                           |
| `removeButtonLabel`   | Optional | `string`                   | `ra-relationships.duallistinput.unselect`       | The text or translation key to use as the label for the remove button                                                                                                                        |
| `availableItemsLabel` | Optional | `string`                   | `ra-relationships.duallistinput.availableItems` | The text or translation key to use as the label for the list of available choices                                                                                                            |
| `selectedItemsLabel`  | Optional | `string`                   | `ra-relationships.duallistinput.selectedItems`  | The text or translation key to use as the label for the list of selected choices                                                                                                             |

You can also customize the properties to use for the option name and value,
thanks to the 'optionText' and 'optionValue' attributes.

### Usage

You can customize the properties to use for the option name and value, thanks to the `optionText` and `optionValue` attributes:

```jsx
const choices = [
    { _id: 123, full_name: 'Leo Tolstoi', sex: 'M' },
    { _id: 456, full_name: 'Jane Austen', sex: 'F' },
];
<DualListInput source="author_id" choices={choices} optionText="full_name" optionValue="_id" />
```

`optionText` also accepts a function, so you can shape the option text at will:

```jsx
const choices = [
   { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
   { id: 456, first_name: 'Jane', last_name: 'Austen' },
];
const optionRenderer = choice => `${choice.first_name} ${choice.last_name}`;
<DualListInput source="author_id" choices={choices} optionText={optionRenderer} />
```

`optionText` also accepts a React Element, that will be cloned and receive the related choice as the `record` prop. You can use Field components there.

```jsx
const choices = [
   { id: 123, first_name: 'Leo', last_name: 'Tolstoi' },
   { id: 456, first_name: 'Jane', last_name: 'Austen' },
];
const FullNameField = ({ record }) => <span>{record.first_name} {record.last_name}</span>;
<DualListInput source="gender" choices={choices} optionText={<FullNameField />}/>
```

The choices are translated by default, so you can use translation identifiers as choices:

```jsx
const choices = [
   { id: 'M', name: 'myroot.gender.male' },
   { id: 'F', name: 'myroot.gender.female' },
];
```

However, in some cases, you may not want the choice to be translated. In that case, set the `translateChoice` prop to `false`.

```jsx
<DualListInput source="gender" choices={choices} translateChoice={false}/>
```

Note that `translateChoice` is set to `false` when `<DualListInput>` is a child of `<ReferenceInput>`.

**Tip**: If you want to populate the `choices` attribute with a list of related records, you should decorate `<DualListInput>` with [`<ReferenceArrayInput>`](https://marmelab.com/react-admin/Inputs.html#referencearrayinput), and leave the `choices` empty:

```jsx
import { ReferenceInput } from 'react-admin';
import { DualListInput } from '@react-admin/ra-relationships';

<ReferenceArrayInput label="Author" source="author_id" reference="authors">
    <DualListInput optionText="last_name" />
</ReferenceArrayInput>
```

You can set disabled values by setting the `disabled` property of one item:

```jsx
const choices = [
    { _id: 123, full_name: 'Leo Tolstoi', sex: 'M' },
    { _id: 456, full_name: 'Jane Austen', sex: 'F' },
    { _id: 1, full_name: 'System Administrator', sex: 'F', disabled: true },
];
<DualListInput source="author_id" choices={choices} optionText="full_name" optionValue="_id" />
```

You can use a custom field name by setting `disableValue` prop:

```jsx
const choices = [
    { _id: 123, full_name: 'Leo Tolstoi', sex: 'M' },
    { _id: 456, full_name: 'Jane Austen', sex: 'F' },
    { _id: 987, full_name: 'Jack Harden', sex: 'M', not_available: true },
];
<DualListInput source="contact_id" choices={choices} optionText="full_name" optionValue="_id" disableValue="not_available" />
```

## Many-To-Many Relationships

![ra-many-to-many](./assets/ra-many-to-many-overview.gif)

Developers usually store [many-to-many relationships](https://en.wikipedia.org/wiki/Many-to-many_(data_model)) in databases using an associative table (also known as *join table*, *junction table* or *cross-reference table*). For instance, if a Book can have many Authors, and an Author can write several Books, the normalized way to store this relationship in a relational database uses an intermediate table `book_authors`, as follows:

```
┌──────────────────┐       ┌──────────────┐      ┌───────────────┐
│ books            │       │ book_authors │      │ authors       │
│------------------│       │--------------│      │---------------│
│ id               │───┐   │ id           │      │ id            │
│ title            │   └──╼│ book_id      │   ┌──│ first_name    │
│ body             │       │ author_id    │╾──┘  │ last_name     │
│ publication_date │       │ is_public    │      │ date_of_birth │
└──────────────────┘       └──────────────┘      └───────────────┘
```

In the `book_authors` table, `book_id` and `author_id` are both foreign keys to `books` and `authors`.

A REST API closely following this data model exposes the three resources `/books`, `/authors`, and `/book_authors`. `ra-relationships` components rely on the associative table without ever showing it to the end user. From the end user's point of view, the associative table is an implementation detail. 

### Out of scope

If the associative table uses a composite primary key, then `ra-relationships` does not work, as react-admin require that all entities expose a identifier called `id`. For example, if user permissions is seen as a many-to-many relationship, it can be modeled in a relational database as follows:

```
users         user_permissions    permissions
----------    ----------------    -----------------                
login         user_login          key
password      permission_key      description
first_name
last_name
```

Here, the associative table uses a composite primary key made of the tuple `(user_login, permission_key)`. To allow react-admin to use this associative table, the related API route (`/user_permissions`) must include a unique `id` field for each records (which can simply be the concatenation of the two foreign keys). 

Also, if your REST API can present that relationship through a list of related record ids (e.g. `author_ids` in `books` and `book_ids` in `authors`), you don't need `ra-relationships`. Just use `<ReferenceArrayField>` and `<ReferenceArrayInput>`, which are standard components in react-admin. 

### `<ReferenceManyToManyField>`

This component fetches a list of referenced records by lookup in an associative table, and passes the records down to its child component, which must be an iterator component. 

**Note**: The `<ReferenceManyToManyField>` cannot currently display multiple records with the same id from the end reference resource even though they might have different properties in the associative table.

For instance, here is how to fetch the `authors` related to a `book` record by matching `book.id` to `book_authors.post_id`, then matching `book_authors.author_id` to `authors.id`, and then display the author `last_name` for each, in a `<ChipField>`:

```jsx
import React from 'react';
import { 
    Show,
    SimpleShowLayout,
    TextField,
    DateField,
    SingleFieldList,
    ChipField,
} from 'react-admin';
import { ReferenceManyToManyField } from '@react-admin/ra-relationships';

export const BookShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title" />
            <DateField source="publication_date">
            <ReferenceManyToManyField 
                reference="authors"
                through="book_authors"
                using="book_id,author_id"
            >
                <SingleFieldList>
                    <ChipField source="last_name" />
                </SingleFieldList>
            </ReferenceManyToManyField>
            <EditButton />
        </SimpleShowLayout>
    </Show>
);
```

`<ReferenceManyToManyField>` expects an *iterator* component as child, i.e. a component accepting a list of `ids` and a `data` object of the records indexed by `id`. That means you can use a `<Datagrid>` instead of a `<SingleFieldList>` - but not inside another `<Datagrid>`! This is useful if you want to display a more detailed view of related records. For instance, to display the author `first_name` and `last_name`:

```diff
export const BookShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title" />
            <DateField source="publication_date">
            <ReferenceManyToManyField 
                reference="authors"
                through="book_authors"
                using="book_id,author_id"
            >
-               <SingleFieldList>
-                   <ChipField source="last_name" />
-               </SingleFieldList>
+               <Datagrid>
+                   <TextField source="first_name" />
+                   <TextField source="last_name" />
+               </Datagrid>
            </ReferenceManyToManyField>
            <EditButton />
        </SimpleShowLayout>
    </Show>
);
```

#### `dataProvider` Calls

`<ReferenceManyToManyField>` fetches the `dataProvider` twice in a row:

- once to get the records of the associative resource (`book_authors` in this case), using a `getManyReference()` call
- once to get the records of the reference resource (`books` in this case), using a `getMany()` call. 

**Note**: You **must** add a `<Resource>` for the reference and associative resources - react-admin needs them to fetch the reference data. You *can* omit the `list` prop in this reference if you want to hide these resources in the sidebar menu.

For instance, if the user displays the book of id `123`, `<ReferenceManyToManyField>` first issues the following query to the `dataProvider`:

```js
dataProvider.getManyReference('book_authors', {
    target: 'book_id',
    id: 123,
});
```

Let's say that the `dataProvider` returns the following response:

```json
{
    "data": [
        { "id": 667, "book_id": 123, "author_id": 732 },
        { "id": 895, "book_id": 123, "author_id": 874 },
    ],
    "total": 2,
}
```

Then, `<ReferenceManyToManyField>` issues a second query to the `dataProvider`:

```js
dataProvider.getMany('books', {
    ids: [732, 874],
});
```

#### Props

| Prop         | Required | Type                                        | Default                            | Description                                                                                                                                                                                                       |
| ------------ | -------- | ------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reference`  | Required | `string`                                    | -                                  | Name of the reference resource, e.g. 'authors'                                                                                                                                                                    |
| `through`    | Required | `string`                                    | -                                  | Name of the resource for the associative table, e.g. 'book_authors'                                                                                                                                               |
| `children`   | Required | `element`                                   | -                                  | An iterator element (e.g. `<SingleFieldList>` or `<Datagrid>`). The iterator element usually has one or more child `<Field>` components.                                                                          |
| `using`      | Optional | `string`                                    | `'([resource]_id,[reference]_id)'` | Tuple (comma separated) of the two field names used as foreign keys, e.g 'book_id,author_id'. The tuple should start with the field pointing to the resource, and finish with the field pointing to the reference |
| `source`     | Optional | `string`                                    | `'id'`                             | Name of the field containing the identity of the main resource. Used determine the value to look for in the associative table.                                                                                    |
| `perPage`    | Optional | `number`                                    | 25                                 | Limit for the number of results fetched from the associative table                                                                                                                                                |
| `pagination` | Optional | `element`                                   | `null`                             | Pagination element (see below)                                                                                                                                                                                    |
| `sort`       | Optional | `{ field: string, order: 'ASC' or 'DESC' }` | `{ field: 'id', order: 'DESC' }`   | Sort for the associative table (passed to the `getManyReference()` call)                                                                                                                                          |
| `filter`     | Optional | `object`                                    | `{}`                               | Filter for the associative table (passed to the `getManyReference()` call)                                                                                                                                        |

Here are example usage for these props:

```jsx
// You can specify the associative table name using the `through` prop.
<ReferenceManyToManyField 
    reference="authors"
    through="book_authors_assoc"
>
   ...
</ReferenceManyToManyField>

// You can specify the associative table columns using the `using` prop.
<ReferenceManyToManyField 
    reference="authors"
    through="book_authors"
    using="b_id,a_id"
>
   ...
</ReferenceManyToManyField>

// By default, react-admin restricts the possible values to 25
// and displays no pagination control. You can change the limit by setting the `perPage` prop:
<ReferenceManyToManyField 
    reference="authors"
    through="book_authors"
    using="book_id,author_id"
    perPage={10}
>
   ...
</ReferenceManyToManyField>

// And if you want to allow users to paginate the list, pass a `<Pagination>` element as the `pagination` prop:
import { Pagination } from 'react-admin';
<ReferenceManyToManyField 
    reference="authors"
    through="book_authors"
    using="book_id,author_id"
    pagination={<Pagination />}
>
   ...
</ReferenceManyToManyField>

// By default, react-admin orders the possible values by `id` desc.
// You can change this order by setting the `sort` prop (an object with `field` and `order` properties)
// to be applied to the associative resource.
<ReferenceManyToManyField 
    reference="authors"
    through="book_authors"
    using="book_id,author_id"
    sort={{ field: 'id', order: 'DESC' }}
>
   ...
</ReferenceManyToManyField>

// Also, you can filter the records of the associative table using the `filter` prop.
<ReferenceManyToManyField 
    reference="authors"
    through="book_authors"
    using="book_id,author_id"
    filter={{ is_public: true }}
>
   ...
</ReferenceManyToManyField>
```

### `<ReferenceManyToManyInput>`

This component allows to create, edit or remove relationships between two resources sharing an associative table. The changes in the associative table are sent to the dataProvider *when the user submits the form*, so that they can cancel the changes before submission.

This is why you'll have to include the `ManyToManyReferenceContextProvider` as the first child of the `Edit` or `Create` component as it will override the default `save` function injected to the underlying form and take care of sending the correct `create` and `update` calls in the right order.

**Tip**: As it creates or updates records of several resources, `<ReferenceManyToManyInput>` can only be used in a form where optimistic rendering is disabled (e.g `<SimpleForm undoable={false}>`).

**Note**: The `<ReferenceManyToManyInput>` cannot currently display multiple records with the same id from the end reference resource even though they might have different properties in the associative table.

For instance, here is how to edit the `events` related to an `artists` record through a `performances` associative table. 

```
┌────────────┐       ┌──────────────┐      ┌────────┐
│ artists    │       │ performances │      │ events │
│------------│       │--------------│      │--------│
│ id         │───┐   │ id           │      │ id     │
│ first_name │   └──╼│ artist_id    │   ┌──│ name   │
│ last_name  │       │ event_id     │╾──┘  │        │
└────────────┘       └──────────────┘      └────────┘
```

In this example, `artists.id` matches `performances.artist_id`, and `performances.event_id` matches `events.id`. The form displays the events `name` in a `<SelectArrayInput>`:

```tsx
import React from 'react';
import { Edit, EditProps, SelectArrayInput, SimpleForm, TextInput, required } from 'react-admin';

import { ReferenceManyToManyInput, ManyToManyReferenceContextProvider } from '@react-admin/ra-relationships';

const ArtistEdit = (props: EditProps) => (
    <Edit {...props}>
        {/*
            The ManyToManyReferenceContextProvider wrapper around the form is needed.
            This component is responsible for handling the references updates even when
            there are multiple ReferenceManyToManyInput targeting different relations.
        */}
        <ManyToManyReferenceContextProvider>
            <SimpleForm>
                <TextInput disabled source="id" />
                <TextInput source="first_name" />
                <TextInput source="last_name" />
                <ReferenceManyToManyInput
                    source="id"
                    reference="events"
                    through="performances"
                    using="artist_id,event_id"
                    fullWidth
                    label="Performances"
                    // Validation must be set on this component
                    validate={required()}
                >
                    <SelectArrayInput optionText="name" />
                </ReferenceManyToManyInput>
            </SimpleForm>
        </ManyToManyReferenceContextProvider>
    </Edit>
);

export default ArtistEdit;
```

**Note**: If you need to apply validation such as `required`, the `validate` prop must be set on the `ReferenceManyToManyInput` component itself.


#### `dataProvider` Calls

When rendered, `<ReferenceManyToManyInput>` fetches the `dataProvider` three times in a row:

- once to get the records of the associative resource (`performances` in this case), using a `getManyReference()` call
- once to get the records of the reference resource (`events` in this case), using a `getMany()` call. 
- once to get the possible values of the reference resource (`events` in this case) to show as suggestions in the input, using a `getList()` call

**Note**: You **must** add a `<Resource>` for the reference and associative resources - react-admin needs them to fetch the reference data. You *can* omit the `list` prop in the associative recource if you want to hide it in the sidebar menu.

For instance, if the user edits the artist of id `123`, `<ReferenceManyToManyInput>` first issues the following query to the `dataProvider`:

```js
dataProvider.getManyReference('performances', {
    target: 'artist_id',
    id: 123,
});
```

Let's say that the `dataProvider` returns the following response:

```json
{
    "data": [
        { "id": 667, "artist_id": 123, "event_id": 732 },
        { "id": 895, "artist_id": 123, "event_id": 874 },
    ],
    "total": 2,
}
```

Then, `<ReferenceManyToManyInput>` issues a second query to the `dataProvider`:

```js
dataProvider.getMany('events', {
    ids: [732, 874],
});
```

Which returns the following:

```json
{
    "data": [
        { "id": 732, "name": "Acme Rock Festival" },
        { "id": 874, "name": "Roll and Rock 2020" }
    ]
}
```

That's enough to display the current value in the input. But to display events suggestions, the component makes a final call:

```js
dataProvider.getList('events', {
    sort: { field: 'id', order: 'DESC' },
    pagination: { page: 1, perPage: 25 },
    filter: {},
});
```

```json
{
    "data": [
        { "id": 1, "name": "Rock Your Town" },
        { "id": 2, "name": "Aime le Rock" },
        { "id": 3, "name": "Breed Festival" },
        ...
    ]
}
```

And that's it for the display phase. 

When the user submits the form, the `save` function returned by the `useReferenceManyToManyUpdate` hook compares the value of the `ReferenceManyToManyInput` (the list of relationships edited by the user) with the value previously returned by the `dataProvider`. Using a diffing algorithm, it deduces a list of insertions and deletions in the associative table, that are executed in a row. 

For instance, let's say that after displaying the events 732 and 874 where artists 123 performs, the user removes event 732, and adds events 2 and 3. Upon submission, the `dataProvider` will detect removals and additions, and send the following queries:

```js
dataProvider.delete('performances', { 
    id: 732,
    previousData: { id: 732, name: 'Acme Rock Festival' },
});
dataProvider.create('performances', { 
    data: { artist_id: 123, event_id: 2 }
});
dataProvider.create('performances', { 
    data: { artist_id: 123, event_id: 3 }
});
```

#### Props

| Prop        | Required | Type                                        | Default                            | Description                                                                                                                                                                                                       |
| ----------- | -------- | ------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reference` | Required | `string`                                    | -                                  | Name of the reference resource, e.g. 'authors'                                                                                                                                                                    |
| `through`   | Required | `string`                                    | -                                  | Name of the resource for the associative table, e.g. 'book_authors'                                                                                                                                               |
| `children`  | Required | `element`                                   | -                                  | A select array input element (e.g. `<SelectArrayInput>`).                                                                                                                                                         |
| `perPage`    | Optional | `number`                                    | 25                                 | Limit for the number of results fetched from the associative table                                                                                                                                                |
| `using`     | Optional | `string`                                    | `'([resource]_id,[reference]_id)'` | Tuple (comma separated) of the two field names used as foreign keys, e.g 'book_id,author_id'. The tuple should start with the field pointing to the resource, and finish with the field pointing to the reference |
| `source`    | Optional | `string`                                    | `'id'`                             | Name of the field containing the identity of the main resource. Used determine the value to look for in the associative table.                                                                                    |
| `sort`      | Optional | `{ field: string, order: 'ASC' or 'DESC' }` | `{ field: 'id', order: 'DESC' }`   | Sort for the associative table (passed to the `getManyReference()` call)                                                                                                                                          |
| `filter`    | Optional | `object`                                    | `{}`                               | Filter for the associative table (passed to the `getManyReference()` call)                                                                                                                                        |
