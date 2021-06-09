# ra-navigation

Complex admins with many resources need to organize their pages in a tree structure, and provide navigation widgets to help their users find their way in that structure. `ra-navigation` offers specialized UI components (`<Breadcrumb>`, `<MultiLevelMenu>`) and hooks (`useDefineAppLocation`, `useAppLocationstate`) for that purpose.

![A video showing the MenuItem component in action](./assets/ra-multilevelmenu-categories.gif)

You can test this module in the <a href="https://marmelab.com/ra-enterprise-demo/#/tours/ra-navigation" target="_blank">ra-navigation live demo</a>.

## Installation

```sh
npm install --save @react-admin/ra-navigation
# or
yarn add @react-admin/ra-navigation
```

**Tip**: `ra-navigation` is part of the [React-Admin Enterprise Edition](https://marmelab.com/ra-enterprise/), and hosted in a private npm registry. You need to subscribe to one of the Enterprise Edition plans to access this package.

## App Location Hooks

With ra-navigation, each page in a react-admin application can define its location as a string, stored in a shared context. UI components use that context to display navigation information and controls (menu, breadcrumb, or your custom components) in a consistent way.

For instance, the Categories List page can define its location as 'products.categories.list' (instead of the default 'categories.list'), i.e. as a child of the Products location in the app tree structure. That way, when users visit the Categories List Page, they see a breadcrumb looking like the following:

``` txt
Dashboard > Products > Categories
```

And they should see a `<Menu>` looking like the following:

``` txt
> Dashboard
> Products
   > Categories
   > SKUs
```

### `<AppLocationContext>`: Initializing the App Location Context

To define or retrieve the current App Location, your React components must be located inside a `<AppLocationContext>`, which creates a React context dedicated to the user App Location. This component must be contained by our admin to be able to access the current registred resources from the redux store.

So, the easiest way to include it is to use a custom Layout as a wrapper since you (probably) need to insert your breadcrumb here too.

```jsx
import { AppLocationContext } from '@react-admin/ra-navigation';
import { Admin, Resource, Layout } from 'react-admin';

const MyLayout = ({ children, ...props }) => {
    const classes = useStyles();

    return (
        <AppLocationContext>
            <Layout {...props}>
                {/* Our Breadcrumb Implementation */}
                {children}
            </Layout>
        </AppLocationContext>
    );
};

const App = () => (
    <Admin dataProvider={dataProvider} layout={MyLayout}>
        <Resource name="posts" list={PostList} />
    </Admin>
);
```

### `useAppLocationState`: Retrieve and Define App Location

The `useAppLocationState` let you access the current App Location and also define a new App Location just like the `React.useState` API.

Here is how to **read the current app location**:

```jsx
import { useAppLocationState } from '@react-admin/ra-navigation';

const MySubComponent = props => {
    const [location] = useAppLocationState();

    return <span>{`Hey! You're on the ${location.path} location!`}</span>;
};
```

To **define the current app location**:

```jsx
const DensityTab: FC<any> = () => {
    const [_, setLocation] = useAppLocationState();

    useEffect(() => {
        setLocation('experiences.parameters.density');
    }, [])

    return (/* ... */);
};
```

You can also pass a second argument to `setLocation` with any value which is relative to the App Location context (e.g. to display the label of the current resource in a breadcrumb path for example).

```jsx
const DensityTab: FC<any> = () => {
    const [_, setLocation] = useAppLocationState();

    useEffect(() => {
        setLocation('experiences.parameters.density', { density: 0.1 });
    }, [])

    return (/* ... */);
};
```

So, you can retrieve it in another place...

```jsx
const Breadcrumb: FC<any> = () => {
    const [location] = useAppLocationState();
    // location = { path: 'experiences.parameters.density', density: 0.1 }

    return (/* ... */);
};
```

**Warning:**

The `dashboard` location is a reserved word used for the Dashboard page when it exists.

By default, `useAppLocationState()` will resolve the current App Location from the current React-Admin path.

Let's say you're on the posts list page:

```jsx
import { useAppLocationState } from '@react-admin/ra-navigation';
import { Admin, Resource } from 'react-admin';

