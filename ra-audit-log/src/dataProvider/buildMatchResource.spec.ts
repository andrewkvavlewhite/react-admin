import { buildMatchActionOnResource } from './buildMatchActionOnResource';

describe('buildMatchActionOnResource', () => {
    test('should return a matcher function returning true for all resources if no options were provided', () => {
        const matchResource = buildMatchActionOnResource();

        expect(matchResource('create', 'products')).toEqual(true);
    });

    test('should return a matcher function returning true for all resources included with their names and false for the others', () => {
        const matchResource = buildMatchActionOnResource({
            resources: ['products'],
        });

        expect(matchResource('create', 'products')).toEqual(true);
        expect(matchResource('create', 'comments')).toEqual(false);
    });

    test('should return a matcher function returning true for all resources included with their names and their mutations, false for the others', () => {
        const matchResource = buildMatchActionOnResource({
            resources: [['products', ['create']]],
        });

        expect(matchResource('create', 'products')).toEqual(true);
        expect(matchResource('update', 'products')).toEqual(false);
        expect(matchResource('create', 'comments')).toEqual(false);
    });
});
