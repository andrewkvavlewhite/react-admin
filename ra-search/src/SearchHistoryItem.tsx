import * as React from 'react';
import { ReactElement } from 'react';
import { ListItem, ListItemProps, ListItemText } from '@material-ui/core';

/**
 * A component responsible for displaying a single search history item.
 *
 * @param props {SearchHistoryItemProps}
 * @param props.item {string} The history item
 * @param props.onSelect {Function} The function to call when the item is selected.
 */
export const SearchHistoryItem = (
    props: SearchHistoryItemProps
): ReactElement => {
    const { item, onSelect, ...rest } = props;

    if (!item) {
        return null;
    }

    const handleClick = (): void => {
        onSelect(item);
    };

    const handleKeyEnter = (event): void => {
        if (event.ctrlKey && event.keyCode == '13') {
            onSelect(item);
        }
    };

    return (
        <ListItem
            button
            component={InnerComponent}
            onClick={handleClick}
            onKeyPress={handleKeyEnter}
            {...rest}
        >
            <ListItemText primary={item} />
        </ListItem>
    );
};

const InnerComponent = ({ children, ...rest }): ReactElement => (
    <div {...rest}>{children}</div>
);

interface SearchHistoryItemProps extends Omit<ListItemProps, 'button'> {
    item?: string;
    onSelect?: (string) => void;
}
