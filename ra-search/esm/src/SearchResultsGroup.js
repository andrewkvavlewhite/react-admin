import * as React from 'react';
import { cloneElement, isValidElement } from 'react';
import { useTranslate } from 'react-admin';
import { ListSubheader, makeStyles } from '@material-ui/core';
import { SearchResultItem } from './SearchResultItem';
/**
 * A component which displays search results for a specific target.
 *
 * @param props {SearchResultsGroupProps}
 * @param props.data {SearchResultDataItem[]} The search results
 * @param props.label {ReactElement|string} The target label
 * @param props.onClose {Function} The function to call when the Search PopOver should be closed.
 */
export var SearchResultsGroup = function (props) {
    var _a = props.children, children = _a === void 0 ? defaultChildren : _a, data = props.data, label = props.label, onClose = props.onClose;
    var translate = useTranslate();
    var classes = useStyles(props);
    return (React.createElement(React.Fragment, null,
        React.createElement(ListSubheader, { className: classes.subHeader, component: "h3", role: "presentation" }, isValidElement(label)
            ? label
            : translate(label.toString(), { _: label })),
        data.map(function (searchResultItem) {
            return cloneElement(children, {
                key: searchResultItem.id,
                data: searchResultItem,
                onClose: onClose,
            });
        })));
};
var useStyles = makeStyles(function (theme) { return ({
    subHeader: {
        background: theme.palette.background.paper,
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
}); });
var defaultChildren = React.createElement(SearchResultItem, null);
