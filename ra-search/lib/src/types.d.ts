import { DataProvider, Identifier } from 'react-admin';
import { ListProps } from '@material-ui/core';
import { ReactElement } from 'react';
export interface DefaultContent {
    label: string;
    description?: string;
}
export interface SearchResultDataItem<ContentType extends any = DefaultContent> {
    id: Identifier;
    type: string;
    url: string;
    content: ContentType;
    matches?: any;
}
export declare type SearchResult = {
    data: SearchResultDataItem[];
    total: number;
};
export declare type SearchRequestOptions = {
    targets?: string[];
    historySize?: number;
    [key: string]: any;
};
export interface SearchDataProvider extends DataProvider {
    search(query: string, options?: SearchRequestOptions): Promise<SearchResult>;
}
export interface SearchPanelProps extends ListProps {
    children?: ReactElement;
    data?: SearchResultDataItem[];
    onClose?: () => void;
}
export interface SearchHistoryPanelProps extends ListProps {
    children?: ReactElement;
    history?: string[];
    onSelect: (string: any) => void;
}
export declare type SearchInputColor = 'light' | 'dark';
