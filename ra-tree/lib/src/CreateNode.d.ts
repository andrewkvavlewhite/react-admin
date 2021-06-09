import { ReactElement } from 'react';
import { CreateProps } from 'react-admin';
/**
 * Alternative to <Create> for tree nodes.
 *
 * Upon creation, calls the dataProvider.addRootNode() or dataProvider.addChildNode()
 * (depending on the presence of a parentId in the location state) instead of
 * dataProvider.create().
 */
declare const CreateNode: (props: CreateProps & {
    children: ReactElement;
}) => ReactElement;
export default CreateNode;
