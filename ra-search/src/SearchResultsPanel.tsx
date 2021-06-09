import * as React from 'react';
import { cloneElement, ReactElement } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from 'react-admin';

import { SearchPanelProps } from './types';
import { SearchResultItem } from './SearchResultItem';
import { SearchResultsGroup } from './SearchResultsGroup';
import { groupSearchResultsByResource } from './groupSearchResultsByResource';
import { useSearchResults } from './SearchResultContext';
import { useArrowKeysToNavigate } from './useArrowKeysToNavigate';

/**
 * A component which displays search results inside a Material UI [`<List>`](https://material-ui.com/components/list/),
 * grouping results by targets when they are multiple targets.
 *
 * @param props {SearchPanelProps}
 * @param props.children {ReactElement} A ReactElement which will be cloned for each search result item.
 */
export const SearchResultsPanel = (props: SearchPanelProps): ReactElement => {
    const listRef = React.useRef<HTMLUListElement>(null);
    const { children = <SearchResultItem />, ...rest } = props;
    useArrowKeysToNavigate(listRef);

    const translate = useTranslate();
    const classes = useStyles(rest);

    const { data, onClose } = useSearchResults();

    if (!data || data.length === 0) {
        return (
            <List dense {...rest}>
                <ListItem>
                    <ListItemText
                        primary={translate('ra.navigation.no_results')}
                    />
                </ListItem>
            </List>
        );
    }

    const groupedData = groupSearchResultsByResource(data, translate);

    if (groupedData.length === 1) {
        return (
            <List component="nav" dense innerRef={listRef} {...rest}>
                {data.map(searchResultItem => {
                    return cloneElement(children, {
                        key: searchResultItem.id,
                        data: searchResultItem,
                        onClose,
                    });
                })}
            </List>
        );
    }

    return (
        <List
            component="nav"
            dense
            innerRef={listRef}
            className={classes.root}
            {...rest}
        >
            {groupedData.map(group => (
                <SearchResultsGroup
                    key={group.label}
                    label={group.label}
                    data={group.data}
                    onClose={onClose}
                >
                    {children}
                </SearchResultsGroup>
            ))}
        </List>
    );
};

const useStyles = makeStyles(
    () => ({
        root: {
            maxHeight: 'calc(100vh - 100px)',
        },
    }),
    {
        name: 'RaSearchResultsPanel',
    }
);
