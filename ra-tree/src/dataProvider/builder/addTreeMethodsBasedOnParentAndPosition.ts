import { DataProvider } from 'react-admin';
import { TreeDataProvider, TreeRecord } from '../../types';
import deleteBranchByDeletingAllChildren from './deleteBranchByDeletingAllChildren';
import deleteBranchByDeletingNode from './deleteBranchByDeletingNode';

/**
 * Provided the records contain a parent_id and a position field,
 * augment a dataProvider by adding the Tree methods (getTree, getRootNodes, etc).
 *
 * These methods will call regular dataProvider methods (getList, getOne, update).
 *
 * @warning Do not use in production.
 *
 * The added Tree methods call the API way too much, sometimes asking for the
 * entire tree. In practice, you should implement an optimized API route for
 * each of the Tree methods.
 *
 * @example // Compatible APIs should return records like
 * {
 *     id: 1234,
 *     name: 'hello',
 *     parent_id: 35,
 *     position: 4, // zero-based
 * }
 *
 * @param {DataProvider} dataProvider The dataProvider to augment
 * @param {string} parentIdField The name of the field containing the parent id. Defaults to 'parent_id'
 * @param {string} positionField The name of the field containing the position of a node inside its parent. Defaults to 'position'
 * @param {boolean} apiSupportBranchDeletion Indicates whether the API will handle children deletion when deleting a node as well as the siblings update. If false, the dataProvider will handle it by making multiple requests in the right order. Defaults to `false`.
 */
