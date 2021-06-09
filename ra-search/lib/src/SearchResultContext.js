"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSearchResults = exports.SearchResultContextProvider = exports.SearchResultContext = void 0;
var react_1 = require("react");
exports.SearchResultContext = react_1.createContext({
    onClose: function () {
        /* noop */
    },
    loaded: false,
    loading: false,
    history: [],
    query: '',
});
exports.SearchResultContextProvider = exports.SearchResultContext.Provider;
exports.useSearchResults = function () {
    var context = react_1.useContext(exports.SearchResultContext);
    if (!context) {
        console.warn('useContext must be used inside a SearchResultContextProvider such as the one provided by the <Search> component');
    }
    return context;
};
