import { getActionLink, LinkType } from './useGetActionLink';

describe('getActionLink', () => {
    const resources = [
        {
            name: 'posts',
            hasCreate: true,
            hasEdit: true,
            hasList: true,
            hasShow: true,
        },
        {
            name: 'comments',
            hasCreate: true,
            hasEdit: false,
            hasList: true,
            hasShow: true,
        },
        {
            name: 'reviews',
            hasCreate: true,
            hasEdit: false,
            hasList: false,
            hasShow: true,
        },
    ];

    test.each([['delete'], ['deleteMany'], ['deleteBranch']])(
        'should not return a valid path for event action %s',
        action => {
            expect(
                getActionLink(resources, {
                    id: 1,
                    date: new Date(),
                    resource: 'posts',
                    action,
                    payload: {
                        id: 123,
                    },
                    author: {
                        id: 456,
                    },
                })
            ).toBeUndefined();
        }
    );

    test('should not return a valid path when event payload has no single id', () => {
        expect(
            getActionLink(resources, {
                id: 1,
                date: new Date(),
                resource: 'posts',
                action: 'updateMany',
                payload: {
                    ids: [123, 456],
                },
                author: {
                    id: 456,
                },
            })
        ).toBeUndefined();
    });

    test.each([
        ['create', undefined],
        ['create', 'show' as LinkType],
        ['update', undefined],
        ['update', 'show' as LinkType],
    ])(
        'should return a valid path when event payload has single id and is not a deletion action',
        (action, linkType) => {
            expect(
                getActionLink(
                    resources,
                    {
                        id: 1,
                        date: new Date(),
                        resource: 'posts',
                        action,
                        payload: {
                            data: {
                                id: 123,
                            },
                        },
                        author: {
                            id: 456,
                        },
                    },
                    linkType
                )
            ).toEqual(`/posts/123${linkType === 'show' ? '/show' : ''}`);
        }
    );
});
