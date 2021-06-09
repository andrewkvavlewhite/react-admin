/// <reference types="react" />
import { UseSearchData } from './dataProvider';
export interface SearchResultContextValue extends UseSearchData {
    onClose: () => void;
}
export declare const SearchResultContext: import("react").Context<SearchResultContextValue>;
export declare const SearchResultContextProvider: import("react").Provider<SearchResultContextValue>;
export declare const useSearchResults: () => SearchResultContextValue;
