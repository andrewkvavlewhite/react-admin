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
const deleteBranchByDeletingAllChildren = async (
    dataProvider: DataProvider & TreeDataProvider,
    resource: string,
    params
): Promise<{ data: Record }> => {
    const deleteBranch = async params => {
        // Get the node children
        const { data: children } = await dataProvider.getChildNodes(resource, {
            parentId: params.id,
        });

        if (children.length > 0) {
            // Recursivly delete all the node children
            await Promise.all(
                children.map(child =>
                    deleteBranch({
                        id: child.id,
                        data: child,
                    })
                )
            );
        }

        // Delete the node
        await dataProvider.delete(resource, {
            id: params.id,
            previousData: params.data,
        });
    };

    await deleteBranch(params);

    return { data: params.data };
};

export default deleteBranchByDeletingAllChildren;
