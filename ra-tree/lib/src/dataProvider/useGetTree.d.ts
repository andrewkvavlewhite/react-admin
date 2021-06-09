import { TreeRecord } from '../types';
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
declare const useGetTree: (resource: string, options?: any) => UseGetTreeHookValue;
export declare type UseGetTreeHookValue = {
    data?: TreeRecord[];
    loading: boolean;
    loaded: boolean;
    error?: any;
};
export default useGetTree;
