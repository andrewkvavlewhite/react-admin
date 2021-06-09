import React, { FC } from 'react';
import { cleanup, act, fireEvent } from '@testing-library/react';
import {
    TextField,
    defaultTheme,
    List,
    ListProps,
    DataProviderContext,
} from 'react-admin';
import { renderWithRedux } from 'ra-test';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import EditableDatagrid from './EditableDatagrid';
import RowForm from './RowForm';

const defaultListProps: ListProps = {
    basePath: '/artists',
    hasCreate: false,
    hasEdit: false,
    hasList: false,
    hasShow: false,
    match: { path: '/artists', params: {}, isExact: false, url: '' },
    resource: 'artists',
};

const defaultStateForList = {
    admin: {
        resources: {
            artists: {
                list: {
                    ids: [],
                    params: {},
                    selectedIds: [],
                    total: 0,
                    cachedRequests: {},
                },
            },
        },
    },
};

const FreePropsWrapper: FC<{ [key: string]: any }> = ({ children }) => (
    <span>{children}</span>
);

const CreateForm: FC = props => (
    <RowForm {...props}>
        <FreePropsWrapper>CREATE FORM</FreePropsWrapper>
    </RowForm>
);

const EditForm: FC = props => (
    <RowForm {...props}>
        <FreePropsWrapper>EDIT FORM</FreePropsWrapper>
    </RowForm>
);

describe('EditableDatagrid', () => {
    let dataProvider;

    beforeEach(() => {
        dataProvider = {
            create: jest.fn(() => Promise.resolve({ data: { id: 1 } })),
            delete: jest.fn(() => Promise.resolve({ data: { id: 1 } })),
            deleteMany: jest.fn(() => Promise.resolve({ data: [] })),
            update: jest.fn(() =>
                Promise.resolve({ data: { id: 1, title: 'Foo' } })
            ),
            updateMany: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
            getList: jest.fn(() =>
                Promise.resolve({ data: [{ id: 1, title: 'Foo' }], total: 1 })
            ),
            getMany: jest.fn(() => Promise.resolve({ data: [], total: 0 })),
            getOne: jest.fn(() =>
                Promise.resolve({ data: { id: 1, title: 'Foo' } })
            ),
            getManyReference: jest.fn(() =>
                Promise.resolve({
                    data: [],
                    total: 0,
                })
            ),
        };
    });

    afterEach(cleanup);

    it('should render a datagrid', async () => {
        dataProvider.getList = jest.fn(() =>
            Promise.resolve({
                data: [
                    { id: 1, title: 'Foo' },
                    { id: 2, title: 'Bar' },
                ],
                total: 2,
            })
        );

        const { queryByText, unmount } = renderWithRedux(
            <ThemeProvider theme={createMuiTheme(defaultTheme)}>
                <DataProviderContext.Provider value={dataProvider}>
                    <List
                        {...defaultListProps}
                        hasCreate
                        sort={{ field: 'id', order: 'DESC' }}
                    >
                        <EditableDatagrid
                            undoable
                            createForm={<CreateForm />}
                            editForm={<EditForm />}
                            rowClick="edit"
                        >
                            <TextField source="title" />
                        </EditableDatagrid>
                    </List>
                </DataProviderContext.Provider>
            </ThemeProvider>,
            defaultStateForList
        );

        await new Promise(resolve => setTimeout(resolve));

        expect(queryByText('Foo')).not.toBeNull();
        expect(queryByText('Bar')).not.toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    it('should display an edit form on datagrid row click', async () => {
        dataProvider.getList = jest.fn(() =>
            Promise.resolve({
                data: [{ id: 1, title: 'Baz' }],
                total: 1,
            })
        );

        const { queryByText, unmount } = renderWithRedux(
            <ThemeProvider theme={createMuiTheme(defaultTheme)}>
                <DataProviderContext.Provider value={dataProvider}>
                    <List
                        {...defaultListProps}
                        hasCreate
                        sort={{ field: 'id', order: 'DESC' }}
                    >
                        <EditableDatagrid
                            undoable
                            createForm={<CreateForm />}
                            editForm={<EditForm />}
                            rowClick="edit"
                        >
                            <TextField source="title" />
                        </EditableDatagrid>
                    </List>
                </DataProviderContext.Provider>
            </ThemeProvider>,
            defaultStateForList
        );

        await new Promise(resolve => setTimeout(resolve));

        expect(queryByText('Baz')).not.toBeNull();
        expect(queryByText('EDIT FORM')).toBeNull();

        act(() => {
            fireEvent.click(queryByText('Baz'));
        });

        expect(queryByText('EDIT FORM')).not.toBeNull();
        expect(queryByText('Baz')).toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    it('should display a create form on datagrid create button click', async () => {
        dataProvider.getList = jest.fn(() =>
            Promise.resolve({
                data: [{ id: 1, title: 'Baz' }],
                total: 1,
            })
        );

        const history = createMemoryHistory();
        const { queryByText, getByLabelText, unmount } = renderWithRedux(
            <ThemeProvider theme={createMuiTheme(defaultTheme)}>
                <DataProviderContext.Provider value={dataProvider}>
                    <Router history={history}>
                        <List
                            {...defaultListProps}
                            hasCreate
                            sort={{ field: 'id', order: 'DESC' }}
                        >
                            <EditableDatagrid
                                undoable
                                createForm={<CreateForm />}
                                editForm={<EditForm />}
                                rowClick="edit"
                            >
                                <TextField source="title" />
                            </EditableDatagrid>
                        </List>
                    </Router>
                </DataProviderContext.Provider>
            </ThemeProvider>,
            defaultStateForList
        );

        await new Promise(resolve => setTimeout(resolve));

        expect(queryByText('Baz')).not.toBeNull();
        expect(queryByText('CREATE FORM')).toBeNull();

        act(() => {
            fireEvent.click(getByLabelText('ra.action.create'));
        });

        expect(queryByText('CREATE FORM')).not.toBeNull();
        expect(queryByText('Baz')).not.toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    it('should still display a list when page is empty and empty prop is false', async () => {
        dataProvider.getList = jest.fn(() =>
            Promise.resolve({
                data: [],
                total: 0,
            })
        );

        const { queryByText, unmount } = renderWithRedux(
            <ThemeProvider theme={createMuiTheme(defaultTheme)}>
                <DataProviderContext.Provider value={dataProvider}>
                    <List
                        {...defaultListProps}
                        hasCreate
                        sort={{ field: 'id', order: 'DESC' }}
                        empty={false}
                    >
                        <EditableDatagrid
                            undoable
                            createForm={<CreateForm />}
                            editForm={<EditForm />}
                            rowClick="edit"
                        >
                            <TextField source="title" />
                        </EditableDatagrid>
                    </List>
                </DataProviderContext.Provider>
            </ThemeProvider>,
            defaultStateForList
        );

        expect(queryByText('ra.action.create')).not.toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });
});
