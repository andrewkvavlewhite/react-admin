import { TreeRecord } from '../types';
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
declare const useGetRootNodes: (resource: string, options?: any) => UseGetRootNodesHookValue;
export declare type UseGetRootNodesHookValue = {
    data?: TreeRecord[];
    loading: boolean;
    loaded: boolean;
    error?: any;
};
export default useGetRootNodes;
