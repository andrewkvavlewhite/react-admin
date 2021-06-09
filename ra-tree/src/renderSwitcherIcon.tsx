import React from 'react';
import classNames from 'classnames';
import HourglassEmptyOutlinedIcon from '@material-ui/icons/HourglassEmptyOutlined';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const renderSwitcherIcon = (
    className = '',
    switcherIcon: React.ReactNode | null | undefined,
    showLine: boolean | undefined,
    {
        isLeaf,
        expanded,
        loading,
    }: { isLeaf?: boolean; expanded?: boolean; loading?: boolean }
): any => {
    if (loading) {
        return (
            <HourglassEmptyOutlinedIcon className="rc-tree-switcher-loading-icon" />
        );
    }
    if (isLeaf) {
        return showLine ? (
            <InsertDriveFileOutlinedIcon
                className={classNames('rc-tree-switcher-line-icon', className)}
            />
        ) : null;
    }
    const switcherCls = `rc-tree-switcher-icon`;
    if (React.isValidElement(switcherIcon)) {
        return React.cloneElement(switcherIcon, {
            className: classNames(
                switcherIcon.props.className || '',
                switcherCls
            ),
        });
    }

    if (switcherIcon) {
        return switcherIcon;
    }

    if (showLine) {
        return expanded ? (
            <IndeterminateCheckBoxOutlinedIcon
                className={classNames('rc-tree-switcher-line-icon', className)}
            />
        ) : (
            <AddBoxOutlinedIcon
                className={classNames('rc-tree-switcher-line-icon', className)}
            />
        );
    }
    return <ExpandMoreIcon className={switcherCls} />;
};

export default renderSwitcherIcon;
