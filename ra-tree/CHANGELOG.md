# CHANGELOG

## v1.6.3

> 2021-05-03

- (fix) Fix scrollbars appearing when expanding nodes

## v1.6.2

> 2021-05-03

- (fix) Fix reordering in the dataProviders builders.

## v1.6.1

> 2021-04-26

- (performances) Replace MUI boxes by div with styles.

## v1.6.0

> 2021-04-22

- (feat) Add lazy load mode on `<TreeWithDetails>` with the `lazy` prop which accept a boolean.

In lazy mode, the tree will only load the root nodes on mount and will load the child nodes of a node when it expands.

## v1.5.0

> 2021-04-02

- (feat) Allow to easily hide root nodes on `<TreeWithDetails>` with the `hideRootNodes` props.

## v1.4.1

> 2021-04-01

- (fix) Fix TreeWithDetails displays multiple titles after selecting a node

## v1.4.0

> 2021-03-31

- (feat) Add support for title in `<TreeWithDetails>`
- (feat) Fix and export more component props interfaces

## v1.3.4

> 2021-03-17

- (fix) Fix moving a root node fails when using the addTreeMethodsBasedOnChildren builder

## v1.3.3

> 2021-02-16

- (fix) Update for react-admin 3.12

## v1.3.2

> 2020-12-14

- Remove unnecessary dependencies

## v1.3.1

> 2020-11-18

- Upgrade to react-admin `3.10`

## v1.3.0

> 2020-10-05

- Upgrade to react-admin `3.9`

## v1.2.6

> 2020-09-30

- (fix) Ensure we don't prevent non tree records from being deleted

## v1.2.5

> 2020-09-30

- Update Readme

## v1.2.4

> 2020-09-28

- (fix) Fix warnings regarding React refs
- (fix) Fix warnings about unknown props in Toolbar

## v1.2.3

> 2020-09-28

- (fix) Fix redirection side effect for DeleteMenuItem components

## v1.2.2

> 2020-09-25

- (fix) Fix default redirect for DeleteMenuItem components

## v1.2.1

> 2020-09-23

- (fix) Fix the style of the default `Toolbar`.

## v1.2.0

> 2020-09-18

- (feat) Provides `SimpleForm`, `TabbedForm`, `Toolbar` and `DeleteButton` components for use inside a view (`Edit` and `Show` for example).

## v1.1.1

> 2020-09-17

- (fix) Fix Deletion components are not exported
- (fix) Fix TypeScript types for Deletion components props
- (fix) Fix Deletion components should have their redirect prop set to false by default

## v1.1.0

> 2020-09-17

- (feat) Add support for branch deletion

## v1.0.2

> 2020-09-16

- (deps) Upgrade dependencies

## v1.0.1

> 2020-08-27

- (fix) Fix dark mode support

## v1.0.0

> 2020-08-03

- First release
