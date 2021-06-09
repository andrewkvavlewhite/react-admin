import { buildResourcesBreadcrumbPaths } from './useResourcesBreadcrumbPaths';
import { GetLabelFunction } from './BreadcrumbItem';

describe('useResourcesBreadcrumbPaths', () => {
    describe('buildResourcesBreadcrumbPaths', () => {
        it('should build breadcrumb paths from ressources array', () => {
            const translate = jest.fn((x: string): string => x);
            const getResourceLabel = (
                resource: string,
                count: number
            ): string => `${resource} ${count}`;

            const paths = buildResourcesBreadcrumbPaths(
                [
                    {
                        name: 'song',
                        hasList: true,
                        hasEdit: true,
                        hasCreate: true,
                        hasShow: true,
                    },
                    {
                        name: 'recipe',
                        hasList: false,
                        hasEdit: false,
                        hasCreate: false,
                        hasShow: false,
                    },
                ],
                translate,
                getResourceLabel
            );
            expect(paths).toEqual({
                song: {
                    label: 'song 2',
                    to: '/song',
                },
                'song.create': {
                    label: 'ra.action.create',
                    to: '/song/create',
                },
                'song.edit': {
                    label: expect.any(Function),
                    to: expect.any(Function),
                },
                'song.show': {
                    label: expect.any(Function),
                    to: expect.any(Function),
                },
                recipe: {
                    label: 'recipe 2',
                    to: '/recipe',
                },

                'recipe.create': {
                    label: 'ra.page.create',
                    to: '/recipe/create',
                },
                'recipe.edit': {
                    label: expect.any(Function),
                    to: expect.any(Function),
                },
                'recipe.show': {
                    label: expect.any(Function),
                    to: expect.any(Function),
                },
            });
            expect(
                (paths['song.edit'].label as GetLabelFunction)({
                    record: { id: 1 },
                })
            ).toEqual('#1');
            expect(
                (paths['song.show'].label as GetLabelFunction)({
                    record: { id: 1 },
                })
            ).toEqual('#1');

            (paths['recipe.edit'].label as GetLabelFunction)({
                record: { id: 1 },
            });
            expect(translate).toHaveBeenCalledWith('ra.page.edit', {
                name: 'recipe 1',
                id: 1,
                record: { id: 1 },
            });
            (paths['recipe.show'].label as GetLabelFunction)({
                record: { id: 1 },
            });
            expect(translate).toHaveBeenCalledWith('ra.page.show', {
                name: 'recipe 1',
                id: 1,
                record: { id: 1 },
            });
        });

        it('should add correct sub paths from resources CRUD enabled actions', () => {
            const translate = jest.fn((x: string): string => x);
            const getResourceLabel = (
                resource: string,
                count: number
            ): string => `${resource} ${count}`;

            const resourceBreadcrumbPaths = buildResourcesBreadcrumbPaths(
                [
                    {
                        name: 'song',
                        hasCreate: true,
                        hasList: false,
                        hasEdit: true,
                        hasShow: false,
                    },
                    {
                        name: 'recipe',
                        hasCreate: false,
                        hasList: true,
                        hasEdit: false,
                        hasShow: true,
                    },
                ],
                translate,
                getResourceLabel
            );

            expect(resourceBreadcrumbPaths).toMatchObject({
                recipe: { label: 'recipe 2', to: '/recipe' },
                'song.create': {
                    label: 'ra.page.create',
                    to: '/song/create',
                },
            });

            expect(resourceBreadcrumbPaths['recipe.show']).toEqual({
                label: expect.any(Function),
                to: expect.any(Function),
            });

            expect(resourceBreadcrumbPaths['song.edit']).toEqual({
                label: expect.any(Function),
                to: expect.any(Function),
            });
        });
    });
});
