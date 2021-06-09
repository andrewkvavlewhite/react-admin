import { Identifier } from 'react-admin';
export declare const CHANGE_EXPANDED_NODES = "RA/TREE/CHANGE_EXPANDED_NODES";
export interface ChangeExpandedNodesAction {
    readonly type: typeof CHANGE_EXPANDED_NODES;
    readonly payload: Identifier[];
    readonly meta: {
        resource: string;
    };
}
export declare const changeExpandedNodes: (resource: string, nodeIds: Identifier[]) => ChangeExpandedNodesAction;
export declare const EXPAND_NODE = "RA/TREE/EXPAND_NODE";
export interface ExpandNodeAction {
    readonly type: typeof EXPAND_NODE;
    readonly payload: Identifier;
    readonly meta: {
        resource: string;
    };
}
export declare const expandNode: (resource: string, nodeId: Identifier) => ExpandNodeAction;
export declare const CRUD_GET_TREE = "RA/CRUD_GET_TREE";
export declare const CRUD_GET_TREE_LOADING = "RA/CRUD_GET_TREE_LOADING";
export declare const CRUD_GET_TREE_SUCCESS = "RA/CRUD_GET_TREE_SUCCESS";
export declare const CRUD_GET_TREE_FAILURE = "RA/CRUD_GET_TREE_FAILURE";
export declare const CRUD_GET_ROOT_NODES = "RA/CRUD_GET_ROOT_NODES";
export declare const CRUD_GET_ROOT_NODES_LOADING = "RA/CRUD_GET_ROOT_NODES_LOADING";
export declare const CRUD_GET_ROOT_NODES_SUCCESS = "RA/CRUD_GET_ROOT_NODES_SUCCESS";
export declare const CRUD_GET_ROOT_NODES_FAILURE = "RA/CRUD_GET_ROOT_NODES_FAILURE";
export declare const CRUD_GET_CHILD_NODES = "RA/CRUD_GET_CHILD_NODES";
export declare const CRUD_GET_CHILD_NODES_LOADING = "RA/CRUD_GET_CHILD_NODES_LOADING";
export declare const CRUD_GET_CHILD_NODES_SUCCESS = "RA/CRUD_GET_CHILD_NODES_SUCCESS";
export declare const CRUD_GET_CHILD_NODES_FAILURE = "RA/CRUD_GET_CHILD_NODES_FAILURE";
export declare const CRUD_MOVE_AS_NTH_CHILD_OF = "RA/CRUD_MOVE_AS_NTH_CHILD_OF";
export declare const CRUD_MOVE_AS_NTH_CHILD_OF_LOADING = "RA/CRUD_MOVE_AS_NTH_CHILD_OF_LOADING";
export declare const CRUD_MOVE_AS_NTH_CHILD_OF_SUCCESS = "RA/CRUD_MOVE_AS_NTH_CHILD_OF_SUCCESS";
export declare const CRUD_MOVE_AS_NTH_CHILD_OF_FAILURE = "RA/CRUD_MOVE_AS_NTH_CHILD_OF_FAILURE";
export declare const CRUD_MOVE_AS_NTH_SIBLING_OF = "RA/CRUD_MOVE_AS_NTH_SIBLING_OF";
export declare const CRUD_MOVE_AS_NTH_SIBLING_OF_LOADING = "RA/CRUD_MOVE_AS_NTH_SIBLING_OF_LOADING";
export declare const CRUD_MOVE_AS_NTH_SIBLING_OF_SUCCESS = "RA/CRUD_MOVE_AS_NTH_SIBLING_OF_SUCCESS";
export declare const CRUD_MOVE_AS_NTH_SIBLING_OF_FAILURE = "RA/CRUD_MOVE_AS_NTH_SIBLING_OF_FAILURE";
export declare const CRUD_ADD_ROOT_NODE = "RA/CRUD_ADD_ROOT_NODE";
export declare const CRUD_ADD_ROOT_NODE_LOADING = "RA/CRUD_ADD_ROOT_NODE_LOADING";
export declare const CRUD_ADD_ROOT_NODE_SUCCESS = "RA/CRUD_ADD_ROOT_NODE_SUCCESS";
export declare const CRUD_ADD_ROOT_NODE_FAILURE = "RA/CRUD_ADD_ROOT_NODE_FAILURE";
export declare const CRUD_ADD_CHILD_NODE = "RA/CRUD_ADD_CHILD_NODE";
export declare const CRUD_ADD_CHILD_NODE_LOADING = "RA/CRUD_ADD_CHILD_NODE_LOADING";
export declare const CRUD_ADD_CHILD_NODE_SUCCESS = "RA/CRUD_ADD_CHILD_NODE_SUCCESS";
export declare const CRUD_ADD_CHILD_NODE_FAILURE = "RA/CRUD_ADD_CHILD_NODE_FAILURE";
export declare const CRUD_DELETE_BRANCH = "RA/CRUD_DELETE_BRANCH";
export declare const CRUD_DELETE_BRANCH_LOADING = "RA/CRUD_DELETE_BRANCH_LOADING";
export declare const CRUD_DELETE_BRANCH_SUCCESS = "RA/CRUD_DELETE_BRANCH_SUCCESS";
export declare const CRUD_DELETE_BRANCH_FAILURE = "RA/CRUD_DELETE_BRANCH_FAILURE";
export declare const POPULATE_RECORDS_FROM_NODES = "RA/TREE/POPULATE_RECORDS_FROM_NODES";
export declare const CREATE_RECORD_FROM_NODE = "RA/TREE/CREATE_RECORD_FROM_NODE";
export declare const ADD_UNSAVED_ROOT_NODE = "RA/TREE/ADD_UNSAVED_ROOT_NODE";
export declare const REMOVE_UNSAVED_ROOT_NODE = "RA/TREE/REMOVE_UNSAVED_ROOT_NODE";
export declare const ADD_UNSAVED_CHILD_NODE = "RA/TREE/ADD_UNSAVED_CHILD_NODE";
export declare const REMOVE_UNSAVED_CHILD_NODE = "RA/TREE/REMOVE_UNSAVED_CHILD_NODE";
