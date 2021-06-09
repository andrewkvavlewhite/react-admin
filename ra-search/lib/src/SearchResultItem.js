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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResultItem = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var react_router_dom_1 = require("react-router-dom");
/**
 * A component responsible for displaying a single search result.
 *
 * @param props {SearchResultItemProps}
 * @param props.data {SearchResultDataItem} The search result item
 * @param props.label {GetValueFromRecordFunction} Either a field name, a ReactElement which will be cloned with the data prop or a function which will be called with the search result and which must return a string or a React node for the label.
 * @param props.description {GetValueFromRecordFunction} Either a field name, a ReactElement which will be cloned with the data prop or a function which will be called with the search result and which must return a string or a React node for the description.
 * @param props.onClose {Function} The function to call when the Search PopOver should be closed.
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
exports.SearchResultItem = function (props) {
    var data = props.data, onClose = props.onClose, _a = props.label, label = _a === void 0 ? function (record) {
        return record && record.content.label;
    } : _a, _b = props.description, description = _b === void 0 ? function (record) {
        return record && record.content.description;
    } : _b, rest = __rest(props, ["data", "onClose", "label", "description"]);
    // see https://material-ui.com/guides/composition/#composition for the useMemo/forwardRef explanation
    var CustomLink = react_1.useMemo(function () {
        return react_1.forwardRef(function BaseCustomLink(linkProps, ref) {
            return React.createElement(react_router_dom_1.Link, __assign({ ref: ref, to: data.url }, linkProps));
        });
    }, [data]);
    if (!data) {
        return null;
    }
    return (React.createElement(core_1.ListItem, __assign({ button: true, component: CustomLink, onClick: onClose }, rest),
        React.createElement(core_1.ListItemText, { primary: getValue(label, data), secondary: getValue(description, data) })));
};
var getValue = function (prop, data) {
    return react_1.isValidElement(prop)
        ? react_1.cloneElement(prop, { data: data })
        : typeof prop === 'function'
            ? prop(data)
            : prop;
};
