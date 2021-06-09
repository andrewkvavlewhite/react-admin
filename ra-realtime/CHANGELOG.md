# CHANGELOG

## v1.3.2

> 2021-04-26

- (performances) Replace MUI boxes by div with styles.

## v1.3.1

> 2021-03-18

- (fix) Disable List Notifications

## v1.3.0

> 2021-02-18

- (feat) Allows to customize side effects when an event is received in RealTimeList, RealTimeEdit and RealTimeShow via the `onEventReceived` prop.

```js
import { useRefresh } from 'react-admin';
import { RealTimeList } from '@react-admin/ra-realtime';

const PostList = props => {
    const refresh = useRefresh();
    const handleEventReceived = (event) => {
        refresh();
    };

    return (
        <RealTimeList {...props} onEventReceived={handleEventReceived}>
            <Datagrid>
                <TextField source="title" />
            </Datagrid>
        </RealTimeList>
    );
};
```

## v1.2.1

> 2020-11-18

- Upgrade to react-admin `3.10`

## v1.2.0

> 2020-10-05

- Upgrade to react-admin `3.9`

## v1.1.3

> 2020-09-30

- Update Readme

## v1.1.2

> 2020-09-30

- (fix) Fix bad export in realtime Edit Storybook Action

## v1.1.1

> 2020-09-28

- (fix) Fix extra spacing in storybook edit examples

## v1.1.0

> 2020-09-21

- (feat) Add the autoclaim capability (autolock when unlocked) to the `useLock` hook
- (fix) Fix missing storybook examples for realtime locking

## v1.0.5

> 2020-09-18

- (fix) Fix non-working Mercure storybook examples

## v1.0.4

> 2020-09-15

- (fix) Fix missing export
- (deps) Upgrade dependencies

## v1.0.3

> 2020-09-14

- (feat) Add a `useHasLocks` hook to select all locks for a resource

## v1.0.2

> 2020-09-10

- (fix) Add missing resource security check on the `useHasLock` selector

## v1.0.0

> 2020/08/04

- First release
