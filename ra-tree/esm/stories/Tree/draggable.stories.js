var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState } from 'react';
import { Box, ThemeProvider, createMuiTheme, Card, CardContent, Typography, } from '@material-ui/core';
import { Tree } from '../../src';
import treeData from './treeData';
export var Draggable = function () {
    var _a = useState(), dropInfo = _a[0], setDropInfo = _a[1];
    return (React.createElement(Card, null,
        React.createElement(CardContent, null,
            React.createElement(Box, { display: "flex" },
                React.createElement(Box, { marginRight: 1, width: 300 },
                    React.createElement(Tree, { treeData: treeData, draggable: true, onDrop: function (info) {
                            var event = info.event, rest = __rest(info, ["event"]);
                            setDropInfo(rest);
                        } })),
                React.createElement(Box, null,
                    React.createElement("textarea", { rows: 35, cols: 100, value: JSON.stringify(dropInfo, null, ' '), placeholder: "onDrop callback argument" }))),
            React.createElement(Typography, null, "Note: In this example, the onDrop handler only logs the drop event, it doesn't reorder the tree."))));
};
export var DraggableDark = function () { return (React.createElement(ThemeProvider, { theme: createMuiTheme({ palette: { type: 'dark' } }) },
    React.createElement(Draggable, null))); };
export default { title: 'ra-tree/Tree/draggable' };