const PostList = () => {
    const [location] = useAppLocationState();

    // location is automatically resolved to "posts.list"
    // location = { path: "posts.list", values: {} }

    return (/* ... */);
};

const App = () => (
    <Admin dataProvider={dataProvider} layout={LayoutWithAppLocationContext}>
        <Resource name="posts" list={PostList} />
    </Admin>
);
```

If a deepest component in the tree defines a different location than the resource one, it will be overriden.

You can also retrieve the current resource from its location for `edit` and `show` actions.

```jsx
import { AppLocationContext, useAppLocationState } from '@react-admin/ra-navigation';
import { Admin, Resource } from 'react-admin';

const AnotherComponent = () => {
    const [location] = useAppLocationState();

    // On Edit view
    // location = { path: "post.edit", values: { record: { id: 1, ...} } };

    // On Show view
    // location = { path: "post.show", values: { record: { id: 1, ...} } };
}

const PostShow = () => (/* ... */);
const PostEdit= () => (/* ... */);

const App = () => (
    <Admin dataProvider={dataProvider} layout={LayoutWithAppLocationContext}>
        <Resource name="posts" edit={PostEdit} show={PostShow} />
    </Admin>
)
```

The `record` attribute is always passed for `show` and `edit` actions. This way, you can display the title of your post outside the show or edit component itself.

### `useDefineAppLocation`: Define current App Location in one shot

Using "useAppLocationState" to only define the current location can be tedious. So, to avoid using a specific `useEffect`, you can rely on the `useDefineAppLocation()` which does exactly the same thing in less code.

```jsx
import { useDefineAppLocation } from '@react-admin/ra-navigation';

const DensityTab: FC<any> = () => {
    useDefineAppLocation('experiences.parameters.density', { density: 0.1 });
    return (/* ... */);
};
```

### `useAppLocationMatcher`: Apply a matching on the current App Location

The `useAppLocationMatcher` hook returns a function that can be used to check if the path that is passed as argument matches the current location path.

If the path matches, the match function returns the current location. If not, it returns `null`.

```jsx
import { useAppLocationMatcher } from '@react-admin/ra-navigation';

function matchFooBar() {
    const match = useAppLocationMatcher();
    return match('foo.bar');
}

// matchFooBar() on "foo.bar.baz" location
// will return { path: 'foo.bar', values: {} }

// matchFooBar() on "cov.fefe" location
// will return null
```

### `useResourceAppLocation`: Access Current Resource App Location

While the `useAppLocationState` let you access the current App Location, `useResourceAppLocation` give you the app location from the react-admin "resource" perspective only.

That mean it returns an `AppLocation` only if the current routes matches a React-Admin one (eg: "/songs/1" for song edition, "/songs" for songs listing, etc). In other case, it'll return null.

This hook can be useful to override some "native" routes.

Example:

```jsx
import React, { FC, useEffect } from 'react';

import {
    AppLocationContext,
    useAppLocationState,
    useResourceAppLocation,
} from '@react-admin/ra-navigation';

const SongsGrid = props => {
    const [, setLocation] = useAppLocationState();
    const resourceLocation = useResourceAppLocation();

    useEffect(() => {
        const { artist_id: artistId } = props.filterValues;
        if (typeof artistId !== 'undefined') {
            // It'll change location and display "Filtered by artist X" in the breadcrumb
            setLocation('songs_by_artist.filter', { artistId });
        }
    }, [JSON.stringify({ resourceLocation, filters: props.filterValues })]);

    return (
        <Datagrid {...props}>
            <TextField source="title" />
            <ReferenceField source="artist_id" reference="artists">
                <TextField source="name" />
            </ReferenceField>
        </Datagrid>
    );
};

