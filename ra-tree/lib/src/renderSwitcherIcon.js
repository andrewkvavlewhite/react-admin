"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var HourglassEmptyOutlined_1 = __importDefault(require("@material-ui/icons/HourglassEmptyOutlined"));
var InsertDriveFileOutlined_1 = __importDefault(require("@material-ui/icons/InsertDriveFileOutlined"));
var IndeterminateCheckBoxOutlined_1 = __importDefault(require("@material-ui/icons/IndeterminateCheckBoxOutlined"));
var AddBoxOutlined_1 = __importDefault(require("@material-ui/icons/AddBoxOutlined"));
var ExpandMore_1 = __importDefault(require("@material-ui/icons/ExpandMore"));
var renderSwitcherIcon = function (className, switcherIcon, showLine, _a) {
    if (className === void 0) { className = ''; }
    var isLeaf = _a.isLeaf, expanded = _a.expanded, loading = _a.loading;
    if (loading) {
        return (react_1.default.createElement(HourglassEmptyOutlined_1.default, { className: "rc-tree-switcher-loading-icon" }));
    }
    if (isLeaf) {
        return showLine ? (react_1.default.createElement(InsertDriveFileOutlined_1.default, { className: classnames_1.default('rc-tree-switcher-line-icon', className) })) : null;
    }
    var switcherCls = "rc-tree-switcher-icon";
    if (react_1.default.isValidElement(switcherIcon)) {
        return react_1.default.cloneElement(switcherIcon, {
            className: classnames_1.default(switcherIcon.props.className || '', switcherCls),
        });
    }
    if (switcherIcon) {
        return switcherIcon;
    }
    if (showLine) {
        return expanded ? (react_1.default.createElement(IndeterminateCheckBoxOutlined_1.default, { className: classnames_1.default('rc-tree-switcher-line-icon', className) })) : (react_1.default.createElement(AddBoxOutlined_1.default, { className: classnames_1.default('rc-tree-switcher-line-icon', className) }));
    }
    return react_1.default.createElement(ExpandMore_1.default, { className: switcherCls });
};
exports.default = renderSwitcherIcon;
