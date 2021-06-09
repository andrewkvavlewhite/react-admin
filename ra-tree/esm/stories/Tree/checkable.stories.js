import React, { useState } from 'react';
import { Box, Switch, FormControlLabel, ThemeProvider, createMuiTheme, Card, CardContent, } from '@material-ui/core';
import { Tree } from '../../src';
import treeData from './treeData';
export var Checkable = function () {
    var _a = useState(), checkedKeys = _a[0], setCheckedKeys = _a[1];
    var _b = useState(false), checkStrictly = _b[0], setCheckStrictly = _b[1];
    return (React.createElement(Card, null,
        React.createElement(CardContent, null,
            React.createElement(Box, { display: "flex" },
                React.createElement(Box, { marginRight: 1, width: 300 },
                    React.createElement(FormControlLabel, { control: React.createElement(Switch, { value: checkStrictly, onChange: function () {
                                return setCheckStrictly(!checkStrictly);
                            } }), label: "Check strictly" }),
                    React.createElement(Tree, { treeData: treeData, checkable: true, checkStrictly: checkStrictly, onCheck: function (checkedKeys) {
                            setCheckedKeys(checkedKeys);
                        } })),
                React.createElement(Box, null,
                    React.createElement("textarea", { rows: 35, cols: 100, value: JSON.stringify(checkedKeys, null, ' '), placeholder: "onCheck callback argument" }))))));
};
export var CheckableDark = function () { return (React.createElement(ThemeProvider, { theme: createMuiTheme({ palette: { type: 'dark' } }) },
    React.createElement(Checkable, null))); };
export default { title: 'ra-tree/Tree/checkable' };
