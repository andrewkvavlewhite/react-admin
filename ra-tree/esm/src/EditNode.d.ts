import { ReactElement } from 'react';
import { EditProps } from 'react-admin';
/**
 * Alternative to <Edit> for tree nodes.
 *
 * Adds a button to add a child node in view actions.
 */
declare const EditNode: (props: EditProps & {
    children: ReactElement;
}) => ReactElement;
export default EditNode;
