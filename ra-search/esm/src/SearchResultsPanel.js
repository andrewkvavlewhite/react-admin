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
import { List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from 'react-admin';
import { SearchResultItem } from './SearchResultItem';
import { SearchResultsGroup } from './SearchResultsGroup';
import { groupSearchResultsByResource } from './groupSearchResultsByResource';
import { useSearchResults } from './SearchResultContext';
import { useArrowKeysToNavigate } from './useArrowKeysToNavigate';
/**
 * A component which displays search results inside a Material UI [`<List>`](https://material-ui.com/components/list/),
 * grouping results by targets when they are multiple targets.
 *
 * @param props {SearchPanelProps}
 * @param props.children {ReactElement} A ReactElement which will be cloned for each search result item.
 */
export var SearchResultsPanel = function (props) {
    var listRef = React.useRef(null);
    var _a = props.children, children = _a === void 0 ? React.createElement(SearchResultItem, null) : _a, rest = __rest(props, ["children"]);
    useArrowKeysToNavigate(listRef);
    var translate = useTranslate();
    var classes = useStyles(rest);
    var _b = useSearchResults(), data = _b.data, onClose = _b.onClose;
    if (!data || data.length === 0) {
        return (React.createElement(List, __assign({ dense: true }, rest),
            React.createElement(ListItem, null,
                React.createElement(ListItemText, { primary: translate('ra.navigation.no_results') }))));
    }
    var groupedData = groupSearchResultsByResource(data, translate);
    if (groupedData.length === 1) {
        return (React.createElement(List, __assign({ component: "nav", dense: true, innerRef: listRef }, rest), data.map(function (searchResultItem) {
            return cloneElement(children, {
                key: searchResultItem.id,
                data: searchResultItem,
                onClose: onClose,
            });
        })));
    }
    return (React.createElement(List, __assign({ component: "nav", dense: true, innerRef: listRef, className: classes.root }, rest), groupedData.map(function (group) { return (React.createElement(SearchResultsGroup, { key: group.label, label: group.label, data: group.data, onClose: onClose }, children)); })));
};
var useStyles = makeStyles(function () { return ({
    root: {
        maxHeight: 'calc(100vh - 100px)',
    },
}); }, {
    name: 'RaSearchResultsPanel',
});
