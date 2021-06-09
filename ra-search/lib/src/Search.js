"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var debounce_1 = __importDefault(require("lodash/debounce"));
var dataProvider_1 = require("./dataProvider");
var SearchInput_1 = require("./SearchInput");
var SearchResultsPanel_1 = require("./SearchResultsPanel");
var SearchResultContext_1 = require("./SearchResultContext");
var SearchHistoryPanel_1 = require("./SearchHistoryPanel");
/**
 * A component which displays an input, calls the dataProvider `search` method
 * when the input changes and shows the search results inside a Material UI
 * [`<PopOver>`](https://material-ui.com/components/popover/).
 *
 * By default, it will group the search result items by resource and show their
 * `content.label` and `content.description`.
 *
 * @param props {SearchProps}
 * @param props.children {ReactElement} A React Element which will be rendered inside the Material UI `<Popover>`
 * @param {'light' | 'dark'} props.color The color mode for the search input, applying light or dark backgrounds
 *
 * @example <caption>Here's how to include it inside a custom `<AppBar>` component</caption>
 * import { Admin, AppBar, Layout, Resource } from 'react-admin';
 * import { Typography, makeStyles } from '@material-ui/core';
 * import { Search } from '@react-admin/ra-search';
 *
 * const MyAppbar = (props) => {
 *     const classes = useStyles();
 *
 *     return (
 *         <AppBar {...props}>
 *             <Typography
 *                 variant="h6"
 *                 color="inherit"
 *                 className={classes.title}
 *                 id="react-admin-title"
 *             />
 *             <Search />
 *         </AppBar>
 *     );
 * };
 *
 * const useStyles = makeStyles({
 *     title: {
 *         flex: 1,
 *         textOverflow: 'ellipsis',
 *         whiteSpace: 'nowrap',
 *         overflow: 'hidden',
 *     },
 * });
 *
 * const MyLayout = (props) => (
 *     <Layout {...props} appBar={MyAppbar} />
 * );
 *
 * export const App = () => (
 *     <Admin dataProvider={searchDataProvider} layout={MyLayout}>
 *         {...}
 *     </Admin>
 * );
 *
 * @example <caption>Customizing the <Popover> Content</caption>
 * import { Admin, AppBar, Layout, Resource } from 'react-admin';
 * import { Typography, makeStyles } from '@material-ui/core';
 * import { Search } from '@react-admin/ra-search';
 *
 * const MySearchResultsPanel = () => {
 *     const { data, onClose } = useSearchResultContext();
 *
 *     return (
 *         <ul>
 *             {data.map(item => (
 *                 <li key={item.id}>
 *                     <Link to={item.url} onClick={onClose}>
 *                         <strong>{item.content.label}</strong>
 *                     </Link>
 *                     <p>{item.content.description}</p>
 *                 </li>
 *             ))}
 *         </ul>
 *     );
 * };
 *
 * const MyAppbar = (props) => {
 *     const classes = useStyles();
 *
 *     return (
 *         <AppBar {...props}>
 *             <Typography
 *                 variant="h6"
 *                 color="inherit"
 *                 className={classes.title}
 *                 id="react-admin-title"
 *             />
 *             <Search>
 *                 <CustomSearchResultsPanel />
 *             </Search>
 *         </AppBar>
 *     );
 * };
 *
 * const useStyles = makeStyles({
 *     title: {
 *         flex: 1,
 *         textOverflow: 'ellipsis',
 *         whiteSpace: 'nowrap',
 *         overflow: 'hidden',
 *     },
 * });
 *
 * const MyLayout = (props) => (
 *     <Layout {...props} appBar={MyAppbar} />
 * );
 *
 * export const App = () => (
 *     <Admin
 *         dataProvider={searchDataProvider}
 *         layout={MyLayout}
 *     >
 *         {...}
 *     </Admin>
 * );
 *
 * @example <caption>Customizing the <SearchResultItem> Component</caption>
 * import { Admin, AppBar, Layout, Resource } from 'react-admin';
 * import { Typography, makeStyles } from '@material-ui/core';
 * import { Search, SearchResultsPanel, SearchResultItem } from '@react-admin/ra-search';
 *
 * const MyAppbar = (props) => {
 *     const classes = useStyles();
 *
 *     return (
 *         <AppBar {...props}>
 *             <Typography
 *                 variant="h6"
 *                 color="inherit"
 *                 className={classes.title}
 *                 id="react-admin-title"
 *             />
 *             <Search>
 *                 <SearchResultsPanel>
 *                     <SearchResultItem
 *                         label={(record) => (
 *                             <>
 *                                 {record.type === 'artists' ? (
 *                                     <PersonIcon />
 *                                 ) : (
 *                                     <MusicIcon />
 *                                 )}
 *                                 <span>{record.content.label}</span>
 *                             </>
 *                         )}
 *                     />
 *                 </SearchResultsPanel>
 *             </Search>
 *         </AppBar>
 *     );
 * };
 *
 * const useStyles = makeStyles({
 *     title: {
 *         flex: 1,
 *         textOverflow: 'ellipsis',
 *         whiteSpace: 'nowrap',
 *         overflow: 'hidden',
 *     },
 * });
 *
 * const MyLayout = (props) => (
 *     <Layout {...props} appBar={MyAppbar} />
 * );
 *
 * export const App = () => (
 *     <Admin dataProvider={dataProvider} layout={MyLayout}>
 *         {...}
 *     </Admin>
 * );
 */
