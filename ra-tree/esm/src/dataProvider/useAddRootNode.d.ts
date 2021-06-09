import { UseMutationValue } from 'react-admin';
/**
 * Get a callback to call the dataProvider.addRootNode() method
 *
 * @param {string} resource the resource name, e.g. 'posts'
 *
 * @example // usage
 *
 * import { useNotify } from 'react-admin';
 * import { useAddRootNode } from '@react-admin/ra-tree';
 *
 * const MyComponent = () => {
 *     const [addRootNode, { loading, data, error }] = useAddRootNode(resource);
 *     const notify = useNotify();
 *     const handleClick = () => {
 *         addRootNode(
 *             { payload: { data: { name: 'new node' } } },
 *             { onSuccess: () => notify('Success') }
 *         );
 *     };
 *
 *     return (
 *         <button onClick={handleClick}>
 *             Add Root Node
 *         </button>
 *     );
 * }
 */
declare const useAddRootNode: (resource: string) => UseMutationValue;
export default useAddRootNode;
