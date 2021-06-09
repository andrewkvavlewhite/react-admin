# ra-search

Plug your search engine and let users search across all resources via a smart Omnibox.

![ra-search in Enterprise demo](./assets/ra-search-demo.gif)

In large admins, users need several clicks to get to one record. For repetitive tasks, this ends up costing minutes every day. The ra-seach omnibox simplifies navigation by providing a global, always on search engine for records. 

Ra-search can take advantage of a search index like ElasticSearch if you have one, or it can rely on your REST API by searching across multiple resources in parallel.

## Installation

```sh
npm install --save @react-admin/ra-search
# or
yarn add @react-admin/ra-search
```

**Tip**: `ra-search` is part of the [React-Admin Enterprise Edition](https://marmelab.com/ra-enterprise/), and hosted in a private npm registry. You need to subscribe to one of the Enterprise Edition plans to access this package.

## Configuring the `dataProvider`

### `dataProvider.search()`

`ra-search` passes search queries to the dataProvider, which must contain a custom `search` method with the following signature:

```ts
type search = (query: string, options?: SearchOptions) => Promise<{ data: SearchResult[], total: number }>

interface SearchOptions {
    targets?: string[];
    historySize?: number;
    [key: string]: any;
}

interface SearchResult {
    id: Identifier;
    type: string;
    url: string;
    content: any;
    matches?: any;
}
```

Here is an example of the expected syntax for `dataProvider.search()`:

```jsx
dataProvider.search('roll').then(response => console.log(response));
// {
//     data: [
//         { id: 'a7535', type: 'artist', url: '/artists/7535', content: { label: 'The Rolling Stones', description: 'English rock band formed in London in 1962'  } }
//         { id: 'a5352', type: 'artist', url: '/artists/5352', content: { label: 'Sonny Rollins', description: 'American jazz tenor saxophonist'  } }
//         { id: 't7524', type: 'track', url: '/tracks/7524', content: { label: 'Like a Rolling Stone', year: 1965, recordCompany: 'Columbia', artistId: 345, albumId: 435456 } }
//         { id: 't2386', type: 'track', url: '/tracks/2386', content: { label: "It's Only Rock 'N Roll (But I Like It)", year: 1974, artistId: 7535, albumId: 6325 } }
//         { id: 'a6325', type: 'album', url: '/albums/6325', content: { label: "It's Only rock 'N Roll", year: 1974, artistId: 7535 }}
//     ],
//     total: 5
// }
```

It is your responsibility to add this `search` method to your `dataProvider` so that react-admin can send queries to and read responses from the search engine. 

The `dataProvider.search()` method should return a Promise for data containing an array of `SearchResult` objects. A `SearchResult` contains at least the following fields:

- `id`: `Identifier` The unique identifier of the search result
- `type`: `string` An arbitrary string which enables grouping
- `url`: `string` The url where to redirect to on click. It could be a custom page and not a resource if you want to
- `content`: `any` Can contains any data that will be used to display the result. If used with default `<SearchResultItem>` component, it must contain at least an `id`, `label` and a `description`.
- `matches`: `any` An optional object containing an extract of the data with matches. Can be anything that will be interpreted by a `<SearchResultItem>`

As for the `total`, it can be grater than the number of returned results. This is useful e.g. to show that there are more results.

### `addSearchMethod` Helper

If you don't have a full-text search endpoint in your API, you can use the simple `addSearchMethod` helper function. It adds the `search()` method to an existing `dataProvider`, reyling on the `dataProvider.getList()` method on the configured resources. 

```js
import simpleRestProvider from 'ra-data-simple-rest';
import { addSearchMethod } from '@react-admin/ra-search';

const dataProvider = simpleRestProvider('http://path.to.my.api/');

const dataProviderWithSearch = addSearchMethod(dataProvider, ['artists', 'tracks', 'albums']);
```

Now calling `dataProvider.search('roll')` will issue the following queries in parallel:

- `dataProvider.getList('artists', { filter: { q: "roll" }})`
- `dataProvider.getList('tracks', { filter: { q: "roll" }})`
- `dataProvider.getList('albumns', { filter: { q: "roll" }})`

Then aggregate the results and return them in a single response. 

So the `search()` method created by this helper calls the regular `dataProvider` several times, once for each resource. We don't recommend using it in production - instead, you should modify your API to support the search method, e.g. by using a search engine, and implement your own `dataProvider.search()` method to convert the results to the format expected by `ra-search`.

The second argument to `addSearchMethod` is the builder configuraiton. It can be either an array of resources names or a map of the resources specifying how to format their records for search results.

When called with an array of resources, `addSearchMethod` populates the search results `content` based on the records returned by `dataProvider.getList()`, with the following inference rules:

- `id`: Returns the record `id`
- `label`: Returns the record `label` or `name` or `title`
- `description`: Returns the record `description` or `body`

Example with an array of resources:

```js
const dataProviderWithSearch = addSearchMethod(dataProvider, ['artists', 'albums']);
```

When called with a map, each key being a resource name, the value can have the following properties:

- `label`: Either the field name to use as the label or a function which will be called with a record and must return a string. Defaults to the inference described above.
- `description`: Either the field name to use as the description or a function which will be called with a record and must return a string. Defaults to the inference described above.

Example with a map of resources:

```js
const dataProviderWithSearch = addSearchMethod(dataProvider, {
    artists: {
        label: 'full_name',
        description: record => `${record.born_at}-${record.died_at} ${record.biography}`,
    },
    albums: {
        // no label specified, fallback on inference
        description: record => `${record.released_at.getFullYear()} by ${record.recordCompany}`,
    },
});
```

## The `<Search>` Component

The `<Search>` component includes an input and displays the search results inside a Material-UI [`PopOver`](https://material-ui.com/components/popover/). 

![The `<Search>` component](./assets/ra-search-overview.gif)

By default, it will group the search results by target, and show their `content.label` and `content.description`.

It needs custom translations, so you need to import them in your <Admin> component.

Here's how to include it inside a custom `<AppBar>` component:

```jsx
import { Admin, AppBar, Layout, Resource, mergeTranslations } from 'react-admin';
import { Typography, makeStyles } from '@material-ui/core';
import { Search, raSearchEnglishMessages, raSearchFrenchMessages } from '@react-admin/ra-search';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import frenchMessages from 'ra-language-french';

const i18nProvider = polyglotI18nProvider(locale => {
    if (locale === 'fr') {
        return mergeTranslations(frenchMessages, raSearchFrenchMessages);
    }
    // Always fallback on english
    return mergeTranslations(englishMessages, raSearchEnglishMessages);
}, 'en');

const MyAppbar = (props) => {
    const classes = useStyles();

    return (
        <AppBar {...props}>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            <Search />
        </AppBar>
    );
};

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
});

const MyLayout = (props) => (
    <Layout {...props} appBar={MyAppbar} />
);

export const App = () => (
    <Admin 
        dataProvider={searchDataProvider}
        i18nProvider={i18nProvider}
        layout={MyLayout}>
        {...}
    </Admin>
);
```

The `<Search>` component accepts the following props:

- `options`: `object` An object containing options to apply to the search :
    - `targets`: `string[]` An array of the indices on which to perform the search. Defaults to an empty array.
    - `historySize`: `number` The max number of search texts kept in the history. Default is 5.
    - `{any}`: `{any}` Any custom option to pass to the search engine.
- `wait`: `number` The delay of debounce for the search to launch after typing in ms. Default is 500ms.

- `children`: A component which will display the results inside the `<Popover>`. Defaults to `<SearchResultsPanel>`.
- `color`: The color mode for the input, applying light or dark backgrounds. Accept either `light` or `dark`. Defaults to `light`.

### Customizing The Result Items

By default, `<Search>` displays the results in `<SearchResultsPanel>`, which displays each result in a `<SearchResultItem>`. So rendering `<Search />` without children is equivalent to rendering:

```jsx
const MySearch = () => (
    <Search>
        <SearchResultsPanel>
            <SearchResultItem/>
        </SearchResultsPanel>
    </Search>
);
```

`<SearchResultItem>` renders the `content.label` and `content.description` for each result. You can customize what it renders by providing a function as the `label` and a the `description` props. This function takes the search result as parameter and must return a React element. 

For instance:

```jsx
import { Search, SearchResultsPanel, SearchResultItem } from '@react-admin/ra-search';

const MySearch = () => (
    <Search>
        <SearchResultsPanel>
            <SearchResultItem 
                label={(record) => (
                    <>
                        {record.type === 'artists' ? (
                            <PersonIcon />
                        ) : (
                            <MusicIcon />
                        )}
                        <span>{record.content.label}</span>
                    </>
                )}
            />
        </SearchResultsPanel>
    </Search>
);
```

You can also completely replace the search result item component:

```jsx
import { Search, SearchResultsPanel } from '@react-admin/ra-search';

const MySearchResultItem = ({ data, onClose }) => (
    <li key={data.id}>
        <Link to={data.url} onClick={onClose}>
            <strong>{data.content.label}</strong>
        </Link>
        <p>{data.content.description}</p>
    </li>
);

const MySearch = () => (
    <Search>
        <SearchResultsPanel>
            <MySearchResultItem />
        </SearchResultsPanel>
    </Search>
);
```

### Customizing the Entire Search Results

Pass a custom React element as child of `<Search>` to customize the appearance of the search results. This can be useful e.g. to customize the results grouping, or to arrange search results in a different way.

`ra-search` renders the `<Search>` inside a `SearchContext`. You use the `useSearchResultContext` hook to read the search results, as follows:

```jsx
import { Search, useSearchResultContext } from '@react-admin/ra-search';

const MySearch = (props) => (
    <Search>
        <CustomSearchResultsPanel />
    </Search>
);

const CustomSearchResultsPanel = () => {
    const { data, onClose } = useSearchResultContext();

    return (
        <ul>
            {data.map(searchResult => (
                <li key={searchResult.id}>
                    <Link to={searchResult.url} onClick={onClose}>
                        <strong>{searchResult.content.label}</strong>
                    </Link>
                    <p>{searchResult.content.description}</p>
                </li>
            ))}
        </ul>
    );
};
```

## The `useSearch` Hook

Just like `useMutation`, `useSearch` returns a function allowing to call the `dataProvider.search()`, as well as a state object for the response. Use it to create your own `Search` component.

```jsx
import { useState } from 'React';
import { TextField } from '@material-ui/core';
import { useSearch, SearchResultContextProvider, SearchResultsPanel } from '@react-admin/ra-search';

const Search = () => {
    const [query, setQuery] = useState();
    const [search, searchResultState] = useSearch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setQuery(event.target.value);
        search(event.target.value);
    };

    return (
        <>
            <TextField value={query} onChange={handleChange} />
            <SearchResultContextProvider value={searchResultState}>
                <SearchResultsPanel />
            </SearchResultContextProvider>
        </>
    );
};
```

## Navigate in search result with arrow keys

Thanks to the `useArrowKeysToNavigate` hook, you can navigate in search results with arrow key. If you want to reimplement it, you have to pass the list ref to the hook and each results must have a button role:

```jsx
import { List, ListItem } from '@material-ui/core';

const SearchResults = () => {
    const listRef = React.useRef<HTMLUListElement>(null);
    useArrowKeysToNavigate(listRef);

    <List innerRef={listRef}>
        {data.map(resultData => {
            return <ListItem button data={resultData} key={resultData.id} />
        })}
    </List>
}
```
