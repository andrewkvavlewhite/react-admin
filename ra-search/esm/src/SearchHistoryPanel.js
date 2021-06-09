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
import * as React from 'react';
import { cloneElement } from 'react';
import { List, ListSubheader, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from 'react-admin';
import { SearchHistoryItem } from './SearchHistoryItem';
import { useArrowKeysToNavigate } from './useArrowKeysToNavigate';
/**
 * A component which displays search history inside a Material UI [`<List>`](https://material-ui.com/components/list/),
 *
 * @param props {SearchHistoryPanelProps}
 * @param props.history {string[]} A list of previous searches.
 * @param props.onSelect {Function} The function to call when the item is selected.
 * @param props.children {ReactElement} A ReactElement which will be cloned for each search history item.
 */
export var SearchHistoryPanel = function (props) {
    var listRef = React.useRef(null);
    var _a = props.children, children = _a === void 0 ? React.createElement(SearchHistoryItem, null) : _a, history = props.history, onSelect = props.onSelect, rest = __rest(props, ["children", "history", "onSelect"]);
    useArrowKeysToNavigate(listRef);
    var translate = useTranslate();
    var classes = useStyles(rest);
    return (React.createElement(List, __assign({ component: "nav", dense: true, className: classes.root, innerRef: listRef }, rest),
        React.createElement(ListSubheader, null,
            React.createElement("strong", null, translate('ra-search.recent')),
            React.createElement(Divider, null)),
        history.map(function (searchHistoryItem) {
            return cloneElement(children, {
                item: searchHistoryItem,
                onSelect: onSelect,
            });
        })));
};
var useStyles = makeStyles(function () { return ({
    root: {
        maxHeight: 'calc(100vh - 100px)',
        minWidth: '100%',
    },
}); }, {
    name: 'RaSearchHistoryPanel',
});
