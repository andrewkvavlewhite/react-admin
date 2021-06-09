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
import { useQueryWithStore, GET_MANY, FETCH_END, } from 'react-admin';
import { useDispatch } from 'react-redux';
import { CRUD_GET_ROOT_NODES, POPULATE_RECORDS_FROM_NODES } from '../actions';
import { UNSAVED_NEW_NODE } from '../constants';
/**
 * Call the dataProvider.getRootNodes() method and return the resolved value
 * as well as the loading state.
 *
 * The return value updates according to the request state:
 *
 * - start: { loading: true, loaded: false }
 * - success: { data: [data from response], loading: false, loaded: true }
 * - error: { error: [error from response], loading: false, loaded: true }
 *
 * This hook will return the cached result when called a second time
 * with the same parameters, until the response arrives.
 *
 * @param resource The resource name, e.g. 'posts'
 * @param options Options object to pass to the dataProvider. May include side effects to be executed upon success of failure, e.g. { onSuccess: { refresh: true } }
 *
 * @returns The current request state. Destructure as { data, error, loading, loaded }.
 *
 * @example // usage
 *
 * import { useGetRootNodes } from '@react-admin/ra-tree';
 *
 * const Categories = () => {
 *     const { data: tree, loading, error } = useGetRootNodes('categories');
 *     if (loading) { return <Loading />; }
 *     if (error) { return <p>ERROR</p>; }
 *     return <Tree tree={data} />;
 * };
 */
var useGetRootNodes = function (resource, options) {
    if (options === void 0) { options = {}; }
    var dispatch = useDispatch();
    return useQueryWithStore({
        type: 'getRootNodes',
        resource: resource,
        payload: {},
    }, __assign(__assign({}, options), { action: CRUD_GET_ROOT_NODES, onSuccess: function (res) {
            dispatch({
                type: POPULATE_RECORDS_FROM_NODES,
                payload: { data: res.data },
                meta: {
                    resource: resource,
                    fetchResponse: GET_MANY,
                    fetchStatus: FETCH_END,
                },
            });
            options.onSuccess && options.onSuccess(res);
        } }), function (state) {
        if (!options.enabled)
            return null;
        if (!state.tree[resource])
            return null;
        var tree = state.tree[resource].nodes;
        var data = state.admin.resources[resource].data;
        var nodes = Object.keys(tree)
            .filter(function (id) { return id === UNSAVED_NEW_NODE || data[id]; })
            .map(function (id) { return (__assign(__assign({}, (id === UNSAVED_NEW_NODE
            ? { id: UNSAVED_NEW_NODE }
            : data[id])), { children: tree[id] })); });
        return nodes;
    });
};
export default useGetRootNodes;
