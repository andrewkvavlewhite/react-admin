import fakeRestProvider from 'ra-data-fakerest';
import addTreeMethodsBasedOnParentAndPosition from './addTreeMethodsBasedOnParentAndPosition';
import clone from 'lodash/cloneDeep';

describe('addTreeMethodsBasedOnParentAndPosition', () => {
    const data = {
        categories: [
            { id: 1, name: 'Clothing', position: 0 },
            { id: 2, name: 'Men', parent_id: 1, position: 0 },
            { id: 3, name: 'Suits', parent_id: 2, position: 0 },
            { id: 4, name: 'Slacks', parent_id: 3, position: 0 },
            { id: 5, name: 'Jackets', parent_id: 3, position: 1 },
            { id: 6, name: 'Women', parent_id: 1, position: 1 },
            { id: 7, name: 'Dresses', parent_id: 6, position: 0 },
            { id: 8, name: 'Evening Gowns', parent_id: 7, position: 0 },
            { id: 9, name: 'Sun Dresses', parent_id: 7, position: 1 },
            { id: 10, name: 'Skirts', parent_id: 6, position: 1 },
            { id: 11, name: 'Blouses', parent_id: 6, position: 2 },
        ],
    };

    const dataProvider = addTreeMethodsBasedOnParentAndPosition(
        fakeRestProvider(clone(data))
    );

    afterEach(() => {
        // @ts-ignore
        global.restServer.collections = {};
        // @ts-ignore
        global.restServer.init(clone(data));
    });

    describe('moveAsNthSiblingOf', () => {
        describe('with same parent', () => {
            test('should move first node to last node in same parent correctly', async () => {
                await dataProvider.moveAsNthSiblingOf('categories', {
                    source: {
                        children: [8, 9],
                        id: 7,
                        name: 'Dresses',
                        parent_id: 6,
                        position: 0,
                    },
                    destination: {
                        children: [],
                        id: 11,
                        name: 'Blouses',
                        parent_id: 6,
                        position: 2,
                    },
                    position: 3,
                });

                const { data: records } = await dataProvider.getChildNodes(
                    'categories',
                    {
                        parentId: 6,
                    }
                );
                expect(records).toEqual([
                    {
                        id: 10,
                        name: 'Skirts',
                        parent_id: 6,
                        position: 0,
                        children: [],
                    },
                    {
                        id: 11,
                        name: 'Blouses',
                        parent_id: 6,
                        position: 1,
                        children: [],
                    },
                    {
                        id: 7,
                        name: 'Dresses',
                        parent_id: 6,
                        position: 2,
                        children: [8, 9],
                    },
                ]);
            });

            test('should move last node to first node in same parent correctly', async () => {
                await dataProvider.moveAsNthSiblingOf('categories', {
                    source: {
                        children: [],
                        id: 11,
                        name: 'Blouses',
                        parent_id: 6,
                        position: 2,
                    },
                    destination: {
                        children: [8, 9],
                        id: 7,
                        name: 'Dresses',
                        parent_id: 6,
                        position: 0,
                    },
                    position: 0,
                });

                const { data: records } = await dataProvider.getChildNodes(
                    'categories',
                    {
                        parentId: 6,
                    }
                );
                expect(records).toEqual([
                    {
                        id: 11,
                        name: 'Blouses',
                        parent_id: 6,
                        position: 0,
                        children: [],
                    },
                    {
                        id: 7,
                        name: 'Dresses',
                        parent_id: 6,
                        position: 1,
                        children: [8, 9],
                    },
                    {
                        id: 10,
                        name: 'Skirts',
                        parent_id: 6,
                        position: 2,
                        children: [],
                    },
                ]);
            });

            test('should move first node before last node in same parent correctly', async () => {
                await dataProvider.moveAsNthSiblingOf('categories', {
                    source: {
                        children: [8, 9],
                        id: 7,
                        name: 'Dresses',
                        parent_id: 6,
                        position: 0,
                    },
                    destination: {
                        id: 10,
                        name: 'Skirts',
                        parent_id: 6,
                        position: 1,
                        children: [],
                    },
                    position: 2,
                });

                const { data: records } = await dataProvider.getChildNodes(
                    'categories',
                    {
                        parentId: 6,
                    }
                );
                expect(records).toEqual([
                    {
                        id: 10,
                        name: 'Skirts',
                        parent_id: 6,
                        position: 0,
                        children: [],
                    },
                    {
                        id: 7,
                        name: 'Dresses',
                        parent_id: 6,
                        position: 1,
                        children: [8, 9],
                    },
                    {
                        id: 11,
                        name: 'Blouses',
                        parent_id: 6,
                        position: 2,
                        children: [],
                    },
                ]);
            });

            test('should move last node inbetween in same parent correctly', async () => {
                await dataProvider.moveAsNthSiblingOf('categories', {
                    source: {
                        id: 11,
                        name: 'Blouses',
                        parent_id: 6,
                        position: 2,
                        children: [],
                    },
                    destination: {
                        id: 10,
                        name: 'Skirts',
                        parent_id: 6,
                        position: 1,
                        children: [],
                    },
                    position: 1,
                });

                const { data: records } = await dataProvider.getChildNodes(
                    'categories',
                    {
                        parentId: 6,
                    }
                );
                expect(records).toEqual([
                    {
                        id: 7,
                        name: 'Dresses',
                        parent_id: 6,
                        position: 0,
                        children: [8, 9],
                    },
                    {
                        id: 11,
                        name: 'Blouses',
                        parent_id: 6,
                        position: 1,
                        children: [],
                    },
                    {
                        id: 10,
                        name: 'Skirts',
                        parent_id: 6,
                        position: 2,
                        children: [],
                    },
                ]);
            });
        });

        describe('with different parent', () => {
            test('should move node to last node in another parent correctly', async () => {
                await dataProvider.moveAsNthSiblingOf('categories', {
                    source: {
                        id: 8,
                        name: 'Evening Gowns',
                        parent_id: 7,
                        position: 0,
                        children: [],
                    },
                    destination: {
                        children: [],
                        id: 11,
                        name: 'Blouses',
                        parent_id: 6,
                        position: 2,
                    },
                    position: 3,
                });

                const {
                    data: destinationNodes,
                } = await dataProvider.getChildNodes('categories', {
                    parentId: 6,
                });
                expect(destinationNodes).toEqual([
                    {
                        id: 7,
                        name: 'Dresses',
                        parent_id: 6,
                        position: 0,
                        children: [9],
                    },
                    {
                        id: 10,
                        name: 'Skirts',
                        parent_id: 6,
                        position: 1,
                        children: [],
                    },
                    {
                        id: 11,
                        name: 'Blouses',
                        parent_id: 6,
                        position: 2,
                        children: [],
                    },
                    {
                        id: 8,
                        name: 'Evening Gowns',
                        parent_id: 6,
                        position: 3,
                        children: [],
                    },
                ]);
                const { data: sourceNodes } = await dataProvider.getChildNodes(
                    'categories',
                    {
                        parentId: 7,
                    }
                );
                expect(sourceNodes).toEqual([
                    {
                        id: 9,
                        name: 'Sun Dresses',
                        parent_id: 7,
                        position: 0,
                        children: [],
                    },
                ]);
            });

            test('should move node to first node in another parent correctly', async () => {
                await dataProvider.moveAsNthSiblingOf('categories', {
                    source: {
                        id: 8,
                        name: 'Evening Gowns',
                        parent_id: 7,
                        position: 0,
                        children: [],
                    },
                    destination: {
                        children: [8, 9],
                        id: 7,
                        name: 'Dresses',
                        parent_id: 6,
                        position: 0,
                    },
                    position: 0,
                });

                const { data: records } = await dataProvider.getChildNodes(
                    'categories',
                    {
                        parentId: 6,
                    }
                );
                expect(records).toEqual([
                    {
                        id: 8,
                        name: 'Evening Gowns',
                        parent_id: 6,
                        position: 0,
                        children: [],
                    },
                    {
                        id: 7,
                        name: 'Dresses',
                        parent_id: 6,
                        position: 1,
                        children: [9],
                    },
                    {
                        id: 10,
                        name: 'Skirts',
                        parent_id: 6,
                        position: 2,
                        children: [],
                    },
                    {
                        id: 11,
                        name: 'Blouses',
                        parent_id: 6,
                        position: 3,
                        children: [],
                    },
                ]);

                const { data: sourceNodes } = await dataProvider.getChildNodes(
                    'categories',
                    {
                        parentId: 7,
                    }
                );
                expect(sourceNodes).toEqual([
                    {
                        id: 9,
                        name: 'Sun Dresses',
                        parent_id: 7,
                        position: 0,
                        children: [],
                    },
                ]);
            });

            test('should move node before last node in another parent correctly', async () => {
                await dataProvider.moveAsNthSiblingOf('categories', {
                    source: {
                        id: 8,
                        name: 'Evening Gowns',
                        parent_id: 7,
                        position: 0,
                        children: [],
                    },
                    destination: {
                        id: 10,
                        name: 'Skirts',
                        parent_id: 6,
                        position: 1,
                        children: [],
                    },
                    position: 2,
                });

                const { data: records } = await dataProvider.getChildNodes(
                    'categories',
                    {
                        parentId: 6,
                    }
                );
                expect(records).toEqual([
                    {
                        id: 7,
                        name: 'Dresses',
                        parent_id: 6,
                        position: 0,
                        children: [9],
                    },
                    {
                        id: 10,
                        name: 'Skirts',
                        parent_id: 6,
                        position: 1,
                        children: [],
                    },
                    {
                        id: 8,
                        name: 'Evening Gowns',
                        parent_id: 6,
                        position: 2,
                        children: [],
                    },
                    {
                        id: 11,
                        name: 'Blouses',
                        parent_id: 6,
                        position: 3,
                        children: [],
                    },
                ]);

                const { data: sourceNodes } = await dataProvider.getChildNodes(
                    'categories',
                    {
                        parentId: 7,
                    }
                );
                expect(sourceNodes).toEqual([
                    {
                        id: 9,
                        name: 'Sun Dresses',
                        parent_id: 7,
                        position: 0,
                        children: [],
                    },
                ]);
            });
        });
    });
});
