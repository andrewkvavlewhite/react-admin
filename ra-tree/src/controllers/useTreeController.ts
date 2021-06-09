import { useDispatch, useSelector } from 'react-redux';
import { DataNode, EventDataNode, Key } from 'rc-tree/lib/interface';
import {
    useGetResourceLabel,
    useNotify,
    useVersion,
    useTranslate,
    Identifier,
    useResourceContext,
} from 'react-admin';

import {
    useGetRootNodes,
    useGetTree,
    useGetTreeCallback,
    useMoveAsNthChildOf,
    useMoveAsNthSiblingOf,
} from '../dataProvider';
import { getRCTree } from '../util';
import { changeExpandedNodes } from '../actions';
import { TreeReduxState, TreeRecord } from '../types';

export const useTreeController = (
    options: UseTreeControllerOptions
): UseTreeControllerResult => {
    const version = useVersion();
    const translate = useTranslate();
    const resource = useResourceContext(options);
    const getResourceLabel = useGetResourceLabel();
    const { hideRootNodes, lazy = false, titleField = 'title' } = options;

    // load entire tree on mount
    const treeState = useGetTree(resource, {
        enabled: !lazy,
        version,
    });

    // load only the root nodes on mount if lazy
    const rootNodesState = useGetRootNodes(resource, {
        enabled: lazy,
        version,
    });

    const { data, error, loaded, loading } = lazy ? rootNodesState : treeState;

    // prepare data structure for rc-tree
    // add key and title, and turn to recursive DataNode[] format
    const tree = data
        ? getRCTree(
              data,
              titleField,
              translate('ra-tree.new_node'),
              hideRootNodes
          )
        : null;

    // handle expanded persistence
    const dispatch = useDispatch();
    const expandedKeys = useSelector<TreeReduxState>(state =>
        state.tree[resource] ? state.tree[resource].expanded : []
    );

    // prepare hooks for drag and drop
    const [moveAsNthChildOf] = useMoveAsNthChildOf(resource);
    const [moveAsNthSiblingOf] = useMoveAsNthSiblingOf(resource);
    const refreshTree = useGetTreeCallback(resource);
    const notify = useNotify();

    /**
     * Call dataProvider.moveXXX() method on drop.
     *
     * Heavily inspired by https://github.com/react-component/tree/blob/master/examples/draggable.jsx
     *
     * @see https://github.com/react-component/tree/blob/master/examples/draggable.jsx
     */
    const handleDrop = (info: any): void => {
        const dropKey = info.node.props.eventKey;
        const dragKey = info.dragNode.props.eventKey;
        const dropPos = info.node.props.pos.split('-');
        const dropPosition =
            info.dropPosition - Number(dropPos[dropPos.length - 1]);

        const dataById = data.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});

        const dragObject = dataById[dragKey];
        const targetObject = dataById[dropKey];

        // refresh tree on success
        const successSideEffect = async (): Promise<void> => {
            await refreshTree();
            notify('ra-tree.item_moved');
        };

        if (!info.dropToGap) {
            // Drop on a node
            // move dragObject to last child of targetObject
            moveAsNthChildOf(
                {
                    payload: {
                        source: dragObject,
                        destination: targetObject,
                        position: targetObject.children.length + 1,
                    },
                },
                { onSuccess: successSideEffect }
            );
        } else if (
            (info.node.children || []).length > 0 && // Has children
            info.node.props.expanded && // Is expanded
            dropPosition === 1 // On the bottom gap
        ) {
            // drop on the top gap
            // move dragObject to first child of targetObject
            moveAsNthChildOf(
                {
                    payload: {
                        source: dragObject,
                        destination: targetObject,
                        position: 0,
                    },
                },
                { onSuccess: successSideEffect }
            );
        } else {
            // drop between nodes
            // look for the target position
            let targetPosition;
            const loop = (nodes, key, callback): void => {
                nodes.forEach((item, index) => {
                    if (item.key === key) {
                        callback(index);
                        return;
                    }
                    if (item.children) {
                        loop(item.children, key, callback);
                    }
                });
            };
            loop(tree, dropKey, index => {
                targetPosition = index;
            });
            // move dragObject to sibling targetPosition of targetObject
            moveAsNthSiblingOf(
                {
                    payload: {
                        source: dragObject,
                        destination: targetObject,
                        position:
                            dropPosition === -1 &&
                            !targetObject.children.includes(dragObject.id)
                                ? targetPosition
                                : targetPosition + 1,
                    },
                },
                { onSuccess: successSideEffect }
            );
        }
    };

    const handleExpand = (expandedKeys: Identifier[]): void => {
        // persist expanded state in Redux to show the tree in previous state when reopening
        dispatch(changeExpandedNodes(resource, expandedKeys));
    };

    const defaultTitle = translate('ra.page.list', {
        name: getResourceLabel(resource, 2),
    });

    return {
        data,
        defaultTitle,
        error,
        loading,
        loaded,
        tree,
        expandedKeys,
        handleDrop,
        handleExpand,
    };
};

export interface UseTreeControllerResult {
    data: TreeRecord[];
    defaultTitle: string;
    error?: any;
    loading: boolean;
    loaded: boolean;
    tree: DataNode[];
    expandedKeys: string[];
    handleDrop: (info: {
        event: React.MouseEvent;
        node: EventDataNode;
        dragNode: EventDataNode;
        dragNodesKeys: Key[];
        dropPosition: number;
        dropToGap: boolean;
    }) => void;
    handleExpand: (expandedKeys: string[]) => void;
}

export interface UseTreeControllerOptions {
    hideRootNodes?: boolean;
    lazy?: boolean;
    resource: string;
    titleField: string;
}
