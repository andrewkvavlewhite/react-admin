"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var prop_types_1 = __importDefault(require("prop-types"));
var rc_tree_1 = __importDefault(require("rc-tree"));
var renderSwitcherIcon_1 = __importDefault(require("./renderSwitcherIcon"));
var useRcTreeStyles_1 = __importDefault(require("./useRcTreeStyles"));
var rcTreeMotion_1 = __importDefault(require("./rcTreeMotion"));
var NodeTitle_1 = __importDefault(require("./NodeTitle"));
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
exports.Tree = function (_a) {
    var checkable = _a.checkable, showLine = _a.showLine, switcherIcon = _a.switcherIcon, nodeActions = _a.nodeActions, props = __rest(_a, ["checkable", "showLine", "switcherIcon", "nodeActions"]);
    var classes = useRcTreeStyles_1.default();
    var treeRef = react_1.useRef(null);
    return (React.createElement("div", { className: classes.root },
        React.createElement(rc_tree_1.default, __assign({ ref: treeRef, switcherIcon: function (nodeProps) {
                return renderSwitcherIcon_1.default(classes.smallIcon, switcherIcon, showLine, nodeProps);
            }, checkable: checkable ? (React.createElement("span", { className: "rc-tree-checkbox-inner" })) : (checkable), titleRender: function (data) { return (React.createElement(NodeTitle_1.default, { data: data, nodeActions: nodeActions })); }, motion: rcTreeMotion_1.default, showLine: showLine }, props))));
};
exports.Tree.propTypes = {
    showLine: prop_types_1.default.bool,
    switcherIcon: prop_types_1.default.any,
};
