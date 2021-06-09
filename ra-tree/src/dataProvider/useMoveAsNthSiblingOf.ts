import { useMutation, UseMutationValue } from 'react-admin';
import { CRUD_MOVE_AS_NTH_SIBLING_OF } from '../actions';
import { MOVE_AS_NTH_SIBLING_OF } from '../fetchTypes';

/**
 * Get a callback to call the dataProvider.moveAsNthSiblingOf() method
 *
 * @param {string} resource the resource name, e.g. 'posts'
 *
 * @example // usage
 *
 * import { useNotify } from 'react-admin';
 * import { useMoveAsNthSiblingOf } from '@react-admin/ra-tree';
 *
 * const MyComponent = () => {
 *     const [moveAsNthSiblingOf, { loading, data, error }] = useMoveAsNthSiblingOf(resource);
 *     const notify = useNotify();
 *     const handleClick = () => {
 *         moveAsNthSiblingOf(
 *             {
 *                 payload: {
 *                     source:      { id: 12, name: 'hello', children: [34, 76] },
 *                     destination: { id: 67, name: 'world', children: [45, 62, 5] },
 *                     position:    2,
 *                 },
 *             },
 *             { onSuccess: () => notify('Success') }
 *         );
 *     };
 *
 *     return (
 *         <button onClick={handleClick}>
 *             Move node 'hello' as 3rd child of the 'world' parent
 *         </button>
 *     );
 * }
 */
const useMoveAsNthSiblingOf = (resource: string): UseMutationValue =>
    useMutation(
        {
            type: MOVE_AS_NTH_SIBLING_OF,
            resource,
            payload: {},
        },
        { action: CRUD_MOVE_AS_NTH_SIBLING_OF }
    );

export default useMoveAsNthSiblingOf;
