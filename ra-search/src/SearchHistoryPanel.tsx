import * as React from 'react';
import { cloneElement, ReactElement } from 'react';
import { List, ListSubheader, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from 'react-admin';

import { SearchHistoryPanelProps } from './types';
import { SearchHistoryItem } from './SearchHistoryItem';
import { useArrowKeysToNavigate } from './useArrowKeysToNavigate';

/**
 * A component which displays search history inside a Material UI [`<List>`](https://material-ui.com/components/list/),
 *
 * @param props {SearchHistoryPanelProps}
 * @param props.history {string[]} A list of previous searches.
 * @param props.onSelect {Function} The function to call when the item is selected.
 * @param props.children {ReactElement} A ReactElement which will be cloned for each search history item.
 */
export const SearchHistoryPanel = (
    props: SearchHistoryPanelProps
): ReactElement => {
    const listRef = React.useRef<HTMLUListElement>(null);
    const {
        children = <SearchHistoryItem />,
        history,
        onSelect,
        ...rest
    } = props;
    useArrowKeysToNavigate(listRef);

    const translate = useTranslate();
    const classes = useStyles(rest);

    return (
        <List
            component="nav"
            dense
            className={classes.root}
            innerRef={listRef}
            {...rest}
        >
            <ListSubheader>
                <strong>{translate('ra-search.recent')}</strong>
                <Divider />
            </ListSubheader>
            {history.map(searchHistoryItem =>
                cloneElement(children, {
                    item: searchHistoryItem,
                    onSelect,
                })
            )}
        </List>
    );
};

const useStyles = makeStyles(
    () => ({
        root: {
            maxHeight: 'calc(100vh - 100px)',
            minWidth: '100%',
        },
    }),
    {
        name: 'RaSearchHistoryPanel',
    }
);
