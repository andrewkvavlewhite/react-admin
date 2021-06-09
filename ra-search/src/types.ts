import { DataProvider, Identifier } from 'react-admin';
import { ListProps } from '@material-ui/core';
import { ReactElement } from 'react';

export interface DefaultContent {
    label: string;
    description?: string;
}

export interface SearchResultDataItem<
    ContentType extends any = DefaultContent
> {
    id: Identifier; // id of the search result
    type: string; // enables grouping
    url: string; // where to redirect to on click: could be a custom page and not a resource if we want to
    content: ContentType; // any data that will be passed to resultToString or that can be used in a custom component, contains at least {id, label, description} if used with default SearchResultItem component
    matches?: any; // (optional) extracts of the data with matches, can be anything that will be interpreted by a SearchResultItem
}

export type SearchResult = {
    data: SearchResultDataItem[];
    total: number;
};

export type SearchRequestOptions = {
    targets?: string[];
    historySize?: number;
    [key: string]: any; // allow to pass custom options to the search engine
};

export interface SearchDataProvider extends DataProvider {
    search(
        query: string,
        options?: SearchRequestOptions
    ): Promise<SearchResult>;
}

export interface SearchPanelProps extends ListProps {
    children?: ReactElement;
    data?: SearchResultDataItem[];
    onClose?: () => void;
}

export interface SearchHistoryPanelProps extends ListProps {
    children?: ReactElement;
    history?: string[];
    onSelect: (string) => void;
}

export type SearchInputColor = 'light' | 'dark';
