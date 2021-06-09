import React from 'react';
import { act } from '@testing-library/react';
import {
    DataProvider,
    DataProviderContext,
    Datagrid,
    TextField,
    defaultTheme,
} from 'react-admin';
import { renderWithRedux } from 'ra-test';

import { ThemeProvider, createMuiTheme } from '@material-ui/core';

import { RealTimeList } from '.';

describe('RealTimeList', () => {
    it('should refresh the list view by default after the external changes', async () => {
        let subscriptions: any = [];

        const dataProvider = {
            create: jest.fn(() => Promise.resolve({ data: { id: 123 } })),
            delete: jest.fn(() => Promise.resolve({ data: { id: 123 } })),
            deleteMany: jest.fn(() => Promise.resolve({ data: [] })),
            update: jest.fn(() =>
                Promise.resolve({ data: { id: 123, title: 'Hello' } })
            ),
            updateMany: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
            getList: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
            getMany: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
            getOne: jest.fn(() =>
                Promise.resolve({ data: { id: 123, title: 'Hello' } })
            ),
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

        const defaultListProps = {
            basePath: '/artists',
            ids: [],
            data: {},
            hasCreate: false,
            hasEdit: false,
            hasList: false,
            hasShow: false,
            location: {
                pathname: '/artists',
                search: '',
                state: undefined,
                hash: '',
            },
            match: {
                params: {},
                isExact: true,
                path: '/artists',
                url: '/artists',
            },
            resource: 'artists',
            total: 0,
        };

        const { unmount, dispatch } = renderWithRedux(
            <ThemeProvider theme={createMuiTheme(defaultTheme)}>
                <DataProviderContext.Provider value={dataProvider}>
                    <RealTimeList {...defaultListProps}>
                        <Datagrid>
                            <TextField source="title" />
                        </Datagrid>
                    </RealTimeList>
                </DataProviderContext.Provider>
            </ThemeProvider>,
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
                                cachedRequests: {},
                            },
                        },
                    },
                },
            }
        );

        expect(dataProvider.subscribe).toHaveBeenCalledTimes(1);
        expect(dataProvider.subscribe.mock.calls[0][0]).toBe(
            'resource/artists'
        );

        // Works with a payload

        const newEventCatched = {
            topic: 'resource/artists',
            type: 'updated',
            date: new Date(),
            payload: { ids: [123] },
            text: 'Something',
        };

        act(() => {
            dataProvider.publish('resource/artists', newEventCatched);
        });

        expect(subscriptions[0].subscriptionCallback).toHaveBeenCalledTimes(1);
        expect(subscriptions[0].subscriptionCallback.mock.calls[0][0]).toBe(
            newEventCatched
        );

        expect(dispatch.mock.calls).toContainEqual([
            { type: 'RA/REFRESH_VIEW', payload: { hard: undefined } },
        ]);

        // Works when there are no payload

        const secondNewEventCatched = {
            topic: 'resource/artists',
            type: 'updated',
        };

        act(() => {
            dataProvider.publish('resource/artists', secondNewEventCatched);
        });

        unmount();

        expect(dataProvider.unsubscribe).toHaveBeenCalled();
        expect(dataProvider.unsubscribe.mock.calls[0][0]).toBe(
            'resource/artists'
        );
    });

    it('should allows to provides a custom side effect handler when a list event is received', async () => {
        let subscriptions: any = [];

        const dataProvider = {
            create: jest.fn(() => Promise.resolve({ data: { id: 123 } })),
            delete: jest.fn(() => Promise.resolve({ data: { id: 123 } })),
            deleteMany: jest.fn(() => Promise.resolve({ data: [] })),
            update: jest.fn(() =>
                Promise.resolve({ data: { id: 123, title: 'Hello' } })
            ),
            updateMany: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
            getList: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
            getMany: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
            getOne: jest.fn(() =>
                Promise.resolve({ data: { id: 123, title: 'Hello' } })
            ),
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

        const defaultListProps = {
            basePath: '/artists',
            ids: [],
            data: {},
            hasCreate: false,
            hasEdit: false,
            hasList: false,
            hasShow: false,
            location: {
                pathname: '/artists',
                search: '',
                state: undefined,
                hash: '',
            },
            match: {
                params: {},
                isExact: true,
                path: '/artists',
                url: '/artists',
            },
            resource: 'artists',
            total: 0,
        };

        const handleEventReceived = jest.fn();

        const { unmount } = renderWithRedux(
            <ThemeProvider theme={createMuiTheme(defaultTheme)}>
                <DataProviderContext.Provider value={dataProvider}>
                    <RealTimeList
                        {...defaultListProps}
                        onEventReceived={handleEventReceived}
                    >
                        <Datagrid>
                            <TextField source="title" />
                        </Datagrid>
                    </RealTimeList>
                </DataProviderContext.Provider>
            </ThemeProvider>,
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
                                cachedRequests: {},
                            },
                        },
                    },
                },
            }
        );

        expect(dataProvider.subscribe).toHaveBeenCalledTimes(1);
        expect(dataProvider.subscribe.mock.calls[0][0]).toBe(
            'resource/artists'
        );

        // Works with a payload

        const newEventCatched = {
            topic: 'resource/artists',
            type: 'updated',
            date: new Date(),
            payload: { ids: [123] },
            text: 'Something',
        };

        act(() => {
            dataProvider.publish('resource/artists', newEventCatched);
        });

        expect(subscriptions[0].subscriptionCallback).toHaveBeenCalledTimes(1);
        expect(subscriptions[0].subscriptionCallback.mock.calls[0][0]).toBe(
            newEventCatched
        );

        expect(handleEventReceived).toHaveBeenCalledWith(newEventCatched);

        // Works when there are no payload

        const secondNewEventCatched = {
            topic: 'resource/artists',
            type: 'updated',
        };

        act(() => {
            dataProvider.publish('resource/artists', secondNewEventCatched);
        });

        expect(handleEventReceived).toHaveBeenCalledWith(secondNewEventCatched);
        unmount();

        expect(dataProvider.unsubscribe).toHaveBeenCalled();
        expect(dataProvider.unsubscribe.mock.calls[0][0]).toBe(
            'resource/artists'
        );
    });
});
