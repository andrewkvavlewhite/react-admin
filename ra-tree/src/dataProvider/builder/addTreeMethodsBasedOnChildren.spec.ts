import fakeRestProvider from 'ra-data-fakerest';
import addTreeMethodsBasedOnChildren from './addTreeMethodsBasedOnChildren';
import clone from 'lodash/cloneDeep';

describe('addTreeMethodsBasedOnChildren', () => {
    const data = {
        categories: [
            { id: 1, name: 'Clothing', isRoot: true, children: [2, 6] },
            { id: 2, name: 'Men', children: [3] },
            { id: 3, name: 'Suits', children: [4, 5] },
            { id: 4, name: 'Slacks', children: [] },
            { id: 5, name: 'Jackets', children: [] },
            { id: 6, name: 'Women', children: [7, 10, 11] },
            { id: 7, name: 'Dresses', children: [8, 9] },
            { id: 8, name: 'Evening Gowns', children: [] },
            { id: 9, name: 'Sun Dresses', children: [] },
            { id: 10, name: 'Skirts', children: [] },
            { id: 11, name: 'Blouses', children: [] },
        ],
    };

    const dataProvider = addTreeMethodsBasedOnChildren(
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
                    },
                    destination: {
                        children: [],
                        id: 11,
                        name: 'Blouses',
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
                        children: [],
                    },
                    {
                        id: 11,
                        name: 'Blouses',
                        children: [],
                    },
                    {
                        id: 7,
                        name: 'Dresses',
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
                    },
                    destination: {
                        children: [8, 9],
                        id: 7,
                        name: 'Dresses',
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
                        children: [],
                    },
                    {
                        id: 7,
                        name: 'Dresses',
                        children: [8, 9],
                    },
                    {
                        id: 10,
                        name: 'Skirts',
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
                    },
                    destination: {
                        id: 10,
                        name: 'Skirts',
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
                        children: [],
                    },
                    {
                        id: 7,
                        name: 'Dresses',
                        children: [8, 9],
                    },
                    {
                        id: 11,
                        name: 'Blouses',
                        children: [],
                    },
                ]);
            });

            test('should move last node inbetween in same parent correctly', async () => {
                await dataProvider.moveAsNthSiblingOf('categories', {
                    source: {
                        id: 11,
                        name: 'Blouses',
                        children: [],
                    },
                    destination: {
                        id: 10,
                        name: 'Skirts',
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
                        children: [8, 9],
                    },
                    {
                        id: 11,
                        name: 'Blouses',
                        children: [],
                    },
                    {
                        id: 10,
                        name: 'Skirts',
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
                        children: [],
                    },
                    destination: {
                        children: [],
                        id: 11,
                        name: 'Blouses',
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
                        children: [9],
                    },
                    {
                        id: 10,
                        name: 'Skirts',
                        children: [],
                    },
                    {
                        id: 11,
                        name: 'Blouses',
                        children: [],
                    },
                    {
                        id: 8,
                        name: 'Evening Gowns',
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
                        children: [],
                    },
                ]);
            });

            test('should move node to first node in another parent correctly', async () => {
                await dataProvider.moveAsNthSiblingOf('categories', {
                    source: {
                        id: 8,
                        name: 'Evening Gowns',
                        children: [],
                    },
                    destination: {
                        children: [8, 9],
                        id: 7,
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
                        children: [],
                    },
                    {
                        id: 7,
                        name: 'Dresses',
                        children: [9],
                    },
                    {
                        id: 10,
                        name: 'Skirts',
                        children: [],
                    },
                    {
                        id: 11,
                        name: 'Blouses',
                        children: [],
                    },
                ]);
            });

            test('should move node before last node in another parent correctly', async () => {
                await dataProvider.moveAsNthSiblingOf('categories', {
                    source: {
                        id: 8,
                        name: 'Evening Gowns',
                        children: [],
                    },
                    destination: {
                        id: 10,
                        name: 'Skirts',
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
                        children: [9],
                    },
                    {
                        id: 10,
                        name: 'Skirts',
                        children: [],
                    },
                    {
                        id: 8,
                        name: 'Evening Gowns',
                        children: [],
                    },
                    {
                        id: 11,
                        name: 'Blouses',
                        children: [],
                    },
                ]);
            });
        });
    });
});
