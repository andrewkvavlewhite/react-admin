import * as React from 'react';
import { renderWithRedux } from 'ra-test';
import { fireEvent } from '@testing-library/react';

import { AppLocationContext } from '../app-location';
import { MenuItem, MultiLevelMenu } from './';
import { MultiLevelMenuProps } from './MultiLevelMenu';

const BasicMultiLevelMenu = (
    props: MultiLevelMenuProps
): React.ReactElement => (
    <MultiLevelMenu {...props}>
        <MenuItem name="dashboard" to="/" exact label="Dashboard" />
        <MenuItem name="songs" to="/songs" label="Songs" />
        <MenuItem name="artists" to={'/artists?filter={}'} label="Artists">
            <MenuItem
                name="artists.rock"
                to={'/artists?filter={"type":"Rock"}'}
                label="Rock"
            >
                <MenuItem
                    name="artists.rock.pop"
                    to={'/artists?filter={"type":"Pop Rock"}'}
                    label="Pop Rock"
                />
                <MenuItem
                    name="artists.rock.folk"
                    to={'/artists?filter={"type":"Folk Rock"}'}
                    label="Folk Rock"
                />
            </MenuItem>
            <MenuItem
                name="artists.jazz"
                to={'/artists?filter={"type":"Jazz"}'}
                label="Jazz"
            >
                <MenuItem
                    name="artists.jazz.rb"
                    to={'/artists?filter={"type":"RB"}'}
                    label="R&B"
                />
            </MenuItem>
        </MenuItem>
    </MultiLevelMenu>
);

describe('MultiLevelMenu', () => {
    test('should display a menu with sub menus', () => {
        const { queryByText, queryAllByLabelText, unmount } = renderWithRedux(
            <AppLocationContext>
                <BasicMultiLevelMenu />
            </AppLocationContext>,
            {
                admin: {
                    ui: {
                        sidebarOpen: true,
                    },
                },
            }
        );

        expect(queryByText('Dashboard')).not.toBeNull();
        expect(queryByText('Songs')).not.toBeNull();
        expect(queryByText('Artists')).not.toBeNull();

        let expandButtons = queryAllByLabelText('ra.action.expand');
        expect(expandButtons).toHaveLength(1);

        fireEvent.click(expandButtons[0]);
        expect(queryByText('Rock')).not.toBeNull();
        expect(queryByText('Jazz')).not.toBeNull();

        const closeButtons = queryAllByLabelText('ra.action.close');
        expect(closeButtons).toHaveLength(1);

        expandButtons = queryAllByLabelText('ra.action.expand');
        expect(expandButtons).toHaveLength(2);
        fireEvent.click(expandButtons[0]);
        expect(queryByText('Pop Rock')).not.toBeNull();
        expect(queryByText('Folk Rock')).not.toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    test('should open sub menus according to current app location', () => {
        const { queryByText, queryAllByLabelText, unmount } = renderWithRedux(
            <AppLocationContext
                initialLocation={{ path: 'artists.jazz.rb', values: {} }}
            >
                <BasicMultiLevelMenu />
            </AppLocationContext>,
            {
                admin: {
                    ui: {
                        sidebarOpen: true,
                    },
                },
            }
        );

        expect(queryByText('Dashboard')).not.toBeNull();
        expect(queryByText('Songs')).not.toBeNull();
        expect(queryByText('Artists')).not.toBeNull();
        expect(queryByText('Rock')).not.toBeNull();
        expect(queryByText('Pop Rock')).toBeNull();
        expect(queryByText('Folk Rock')).toBeNull();
        expect(queryByText('Jazz')).not.toBeNull();
        expect(queryByText('R&B')).not.toBeNull();

        const expandButtons = queryAllByLabelText('ra.action.expand');
        // Only Rock
        expect(expandButtons).toHaveLength(1);

        const closeButtons = queryAllByLabelText('ra.action.close');
        // Artists and Jazz
        expect(closeButtons).toHaveLength(2);

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    test('should open sub menus immediately if initialOpen is set to true', () => {
        const { queryByText, unmount } = renderWithRedux(
            <AppLocationContext>
                <BasicMultiLevelMenu initialOpen />
            </AppLocationContext>,
            {
                admin: {
                    ui: {
                        sidebarOpen: true,
                    },
                },
            }
        );

        expect(queryByText('Dashboard')).not.toBeNull();
        expect(queryByText('Songs')).not.toBeNull();
        expect(queryByText('Artists')).not.toBeNull();
        expect(queryByText('Rock')).not.toBeNull();
        expect(queryByText('Pop Rock')).not.toBeNull();
        expect(queryByText('Folk Rock')).not.toBeNull();
        expect(queryByText('Jazz')).not.toBeNull();
        expect(queryByText('R&B')).not.toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });
});
