import * as React from 'react';
import { cloneElement, isValidElement, ReactElement, ReactNode } from 'react';
import { useTranslate } from 'react-admin';
import { ListSubheader, makeStyles } from '@material-ui/core';

import { SearchPanelProps } from './types';
import { SearchResultItem } from './SearchResultItem';

/**
 * A component which displays search results for a specific target.
 *
 * @param props {SearchResultsGroupProps}
 * @param props.data {SearchResultDataItem[]} The search results
 * @param props.label {ReactElement|string} The target label
 * @param props.onClose {Function} The function to call when the Search PopOver should be closed.
 */
export const SearchResultsGroup = (
    props: SearchResultsGroupProps
): ReactElement => {
    const { children = defaultChildren, data, label, onClose } = props;
    const translate = useTranslate();
    const classes = useStyles(props);

    return (
        <>
            <ListSubheader
                className={classes.subHeader}
                component="h3"
                role="presentation"
            >
                {isValidElement(label)
                    ? label
                    : translate(label.toString(), { _: label })}
            </ListSubheader>
            {data.map(searchResultItem =>
                cloneElement(children, {
                    key: searchResultItem.id,
                    data: searchResultItem,
                    onClose,
                })
            )}
        </>
    );
};

const useStyles = makeStyles(theme => ({
    subHeader: {
        background: theme.palette.background.paper,
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
}));

const defaultChildren = <SearchResultItem />;

interface SearchResultsGroupProps extends SearchPanelProps {
    children?: ReactElement;
    label?: string | ReactNode;
}
