import {
    useQueryWithStore,
    ReduxState,
    GET_MANY,
    FETCH_END,
} from 'react-admin';
import { useDispatch } from 'react-redux';

import { TreeReduxState, TreeRecord } from '../types';
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
const useGetRootNodes = (
    resource: string,
    options: any = {}
): UseGetRootNodesHookValue => {
    const dispatch = useDispatch();
    return useQueryWithStore(
        {
            type: 'getRootNodes',
            resource,
            payload: {},
        },
        {
            ...options,
            action: CRUD_GET_ROOT_NODES,
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
        (state: ReduxState & TreeReduxState) => {
            if (!options.enabled) return null;
            if (!state.tree[resource]) return null;
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
            return nodes;
        }
    );
};

export type UseGetRootNodesHookValue = {
    data?: TreeRecord[];
    loading: boolean;
    loaded: boolean;
    error?: any;
};

export default useGetRootNodes;
