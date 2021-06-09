import React, { FC, useState } from 'react';
import { act } from '@testing-library/react';
import { DataProvider, DataProviderContext } from 'react-admin';
import { renderWithRedux } from 'ra-test';

import { useSubscribe } from '.';

describe('useSubscribe', () => {
    it('should subscribe to the topic', async () => {
        const ComponentToTest: FC = () => {
            const [text, setText] = useState('');
            useSubscribe('/aTopic', event => {
                act(() => setText(event.text));
            });

            return <div>{text}</div>;
        };

        let subscriptions: any = [];

        const dataProvider = {
            create: jest.fn(() => Promise.resolve({ data: { id: 'artist1' } })),
            delete: jest.fn(),
            deleteMany: jest.fn(() => Promise.resolve({ data: [] })),
            update: jest.fn(),
            updateMany: jest.fn(),
            getList: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
            getMany: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
            getOne: jest.fn(),
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

        const { unmount } = renderWithRedux(
            <DataProviderContext.Provider value={dataProvider}>
                <ComponentToTest />
            </DataProviderContext.Provider>,
            {
                admin: {
                    resources: {
                        artists: {
                            data: {},
                            list: {
                                selectedIds: [],
                                ids: [],
                                params: { page: 1, filter: {} },
                                total: 0,
                            },
                        },
                    },
                },
            }
        );

        expect(dataProvider.subscribe).toHaveBeenCalledTimes(1);
        expect(dataProvider.subscribe.mock.calls[0][0]).toBe('/aTopic');

        const newEventUncatched = {
            topic: '/bTopic',
            type: 'added',
            date: new Date(),
            message: 'Yes',
        };

        const newEventCatched = {
            topic: '/aTopic',
            type: 'added',
            date: new Date(),
            message: 'Yes',
        };

        dataProvider.publish('/bTopic', newEventUncatched);
        expect(subscriptions[0].subscriptionCallback).toHaveBeenCalledTimes(0);

        dataProvider.publish('/aTopic', newEventCatched);

        expect(subscriptions[0].subscriptionCallback).toHaveBeenCalledTimes(1);
        expect(subscriptions[0].subscriptionCallback.mock.calls[0][0]).toBe(
            newEventCatched
        );

        unmount();

        expect(dataProvider.unsubscribe).toHaveBeenCalled();
        expect(dataProvider.unsubscribe.mock.calls[0][0]).toBe('/aTopic');
    });
});
