var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { useCallback } from 'react';
import { useDataProvider, useSafeSetState } from 'react-admin';
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
var updateHistory = function (history, newQuery, total, historySize) {
    if (historySize === void 0) { historySize = 5; }
    // Only add new valid searchs to history
    if (!total || !newQuery || history.includes(newQuery)) {
        return history;
    }
    var newHistory = __spreadArrays([newQuery], history);
    newHistory.splice(historySize, newHistory.length > historySize ? newHistory.length - historySize : 0);
    return newHistory;
};
export var useSearch = function (defaultOptions) {
    var _a = useSafeSetState(initialState), state = _a[0], setState = _a[1];
    var dataProvider = useDataProvider();
    var doSearch = function (query, options) {
        if (options === void 0) { options = {}; }
        setState(function (prevState) { return (__assign(__assign({}, prevState), { loading: true })); });
        dataProvider
            .search(query, __assign(__assign({}, defaultOptions), options))
            .then(function (_a) {
            var data = _a.data, total = _a.total;
            setState(function (prev) { return (__assign(__assign({}, prev), { query: query,
                data: data,
                total: total, loading: false, history: updateHistory(prev.history, query, total, options && options.historySize
                    ? options.historySize
                    : (defaultOptions || {}).historySize), loaded: true })); });
        })
            .catch(function (error) {
            setState(function (prev) { return (__assign(__assign({}, prev), { query: query,
                error: error, loading: false })); });
        });
    };
    var searchDependency = [
        (defaultOptions || {}).toString(),
        dataProvider,
        setState,
    ];
    var search = useCallback(function (query, options) {
        if (!query) {
            setState(function (prev) { return (__assign(__assign({}, initialState), { loading: false, loaded: true, history: prev.history })); });
            return;
        }
        doSearch(query, options);
    }, searchDependency); // eslint-disable-line react-hooks/exhaustive-deps
    return [search, state];
};
var initialState = {
    data: undefined,
    error: null,
    total: null,
    loading: true,
    loaded: false,
    history: [],
    query: '',
};
