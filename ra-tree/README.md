# ra-tree

Tree hooks and components for react-admin. Allows to display, edit, and rearrange tree structures like directories, categories, etc. 

![ra-tree](./assets/ra-tree-overview.gif)

This module is agnostic as to how you store the tree structure in the backend side. Whether you use an array of children, a `parent_id` field, materialized paths or nested sets, this module will work. You'll just have to map the data structure expected by react-admin by the one returned by your API in your `dataProvider`.

You can test this module in the <a href="https://marmelab.com/ra-enterprise-demo/#/tours/ra-tree" target="_blank">ra-tree live demo</a>.

## Installation

```sh
npm install --save @react-admin/ra-tree
# or
yarn add @react-admin/ra-tree
```

**Tip**: `ra-tree` is part of the [React-Admin Enterprise Edition](https://marmelab.com/ra-enterprise/), and hosted in a private npm registry. You need to subscribe to one of the Enterprise Edition plans to access this package.

## Usage

### `dataProvider`

The `dataProvider` used by the `<Admin>` must support tree-specific methods:

**Read methods**

- `getTree(resource)`
- `getRootNodes(resource)`
- `getParentNode(resource, { childId })`
- `getChildNodes(resource, { parentId })`

These methods should return Promises for `TreeRecord` objects. A `TreeRecord` contains at least an `id` field and a `children` field (an array of child ids). For instance:

**Write methods**

- `moveAsNthChildOf(resource, { source, destination, position })`: `source` and `destination` are `TreeRecord` objects, and `position` a zero-based integer
- `moveAsNthSiblingOf(resource, { source, destination, position })`
- `addRootNode(resource, { data })`
- `addChildNode(resource, { parentId, data })`
- `deleteBranch(resource, { id, data })`: `id` is the identifier of the node to remove, and `data` its content

These methods should also return Promises for `TreeRecord` objects, except for the two `moveAs...` methods, which can return an empty `data` object if the move is successful.

Here is an example of the expected syntax for the additional `dataProvider` methods:

```js
dataProvider.getTree('posts')
    .then(({ data }) => console.log(data));
// [
//   { id: 1, title: 'foo1', children: [3, 4] },
//   { id: 2, title: 'foo2', children: [] },
//   { id: 3, title: 'foo3', children: [5] },
//   { id: 4, title: 'foo4', children: [] },
//   { id: 5, title: 'foo5', children: [] },
// ]

dataProvider.getRootNodes('posts')
    .then(({ data }) => console.log(data));
// [
//   { id: 1, title: 'foo1', children: [3, 4] },
//   { id: 2, title: 'foo2', children: [] },
// ]

dataProvider.getParentNode('posts', { childId: 5 })
    .then(({ data }) => console.log(data));
// { id: 3, title: 'foo3', children: [5] }

dataProvider.getChildNodes('posts', { parentId: 1 })
    .then(({ data }) => console.log(data));
// [
//   { id: 3, title: 'foo3', children: [5] },
//   { id: 4, title: 'foo4', children: [] },
// ]

dataProvider.moveAsNthChildOf('posts', { 
    source: { id: 5, title: 'foo5', children: [] },
    destination: { id: 1, title: 'foo1', children: [3, 4] },
    position: 2
})
    .then(({ data }) => console.log(data));
// {}

dataProvider.moveAsNthSiblingOf('posts', { 
    source: { id: 5, title: 'foo5', children: [] },
    destination: { id: 4, title: 'foo4', children: [] },
    position: 1
})
    .then(({ data }) => console.log(data));
// {}

dataProvider.addRootNode('posts', { data: { title: 'hello' } })
    .then(({ data }) => console.log(data));
// { id: 6, titl: 'hello', children: [] }

dataProvider.addChildNode('posts', { parentId: 2, data: { title: 'hello' } })
    .then(({ data }) => console.log(data));
// { id: 6, titl: 'hello', children: [] }

dataProvider.deleteBranch('posts', { id: 1, data: { id: 1, title: 'foo1', children: [3, 4] } })
    .then(({ data }) => console.log(data));
// { id: 1, title: 'foo1', children: [3, 4] }
```

`ra-tree` expects the `dataProvider` to return tree structures based on a `children` field, but chances are your API stores the tree in another data structure. In that case, you'll need to map the API data structure to the ra-tree data structure in your `dataProvider`.

### `dataProvider` Builders

`ra-tree` provides helper functions to create a `ra-tree`-compatible `dataProvider` based on a regular react-admin `dataProvider` - provided the API returns the tree in any of the supported data structures. These helpers add the tree-specific methods described above (`getTree()`, `getRootNodes()`, etc) by calling the regular methods (`getList()`, `getOne()`, etc.). 

Be aware that these builders will call the regular `dataProvider` several times for each tree method call. We don't recommend using them in production - instead, you should modify your API to support the tree methods, and return data structures in the format expected by ra-tree.  

#### `addTreeMethodsBasedOnChildren`

If the records returned by your API contain **an array of children identifiers**, use the `addTreeMethodsBasedOnChildren` builder.

Your API should return records with this format:

```js
{
    id: 1234,
    name: 'hello',
    isRoot: false,
    children: [45, 356, 1],
}
```

Example:

```js
import simpleRestProvider from 'ra-data-simple-rest';
import { addTreeMethodsBasedOnChildren } from '@react-admin/ra-tree';

const dataProvider = simpleRestProvider('http://path.to.my.api/');

const dataProviderWithTree = addTreeMethodsBasedOnChildren(dataProvider, 'children', 'isRoot', false);
```

The builder accepts the following arguments:

- `dataProvider`: The dataProvider to augment.
- `childrenField`: The name of the field containing the children identifiers. Defaults to `children`.
- `isRootField`: The name of the field containing the root status. Defaults to `isRoot`
- `apiSupportBranchDeletion`: Indicates whether the API will handle children deletion when deleting a node as well as the parent update. If false, the dataProvider will handle it by making multiple requests in the right order. Defaults to `false`.

#### `addTreeMethodsBasedOnParentAndPosition`

If the records returned by your API contain **a parent identifier** and **a position field**, use the `addTreeMethodsBasedOnParentAndPosition` builder.

Your API should return records with this format:

```js
{
    id: 1234,
    name: 'hello',
    parent_id: 35,
    position: 4, // zero-based
}
 ```

Example:

```js
import simpleRestProvider from 'ra-data-simple-rest';
import { addTreeMethodsBasedOnParentAndPosition } from '@react-admin/ra-tree';

const dataProvider = simpleRestProvider('http://path.to.my.api/');

const dataProviderWithTree =  addTreeMethodsBasedOnParentAndPosition(dataProvider, 'parent_id', 'position', false);
```

The builder accepts the following arguments:

- `dataProvider`: The dataProvider to augment.
- `parentIdField`: The name of the field containing the parent identifier. Defaults to 'parent_id'
- `positionField`: The name of the field containing the position of a node inside its parent. Defaults to 'position'
- `apiSupportBranchDeletion`: Indicates whether the API will handle children deletion when deleting a node as well as the siblings update. If false, the dataProvider will handle it by making multiple requests in the right order. Defaults to `false`.

### `<Admin>` Setup: Reducer and Translations

Just like for REST data fetching, react-admin relies on Redux to store the result and offer optimistic rendering. That means that you must add a specific reducer to your `<Admin>` component to use the tree features.

Also, this module comes with additional messages, as well as their translations in English and French. To use these messages, add them to your i18nProvider.

This means a typical ra-tree application begins like this:

```js
// in src/App.js
import React from 'react';
import { Admin, Resource, mergeTranslations } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import { reducer as tree, raTreeLanguageEnglish } from '@react-admin/ra-tree';

import dataProvider from './dataProvider';

const i18nProvider = polyglotI18nProvider(locale => {
    // Always fallback on english
    return mergeTranslations(englishMessages, raTreeLanguageEnglish);
}, 'en');

const App = () => (
    <Admin
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        locale="en"
        customReducers={{ tree }}
    >
        ...
    </Admin>
)
```

## `<TreeWithDetails>` Component

Once the `dataProvider` and `<Admin>` component are ready, you can start using the components of this package. The main one is a replacement for the `<List>` component, called `<TreeWithDetails>`.

```js
// in src/category.js
import React from 'react';
import {
    Admin,
    Resource,
    Create,
    Edit,
    TextInput,
} from 'react-admin';
import { CreateNode, EditNode, SimpleForm, TreeWithDetails } from '@react-admin/ra-tree';

// a Create view for a tree uses <CreateNode> instead of the standard <Create>
const CategoriesCreate: FC = props => (
    <CreateNode {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </CreateNode>
);

// an Edit view for a tree uses <EditNode> instead of the standard <Edit>
const CategoriesEdit = (props) => (
    <EditNode {...props}>
        <SimpleForm>
            <TextInput source="title" />
        </SimpleForm>
    </EditNode>
)

// a List view for a tree uses <TreeWithDetails>
export const CategoriesList = (props) => (
    <TreeWithDetails 
        create={CategoriesCreate}
        edit={CategoriesEdit}
        {...props}
    />
);

// in src/App.js
import { CategoriesList } from './category';

const App = () => (
    <Admin
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        locale="en"
        customReducers={{ tree }}
    >
        <Resource list={CategoriesList} />
    </Admin>
)
```

> **IMPORTANT**: Note that `SimpleForm` is imported from `@react-admin/ra-tree` as well.

This is because the `<Toolbar>` of `<SimpleForm>` and `<TabbedForm>` from `react-admin` includes a `<DeleteButton>` which does not delete a branch but a record.

This also means that if you need to customize the `Toolbar` using the [`toolbar`](https://marmelab.com/react-admin/CreateEdit.html#toolbar) prop of the `SimpleForm` and `TabbedForm` components and includes a `DeleteButton`, you must import this button from `@react-admin/ra-tree` as well.

```jsx
import { Toolbar } from 'react-admin';
import { DeleteButton } from '@react-admin/ra-tree';
import MyCustomButton from './MyCustomButton';

export const MyToolbar = props => (
    <Toolbar>
        <MyCustomButton />
        <DeleteButton />
    </Toolbar>
)
```

`react-admin` will fetch the entire tree on mount, and the `TreeWithDetails` component will show an interactive tree based on this data. By default, the `<TreeWithDetails>` component will use the `title` field of the records to display te tree. You can use an alternative field by setting the `titleField` prop in the `<TreeWithDetails>` component:

```jsx
const CategoriesList = (props) => (
    <TreeWithDetails titleField="name" edit={CategoriesEdit} {...props} />
);
```

By default, this package allows only one root per tree. You can allow trees with multiple roots by setting the `allowMultipleRoots` prop:

```jsx
export const CategoriesList = (props) => (
    <TreeWithDetails 
        create={CategoriesCreate}
        edit={CategoriesEdit}
        allowMultipleRoots
        {...props}
    />
);
```

### Title

The default title for a tree view is “[resource] list” (e.g. “Posts list”). Use the title prop to customize the Tree view title:

```jsx
// in src/posts.js
export const CategoriesList = (props) => (
    <TreeWithDetails {...props} title="List of categories">
        ...
    </TreeWithDetails>
);
```

The title can be either a string or an element of your own.

### Node Actions

By default, every node has an action dropdown menu displayed after its name when hovered.

While this menu only has a delete action by default, it's possible to customize it.

```jsx
import { NodeActions, DeleteMenuItem, TreeWithDetails } from '@react-admin/ra-tree';

const MyCustomActionMenuItem = ({ record, resource, parentId }) => {
    const handleClick = () => {
        // Do something with dataProvider ?
    }
    return (
        <MenuItem onClick={handleClick}>
            Do something
        </MenuItem>
    );
};

const MyActions = (props) => (
    <NodeActions {...props}>
        <MyCustomActionMenuItem />
        <DeleteMenuItem />
    </NodeActions>
);

const CategoriesList: FC<Props> = props => (
    <TreeWithDetails
        titleField="name"
        edit={CategoriesEdit}
        draggable
        showLine
        nodeActions={<MyActions />}
        {...props}
    />
);
```

The menu item will receive the current record an the resource.

### Drag and Drop

If you want to allow user to reorder nodes in the tree, simply add the `draggable` prop to the `<TreeWithDetails>` component:

```jsx
export const CategoriesList = (props) => (
    <TreeWithDetails draggable {...props} />
);
```

### Hiding Root Nodes

Sometimes, a tree only has one root node for technical reasons and users should probably not see it at all. Use the `hideRootNodes` prop to hide all root nodes.

```jsx
export const CategoriesList = (props) => (
    <TreeWithDetails hideRootNodes {...props} />
);
```

### Lazy Load

If you have a tree with a lot of nodes, you may want to only load the root nodes at first and their children when they are expanded. To enable this mode, set the `lazy` prop to `true`.

### `<Tree>` Component

The `<Tree>` component is a wrapper for [rc-tree's `<Tree>`](https://github.com/react-component/tree#tree-props), with Material Design style. It expects a `treeData` prop containing a tree of nodes with `key`, `title`, and `children` fields.

```jsx
// example usage
import { Tree } from '@react-admin/ra-tree';
import treeData from './treeData';
export const SimpleTree: FC = () => <Tree treeData={treeData} />;

// treeData format
[
  { key: '1', title: 'foo1', children: [
    { key: '3', title: 'foo3', children: [
      { key: '5', title: 'foo5', children: [] },
    ] },
    { key: '4', title: 'foo4', children: [] },
  ] },
  { key: '2', title: 'foo2', children: [] },
]
```

## Customising Translation Messages

This module uses specific translations for displaying buttons and other texts.
As for all translations in react-admin, it's possible to customize the messages.

To create your own translations, you can use the TypeScript types to see the structure and see which keys are overridable.

Here is an example of how to customize translations in your app:

```jsx
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import frenchMessages from 'ra-language-french';
import { 
    TranslationMessages as BaseTranslationMessages,
    raTreeEnglishMessages,
    raTreeFrenchMessages,
    RaTreeTranslationMessages
} from '@react-admin/ra-tree';

/* TranslationMessages extends the defaut translation
 * Type from react-admin (BaseTranslationMessages)
 * and the ra-tree translation Type (RaTreeTranslationMessages)
 */
interface TranslationMessages
    extends RaTreeTranslationMessages,
        BaseTranslationMessages {}

const customEnglishMessages: TranslationMessages = mergeTranslations(
    englishMessages,
    raTreeEnglishMessages,
    {
        'ra-tree': {
            action: {
                add_child: 'Add a daughter',
                add_root: 'Add a god',
            },
        },
    }
);

const i18nCustomProvider = polyglotI18nProvider(locale => {
    if (locale === 'fr') {
        return mergeTranslations(frenchMessages, raTreeFrenchMessages);
    }
    return customEnglishMessages;
}, 'en');


export const MyApp: FC = () => (
    <Admin
        i18nProvider={myDataprovider}
        i18nProvider={myLayout}
        i18nProvider={i18nCustomProvider}
    >
        ...
    </Admin>
);
```

## API

### `<Tree>` Props

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoExpandParent | Whether to automatically expand a parent treeNode | boolean | true |  |
| blockNode | Whether treeNode fill remaining horizontal space | boolean | false |  |
| checkable | Adds a `Checkbox` before the treeNodes | boolean | false |  |
| checkedKeys | (Controlled) Specifies the keys of the checked treeNodes (PS: When this specifies the key of a treeNode which is also a parent treeNode, all the children treeNodes of will be checked; and vice versa, when it specifies the key of a treeNode which is a child treeNode, its parent treeNode will also be checked. When `checkable` and `checkStrictly` is true, its object has `checked` and `halfChecked` property. Regardless of whether the child or parent treeNode is checked, they won't impact each other. | string\[] \| {checked: string\[], halfChecked: string\[]} | \[] |  |
| checkStrictly | Check treeNode precisely; parent treeNode and children treeNodes are not associated | boolean | false |  |
| defaultCheckedKeys | Specifies the keys of the default checked treeNodes | string\[] | \[] |  |
| defaultExpandAll | Whether to expand all treeNodes by default | boolean | false |  |
| defaultExpandedKeys | Specify the keys of the default expanded treeNodes | string\[] | \[] |  |
| defaultExpandParent | auto expand parent treeNodes when init | bool | true |  |
| defaultSelectedKeys | Specifies the keys of the default selected treeNodes | string\[] | \[] |  |
| disabled | whether disabled the tree | bool | false |  |
| draggable | Specifies whether this Tree is draggable (IE > 8) | boolean | false |  |
| expandedKeys | (Controlled) Specifies the keys of the expanded treeNodes | string\[] | \[] |  |
| filterTreeNode | Defines a function to filter (highlight) treeNodes. When the function returns `true`, the corresponding treeNode will be highlighted | function(node) | - |  |
| loadData | Load data asynchronously | function(node) | - |  |
| loadedKeys | (Controlled) Set loaded tree nodes. Need work with `loadData` | string\[] | \[] |  |
| multiple | Allows selecting multiple treeNodes | boolean | false |  |
| selectable | whether can be selected | boolean | true |  |
| selectedKeys | (Controlled) Specifies the keys of the selected treeNodes | string\[] | - |  |
| showIcon | Shows the icon before a TreeNode's title. There is no default style; you must set a custom style for it if set to `true` | boolean | false |  |
| switcherIcon | customize collapse/expand icon of tree node | ReactNode | - |  |
| showLine | Shows a connecting line | boolean | false |  |
| treeData | treeNodes data Array, if set it then you need not to construct children TreeNode. (key should be unique across the whole array) | array\<{ key, title, children, \[disabled, selectable] }> | - |  |
| virtual | Disable virtual scroll when set to `false` | boolean | true | 4.1.0 |
| onCheck | Callback function for when the onCheck event occurs | function(checkedKeys, e:{checked: bool, checkedNodes, node, event, halfCheckedKeys}) | - |  |
| onDragEnd | Callback function for when the onDragEnd event occurs | function({event, node}) | - |  |
| onDragEnter | Callback function for when the onDragEnter event occurs | function({event, node, expandedKeys}) | - |  |
| onDragLeave | Callback function for when the onDragLeave event occurs | function({event, node}) | - |  |
| onDragOver | Callback function for when the onDragOver event occurs | function({event, node}) | - |  |
| onDragStart | Callback function for when the onDragStart event occurs | function({event, node}) | - |  |
| onDrop | Callback function for when the onDrop event occurs | function({event, node, dragNode, dragNodesKeys}) | - |  |
| onExpand | Callback function for when a treeNode is expanded or collapsed | function(expandedKeys, {expanded: bool, node}) | - |  |
| onLoad | Callback function for when a treeNode is loaded | function(loadedKeys, {event, node}) | - |  |
| onRightClick | Callback function for when the user right clicks a treeNode | function({event, node}) | - |  |
| onSelect | Callback function for when the user clicks a treeNode | function(selectedKeys, e:{selected: bool, selectedNodes, node, event}) | - |  |
