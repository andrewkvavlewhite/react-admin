"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_admin_1 = require("react-admin");
var actions_1 = require("../actions");
var fetchTypes_1 = require("../fetchTypes");
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
var useAddChildNode = function (resource) {
    return react_admin_1.useMutation({
        type: fetchTypes_1.ADD_CHILD_NODE,
        resource: resource,
        payload: {},
    }, { action: actions_1.CRUD_ADD_CHILD_NODE });
};
exports.default = useAddChildNode;
