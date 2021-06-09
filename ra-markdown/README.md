# ra-markdown: Markdown Utilities For React-Admin

For applications that need to display and edit Markdown content, this package offers two components:

- [`<MarkdownField>`](#markdownfield): Display formatted markdown, using material-ui styles 
- [`<MarkdownInput>`](#markdowninput): Edit a Markdown field, using a WYSIWYG editor supporting preview

You can test this module in the <a href="https://marmelab.com/ra-enterprise-demo/#/tours/ra-markdown" target="_blank">ra-markdown live demo</a>.

## Installation

```sh
npm install --save @react-admin/ra-markdown
# or
yarn add @react-admin/ra-markdown
```

**Tip**: `ra-markdown` is part of the [React-Admin Enterprise Edition](https://marmelab.com/ra-enterprise/), and hosted in a private npm registry. You need to subscribe to one of the Enterprise Edition plans to access this package.

## `<MarkdownField>`

A Field component for Markdown content. To be used e.g. in Show views.

```jsx
import { Show, SimpleShowLayout, TextField } from 'react-admin';
import { MarkdownField } from '@react-admin/ra-markdown';

const PostShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title" />
            <MarkdownField source="description" />
        </SimpleShowLayout>
    </Show>
);
```

**Tip**: If you want to display raw (unformatted) markdown, use `<TextField component="pre">` instead:

```jsx
import { Show, SimpleShowLayout, TextField } from  
 
)'react-admin';

const PostShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title" />
            <TextField source="description" component="pre" />
        </SimpleShowLayout>
    </Show>
);
```

## `<MarkdownInput>`

An Input component for Markdown content, based on the `tui-editor` package. To be used in Edit and Create views.

```jsx
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { MarkdownInput } from '@react-admin/ra-markdown';

const PostEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <MarkdownInput source="description" />
        </SimpleForm>
    </Edit>
);
```
You can customize the markdown renderer used for the preview, so that it matches the rendering you need in read mode just by applying the CSS rules you want.

```jsx
import { MarkdownInput } from '@react-admin/ra-markdown';

The object passed as `options` props is passed to `tui-editor`'s `<Editor>` component

```jsx
const options = {
        previewStyle: 'tab',
        height: '300px',
        initialEditType: 'markdown',
        useCommandShortcut: false,
    }
};
<MarkdownInput source="description" options={options} />
```

Refer to [the `tui-editor` documentation](https://nhn.github.io/tui.editor/latest/ToastUIEditor) for the details about the editor configuration.
