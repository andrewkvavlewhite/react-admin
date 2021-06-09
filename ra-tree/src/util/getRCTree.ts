import { DataNode } from 'rc-tree/lib/interface';

import getRCTreeDatum from './getRCTreeDatum';
import getRecordTree from './getRecordTree';

import { TreeRecord } from '../types';

export const getRCTree = (
    data: TreeRecord[],
    titleField: string,
    newNodeTitle = 'new node',
    hideRootNodes = false
): DataNode[] => {
    const rcData = data.map(treeRecord =>
        getRCTreeDatum(treeRecord, titleField, newNodeTitle)
    );
    const recordTree = (getRecordTree(rcData) as unknown) as DataNode[];

    return hideRootNodes
        ? recordTree.flatMap(rootNode => rootNode.children)
        : recordTree;
};
