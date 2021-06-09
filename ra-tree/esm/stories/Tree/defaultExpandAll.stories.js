import React from 'react';
import { Tree } from '../../src';
import treeData from './treeData';
export var SimpleTree = function () { return (React.createElement(Tree, { treeData: treeData, defaultExpandAll: true })); };
export default { title: 'ra-tree/Tree/defaultExpandAll' };
