import * as React from 'react';
import { act, fireEvent } from '@testing-library/react';
import { DataProviderContext, required, Create, TextInput } from 'react-admin';
import { renderWithRedux } from 'ra-test';
import { FC } from 'react';

import WizardForm from './WizardForm';
import WizardFormStep from './WizardFormStep';

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

const defaultCreateProps = {
    basePath: '/',
    resource: 'posts',
};

const PostCreate: FC<any> = props => (
    <Create {...props}>
        <WizardForm>
            <WizardFormStep label="First step">
                <TextInput source="title" validate={required()} />
            </WizardFormStep>
            <WizardFormStep label="Second step">
                <TextInput source="description" />
            </WizardFormStep>
            <WizardFormStep label="Third step">
                <TextInput source="fullDescription" validate={required()} />
            </WizardFormStep>
        </WizardForm>
    </Create>
);

describe('WizardForm', () => {
    it('should display the same number of steps as declared WizardFormStep', () => {
        const { queryByText, unmount } = renderWithRedux(
            <DataProviderContext.Provider value={fakeFataProvider}>
                <PostCreate {...defaultCreateProps} />
            </DataProviderContext.Provider>,
            {}
        );

        expect(queryByText('First step')).not.toBeNull();
        expect(queryByText('Second step')).not.toBeNull();
        expect(queryByText('Third step')).not.toBeNull();
        expect(queryByText('resources.posts.fields.title *')).not.toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    it('should disable next button when current step is not valid', () => {
        const { getByText, unmount } = renderWithRedux(
            <DataProviderContext.Provider value={fakeFataProvider}>
                <PostCreate {...defaultCreateProps} />
            </DataProviderContext.Provider>,
            {}
        );

        expect(
            getByText('ra-form-layout.action.next').closest('button').disabled
        ).toBeTruthy();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    it('should enable next button when current step is valid', () => {
        const { getByText, unmount } = renderWithRedux(
            <DataProviderContext.Provider value={fakeFataProvider}>
                <PostCreate {...defaultCreateProps} record={{ title: 'Foo' }} />
            </DataProviderContext.Provider>,
            {}
        );

        expect(
            getByText('ra-form-layout.action.next').closest('button').disabled
        ).toBeFalsy();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    it('should go to the next step on next button click', () => {
        const { queryByText, getByText, unmount } = renderWithRedux(
            <DataProviderContext.Provider value={fakeFataProvider}>
                <PostCreate {...defaultCreateProps} record={{ title: 'Foo' }} />
            </DataProviderContext.Provider>,
            {}
        );

        act(() => {
            fireEvent.click(
                getByText('ra-form-layout.action.next').closest('button')
            );
        });

        expect(
            queryByText('resources.posts.fields.description')
        ).not.toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    it('should go back on previous button click', async () => {
        const { queryByText, getByText, unmount } = renderWithRedux(
            <DataProviderContext.Provider value={fakeFataProvider}>
                <PostCreate {...defaultCreateProps} record={{ title: 'Foo' }} />
            </DataProviderContext.Provider>,
            {}
        );

        act(() => {
            fireEvent.click(
                getByText('ra-form-layout.action.next').closest('button')
            );
        });

        await new Promise(resolve => setTimeout(resolve));

        expect(
            queryByText('resources.posts.fields.description')
        ).not.toBeNull();

        act(() => {
            fireEvent.click(
                getByText('ra-form-layout.action.previous').closest('button')
            );
        });

        await new Promise(resolve => setTimeout(resolve));

        expect(queryByText('resources.posts.fields.description')).toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });

    it('should display a save button instead of next at the last step', async () => {
        const { queryByText, getByText, unmount } = renderWithRedux(
            <DataProviderContext.Provider value={fakeFataProvider}>
                <PostCreate {...defaultCreateProps} record={{ title: 'Foo' }} />
            </DataProviderContext.Provider>,
            {}
        );

        act(() => {
            fireEvent.click(
                getByText('ra-form-layout.action.next').closest('button')
            );
        });

        await new Promise(resolve => setTimeout(resolve));

        act(() => {
            fireEvent.click(
                getByText('ra-form-layout.action.next').closest('button')
            );
        });

        await new Promise(resolve => setTimeout(resolve));

        expect(queryByText('ra.action.save')).not.toBeNull();

        // For some reason, the react tree is not cleaned up up before running subsequent tests
        // This ensure it does not interfere with them
        unmount();
    });
});
