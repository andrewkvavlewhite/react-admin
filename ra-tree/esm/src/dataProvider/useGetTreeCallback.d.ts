import { QueryOptions } from 'react-admin';
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
declare const useGetTreeCallback: (resource: string) => UseGetTreeCallbackHookValue;
export declare type UseGetTreeCallbackHookValue = (options?: Partial<QueryOptions>) => Promise<void>;
export default useGetTreeCallback;
