import { ReactElement } from 'react';
import { GetDateFilter } from './types';
/**
 * A react-admin FilterList allowing to filter events by date. Should be included in a List aside.
 * It provides default common filter such as today, last week or last month but can be customized.
 *
 * @see {@link https://marmelab.com/react-admin/List.html#the-filterlist-sidebar|FilterList}
 *
 * @param props The component props
 * @param {object} props.dateFilters Optional. A map of date filters where the key is the label (which can be a translation key) and the value a function returning a date.
 *
 * @example <caption>Basic usage</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { FilterLiveSearch } from 'react-admin';
 * import { EventDateFilterList } from '@react-admin/ra-audit-log';
 *
 * export const EventFilterAside = () => {
 *     return (
 *         <Card>
 *             <CardContent>
 *                 <FilterLiveSearch source="q" />
 *                 <EventDateFilterList />
 *             </CardContent>
 *         </Card>
 *     );
 * };
 *
 * @example <caption>With custom filters</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { FilterLiveSearch } from 'react-admin';
 * import { DefaultDateFilters, EventDateFilterList } from '@react-admin/ra-audit-log';
 * import startOfYear from 'date-fns/startOfYear';
 *
 * const dateFilters = {
 *     ...DefaultDateFilters,
 *     'This Year': () => startOfYear(new Date()).toISOString(),
 * };
 *
 * export const EventFilterAside = () => {
 *     return (
 *         <Card>
 *             <CardContent>
 *                 <FilterLiveSearch source="q" />
 *                 <EventDateFilterList dateFilters={dateFilters} />
 *             </CardContent>
 *         </Card>
 *     );
 * };
 */
export declare const EventDateFilterList: (props: EventDateFilterListProps) => ReactElement;
export interface EventDateFilterListProps {
    dateFilters?: Record<string, GetDateFilter>;
}
