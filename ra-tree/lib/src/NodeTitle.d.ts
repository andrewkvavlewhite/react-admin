import { ReactElement } from 'react';
import { DataNode } from 'rc-tree/lib/interface';
import { NodeActionsProps } from './NodeActions';
declare const NodeTitle: ({ data, nodeActions }: NodeTitleProps) => ReactElement;
export interface NodeTitleProps {
    data: DataNode;
    nodeActions?: ReactElement<NodeActionsProps>;
}
export default NodeTitle;