const SongFilter: FC = props => (
    <Filter {...props}>
        <ReferenceInput alwaysOn source="artist_id" reference="artists">
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

const SongList: FC = props => (
    <List {...props} filters={<SongFilter />}>
        <SongsGrid />
    </List>
);

const MyLayout = ({ children, ...props }) => (
    <AppLocationContext>
        <Layout {...props}>
            <Breadcrumb>
                <ResourceBreadcrumbItems />
                <BreadcrumbItem
                    name="songs_by_artist.filter"
                    label={({ artistId }) => `Filtered by artist #${artistId}`}
                />
            </Breadcrumb>
            {children}
        </Layout>
    </AppLocationContext>
);

export default () => (
    <Admin dataProvider={dataProvider} layout={MyLayout}>
        <Resource name="songs" list={SongList} />
        <Resource name="artists" />
    </Admin>
);
```

## `<Breadcrumb>`: Adding a Breadcrumb Path to Every Page

### The `<Breadcrumb>` and `<ResourceBreacrumbItems />` components

The `<Breadcrumb />` component allows to include a breadcrumb inside our application. The layout of the app must be inside a AppLocationContext.

By default, the `<Breadcrumb />` item will not render anything.
To turn on the breadcrumb resolving from your current react-admin resources, you'll need to provide a `<ResourceBreacrumbItems />` component as `<Breadcrumb />` child.

```jsx
import React from 'react';

import {
    AppLocationContext,
    Breadcrumb,
    ResourceBreadcrumbItems,
} from '@react-admin/ra-navigation';

import { Admin, Resource, Layout } from 'react-admin';

import PostList from './PostList';
import PostEdit from './PostEdit';
import PostShow from './PostShow';
import PostCreate from './PostCreate';

const MyLayout = (props) => (
    <AppLocationContext hasDashboard={props.hasDashboard}>
        <Layout {...props} />
    </AppLocationContext>
);

// Include this component in your views. See below
const MyBreadcrumb = (props) => (
    <Breadcrumb {...props}>
        <ResourceBreadcrumbItems />
    </Breadcrumb>
);

const App = () => (
    <Admin dataProvider={dataProvider} layout={MyLayout}>
        <Resource
            name="posts"
            list={PostList}
            edit={PostEdit}
            show={PostShow}
            create={PostCreate}
        />
    </Admin>
);
```

It'll display respectively:

- "Posts" on Post List
- "Posts / Show #1" on Post Show with id = 1
- "Posts / Edit #1" on Post Edit with id = 1
- "Posts / Create" on Post Create

We don't recommend adding the Breadcrumb inside your layout as it would add unecessary space above the current view. Instead, you should add it directly on the views. For react-admin views such as Create, Show and Edit, you can set the `variant` prop to `actions` to apply custom styles which make it fit inside a `<TopToolbar>` used in actions:

```jsx
import * as React from "react";
import { TopToolbar, ShowButton } from 'react-admin';
import { Breadcrumb } from '@react-admin/ra-navigation';

const PostEditActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <Breadcrumb variant="actions" />
        <ShowButton basePath={basePath} record={data} />
    </TopToolbar>
);

