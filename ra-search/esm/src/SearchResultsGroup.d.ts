import { ReactElement, ReactNode } from 'react';
import { SearchPanelProps } from './types';
/**
 * A component which displays search results for a specific target.
 *
 * @param props {SearchResultsGroupProps}
 * @param props.data {SearchResultDataItem[]} The search results
 * @param props.label {ReactElement|string} The target label
 * @param props.onClose {Function} The function to call when the Search PopOver should be closed.
 */
export declare const SearchResultsGroup: (props: SearchResultsGroupProps) => ReactElement;
interface SearchResultsGroupProps extends SearchPanelProps {
    children?: ReactElement;
    label?: string | ReactNode;
}
export {};
