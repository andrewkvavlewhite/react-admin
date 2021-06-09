import { useMutation } from 'react-admin';
import { CRUD_ADD_ROOT_NODE } from '../actions';
import { ADD_ROOT_NODE } from '../fetchTypes';
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
var useAddRootNode = function (resource) {
    return useMutation({
        type: ADD_ROOT_NODE,
        resource: resource,
        payload: {},
    }, { action: CRUD_ADD_ROOT_NODE });
};
export default useAddRootNode;
