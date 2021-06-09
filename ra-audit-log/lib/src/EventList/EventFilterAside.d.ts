import { ReactElement } from 'react';
import { ClassesOverride } from 'react-admin';
import { GetDateFilter } from './types';
/**
 * Includes all the default filters for the EventList in a component usable in an aside sidebar.
 * @param props The component props
 * @param {string} props.authorResource Optional. The name of the resource for authors.
 * @param {string} props.className Optional. A css class name.
 * @param {object} props.classes Optional. An object of styles from material-ui hook built with makeStyles
 * @param {object} props.dateFilters Optional. A map of date filters where the key is the label (which can be a translation key) and the value a function returning a date.
 * @param {string} props.eventsResource Optional. The name of the resource for events. Defaults to `events`
 */
export declare const EventFilterAside: (props: EventFilterAsideProps) => ReactElement;
declare const useStyles: (props?: any) => Record<"root" | "cardContent", string>;
export interface EventFilterAsideProps {
    authorResource?: string;
    className?: string;
    classes?: ClassesOverride<typeof useStyles>;
    dateFilters?: Record<string, GetDateFilter>;
    eventResource?: string;
}
export {};