exports.Search = function (props) {
    var _a = props.children, children = _a === void 0 ? React.createElement(SearchResultsPanel_1.SearchResultsPanel, null) : _a, _b = props.color, color = _b === void 0 ? 'light' : _b, options = props.options, _c = props.wait, wait = _c === void 0 ? 500 : _c;
    var _d = react_1.useState(''), query = _d[0], setQuery = _d[1];
    var _e = dataProvider_1.useSearch(options), search = _e[0], state = _e[1];
    var debouncedSearch = react_1.useMemo(function () { return debounce_1.default(search, wait); }, [
        search,
        wait,
    ]);
    var ref = react_1.useRef();
    var inputRef = react_1.useRef();
    var _f = react_1.useState(false), open = _f[0], setOpen = _f[1];
    var handleClose = function () {
        setOpen(false);
    };
    var runSearch = react_1.useCallback(function (query) {
        setQuery(query);
        debouncedSearch(query);
    }, [setQuery, debouncedSearch]);
    var handleChange = react_1.useCallback(function (event) {
        var query = event.target
            ? event.target.value
            : event;
        runSearch(query);
    }, [runSearch]);
    var handleFocus = react_1.useCallback(function () {
        if (state.loaded) {
            setOpen(true);
        }
    }, [state.loaded]);
    react_1.useEffect(function () {
        setOpen(function (previousOpen) {
            // If there are no results and no history, close the popover
            if (!state.loading &&
                state.loaded &&
                !state.total &&
                !state.history.length) {
                return false;
            }
            // Don't close the popover if it was previously open
            // This is to avoid quick open/close when the search query is changed
            if (previousOpen) {
                return previousOpen;
            }
            return state.loaded || !!state.error;
        });
    }, [state]);
    var contextValue = react_1.useMemo(function () { return (__assign(__assign({}, state), { onClose: handleClose })); }, [state]);
    return (React.createElement(React.Fragment, null,
        React.createElement(SearchInput_1.SearchInput, { color: color, ref: ref, inputRef: inputRef, onChange: handleChange, onFocus: handleFocus, value: query }),
        React.createElement(core_1.Popover, { anchorEl: ref.current, anchorReference: "anchorEl", anchorOrigin: anchorOrigin(!!state.total), transformOrigin: transformOrigin(!!state.total), elevation: 4, disableAutoFocus: true, disableEnforceFocus: true, disableRestoreFocus: true, disablePortal: true, open: open, onClose: handleClose }, state.loaded || !!state.error ? (state.total ? (React.createElement(SearchResultContext_1.SearchResultContextProvider, { value: contextValue }, children)) : (React.createElement(SearchHistoryPanel_1.SearchHistoryPanel, { history: state.history, onSelect: runSearch }))) : null)));
};
var anchorOrigin = function (isResult) { return ({
    vertical: 'bottom',
    horizontal: isResult ? 'right' : 'left',
}); };
var transformOrigin = function (isResult) { return ({
    vertical: 'top',
    horizontal: isResult ? 'right' : 'left',
}); };
