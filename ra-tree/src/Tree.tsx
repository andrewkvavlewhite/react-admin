import * as React from 'react';
import { ReactElement, useRef } from 'react';
import PropTypes from 'prop-types';
import RcTree, { TreeProps as RcTreeProps } from 'rc-tree';

import renderSwitcherIcon from './renderSwitcherIcon';
import useRcTreeStyles from './useRcTreeStyles';
import rcTreeMotion from './rcTreeMotion';
import NodeTitle from './NodeTitle';
import { NodeActionsProps } from './NodeActions';

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
export const Tree = ({
    checkable,
    showLine,
    switcherIcon,
    nodeActions,
    ...props
}: TreeProps): ReactElement => {
    const classes = useRcTreeStyles();
    const treeRef = useRef(null);

    return (
        <div className={classes.root}>
            <RcTree
                ref={treeRef}
                switcherIcon={(nodeProps): any =>
                    renderSwitcherIcon(
                        classes.smallIcon,
                        switcherIcon,
                        showLine,
                        nodeProps
                    )
                }
                checkable={
                    checkable ? (
                        <span className="rc-tree-checkbox-inner" />
                    ) : (
                        checkable
                    )
                }
                titleRender={(data): any => (
                    <NodeTitle data={data} nodeActions={nodeActions} />
                )}
                motion={rcTreeMotion}
                showLine={showLine}
                {...props}
            />
        </div>
    );
};

Tree.propTypes = {
    showLine: PropTypes.bool,
    switcherIcon: PropTypes.any,
};

export interface TreeProps extends Omit<RcTreeProps, 'prefixCls' | 'children'> {
    nodeActions?: ReactElement<NodeActionsProps>;
}
