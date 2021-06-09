import { resolveResourceLocationInfo } from './resolveResourceLocationInfo';

const fakeResource = {
    name: 'songs',
    hasList: true,
    hasEdit: true,
    hasCreate: true,
    hasShow: true,
};

describe('resolveResourceLocationInfo', () => {
    it('should return the right ResourceLocationInfo from pathname and resources', () => {
        expect(resolveResourceLocationInfo('/songs', [fakeResource])).toEqual({
            resource: 'songs',
            type: 'list',
        });

        expect(
            resolveResourceLocationInfo('/songs/create', [fakeResource])
        ).toEqual({ resource: 'songs', type: 'create' });

        expect(
            resolveResourceLocationInfo('/songs/42/show', [fakeResource])
        ).toEqual({ resource: 'songs', type: 'show', resourceId: '42' });

        expect(
            resolveResourceLocationInfo('/songs/42', [fakeResource])
        ).toEqual({ resource: 'songs', type: 'edit', resourceId: '42' });

        expect(
            resolveResourceLocationInfo('/others', [fakeResource])
        ).toBeNull();
    });
});
