import { groupByDay } from './groupByDay';

describe('groupByDay', () => {
    it('should aggregate events by day', () => {
        const events = [
            {
                id: 1,
                date: '2019-01-05T12:56:31.039Z',
                action: 'create',
                resource: 'products',
                author: { id: 1 },
                payload: {},
            },
            {
                id: 3,
                date: '2019-01-04T12:34:56.789Z',
                action: 'create',
                resource: 'products',
                author: { id: 1 },
                payload: {},
            },
            {
                id: 2,
                date: '2019-01-05T09:12:43.456Z',
                action: 'create',
                resource: 'products',
                author: { id: 1 },
                payload: {},
            },
        ];
        expect(groupByDay(events, 'en')).toEqual([
            {
                label: 'Saturday, January 5, 2019',
                records: [
                    {
                        id: 1,
                        date: '2019-01-05T12:56:31.039Z',
                        action: 'create',
                        resource: 'products',
                        author: { id: 1 },
                        payload: {},
                    },
                    {
                        id: 2,
                        date: '2019-01-05T09:12:43.456Z',
                        action: 'create',
                        resource: 'products',
                        author: { id: 1 },
                        payload: {},
                    },
                ],
            },
            {
                label: 'Friday, January 4, 2019',
                records: [
                    {
                        id: 3,
                        date: '2019-01-04T12:34:56.789Z',
                        action: 'create',
                        resource: 'products',
                        author: { id: 1 },
                        payload: {},
                    },
                ],
            },
        ]);
    });
});
