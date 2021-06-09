import getRCTreeDatum from './getRCTreeDatum';
import { UNSAVED_NEW_NODE } from '../constants';

describe('getRCTreeDatum', () => {
    it('should accept an empty record', () => {
        expect(getRCTreeDatum({ id: 1, children: [] })).toEqual({
            id: 1,
            children: [],
            key: '1',
            title: undefined,
        });
    });
    it('should add key when missing', () => {
        expect(
            getRCTreeDatum({ id: 1, title: 'foo1', children: [3, 4] })
        ).toEqual({ id: 1, title: 'foo1', children: [3, 4], key: '1' });
    });
    it('should add title when missing', () => {
        expect(
            getRCTreeDatum({ id: 1, name: 'foo1', children: [3, 4] }, 'name')
        ).toEqual({
            id: 1,
            name: 'foo1',
            children: [3, 4],
            key: '1',
            title: 'foo1',
        });
    });
    it('should handle unsaved new node specially', () => {
        expect(
            getRCTreeDatum(
                { id: UNSAVED_NEW_NODE, children: [] },
                'name',
                'special'
            )
        ).toEqual({
            id: UNSAVED_NEW_NODE,
            key: UNSAVED_NEW_NODE,
            title: 'special',
            children: [],
        });
    });
});
