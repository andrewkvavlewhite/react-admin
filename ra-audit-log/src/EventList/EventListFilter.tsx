import * as React from 'react';
import { ReactElement } from 'react';
import { Filter, FilterProps, TextInput, useTranslate } from 'react-admin';
import { AuthorInput } from './AuthorInput';
import { EventDateInput } from './EventDateInput';
import { ResourceInput } from './ResourceInput';
import { GetDateFilter } from './types';

/**
 * Includes all the default filters for the EventList in a component usable as the list filter.
 * @param props The component props
 * @param {string} props.authorResource Optional. The name of the resource for authors.
 * @param {object} props.dateFilters Optional. A map of date filters where the key is the label (which can be a translation key) and the value a function returning a date.
 * @param {string} props.eventsResource Optional. The name of the resource for events. Defaults to `events`
 */
export const EventListFilter = (props: EventListFilterProps): ReactElement => {
    const { authorResource, dateFilters, eventResource, ...rest } = props;
    const translate = useTranslate();

    return (
        <Filter {...rest}>
            <TextInput label="Search" source="q" alwaysOn />
            {dateFilters !== false && (
                <EventDateInput
                    source="date_gte"
                    // Needed to avoid having `Date gte` as the filter label
                    label={translate(`resources.${eventResource}.fields.date`, {
                        _: 'Date',
                    })}
                    dateFilters={dateFilters}
                />
            )}
            <ResourceInput
                source="resource"
                eventResource={eventResource}
                label={`resources.${eventResource}.fields.resource`}
            />
            <AuthorInput
                source="author"
                label={`resources.${eventResource}.fields.author`}
                authorResource={authorResource}
            />
        </Filter>
    );
};

export interface EventListFilterProps extends Omit<FilterProps, 'children'> {
    authorResource?: string;
    dateFilters?: Record<string, GetDateFilter> | false;
    eventResource?: string;
}
