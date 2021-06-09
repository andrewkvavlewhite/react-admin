import { ReactElement } from 'react';
import { FilterProps } from 'react-admin';
import { GetDateFilter } from './types';
/**
 * Includes all the default filters for the EventList in a component usable as the list filter.
 * @param props The component props
 * @param {string} props.authorResource Optional. The name of the resource for authors.
 * @param {object} props.dateFilters Optional. A map of date filters where the key is the label (which can be a translation key) and the value a function returning a date.
 * @param {string} props.eventsResource Optional. The name of the resource for events. Defaults to `events`
 */
export declare const EventListFilter: (props: EventListFilterProps) => ReactElement;
export interface EventListFilterProps extends Omit<FilterProps, 'children'> {
    authorResource?: string;
    dateFilters?: Record<string, GetDateFilter> | false;
    eventResource?: string;
}
