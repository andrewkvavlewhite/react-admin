import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
import { ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PeopleIcon from '@material-ui/icons/People';
import { Form } from 'react-final-form';
import { ClassesOverride, FilterList, useListFilterContext } from 'react-admin';
import get from 'lodash/get';
import { AuthorInput } from './AuthorInput';

/**
 * A react-admin FilterList allowing to filter events by author. Should be included in a List aside.
 * If the events authors have a dedicated resource, an AutoCompleteInput will be used to select them.
 *
 * @see {@link https://marmelab.com/react-admin/List.html#the-filterlist-sidebar|FilterList}
 * @see {@link https://marmelab.com/react-admin/Inputs.html#autocompleteinput|AutoCompleteInput}
 *
 * @param props The component props
 * @param {string} props.authorResource Optional. The name of the resource for authors.
 *
 * @example <caption>Basic usage</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { FilterLiveSearch } from 'react-admin';
 * import { AuthorFilterList } from '@react-admin/ra-audit-log';
 *
 * export const EventFilterAside = () => {
 *     return (
 *         <Card>
 *             <CardContent>
 *                 <FilterLiveSearch source="q" />
 *                 <AuthorFilterList />
 *             </CardContent>
 *         </Card>
 *     );
 * };
 *
 * @example <caption>With an author resource</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { FilterLiveSearch } from 'react-admin';
 * import { AuthorFilterList } from '@react-admin/ra-audit-log';
 *
 * export const EventFilterAside = () => {
 *     return (
 *         <Card>
 *             <CardContent>
 *                 <FilterLiveSearch source="q" />
 *                 <AuthorFilterList authorResource="users" />
 *             </CardContent>
 *         </Card>
 *     );
 * };
 */
export const AuthorFilterList = (
    props: AuthorFilterListProps
): ReactElement => {
    const { authorResource } = props;
    const classes = useStyles(props);
    const { filterValues, setFilters } = useListFilterContext();

    const handleChange = (eventOrValue: any): void => {
        const field = authorResource ? 'author.id' : 'author.fullName';
        const value = authorResource
            ? eventOrValue
            : eventOrValue.target?.value;

        setFilters(
            {
                ...filterValues,
                [field]: value,
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
        <FilterList label="ra-audit-log.filter.author" icon={<PeopleIcon />}>
            <ListItem className={classes.listItem}>
                <Form
                    onSubmit={handleFormSubmit}
                    render={({ handleSubmit }): ReactNode => (
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <AuthorInput
                                className={classes.input}
                                label="Author"
                                onChange={handleChange}
                                authorResource={authorResource}
                                initialValue={
                                    authorResource
                                        ? get(filterValues, 'author.id')
                                        : get(filterValues, 'author.fullName')
                                }
                            />
                        </form>
                    )}
                />
            </ListItem>
        </FilterList>
    );
};

export interface AuthorFilterListProps {
    authorResource?: string;
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
        name: 'RaAuthorFilterList',
    }
);
