import { getDeepestLocation } from './getDeepestLocation';

describe('getDeepestLocation', () => {
    test.each([
        [[{ path: 'categories' }], { path: 'categories' }],
        [[{ path: '' }, { path: 'categories' }], { path: 'categories' }],
        [[{ path: 'categories' }, { path: '' }], { path: 'categories' }],
        [
            [
                { path: 'categories' },
                { path: 'categories.edit', values: { record: { id: 1 } } },
            ],
            { path: 'categories.edit', values: { record: { id: 1 } } },
        ],
        [
            [
                { path: 'categories.edit', values: { record: { id: 1 } } },
                { path: 'categories' },
            ],
            { path: 'categories.edit', values: { record: { id: 1 } } },
        ],
    ])('should return deepest location', (locations, expected) => {
        expect(getDeepestLocation(locations)).toEqual(expected);
    });
});
