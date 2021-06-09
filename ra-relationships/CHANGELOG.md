# CHANGELOG

## v2.1.6

> 2021-05-05

- (fix) Correctly handle validation on the `<ReferenceManyToManyInput>` component. The `validate` prop must be set on the `<ReferenceManyToManyInput>`, not its children.

## v2.1.5

> 2021-04-22

- (fix) Avoid updating main record when only the references have changed.

## v2.1.4

> 2021-04-02

- (fix) Fix Prop types for `<ManyToManyField>` marking the `source` prop as required.  
- (fix) Fix README includes imports from the wrong package name.  

## v2.1.3

> 2021-03-29

- (fix) Fix documentation about limitations of the ReferenceManyToManyField and ReferenceManyToManyInput components

## v2.1.2

> 2021-03-26

- (fix) Fix ManyToManyReferenceContextProvider Props Interface

## v2.1.1

> 2021-03-23

- (fix) Fix ManyToManyReferenceInput props interface to include `perPage` like its controller hook.

## v2.1.0

> 2021-02-16

- (feat) Children of ManyToManyReferenceInput are now responsible for handling the loading state.
- (feat) Add handling of LoadingState to the DualListInput

## v2.0.1

> 2021-02-09

- (fix) ReferenceManyToManyField does not pass the perPage prop to its controller hook.

## v2.0.0

> 2020-11-19

- (feat) Add ability to have multiple ReferenceManyToManyInput in a form.

**BREAKING CHANGE**

- You don't need a custom form calling either the `useReferenceManyToManyCreate` or `useReferenceManyToManyUpdate` hooks anymore. These hooks have been removed of the `ra-relationships` package.
- Forms must now be wrapped with a `<ManyToManyReferenceContextProvider>`:


```diff
import React from 'react';
import { Edit, EditProps, SelectArrayInput, SimpleForm, TextInput } from 'react-admin';

-import { ReferenceManyToManyInput, useReferenceManyToManyUpdate } from '@react-admin/ra-many-to-many';
+import { ReferenceManyToManyInput, ManyToManyReferenceContextProvider } from '@react-admin/ra-many-to-many';

const ArtistEditForm = (props: EditProps) => {
-    const save = useReferenceManyToManyUpdate({
-        basePath: props.basePath,
-        record: props.record,
-        redirect: props.redirect || 'list',
-        reference: 'events',
-        resource: props.resource,
-        source: 'id',
-        through: 'performances',
-        undoable: props.undoable,
-        using: 'artist_id,event_id',
-    });
-
-    return <SimpleForm {...props} save={save} />;
+    return (
+        <ManyToManyReferenceContextProvider>
+            <SimpleForm {...props}
+        </ManyToManyReferenceContextProvider>
+    );
};

const ArtistEdit: FC<Props> = props => (
    <Edit {...props}>
        <ArtistEditForm>
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
            >
                <SelectArrayInput optionText="name" />
            </ReferenceManyToManyInput>
        </ArtistEditForm>
    </Edit>
);

export default ArtistEdit;
```

Note that you don't even need a custom form anymore:

```jsx
const ArtistEdit: FC<Props> = props => (
    <Edit {...props}>
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
                >
                    <SelectArrayInput optionText="name" />
                </ReferenceManyToManyInput>
            </SimpleForm>
        </ManyToManyReferenceContextProvider>
    </Edit>
);
```

## v1.2.1

> 2020-12-08

- (fix) Fix ManyToManyInput does not fetch the correct references

## v1.2.0

> 2020-10-12

- (fix) Update DualListInput button labels (select/unselect instead of add/remove)
- (fix) Disable buttons when no item is selected

## v1.1.0

> 2020-10-05

- Upgrade to react-admin `3.9`

## v1.0.0

> 2020-09-15

- First release
