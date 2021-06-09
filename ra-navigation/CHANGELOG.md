# CHANGELOG

## v2.2.3

> 2021-05-06

- (fix) Fix Breadcrumb resource items for details views are not translated

## v2.2.2

> 2021-05-03

- (fix) Fix Breadcrumb Dark Mode Support

## v2.2.1

> 2021-04-27

- (fix) Fix split on undefined in `getDeepestLocation`

## v2.2.0

> 2021-04-22

- (feat) Add the `initialOpen` prop on the `<MultiLevelMenu>`. Defines whether the menu items with sub menus should be open initialy.

## v2.1.0

> 2021-04-08

- (feat) Add the `hasDashboard` prop on the `<AppLocationContext>`
This allows to avoid specifying this prop on the `<Breacrumb>` itself.
It's used in `ra-enterprise` to setup the breadcrumb automatically regarding the dashboard.

- (feat) Introduce the `useHasDashboard` hook to check if a dashboard has been defined.

- (fix) Ensure the AppLocation and breadcrumb behave correctly when views are included in other views (Create/Edit/Show in aside for example).

## v2.0.0

> 2021-04-01

**Breaking change**

- (feat) Introduce variant prop on `<Breadcrumb>`.

```diff
import * as React from "react";
import { TopToolbar, ShowButton } from 'react-admin';
-import { BreadcrumbForActions } from '@react-admin/ra-navigation';
+import { Breadcrumb } from '@react-admin/ra-navigation';

const PostEditActions = ({ basePath, data, resource }) => (
    <TopToolbar>
-        <BreadcrumbForActions />
+        <Breadcrumb variant="actions" />
        <ShowButton basePath={basePath} record={data} />
    </TopToolbar>
);

export const PostEdit = (props) => (
    <Edit actions={<PostEditActions />} {...props}>
        ...
    </Edit>
);
```

## v1.3.3

> 2021-03-23

- (fix) Allow to Override BreadcrumbForActions className

## v1.3.2

> 2021-03-22

- (fix) Fix BreacrumbForActions props interface

## v1.3.1

> 2021-03-19

- (fix) Fix Breacrumb Styles
- (fix) Move Breadcrumb out of Layout

## v1.3.0

> 2021-03-18

- (feat) Added `<BreadcrumbForActions>`, a `Breadcrumb` variation with custom styles to make it fit inside an actions toolbar.

```jsx
import * as React from "react";
import { TopToolbar, ShowButton } from 'react-admin';
import { BreadcrumbForActions } from '@react-admin/ra-navigation';

const PostEditActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <BreadcrumbForActions />
        <ShowButton basePath={basePath} record={data} />
    </TopToolbar>
);

export const PostEdit = (props) => (
    <Edit actions={<PostEditActions />} {...props}>
        ...
    </Edit>
);
```

## v1.2.5

> 2021-03-17

- (fix) Fix MenuItemCategory popover is always at the page top

## v1.2.4

> 2020-11-27

- (fix) Fix `MenuItem` inside `<MenuItemCategory>` do not display their label when sidebar is collapsed
- (fix) Fix custom menu cannot be collapsed in ra-enterprise by upgrading react-admin

## v1.2.3

> 2020-11-03

- (fix) Fix `<MenuItemCategory>` blocks scroll

## v1.2.2

> 2020-10-23

- (fix) Fix `<MenuItemCategory>` sometimes hidden by the `<AppBar>`

## v1.2.1

> 2020-10-15

- (feat) Show by default which `<MenuItem>` is hovered by using a grey background
- (fix) Clicking on `<MenuItem>` borders wasn't possible

## v1.2.0

> 2020-10-05

- Upgrade to react-admin `3.9`

## v1.1.5

> 2020-10-01

- (fix) Fix menu overlapping when passing from a `<MenuItemCtagory />` to another one

## v1.1.4

> 2020-09-30

- Update Readme

## v1.1.3

> 2020-09-29

- (fix) Export breadcrumb types

## v1.1.2

> 2020-09-25

- (fix) Render the `<BreadcrumbItem>` using material-ui `<Typography>` and `<Link>`

## v1.1.1

> 2020-09-17

- (fix) Fix `<MenuItemCategory>` props types

## v1.1.0

> 2020-09-17

- (feat) Replace `home` by `dashboard`
- (fix) Ensure the label of the dashboard `<BreadcrumbItem>` is translatable and uses react-admin defaults

## v1.0.5

> 2020-09-16

- (feat) Add a hover effect for the `<MenuItemCategory>`
- (fix) Fix the dark mode for the `<MultiLevelMenu>`
- (deps) Upgrade dependencies

## v1.0.4

> 2020-09-03

- (feat) Add a home link to the `<Breadcrumb>`
- (feat) Allow to design the `<Breadcrumb`
- (fix) Fix the breadcrumbs when used in the home page
- (deps) Upgrade dependencies

## v1.0.3

> 2020-08-21

- (fix) Fix the `<MenuItemCategory>` blur

## v1.0.2

> 2020-08-21

- (feat) Allow the `<MenuItemCategory>` customization

## v1.0.1

> 2020-08-20

- (feat) Introduce the `<MultiLevelMenu>`
- (doc) Improve the documentation
- (deps) Upgrade dependencies

## v1.0.0

> 2020-07-31

- First release
