import { ReactElement } from 'react';
import { SearchHistoryPanelProps } from './types';
/**
 * A component which displays search history inside a Material UI [`<List>`](https://material-ui.com/components/list/),
 *
 * @param props {SearchHistoryPanelProps}
 * @param props.history {string[]} A list of previous searches.
 * @param props.onSelect {Function} The function to call when the item is selected.
 * @param props.children {ReactElement} A ReactElement which will be cloned for each search history item.
 */
export declare const SearchHistoryPanel: (props: SearchHistoryPanelProps) => ReactElement;
