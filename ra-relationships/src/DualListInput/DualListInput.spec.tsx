import React from 'react';
import { Form } from 'react-final-form';
import { render, fireEvent } from '@testing-library/react';
import { DualListInput } from './DualListInput';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

const choices = [
    { id: 0, name: 'Rock', icon: <MusicNoteIcon /> },
    { id: 1, name: 'Jazz', icon: <MusicNoteIcon /> },
    { id: 2, name: 'Country', icon: <MusicNoteIcon /> },
    { id: 3, name: 'Pop', icon: <MusicNoteIcon /> },
    { id: 4, name: 'Metal', icon: <MusicNoteIcon /> },
    { id: 5, name: 'Rap', icon: <MusicNoteIcon /> },
    { id: 6, name: 'Raegae', icon: <MusicNoteIcon /> },
    { id: 7, name: 'Classical', icon: <MusicNoteIcon /> },
];

const defaultProps = {
    label: 'Items',
    source: 'items',
    choices,
};

describe('DualListInput', () => {
    test('should allow to move items from one list to the other', () => {
        let finalValues;

        const { getByText } = render(
            <Form
                onSubmit={(): void => undefined}
                render={(): JSX.Element => (
                    <DualListInput
                        {...defaultProps}
                        onChange={(value): void => {
                            finalValues = value;
                        }}
                    />
                )}
            />
        );

        fireEvent.click(getByText('Rock'));
        fireEvent.click(getByText('ra-relationships.duallistinput.select'));
        expect(finalValues).toEqual([0]);

        fireEvent.click(getByText('Pop'));
        fireEvent.click(getByText('Metal'));
        // Adding an item already in the values should not remove it nor duplicate it
        fireEvent.click(getByText('Rock'));
        fireEvent.click(getByText('ra-relationships.duallistinput.select'));
        expect(finalValues).toEqual([0, 3, 4]);

        fireEvent.click(getByText('Metal'));
        fireEvent.click(getByText('Rock'));
        fireEvent.click(getByText('ra-relationships.duallistinput.unselect'));
        expect(finalValues).toEqual([3]);
    });

    test('should display its initial values correctly', () => {
        let finalValues;
        const initialValues = { items: [0, 3, 4] };
        const { getByText } = render(
            <Form
                initialValues={initialValues}
                onSubmit={(): void => undefined}
                render={(): JSX.Element => (
                    <DualListInput
                        {...defaultProps}
                        onChange={(value): void => {
                            finalValues = value;
                        }}
                    />
                )}
            />
        );

        fireEvent.click(getByText('Rock'));
        fireEvent.click(getByText('ra-relationships.duallistinput.select'));
        expect(finalValues).toEqual([0, 3, 4]);

        fireEvent.click(getByText('Metal'));
        fireEvent.click(getByText('Rock'));
        fireEvent.click(getByText('ra-relationships.duallistinput.unselect'));
        expect(finalValues).toEqual([3]);
    });

    test('double clicking an item should move from its list to the other', () => {
        let finalValues;
        const initialValues = { items: [0, 3, 4] };
        const { getByText } = render(
            <Form
                initialValues={initialValues}
                onSubmit={(): void => undefined}
                render={(): JSX.Element => (
                    <DualListInput
                        {...defaultProps}
                        onChange={(value): void => {
                            finalValues = value;
                        }}
                    />
                )}
            />
        );

        fireEvent.doubleClick(getByText('Rock'));
        expect(finalValues).toEqual([3, 4]);

        fireEvent.doubleClick(getByText('Rock'));
        fireEvent.click(getByText('ra-relationships.duallistinput.unselect'));
        expect(finalValues).toEqual([3, 4, 0]);
    });

    test('should render a Skeleton if loading is true but only after a second has passed', async () => {
        const { queryAllByLabelText } = render(
            <Form
                validateOnBlur
                onSubmit={jest.fn()}
                render={(): JSX.Element => (
                    <DualListInput
                        {...{
                            ...defaultProps,
                            loaded: true,
                            loading: true,
                        }}
                    />
                )}
            />
        );

        expect(queryAllByLabelText('ra.message.loading')).toHaveLength(0);

        await new Promise(resolve => setTimeout(resolve, 1100));

        expect(queryAllByLabelText('ra.message.loading')).toHaveLength(2);
    });

    test('should not render a Skeleton if loading is false', () => {
        const { queryAllByLabelText } = render(
            <Form
                validateOnBlur
                onSubmit={jest.fn()}
                render={(): JSX.Element => <DualListInput {...defaultProps} />}
            />
        );

        expect(queryAllByLabelText('ra.message.loading')).toHaveLength(0);
    });
});
