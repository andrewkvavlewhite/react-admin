import getRCTreeDatum from './getRCTreeDatum';
import getRecordTree from './getRecordTree';
export var getRCTree = function (data, titleField, newNodeTitle, hideRootNodes) {
    if (newNodeTitle === void 0) { newNodeTitle = 'new node'; }
    if (hideRootNodes === void 0) { hideRootNodes = false; }
    var rcData = data.map(function (treeRecord) {
        return getRCTreeDatum(treeRecord, titleField, newNodeTitle);
    });
    var recordTree = getRecordTree(rcData);
    return hideRootNodes
        ? recordTree.flatMap(function (rootNode) { return rootNode.children; })
        : recordTree;
};
