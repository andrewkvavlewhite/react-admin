import React, { useState, FC, useEffect } from 'react';
import { DataProviderContext } from 'react-admin';
import { renderWithRedux } from 'ra-test';
import { fireEvent } from '@testing-library/react';
import { MemoryRouter, useHistory } from 'react-router-dom';

import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbItem } from './BreadcrumbItem';
import { ResourceBreadcrumbItems } from './ResourceBreadcrumbItems';
import { AppLocationContext, useAppLocationState } from '../app-location';

const fakeFataProvider = {
    create: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
    getList: jest.fn(),
    getMany: jest.fn(),
    getOne: jest.fn(),
    getManyReference: jest.fn(),
};

const fakeReduxState = {
    admin: {
        references: {
            oneToMany: {},
            possibleValues: {},
        },
        resources: {
            songs: {
                props: {
                    name: 'songs',
                    hasList: true,
                    hasEdit: true,
                    hasShow: true,
                    hasCreate: true,
                },
                data: {
                    1: { id: 1 },
                },
            },
        },
    },
};

const wait = (timeout = 110): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, timeout));

describe('Breadcrumb', () => {
    it('should render breadcrumb from app location', () => {
        const { queryByText, unmount } = renderWithRedux(
            <MemoryRouter initialEntries={['/foo']}>
                <AppLocationContext
                    initialLocation={{ path: 'foo', values: {} }}
                >
                    <Breadcrumb>
                        <BreadcrumbItem name="foo" label="Foo" />
                    </Breadcrumb>
                </AppLocationContext>
            </MemoryRouter>
        );

        expect(queryByText('Foo')).not.toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    it("should render nothing if there's no app location", () => {
        const { queryByText, unmount } = renderWithRedux(
            <MemoryRouter initialEntries={['/songs/1']}>
                <AppLocationContext>
                    <Breadcrumb>
                        <BreadcrumbItem name="foo" label="Foo" />
                    </Breadcrumb>
                </AppLocationContext>
            </MemoryRouter>
        );

        expect(queryByText('Foo')).toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    it("should render nothing if location doesn't match", () => {
        const { queryByText, unmount } = renderWithRedux(
            <MemoryRouter initialEntries={['/songs/1']}>
                <AppLocationContext
                    initialLocation={{ path: 'bar', values: {} }}
                >
                    <Breadcrumb>
                        <BreadcrumbItem name="foo" label="Foo" />
                    </Breadcrumb>
                </AppLocationContext>
            </MemoryRouter>
        );

        expect(queryByText('Foo')).toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    it('should update rendered breadcrumb on app location change', async () => {
        const GoToSongButton: FC = () => {
            const history = useHistory();

            return (
                <button onClick={(): void => history.push('/songs/1')}>
                    Go To Songs #1
                </button>
            );
        };

        const { queryByText, unmount, getByText } = renderWithRedux(
            <MemoryRouter initialEntries={['/anything']}>
                <AppLocationContext
                    initialLocation={{ path: 'foo', values: {} }}
                >
                    <Breadcrumb>
                        <ResourceBreadcrumbItems />
                        <BreadcrumbItem name="foo" label="Foo" />
                    </Breadcrumb>
                    <GoToSongButton />
                </AppLocationContext>
            </MemoryRouter>,
            fakeReduxState
        );

        expect(queryByText('resources.songs.name')).toBeNull();
        expect(queryByText('#1')).toBeNull();
        expect(queryByText('Foo')).not.toBeNull();

        fireEvent.click(getByText('Go To Songs #1'));
        await wait();
        expect(queryByText('resources.songs.name')).not.toBeNull();
        expect(queryByText('#1')).not.toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    it('should update rendered breadcrumb on setLocation call from useAppLocationState', async () => {
        const Route: FC<{ path: string }> = ({ path }) => {
            const [_, setLocation] = useAppLocationState();

            useEffect(() => {
                setLocation(path);
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [path]);

            return <>{`${path} path`}</>;
        };

        const App: FC = () => {
            const [displayPath, setDisplayPath] = useState(null);
            const showPath = (path: string) => (): void => setDisplayPath(path);

            return (
                <AppLocationContext>
                    <Breadcrumb>
                        <BreadcrumbItem name="foo" label="Foo" />
                        <BreadcrumbItem name="bar" label="Bar" />
                    </Breadcrumb>
                    <button onClick={showPath('foo')}>Show Foo</button>
                    <button onClick={showPath('bar')}>Show Bar</button>
                    {displayPath && <Route path={displayPath} />}
                </AppLocationContext>
            );
        };

        const { queryByText, unmount, getByText } = renderWithRedux(<App />);

        expect(queryByText('Foo')).toBeNull();
        expect(queryByText('Bar')).toBeNull();

        fireEvent.click(getByText('Show Foo'));
        await wait(200);

        expect(queryByText('Foo')).not.toBeNull();
        expect(queryByText('foo path')).not.toBeNull();

        fireEvent.click(getByText('Show Bar'));
        await wait();

        expect(queryByText('Bar')).not.toBeNull();
        expect(queryByText('bar path')).not.toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    it('should render react-admin resource breadcrumb from location if <ResourceBreadcrumbItems /> is defined as children', async () => {
        const { unmount, queryByText } = renderWithRedux(
            <MemoryRouter initialEntries={['/songs/1']}>
                <AppLocationContext>
                    <DataProviderContext.Provider value={fakeFataProvider}>
                        <Breadcrumb>
                            <ResourceBreadcrumbItems />
                            <BreadcrumbItem name="foo" label="Foo" />
                            <BreadcrumbItem name="bar" label="Bar" />
                        </Breadcrumb>
                    </DataProviderContext.Provider>
                </AppLocationContext>
            </MemoryRouter>,
            fakeReduxState
        );

        await wait();

        expect(queryByText('resources.songs.name')).not.toBeNull();
        expect(queryByText('#1')).not.toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    it("shouldn't render react-admin resource breadcrumb from location if <ResourceBreadcrumbItems /> is not defined as children", async () => {
        const { unmount, queryByText } = renderWithRedux(
            <MemoryRouter initialEntries={['/songs/1']}>
                <AppLocationContext>
                    <DataProviderContext.Provider value={fakeFataProvider}>
                        <Breadcrumb>
                            <BreadcrumbItem name="foo" label="Foo" />
                            <BreadcrumbItem name="bar" label="Bar" />
                        </Breadcrumb>
                    </DataProviderContext.Provider>
                </AppLocationContext>
            </MemoryRouter>,
            fakeReduxState
        );

        await wait();

        expect(queryByText('resources.songs.name')).toBeNull();
        expect(queryByText('#1')).toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    it('should allow to define react-admin resource breadcrumb parts', async () => {
        const { unmount, queryByText } = renderWithRedux(
            <MemoryRouter initialEntries={['/songs/1']}>
                <AppLocationContext>
                    <DataProviderContext.Provider value={fakeFataProvider}>
                        <Breadcrumb>
                            <BreadcrumbItem name="foo" label="Foo" />
                            <BreadcrumbItem name="bar" label="Bar" />
                            <BreadcrumbItem name="songs" label="Songs List">
                                <BreadcrumbItem name="edit" label="Edit Song" />
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </DataProviderContext.Provider>
                </AppLocationContext>
            </MemoryRouter>,
            fakeReduxState
        );

        await wait();

        expect(queryByText('Songs List')).not.toBeNull();
        expect(queryByText('Edit Song')).not.toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });
});
