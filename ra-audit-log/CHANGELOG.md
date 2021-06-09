# CHANGELOG

## v2.0.2

> 2021-04-20

- (fix) Add missing date-fns dependency 

## v2.0.1

> 2021-04-12

- (fix) Make Resource and Event Inputs Resettable

## v2.0.0

> 2021-03-22

- (feat) Introduce `<RecordTimeline>` component
- (feat) Introduce `useRecordEvents` hook

**Breaking Change**:

- (feat) Refactor `useEventLabel` to accept a `variant` prop instead of the `inline` prop

```diff
-useEventLabel({ inline: true })
+useEventLabel({ variant: 'inline' })
```

## v1.0.3

> 2021-03-22

- (fix) Fix ra-audit-log published without built files

## v1.0.2

> 2021-03-19

- (fix) Add a better screencast to showcase the package

## v1.0.1

> 2021-03-18

- (fix) Fix Filters in Sidebar erase existing filters
- (fix) Fix Filters in Sidebar initial values
- (fix) Fix Filters in Sidebar display

## v1.0.0

> 2021-03-17

- First release
