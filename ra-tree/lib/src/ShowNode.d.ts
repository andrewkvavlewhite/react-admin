import { ReactElement } from 'react';
import { ShowProps } from 'react-admin';
/**
 * Alternative to <Show> for tree nodes.
 *
 * Adds a button to add a child node in view actions.
 */
declare const ShowNode: (props: ShowProps & {
    children: ReactElement;
}) => ReactElement;
export default ShowNode;
