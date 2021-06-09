import { Translate } from 'react-admin';
import { SearchResultDataItem } from './types';
declare type GroupedSearchResultItem = {
    label: string;
    data: SearchResultDataItem[];
};
export declare const groupSearchResultsByResource: (data: SearchResultDataItem[], translate: Translate) => GroupedSearchResultItem[];
export {};
