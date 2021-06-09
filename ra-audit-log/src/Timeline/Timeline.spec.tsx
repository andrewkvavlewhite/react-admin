import React, { ReactElement } from 'react';
import { MemoryRouter } from 'react-router';
import { render, within } from '@testing-library/react';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import {
    mergeTranslations,
    TranslationProvider,
    useRecordContext,
} from 'react-admin';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { Timeline } from './Timeline';
import { raAuditLogLanguageEnglish } from '../i18n';
import { EventAuthor, EventRecord } from '../types';
import { LogGroup } from './types';
import { useTimelineGroup } from './useTimelineGroup';
import { TimelineGroup } from './TimelineGroup';

const records = [
    {
        id: 1,
        resource: 'products',
        action: 'create',
        date: new Date(2020, 0, 14, 13, 14, 0),
        payload: { data: { id: 123, name: 'Skyline Poster' } },
        author: {
            id: 123,
            fullName: 'Thomas A. Anderson',
            avatar:
                'https://upload.wikimedia.org/wikipedia/en/c/c6/NeoTheMatrix.jpg',
        },
    },
    {
        id: 2,
        resource: 'orders',
        action: 'create',
        date: new Date(2020, 0, 14, 9, 20, 0),
        payload: { data: { id: 456, name: '#123456' } },
        author: {
            id: 456,
            fullName: 'Takeshi Kovacs',
            avatar:
                'https://cdn.images.express.co.uk/img/dynamic/20/285x395/922644_1.jpg',
        },
    },
    {
        id: 3,
        resource: 'products',
        action: 'update',
        date: new Date(2020, 0, 6, 18, 48, 0),
        payload: {
            id: 789,
            data: { id: 789, name: 'NewYork Skyline Poster' },
            previousData: { id: 789, name: 'Skyline Poster' },
        },
        author: {
            id: 789,
            fullName: 'Takeshi Kovacs',
            avatar:
                'https://cdn.images.express.co.uk/img/dynamic/20/285x395/922644_1.jpg',
        },
    },
    {
        id: 4,
        resource: 'reviews',
        action: 'updateMany',
        date: new Date(2020, 0, 6, 20, 34, 0),
        payload: {
            ids: [234, 345, 567],
        },
        author: {
            id: 890,
            fullName: 'Henry Dorsett Case',
        },
    },
];

const i18nProvider = polyglotI18nProvider(() =>
    mergeTranslations(englishMessages, raAuditLogLanguageEnglish)
);

const initialState = {
    admin: {
        resources: {
            products: {
                props: {
                    name: 'products',
                },
            },
            orders: {
                props: {
                    name: 'orders',
                },
            },
            reviews: {
                props: {
                    name: 'reviews',
                },
            },
        },
    },
};
const fakeReducer = (state = initialState): any => state;

const store = createStore(fakeReducer);

