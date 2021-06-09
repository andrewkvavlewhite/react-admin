import React, { FC } from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';

import { useTour, TourProvider } from './';

const tour = {
    steps: [
        {
            target: '#step-1',
            content: 'Step 1',
        },
        {
            target: '#step-2',
            content: 'Step 2',
        },
    ],
};

const ComponentToTest: FC = () => {
    const [
        { running, stepIndex, activeTour },
        { cancel, start, stop, next, previous },
    ] = useTour();
    return (
        <div id="test">
            <div>running:{`${running}`}</div>
            <div>stepIndex:{`${stepIndex}`}</div>
            <div>
                activeTour:
                {`${activeTour}`}
            </div>
            <button
                onClick={(): void => {
                    start('test');
                }}
            >
                starty
            </button>
            <button
                onClick={(): void => {
                    stop();
                }}
            >
                stopy
            </button>
            <button
                onClick={(): void => {
                    cancel();
                }}
            >
                cancelly
            </button>
            <button
                onClick={(): void => {
                    next();
                }}
            >
                nexty
            </button>
            <button
                onClick={(): void => {
                    previous();
                }}
            >
                previousy
            </button>
            <div id="step-1">1</div>
            <div id="step-2">2</div>
        </div>
    );
};

const checkState = async (
    queryByText,
    { running, stepIndex, activeTour }
): Promise<any> => {
    await waitFor(() =>
        expect(queryByText(`running:${running}`)).not.toBeNull()
    );
    await waitFor(() =>
        expect(queryByText(`stepIndex:${stepIndex}`)).not.toBeNull()
    );
    return await waitFor(() =>
        expect(queryByText(`activeTour:${activeTour}`)).not.toBeNull()
    );
};

