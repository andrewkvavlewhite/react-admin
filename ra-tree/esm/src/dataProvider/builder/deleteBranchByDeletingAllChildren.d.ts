import { DataProvider, Record } from 'react-admin';
import { TreeDataProvider } from '../../types';
/**
 * If the API does not handle the children of a node when it is deleted, this function
 * augment the existing dataProvider with a deleteBranch implementation which will
 * delete all children first recursivly.
 *
 * @warning Do not use in production.
 *
 * The added Tree methods call the API way too much, sometimes asking for the
 * entire tree. In practice, you should implement an optimized API route for
 * each of the Tree methods.
 *
 * @param dataProvider The dataProvider with tree support
 */
declare const deleteBranchByDeletingAllChildren: (dataProvider: DataProvider & TreeDataProvider, resource: string, params: any) => Promise<{
    data: Record;
}>;
export default deleteBranchByDeletingAllChildren;
