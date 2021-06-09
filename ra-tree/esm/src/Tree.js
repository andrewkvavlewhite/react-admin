var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import * as React from 'react';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import RcTree from 'rc-tree';
import renderSwitcherIcon from './renderSwitcherIcon';
import useRcTreeStyles from './useRcTreeStyles';
import rcTreeMotion from './rcTreeMotion';
import NodeTitle from './NodeTitle';
/**
 * Wrapper for rc-tree <Tree>, with Material Design style.
 *
 * @see https://github.com/react-component/tree#tree-props
 *
 * rc-tree expects a treeData prop containing a tree of nodes with key, title,
 * and children fields.
 *
 * @example // treeData format
 *
 * [
 *   { key: '1', title: 'foo1', children: [
 *     { key: '3', title: 'foo3', children: [
 *       { key: '5', title: 'foo5', children: [] },
 *     ] },
 *     { key: '4', title: 'foo4', children: [] },
 *   ] },
 *   { key: '2', title: 'foo2', children: [] },
 * ]
 *
 * @example // usage
 *
 * import { Tree } from '@react-admin/ra-tree';
 * import treeData from './treeData';
 *
 * export const SimpleTree: FC = () => <Tree treeData={treeData} />;
 */
export var Tree = function (_a) {
    var checkable = _a.checkable, showLine = _a.showLine, switcherIcon = _a.switcherIcon, nodeActions = _a.nodeActions, props = __rest(_a, ["checkable", "showLine", "switcherIcon", "nodeActions"]);
    var classes = useRcTreeStyles();
    var treeRef = useRef(null);
    return (React.createElement("div", { className: classes.root },
        React.createElement(RcTree, __assign({ ref: treeRef, switcherIcon: function (nodeProps) {
                return renderSwitcherIcon(classes.smallIcon, switcherIcon, showLine, nodeProps);
            }, checkable: checkable ? (React.createElement("span", { className: "rc-tree-checkbox-inner" })) : (checkable), titleRender: function (data) { return (React.createElement(NodeTitle, { data: data, nodeActions: nodeActions })); }, motion: rcTreeMotion, showLine: showLine }, props))));
};
Tree.propTypes = {
    showLine: PropTypes.bool,
    switcherIcon: PropTypes.any,
};
