import React from 'react';
import { ThemeProvider, createMuiTheme, Card, CardContent, } from '@material-ui/core';
import { Tree } from '../../src';
import treeData from './treeData';
export var ShowLine = function () { return (React.createElement(Card, null,
    React.createElement(CardContent, null,
        React.createElement(Tree, { treeData: treeData, showLine: true })))); };
export var ShowLineDark = function () { return (React.createElement(ThemeProvider, { theme: createMuiTheme({ palette: { type: 'dark' } }) },
    React.createElement(ShowLine, null))); };
export default { title: 'ra-tree/Tree/showLine' };
