import { ReactElement } from 'react';
import { SearchPanelProps } from './types';
/**
 * A component which displays search results inside a Material UI [`<List>`](https://material-ui.com/components/list/),
 * grouping results by targets when they are multiple targets.
 *
 * @param props {SearchPanelProps}
 * @param props.children {ReactElement} A ReactElement which will be cloned for each search result item.
 */
export declare const SearchResultsPanel: (props: SearchPanelProps) => ReactElement;
