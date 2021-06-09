# ra-enterprise

Preconfigured components replacing the default react-admin ones to quickly integrate the Enterprise Edition modules. 

![ra-enterprise demo](./assets/ra-enterprise-demo.gif)

`ra-enterprise` exports the following "augmented" components: `<Admin>`, `<Layout>`, `<AppBar>`, `<Menu>`, `<Create>`, and `<Edit>`. Use them instead of the react-admin versions to get additional features:

```diff
- import { Admin } from 'react-admin';
+ import { Admin } from '@react-admin/ra-enterprise';

const App = ()  => (
    <Admin dataProvider={dataProvider}>
        { /** Put your resources here */ }
    </Admin>
);
```

You can test this module in the [Enterprise Edition Demo](https://marmelab.com/ra-enterprise-demo).

## Installation

```sh
npm install --save @react-admin/ra-enterprise
# or
yarn add @react-admin/ra-enterprise
```

**Tip**: `ra-enterprise` is part of the [React-Admin Enterprise Edition](https://marmelab.com/ra-enterprise/), and hosted in a private npm registry. You need to subscribe to one of the Enterprise Edition plans to access this package.

## `<Admin>`

Ra-enterprise exports a replacement for the `<Admin>` component, which pre-configures many of the ra-enterprise modules. It comes with:

- A breadcrumb based on resources (from [ra-navigation](https://marmelab.com/ra-enterprise/modules/ra-navigation#breadcrumb-adding-a-breadcrumb-path-to-every-page))
- A light and dark mode for the theme (from [ra-preferences](https://marmelab.com/ra-enterprise/modules/ra-preferences#togglethemebutton-store-the-theme-in-the-preferences))
- A language switcher (from [ra-preferences](https://marmelab.com/ra-enterprise/modules/ra-preferences#languageswitcher-store-the-locale-in-preferences))
- A preference based sidebar state (from [ra-preferences](https://marmelab.com/ra-enterprise/modules/ra-preferences#sidebaropenpreferencesync-store-the-sidebar-openclose-state-in-preferences))
- Augmented reducers for tree structures and realtime locks (from [ra-tree](https://marmelab.com/ra-enterprise/modules/ra-tree#admin-setup-reducer-and-translations) and [ra-realtime](https://marmelab.com/ra-enterprise/modules/ra-realtime#installation))
- A compact menu with submenus in sliding panels (from [ra-navigation](https://marmelab.com/ra-enterprise/modules/ra-navigation#menuitemcategory))
- The Tour context, allowing to show guided tours everywhere in the admin (from [ra-tour](https://marmelab.com/ra-enterprise/modules/ra-tour#usage)) 
- English messages including the additional messages required by [ra-realtime](https://marmelab.com/ra-enterprise/modules/ra-realtime#customizing-translation-messages), [ra-relationships](https://marmelab.com/ra-enterprise/modules/ra-relationships), and [ra-tree](https://marmelab.com/ra-enterprise/modules/ra-tree#admin-setup-reducer-and-translations)

This modifies the look and feel of react-admin:

![ra-enterprise Admin](./assets/ra-enterprise-admin.png)

To be compared with the default look and feel:

![Classic Admin](./assets/classic-admin.png)

### Properties

The alternative `<Admin>` accepts the same properties as the default one. Please read [the documentation about the react-admin `<Admin>`](https://marmelab.com/react-admin/Admin.html) to discover all the properties available.

In addition, you can pass the following properties to customize the ra-enterprise features:

| Prop              | Required | Type        | Default | Description |
| ----------------- | -------- | ----------- | ------- | ----------- |
| `customReducers`  | Optional | `object`    | -       | Augment the data provider with your own reducers |
| `i18nProvider`    | Optional | `object`    | -       | Replace the ra-enterprise i18nProvider |
| `lightTheme`      | Optional | `object`    | -       | Override the light mode with your own light theme |
| `darkTheme`       | Optional | `object`    | -       | Override the dark mode with your own dark theme |

### Examples

1. Basic usage

``` jsx
import { Admin } from '@react-admin/ra-enterprise';

const dataProvider = {
    // Connect to your API
};

const App = ()  => (
    <Admin dataProvider={dataProvider}>
        { /** Put your resources here */ }
    </Admin>
);
```

2. Override the dark theme

``` jsx
import { Admin } from '@react-admin/ra-enterprise';

const darkTheme = {
    palette: {
        type: 'dark', // Don't forget to specify the palette type
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#ffff00',
        },
    },
};

const dataProvider = {
    // Connect to your API
};

const App = ()  => (
    <Admin dataProvider={dataProvider} darkTheme={darkTheme}>
        { /** Put your resources here */ }
    </Admin>
);
```

3. Pass your own translations

```jsx
import { Admin, buildI18nProvider } from '@react-admin/ra-enterprise';

const messages = {
    en: {
         // Put your english translations here
    },
    fr: {
         // Put your french translations here
    },
};

const dataProvider = {
     // Connect to your API
};

const i18nProvider = buildI18nProvider(messages);

const App = ()  => (
    <Admin dataProvider={dataProvider} i18nProvider={i18nProvider}>
        { /** Put your resources here */ }
    </Admin>
);
```

4. Add a new language (Spanish for example)

```jsx

import { Admin, buildI18nProvider } from '@react-admin/ra-enterprise';
import spanishMessages from '@blackbox-vision/ra-language-spanish';

const messages = {
    en: {
         // Put your english translations here
    },
    fr: {
         // Put your french translations here
    },
    es: {
        ...spanishMessages,
        'ra-relationships': {
             duallistinput: {
                 availableItems: 'Elementos disponibles',
                 selectedItems: 'Elementos seleccionados',
            },
        },
        // Configure the other modules here
    },
};

const i18nProvider = buildI18nProvider(messages, 'es');
```

## `<Layout>`

Alternative to `<Layout>`, that should be passed to the `<Admin>`.

What is pre-configured?

- A light and dark mode for the theme (from [ra-preferences](https://marmelab.com/ra-enterprise/modules/ra-preferences#togglethemebutton-store-the-theme-in-the-preferences))
- A language switcher (from [ra-preferences](https://marmelab.com/ra-enterprise/modules/ra-preferences#languageswitcher-store-the-locale-in-preferences))
- A preference based sidebar state (from [ra-preferences](https://marmelab.com/ra-enterprise/modules/ra-preferences#sidebaropenpreferencesync-store-the-sidebar-openclose-state-in-preferences))
- A compact menu with submenus in sliding panels (from [ra-navigation](https://marmelab.com/ra-enterprise/modules/ra-navigation#menuitemcategory))

### Default Properties

The alternative `<Layout>` accepts the same properties as the default one. Please read [the documentation about react-admin `<Layout>`](https://marmelab.com/react-admin/Admin.html#layout) to discover all the available properties.

### Examples

1. Change the `appBar`

```jsx
import {
    Admin,
    AppBar,
    Layout,
    Sidebar
} from '@react-admin/ra-enterprise';

const CustomAppBar = (props) => <AppBar {...props} />;

const CustomLayout = (props)  => <Layout appBar={CustomAppBar} {...props} />;

const dataProvider = {
    // Connect to your API
};

const App = () => (
    <Admin
        dataProvider={dataProvider}
        layout={CustomLayout}
    >
        { /** Put your resources here */ }
    </Admin>
);
```

2. Change the `sidebar`

```jsx
import {
    Admin,
    AppBar,
    Breadcrumb,
    Layout,
    Sidebar
} from '@react-admin/ra-enterprise';

const CustomSidebar = (props) => <Sidebar {...props} />;

const CustomLayout = (props) => (
    <Layout sidebar={CustomSidebar} {...props} />
);

const dataProvider = {
    // Connect to your API
};

const App = () => (
    <Admin
        dataProvider={dataProvider}
        layout={CustomLayout}
    >
        { /** Put your resources here */ }
    </Admin>
);
```

3. Change the `menu`

```jsx
import {
    Admin,
    AppBar,
    Breadcrumb,
    Layout,
    Menu
} from '@react-admin/ra-enterprise';

const CustomMenu = (props) => <Menu {...props} />;

const CustomLayout = (props) => (
    <Layout menu={CustomMenu} {...props} />
);

const dataProvider = {
    // Connect to your API
};

const  App = () => (
    <Admin
        dataProvider={dataProvider}
        layout={CustomLayout}
    >
        { /** Put your resources here */ }
    </Admin>
);
```

## `<AppBar>`

Alternative to `<AppBar>` that should be passed to the `<Layout>`.

What is pre-configured?

- A light and dark mode for the theme (from [ra-preferences](https://marmelab.com/ra-enterprise/modules/ra-preferences#togglethemebutton-store-the-theme-in-the-preferences))
- A language switcher (from [ra-preferences](https://marmelab.com/ra-enterprise/modules/ra-preferences#languageswitcher-store-the-locale-in-preferences))

### Default Properties

 Please read [the documentation about the react-admin `<AppBar>`](https://marmelab.com/react-admin/Theming.html#customizing-the-appbar-content) to discover all the properties available.

In addition, you can pass the following properties to customize the ra-enterprise features:

| Prop                 | Required | Type     | Default          | Description                                                                          |
| -------------------- | -------- | -------- | ---------------- | ------------------------------------------------------------------------------------ |
| `languages`          | Optional | `Array`  | -                | A list of languages                                                                  |
| `languages[]`        | -        | `object` | -                | A object describing the language                                                     |
| `languages[].locale` | -        | `string` | -                | The locale. It should match the locales passed to the `i18nProvider`.                |
| `languages[].name`   | -        | `string` | -                | The language name                                                                    |
| `defaultLanguage`    | Optional | `string` | - `languages[0]` | The default language name. It should correspond to one of the passed languages name. |

### Examples

1. Enable the theme switcher for light and dark mode

```jsx
// Nothing to do, the <AppBar> is used in the default <Admin>
// and the theme switcher is enabled by default
import { Admin } from '@react-admin/ra-enterprise';

const dataProvider = {
    // Connect to your API
};

const App = () => (
    <Admin dataProvider={dataProvider}>
    </Admin>
);
```

2. Enable the languages switcher

```jsx
import { Admin, AppBar, Layout } from '@react-admin/ra-enterprise';

const languages = [
    { locale: 'en', name: 'English 🇬🇧' },
    { locale: 'fr', name: 'Français 🇫🇷' },
];

const CustomAppBar = (props) => (
    <AppBar languages={languages} {...props} />
);

const CustomLayout = (props) => (
    <Layout appBar={CustomAppBar} {...props} />
);

const dataProvider = {
    // Connect to your API
};

const App = () => (
    <Admin
        dataProvider={dataProvider}
        layout={CustomLayout}
    >
        { /** Put your resources here */ }
    </Admin>
);
```

## `<Breadcrumb>`

A `<Breadcrumb>` to include in your custom routes. It pre-configures some `ra-enterprise` modules.

What is pre-configured?

- A breadcrumb based on the resources (from @react-admin/ra-navigation)

## `<Create>`, `<Edit>`, `<List>` and `<Show>` views

`<Create>`, `<Edit>`, `<List>` and `<Show>` views are all configured with a default actions toolbar which includes a `<Breadcrumb variant="actions">`.

The breadcrumb is customizable by passing your own action as usual in react-admin. `ra-enterprise` export its own version of `CreateActions`, `EditActions`, `ShowActions` and `<ListActions>` which all accept a `breadcrumb` prop:

```jsx
// in ./src/MyBreadcrumb.js
import { Breadcrumb, BreadcrumbItem } from '@react-admin/ra-navigation';

export const MyBreadcrumb = (props) => (
    <Breadcrumb {...props}>
        <BreadcrumbItem name="dashboard" label="My Home">
            <ResourceBreadcrumbItems resources={['songs', 'artists']} />
        </BreadcrumbItem>
    </Breadcrumb>
);

// in ./src/ArtistList.js
import { Datagrid, TextField } from 'react-admin';
import { List, ListActions } from '@react-admin/ra-enterprise';
import { MyBreadcrumb } from './MyBreadcrumb';

const ArtistListActions = (props) => (
    <ListActions {...props} breadcrumb={<MyBreadcrumb variant="actions" />} />
)

const ArtistList = (props) => (
    <List
        {...props}
        sort={{ field: 'id', order: 'DESC' }}
        actions={<ArtistListActions />}
    >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="firstname" />
            <TextField source="name" />
        </Datagrid>
    </List>
);
```

Both `<Create>` and `<Edit>` wrap their children with a `<ManyToManyReferenceContextProvider>` component to ease usage of
the `<ReferenceManyToManyInput>`.
