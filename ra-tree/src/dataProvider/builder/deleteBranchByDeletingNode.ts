import { DataProvider, Record } from 'react-admin';
import { TreeDataProvider } from '../../types';

/**
 * If the API handles children of a node when it is deleted, this function
 * augments the existing dataProvider with a deleteBranch implementation which will
 * just use the default delete method of the dataProvider.
 *
 * @warning Do not use in production.
 *
 * The added Tree methods call the API way too much, sometimes asking for the
 * entire tree. In practice, you should implement an optimized API route for
 * each of the Tree methods.
 *
 * @param dataProvider The dataProvider with tree support
 */
const addSimpleDeleteBranch = async (
    dataProvider: DataProvider & TreeDataProvider,
    resource: string,
    { data }
): Promise<{ data: Record }> => {
    await dataProvider.delete(resource, {
        id: data.id,
        previousData: data,
    });

    return { data };
};

export default addSimpleDeleteBranch;
