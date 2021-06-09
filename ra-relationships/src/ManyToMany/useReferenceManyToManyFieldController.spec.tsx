import React, { FC } from 'react';
import { waitFor } from '@testing-library/react';
import {
    DataProvider,
    DataProviderContext,
    GetManyResult,
    GetManyReferenceResult,
} from 'react-admin';
import { renderWithRedux } from 'ra-test';
import useReferenceManyToManyFieldController from './useReferenceManyToManyFieldController';

describe('useReferenceManyToManyFieldController', () => {
    test('should set loaded to false when related records are not yet fetched', async () => {
        const ComponentToTest: FC = () => {
            const props = useReferenceManyToManyFieldController({
                record: { id: 1, name: 'Eric Clapton' },
                reference: 'events',
                resource: 'artists',
                sort: { field: 'name', order: 'ASC' },
                source: 'id',
                through: 'performances',
                using: 'artist_id,event_id',
            });

            return <div>loaded: {props.loaded.toString()}</div>;
        };

        const { queryByText } = renderWithRedux(<ComponentToTest />, {
            admin: {
                references: {
                    oneToMany: {
                        'artists_performances@artist_id_1': {},
                    },
                    possibleValues: {},
                },
                resources: {
                    artists: {},
                    performances: {},
                    events: {},
                },
            },
        });

        expect(queryByText('loaded: false')).not.toBeNull();

        await waitFor(() => {
            expect(queryByText('loaded: true')).not.toBeNull();
        });
    });

    test('should set loaded to true when related records have been fetched and there are none', async () => {
        const ComponentToTest: FC = () => {
            const props = useReferenceManyToManyFieldController({
                record: { id: 1, name: 'Eric Clapton' },
                reference: 'events',
                resource: 'artists',
                sort: { field: 'name', order: 'ASC' },
                source: 'id',
                through: 'performances',
                using: 'artist_id,event_id',
            });

            return <div>loaded: {props.loaded.toString()}</div>;
        };

        const { queryByText } = renderWithRedux(<ComponentToTest />, {
            admin: {
                references: {
                    oneToMany: {
                        'artists_performances@artist_id_1': {
                            ids: [],
                        },
                    },
                    possibleValues: {},
                },
                resources: {
                    artists: {},
                    performances: {},
                    events: {},
                },
            },
        });

        expect(queryByText('loaded: true')).not.toBeNull();
    });

    test('should set loaded to true when related records have been fetched and there are some', async () => {
        const ComponentToTest: FC = () => {
            const props = useReferenceManyToManyFieldController({
                record: { id: 1, name: 'Eric Clapton' },
                reference: 'events',
                resource: 'artists',
                sort: { field: 'name', order: 'ASC' },
                source: 'id',
                through: 'performances',
                using: 'artist_id,event_id',
            });

            return <div>loaded: {props.loaded.toString()}</div>;
        };

        const { queryByText } = renderWithRedux(<ComponentToTest />, {
            admin: {
                references: {
                    oneToMany: {
                        'artists_performances@artist_id_1': {
                            ids: [1, 2, 3],
                        },
                    },
                    possibleValues: {},
                },
                resources: {
                    artists: {},
                    performances: {},
                    events: {},
                },
            },
        });

        expect(queryByText('loaded: true')).not.toBeNull();
    });

    test('should set loading to true when associative records are being fetched', async () => {
        const ComponentToTest: FC = () => {
            const props = useReferenceManyToManyFieldController({
                record: { id: 1, name: 'Eric Clapton' },
                reference: 'events',
                resource: 'artists',
                sort: { field: 'name', order: 'ASC' },
                source: 'id',
                through: 'performances',
                using: 'artist_id,event_id',
            });

            return <div>loading: {props.loading.toString()}</div>;
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
            getManyReference: (): Promise<GetManyReferenceResult> =>
                new Promise(jest.fn()),
        } as DataProvider;

        const { queryByText, unmount } = renderWithRedux(
            <DataProviderContext.Provider value={dataProvider}>
                <ComponentToTest />
            </DataProviderContext.Provider>,
            {
                admin: {
                    references: {
                        oneToMany: {
                            'artists_performances@artist_id_1': {},
                        },
                        possibleValues: {},
                    },
                    resources: {
                        artists: {},
                        performances: {},
                        events: {},
                    },
                },
            }
        );

        await waitFor(() => {
            expect(queryByText('loading: true')).not.toBeNull();
        });

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    test('should set loading to true when reference records are being fetched', async () => {
        const ComponentToTest: FC = () => {
            const props = useReferenceManyToManyFieldController({
                record: { id: 1, name: 'Eric Clapton' },
                reference: 'events',
                resource: 'artists',
                sort: { field: 'name', order: 'ASC' },
                source: 'id',
                through: 'performances',
                using: 'artist_id,event_id',
            });

            return <div>loading: {props.loading.toString()}</div>;
        };

        const dataProvider = {
            create: jest.fn(),
            delete: jest.fn(),
            deleteMany: jest.fn(),
            update: jest.fn(),
            updateMany: jest.fn(),
            getList: jest.fn(),
            getMany: (): Promise<GetManyResult> => new Promise(jest.fn()),
            getOne: jest.fn(),
            getManyReference: (): Promise<GetManyReferenceResult> =>
                Promise.resolve({
                    ids: [1, 2],
                    data: [],
                    total: 2,
                }),
        } as DataProvider;

        const { queryByText, unmount } = renderWithRedux(
            <DataProviderContext.Provider value={dataProvider}>
                <ComponentToTest />
            </DataProviderContext.Provider>,
            {
                admin: {
                    references: {
                        oneToMany: {
                            'artists_performances@artist_id_1': {
                                ids: [1, 2],
                                total: 2,
                            },
                        },
                        possibleValues: {},
                    },
                    resources: {
                        artists: {},
                        performances: {
                            data: {
                                1: { id: 1, artist_id: 1, event_id: 1 },
                                2: { id: 2, artist_id: 1, event_id: 2 },
                            },
                        },
                        events: {
                            data: {},
                        },
                    },
                },
            }
        );

        await waitFor(() => {
            expect(queryByText('loading: true')).not.toBeNull();
        });

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    test('should display the error if one occurs while fetching the associative resource items', async () => {
        jest.spyOn(console, 'error').mockImplementationOnce(() => jest.fn());
        const ComponentToTest: FC = () => {
            const props = useReferenceManyToManyFieldController({
                record: { id: 1, name: 'Eric Clapton' },
                reference: 'events',
                resource: 'artists',
                sort: { field: 'name', order: 'ASC' },
                source: 'id',
                through: 'performances',
                using: 'artist_id,event_id',
            });

            return <div>{props.error ? props.error.message : 'Nope'}</div>;
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
            getManyReference: (): Promise<GetManyReferenceResult> =>
                Promise.reject(new Error('Big fat error')),
        } as DataProvider;

        const { queryByText, unmount } = renderWithRedux(
            <DataProviderContext.Provider value={dataProvider}>
                <ComponentToTest />
            </DataProviderContext.Provider>,
            {
                admin: {
                    references: {
                        oneToMany: {
                            'artists_performances@artist_id_1': {},
                        },
                        possibleValues: {},
                    },
                    resources: {
                        artists: {},
                        performances: {},
                        events: {},
                    },
                },
            }
        );

        await waitFor(() => {
            expect(queryByText('Big fat error')).not.toBeNull();
        });

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    test('should display the error if one occurs while fetching the reference resource items', async () => {
        jest.spyOn(console, 'error').mockImplementationOnce(() => jest.fn());
        const ComponentToTest: FC = () => {
            const props = useReferenceManyToManyFieldController({
                record: { id: 1, name: 'Eric Clapton' },
                reference: 'events',
                resource: 'artists',
                sort: { field: 'name', order: 'ASC' },
                source: 'id',
                through: 'performances',
                using: 'artist_id,event_id',
            });

            return <div>{props.error ? props.error.message : 'Nope'}</div>;
        };

        const dataProvider = {
            create: jest.fn(),
            delete: jest.fn(),
            deleteMany: jest.fn(),
            update: jest.fn(),
            updateMany: jest.fn(),
            getList: jest.fn(),
            getMany: (): Promise<GetManyResult> =>
                Promise.reject(new Error('Big fat error')),
            getOne: jest.fn(),
            getManyReference: (): Promise<GetManyReferenceResult> =>
                Promise.resolve({
                    ids: [1, 2],
                    data: [],
                    total: 2,
                }),
        } as DataProvider;

        const { queryByText, unmount } = renderWithRedux(
            <DataProviderContext.Provider value={dataProvider}>
                <ComponentToTest />
            </DataProviderContext.Provider>,
            {
                admin: {
                    references: {
                        oneToMany: {
                            'artists_performances@artist_id_1': {
                                ids: [1, 2],
                                total: 2,
                            },
                        },
                        possibleValues: {},
                    },
                    resources: {
                        artists: {},
                        performances: {
                            data: {
                                1: { id: 1, artist_id: 1, event_id: 1 },
                                2: { id: 2, artist_id: 1, event_id: 2 },
                            },
                        },
                        events: {
                            data: {},
                        },
                    },
                },
            }
        );

        await waitFor(() => {
            expect(queryByText('Big fat error')).not.toBeNull();
        });

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    test('should return the references data and ids', () => {
        const ComponentToTest: FC = () => {
            const props = useReferenceManyToManyFieldController({
                record: { id: 1, name: 'Eric Clapton' },
                reference: 'events',
                resource: 'artists',
                sort: { field: 'name', order: 'ASC' },
                source: 'id',
                through: 'performances',
                using: 'artist_id,event_id',
            });

            return (
                <div>
                    <div>loaded: {props.loaded.toString()}</div>
                    <div>{props.ids.toString()}</div>
                    <div>
                        {Object.keys(props.data)
                            .map(id => props.data[id].name)
                            .join(',')}
                    </div>
                </div>
            );
        };

        const { queryByText, unmount } = renderWithRedux(<ComponentToTest />, {
            admin: {
                references: {
                    oneToMany: {
                        'artists_performances@artist_id_1': {
                            ids: [1, 2],
                            total: 2,
                        },
                    },
                    possibleValues: {},
                },
                resources: {
                    artists: {},
                    performances: {
                        data: {
                            1: { id: 1, artist_id: 1, event_id: 1 },
                            2: { id: 2, artist_id: 1, event_id: 2 },
                            3: { id: 3, artist_id: 2, event_id: 1 },
                        },
                    },
                    events: {
                        data: {
                            1: { id: 1, name: 'Live Aid' },
                            2: { id: 2, name: 'Bohemian rhapsody' },
                            3: { id: 3, name: 'London' },
                        },
                    },
                },
            },
        });

        expect(queryByText('loaded: true')).not.toBeNull();
        expect(queryByText('1,2')).not.toBeNull();
        expect(queryByText('Live Aid,Bohemian rhapsody')).not.toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });
});
