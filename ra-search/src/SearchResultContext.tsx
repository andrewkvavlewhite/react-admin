import { createContext, useContext } from 'react';
import { UseSearchData } from './dataProvider';

export interface SearchResultContextValue extends UseSearchData {
    onClose: () => void;
}

export const SearchResultContext = createContext<SearchResultContextValue>({
    onClose: () => {
        /* noop */
    },
    loaded: false,
    loading: false,
    history: [],
    query: '',
});

export const SearchResultContextProvider = SearchResultContext.Provider;

export const useSearchResults = (): SearchResultContextValue => {
    const context = useContext(SearchResultContext);

    if (!context) {
        console.warn(
            'useContext must be used inside a SearchResultContextProvider such as the one provided by the <Search> component'
        );
    }

    return context;
};
