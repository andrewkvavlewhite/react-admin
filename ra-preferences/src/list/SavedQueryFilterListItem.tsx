import * as React from 'react';
import { ReactElement, memo } from 'react';
import {
    IconButton,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import { useListContext } from 'react-admin';
import isEqual from 'lodash/isEqual';
import { useHistory } from 'react-router-dom';
import { stringify } from 'query-string';

import { SavedQuery } from './useSavedQueries';

const useStyles = makeStyles({
    listItem: {
        paddingLeft: '2em',
    },
    listItemText: {
        margin: 0,
    },
});

export type SavedQueryFilterListItemProps = SavedQuery;

const SavedQueryFilterListItem = (
    props: SavedQueryFilterListItemProps
): ReactElement => {
    const { label, value } = props;
    const {
        filterValues,
        currentSort,
        perPage,
        displayedFilters,
    } = useListContext();
    const history = useHistory();
    const classes = useStyles(props);

    const isSelected = isEqual(value, {
        filter: filterValues,
        sort: currentSort,
        perPage,
        displayedFilters,
    });

    const addFilter = (): void => {
        history.push({
            search: stringify({
                filter: JSON.stringify(value.filter),
                sort: value.sort.field,
                order: value.sort.order,
                page: 1,
                perPage: value.perPage,
                displayedFilters: value.displayedFilters,
            }),
        });
    };

    const removeFilter = (): void => {
        history.push({
            search: stringify({
                filter: JSON.stringify({}),
            }),
        });
    };

    const toggleFilter = (): void =>
        isSelected ? removeFilter() : addFilter();

    return (
        <ListItem
            button
            onClick={toggleFilter}
            selected={isSelected}
            className={classes.listItem}
        >
            <ListItemText primary={label} className={classes.listItemText} />
            {isSelected && (
                <ListItemSecondaryAction>
                    <IconButton size="small" onClick={toggleFilter}>
                        <CancelIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            )}
        </ListItem>
    );
};

const arePropsEqual = (
    prevProps: SavedQueryFilterListItemProps,
    nextProps: SavedQueryFilterListItemProps
): boolean =>
    prevProps.label === nextProps.label &&
    isEqual(prevProps.value, nextProps.value);

export default memo(SavedQueryFilterListItem, arePropsEqual);
