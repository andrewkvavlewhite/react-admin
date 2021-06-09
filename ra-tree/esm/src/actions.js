export var CHANGE_EXPANDED_NODES = 'RA/TREE/CHANGE_EXPANDED_NODES';
export var changeExpandedNodes = function (resource, nodeIds) { return ({
    type: CHANGE_EXPANDED_NODES,
    payload: nodeIds,
    meta: { resource: resource },
}); };
export var EXPAND_NODE = 'RA/TREE/EXPAND_NODE';
export var expandNode = function (resource, nodeId) { return ({
    type: EXPAND_NODE,
    payload: nodeId,
    meta: { resource: resource },
}); };
export var CRUD_GET_TREE = 'RA/CRUD_GET_TREE';
export var CRUD_GET_TREE_LOADING = 'RA/CRUD_GET_TREE_LOADING';
export var CRUD_GET_TREE_SUCCESS = 'RA/CRUD_GET_TREE_SUCCESS';
export var CRUD_GET_TREE_FAILURE = 'RA/CRUD_GET_TREE_FAILURE';
export var CRUD_GET_ROOT_NODES = 'RA/CRUD_GET_ROOT_NODES';
export var CRUD_GET_ROOT_NODES_LOADING = 'RA/CRUD_GET_ROOT_NODES_LOADING';
export var CRUD_GET_ROOT_NODES_SUCCESS = 'RA/CRUD_GET_ROOT_NODES_SUCCESS';
export var CRUD_GET_ROOT_NODES_FAILURE = 'RA/CRUD_GET_ROOT_NODES_FAILURE';
export var CRUD_GET_CHILD_NODES = 'RA/CRUD_GET_CHILD_NODES';
export var CRUD_GET_CHILD_NODES_LOADING = 'RA/CRUD_GET_CHILD_NODES_LOADING';
export var CRUD_GET_CHILD_NODES_SUCCESS = 'RA/CRUD_GET_CHILD_NODES_SUCCESS';
export var CRUD_GET_CHILD_NODES_FAILURE = 'RA/CRUD_GET_CHILD_NODES_FAILURE';
export var CRUD_MOVE_AS_NTH_CHILD_OF = 'RA/CRUD_MOVE_AS_NTH_CHILD_OF';
export var CRUD_MOVE_AS_NTH_CHILD_OF_LOADING = 'RA/CRUD_MOVE_AS_NTH_CHILD_OF_LOADING';
export var CRUD_MOVE_AS_NTH_CHILD_OF_SUCCESS = 'RA/CRUD_MOVE_AS_NTH_CHILD_OF_SUCCESS';
export var CRUD_MOVE_AS_NTH_CHILD_OF_FAILURE = 'RA/CRUD_MOVE_AS_NTH_CHILD_OF_FAILURE';
export var CRUD_MOVE_AS_NTH_SIBLING_OF = 'RA/CRUD_MOVE_AS_NTH_SIBLING_OF';
export var CRUD_MOVE_AS_NTH_SIBLING_OF_LOADING = 'RA/CRUD_MOVE_AS_NTH_SIBLING_OF_LOADING';
export var CRUD_MOVE_AS_NTH_SIBLING_OF_SUCCESS = 'RA/CRUD_MOVE_AS_NTH_SIBLING_OF_SUCCESS';
export var CRUD_MOVE_AS_NTH_SIBLING_OF_FAILURE = 'RA/CRUD_MOVE_AS_NTH_SIBLING_OF_FAILURE';
export var CRUD_ADD_ROOT_NODE = 'RA/CRUD_ADD_ROOT_NODE';
export var CRUD_ADD_ROOT_NODE_LOADING = 'RA/CRUD_ADD_ROOT_NODE_LOADING';
export var CRUD_ADD_ROOT_NODE_SUCCESS = 'RA/CRUD_ADD_ROOT_NODE_SUCCESS';
export var CRUD_ADD_ROOT_NODE_FAILURE = 'RA/CRUD_ADD_ROOT_NODE_FAILURE';
export var CRUD_ADD_CHILD_NODE = 'RA/CRUD_ADD_CHILD_NODE';
export var CRUD_ADD_CHILD_NODE_LOADING = 'RA/CRUD_ADD_CHILD_NODE_LOADING';
export var CRUD_ADD_CHILD_NODE_SUCCESS = 'RA/CRUD_ADD_CHILD_NODE_SUCCESS';
export var CRUD_ADD_CHILD_NODE_FAILURE = 'RA/CRUD_ADD_CHILD_NODE_FAILURE';
export var CRUD_DELETE_BRANCH = 'RA/CRUD_DELETE_BRANCH';
export var CRUD_DELETE_BRANCH_LOADING = 'RA/CRUD_DELETE_BRANCH_LOADING';
export var CRUD_DELETE_BRANCH_SUCCESS = 'RA/CRUD_DELETE_BRANCH_SUCCESS';
export var CRUD_DELETE_BRANCH_FAILURE = 'RA/CRUD_DELETE_BRANCH_FAILURE';
export var POPULATE_RECORDS_FROM_NODES = 'RA/TREE/POPULATE_RECORDS_FROM_NODES';
export var CREATE_RECORD_FROM_NODE = 'RA/TREE/CREATE_RECORD_FROM_NODE';
export var ADD_UNSAVED_ROOT_NODE = 'RA/TREE/ADD_UNSAVED_ROOT_NODE';
export var REMOVE_UNSAVED_ROOT_NODE = 'RA/TREE/REMOVE_UNSAVED_ROOT_NODE';
export var ADD_UNSAVED_CHILD_NODE = 'RA/TREE/ADD_UNSAVED_CHILD_NODE';
export var REMOVE_UNSAVED_CHILD_NODE = 'RA/TREE/REMOVE_UNSAVED_CHILD_NODE';
