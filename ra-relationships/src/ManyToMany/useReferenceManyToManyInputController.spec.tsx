import React, { createRef, FC } from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import {
    DataProvider,
    DataProviderContext,
    GetManyResult,
    GetManyReferenceResult,
    SimpleForm,
    EditContextProvider,
    EditControllerProps,
    SelectArrayInput,
    required,
} from 'react-admin';
import { renderWithRedux } from 'ra-test';

import useReferenceManyToManyInputController from './useReferenceManyToManyInputController';
import ReferenceManyToManyInput from './ReferenceManyToManyInput';
import { ManyToManyReferenceContextProvider } from './ManyToManyReferenceContextProvider';

describe('useReferenceManyToManyInputController', () => {
    const editContext: EditControllerProps = {
        defaultTitle: '',
        loading: false,
        loaded: true,
        save: jest.fn(),
        saving: false,
        setOnSuccess: jest.fn(),
        setOnFailure: jest.fn(),
        setTransform: jest.fn(),
        redirect: 'list',
        resource: 'artists',
        version: 0,
        onFailureRef: createRef(),
        onSuccessRef: createRef(),
        transformRef: createRef(),
    };

    it('should display the error if one occurs while fetching the associative resource items', async () => {
        jest.spyOn(console, 'error').mockImplementationOnce(() => jest.fn());
        const ComponentToTest: FC = () => {
            const props = useReferenceManyToManyInputController({
                record: { id: 1 },
                basePath: 'artists',
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
            getList: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
            getMany: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
            getOne: jest.fn(),
            getManyReference: (): Promise<GetManyReferenceResult> =>
                Promise.reject(new Error('Big fat error')),
        } as DataProvider;

        const { queryByText, unmount } = renderWithRedux(
            <DataProviderContext.Provider value={dataProvider}>
                <EditContextProvider value={editContext}>
                    <ManyToManyReferenceContextProvider>
                        <SimpleForm>
                            <ComponentToTest />
                        </SimpleForm>
                    </ManyToManyReferenceContextProvider>
                </EditContextProvider>
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

    it('should display the error if one occurs while fetching the reference resource items', async () => {
        jest.spyOn(console, 'error').mockImplementationOnce(() => jest.fn());
        const ComponentToTest: FC = () => {
            const props = useReferenceManyToManyInputController({
                record: { id: 1 },
                basePath: 'artists',
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
            getList: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
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
                <EditContextProvider value={editContext}>
                    <ManyToManyReferenceContextProvider>
                        <SimpleForm>
                            <ComponentToTest />
                        </SimpleForm>
                    </ManyToManyReferenceContextProvider>
                </EditContextProvider>
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

    it('should return the possible choices', async () => {
        const ComponentToTest: FC = () => {
            const props = useReferenceManyToManyInputController({
                record: { id: 1 },
                basePath: 'artists',
                reference: 'events',
                resource: 'artists',
                sort: { field: 'id', order: 'DESC' },
                source: 'id',
                through: 'performances',
                using: 'artist_id,event_id',
            });

            return (
                <div>
                    <div>
                        {props.choices.map(choice => choice.name).join(',')}
                    </div>
                </div>
            );
        };
        const getListKey = JSON.stringify({
            pagination: { page: 1, perPage: 25 },
            sort: {
                field: 'id',
                order: 'DESC',
            },
            filter: {},
        });
        const { queryByText, unmount } = renderWithRedux(
            <EditContextProvider value={editContext}>
                <ManyToManyReferenceContextProvider>
                    <SimpleForm>
                        <ComponentToTest />
                    </SimpleForm>
                </ManyToManyReferenceContextProvider>
            </EditContextProvider>,
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
                                1: { id: 1, artist_id: 1, performance_id: 1 },
                                2: { id: 2, artist_id: 1, performance_id: 2 },
                                3: { id: 3, artist_id: 2, performance_id: 1 },
                            },
                        },
                        events: {
                            data: {
                                1: { id: 1, name: 'Live Aid' },
                                2: { id: 2, name: 'Bohemian rhapsody' },
                                3: { id: 3, name: 'London' },
                            },
                            list: {
                                cachedRequests: {
                                    [getListKey]: {
                                        ids: [1, 2, 3],
                                        total: 3,
                                    },
                                },
                            },
                        },
                    },
                },
            }
        );

        expect(queryByText('Live Aid,Bohemian rhapsody,London')).not.toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    it('should return the possible choices even if the through reference returns nothing', async () => {
        const ComponentToTest: FC = () => {
            const props = useReferenceManyToManyInputController({
                record: { id: 1 },
                basePath: 'artists',
                reference: 'events',
                resource: 'artists',
                sort: { field: 'id', order: 'DESC' },
                source: 'id',
                through: 'performances',
                using: 'artist_id,event_id',
            });

            return (
                <div>
                    <div>
                        {props.choices.map(choice => choice.name).join(',')}
                    </div>
                </div>
            );
        };
        const getListKey = JSON.stringify({
            pagination: { page: 1, perPage: 25 },
            sort: {
                field: 'id',
                order: 'DESC',
            },
            filter: {},
        });
        const { queryByText, unmount } = renderWithRedux(
            <EditContextProvider value={editContext}>
                <ManyToManyReferenceContextProvider>
                    <SimpleForm>
                        <ComponentToTest />
                    </SimpleForm>
                </ManyToManyReferenceContextProvider>
            </EditContextProvider>,
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
                            data: {},
                        },
                        events: {
                            data: {
                                1: { id: 1, name: 'Live Aid' },
                                2: { id: 2, name: 'Bohemian rhapsody' },
                                3: { id: 3, name: 'London' },
                            },
                            list: {
                                cachedRequests: {
                                    [getListKey]: {
                                        ids: [1, 2, 3],
                                        total: 3,
                                    },
                                },
                            },
                        },
                    },
                },
            }
        );

        expect(queryByText('Live Aid,Bohemian rhapsody,London')).not.toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    it('should handle validation', async () => {
        const getListKey = JSON.stringify({
            pagination: { page: 1, perPage: 25 },
            sort: {
                field: 'id',
                order: 'DESC',
            },
            filter: {},
        });
        const { getByLabelText, queryByText, unmount } = renderWithRedux(
            <EditContextProvider value={editContext}>
                <ManyToManyReferenceContextProvider>
                    <SimpleForm>
                        <ReferenceManyToManyInput
                            record={{ id: 1 }}
                            basePath="artists"
                            reference="events"
                            resource="artists"
                            through="performances"
                            using="artist_id,event_id"
                            validate={required()}
                        >
                            <SelectArrayInput optionText="name" />
                        </ReferenceManyToManyInput>
                    </SimpleForm>
                </ManyToManyReferenceContextProvider>
            </EditContextProvider>,
            {
                admin: {
                    references: {
                        oneToMany: {
                            'artists_performances@artist_id_1': {
                                ids: [1, 2],
                                total: 0,
                            },
                        },
                        possibleValues: {},
                    },
                    resources: {
                        artists: {},
                        performances: {
                            data: {},
                        },
                        events: {
                            data: {
                                1: { id: 1, name: 'Live Aid' },
                                2: { id: 2, name: 'Bohemian rhapsody' },
                                3: { id: 3, name: 'London' },
                            },
                            list: {
                                cachedRequests: {
                                    [getListKey]: {
                                        ids: [1, 2, 3],
                                        total: 3,
                                    },
                                },
                            },
                        },
                    },
                },
            }
        );

        expect(queryByText('Live Aid,Bohemian rhapsody,London')).toBeNull();
        fireEvent.click(queryByText('ra.action.save'));
        // The input might take a few milliseconds before being displayed
        // as we fetch the resources
        await waitFor(() => {
            fireEvent.focus(getByLabelText('resources.artists.fields.id *'));
        });
        fireEvent.blur(getByLabelText('resources.artists.fields.id *'));
        expect(queryByText('ra.validation.required')).not.toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });
});
