import {
    useQueryWithStore,
    GET_MANY,
    FETCH_END,
    ReduxState,
} from 'react-admin';

import { useDispatch } from 'react-redux';

import { CRUD_GET_TREE, POPULATE_RECORDS_FROM_NODES } from '../actions';
import { TreeReduxState, TreeRecord } from '../types';
import { UNSAVED_NEW_NODE } from '../constants';

/**
 * Call the dataProvider.getTree() method and return the resolved value
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
 * The data structure is a flat array of TreeRecords (i.e. Records with a children field containing an array of Identifiers).
 *
 * @example // sample { data }
 * [
 *   { id: 1, title: 'foo1', children: [3, 4] },
 *   { id: 2, title: 'foo2', children: [] },
 *   { id: 3, title: 'foo3', children: [5] },
 *   { id: 4, title: 'foo4', children: [] },
 *   { id: 5, title: 'foo5', children: [] },
 * ]
 *
 * @example // usage in a React component
 *
 * import { useGetTree } from '@react-admin/ra-tree';
 *
 * const Categories = () => {
 *     const { data: tree, loading, error } = useGetTree('categories');
 *     if (loading) { return <Loading />; }
 *     if (error) { return <p>ERROR</p>; }
 *     return <Tree tree={data} />;
 * };
 */
const useGetTree = (
    resource: string,
    options: any = {}
): UseGetTreeHookValue => {
    const dispatch = useDispatch();
    return useQueryWithStore(
        {
            type: 'getTree',
            resource,
            payload: {},
        },
        {
            ...options,
            action: CRUD_GET_TREE,
            onSuccess: res => {
                dispatch({
                    type: POPULATE_RECORDS_FROM_NODES,
                    payload: { data: res.data },
                    meta: {
                        resource,
                        fetchResponse: GET_MANY,
                        fetchStatus: FETCH_END,
                    },
                });
                options.onSuccess && options.onSuccess(res);
            },
        },
        (state: ReduxState & TreeReduxState): TreeRecord[] => {
            if (!options.enabled) return null;
            if (!state.tree[resource] || !state.tree[resource].nodes) {
                // not loaded yet
                return undefined;
            }
            const tree = state.tree[resource].nodes;
            const data = state.admin.resources[resource].data;
            const nodes = Object.keys(tree)
                .filter(id => id === UNSAVED_NEW_NODE || data[id])
                .map(id => ({
                    ...(id === UNSAVED_NEW_NODE
                        ? { id: UNSAVED_NEW_NODE }
                        : data[id]),
                    children: tree[id],
                }));
            // do not return empty array before the POPULATE_RECORDS_FROM_NODES action is reduced
            if (nodes.length !== Object.keys(tree).length) return undefined;
            return nodes;
        }
    );
};

export type UseGetTreeHookValue = {
    data?: TreeRecord[];
    loading: boolean;
    loaded: boolean;
    error?: any;
};

export default useGetTree;