const addTreeMethodsBasedOnParentAndPosition = (
    dataProvider: DataProvider,
    parentIdField = 'parent_id',
    positionField = 'position',
    apiSupportBranchDeletion = false
): DataProvider & TreeDataProvider => {
    const deleteBranch = apiSupportBranchDeletion
        ? deleteBranchByDeletingNode
        : deleteBranchByDeletingAllChildren;

    const treeDataProvider = {
        ...dataProvider,

        getTree: async (resource: string): Promise<{ data: TreeRecord[] }> => {
            // get all records
            const { data } = await dataProvider.getList(resource, {
                filter: {},
                sort: { field: positionField, order: 'ASC' },
                pagination: { page: 1, perPage: 1000 },
            });
            // fill children for each record
            // FIXME o(n2)
            const treeRecords = data.map(record => ({
                ...record,
                children: data
                    .filter(r => r[parentIdField] == record.id)
                    .sort((a, b) => a[positionField] - b[positionField])
                    .map(child => child.id),
            }));
            return {
                data: treeRecords,
            };
        },

        getRootNodes: async (
            resource: string
        ): Promise<{ data: TreeRecord[] }> => {
            // get root records
            const { data } = await dataProvider.getList(resource, {
                filter: { [parentIdField]: null },
                sort: { field: positionField, order: 'ASC' },
                pagination: { page: 1, perPage: 1000 },
            });
            // fill children for each record
            const treeRecords = await Promise.all(
                data.map(record =>
                    dataProvider
                        .getList(resource, {
                            filter: { [parentIdField]: record.id },
                            sort: {
                                field: positionField,
                                order: 'ASC',
                            },
                            pagination: { page: 1, perPage: 1000 },
                        })
                        .then(({ data }) => ({
                            ...record,
                            children: data.map(({ id }) => id),
                        }))
                )
            );
            return {
                data: treeRecords,
            };
        },

        getParentNode: async (resource, { childId }) => {
            const { data: tree } = await treeDataProvider.getTree(resource);
            const child = tree.find(node => node.id === childId);

            if (!child) {
                return { data: undefined };
            }

            const parent = tree.find(node => node.id === child[parentIdField]);

            return {
                data: parent,
            };
        },

        getChildNodes: async (
            resource: string,
            { parentId }
        ): Promise<{ data: TreeRecord[] }> => {
            // get child records
            const { data } = await dataProvider.getList(resource, {
                filter: { [parentIdField]: parentId },
                sort: { field: positionField, order: 'ASC' },
                pagination: { page: 1, perPage: 1000 },
            });
            // fill children for each record
            const treeRecords = await Promise.all(
                data.map(record =>
                    dataProvider
                        .getList(resource, {
                            filter: { [parentIdField]: record.id },
                            sort: {
                                field: positionField,
                                order: 'ASC',
                            },
                            pagination: { page: 1, perPage: 1000 },
                        })
                        .then(({ data }) => ({
                            ...record,
                            children: data.map(({ id }) => id),
                        }))
                )
            );
            return {
                data: treeRecords,
            };
        },

        moveAsNthChildOf: async (
            resource: string,
            { source, destination, position }
        ): Promise<{ data: any }> => {
            // 1. Increment the position of all destination child nodes after the position
            const destinationSiblings = (
                await dataProvider.getList(resource, {
                    filter: {
                        [parentIdField]: destination.id,
                        [`${positionField}_gte`]: position,
                    },
                    sort: {
                        field: positionField,
                        order: 'ASC',
                    },
                    pagination: { page: 1, perPage: 1000 },
                })
            ).data;
            if (destinationSiblings.length > 0) {
                await Promise.all(
                    destinationSiblings.map(item =>
                        dataProvider.update(resource, {
                            id: item.id,
                            data: { [positionField]: item[positionField] + 1 },
                            previousData: item,
                        })
                    )
                );
            }
            // 2. Decrement the position of all nodes after the source node
            const sourceSiblings = (
                await dataProvider.getList(resource, {
                    filter: {
                        [parentIdField]: source[parentIdField],
                        [`${positionField}_gt`]: source[positionField],
                    },
                    sort: {
                        field: positionField,
                        order: 'ASC',
                    },
                    pagination: { page: 1, perPage: 1000 },
                })
            ).data;
            if (sourceSiblings.length > 0) {
                await Promise.all(
                    sourceSiblings.map(item =>
                        dataProvider.update(resource, {
                            id: item.id,
                            data: { [positionField]: item[positionField] - 1 },
                            previousData: item,
                        })
                    )
                );
            }
            // 3. Change the parent and position of the source node
            await dataProvider.update(resource, {
                id: source.id,
                data: {
                    [parentIdField]: destination.id,
                    [positionField]: position,
                },
                previousData: source,
            });
            return { data: {} };
        },

        moveAsNthSiblingOf: async (
            resource: string,
            { source, destination, position }
        ): Promise<{ data: any }> => {
            // 1. Increment the position of all nodes after the destination
            let destinationSiblingsToUpdateFilter;
            if (
                (source[positionField] > destination[positionField] &&
                    source[parentIdField] === destination[parentIdField]) ||
                position === 0
            ) {
                destinationSiblingsToUpdateFilter = {
                    [parentIdField]: destination[parentIdField],
                    [`${positionField}_gte`]: destination[positionField],
                };
            }
            if (
                source[parentIdField] !== destination[parentIdField] &&
                position > 0
            ) {
                destinationSiblingsToUpdateFilter = {
                    [parentIdField]: destination[parentIdField],
                    [`${positionField}_gt`]: destination[positionField],
                };
            }
            if (destinationSiblingsToUpdateFilter) {
                const {
                    data: destinationSiblings,
                } = await dataProvider.getList(resource, {
                    filter: destinationSiblingsToUpdateFilter,
                    sort: {
                        field: positionField,
                        order: 'ASC',
                    },
                    pagination: { page: 1, perPage: 1000 },
                });

                if (destinationSiblings.length > 0) {
                    await Promise.all<any>(
                        destinationSiblings.map(item =>
                            item.id === source.id
                                ? Promise.resolve(undefined)
                                : dataProvider.update(resource, {
                                      id: item.id,
                                      data: {
                                          [positionField]:
                                              item[positionField] + 1,
                                      },
                                      previousData: item,
                                  })
                        )
                    );
                }
            }
            // 2. Decrement the position of all nodes after the source node
            let sourceSiblingsToUpdateFilters;

            if (source[parentIdField] === destination[parentIdField]) {
                sourceSiblingsToUpdateFilters = {
                    [parentIdField]: source[parentIdField],
                    [`${positionField}_gt`]: source[positionField],
                    [`${positionField}_lte`]: destination[positionField],
                };
            } else {
                sourceSiblingsToUpdateFilters = {
                    [parentIdField]: source[parentIdField],
                    [`${positionField}_gt`]: source[positionField],
                };
            }
            const sourceSiblings = (
                await dataProvider.getList(resource, {
                    filter: sourceSiblingsToUpdateFilters,
                    sort: {
                        field: positionField,
                        order: 'ASC',
                    },
                    pagination: { page: 1, perPage: 1000 },
                })
            ).data;
            if (sourceSiblings.length > 0) {
                await Promise.all(
                    sourceSiblings.map(item =>
                        item.id === source.id
                            ? Promise.resolve(undefined)
                            : dataProvider.update(resource, {
                                  id: item.id,
                                  data: {
                                      [positionField]: item[positionField] - 1,
                                  },
                                  previousData: item,
                              })
                    )
                );
            }
            // 3. Change the parent and position of the source node
            await dataProvider.update(resource, {
                id: source.id,
                data: {
                    [parentIdField]: destination.parent_id,
                    [positionField]:
                        source[parentIdField] === destination[parentIdField]
                            ? destination[positionField]
                            : position,
                },
                previousData: source,
            });
            return { data: {} };
        },

        addRootNode: async (
            resource: string,
            { data }
        ): Promise<{ data: TreeRecord }> => {
            // get root records to compute position
            const { data: roots } = await dataProvider.getList(resource, {
                filter: { [parentIdField]: null },
                sort: { field: positionField, order: 'ASC' },
                pagination: { page: 1, perPage: 1000 },
            });
            const rootPosition =
                roots.length > 0
                    ? roots.reduce(
                          (acc, curr) =>
                              curr[positionField] > acc
                                  ? curr[positionField]
                                  : acc,
                          -Infinity
                      ) + 1
                    : 0;
            const { data: newRoot } = await dataProvider.create(resource, {
                data: {
                    ...data,
                    [parentIdField]: null,
                    [positionField]: rootPosition,
                },
            });
            return { data: { ...newRoot, children: [] } };
        },

        addChildNode: async (
            resource: string,
            { parentId, data }
        ): Promise<{ data: TreeRecord }> => {
            // get child records to compute position
            const { data: siblings } = await dataProvider.getList(resource, {
                filter: { [parentIdField]: parentId },
                sort: { field: positionField, order: 'ASC' },
                pagination: { page: 1, perPage: 1000 },
            });
            const childPosition =
                siblings.length > 0
                    ? siblings.reduce(
                          (acc, curr) =>
                              curr[positionField] > acc
                                  ? curr[positionField]
                                  : acc,
                          -Infinity
                      ) + 1
                    : 0;
            const { data: newRoot } = await dataProvider.create(resource, {
                data: {
                    ...data,
                    [parentIdField]: parentId,
                    [positionField]: childPosition,
                },
            });
            return { data: { ...newRoot, children: [] } };
        },

        deleteBranch: async (resource: string, params) => {
            const { id, data } = params;
            // Deletion of the record itself must be handled by specialized method.
            await deleteBranch(treeDataProvider, resource, params);

            // However, we must update the node siblings position.

            // get the siblings
            const { data: siblings } = await treeDataProvider.getChildNodes(
                resource,
                {
                    parentId: data[parentIdField],
                }
            );

            // update the siblings position
            await Promise.all(
                siblings
                    .filter(
                        node =>
                            node[positionField] > data[positionField] &&
                            node.id !== id
                    )
                    .map(node =>
                        dataProvider.update(resource, {
                            id: node.id,
                            data: {
                                ...node,
                                [positionField]: node[positionField] - 1,
                            },
                            previousData: node,
                        })
                    )
            );

            return { data };
        },
    };

    return treeDataProvider;
};

export default addTreeMethodsBasedOnParentAndPosition;
