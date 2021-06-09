import { ReactElement, ReactNode } from 'react';
import { DataNode } from 'rc-tree/lib/interface';
/**
 * Provides a dropdown menu for each node.
 * It accepts children which must return a MaterialUI MenuItem component
 *
 * @example
 * import { NodeActions, DeleteMenuItem, TreeWithDetails } from '@react-admin/ra-tree';
 *
 * const MyCustomActionMenuItem = ({ record, resource, parentId }) => {
 *     const handleClick = () => {
 *         // Do something with dataProvider ?
 *     }
 *     return (
 *         <MenuItem onClick={handleClick}>
 *             Do something
 *         </MenuItem>
 *     );
 * };
 *
 * const MyActions = (props) => (
 *     <NodeActions {...props}>
 *         <MyCustomActionMenuItem />
 *         <DeleteMenuItem />
 *     </NodeActions>
 * );
 *
 * const CategoriesList: FC<Props> = props => (
 *     <TreeWithDetails
 *         titleField="name"
 *         edit={CategoriesEdit}
 *         draggable
 *         showLine
 *         nodeActions={<MyActions />}
 *         {...props}
 *     />
 * );
 */
declare const NodeActions: ({ basePath, children, className, data, resource, }: NodeActionsProps) => ReactElement;
export default NodeActions;
export interface NodeActionsProps {
    basePath?: string;
    children?: ReactNode;
    className?: string;
    data?: DataNode;
    resource?: string;
}
