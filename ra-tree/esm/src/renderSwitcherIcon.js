import React from 'react';
import classNames from 'classnames';
import HourglassEmptyOutlinedIcon from '@material-ui/icons/HourglassEmptyOutlined';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
var renderSwitcherIcon = function (className, switcherIcon, showLine, _a) {
    if (className === void 0) { className = ''; }
    var isLeaf = _a.isLeaf, expanded = _a.expanded, loading = _a.loading;
    if (loading) {
        return (React.createElement(HourglassEmptyOutlinedIcon, { className: "rc-tree-switcher-loading-icon" }));
    }
    if (isLeaf) {
        return showLine ? (React.createElement(InsertDriveFileOutlinedIcon, { className: classNames('rc-tree-switcher-line-icon', className) })) : null;
    }
    var switcherCls = "rc-tree-switcher-icon";
    if (React.isValidElement(switcherIcon)) {
        return React.cloneElement(switcherIcon, {
            className: classNames(switcherIcon.props.className || '', switcherCls),
        });
    }
    if (switcherIcon) {
        return switcherIcon;
    }
    if (showLine) {
        return expanded ? (React.createElement(IndeterminateCheckBoxOutlinedIcon, { className: classNames('rc-tree-switcher-line-icon', className) })) : (React.createElement(AddBoxOutlinedIcon, { className: classNames('rc-tree-switcher-line-icon', className) }));
    }
    return React.createElement(ExpandMoreIcon, { className: switcherCls });
};
export default renderSwitcherIcon;
