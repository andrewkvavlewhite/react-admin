import { ReactElement } from 'react';
import { Record } from 'react-admin';
declare const NodeEditActions: ({ basePath, data, }: NodeEditActionsProps) => ReactElement;
export interface NodeEditActionsProps {
    basePath?: string;
    data?: Record;
}
export default NodeEditActions;
