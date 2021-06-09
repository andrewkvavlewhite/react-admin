import { ReactElement } from 'react';
import { ListItemProps } from '@material-ui/core';
/**
 * A component responsible for displaying a single search history item.
 *
 * @param props {SearchHistoryItemProps}
 * @param props.item {string} The history item
 * @param props.onSelect {Function} The function to call when the item is selected.
 */
export declare const SearchHistoryItem: (props: SearchHistoryItemProps) => ReactElement;
interface SearchHistoryItemProps extends Omit<ListItemProps, 'button'> {
    item?: string;
    onSelect?: (string: any) => void;
}
export {};