describe('ra-tour', () => {
    afterEach(() => {
        cleanup();
    });

    it('should initialize not running', () => {
        const { queryByText } = render(
            <TourProvider tours={{ test: tour }}>
                <ComponentToTest />
            </TourProvider>
        );
        expect(queryByText('running:false')).not.toBeNull();
    });

    it('should start with first step', async () => {
        const { queryByText } = render(
            <TourProvider tours={{ test: tour }}>
                <ComponentToTest />
            </TourProvider>
        );

        expect(queryByText('running:false')).not.toBeNull();
        fireEvent.click(queryByText('starty'));

        await checkState(queryByText, {
            running: true,
            stepIndex: 0,
            activeTour: 'test',
        });
    });

    it('should navigate with useTour hook', async () => {
        const { queryByText } = render(
            <TourProvider tours={{ test: tour }}>
                <ComponentToTest />
            </TourProvider>
        );

        expect(queryByText('running:false')).not.toBeNull();

        fireEvent.click(queryByText('starty'));
        await checkState(queryByText, {
            running: true,
            stepIndex: 0,
            activeTour: 'test',
        });

        fireEvent.click(queryByText('nexty'));
        await checkState(queryByText, {
            running: true,
            stepIndex: 1,
            activeTour: 'test',
        });

        fireEvent.click(queryByText('previousy'));
        await checkState(queryByText, {
            running: true,
            stepIndex: 0,
            activeTour: 'test',
        });

        fireEvent.click(queryByText('stopy'));
        await checkState(queryByText, {
            running: false,
            stepIndex: 0,
            activeTour: null,
        });
    });

    it('should navigate with UI buttons', async () => {
        const { getByTestId, queryByText } = render(
            <TourProvider tours={{ test: tour }}>
                <ComponentToTest />
            </TourProvider>
        );

        expect(queryByText('running:false')).not.toBeNull();

        fireEvent.click(queryByText('starty'));
        await checkState(queryByText, {
            running: true,
            stepIndex: 0,
            activeTour: 'test',
        });

        fireEvent.click(getByTestId('tour-tooltip-primary-button'));
        await checkState(queryByText, {
            running: true,
            stepIndex: 1,
            activeTour: 'test',
        });

        fireEvent.click(getByTestId('tour-tooltip-back-button'));
        await checkState(queryByText, {
            running: true,
            stepIndex: 0,
            activeTour: 'test',
        });

        fireEvent.click(getByTestId('tour-tooltip-skip-button'));
        await checkState(queryByText, {
            running: false,
            stepIndex: 0,
            activeTour: null,
        });
    });

    it('should call before and after functions', async () => {
        const globalBefore = jest.fn();
        const globalAfter = jest.fn();
        const step1Before = jest.fn();
        const step1After = jest.fn();
        const step2Before = jest.fn();
        const step2After = jest.fn();
        const beforeAftertour = {
            before: globalBefore,
            steps: [
                {
                    before: step1Before,
                    target: '#step-1',
                    content: 'Step 1',
                    after: step1After,
                },
                {
                    before: step2Before,
                    target: '#step-2',
                    content: 'Step 2',
                    after: step2After,
                },
            ],
            after: globalAfter,
        };

        const { getByTestId, queryByText } = render(
            <TourProvider tours={{ test: beforeAftertour }}>
                <ComponentToTest />
            </TourProvider>
        );

        fireEvent.click(queryByText('starty'));
        await waitFor(() => expect(globalBefore).toHaveBeenCalled());
        await waitFor(() => expect(step1Before).toHaveBeenCalled());

        fireEvent.click(getByTestId('tour-tooltip-primary-button'));
        await waitFor(() => expect(step1After).toHaveBeenCalled());
        await waitFor(() => expect(step2Before).toHaveBeenCalled());

        fireEvent.click(getByTestId('tour-tooltip-primary-button'));
        await waitFor(() => expect(step2After).toHaveBeenCalled());
        await waitFor(() => expect(globalAfter).toHaveBeenCalled());
    });

    it('should call after function of the current step if stopped', async () => {
        const globalBefore = jest.fn();
        const globalAfter = jest.fn();
        const step1Before = jest.fn();
        const step1After = jest.fn();
        const step2Before = jest.fn();
        const step2After = jest.fn();
        const beforeAftertour = {
            before: globalBefore,
            steps: [
                {
                    before: step1Before,
                    target: '#step-1',
                    content: 'Step 1',
                    after: step1After,
                },
                {
                    before: step2Before,
                    target: '#step-2',
                    content: 'Step 2',
                    after: step2After,
                },
            ],
            after: globalAfter,
        };

        const { getByTestId, queryByText } = render(
            <TourProvider tours={{ test: beforeAftertour }}>
                <ComponentToTest />
            </TourProvider>
        );

        fireEvent.click(queryByText('starty'));
        await waitFor(() => expect(globalBefore).toHaveBeenCalled());
        await waitFor(() => expect(step1Before).toHaveBeenCalled());

        fireEvent.click(getByTestId('tour-tooltip-primary-button'));
        await waitFor(() => expect(step1After).toHaveBeenCalled());
        await waitFor(() => expect(step2Before).toHaveBeenCalled());

        fireEvent.click(queryByText('stopy'));
        await waitFor(() => expect(step2After).toHaveBeenCalled());
        await waitFor(() => expect(globalAfter).toHaveBeenCalled());
    });

    it('should not call after function of the current step if cancelled', async () => {
        const globalBefore = jest.fn();
        const globalAfter = jest.fn();
        const step1Before = jest.fn();
        const step1After = jest.fn();
        const step2Before = jest.fn();
        const step2After = jest.fn();
        const beforeAftertour = {
            before: globalBefore,
            steps: [
                {
                    before: step1Before,
                    target: '#step-1',
                    content: 'Step 1',
                    after: step1After,
                },
                {
                    before: step2Before,
                    target: '#step-2',
                    content: 'Step 2',
                    after: step2After,
                },
            ],
            after: globalAfter,
        };

        const { getByTestId, queryByText } = render(
            <TourProvider tours={{ test: beforeAftertour }}>
                <ComponentToTest />
            </TourProvider>
        );

        fireEvent.click(queryByText('starty'));
        await waitFor(() => expect(globalBefore).toHaveBeenCalled());
        await waitFor(() => expect(step1Before).toHaveBeenCalled());

        fireEvent.click(getByTestId('tour-tooltip-primary-button'));
        await waitFor(() => expect(step1After).toHaveBeenCalled());
        await waitFor(() => expect(step2Before).toHaveBeenCalled());

        fireEvent.click(queryByText('cancelly'));
        await waitFor(() => expect(step2After).not.toHaveBeenCalled());
        await waitFor(() => expect(globalAfter).toHaveBeenCalled());
    });
});
