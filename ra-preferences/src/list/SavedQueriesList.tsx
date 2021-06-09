import * as React from 'react';
import { FC, ReactNode } from 'react';
import isEqual from 'lodash/isEqual';
import { useListContext, useTranslate } from 'react-admin';
import { Tooltip, Typography, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import BookmarkIcon from '@material-ui/icons/BookmarkBorder';
import HelpIcon from '@material-ui/icons/HelpOutline';

import { useSavedQueries } from './useSavedQueries';
import SavedQueryFilterListItem from './SavedQueryFilterListItem';
import { AddSavedQueryIconButton } from './AddSavedQueryIconButton';
import { RemoveSavedQueryIconButton } from './RemoveSavedQueryIconButton';

const useStyles = makeStyles(theme => ({
    floatingIcon: {
        position: 'absolute',
        top: '-1.8em',
        right: 0,
    },
    floatingTooltip: {
        position: 'absolute',
        top: '-1.2em',
        right: 3,
        color: theme.palette.action.disabled,
    },
    titleContainer: {
        alignItems: 'center',
        display: 'flex',
        marginTop: theme.spacing(2),
    },
    titleIcon: {
        marginRight: theme.spacing(1),
    },
}));

export interface SavedQueriesListProps {
    icon?: ReactNode;
}

/**
 * FilterList-like component allowing to save and restore a query (filters, sort, perPage).
 *
 * Use this component in a Filter sidebar to let users store custom queries
 * that they can reuse later. The saved queries will appear as FilterListItems,
 * and can be removed.
 *
 * This component uses usePreference under the hood to store saved queries in
 * localStorage, one set of saved queries per resource.
 *
 * @example
 *
 * import { FilterList, FilterListItem, List, Datagrid } from 'react-admin';
 * import { Card, CardContent } from '@material-ui/core';
 *
 * import { SavedQueriesList } from '@react-admin/ra-preferences';
 *
 * const PostFilterSidebar: FC = () => (
 *     <Card>
 *         <CardContent>
 *             <SavedQueriesList />
 *             <FilterList label="Category" icon={<CategoryIcon />}>
 *                 ...
 *             </FilterList>
 *             <FilterList label="Published" icon={<DateRangeIcon />}>
 *                ...
 *             </FilterList>
 *             <FilterList label="Popularity" icon={<DateRangeIcon />}>
 *                ...
 *             </FilterList>
 *         </CardContent>
 *     </Card>
 * );
 *
 * const PostList: FC<Props> = props => (
 *     <List {...props} aside={<PostFilterSidebar />}>
 *         <Datagrid>
 *             ...
 *         </Datagrid>
 *     </List>
 * );
 *
 */
export const SavedQueriesList: FC<SavedQueriesListProps> = ({
    icon = defaultIcon,
}) => {
    const translate = useTranslate();
    const classes = useStyles();
    const {
        resource,
        filterValues,
        displayedFilters,
        currentSort,
        perPage,
    } = useListContext();

    const [savedQueries] = useSavedQueries(resource);

    const hasSavedCurrentFilterValue = savedQueries.some(savedQuery =>
        isEqual(savedQuery.value, {
            filter: filterValues,
            sort: currentSort,
            perPage,
            displayedFilters,
        })
    );
    const hasFilterValues = !isEqual(filterValues, {});

    // note: we don't use react-admin's FilterList because it doesn't accept a default translation
    return (
        <>
            <div className={classes.titleContainer}>
                <div className={classes.titleIcon}>{icon}</div>
                <Typography variant="overline">
                    {translate('ra-preferences.saved_queries.label', {
                        _: 'Saved Queries',
                    })}
                </Typography>
            </div>
            <List dense disablePadding>
                {hasSavedCurrentFilterValue ? (
                    <RemoveSavedQueryIconButton
                        className={classes.floatingIcon}
                    />
                ) : hasFilterValues ? (
                    <AddSavedQueryIconButton className={classes.floatingIcon} />
                ) : (
                    <Tooltip
                        title={translate('ra-preferences.saved_queries.help', {
                            _: 'Filter the list and save this query for later',
                        })}
                        className={classes.floatingTooltip}
                    >
                        <HelpIcon />
                    </Tooltip>
                )}
                {savedQueries.map((savedQuery, index) => (
                    <SavedQueryFilterListItem
                        label={savedQuery.label}
                        value={savedQuery.value}
                        key={index}
                    />
                ))}
            </List>
        </>
    );
};

const defaultIcon = <BookmarkIcon />;
