import React, { FC } from 'react';
import { act, render, RenderResult } from '@testing-library/react';
import { DataProviderContext } from 'react-admin';
import { TestContext } from 'ra-test';

import { useLock } from '.';

const basicRenderWithRedux = (component, initialState = {}): RenderResult =>
    render(
        <TestContext initialState={initialState} enableReducers={false}>
            {(): any => component}
        </TestContext>,
        {}
    );

describe('useLock', () => {
    it('should lock the posts record #1', async () => {
        const ComponentToTest: FC = () => {
            const { loading, data } = useLock('artists', 'artist1', 'juju');
            if (loading || !data) {
                return <div>Loading</div>;
            }
            return <div>Locked by ${data.identity}</div>;
        };

        const dataProvider = {
            create: jest.fn(),
            delete: jest.fn(),
            deleteMany: jest.fn(),
            update: jest.fn(),
            updateMany: jest.fn(),
            getList: jest.fn(),
            getMany: jest.fn(),
            getOne: jest.fn(),
            getManyReference: jest.fn(),
            lock: jest.fn((resource, data) => {
                return Promise.resolve({
                    data: {
                        ...data,
                        id: '1',
                        createdAt: new Date('2020-01-01'),
                    },
                });
            }),
            unlock: jest.fn((resource, data) => {
                return Promise.resolve({ data });
            }),
            getLock: jest.fn((resource, data) => {
                return Promise.resolve({ data });
            }),
        };

        basicRenderWithRedux(
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
                locks: {},
            }
        );

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(dataProvider.lock).toHaveBeenCalledTimes(1);
        expect(dataProvider.lock.mock.calls[0][0]).toEqual('artists');
        expect(dataProvider.lock.mock.calls[0][1]).toStrictEqual({
            identity: 'juju',
            recordId: 'artist1',
            resource: 'artists',
        });
    });
});
