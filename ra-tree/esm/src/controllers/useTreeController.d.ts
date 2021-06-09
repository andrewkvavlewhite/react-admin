/// <reference types="react" />
import { DataNode, EventDataNode, Key } from 'rc-tree/lib/interface';
import { TreeRecord } from '../types';
export declare const useTreeController: (options: UseTreeControllerOptions) => UseTreeControllerResult;
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
