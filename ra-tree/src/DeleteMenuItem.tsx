import * as React from 'react';
import { forwardRef } from 'react';
import { Identifier, Record, RedirectionSideEffect } from 'react-admin';
import { MenuItemProps } from '@material-ui/core';
import DeleteMenuItemWithConfirmation from './DeleteMenuItemWithConfirmation';
import DeleteMenuItemWithUndo from './DeleteMenuItemWithUndo';

/**
 * MenuItem used to delete a branch. Added by default by the <NodeActions> of the TreeWithDetails component.
 *
 * @typedef {Object} Props The props you can use (other props are injected if you used it in the <NodeActions>)
 * @param {Prop} props
 * @prop {boolean} undoable Confirm the deletion using an undo button in a notification or a confirmation dialog. Defaults to 'false'.
 * @prop {string} className
 * @prop {string} label MenuItem label. Defaults to 'ra.action.delete, translated.
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
const DeleteMenuItem = forwardRef<HTMLLIElement, DeleteMenuItemProps>(
    ({ undoable = true, ...rest }, ref) =>
        undoable ? (
            <DeleteMenuItemWithUndo {...rest} ref={ref} />
        ) : (
            <DeleteMenuItemWithConfirmation {...rest} ref={ref} />
        )
);

DeleteMenuItem.displayName = 'DeleteMenuItem';

export interface DeleteMenuItemProps extends Omit<MenuItemProps, 'id'> {
    id?: Identifier;
    redirect?: RedirectionSideEffect;
    resource?: string;
    record?: Record;
    undoable?: boolean;
}

export default DeleteMenuItem;