describe('Timeline', () => {
    test('should render a list of audit logs grouped by days', () => {
        const { getByLabelText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <TranslationProvider
                        locale="en"
                        i18nProvider={i18nProvider}
                    >
                        <Timeline loaded records={records} />
                    </TranslationProvider>
                </MemoryRouter>
            </Provider>
        );

        const firstGroup = getByLabelText('Tuesday, January 14, 2020');
        const secondGroup = getByLabelText('Monday, January 6, 2020');

        expect(firstGroup.children).toHaveLength(2);
        const firstGroupItems = within(firstGroup).getAllByRole('listitem');
        expect(
            within(firstGroupItems[0]).queryByText('Thomas A. Anderson')
        ).not.toBeNull();
        expect(
            within(firstGroupItems[0]).queryByText(
                'created product Skyline Poster'
            )
        ).not.toBeNull();
        expect(
            within(firstGroupItems[0]).queryByText('1/14/2020, 1:14:00 PM')
        ).not.toBeNull();
        expect(
            within(firstGroupItems[1]).queryByText('Takeshi Kovacs')
        ).not.toBeNull();
        expect(
            within(firstGroupItems[1]).queryByText('created order #123456')
        ).not.toBeNull();
        expect(
            within(firstGroupItems[1]).queryByText('1/14/2020, 9:20:00 AM')
        ).not.toBeNull();

        expect(secondGroup.children).toHaveLength(2);
        const secondGroupItems = within(secondGroup).getAllByRole('listitem');
        expect(
            within(secondGroupItems[0]).queryByText('Henry Dorsett Case')
        ).not.toBeNull();
        expect(
            within(secondGroupItems[0]).queryByText(
                'updated reviews 234, 345, 567'
            )
        ).not.toBeNull();
        expect(
            within(secondGroupItems[0]).queryByText('1/6/2020, 8:34:00 PM')
        ).not.toBeNull();
        expect(
            within(secondGroupItems[1]).queryByText('Takeshi Kovacs')
        ).not.toBeNull();
        expect(
            within(secondGroupItems[1]).queryByText(
                'updated product NewYork Skyline Poster'
            )
        ).not.toBeNull();
        expect(
            within(secondGroupItems[1]).queryByText('1/6/2020, 6:48:00 PM')
        ).not.toBeNull();
    });

    test('should render a list of audit logs with custom group component', () => {
        const CustomGroupComponent = (): ReactElement => {
            const { label, records } = useTimelineGroup();

            return (
                <div>
                    <div aria-label={label}>Events: {records.length}</div>
                </div>
            );
        };

        const { getByLabelText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <TranslationProvider
                        locale="en"
                        i18nProvider={i18nProvider}
                    >
                        <Timeline loaded records={records}>
                            <CustomGroupComponent />
                        </Timeline>
                    </TranslationProvider>
                </MemoryRouter>
            </Provider>
        );

        const firstGroup = getByLabelText('Tuesday, January 14, 2020');
        const secondGroup = getByLabelText('Monday, January 6, 2020');

        expect(within(firstGroup).queryByText('Events: 2')).not.toBeNull();
        expect(within(secondGroup).queryByText('Events: 2')).not.toBeNull();
    });

    test('should render a list of audit logs with custom item component', () => {
        const CustomItemComponent = (props: any): ReactElement => {
            const record = useRecordContext<EventRecord>(props);

            return (
                <div>
                    <div aria-label={record.author.fullName}>
                        {record.action}
                    </div>
                </div>
            );
        };

        const CustomGroupComponent = (): ReactElement => (
            <TimelineGroup>
                <CustomItemComponent />
            </TimelineGroup>
        );

        const { getByLabelText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <TranslationProvider
                        locale="en"
                        i18nProvider={i18nProvider}
                    >
                        <Timeline loaded records={records}>
                            <CustomGroupComponent />
                        </Timeline>
                    </TranslationProvider>
                </MemoryRouter>
            </Provider>
        );

        const firstGroup = getByLabelText('Tuesday, January 14, 2020');
        const secondGroup = getByLabelText('Monday, January 6, 2020');

        expect(
            within(firstGroup).queryByLabelText('Thomas A. Anderson')
        ).not.toBeNull();
        expect(
            within(firstGroup).queryByLabelText('Takeshi Kovacs')
        ).not.toBeNull();
        expect(
            within(secondGroup).queryByLabelText('Takeshi Kovacs')
        ).not.toBeNull();
        expect(
            within(secondGroup).queryByLabelText('Henry Dorsett Case')
        ).not.toBeNull();
    });

    test('should render a list of audit logs grouped by custom function', () => {
        const groupLogs = (records: EventAuthor[]): LogGroup[] => {
            const groups = records.reduce(
                (acc, record) => ({
                    ...acc,
                    [record.author.fullName]: [
                        ...(acc[record.author.fullName] || []),
                        record,
                    ],
                }),
                {}
            );

            return Object.keys(groups).map(label => ({
                label,
                records: groups[label],
            }));
        };

        const { getByLabelText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <TranslationProvider
                        locale="en"
                        i18nProvider={i18nProvider}
                    >
                        <Timeline
                            loaded
                            records={records}
                            groupLogs={groupLogs}
                        />
                    </TranslationProvider>
                </MemoryRouter>
            </Provider>
        );

        const firstGroup = getByLabelText('Thomas A. Anderson');
        const secondGroup = getByLabelText('Takeshi Kovacs');
        const thirdGroup = getByLabelText('Henry Dorsett Case');

        expect(firstGroup.children).toHaveLength(1);
        expect(secondGroup.children).toHaveLength(2);
        expect(thirdGroup.children).toHaveLength(1);
    });
});
