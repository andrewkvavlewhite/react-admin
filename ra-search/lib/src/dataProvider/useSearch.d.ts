import { SearchRequestOptions, SearchResultDataItem } from '../types';
export declare const useSearch: (defaultOptions?: SearchRequestOptions) => UseSearchValue;
export interface QueryOptions {
    action?: string;
    onSuccess?: (response: any) => any;
    onFailure?: (error?: any) => any;
    withDeclarativeSideEffectsSupport?: boolean;
}
export declare type UseSearchData = {
    data?: SearchResultDataItem[];
    total?: number;
    error?: any;
    loading: boolean;
    loaded: boolean;
    history: string[];
    query: string;
};
export declare type UseSearchCallback = (query: string, options?: SearchRequestOptions) => void;
export declare type UseSearchValue = [UseSearchCallback, UseSearchData];
