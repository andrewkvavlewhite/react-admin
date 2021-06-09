# ra-tour: Tour for React-admin

This module provides a way to guide users through tutorials to showcase and explain important features of your interfaces.

ra-tour lets you implement a  tour quickly, and to plug in your own code easily for custom use cases.

You can test this module in the <a href="https://marmelab.com/ra-enterprise-demo/#/tours" target="_blank">ra-tour live demo</a>.

## Installation

```sh
npm install --save @react-admin/ra-tour
# or
yarn add @react-admin/ra-tour
```

**Tip**: `ra-tour` is part of the [React-Admin Enterprise Edition](https://marmelab.com/ra-enterprise/), and hosted in a private npm registry. You need to subscribe to one of the Enterprise Edition plans to access this package.

## Usage

1. Add `TourProvider` to your customized layout.

```tsx
// index.tsx
import { TourProvider } from '@react-admin/ra-tour';

import SongList from './SongList';

const MyLayout: FC = props => (
    <TourProvider>
        <Layout {...props} />
    </TourProvider>
);

export const MyAdmin: FC = () => (
    <Admin dataProvider={dataProvider} layout={MyLayout}>
        <Resource name="songs" list={SongList} />
    </Admin>
);
```

2. Create a new tour.

```tsx
// tours/songsList.ts
import { TourType } from '@react-admin/ra-tour';

const songsListTour = {
    steps: [
        // first step selects the first line of the songs list
        {
            // which element does the step popup point at?
            target: `[data-tour-id='song-list-line'] a:nth-child(1)`,
            // content of the step popup
            content: 'This is a song',
        },
        // then the 7th line
        {
            target: `[data-tour-id='song-list-line'] a:nth-child(7)`,
            content:
                'This is another song, it should  be lower on the page',
        },
    ],
} as TourType;

export default songsListTour;
```

*see [`TourType`](#TourType) for full reference*

3. Add the tour

```tsx
// index.tsx
import { TourProvider } from '@react-admin/ra-tour';

import SongList from './SongList';

import songsListTour from './tours/songsList';

const MyLayout: FC = props => (
    <TourProvider tours={{
        "songs-list": songsListTour,
    }}>
        <Layout {...props} />
    </TourProvider>
);

export const MyAdmin: FC = () => (
    <Admin dataProvider={dataProvider} layout={MyLayout}>
        <Resource name="songs" list={SongList} />
    </Admin>
);
```

4. Add a button to start the tour, for instance on list actions toolbar

```tsx
// SongList.tsx
import { useTour } from '@react-admin/ra-tour';

const ListActions: FC = props => {
    const [{ running }, { start }] = useTour();
    return (
        <TopToolbar {...sanitizeListRestProps(props)}>
            <Button
                onClick={(): void => start('songs-list')}
                disabled={running} // can't click on the button when tour is running
            >
                <ContactSupportIcon />
            </Button>
        </TopToolbar>
    );
};
const SongList: FC = props => (
    <List {...props} actions={<ListActions />}>
        <SimpleList
            data-tour-id="song-list-line"
            primaryText={(record: any): string => record.title}
        />
    </List>
);
```

When the user click on the button, the tour starts.

## Advanced Usage : Controlling React-Admin

In case you need more control over what happens for each step, you can use the `before` and `after` functions in a tour configuration:

```tsx
// tours.tsx
import { TourType } from '@react-admin/ra-tour';

const tours: { [id: string]: TourType } = {
    'songs-list': {
        before: (): void => {
            // executed before tour starts
        },
        steps: [
            {
                before: (): void => {
                    // executed before step starts
                },
                target: `[data-tour-id='song-list-line'] a:nth-child(1)`,
                event: 'hover',
                content: 'This is a song',
                after: (): void => {
                    // executed after step ends
                },
            },
            {
                target: `[data-tour-id='song-list-line'] a:nth-child(7)`,
                content:
                    'This is another song, it should  be lower on the page',
            },
        ],
        after: (): void => {
            // executed after tour ends
        },
    },
};

export default tours;
```

And in order to control react-admin within those before and after functions, you can inject callbacks in the `tools` prop of the `<TourProvider>` component. For instance, to use the react-admin notification and redirection hooks, do the following:

```tsx
// index.tsx
import { TourProvider } from '@react-admin/ra-tour';

import SongList from './SongList';
import tours from './tours';

const MyLayout: FC = props => {
    const notify = useNotify();
    const redirect = useRedirect();
    return (
        <TourProvider tours={tours} tools={{ notify, redirect }}>
            <Layout {...props} />
        </TourProvider>
    );
};
export const MyAdmin: FC = () => (
    <Admin dataProvider={dataProvider} layout={MyLayout}>
        <Resource name="songs" list={SongList} />
    </Admin>
);
```

`ra-tour` injects the tools as arguments when it calls the `before` and `after` functions:

```tsx
// tours.tsx
import { TourType } from '@react-admin/ra-tour';

const tours: { [id: string]: TourType } = {
    'songs-list': {
        before: ({ notify, redirect }): void => {
            notify("Tour starting");
            redirect("/songs");
        },
// ...
```

## Advanced Usage: Accessing The Tour State

In some scenarii, you might want to access the tour state - for instance, if you want your tour to survive a reload.

1. Add a saving mechanism as a `tool` (here, `ra-preferences`):

```tsx
// index.tsx
import { TourProvider } from '@react-admin/ra-tour';
import { usePreferences } from '@react-admin/ra-preferences';

import SongList from './SongList';
import tours from './tours';

const MyLayout: FC = props => {
    const [tourState, setTourState] = usePreferences('tour', null);
    return (
        <TourProvider
            tours={tours}
            tools={{ setTourState }}
            // initialize the tour with what's in local storage
            initialState={tourState}
        >
            <Layout {...props} />
        </TourProvider>
    );
};
export const MyAdmin: FC = () => (
    <Admin dataProvider={dataProvider} layout={MyLayout}>
        <Resource name="songs" list={SongList} />
    </Admin>
);
```

2. Save or reset the state in `before` and `after` functions

```tsx
// tours.tsx
//...
            {
                // The tour state is injected together with tools in before and after functions:
                before: ({ setTourState, state }) => {
                    setTourState(state);
                },
                target: 'body',
                content: 'This persists a reload',
                after: ({ setTourState }) => {
                    setTourState({});
                },
            },
//...
```

## Advanced Usage: Custom Steps

The `content` key on the step can take any react component, for instance:

```tsx
// tours.tsx
//...
            {
                before: ({ setTourPreferences, state }) => {
                    setTourPreferences(state);
                },
                target: 'body',
                content: (
                    <div>
                        This step persists a reload,
                        <button
                            onClick={(): void => {
                                window.location.reload();
                            }}
                        >
                            try it!
                        </button>
                    </div>
                ),
                after: ({ setTourPreferences }) => {
                    setTourPreferences({});
                },
            },
//...
```

## Advanced Usage: Full Customization

Under the hood, `ra-tour` uses [`react-joyride`](https://github.com/gilbarbara/react-joyride).

You can override joyride props either at a global level:

```tsx
//...
import { MyTooltip } from './MyTooltip';

const MyLayout: FC = props => (
    <TourProvider
        tours={tours}
        joyrideProps={{
            tooltipComponent: MyTooltip
        }}
    >
        <Layout {...props} />
    </TourProvider>
);

//...
```

Or at the step level. For instance if you want to style the red beacon:

```tsx
// ...
    steps: [
      {
        target: `[data-tour-id='grid-line']:nth-child(3)`,
        event: "hover",
        content:
          "This is a poster, one of the products our shop is selling, let's go to its details",
        joyrideProps: {
          styles: {
            beacon: {
              marginTop: -100,
            },
          },
        },
//...
```

[List of all available joyride props.](https://docs.react-joyride.com/props)

## API

### TourType

```ts
type TourType = {
    /**
     * Function called before the tour starts.
     * @param tools: The tools passed to the TourProvider.
     * @see TourProvider
     * @returns May return a Promise.
     */
    before?: (tools?: any) => void | Promise<void>;
    /**
     * The tour steps.
     * @see StepType
     */
    steps: StepType[];
    /**
     * Function called after the tour ends.
     * @param tools: The tools passed to the TourProvider.
     * @see TourProvider
     * @returns May return a Promise.
     */
    after?: (tools?: any) => void | Promise<void>;
};
```

### StepType

```ts
type StepType = {
    /**
     * Function called before the step starts.
     * @param tools: The tools passed to the TourProvider.
     * @see TourProvider
     * @returns May return a Promise.
     */
    before?: (tools?: any) => void | Promise<void>;
    /**
     * A string containing a CSS selector which will be used to get the node to highlight.
     */
    target: string;
    /**
     * A boolean indicating whether the beacon should be disabled.
     */
    disableBeacon?: boolean;
    /**
     * The name of the event which will activate the tooltip from the Joyride beacon. It has no effect if `disableBeacon` is set to `false`.
     */
    event?: 'hover' | 'click';
    /**
     * The content of the Tooltip header. Accepts a React node.
     */
    title?: ReactNode;
    /**
     * The content of the Tooltip. Accepts a React node.
     */
    content: ReactNode;
    /**
     * The Joyride options which extend and may override the Joyride options set on TourProvider.
     */
    joyrideProps?: any;
    /**
     * Function called after the step ends.
     * @param tools: The tools passed to the TourProvider.
     * @see TourProvider
     * @returns May return a Promise.
     */
    after?: (tools?: any) => void | Promise<void>;
};
```