export const PostEdit = (props) => (
    <Edit actions={<PostEditActions />} {...props}>
        ...
    </Edit>
);
 ```

The `ra-enterprise` package includes alternative version of all react-admin views with the breadcrumb already included.

### Using the Dashboard page as root item

If the app have a dashboard page, you can automatically set the root of the Breadcrumb to this page in three possible ways:

1. By passing the `hasDashboard` prop to the `<AppLocationContext>`

```jsx
const MyLayout = ({ children, ...props }) => (
    <AppLocationContext hasDashboard={!!props.dashboard}>
        <Layout {...props} />
    </AppLocationContext>
);
```

2. By passing the `dashboard` prop to the Component

```jsx
const MyBreadcrumb = ({ children, dashboard, ...props }) => (
    <Breadcrumb dashboard={dashboard}>
        <ResourceBreadcrumbItems />
    </Breadcrumb>
);
```

3. By passing a `hasDashboard` prop to the Component

```jsx
const MyBreadcrumb = ({ children, dashboard, ...props }) => (
    <Breadcrumb hasDashboard>
        <ResourceBreadcrumbItems />
    </Breadcrumb>
);
```

By doing this, the breadcrumb will now show respectively:

- "Dashboard / Posts" on Post List
- "Dashboard / Posts / Show #1" on Post Show with id = 1
- "Dashboard / Posts / Edit #1" on Post Edit with id = 1
- "Dashboard / Posts / Create" on Post Create

### The `<BreadcrumbItem>` component

It's also possible to define a custom breadcrumb tree inside `<Breadcrumb />` using a `<BreadcrumbItem />` tree in it.

This way, custom routes can also be displayed inside the breadcrumb.

```jsx
import React from 'react';
import {
    AppLocationContext,
    Breadcrumb,
    ResourceBreadcrumbItems,
    useDefineAppLocation,
} from '@react-admin/ra-navigation';
import { Admin, Resource, Layout, List } from 'react-admin';
import { Route } from 'react-router-dom';

const UserPreferences = () => {
    useDefineAppLocation('myhome.user.preferences');
    return <span>My Preferences</span>;
};

const routes = [
    <Route exact path="/user/preferences" component={UserPreferences} />,
];

const MyLayout = ({ children, ...props }) => (
    <AppLocationContext hasDashboard={!!props.dashboard}>
        <Layout {...props}>
            {children}
        </Layout>
    </AppLocationContext>
);

// Use it in your views
const MyBreadcrumb = () => (
    <Breadcrumb>
        <ResourceBreadcrumbItems />
        <BreadcrumbItem name="myhome" label="Home">
            <BreadcrumbItem name="user" label="User">
                <BreadcrumbItem
                    name="preferences"
                    label="Preferences"
                />
            </BreadcrumbItem>
        </BreadcrumbItem>
    </Breadcrumb>
);

const PostList = (props) => (
    <>
        <MyBreadcrumb />
        <List {...props}>
            // ...
        </List>
    </>
);

const App = () => (
    <Admin dataProvider={dataProvider} customRoutes={routes} layout={MyLayout}>
        <Resource name="posts" list={PostList} />
    </Admin>
);
```

The displayed path will be "Home / User / Preferences" on "/user/preferences".

**Warning:**

We used `myhome` in this exemple and not `home` because it is a reserved word used for the Dashboard page when it exists.

### Overriding Resource Breadcrumb

In some cases, it's useful to override the default resource breadcrumb path. eg: to add custom label instead of "Show #1", "Edit #1", ...

This can be done by disabling concerned resources (enabling only ones we don't customize) in the `<ResourceBreadcrumbItems />` "resources" prop and declare them manually.

```jsx
import React from 'react';
import {
    AppLocationContext,
    Breadcrumb,
    ResourceBreadcrumbItems,
} from '@react-admin/ra-navigation';
import { Admin, Resource, Layout, linkToRecord, List } from 'react-admin';

const MyBreadcrumb = ({ children, ...props }) => (
    <Breadcrumb>
        <ResourceBreadcrumbItems resources={['otherResources']} />
        <BreadcrumbItem name="posts" label="Posts">
            <BreadcrumbItem
                name="edit"
                label={({ record }) => `Edit "${record.title}"`}
                to={({ record }) =>
                    record &&
                    `${linkToRecord('/songs', record.id)}/edit`
                }
            />
            <BreadcrumbItem
                name="show"
                label={({ record }) => record.title}
                to={({ record }) =>
                    record &&
                    `${linkToRecord('/songs', record.id)}/show`
                }
            />
            <BreadcrumbItem name="list" label="My Post List" />
            <BreadcrumbItem name="create" label="Let's write a Post!" />
        </BreadcrumbItem>
    </Breadcrumb>
);

