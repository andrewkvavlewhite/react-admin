"use strict";
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
exports.DraggableDark = exports.Draggable = void 0;
var react_1 = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var src_1 = require("../../src");
var treeData_1 = __importDefault(require("./treeData"));
exports.Draggable = function () {
    var _a = react_1.useState(), dropInfo = _a[0], setDropInfo = _a[1];
    return (react_1.default.createElement(core_1.Card, null,
        react_1.default.createElement(core_1.CardContent, null,
            react_1.default.createElement(core_1.Box, { display: "flex" },
                react_1.default.createElement(core_1.Box, { marginRight: 1, width: 300 },
                    react_1.default.createElement(src_1.Tree, { treeData: treeData_1.default, draggable: true, onDrop: function (info) {
                            var event = info.event, rest = __rest(info, ["event"]);
                            setDropInfo(rest);
                        } })),
                react_1.default.createElement(core_1.Box, null,
                    react_1.default.createElement("textarea", { rows: 35, cols: 100, value: JSON.stringify(dropInfo, null, ' '), placeholder: "onDrop callback argument" }))),
            react_1.default.createElement(core_1.Typography, null, "Note: In this example, the onDrop handler only logs the drop event, it doesn't reorder the tree."))));
};
exports.DraggableDark = function () { return (react_1.default.createElement(core_1.ThemeProvider, { theme: core_1.createMuiTheme({ palette: { type: 'dark' } }) },
    react_1.default.createElement(exports.Draggable, null))); };
exports.default = { title: 'ra-tree/Tree/draggable' };
