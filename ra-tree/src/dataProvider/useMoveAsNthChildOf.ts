import { useMutation, UseMutationValue } from 'react-admin';
import { CRUD_MOVE_AS_NTH_CHILD_OF } from '../actions';
import { MOVE_AS_NTH_CHILD_OF } from '../fetchTypes';

/**
 * Get a callback to call the dataProvider.moveAsNthChildOf() method
 *
 * @param {string} resource the resource name, e.g. 'posts'
 *
 * @example // usage
 *
 * import { useNotify } from 'react-admin';
 * import { useMoveAsNthChildOf } from '@react-admin/ra-tree';
 *
 * const MyComponent = () => {
 *     const [moveAsNthChildOf, { loading, data, error }] = useMoveAsNthChildOf(resource);
 *     const notify = useNotify();
 *     const handleClick = () => {
 *         moveAsNthChildOf(
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
 *             Move node 'hello' as 3rd child of 'world'
 *         </button>
 *     );
 * }
 */
const useMoveAsNthChildOf = (resource: string): UseMutationValue =>
    useMutation(
        {
            type: MOVE_AS_NTH_CHILD_OF,
            resource,
            payload: {},
        },
        { action: CRUD_MOVE_AS_NTH_CHILD_OF }
    );

export default useMoveAsNthChildOf;
