import React from 'react';
import { Tree } from '../../src';
import treeData from './treeData';
export var SimpleTree = function () { return (React.createElement(Tree, { treeData: treeData, defaultSelectedKeys: ['10'], defaultExpandedKeys: ['10'] })); };
export default { title: 'ra-tree/Tree/defaultSelectedKeys' };
