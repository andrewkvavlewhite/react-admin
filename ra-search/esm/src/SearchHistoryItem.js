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
import { ListItem, ListItemText } from '@material-ui/core';
/**
 * A component responsible for displaying a single search history item.
 *
 * @param props {SearchHistoryItemProps}
 * @param props.item {string} The history item
 * @param props.onSelect {Function} The function to call when the item is selected.
 */
export var SearchHistoryItem = function (props) {
    var item = props.item, onSelect = props.onSelect, rest = __rest(props, ["item", "onSelect"]);
    if (!item) {
        return null;
    }
    var handleClick = function () {
        onSelect(item);
    };
    var handleKeyEnter = function (event) {
        if (event.ctrlKey && event.keyCode == '13') {
            onSelect(item);
        }
    };
    return (React.createElement(ListItem, __assign({ button: true, component: InnerComponent, onClick: handleClick, onKeyPress: handleKeyEnter }, rest),
        React.createElement(ListItemText, { primary: item })));
};
var InnerComponent = function (_a) {
    var children = _a.children, rest = __rest(_a, ["children"]);
    return (React.createElement("div", __assign({}, rest), children));
};
