import { UseMutationValue } from 'react-admin';
/**
 * Get a callback to call the dataProvider.addChildNode() method
 *
 * @param {string} resource the resource name, e.g. 'posts'
 *
 * @example // usage
 *
 * import { useNotify } from 'react-admin';
 * import { useAddChildNode } from '@react-admin/ra-tree';
 *
 * const MyComponent = () => {
 *     const [addChildNode, { loading, data, error }] = useAddChildNode(resource);
 *     const notify = useNotify();
 *     const handleClick = () => {
 *         addChildNode(
 *             { payload: { parentId: 123, data: { name: 'new node' } } },
 *             { onSuccess: () => notify('Success') }
 *         );
 *     };
 *
 *     return (
 *         <button onClick={handleClick}>
 *             Add Child Node For Node 123
 *         </button>
 *     );
 * }
 */
declare const useAddChildNode: (resource: string) => UseMutationValue;
export default useAddChildNode;
