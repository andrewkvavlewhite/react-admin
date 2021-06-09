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
exports.SearchHistoryPanel = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var react_admin_1 = require("react-admin");
var SearchHistoryItem_1 = require("./SearchHistoryItem");
var useArrowKeysToNavigate_1 = require("./useArrowKeysToNavigate");
/**
 * A component which displays search history inside a Material UI [`<List>`](https://material-ui.com/components/list/),
 *
 * @param props {SearchHistoryPanelProps}
 * @param props.history {string[]} A list of previous searches.
 * @param props.onSelect {Function} The function to call when the item is selected.
 * @param props.children {ReactElement} A ReactElement which will be cloned for each search history item.
 */
exports.SearchHistoryPanel = function (props) {
    var listRef = React.useRef(null);
    var _a = props.children, children = _a === void 0 ? React.createElement(SearchHistoryItem_1.SearchHistoryItem, null) : _a, history = props.history, onSelect = props.onSelect, rest = __rest(props, ["children", "history", "onSelect"]);
    useArrowKeysToNavigate_1.useArrowKeysToNavigate(listRef);
    var translate = react_admin_1.useTranslate();
    var classes = useStyles(rest);
    return (React.createElement(core_1.List, __assign({ component: "nav", dense: true, className: classes.root, innerRef: listRef }, rest),
        React.createElement(core_1.ListSubheader, null,
            React.createElement("strong", null, translate('ra-search.recent')),
            React.createElement(core_1.Divider, null)),
        history.map(function (searchHistoryItem) {
            return react_1.cloneElement(children, {
                item: searchHistoryItem,
                onSelect: onSelect,
            });
        })));
};
var useStyles = styles_1.makeStyles(function () { return ({
    root: {
        maxHeight: 'calc(100vh - 100px)',
        minWidth: '100%',
    },
}); }, {
    name: 'RaSearchHistoryPanel',
});
