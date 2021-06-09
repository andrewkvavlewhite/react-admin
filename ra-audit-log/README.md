# ra-audit-log

Display event lists and audit logs, keep track of user actions, and get an overview of the activity of your admin. 

![ra-audit-log](./assets/ra-audit-log.gif)

## Installation

```sh
npm install --save @react-admin/ra-audit-log
# or
yarn add @react-admin/ra-audit-log
```

**Tip**: `ra-audit-log` is part of the [React-Admin Enterprise Edition](https://marmelab.com/ra-enterprise/), and hosted in a private npm registry. You need to subscribe to one of the Enterprise Edition plans to access this package.

## Overview

This module introduces 2 new components:

- [`<Timeline>`](#timeline) shows a list of all recent changes in the admin. It's a great component for dashboards.
- [`<EventList>`](#eventlist) is a ready-to-use `List` component for navigating in your admin history, complete with filters and pagination.

## Setup

### Event Format

This package expects you to store and expose one "event" for each change triggered by a user action. 

Event records must contain the following properties:

- `id`
- `date`
- `author`
- `resource`
- `action`

Here is a typical event:

```js
{
  date: '2020-09-08 15:01:00',
  author: 567,
  resource: 'posts',
  action: 'create',
  payload: { title: 'foo', body: 'bar' }
}
```

We recommend that you create event logs server-side, i.e. add a new `event` record each time a user performs a mutation (`create`, `update`, `delete`, `updateMany`, `deleteMany`). Typically, you can achieve this using a proxy server, a database trigger, or a middleware in your API server. Then, it's your responsibility to expose an API for these events and to update your `dataProvider` so that it can access `events` like any other resource. 

### Events Resource

To let react-admin components query the backend for events, you should add a `<Resource>` for them:

```diff
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';

export const App = () => (
    <Admin dataProvider={dataProvider}>
        {/* your Resources go here */}
+       <Resource name="events" />
    </Admin>
)
```

### Client-Side Tracking

You can choose to let `ra-audit-log` create `events` for you. In this case, each mutation performed by a user will trigger a call to `dataProvider.create('events', [event details])`. We call this feature client-side tracking.

To enable client-side tracking, wrap your dataProvider with the `addEventsForMutations` helper:

```js
import { addEventsForMutations } from '@react-admin/ra-audit-log';
import simpleRestProvider from 'ra-data-simple-rest';

const dataProvider = addEventsForMutations(simpleRestProvider('http://path.to.my.api/'));
```

When enabled, after each successful mutation, the client-side tracking wrapper adds a new event. For instance:

```js
// when your app calls
dataProvider.update('orders', { id: 123, data: { status: 'delivered' }, previousData: { id: 123, status: 'received' } });
// the wrapper calls
dataProvider.create('events', { 
    date: '2020-09-08 15:01:00',
    author: 567,
    resource: 'orders',
    action: 'update',
    payload: { id: 123, data: { status: 'delivered' }, previousData: { id: 123, status: 'received' } }
});
```

In addition to the `dataProvider` to extend, the `addEventsForMutations` function accepts the following options:

- `name`: the name of the event logs resource (defaults to `events`)

```js
import { addEventsForMutations } from '@react-admin/ra-audit-log';
import simpleRestProvider from 'ra-data-simple-rest';

const dataProvider = addEventsForMutations(simpleRestProvider('http://path.to.my.api/'), { name: 'events' });
```

- `resources`: the resources and mutations you want to track with events. It can be an array of resource names or an array of arrays defining both the resource and the dataProvider calls to track

```js
import { addEventsForMutations } from '@react-admin/ra-audit-log';
import simpleRestProvider from 'ra-data-simple-rest';

const dataProvider = addEventsForMutations(
    simpleRestProvider('http://path.to.my.api/'),
    {
        resources: [
             // create an event for all known mutations on posts
            'posts',
            // create an event only for create and update on comments, but not for delete, deleteMany or updateMany
            ['comments', ['create', 'update']]
        ]
    }
);
```

- `shouldAudit`: as an alternative to `resources`, you can specify a function which, given a dataProvider method name (`create`, `update`, etc.) and the arguments it was called with, should return `true` to create an event. This allows to target custom dataProvider methods:

```js
import { addEventsForMutations } from '@react-admin/ra-audit-log';
import simpleRestProvider from 'ra-data-simple-rest';

const dataProvider = addEventsForMutations(
    simpleRestProvider('http://path.to.my.api/'),
    {
        shouldAudit: (action, ...args) => {
            if (action === 'myCustomMethod') {
                return true;
            }
        }
    }
);
```

## `<Timeline>`

![Timeline component](./assets/timeline.png)

The `<Timeliine>` component displays a list of events, the most recent first, grouped by day. It's the ideal component for checking the recent activity of an admin.

It accepts the following props:

- `records`:  An array of events
- `loaded`: Optional. Boolean, indicating whether the data has been loaded at least once.
- `children`: Optional. Component rendered for each group of audit logs.
- `groupLogs`: Optional. A function called with the audit logs and the locale. Must return groups.
- `skeletonItems`: Optional. Number of items to display in the skeleton used when data is being fetched.

### Basic Usage

It's your responsibility to get the events from the `dataProvider` and pass them to `<Timeline>`.

```jsx
import { useGetList } from 'react-admin';
import { Timeline } from '@react-admin/ra-audit-log';

const Dashboard = () => {
    const { data, ids, loaded } = useGetList(
        'events',
        { page: 1, perPage: 25 },
        { field: 'date', order: 'desc' },
    });
    const records = ids.map(id => data[id]);

    return (
        <Timeline loaded={loaded} records={records} />
    );
}
```

### Custom Group Component

By default, `<Timeline>` uses the `<TimelineGroup>` component to render each group. You can use your own component instead by passing it as the `<Timeline>` child. In this component, use the `useTimelineGroup` hook to grab the group information.

```jsx
import { useGetList } from 'react-admin';
import { Timeline, useTimelineGroup } from '@react-admin/ra-audit-log';

const Dashboard = () => {
    const { data, ids, loaded } = useGetList(
        'audit-logs',
        { page: 1, perPage: 25 },
        { field: 'date', order: 'desc' },
    });
    const records = ids.map(id => data[id]);

    return (
        <Timeline loaded={loaded} records={records}>
            <MyTimelineGroup />
        </Timeline>
    );
}

const MyTimelineGroup = () => {
    const { label, records } = useTimelineGroup();
    return (
        <article>
            <h1>{label}</h1>
            <ul>
                {records.map(record => (
                    <li>{JSON.stringify(record)}</li>
                ))}
            </ul>
        </article>
    );
};
```

### Custom Item Component

`<TimelineGroup>` renders each event using the `<TimelineItem>` component. You can replace it with your own component instead, by passing it as a child to `<TimelineGroup>`. Use the `useRecordContext` hook to grab the event record.

```jsx
import { useGetList, useRecordContext } from 'react-admin';
import { AuditLogLabel, Timeline, TimelineItem, TimelineGroup, useTimeline } from '@react-admin/ra-audit-log';

const Dashboard = () => {
    const { data, ids, loaded } = useGetList(
        'audit-logs',
        { page: 1, perPage: 25 },
        { field: 'date', order: 'desc' },
    });
    const records = ids.map(id => data[id]);

    return (
        <Timeline loaded={loaded} records={records}>
            <MyTimelineGroup />
        </Timeline>
    );
}

const MyTimelineGroup = () => {
    return (
        <TimelineGroup>
            <MyTimelineItem />
        </TimelineGroup>
    );
};

const MyTimelineItem = (props) => {
    const record = useRecordContext(props.record);

    return (
        <ListItem>
            <ListItemText
                primary={record.author.fullName}
                secondary={<AuditLogLabel />}
            />
        </ListItem>
    );
};
```

## `<RecordTimeline>`

![RecordTimeline component](./assets/recordtimeline.png)

The `<RecordTimeline>` component is a specialized version of the `<Timeline>`. It accepts the same props except `records` and `loaded`. It will fetch the event related to the current record. This record can be either the one from the current RecordContext (set by react-admin components) or the one specified using the `record` prop.

It accepts the following props:

- `record`: Optional. The record for which to fetch the events
- `resource`: Optional. The resource.
- `eventResource`: Optional. The resource for the events.
- `children`: Optional. Component rendered for each group of audit logs.
- `groupLogs`: Optional. A function called with the audit logs and the locale. Must return groups.
- `skeletonItems`: Optional. Number of items to display in the skeleton used when data is being fetched.

### Usage

You can use the `<RecordTimeline>` as an aside for an `<Edit>` view:

```jsx
import { Edit, SimpleForm, TextField } from 'react-admin';
import { RecordTimeline } from '@react-admin/ra-audit-log';

const ProductEdit = (props) => {
    return (
        <Edit {...props} aside={<RecordTimeline />}>
            <SimpleForm>
                <TextField source="name" />
            </SimpleForm>
        </Edit>
    );
}
```

## `useRecordEvents`

This hook cn be used to fetch events related to a record. It accept the following options:

- `record`: Optional. The record for which to fetch the events. Will be inferred from the RecordContext if not provided
- `resource`: Optional. The resource of the record. Will be inferred from the ResourceContext if not provided
- `eventResource`: Optional. The resource for the events. Defaults to `events`
- `page`: Optional. The page of events to fetch. Defaults to 1
- `perPage`: Optional. The number of events to fetch. Defaults to 25
- `sort`: Optional. The field used to sort the events. Defaults to `date`
- `order`: Optional. The order into which to sort the events. Defaults to `DESC`

It returns the same object as the [`useGetList`](https://marmelab.com/react-admin/Actions.html#usegetlist)hook, containing the following properties:

- `data`: An object where keys are records identifiers and values the records
- `ids`: An array of the records identifiers
- `loaded`: A boolean indicating whether the list has been fetched at least once
- `loading`: A boolean indicating whether the list is currently loading
- `error`: An object containing an error when one occurs

## `<EventList>`

The `<EventList>` component is a full-featured `List` component for events, pre-configured with a Datagrid and a filter sidebar.

![event-list screencast](./assets/ra-audit-log-event-list.gif)

### Basic Usage

Use the `<EventList>` component as the `list` prop of the events `<Resource>`:

```jsx
// In App.js
import { Admin, Resource } from 'react-admin';
import { EventList } from '@react-admin/ra-audit-log';

export const App = () => (
    <Admin>
        <Resource name="events" list={EventList} />
    </Admin>
)
```

In addition to the usual List props,  `<EventList>` accepts the following props:

- [`eventResource`](#eventresource): The name of the events resource. Defaults to `events`.
- [`authorResource`](#authorresource): You can optionally provide the resource name for the authors of the events. `ra-audit-log` will use it to create links to authors.
- [`dateFilters`](#datefilters): A map of date filters to replace the default ones.

### Events Resource

`<EventList>` allows users to filter events by resource, exluding the events resource itself. By default, it excludes the `events` resource. If you used a different resource name for events, use the `eventResource` prop to change it:

```jsx
// In App.js
import { Admin, Resource } from 'react-admin';
import { MyEventList } from './evenList';

export const App = () => (
    <Admin>
        <Resource name="audit-logs" list={MyEventList} />
    </Admin>
)

// in ./eventList.js
import { EventList } from '@react-admin/ra-audit-log';

export const MyEventList = (props) => (
    <EventList eventResource="audit-logs" />
)
```

### Authors Resource

You can provide a resource name for the authors of the events. `<EventList>` uses it to render links to each author in the list, and an [`AutocompleteArrayInput`](https://marmelab.com/react-admin/Inputs.html#autocompletearrayinput) to filter them.

Without authors resource:
![event list without authors resource](./assets/eventlist-no-authors-resource.png)

With authors resource:
![event list with authors resource](./assets/eventlist-authors-resource.png)

Use the `authorResource` prop to set the author resource in the `<EventList>`:

```jsx
// In App.js
import { Admin, Resource } from 'react-admin';
import { MyEventList } from './evenList';

export const App = () => (
    <Admin>
        <Resource name="events" list={MyEventList} />
    </Admin>
)

// In ./eventList.js
import { EventList } from '@react-admin/ra-audit-log';

export const MyEventList = (props) => (
    <EventList authorResource="users" />
)
```

### Date Filters

By default, `@react-admin/ra-audit-log` provides filters for the following date ranges:

- Today
- Last week
- Last month
- Last quarter

You can provide your own set of date filters by using the `dateFilters` prop:

```jsx
// In App.js
import { Admin, Resource } from 'react-admin';
import { MyEventList } from './evenList';

export const App = () => (
    <Admin>
        <Resource name="events" list={MyEventList} />
    </Admin>
)

// In ./eventList.js
import { DefaultDateFilters, EventList } from '@react-admin/ra-audit-log';

const dateFilters = {
    ...DefaultDateFilters,
    'This Year': () => startOfYear(new Date()).toISOString(),
};

export const MyEventList = (props) => (
    <EventList dateFilters={dateFilters} />
);
```

## Internationalization

`ra-audit-log` provides translations for English (`raAuditLogLanguageEnglish`) and French (`raAuditLogLanguageFrench`).

The interface in English looks like this: 
![english interface](./assets/english.png)

The interface in French looks like this: 
![french interface](./assets/french.png)

You should merge these translations with the other interface messages before passing them to your `i18nProvider`:

```js
import { mergeTranslations } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import frenchMessages from 'ra-language-french';
import { raAuditLogLanguageEnglish, raAuditLogLanguageFrench } from '@react-admin/ra-audit-log';


const i18nProvider = polyglotI18nProvider(locale =>
    locale === 'en'
        ? mergeTranslations(englishMessages, raAuditLogLanguageEnglish)
        : mergeTranslations(frenchMessages, raAuditLogLanguageFrench)
);
```

The event field names are translatable. `ra-audit-log` uses the react-admin [resource and field name translation system](https://marmelab.com/react-admin/Translation.html#translating-resource-and-field-names). This is an example of an English translation file:

```js
// in i18n/en.js

export default {
    resources: {
        events: {
            name: 'Log |||| Log',
            fields: {
                date: 'Date',
                author: 'Author',
                resource: 'Resource',
                action: 'Action',
            }
        }
    }
}
```

`ra-audit-log` also supports internationalization for the textual representation of the event *action*.

If available, `ra-audit-log` uses the translation with the key `ra-audit-log.event.[resource].[action]`, where `resource` and `action` are replaced with the actual resource and action names. For example: `ra-audit-log.event.posts.create`.

If not available, it will fall back to the following translation key: `ra-audit-log.event.[action]`, where `action` is replaced with the actual action name. For example: `ra-audit-log.event.create`.

In all cases, the following variables are available for interpolation in the translated string:

- `name`: the name of the record targeted by the action if available. It will be the first available property on the record in this list: `name`, `label`, `title`, `reference`, or `id`.
- `resource`: the name of the event resource
- `ids`: the list of the record identifiers if the action was targeting many (`deleteMany`, `updateMany` for example).

## Building Blocks

Would you want to create your own `<EventList>` component, we provide some building blocks you might reuse:

- `<EventListFilter>`: A component to pass to the list `filter` prop. It includes the author, date, and resource filters.
- `<AuthorInput>`: An input used to filter events by authors. It's a basic TextInput unless the `authorResource` prop is provided. In this case, it's a `<ReferenceArrayInput>` with an `<AutocompleteArrayInput>`.
- `<EventDateInput>`: An input used to filter events by date. It provides the default date filters presented [before](#datefilters). It accepts a `dateFilters` prop similar to the [`<EventList>`](#datefilters).
- `<ResourceInput>`: An input used to filter events by resource. It's an `<AutocompleteArrayInput>` which lists all the resources declared in the `<Admin>` component but the events.


- `<EventFilterList>`: A component to pass to the list `aside` prop. It includes the author, date, and resource filters presented as a [sidebar](https://marmelab.com/react-admin/List.html#the-filterlist-sidebar).
- `<AuthorFilterList>`: A filter sidebar part used to filter events by authors. It's a basic TextInput unless the `authorResource` prop is provided. In this case, it's a `<ReferenceArrayInput>` with an `<AutocompleteArrayInput>`.
- `<EventFilterList>`: A filter sidebar part used to filter events by date. It provides the default date filters presented [before](#datefilters) and displayed as [filter list items](https://marmelab.com/react-admin/List.html#the-filterlist-sidebar). It accepts a `dateFilters` prop similar to the [`<EventList>`](#datefilters).
- `<ResourceFilterList>`: A filter sidebar part used to filter events by resource. It's an `<AutocompleteArrayInput>` which lists all the resources declared in the `Admin` component but the events.


- `<ActionField>`: A react-admin field that displays a formated text for the event action.
- `<AuthorField>`: A react-admin field that displays the event authors. If the `authorResource` prop is provided, it uses a `<ReferenceField>` and will show a link to the author.
- `<AvatarField>`: A react-admin field that displays the author avatar with a fallback to a material-ui icon.
- `<ResourceField>`: A react-admin field that displays the event resource. The resource name is translated like in react-admin. It will use the [resource label option](https://marmelab.com/react-admin/Resource.html#options) if available.
