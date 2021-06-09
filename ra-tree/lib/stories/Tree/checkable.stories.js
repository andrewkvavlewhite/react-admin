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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckableDark = exports.Checkable = void 0;
var react_1 = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var src_1 = require("../../src");
var treeData_1 = __importDefault(require("./treeData"));
exports.Checkable = function () {
    var _a = react_1.useState(), checkedKeys = _a[0], setCheckedKeys = _a[1];
    var _b = react_1.useState(false), checkStrictly = _b[0], setCheckStrictly = _b[1];
    return (react_1.default.createElement(core_1.Card, null,
        react_1.default.createElement(core_1.CardContent, null,
            react_1.default.createElement(core_1.Box, { display: "flex" },
                react_1.default.createElement(core_1.Box, { marginRight: 1, width: 300 },
                    react_1.default.createElement(core_1.FormControlLabel, { control: react_1.default.createElement(core_1.Switch, { value: checkStrictly, onChange: function () {
                                return setCheckStrictly(!checkStrictly);
                            } }), label: "Check strictly" }),
                    react_1.default.createElement(src_1.Tree, { treeData: treeData_1.default, checkable: true, checkStrictly: checkStrictly, onCheck: function (checkedKeys) {
                            setCheckedKeys(checkedKeys);
                        } })),
                react_1.default.createElement(core_1.Box, null,
                    react_1.default.createElement("textarea", { rows: 35, cols: 100, value: JSON.stringify(checkedKeys, null, ' '), placeholder: "onCheck callback argument" }))))));
};
exports.CheckableDark = function () { return (react_1.default.createElement(core_1.ThemeProvider, { theme: core_1.createMuiTheme({ palette: { type: 'dark' } }) },
    react_1.default.createElement(exports.Checkable, null))); };
exports.default = { title: 'ra-tree/Tree/checkable' };