const PostList = (props) => (
    <>
        <MyBreadcrumb />
        <List {...props}>
            // ...
        </List>
    </>
);

const App = () => (
        <Admin dataProvider={dataProvider} layout={MyLayout}>
            <Resource name="posts" list={PostList} />
            <Resource name="otherResource" />
        </Admin>
);
```

## `<MultiLevelMenu>`: Replacing the Default Menu by a Multi-Level One

![MultiLevelMenu](./assets/multilevelmenu.png)

When a React-admin application grows significantly, the default menu might not be the best solution. The `<MultiLevelMenu>` can help organize navigation.

It offers menu items with support for an infinite numbers and levels of sub menus, and category items which display their children in a sliding panel, keeping things out of the way and providing a cleaner navigation.

It accepts the following props:

- `initialOpen`: Whether the menu items with sub menus should be open initialy. Has no effect if using the `categories` variant. Defaults to `false`.
- `variant`: Either `default` or `categories`. Applies proper styles on the Menu when using [MenuItemCategory](#menuitemcategory) items.

In order to use it, the layout of the app must be inside a `<AppLocationContext>`.

### `<MenuItem>`

![A video showing the MenuItem component in action](./assets/ra-multilevelmenu-item.gif)

This component is very similar to the default `<MenuItemLink>` from React-Admin, except that it accepts other `<MenuItem>` as its children.
Those children will be rendered inside a collapsible panel.

The `<MenuItem>` component accepts a `name`, a `label` and an optional `icon` prop.

```jsx
import { Admin, Layout, Resource } from 'react-admin';
import { AppLocationContext, MenuItem, MultiLevelMenu } from '@react-admin/ra-navigation';
import  { Dashboard } from './Dashboard';
import  { dataProvider } from './dataProvider';
import  { SongList } from './songs';
import  { ArtistList } from './artists';

const MyMenu = () => (
    <MultiLevelMenu>
        <MenuItem name="dashboard" to="/" exact label="Dashboard" />
        <MenuItem name="songs" to="/songs" label="Songs" />
        {/* The empty filter is required to avoid falling back to the previously set filter */}
        <MenuItem name="artists" to={'/artists?filter={}'} label="Artists">
            <MenuItem
                name="artists.rock"
                to={'/artists?filter={"type":"Rock"}'}
                label="Rock"
            >
                <MenuItem
                    name="artists.rock.pop"
                    to={'/artists?filter={"type":"Pop Rock"}'}
                    label="Pop Rock"
                />
                <MenuItem
                    name="artists.rock.folk"
                    to={'/artists?filter={"type":"Folk Rock"}'}
                    label="Folk Rock"
                />
            </MenuItem>
            <MenuItem
                name="artists.jazz"
                to={'/artists?filter={"type":"Jazz"}'}
                label="Jazz"
            >
                <MenuItem
                    name="artists.jazz.rb"
                    to={'/artists?filter={"type":"RB"}'}
                    label="R&B"
                />
            </MenuItem>
        </MenuItem>
    </MultiLevelMenu>
);

const MyLayout = props => {
    return (
        <AppLocationContext>
            <Layout {...props} menu={MyMenu} />
        </AppLocationContext>
    );
};

