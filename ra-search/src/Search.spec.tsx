import React, { ReactElement } from 'react';
import { fireEvent, waitFor, within } from '@testing-library/react';
import { DataProviderContext } from 'react-admin';
import { renderWithRedux } from 'ra-test';
import { createMemoryHistory } from 'history';

import { Search } from './Search';
import { Router, Link } from 'react-router-dom';
import { SearchResultsPanel } from './SearchResultsPanel';
import { SearchResultItem } from './SearchResultItem';
import { SearchResultDataItem } from './types';
import { useSearchResults } from './SearchResultContext';

const dataProvider = {
    search: jest.fn().mockResolvedValue({
        data: [
            {
                id: 'artists/1',
                type: 'artists',
                url: '/artists/1',
                content: {
                    id: 1,
                    label: 'Jimi Hendrix',
                    description: 'James Marshall Hendrix',
                },
            },
            {
                id: 'albums/1',
                type: 'albums',
                url: '/albums/1',
                content: {
                    id: 1,
                    label: 'Are You Experienced',
                    description: 'The debut studio album',
                    year: 1967,
                },
            },
            {
                id: 'albums/2',
                type: 'albums',
                url: '/albums/2',
                content: {
                    id: 2,
                    label: 'Axis: Bold as Love',
                    description: 'The second studio album',
                    year: 1967,
                },
            },
        ],
        total: 3,
    }),
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
describe('Search', () => {
    it('Allows to search and displays results with the default rendering', async () => {
        const history = createMemoryHistory();
        const {
            getByPlaceholderText,
            queryAllByRole,
            getByText,
            unmount,
        } = renderWithRedux(
            <Router history={history}>
                <DataProviderContext.Provider value={dataProvider}>
                    <Search />
                </DataProviderContext.Provider>
            </Router>
        );

        fireEvent.change(getByPlaceholderText('ra.action.search'), {
            target: { value: 'a' },
        });

        await waitFor(() => {
            const listItems = queryAllByRole('button', {
                hidden: true, // #FIXME Material-UI modals set the aria-hidden attribute on the main app container (can be seen on root in storybook when the popover is show)
            }) as HTMLLinkElement[];
            expect(listItems).toHaveLength(4); // 1 clear button and 3 list items

            getByText('resources.artists.name'); // Expect a sub header

            expect(listItems[1].href).toEqual('http://localhost/artists/1');
            expect(
                within(listItems[1]).queryByText('Jimi Hendrix')
            ).not.toBeNull();
            expect(
                within(listItems[1]).queryByText('James Marshall Hendrix')
            ).not.toBeNull();

            getByText('resources.albums.name'); // Expect another sub header

            expect(listItems[2].href).toEqual('http://localhost/albums/1');
            expect(
                within(listItems[2]).queryByText('The debut studio album')
            ).not.toBeNull();

            expect(listItems[3].href).toEqual('http://localhost/albums/2');
            expect(
                within(listItems[3]).queryByText('The second studio album')
            ).not.toBeNull();
        });

        expect(dataProvider.search).toHaveBeenCalledWith('a', {});
        unmount();
    });

    it('Allows to search and displays results with customized items', async () => {
        const history = createMemoryHistory();
        const {
            getByPlaceholderText,
            getAllByRole,
            getByText,
            unmount,
        } = renderWithRedux(
            <Router history={history}>
                <DataProviderContext.Provider value={dataProvider}>
                    <Search>
                        <SearchResultsPanel>
                            <SearchResultItem
                                label={(record: SearchResultDataItem): string =>
                                    `Label: ${record.content.label}`
                                }
                                description={(
                                    record: SearchResultDataItem
                                ): string =>
                                    `Desc: ${record.content.description}`
                                }
                            />
                        </SearchResultsPanel>
                    </Search>
                </DataProviderContext.Provider>
            </Router>
        );

        fireEvent.change(getByPlaceholderText('ra.action.search'), {
            target: { value: 'a' },
        });

        await waitFor(() => {
            const listItems = getAllByRole('button', {
                hidden: true, // #FIXME Material-UI modals set the aria-hidden attribute on the main app container (can be seen on root in storybook when the popover is show)
            });
            expect(listItems).toHaveLength(4); // 1 clear button and 3 list items

            getByText('resources.artists.name'); // Expect a sub header

            expect(
                within(listItems[1]).queryByText('Label: Jimi Hendrix')
            ).not.toBeNull();
            expect(
                within(listItems[1]).queryByText('Desc: James Marshall Hendrix')
            ).not.toBeNull();

            getByText('resources.albums.name'); // Expect another sub header

            expect(
                within(listItems[2]).queryByText('Label: Are You Experienced')
            ).not.toBeNull();
            expect(
                within(listItems[2]).queryByText('Desc: The debut studio album')
            ).not.toBeNull();

            expect(
                within(listItems[3]).queryByText('Label: Axis: Bold as Love')
            ).not.toBeNull();
            expect(
                within(listItems[3]).queryByText(
                    'Desc: The second studio album'
                )
            ).not.toBeNull();
        });

        expect(dataProvider.search).toHaveBeenCalledWith('a', {});

        unmount();
    });

    it('Allows to search and displays results with custom items', async () => {
        const history = createMemoryHistory();
        const CustomItem = ({
            data,
        }: {
            data?: SearchResultDataItem;
        }): ReactElement => <li data-id={data.id}>{data.content.label}</li>;

        const {
            getByPlaceholderText,
            getAllByRole,
            getByText,
            unmount,
        } = renderWithRedux(
            <Router history={history}>
                <DataProviderContext.Provider value={dataProvider}>
                    <Search>
                        <SearchResultsPanel>
                            <CustomItem />
                        </SearchResultsPanel>
                    </Search>
                </DataProviderContext.Provider>
            </Router>
        );

        fireEvent.change(getByPlaceholderText('ra.action.search'), {
            target: { value: 'a' },
        });

        await waitFor(() => {
            const listItems = getAllByRole('listitem', {
                hidden: true, // #FIXME Material-UI modals set the aria-hidden attribute on the main app container (can be seen on root in storybook when the popover is show)
            });
            expect(listItems).toHaveLength(3);

            getByText('resources.artists.name'); // Expect sub header

            expect(
                within(listItems[0])
                    .getByText('Jimi Hendrix')
                    .attributes.getNamedItem('data-id').value
            ).toEqual('artists/1');

            getByText('resources.albums.name'); // Expect sub header

            expect(
                within(listItems[1])
                    .getByText('Are You Experienced')
                    .attributes.getNamedItem('data-id').value
            ).toEqual('albums/1');

            expect(
                within(listItems[2])
                    .getByText('Axis: Bold as Love')
                    .attributes.getNamedItem('data-id').value
            ).toEqual('albums/2');
        });

        expect(dataProvider.search).toHaveBeenCalledWith('a', {});

        unmount();
    });

    it('Allows to search and displays results with a custom panel', async () => {
        const history = createMemoryHistory();
        const CustomPanel = (): ReactElement => {
            const { data, onClose } = useSearchResults();

            return (
                <ul>
                    {data.map(item => (
                        <li key={item.id}>
                            <Link to={item.url} onClick={onClose}>
                                {item.content.label}
                            </Link>
                            <p>{item.content.description}</p>
                        </li>
                    ))}
                </ul>
            );
        };

        const {
            getByPlaceholderText,
            getAllByRole,
            queryByText,
            unmount,
        } = renderWithRedux(
            <Router history={history}>
                <DataProviderContext.Provider value={dataProvider}>
                    <Search>
                        <CustomPanel />
                    </Search>
                </DataProviderContext.Provider>
            </Router>
        );

        fireEvent.change(getByPlaceholderText('ra.action.search'), {
            target: { value: 'a' },
        });

        await waitFor(() => {
            const listItems = getAllByRole('listitem', {
                hidden: true, // #FIXME Material-UI modals set the aria-hidden attribute on the main app container (can be seen on root in storybook when the popover is show)
            });
            expect(listItems).toHaveLength(3);

            expect(queryByText('resources.artists.name')).toBeNull(); // Expect no sub header

            expect(
                within(listItems[0])
                    .getByText('Jimi Hendrix')
                    .attributes.getNamedItem('href').value
            ).toEqual('/artists/1');

            expect(queryByText('resources.albums.name')).toBeNull(); // Expect no sub header

            expect(
                within(listItems[1])
                    .getByText('Are You Experienced')
                    .attributes.getNamedItem('href').value
            ).toEqual('/albums/1');

            expect(
                within(listItems[2])
                    .getByText('Axis: Bold as Love')
                    .attributes.getNamedItem('href').value
            ).toEqual('/albums/2');
        });

        expect(dataProvider.search).toHaveBeenCalledWith('a', {});

        unmount();
    });

    it('Allows to navigate with down arrow key', async () => {
        const history = createMemoryHistory();
        const {
            getByPlaceholderText,
            queryAllByRole,
            unmount,
        } = renderWithRedux(
            <Router history={history}>
                <DataProviderContext.Provider value={dataProvider}>
                    <Search />
                </DataProviderContext.Provider>
            </Router>
        );

        fireEvent.change(getByPlaceholderText('ra.action.search'), {
            target: { value: 'a' },
        });
        const getActiveElement = (): HTMLLinkElement =>
            window.document.activeElement as HTMLLinkElement;
        await waitFor(() => {
            const listItems = queryAllByRole('button', {
                hidden: true, // #FIXME Material-UI modals set the aria-hidden attribute on the main app container (can be seen on root in storybook when the popover is show)
            }) as HTMLLinkElement[];
            expect(listItems).toHaveLength(4); // 1 clear button and 3 list items

            fireEvent.keyDown(window.document, { key: 'ArrowDown' });
            expect(getActiveElement().href).toEqual(listItems[1].href);

            fireEvent.keyDown(window.document, { key: 'ArrowDown' });
            expect(getActiveElement().href).toEqual(listItems[2].href);

            fireEvent.keyDown(window.document, { key: 'ArrowDown' });
            expect(getActiveElement().href).toEqual(listItems[3].href);

            fireEvent.keyDown(window.document, { key: 'ArrowDown' });
            expect(getActiveElement().href).toEqual(listItems[1].href);
        });

        unmount();
    });

    it('Allows to navigate with up arrow key', async () => {
        const history = createMemoryHistory();
        const {
            getByPlaceholderText,
            queryAllByRole,
            unmount,
        } = renderWithRedux(
            <Router history={history}>
                <DataProviderContext.Provider value={dataProvider}>
                    <Search />
                </DataProviderContext.Provider>
            </Router>
        );

        fireEvent.change(getByPlaceholderText('ra.action.search'), {
            target: { value: 'a' },
        });
        await waitFor(() => {
            const getActiveElement = (): HTMLLinkElement =>
                window.document.activeElement as HTMLLinkElement;
            const listItems = queryAllByRole('button', {
                hidden: true, // #FIXME Material-UI modals set the aria-hidden attribute on the main app container (can be seen on root in storybook when the popover is show)
            }) as HTMLLinkElement[];
            expect(listItems).toHaveLength(4); // 1 clear button and 3 list items

            fireEvent.keyDown(window, { key: 'ArrowUp' });
            expect(getActiveElement().href).toEqual(listItems[3].href);

            fireEvent.keyDown(window, { key: 'ArrowUp' });
            expect(getActiveElement().href).toEqual(listItems[2].href);

            fireEvent.keyDown(window, { key: 'ArrowUp' });
            expect(getActiveElement().href).toEqual(listItems[1].href);

            fireEvent.keyDown(window, { key: 'ArrowUp' });
            expect(getActiveElement().href).toEqual(listItems[3].href);
        });
        unmount();
    });
});
