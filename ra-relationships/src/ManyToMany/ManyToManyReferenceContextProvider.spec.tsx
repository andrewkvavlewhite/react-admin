import React, { ReactElement } from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import {
    defaultTheme,
    DataProvider,
    DataProviderContext,
    SelectArrayInput,
    SimpleForm,
    ResourceContextProvider,
    TextInput,
    Create,
    CreateProps,
    EditProps,
    Edit,
} from 'react-admin';
import { renderWithRedux } from 'ra-test';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

import { ManyToManyReferenceContextProvider } from './ManyToManyReferenceContextProvider';
import ReferenceManyToManyInput from './ReferenceManyToManyInput';

describe('ManyToManyReferenceContextProvider', () => {
    describe('Inside Create', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        const resourceContext = 'artists';

        const defaultDataProvider = {
            create: jest.fn(() =>
                Promise.resolve({ data: { id: 1, name: 'test' } })
            ),
            delete: jest.fn(),
            deleteMany: jest.fn(() => Promise.resolve({ data: [] })),
            update: jest.fn(),
            updateMany: jest.fn(),
            getList: jest.fn(() =>
                Promise.resolve({
                    data: [
                        { id: 1, name: 'Event 1' },
                        { id: 2, name: 'Event 2' },
                    ],
                    total: 2,
                })
            ),
            getMany: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
            getOne: jest.fn(),
            getManyReference: jest.fn(() =>
                Promise.resolve({
                    data: [],
                    total: 0,
                })
            ),
        } as DataProvider;

        const getListKey = JSON.stringify({
            pagination: { page: 1, perPage: 25 },
            sort: {
                field: 'id',
                order: 'DESC',
            },
            filter: {},
        });

        const initialState = {
            admin: {
                resources: {
                    artists: {},
                    performances: {},
                    events: {
                        data: {
                            1: { id: 1, name: 'Event 1' },
                            2: { id: 2, name: 'Event 2' },
                        },
                        list: {
                            cachedRequests: {
                                [getListKey]: {
                                    ids: [1, 2],
                                    total: 2,
                                },
                            },
                        },
                    },
                },
            },
        };

        const CreateArtist = ({
            dataProvider,
            ...props
        }: CreateProps & {
            dataProvider: DataProvider;
        }): ReactElement => (
            <ThemeProvider theme={createMuiTheme(defaultTheme)}>
                <DataProviderContext.Provider value={dataProvider}>
                    <ResourceContextProvider value={resourceContext}>
                        <Create
                            basePath="/artists"
                            resource="artists"
                            {...props}
                        >
                            <ManyToManyReferenceContextProvider>
                                <SimpleForm>
                                    <TextInput
                                        source="name"
                                        defaultValue="test"
                                    />
                                    <ReferenceManyToManyInput
                                        source="id"
                                        reference="events"
                                        through="performances"
                                        using="artist_id,event_id"
                                    >
                                        <SelectArrayInput />
                                    </ReferenceManyToManyInput>
                                </SimpleForm>
                            </ManyToManyReferenceContextProvider>
                        </Create>
                    </ResourceContextProvider>
                </DataProviderContext.Provider>
            </ThemeProvider>
        );

        it('should create the resource before trying to update the associative resources', async () => {
            const dataProvider = defaultDataProvider;

            const { getByLabelText, getByText, unmount } = renderWithRedux(
                <CreateArtist dataProvider={dataProvider} />,
                initialState
            );

            let input: HTMLElement;
            await waitFor(() => {
                input = getByLabelText('resources.artists.fields.id');
                expect(input.getAttribute('role')).toEqual('button');
            });

            fireEvent.mouseDown(input);
            fireEvent.click(getByText('Event 1'));
            fireEvent.click(getByText('Event 2'));
            // Close the dropdown by clicking outside it
            fireEvent.click(input);
            fireEvent.click(getByLabelText('ra.action.save'));

            await waitFor(() => {
                expect(dataProvider.create).toHaveBeenCalledTimes(3);
                expect(dataProvider.create).toHaveBeenCalledWith('artists', {
                    data: {
                        name: 'test',
                    },
                });

                expect(dataProvider.create).toHaveBeenCalledWith(
                    'performances',
                    {
                        data: {
                            artist_id: 1,
                            event_id: 1,
                        },
                    }
                );
                expect(dataProvider.create).toHaveBeenCalledWith(
                    'performances',
                    {
                        data: {
                            artist_id: 1,
                            event_id: 1,
                        },
                    }
                );
            });

            // For some reason, the react tree is not cleaned up up before running subsequent tests
            // This ensure it does not interfere with them
            unmount();
        });

        it('should call the onSuccess function if everything succeeds', async () => {
            const dataProvider = defaultDataProvider;
            const onSuccess = jest.fn();

            const { getByLabelText, getByText, unmount } = renderWithRedux(
                <CreateArtist
                    dataProvider={dataProvider}
                    onSuccess={onSuccess}
                />,
                initialState
            );

            let input: HTMLElement;
            await waitFor(() => {
                input = getByLabelText('resources.artists.fields.id');
                expect(input.getAttribute('role')).toEqual('button');
            });

            fireEvent.mouseDown(input);
            fireEvent.click(getByText('Event 1'));
            fireEvent.click(getByText('Event 2'));
            // Close the dropdown by clicking outside it
            fireEvent.click(input);
            fireEvent.click(getByLabelText('ra.action.save'));

            await waitFor(() => {
                expect(onSuccess).toHaveBeenCalled();
            });

            // For some reason, the react tree is not cleaned up up before running subsequent tests
            // This ensure it does not interfere with them
            unmount();
        });

        it('should call the onFailure function when creation fails', async () => {
            const dataProvider = {
                ...defaultDataProvider,
                create: jest.fn(() => Promise.reject()),
            } as DataProvider;
            const onFailure = jest.fn();

            const { getByLabelText, getByText, unmount } = renderWithRedux(
                <CreateArtist
                    dataProvider={dataProvider}
                    onFailure={onFailure}
                />,
                initialState
            );

            let input: HTMLElement;
            await waitFor(() => {
                input = getByLabelText('resources.artists.fields.id');
                expect(input.getAttribute('role')).toEqual('button');
            });

            fireEvent.mouseDown(input);
            fireEvent.click(getByText('Event 1'));
            fireEvent.click(getByText('Event 2'));
            // Close the dropdown by clicking outside it
            fireEvent.click(input);
            fireEvent.click(getByLabelText('ra.action.save'));

            await waitFor(() => {
                expect(onFailure).toHaveBeenCalled();
            });

            // For some reason, the react tree is not cleaned up up before running subsequent tests
            // This ensure it does not interfere with them
            unmount();
        });

        it('should call the onFailure function when adding the references fails', async () => {
            const dataProvider = {
                ...defaultDataProvider,
                create: jest
                    .fn()
                    .mockResolvedValueOnce({ data: { id: 1, name: 'test' } })
                    .mockRejectedValue(new Error('Reference error')),
            } as DataProvider;
            const onFailure = jest.fn();

            const { getByLabelText, getByText, unmount } = renderWithRedux(
                <CreateArtist
                    dataProvider={dataProvider}
                    onFailure={onFailure}
                />,
                initialState
            );

            let input: HTMLElement;
            await waitFor(() => {
                input = getByLabelText('resources.artists.fields.id');
                expect(input.getAttribute('role')).toEqual('button');
            });

            fireEvent.mouseDown(input);
            fireEvent.click(getByText('Event 1'));
            fireEvent.click(getByText('Event 2'));
            // Close the dropdown by clicking outside it
            fireEvent.click(input);
            fireEvent.click(getByLabelText('ra.action.save'));

            await waitFor(() => {
                expect(onFailure).toHaveBeenCalled();
            });

            // For some reason, the react tree is not cleaned up up before running subsequent tests
            // This ensure it does not interfere with them
            unmount();
        });
    });
    describe('Inside Edit', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        const resourceContext = 'artists';

        const defaultDataProvider = {
            create: jest.fn(() =>
                Promise.resolve({ data: { id: 1, name: 'test' } })
            ),
            delete: jest.fn(),
            deleteMany: jest.fn(() => Promise.resolve({ data: [] })),
            update: jest.fn(() =>
                Promise.resolve({ data: { id: 1, name: 'test' } })
            ),
            updateMany: jest.fn(),
            getList: jest.fn(() =>
                Promise.resolve({
                    data: [
                        { id: 1, name: 'Event 1' },
                        { id: 2, name: 'Event 2' },
                    ],
                    total: 2,
                })
            ),
            getMany: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
            getOne: jest
                .fn()
                .mockResolvedValue({ data: { id: 1, name: 'test' } }),
            getManyReference: jest.fn(() =>
                Promise.resolve({
                    data: [],
                    total: 0,
                })
            ),
        } as DataProvider;

        const getListKey = JSON.stringify({
            pagination: { page: 1, perPage: 25 },
            sort: {
                field: 'id',
                order: 'DESC',
            },
            filter: {},
        });

        const initialState = {
            admin: {
                resources: {
                    artists: {},
                    performances: {},
                    events: {
                        data: {
                            1: { id: 1, name: 'Event 1' },
                            2: { id: 2, name: 'Event 2' },
                        },
                        list: {
                            cachedRequests: {
                                [getListKey]: {
                                    ids: [1, 2],
                                    total: 2,
                                },
                            },
                        },
                    },
                },
            },
        };

        const EditArtist = ({
            dataProvider,
            ...props
        }: EditProps & {
            dataProvider: DataProvider;
        }): ReactElement => (
            <ThemeProvider theme={createMuiTheme(defaultTheme)}>
                <DataProviderContext.Provider value={dataProvider}>
                    <ResourceContextProvider value={resourceContext}>
                        <Edit
                            id="1"
                            basePath="/artists"
                            resource="artists"
                            {...props}
                        >
                            <ManyToManyReferenceContextProvider>
                                <SimpleForm>
                                    <TextInput
                                        source="name"
                                        defaultValue="test"
                                    />
                                    <ReferenceManyToManyInput
                                        source="id"
                                        reference="events"
                                        through="performances"
                                        using="artist_id,event_id"
                                    >
                                        <SelectArrayInput />
                                    </ReferenceManyToManyInput>
                                </SimpleForm>
                            </ManyToManyReferenceContextProvider>
                        </Edit>
                    </ResourceContextProvider>
                </DataProviderContext.Provider>
            </ThemeProvider>
        );

        it('should update the associative resources before updating the resource', async () => {
            const dataProvider = defaultDataProvider;

            const { getByLabelText, getByText, unmount } = renderWithRedux(
                <EditArtist dataProvider={dataProvider} />,
                initialState
            );

            let input: HTMLElement;
            await waitFor(() => {
                input = getByLabelText('resources.artists.fields.id');
                expect(input.getAttribute('role')).toEqual('button');
            });

            fireEvent.mouseDown(input);
            fireEvent.click(getByText('Event 1'));
            fireEvent.click(getByText('Event 2'));
            // Close the dropdown by clicking outside it
            fireEvent.click(input);
            fireEvent.change(getByLabelText('resources.artists.fields.name'), {
                target: { value: 'another' },
            });
            fireEvent.click(getByLabelText('ra.action.save'));

            await waitFor(() => {
                expect(dataProvider.create).toHaveBeenCalledTimes(2);

                expect(dataProvider.create).toHaveBeenCalledWith(
                    'performances',
                    {
                        data: {
                            artist_id: 1,
                            event_id: 1,
                        },
                    }
                );
                expect(dataProvider.create).toHaveBeenCalledWith(
                    'performances',
                    {
                        data: {
                            artist_id: 1,
                            event_id: 2,
                        },
                    }
                );
                expect(dataProvider.update).toHaveBeenCalledWith('artists', {
                    id: 1,
                    data: {
                        id: 1,
                        name: 'another',
                    },
                    previousData: {
                        id: 1,
                        name: 'test',
                    },
                });
            });

            // For some reason, the react tree is not cleaned up up before running subsequent tests
            // This ensure it does not interfere with them
            unmount();
        });

        it('should only update the associative resources if the main record has not changed', async () => {
            const dataProvider = defaultDataProvider;

            const { getByLabelText, getByText, unmount } = renderWithRedux(
                <EditArtist dataProvider={dataProvider} />,
                initialState
            );

            let input: HTMLElement;
            await waitFor(() => {
                input = getByLabelText('resources.artists.fields.id');
                expect(input.getAttribute('role')).toEqual('button');
            });

            fireEvent.mouseDown(input);
            fireEvent.click(getByText('Event 1'));
            fireEvent.click(getByText('Event 2'));
            // Close the dropdown by clicking outside it
            fireEvent.click(input);
            fireEvent.click(getByLabelText('ra.action.save'));

            await waitFor(() => {
                expect(dataProvider.create).toHaveBeenCalledTimes(2);

                expect(dataProvider.create).toHaveBeenCalledWith(
                    'performances',
                    {
                        data: {
                            artist_id: 1,
                            event_id: 1,
                        },
                    }
                );
                expect(dataProvider.create).toHaveBeenCalledWith(
                    'performances',
                    {
                        data: {
                            artist_id: 1,
                            event_id: 2,
                        },
                    }
                );
                expect(dataProvider.update).not.toHaveBeenCalled();
            });

            // For some reason, the react tree is not cleaned up up before running subsequent tests
            // This ensure it does not interfere with them
            unmount();
        });

        it('should call the onSuccess function if everything succeeds', async () => {
            const dataProvider = defaultDataProvider;
            const onSuccess = jest.fn();

            const { getByLabelText, getByText, unmount } = renderWithRedux(
                <EditArtist
                    dataProvider={dataProvider}
                    onSuccess={onSuccess}
                />,
                initialState
            );

            let input: HTMLElement;
            await waitFor(() => {
                input = getByLabelText('resources.artists.fields.id');
                expect(input.getAttribute('role')).toEqual('button');
            });

            fireEvent.mouseDown(input);
            fireEvent.click(getByText('Event 1'));
            fireEvent.click(getByText('Event 2'));
            // Close the dropdown by clicking outside it
            fireEvent.click(input);
            fireEvent.click(getByLabelText('ra.action.save'));

            await waitFor(() => {
                expect(onSuccess).toHaveBeenCalled();
            });

            // For some reason, the react tree is not cleaned up up before running subsequent tests
            // This ensure it does not interfere with them
            unmount();
        });

        it('should call the onFailure function when update fails', async () => {
            const dataProvider = {
                ...defaultDataProvider,
                update: jest.fn(() => Promise.reject()),
            } as DataProvider;
            const onFailure = jest.fn();

            const { getByLabelText, unmount } = renderWithRedux(
                <EditArtist
                    dataProvider={dataProvider}
                    onFailure={onFailure}
                />,
                initialState
            );

            await waitFor(() => {
                expect(
                    getByLabelText('resources.artists.fields.id').getAttribute(
                        'role'
                    )
                ).toEqual('button');
            });

            fireEvent.change(getByLabelText('resources.artists.fields.name'), {
                target: { value: 'another' },
            });
            fireEvent.click(getByLabelText('ra.action.save'));

            await waitFor(() => {
                expect(onFailure).toHaveBeenCalled();
            });

            // For some reason, the react tree is not cleaned up up before running subsequent tests
            // This ensure it does not interfere with them
            unmount();
        });

        it('should call the onFailure function when creating the references fails', async () => {
            const dataProvider = {
                ...defaultDataProvider,
                create: jest
                    .fn()
                    .mockRejectedValue(new Error('Reference error')),
            } as DataProvider;
            const onFailure = jest.fn();

            const { getByLabelText, getByText, unmount } = renderWithRedux(
                <EditArtist
                    dataProvider={dataProvider}
                    onFailure={onFailure}
                />,
                initialState
            );

            let input: HTMLElement;
            await waitFor(() => {
                input = getByLabelText('resources.artists.fields.id');
                expect(input.getAttribute('role')).toEqual('button');
            });

            fireEvent.mouseDown(input);
            fireEvent.click(getByText('Event 1'));
            fireEvent.click(getByText('Event 2'));
            // Close the dropdown by clicking outside it
            fireEvent.click(input);
            fireEvent.click(getByLabelText('ra.action.save'));

            await waitFor(() => {
                expect(onFailure).toHaveBeenCalled();
            });

            // For some reason, the react tree is not cleaned up up before running subsequent tests
            // This ensure it does not interfere with them
            unmount();
        });
    });
});
