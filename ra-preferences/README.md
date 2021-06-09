# ra-preferences

Persist user preferences (language, theme, filters, datagrid columns, sidebar position, etc) in local storage.

![ra-preferences](./assets/ra-preferences-overview.gif)

These preferences are device dependent, so this module is particularly fitted for UI preferences. If a user has several instances of the admin opened in several tabs, changes in the preferences in one tab trigger an update in the other tabs. Note that if the user browses in incognito mode, the preferences won't be saved.

You can test this module in the <a href="https://marmelab.com/ra-enterprise-demo/#/tours/ra-preferences" target="_blank">ra-preferences live demo</a>.

## Installation

```sh
npm install --save @react-admin/ra-preferences
# or
yarn add @react-admin/ra-preferences
```

**Tip**: `ra-preferences` is part of the [React-Admin Enterprise Edition](https://marmelab.com/ra-enterprise/), and hosted in a private npm registry. You need to subscribe to one of the Enterprise Edition plans to access this package.

## `usePreferences`: Reading and Writing User Preferences

The `usePreferences` hook behaves like `setState`. It returns a value and a setter for the value, in an array. Depending on the argument passed to `usePreferences`, the return tuple concerns either a single value, or the whole preference tree.

Here is how to **read a single value** from the preference store, with a default value:

```jsx
import { usePreferences } from '@react-admin/ra-preferences';

const PostList = props => {
    const [density] = usePreferences(
        'posts.list.density',
        'small'
    );

    return (
        <List {...props}>
            <Datagrid size={density}>
                ...
            </Datagrid>
        </List>
    );
}
```

To **write a single value** use the second return value:

```jsx
const ChangeDensity: FC<any> = () => {
    const [density, setDensity] = usePreferences(
        'posts.list.density',
        'small'
    );

    const changeDensity = (): void => {
        setDensity(density === 'small' ? 'medium' : 'small');
    };

    return (
        <Button onClick={changeDensity}>
            {`Change density (current ${density})`}
        </Button>
    );
};
```

To **read and write the entire preferences tree**, don't pass any argument to the hook. You will find this option useful when building a preferences Form:

```jsx
import { usePreferences } from '@react-admin/ra-preferences';
import { useNotify } from 'react-admin';
import { Form, Field } from 'react-final-form'

const PreferencesPane = () => {
    const [preferences, setPreferences] = usePreferences();
    const notify = useNotify();

    const handleSave = values => {
        setPreferences(values);
        notify('preferences saved');
    }

    return (
        <Form
            initialValues={preferences}
            onSubmit={handleSave}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Post list density</label>
                        <Field name="posts.list.density" component="select">
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                        </Field>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )}
        />
    );
}
```

**Tip**: The preferences API is synchronous, because preferences are stored in memory, and replicated in localStorage. So even though localStorage has an async API, the preferences API is synchronous.

## `<PreferencesSetter>`: Setting Preferences Declaratively

A special component called `<PreferencesSetter>` lets you define application preferences by using it anywhere in our component tree.

To use it, just wrap any component that need to use the corresponding preference with `<PreferencesSetter path="my.preference" value="myvalue">`. This wrapping needs to be done to ensure that the corresponding preference is set before rendering the wrapped component.

```jsx
<PreferencesSetter path="list.density" value="small">
    <MyPreferencesDependentComponent />
</PreferencesSetter>
```

Using `<PreferencesSetter>` is equivalent to using `usePreferences` and setting its value directly.

```jsx
const [_, setDensity] = usePreferences('list.density');

useEffect(() => {
    setDensity('small');
}, []);
```

**Tip**: `<PreferencesSetter>` is a good candidate to make your life easier when writing unit tests. When it comes to mock preferences, use it rather than mock localstorage values.

**Tip**: The use of this component has a direct impact on the writings in the localstorage. It is advised to use it sparingly to avoid bottlenecks.

## `<ToggleThemeButton>`: Store the Theme in the Preferences

Many admin UIs offer a dark theme, and the user expect their choice of theme to be persistent across sessions. `ra-preferences` offer two components to facilitate the implementation of that feature: `<PreferencesBasedThemeProvider>`, and `<ToggleThemeButton>`.

First, wrap your `<Admin>` in a `<PreferencesBasedThemeProvider>` to allow the modification of the theme from inside the application:

```jsx
import React from 'react';
import { Admin, Resource } from 'react-admin';
import { PreferencesBasedThemeProvider } from '@react-admin/ra-preferences';

export const ThemeInPreferences: FC = () => (
    <PreferencesBasedThemeProvider>
        <Admin dataProvider={dataProvider} layout={MyLayout}>
            <Resource name="posts" list={PostList} />
        </Admin>
    </PreferencesBasedThemeProvider>
);
```

Next, insert the `<ToggleThemeButton>` in the UI, e.g. in the top app bar:

```jsx
import React from 'react';
import { Layout, AppBar } from 'react-admin';
import { Box, Typography } from '@material-ui/core';
import { ToggleThemeButton } from '@react-admin/ra-preferences';

const MyAppBar: FC = props => (
    <AppBar {...props}>
        <Box flex="1">
            <Typography variant="h6" id="react-admin-title"></Typography>
        </Box>
        <ToggleThemeButton />
    </AppBar>
);

const MyLayout: FC = props => <Layout {...props} appBar={MyAppBar} />;
```

Now the user can switch between light and dark theme, and their choice will be shared across tabs, and remembered during future sessions.

## `<LanguageSwitcher>`: Store the Locale in Preferences

In multilingual applications, users can select the locale using a language switcher. They expect that choice to be persistent across sections, so binding `usePreferences` with a language section is a common need.

To address that need, `ra-preferences` proposes a `<LanguageSwitcher>` component that manages the language change and persistence altogether:

```jsx
import React from 'react';
import { LanguageSwitcher } from '@react-admin/ra-preferences';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import frenchMessages from 'ra-language-french';
import { Admin, Resource, List, SimpleList, Layout, AppBar } from 'react-admin';
import { Box, Typography } from '@material-ui/core';

const MyAppBar = props => (
    <AppBar {...props}>
        <Box flex="1">
            <Typography variant="h6" id="react-admin-title"></Typography>
        </Box>
        <LanguageSwitcher
            languages={[
                { locale: 'en', name: 'English' },
                { locale: 'fr', name: 'Français' },
            ]}
        />
    </AppBar>
);

const MyLayout = props => <Layout {...props} appBar={MyAppBar} />;

const i18nProvider = polyglotI18nProvider(
    locale => (locale === 'fr' ? frenchMessages : englishMessages),
    'en' // Default locale
);

const App = () => (
    <Admin
        i18nProvider={i18nProvider}
        dataProvider={dataProvider}
        layout={MyLayout}
    >
        <Resource name="posts" list={PostList} />
    </Admin>
);
```

If you want the persistent locale change functionality but not the UI, you can use the `useSetLocaleAndPreference` hook instead, which works just like react-admin's `setLocale` hook:

```jsx
import { useSetLocaleAndPreference } from '@react-admin/ra-preferences';

const availableLanguages = {
    en: 'English',
    fr: 'Français',
}
const LanguageSwitcher = () => {
    const setLocale = useSetLocaleAndPreference();
    return (
        <ul>{
            Object.keys(availableLanguages).map(locale => {
                 <li key={locale} onClick={() => setLocale(locale)}>
                     {availableLanguages[locale]}
                 </li>
             })
        }</ul>
    );
}
```

## `<SidebarOpenPreferenceSync>`: Store the Sidebar Open/Close State in Preferences

Some users prefer the sidebar opened, other prefer it closed. Those who close the sidebar once usually don't like to have to close it again when they reload the app.

The `<SidebarOpenPreferenceSync>` component saves the sidebar visibility in Preferences, and restores it on load. Users only have to hide the sidebar once per browser, and the sidebar will be closed even for future sessions.

Use this component inside a react-admin app, for instance in a custom `<Layout>`:

```jsx
import { SidebarOpenPreferenceSync } from '@react-admin/ra-preferences';

const MyLayout: FC = props => (
    <>
        <SidebarOpenPreferenceSync />
        <Layout {...props} />
    </>
);

export const App = () => (
    <Admin dataProvider={dataProvider} layout={MyLayout}>
        ...
    </Admin>
);
```

## `<SelectColumnsButton>`: Store Datagrid Columns in Preferences

Some admins expose datagrids with many columns, and let users choose which columns they want to show/hide. This setting should be stored in preferences, and restored when the application opens again. For this purpose, `ra-preferences` offers a component, `<SelectColumnsButton>`, and a hook, `useSelectedColumns()`.

They both rely on the same two settings:

- `preference`: The preference key where the colums selection is stored, e.g. 'posts.list.columns'
- `columns` An object listing the column elements, e.g. `{ id: <TextField source="id" />, title: <TextField source="title" /> }`. These columns element will be later passed as children of `<Datagrid>`.

In addition, `useSelectedColumns()` accepts a third optional setting called `omit`. It should contain an array of column names to omit by default (e.g. `['nb_views', 'published']`).

Here is an example implementation:

```jsx
import { TopToolbar, List, Datagrid, TextField, NumberField, DateField } from 'react-admin';
import { SelectColumnsButton, useSelectedColumns } from '@react-admin/ra-preferences';

/**
 * The columns list must an object where the key is the column name,
 * and the value a React Element (usually a <Field> element).
 */
const postListColumns = {
    title: <TextField source="title" />,
    teaser: <TextField source="artist" />,
    body: <TextField source="writer" />,
    author: <TextField source="producer" />,
    nb_views: <NumberField source="rank" />,
    published: <DateField source="released" />,
};

// add the <SelectColumnsButton> to the toolbar
const PostActions: FC = () => (
    <TopToolbar>
        <SelectColumnsButton
            preference="posts.list.columns"
            columns={postListColumns}
        />
    </TopToolbar>
);

// get Datagrid children using useSelectedColumns()
const PostList: FC = props => {
    const columns = useSelectedColumns({
        preferences: 'posts.list.columns',
        columns: postListColumns,
        omit: ['nb_views'],
    });
    return (
        <List actions={<PostActions />} {...props}>
            <Datagrid rowClick="edit">
                {columns}
            </Datagrid>
        </List>
    );
};
```

## `<SavedQueriesList>` and `<FilterWithSave>`: Store User Queries In Preferences

Some lists offer many individual filters and sort options, and users may need to repeatedly apply a certain combination of those - in other words, a custom query. `ra-preferences` offers users a way to store the current query in local storage, so as to find it later in a list of "saved queries".

![`<SavedQueriesList>`](./assets/ra-preferences-SavedQueriesList.gif)

If your list uses the `<FilterList>` sidebar, add the `<SavedQueriesList>` component before the first `<FilterList>` to enable saved queries:

```diff
import { FilterList, FilterListItem, List, Datagrid } from 'react-admin';
import { Card, CardContent } from '@material-ui/core';

+import { SavedQueriesList } from '@react-admin/ra-preferences';

const SongFilterSidebar: FC = () => (
    <Card>
        <CardContent>
+           <SavedQueriesList />
            <FilterList label="Record Company" icon={<BusinessIcon />}>
                ...
            </FilterList>
            <FilterList label="Released" icon={<DateRangeeIcon />}>
               ...
            </FilterList>
        </CardContent>
    </Card>
);

const SongList: FC<Props> = props => (
    <List {...props} aside={<SongFilterSidebar />}>
        <Datagrid>
            ...
        </Datagrid>
    </List>
);
```

![`<FilterWithSave>`](./assets/ra-preferences-FilterWithSave.gif)

If your list uses the `<Filter>` Button/Form Combo, replace react-admin's `<Filter>` with ra-preference's `<FilterWithSave>` to enable saved queries:

```diff
import {
-   Filter,
    SelectInput,
    DateInput,
    List,
    Datagrid,
    TextField,
    NumberField,
    DateField
} from 'react-admin';
+import { FilterWithSave } from '@react-admin/ra-preferences';

const SongFilter: FC = props => (
-   <Filter {...props}>
+   <FilterWithSave {...props}>
        <SelectInput
            choices={[
                { id: 'Apple', name: 'Apple' },
                { id: 'Atlantic', name: 'Atlantic' },
                { id: 'Capitol', name: 'Capitol' },
                { id: 'Chess', name: 'Chess' },
                { id: 'Columbia', name: 'Columbia' },
                { id: 'DGC', name: 'DGC' },
                { id: 'London', name: 'London' },
                { id: 'Tamla', name: 'Tamla' },
            ]}
            source="recordCompany"
        />
        <DateInput source="released_gte" label="Released after" />
        <DateInput source="released_lte" label="Released before" />
-   </Filter>
+   </FilterWithSave>
);

const SongList: FC<Props> = props => (
    <List {...props} filters={<SongFilter />}>
        <Datagrid rowClick="edit">
            <TextField source="title" />
            <TextField source="artist" />
            <TextField source="writer" />
            <TextField source="producer" />
            <TextField source="recordCompany" />
            <NumberField source="rank" />
            <DateField source="released" />
        </Datagrid>
    </List>
);
```