import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
import { ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PeopleIcon from '@material-ui/icons/People';
import { Form } from 'react-final-form';
import { ClassesOverride, FilterList, useListFilterContext } from 'react-admin';
import get from 'lodash/get';
import { ResourceInput } from './ResourceInput';

/**
 * A react-admin FilterList allowing to filter events by resource. Should be included in a List aside.
 * It excludes the events resource itself which is named `events` by default.
 *
 * @see {@link https://marmelab.com/react-admin/List.html#the-filterlist-sidebar|FilterList}
 *
 * @param props The component props
 * @param {string} props.eventsResource Optional. The name of the resource for events. Defaults to `events`
 *
 * @example <caption>Basic usage</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { FilterLiveSearch } from 'react-admin';
 * import { ResourceFilterList } from '@react-admin/ra-audit-log';
 *
 * export const EventFilterAside = () => {
 *     return (
 *         <Card>
 *             <CardContent>
 *                 <FilterLiveSearch source="q" />
 *                 <ResourceFilterList />
 *             </CardContent>
 *         </Card>
 *     );
 * };
 *
 * @example <caption>With a custom event resource</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { FilterLiveSearch } from 'react-admin';
 * import { ResourceFilterList } from '@react-admin/ra-audit-log';
 *
 * export const EventFilterAside = () => {
 *     return (
 *         <Card>
 *             <CardContent>
 *                 <FilterLiveSearch source="q" />
 *                 <ResourceFilterList eventResource="users" />
 *             </CardContent>
 *         </Card>
 *     );
 * };
 */
export const ResourceFilterList = (
    props: ResourceFilterListProps
): ReactElement => {
    const { eventResource } = props;
    const classes = useStyles(props);
    const { filterValues, setFilters } = useListFilterContext();

    const handleChange = (eventOrValue: any): void => {
        setFilters(
            {
                ...filterValues,
                resource: eventOrValue?.target?.value || eventOrValue,
            },
            null,
            true
        );
    };

    const handleFormSubmit = (values: any): void => {
        setFilters(
            {
                ...filterValues,
                values,
            },
            null,
            false
        );
    };

    return (
        <FilterList label="ra-audit-log.filter.resource" icon={<PeopleIcon />}>
            <ListItem className={classes.listItem}>
                <Form
                    onSubmit={handleFormSubmit}
                    render={({ handleSubmit }): ReactNode => (
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <ResourceInput
                                onChange={handleChange}
                                eventResource={eventResource}
                                className={classes.input}
                                initialValue={get(filterValues, 'resource')}
                            />
                        </form>
                    )}
                />
            </ListItem>
        </FilterList>
    );
};

export interface ResourceFilterListProps {
    eventResource?: string;
    classes?: ClassesOverride<typeof useStyles>;
}

const useStyles = makeStyles(
    {
        listItem: {
            paddingRight: 0,
            display: 'flex',
            flexDirection: 'column',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
        },
        input: {
            width: '100%',
        },
    },
    {
        name: 'RaResourceFilterList',
    }
);
