import { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';
import { ListProps } from 'react-admin';
import { GetDateFilter } from './types';
/**
 * A pre-configured List for event logs. Provides adequate views and filters.
 * @param props
 */
export declare const EventList: (props: EventListProps) => ReactElement;
interface EventListProps extends ListProps {
    authorResource?: string;
    dateFilters?: Record<string, GetDateFilter>;
    eventResource?: string;
}
export declare const EventListSmallContent: (props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => ReactElement;
export {};
