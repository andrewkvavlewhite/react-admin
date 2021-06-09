import * as React from 'react';
import { ReactElement } from 'react';
import { InputProps, SelectInput } from 'react-admin';
import { DefaultDateFilters } from './DefaultDateFilters';
import { GetDateFilter } from './types';

/**
 * A react-admin input allowing to filter events by date. Should be included in a List filter.
 * It provides default common filter such as today, last week or last month but can be customized.
 *
 * @see {@link https://marmelab.com/react-admin/List.html#the-filter-buttonform-combo|Filter}
 * 
 * @param props The component props
 * @param {object} props.dateFilters Optional. A map of date filters where the key is the label (which can be a translation key) and the value a function returning a date.

 * @example <caption>Basic usage</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { Filter } from 'react-admin';
 * import { EventDateInput } from '@react-admin/ra-audit-log';
 *
 * export const EventListFilter = (props) => {
 *     return (
 *         <Filter {...rest}>
 *             <EventDateInput
 *                 source="date"
 *                 // You should specify a label which can be a translation key
 *                 label="Date"
 *             />
 *         </Filter>
 *     );
 * };
 *
 * @example <caption>With custom filters</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { Filter } from 'react-admin';
 * import startOfYear from 'date-fns/startOfYear';
 * import { EventDateInput } from '@react-admin/ra-audit-log';
 *
 * const dateFilters = {
 *     ...DefaultDateFilters,
 *     'This Year': () => startOfYear(new Date()).toISOString(),
 * };
 *
 * export const EventListFilter = (props) => {
 *     return (
 *         <Filter {...rest}>
 *             <EventDateInput
 *                 source="date"
 *                 // You should specify a label which can be a translation key
 *                 label="Date"
 *                 dateFilters={dateFilters}
 *             />
 *         </Filter>
 *     );
 * };
 */
export const EventDateInput = (props: EventDateInputProps): ReactElement => {
    const { dateFilters = DefaultDateFilters, ...rest } = props;
    const choices = React.useMemo(
        () =>
            Object.keys(dateFilters).map(periodLabel => ({
                name: periodLabel,
                id: dateFilters[periodLabel](),
            })),
        [dateFilters]
    );

    return <SelectInput choices={choices} {...rest} />;
};

interface EventDateInputProps extends InputProps {
    dateFilters: Record<string, GetDateFilter>;
}