export const Basic = () => (
    <Admin
        dashboard={Dashboard}
        dataProvider={dataProvider}
        layout={MyLayout}
    >
        <Resource name="songs" list={SongList} />
        <Resource name="artists" list={ArtistList} />
    </Admin>
);
```

### `<MenuItemCategory>`

![A video showing the MenuItem component in action](./assets/ra-multilevelmenu-categories.gif)

Sometimes, even menu with sub menus are not enough to organize the navigation. `<MenuItemCategory>` components can be used as children of a `<MultiLevelMenu>` to display a vertical bar with smaller items. Clicking on any of those items will slide in a panel with the `<MenuItemCategory>` children which can be any component.

You must set the `variant` prop to `categories` on the `<MultiLevelMenu>` component to ensure it get properly styled.

Please only add others `<MenuItemCategory>` components as children of the `<MultiLevelMenu>` if you already added one.

In case you use `<MenuItem />` nested in a `<MenuItemCategory />`, labels may disappear when the sidebar is in reduced mode because of the internal workings of react-admin. That's why we recommend to implement your own `<AppBar />` and hide the Hamburger Button since the "categories" variant of the `<MultiLevelMenu />` is thin enough not to interfere with the navigation.

Besides, in order to adjust the size of the React-Admin `<Sidebar>` component according to the categories, you should either apply the theme provided by the `@react-admin/ra-navigation` package, or merge it in your own custom theme.

```jsx
import { Admin, Layout, Resource } from 'react-admin';
import { AppLocationContext, Menu, MenuItem, MenuItemCategory, MultiLevelMenu, theme } from '@react-admin/ra-navigation';
import { makeStyles } from '@material-ui/core/styles';

import  { Dashboard } from './Dashboard';
import  { dataProvider } from './dataProvider';
import  { SongList } from './songs';
import  { ArtistList } from './artists';

const useStyles = makeStyles({
    // Custom styles for the configuration item so that it appears at the very bottom of the sidebar
    configuration: {
        marginTop: 'auto',
    },
});

const MyMenu = () => {
    const classes = useStyles();

    return (
        <MultiLevelMenu variant="categories">
            <MenuItemCategory
                name="dashboard"
                to="/"
                exact
                label="Dashboard"
                icon={<DashboardIcon />}
            />
            <MenuItemCategory
                name="songs"
                icon={<MusicIcon />}
                to="/songs"
                label="Songs"
            />
            {/* The empty filter is required to avoid falling back to the previously set filter */}
            <MenuItemCategory
                name="artists"
                to={'/artists?filter={}'}
                label="Artists"
                icon={<PeopleIcon />}
            >
                {/* CardContent to get consistent spacings */}
                <CardContent>
                    <Typography variant="h3" gutterBottom>
                        Custom title
                    </Typography>
                    {/* Note that we must wrap our MenuItem components in a Menu */}
                    <Menu>
                        <MenuItem
                            name="artists.rock"
                            to={'/artists?filter={"type":"Rock"}'}
                            label="Rock"
                        >
                            <MenuItem
                                name="artists.rock.pop"
                                to={'/artists?filter={"type":"Pop Rock"}'}
                                label="Pop Rock"
                            />
                            <MenuItem
                                name="artists.rock.folk"
                                to={'/artists?filter={"type":"Folk Rock"}'}
                                label="Folk Rock"
                            />
                        </MenuItem>
                        <MenuItem
                            name="artists.jazz"
                            to={'/artists?filter={"type":"Jazz"}'}
                            label="Jazz"
                        >
                            <MenuItem
                                name="artists.jazz.rb"
                                to={'/artists?filter={"type":"RB"}'}
                                label="R&B"
                            />
                        </MenuItem>
                    </Menu>
                </CardContent>
            </MenuItemCategory>
            <MenuItemCategory
                className={classes.configuration}
                name="configuration"
                to="/"
                exact
                label="Configuration"
                icon={<SettingsIcon />}
            />
        </MultiLevelMenu>
    );
};

const MyLayout = props => {
    return (
        <AppLocationContext>
            <Layout {...props} menu={MyMenu} />
        </AppLocationContext>
    );
};

export const MyApp = () => (
    <Admin
        dataProvider={dataProvider}
        layout={MyLayout}
        dashboard={Dashboard}
        /* Apply the theme provided by ra-navigation */
        theme={theme}
    >
        <Resource name="songs" list={SongList} />
        <Resource name="artists" list={ArtistList} />
    </Admin>
);
```
