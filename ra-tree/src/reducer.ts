import { Reducer } from 'redux';
import { Identifier } from 'react-admin';
import {
    CHANGE_EXPANDED_NODES,
    EXPAND_NODE,
    ADD_UNSAVED_ROOT_NODE,
    REMOVE_UNSAVED_ROOT_NODE,
    ADD_UNSAVED_CHILD_NODE,
    REMOVE_UNSAVED_CHILD_NODE,
} from './actions';
import {
    GET_TREE,
    GET_ROOT_NODES,
    GET_CHILD_NODES,
    ADD_CHILD_NODE,
    ADD_ROOT_NODE,
} from './fetchTypes';
import { TreeReduxSubState, TreeNodesReduxSubState } from './types';
import { UNSAVED_NEW_NODE } from './constants';

const initialState = {};

/**
 * Reducer for Tree state
 *
 * Store, for each resource with a tree, 2 objects:
 *  - nodes: a list of nodes indexd by id, containing an array of child ids
 *  - expanded: an array of the expanded ids
 *
 * @example
 *
 * tree: {
 *   categories: {
 *     nodes: {
 *       '1': [2,6],
 *       '2': [3],
 *       '3': [4,5],
 *       '4': [],
 *       '5': [],
 *       '6': [7,10,11],
 *       '7': [8,9],
 *       '8': [],
 *       '9': [],
 *       '10': [],
 *       '11': []
 *     },
 *     expanded: []
 *   }
 */
const treeReducer: Reducer<TreeReduxSubState> = (
    state = initialState,
    { type, payload, requestPayload, meta }
) => {
    if (!meta || !meta.resource) {
        return state;
    }
    const resourceState = state[meta.resource] || {
        nodes: undefined,
        expanded: [],
    };

    // handling node expansion
    if (type === CHANGE_EXPANDED_NODES) {
        return {
            ...state,
            [meta.resource]: {
                ...resourceState,
                expanded: payload.map(String),
            },
        };
    }
    if (type === EXPAND_NODE) {
        if (resourceState.expanded.includes(payload)) {
            // already expanded
            return state;
        }
        // rc-tree should also expand ancestors but for some reasons it doesn't
        // determine all the ancestors that must be opened
        let newExpanded = [];
        let current = payload;
        do {
            newExpanded = newExpanded.concat(String(current));
            current = Object.keys(resourceState.nodes)
                .filter(id =>
                    resourceState.nodes[id].some(item => item == current)
                )
                .pop();
        } while (current);
        // expand all these nodes
        return {
            ...state,
            [meta.resource]: {
                ...resourceState,
                expanded: resourceState.expanded.concat(newExpanded),
            },
        };
    }

    // handling local node insertion
    if (type === ADD_UNSAVED_ROOT_NODE) {
        return {
            ...state,
            [meta.resource]: {
                ...resourceState,
                nodes: {
                    ...(resourceState.nodes || {}),
                    [UNSAVED_NEW_NODE]: [],
                },
            },
        };
    }
    if (type === REMOVE_UNSAVED_ROOT_NODE) {
        const { [UNSAVED_NEW_NODE]: _, ...nodes } = resourceState.nodes;
        return {
            ...state,
            [meta.resource]: {
                ...resourceState,
                nodes,
            },
        };
    }
    if (type === 'RA/CRUD_DELETE_OPTIMISTIC') {
        if (typeof resourceState.nodes !== 'undefined') {
            console.warn(
                `A record from a tree resource should not be deleted using the dataProvider.delete method. Please use dataProvider.deleteBranch instead.`
            );
        }
        return state;
    }
    if (type === 'RA/CRUD_DELETE_BRANCH_OPTIMISTIC') {
        const nodesToRemove = getNodesToRemove(resourceState.nodes, payload.id);

        return {
            ...state,
            [meta.resource]: {
                expanded: resourceState.expanded.filter(
                    id => !nodesToRemove.some(idToRemove => id == idToRemove)
                ),
                nodes: Object.keys(resourceState.nodes)
                    .filter(
                        id =>
                            !nodesToRemove.some(idToRemove => id == idToRemove)
                    )
                    .reduce((acc, curr) => {
                        acc[curr] = resourceState.nodes[curr].filter(
                            id =>
                                !nodesToRemove.some(
                                    idToRemove => id == idToRemove
                                )
                        );
                        return acc;
                    }, {}),
            },
        };
    }
    if (type === ADD_UNSAVED_CHILD_NODE) {
        return {
            ...state,
            [meta.resource]: {
                ...resourceState,
                nodes: {
                    ...(resourceState.nodes || {}),
                    [payload.parentId]: resourceState.nodes[
                        payload.parentId
                    ].concat(UNSAVED_NEW_NODE),
                    [UNSAVED_NEW_NODE]: [],
                },
                // expand parent id not expanded
                expanded: resourceState.expanded.includes(payload.parentId)
                    ? resourceState.expanded
                    : resourceState.expanded.concat(String(payload.parentId)),
            },
        };
    }
    if (type === REMOVE_UNSAVED_CHILD_NODE) {
        const { [UNSAVED_NEW_NODE]: _, ...nodes } = resourceState.nodes;
        const children = nodes[payload.parentId].filter(
            e => e !== UNSAVED_NEW_NODE
        );
        return {
            ...state,
            [meta.resource]: {
                ...resourceState,
                nodes: {
                    ...nodes,
                    [payload.parentId]: children,
                },
            },
        };
    }

    if (!meta.fetchResponse) {
        return state;
    }

    // handling dataProvider response
    switch (meta.fetchResponse) {
        case GET_TREE:
            return {
                ...state,
                [meta.resource]: {
                    ...resourceState,
                    nodes: {
                        ...payload.data.reduce((acc, node) => {
                            acc[node.id] = node.children;
                            return acc;
                        }, {}),
                    },
                },
            };
        case GET_ROOT_NODES:
        case GET_CHILD_NODES:
            return {
                ...state,
                [meta.resource]: {
                    ...resourceState,
                    nodes: {
                        ...(resourceState.nodes || {}),
                        ...payload.data.reduce((acc, node) => {
                            acc[node.id] = node.children;
                            return acc;
                        }, {}),
                    },
                },
            };
        case ADD_ROOT_NODE:
            return {
                ...state,
                [meta.resource]: {
                    ...resourceState,
                    nodes: {
                        ...(resourceState.nodes || {}),
                        [payload.data.id]: [],
                    },
                },
            };
        case ADD_CHILD_NODE:
            return {
                ...state,
                [meta.resource]: {
                    ...resourceState,
                    nodes: {
                        ...(resourceState.nodes || {}),
                        [requestPayload.parentId]: resourceState.nodes[
                            requestPayload.parentId
                        ].concat(payload.data.id),
                        [payload.data.id]: [],
                    },
                },
            };
        default:
            return state;
    }
};

export default treeReducer;

const getNodesToRemove = (
    nodes: TreeNodesReduxSubState,
    nodeId: Identifier
): Identifier[] => {
    const children = nodes[nodeId];

    const ids = (children || []).reduce(
        (acc, child) => [...acc, ...getNodesToRemove(nodes, child)],
        []
    );

    ids.push(nodeId);

    return ids;
};
