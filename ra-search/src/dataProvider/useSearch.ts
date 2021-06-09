import { useCallback } from 'react';
import { useDataProvider, useSafeSetState } from 'react-admin';
import {
    SearchDataProvider,
    SearchRequestOptions,
    SearchResultDataItem,
} from '../types';

/**
 * Get a callback to fetch global search results from the data provider using its `search` method.
 *
 * The request starts when the callback is called.
 *
 * useSearch() parameters can be passed:
 *
 * - at definition time
 *
 *       const [search] = useSearch({ targets: ['artists', 'albums'] });
 *       search(query);
 *
 * - at call time
 *
 *       const [search] = useSearch();
 *       search(query, { targets: ['artists', 'albums'] });
 *
 * - both, in which case the definition and call time parameters are merged
 *
 *       const [search] = useSearch({ targets: ['artists', 'albums'] });
 *       search(query, { targets: ['concerts'] });
 *
 * @param {Object} options
 *   - {String[]} targets: Optional. The indices for which the search should be performed.
 *   - {number} historySize: Optional. The number of items to keep in the search history.
 *
 * @returns A tuple with the search callback and the request state. Destructure as [search, { query, data, total, error, loading, loaded }].
 *
 * The return value updates according to the request state:
 *
 * - mount:         [search, { loading: false, loaded: false }]
 * - search called: [search, { loading: true, loaded: false }]
 * - success:       [search, { query: [stringd], ata: [data from response], total: [total from response], loading: false, loaded: true }]
 * - error:         [search, { query: [stringd], error: [error from response], loading: false, loaded: true }]
 *
 * The search function accepts the following arguments:
 * - {String} query: The terms to search for
 * - {Object} options
 *   - {String[]} targets: Optional. The indices for which the search should be performed.
 *   - {number}  historySize: Optional. The number of items to keep in the search history.
 */

const updateHistory = (
    history: string[],
    newQuery: string,
    total: number,
    historySize = 5
) => {
    // Only add new valid searchs to history
    if (!total || !newQuery || history.includes(newQuery)) {
        return history;
    }
    const newHistory = [newQuery, ...history];
    newHistory.splice(
        historySize,
        newHistory.length > historySize ? newHistory.length - historySize : 0
    );
    return newHistory;
};

export const useSearch = (
    defaultOptions?: SearchRequestOptions
): UseSearchValue => {
    const [state, setState] = useSafeSetState<UseSearchData>(initialState);

    const dataProvider = useDataProvider() as SearchDataProvider;

    const doSearch: UseSearchCallback = (query, options = {}): void => {
        setState(prevState => ({ ...prevState, loading: true }));

        dataProvider
            .search(query, {
                ...defaultOptions,
                ...options,
            })
            .then(({ data, total }) => {
                setState(prev => ({
                    ...prev,
                    query,
                    data,
                    total,
                    loading: false,
                    history: updateHistory(
                        prev.history,
                        query,
                        total,
                        options && options.historySize
                            ? options.historySize
                            : (defaultOptions || {}).historySize
                    ),
                    loaded: true,
                }));
            })
            .catch(error => {
                setState(prev => ({
                    ...prev,
                    query,
                    error,
                    loading: false,
                }));
            });
    };

    const searchDependency = [
        (defaultOptions || {}).toString(),
        dataProvider,
        setState,
    ];

    const search: UseSearchCallback = useCallback((query, options) => {
        if (!query) {
            setState(prev => ({
                ...initialState,
                loading: false,
                loaded: true,
                history: prev.history,
            }));
            return;
        }
        doSearch(query, options);
    }, searchDependency); // eslint-disable-line react-hooks/exhaustive-deps

    return [search, state];
};

const initialState = {
    data: undefined,
    error: null,
    total: null,
    loading: true,
    loaded: false,
    history: [],
    query: '',
};

export interface QueryOptions {
    action?: string;
    onSuccess?: (response: any) => any;
    onFailure?: (error?: any) => any;
    withDeclarativeSideEffectsSupport?: boolean;
}

export type UseSearchData = {
    data?: SearchResultDataItem[];
    total?: number;
    error?: any;
    loading: boolean;
    loaded: boolean;
    history: string[];
    query: string;
};

export type UseSearchCallback = (
    query: string,
    options?: SearchRequestOptions
) => void;

export type UseSearchValue = [UseSearchCallback, UseSearchData];
