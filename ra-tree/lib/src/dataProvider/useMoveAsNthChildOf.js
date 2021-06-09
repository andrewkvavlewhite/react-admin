"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_admin_1 = require("react-admin");
var actions_1 = require("../actions");
var fetchTypes_1 = require("../fetchTypes");
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
var useMoveAsNthChildOf = function (resource) {
    return react_admin_1.useMutation({
        type: fetchTypes_1.MOVE_AS_NTH_CHILD_OF,
        resource: resource,
        payload: {},
    }, { action: actions_1.CRUD_MOVE_AS_NTH_CHILD_OF });
};
exports.default = useMoveAsNthChildOf;
