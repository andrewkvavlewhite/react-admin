"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRCTree = void 0;
var getRCTreeDatum_1 = __importDefault(require("./getRCTreeDatum"));
var getRecordTree_1 = __importDefault(require("./getRecordTree"));
exports.getRCTree = function (data, titleField, newNodeTitle, hideRootNodes) {
    if (newNodeTitle === void 0) { newNodeTitle = 'new node'; }
    if (hideRootNodes === void 0) { hideRootNodes = false; }
    var rcData = data.map(function (treeRecord) {
        return getRCTreeDatum_1.default(treeRecord, titleField, newNodeTitle);
    });
    var recordTree = getRecordTree_1.default(rcData);
    return hideRootNodes
        ? recordTree.flatMap(function (rootNode) { return rootNode.children; })
        : recordTree;
};
