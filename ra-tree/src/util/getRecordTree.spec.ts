import getRecordTree from './getRecordTree';

describe('getRecordTree', () => {
    it('should accept an empty array', () => {
        expect(getRecordTree([])).toEqual([]);
    });
    it('should turn a flat array to a tree', () => {
        expect(
            getRecordTree([
                { id: 1, title: 'foo1', children: [3, 4] },
                { id: 2, title: 'foo2', children: [] },
                { id: 3, title: 'foo3', children: [5] },
                { id: 4, title: 'foo4', children: [] },
                { id: 5, title: 'foo5', children: [] },
            ])
        ).toEqual([
            {
                id: 1,
                key: '1',
                title: 'foo1',
                children: [
                    {
                        id: 3,
                        key: '3',
                        title: 'foo3',
                        children: [
                            { id: 5, key: '5', title: 'foo5', children: [] },
                        ],
                    },
                    { id: 4, key: '4', title: 'foo4', children: [] },
                ],
            },
            { id: 2, key: '2', title: 'foo2', children: [] },
        ]);
    });
});
