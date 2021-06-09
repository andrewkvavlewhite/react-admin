import React from 'react';
import { act } from '@testing-library/react';
import {
    DataProvider,
    DataProviderContext,
    SimpleShowLayout,
    TextField,
} from 'react-admin';
import { renderWithRedux } from 'ra-test';

import { RealTimeShow } from '.';

describe('RealTimeShow', () => {
    it('should display a warning on the show view by default after the external delete', async () => {
        let subscriptions: any = [];

        const dataProvider = {
            create: jest.fn(() => Promise.resolve({ data: { id: 123 } })),
            delete: jest.fn(() => Promise.resolve({ data: { id: 123 } })),
            deleteMany: jest.fn(() => Promise.resolve({ data: [] })),
            update: jest.fn(() => Promise.resolve({ data: { id: 123 } })),
            updateMany: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
            getList: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
            getMany: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
            getOne: jest.fn(() => Promise.resolve({ data: { id: 123 } })),
            getManyReference: jest.fn(() =>
                Promise.resolve({
                    data: [],
                    total: 0,
                })
            ),
            subscribe: jest.fn((topic, callback) => {
                subscriptions.push({
                    topic,
                    subscriptionCallback: jest.fn(callback),
                });
                return Promise.resolve({ data: null });
            }),

            unsubscribe: jest.fn((topic, callback) => {
                subscriptions = subscriptions.filter(
                    subscription =>
                        subscription.topic !== topic ||
                        subscription.subscriptionCallback !== callback
                );
                return Promise.resolve({ data: null });
            }),
            publish: jest.fn((topic, event) => {
                subscriptions.map(subscription => {
                    topic === subscription.topic &&
                        subscription.subscriptionCallback(event);
                });
                return Promise.resolve({ data: null });
            }),
        } as DataProvider;

        const defaultShowProps = {
            basePath: '/',
            id: '123',
            resource: 'artists',
        };

        const { unmount, queryAllByText } = renderWithRedux(
            <DataProviderContext.Provider value={dataProvider}>
                <RealTimeShow {...defaultShowProps}>
                    <SimpleShowLayout>
                        <TextField source="title" />
                    </SimpleShowLayout>
                </RealTimeShow>
            </DataProviderContext.Provider>,
            {
                admin: {
                    resources: {
                        artists: {
                            data: { 123: { title: 'Hello' } },
                            list: {
                                selectedIds: [],
                                ids: [123],
                                params: { page: 1, filter: {} },
                                total: 0,
                            },
                        },
                    },
                },
            }
        );

        expect(dataProvider.subscribe).toHaveBeenCalledTimes(1);
        expect(dataProvider.subscribe.mock.calls[0][0]).toBe(
            'resource/artists/123'
        );

        const newEventCatched = {
            topic: 'resource/artists/123',
            type: 'deleted',
            date: new Date(),
            payload: { id: 123 },
            text: 'Something',
        };
        act(() => {
            dataProvider.publish('resource/artists/123', newEventCatched);
        });

        expect(subscriptions[0].subscriptionCallback).toHaveBeenCalledTimes(1);
        expect(subscriptions[0].subscriptionCallback.mock.calls[0][0]).toBe(
            newEventCatched
        );

        expect(
            queryAllByText('ra-realtime.notification.record.deleted')
        ).toHaveLength(1);

        unmount();

        expect(dataProvider.unsubscribe).toHaveBeenCalled();
        expect(dataProvider.unsubscribe.mock.calls[0][0]).toBe(
            'resource/artists/123'
        );
    });

    it('should allow to customize side effects triggered when an event is received', async () => {
        let subscriptions: any = [];

        const dataProvider = {
            create: jest.fn(() => Promise.resolve({ data: { id: 123 } })),
            delete: jest.fn(() => Promise.resolve({ data: { id: 123 } })),
            deleteMany: jest.fn(() => Promise.resolve({ data: [] })),
            update: jest.fn(() => Promise.resolve({ data: { id: 123 } })),
            updateMany: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
            getList: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
            getMany: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
            getOne: jest.fn(() => Promise.resolve({ data: { id: 123 } })),
            getManyReference: jest.fn(() =>
                Promise.resolve({
                    data: [],
                    total: 0,
                })
            ),
            subscribe: jest.fn((topic, callback) => {
                subscriptions.push({
                    topic,
                    subscriptionCallback: jest.fn(callback),
                });
                return Promise.resolve({ data: null });
            }),

            unsubscribe: jest.fn((topic, callback) => {
                subscriptions = subscriptions.filter(
                    subscription =>
                        subscription.topic !== topic ||
                        subscription.subscriptionCallback !== callback
                );
                return Promise.resolve({ data: null });
            }),
            publish: jest.fn((topic, event) => {
                subscriptions.map(subscription => {
                    topic === subscription.topic &&
                        subscription.subscriptionCallback(event);
                });
                return Promise.resolve({ data: null });
            }),
        } as DataProvider;

        const defaultShowProps = {
            basePath: '/',
            id: '123',
            resource: 'artists',
        };

        const handleEventReceived = jest.fn();
        const { unmount } = renderWithRedux(
            <DataProviderContext.Provider value={dataProvider}>
                <RealTimeShow
                    {...defaultShowProps}
                    onEventReceived={handleEventReceived}
                >
                    <SimpleShowLayout>
                        <TextField source="title" />
                    </SimpleShowLayout>
                </RealTimeShow>
            </DataProviderContext.Provider>,
            {
                admin: {
                    resources: {
                        artists: {
                            data: { 123: { title: 'Hello' } },
                            list: {
                                selectedIds: [],
                                ids: [123],
                                params: { page: 1, filter: {} },
                                total: 0,
                            },
                        },
                    },
                },
            }
        );

        expect(dataProvider.subscribe).toHaveBeenCalledTimes(1);
        expect(dataProvider.subscribe.mock.calls[0][0]).toBe(
            'resource/artists/123'
        );

        const newEventCatched = {
            topic: 'resource/artists/123',
            type: 'deleted',
            date: new Date(),
            payload: { id: 123 },
            text: 'Something',
        };
        act(() => {
            dataProvider.publish('resource/artists/123', newEventCatched);
        });

        expect(subscriptions[0].subscriptionCallback).toHaveBeenCalledTimes(1);
        expect(subscriptions[0].subscriptionCallback.mock.calls[0][0]).toBe(
            newEventCatched
        );

        expect(handleEventReceived).toHaveBeenCalledWith(newEventCatched);

        unmount();

        expect(dataProvider.unsubscribe).toHaveBeenCalled();
        expect(dataProvider.unsubscribe.mock.calls[0][0]).toBe(
            'resource/artists/123'
        );
    });
});
