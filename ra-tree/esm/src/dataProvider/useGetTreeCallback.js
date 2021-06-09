import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useDataProvider, GET_MANY, FETCH_END, } from 'react-admin';
import { CRUD_GET_TREE, POPULATE_RECORDS_FROM_NODES } from '../actions';
/**
 * Get a callback to call the dataProvider.getTree() method.
 *
 * Useful for refreshing the tree in an event handler.
 *
 * @param resource The resource name, e.g. 'posts'
 *
 * The data structure is a flat array of TreeRecords (i.e. Records with a children field containing an array of Identifiers).
 *
 * @example // sample return value
 * [
 *   { id: 1, title: 'foo1', children: [3, 4] },
 *   { id: 2, title: 'foo2', children: [] },
 *   { id: 3, title: 'foo3', children: [5] },
 *   { id: 4, title: 'foo4', children: [] },
 *   { id: 5, title: 'foo5', children: [] },
 * ]
 *
 * @example // usage
 *
 * import { useNotify } from 'react-admin';
 * import { useGetTreeCallback } from '@react-admin/ra-tree';
 *
 * const MyComponent = () => {
 *     const refreshTree = useGetTreeCallback(resource);
 *
 *     const handleClick = () => {
 *         refreshTree()
 *             .then(tree => {
 *                 notify(`Reloaded ${tree.length} tree nodes`);
 *             });
 *     };
 *
 *     return <button onClick={handleClick}>Refresh tree</button>;
 * }
 */
var useGetTreeCallback = function (resource) {
    var dispatch = useDispatch();
    var dataProvider = useDataProvider();
    return useCallback(function (options) {
        if (options === void 0) { options = {}; }
        return dataProvider
            .getTree(resource, {}, {
            action: CRUD_GET_TREE,
        })
            .then(function (res) {
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
            return res;
        });
    }, [resource, dataProvider, dispatch]);
};
export default useGetTreeCallback;
