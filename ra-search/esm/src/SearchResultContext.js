import { createContext, useContext } from 'react';
export var SearchResultContext = createContext({
    onClose: function () {
        /* noop */
    },
    loaded: false,
    loading: false,
    history: [],
    query: '',
});
export var SearchResultContextProvider = SearchResultContext.Provider;
export var useSearchResults = function () {
    var context = useContext(SearchResultContext);
    if (!context) {
        console.warn('useContext must be used inside a SearchResultContextProvider such as the one provided by the <Search> component');
    }
    return context;
};
