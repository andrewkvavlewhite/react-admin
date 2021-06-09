"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_admin_1 = require("react-admin");
var actions_1 = require("../actions");
var fetchTypes_1 = require("../fetchTypes");
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
    return react_admin_1.useMutation({
        type: fetchTypes_1.ADD_ROOT_NODE,
        resource: resource,
        payload: {},
    }, { action: actions_1.CRUD_ADD_ROOT_NODE });
};
exports.default = useAddRootNode;
