# CHANGELOG

## v4.1.2

> 2021-04-22

- (fix) Avoid spreading react-admin props on html elements

## v4.1.1

> 2021-04-29

- (fix) Setup translations for all existing modules.

## v4.1.0

> 2021-04-08

- (feat) Automatically setup the breadcrumb correctly when a dashboard has been specified.

## v4.0.0

> 2021-04-01

**Breaking change**

- (feat) Remove `<BreadcrumbForActions>` in favor of `<Breadcrumb variant="actions">`

## v3.2.0

> 2021-03-23

- (feat) Provide Custom RealTimeList With Breadcrumb
- (fix) Fix and Simplify Props Interfaces
- (fix) Ensure Breadcrumb is Well Integrated in Views

## v3.1.0

> 2021-03-19

- (feat) Allow to customize breadcrumb in views and actions

## v3.0.0

> 2021-02-19

**BREAKING CHANGE**
- `Layout` does not accept a `breadcrumb` prop and does not include a default `Breadcrumb` anymore.

Instead we recommend to includes the Breacrumb inside the views directly. This was motivated by the fact that the breadcrumb was taking too much space above the views. In order to keep the breadcrumb in the default react-admin views, we recommend using the alternative versions provided by this package. See below.

- (feat) Add preconfigured `Show` and `List` which includes a Breacrumb in their actions toolbar.
- (feat) Update `Create` and `Edit` to includes a Breacrumb in their actions toolbar.
- (feat) Provide `CreateActions`, `EditAction`, `ListActions` and `ShowActions` which includes a Breacrumb.

## v2.0.1

> 2021-02-16

- (fix) Remove dependency to ra-language-french

## v2.0.0

> 2020-11-19

- Upgrade ra-relationships to `2.0.0`
- Provide `<Create>` and `<Edit>` components which wraps their children with a `<ManyToManyReferenceContextProvider>`

## v1.1.0

> 2021-01-08

- Update to react-admin 3.11

## v1.0.5

> 2020-12-10

- (fix) Fix custom menu cannot be collapsed by upgrading react-admin

## v1.0.4

> 2020-12-04

- Clarify documentation about exported components


## v1.0.3

> 2020-11-18

- Upgrade to react-admin `3.10`

## v1.0.2

> 2020-11-04

- (fix) Fix default messages export

## v1.0.1

> 2020-10-31

- (fix) Fix theme switcher works on some elements only 

## v1.0.0

> 2020-10-14

- First release ✨
- (deps) Add `@react-admin/ra-search` to dependencies

## v0.1.2

> 2020-10-13

- (fix) Fix the Messages type
- (deps) Upgrade react-admin to v3.9.3

## v0.1.1

> 2020-10-08

- (feat) Enable `<MultiLevelMenu>` by default

## v0.1.0

> 2020-10-05

- (deps) Upgrade to react-admin v3.9.0

## v0.0.5

> 2020-10-01

- (fix) Remove the create button in the list view of the `Admin` and `Layout` stories
- (deps) Upgrade `@react-admin/ra-tree` to `v1.2.6` to fix issues with custom reducers

## v0.0.4

> 2020-09-29

- (fix) Dashboard is not detected

## v0.0.3

> 2020-09-25

- (fix) Fix an error that makes the theme unchangeable
- (fix) Fix the background color of the default dark `theme`

## v0.0.2

> 2020-09-24

- (fix) Fix TypeScript types for the `theme`
- (fix) Allow passing an empty theme to the `<Admin>`
- (deps) Add `@react-admin/ra-form-layout` to dependencies

## v0.0.1

> 2020-09-18

- (feat) Add a pre-configured `<Admin>` component
- (feat) Add pre-configured layout components (`<Layout>`, `<AppBar>`, `<Breadcrumb>`, `<Sidebar>`)
- (feat) Add `i18nProvider` methods
- (feat) Add `theme` methods
