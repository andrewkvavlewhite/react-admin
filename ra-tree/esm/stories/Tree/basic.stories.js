import React from 'react';
import { ThemeProvider, createMuiTheme, Card, CardContent, } from '@material-ui/core';
import { Tree } from '../../src';
import treeData from './treeData';
export var SimpleTree = function () { return (React.createElement(Card, null,
    React.createElement(CardContent, null,
        React.createElement(Tree, { treeData: treeData })))); };
export var SimpleTreeDark = function () { return (React.createElement(ThemeProvider, { theme: createMuiTheme({ palette: { type: 'dark' } }) },
    React.createElement(SimpleTree, null))); };
export default { title: 'ra-tree/Tree/Basic' };
