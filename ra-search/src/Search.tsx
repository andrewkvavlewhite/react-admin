import * as React from 'react';
import {
    ChangeEvent,
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { PopoverOrigin, Popover } from '@material-ui/core';
import debounce from 'lodash/debounce';

import { useSearch } from './dataProvider';
import { SearchInput } from './SearchInput';
import {
    SearchInputColor,
    SearchPanelProps,
    SearchRequestOptions,
} from './types';
import { SearchResultsPanel } from './SearchResultsPanel';
import { SearchResultContextProvider } from './SearchResultContext';
import { SearchHistoryPanel } from './SearchHistoryPanel';

/**
 * A component which displays an input, calls the dataProvider `search` method
 * when the input changes and shows the search results inside a Material UI
 * [`<PopOver>`](https://material-ui.com/components/popover/).
 *
 * By default, it will group the search result items by resource and show their
 * `content.label` and `content.description`.
 *
 * @param props {SearchProps}
 * @param props.children {ReactElement} A React Element which will be rendered inside the Material UI `<Popover>`
 * @param {'light' | 'dark'} props.color The color mode for the search input, applying light or dark backgrounds
 *
 * @example <caption>Here's how to include it inside a custom `<AppBar>` component</caption>
 * import { Admin, AppBar, Layout, Resource } from 'react-admin';
 * import { Typography, makeStyles } from '@material-ui/core';
 * import { Search } from '@react-admin/ra-search';
 *
 * const MyAppbar = (props) => {
 *     const classes = useStyles();
 *
 *     return (
 *         <AppBar {...props}>
 *             <Typography
 *                 variant="h6"
 *                 color="inherit"
 *                 className={classes.title}
 *                 id="react-admin-title"
 *             />
 *             <Search />
 *         </AppBar>
 *     );
 * };
 *
 * const useStyles = makeStyles({
 *     title: {
 *         flex: 1,
 *         textOverflow: 'ellipsis',
 *         whiteSpace: 'nowrap',
 *         overflow: 'hidden',
 *     },
 * });
 *
 * const MyLayout = (props) => (
 *     <Layout {...props} appBar={MyAppbar} />
 * );
 *
 * export const App = () => (
 *     <Admin dataProvider={searchDataProvider} layout={MyLayout}>
 *         {...}
 *     </Admin>
 * );
 *
 * @example <caption>Customizing the <Popover> Content</caption>
 * import { Admin, AppBar, Layout, Resource } from 'react-admin';
 * import { Typography, makeStyles } from '@material-ui/core';
 * import { Search } from '@react-admin/ra-search';
 *
 * const MySearchResultsPanel = () => {
 *     const { data, onClose } = useSearchResultContext();
 *
 *     return (
 *         <ul>
 *             {data.map(item => (
 *                 <li key={item.id}>
 *                     <Link to={item.url} onClick={onClose}>
 *                         <strong>{item.content.label}</strong>
 *                     </Link>
 *                     <p>{item.content.description}</p>
 *                 </li>
 *             ))}
 *         </ul>
 *     );
 * };
 *
 * const MyAppbar = (props) => {
 *     const classes = useStyles();
 *
 *     return (
 *         <AppBar {...props}>
 *             <Typography
 *                 variant="h6"
 *                 color="inherit"
 *                 className={classes.title}
 *                 id="react-admin-title"
 *             />
 *             <Search>
 *                 <CustomSearchResultsPanel />
 *             </Search>
 *         </AppBar>
 *     );
 * };
 *
 * const useStyles = makeStyles({
 *     title: {
 *         flex: 1,
 *         textOverflow: 'ellipsis',
 *         whiteSpace: 'nowrap',
 *         overflow: 'hidden',
 *     },
 * });
 *
 * const MyLayout = (props) => (
 *     <Layout {...props} appBar={MyAppbar} />
 * );
 *
 * export const App = () => (
 *     <Admin
 *         dataProvider={searchDataProvider}
 *         layout={MyLayout}
 *     >
 *         {...}
 *     </Admin>
 * );
 *
 * @example <caption>Customizing the <SearchResultItem> Component</caption>
 * import { Admin, AppBar, Layout, Resource } from 'react-admin';
 * import { Typography, makeStyles } from '@material-ui/core';
 * import { Search, SearchResultsPanel, SearchResultItem } from '@react-admin/ra-search';
 *
 * const MyAppbar = (props) => {
 *     const classes = useStyles();
 *
 *     return (
 *         <AppBar {...props}>
 *             <Typography
 *                 variant="h6"
 *                 color="inherit"
 *                 className={classes.title}
 *                 id="react-admin-title"
 *             />
 *             <Search>
 *                 <SearchResultsPanel>
 *                     <SearchResultItem
 *                         label={(record) => (
 *                             <>
 *                                 {record.type === 'artists' ? (
 *                                     <PersonIcon />
 *                                 ) : (
 *                                     <MusicIcon />
 *                                 )}
 *                                 <span>{record.content.label}</span>
 *                             </>
 *                         )}
 *                     />
 *                 </SearchResultsPanel>
 *             </Search>
 *         </AppBar>
 *     );
 * };
 *
 * const useStyles = makeStyles({
 *     title: {
 *         flex: 1,
 *         textOverflow: 'ellipsis',
 *         whiteSpace: 'nowrap',
 *         overflow: 'hidden',
 *     },
 * });
 *
 * const MyLayout = (props) => (
 *     <Layout {...props} appBar={MyAppbar} />
 * );
 *
 * export const App = () => (
 *     <Admin dataProvider={dataProvider} layout={MyLayout}>
 *         {...}
 *     </Admin>
 * );
 */
export const Search = (props: SearchProps): ReactElement => {
    const {
        children = <SearchResultsPanel />,
        color = 'light',
        options,
        wait = 500,
    } = props;
    const [query, setQuery] = useState('');
    const [search, state] = useSearch(options);
    const debouncedSearch = useMemo(() => debounce(search, wait), [
        search,
        wait,
    ]);
    const ref = useRef();
    const inputRef = useRef();
    const [open, setOpen] = useState(false);

    const handleClose = (): void => {
        setOpen(false);
    };

    const runSearch = useCallback(
        (query): void => {
            setQuery(query);
            debouncedSearch(query);
        },
        [setQuery, debouncedSearch]
    );

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>): void => {
            const query = event.target
                ? event.target.value
                : ((event as unknown) as string);
            runSearch(query);
        },
        [runSearch]
    );

    const handleFocus = useCallback((): void => {
        if (state.loaded) {
            setOpen(true);
        }
    }, [state.loaded]);

    useEffect(() => {
        setOpen(previousOpen => {
            // If there are no results and no history, close the popover
            if (
                !state.loading &&
                state.loaded &&
                !state.total &&
                !state.history.length
            ) {
                return false;
            }

            // Don't close the popover if it was previously open
            // This is to avoid quick open/close when the search query is changed
            if (previousOpen) {
                return previousOpen;
            }

            return state.loaded || !!state.error;
        });
    }, [state]);

    const contextValue = useMemo(
        () => ({
            ...state,
            onClose: handleClose,
        }),
        [state]
    );

    return (
        <>
            <SearchInput
                color={color}
                ref={ref}
                inputRef={inputRef}
                onChange={handleChange}
                onFocus={handleFocus}
                value={query}
            />
            <Popover
                anchorEl={ref.current}
                anchorReference="anchorEl"
                anchorOrigin={anchorOrigin(!!state.total)}
                transformOrigin={transformOrigin(!!state.total)}
                elevation={4}
                disableAutoFocus
                disableEnforceFocus
                disableRestoreFocus
                disablePortal
                open={open}
                onClose={handleClose}
            >
                {state.loaded || !!state.error ? (
                    state.total ? (
                        <SearchResultContextProvider value={contextValue}>
                            {children}
                        </SearchResultContextProvider>
                    ) : (
                        <SearchHistoryPanel
                            history={state.history}
                            onSelect={runSearch}
                        />
                    )
                ) : null}
            </Popover>
        </>
    );
};

const anchorOrigin = (isResult): PopoverOrigin => ({
    vertical: 'bottom',
    horizontal: isResult ? 'right' : 'left',
});

const transformOrigin = (isResult): PopoverOrigin => ({
    vertical: 'top',
    horizontal: isResult ? 'right' : 'left',
});

export interface SearchProps {
    children?: ReactElement<SearchPanelProps>;
    color?: SearchInputColor;
    options?: SearchRequestOptions;
    wait?: number; // debounce delay in milliseconds
}
