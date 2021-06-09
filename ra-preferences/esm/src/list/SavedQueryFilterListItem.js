import * as React from 'react';
import { memo } from 'react';
import { IconButton, ListItem, ListItemText, ListItemSecondaryAction, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import { useListContext } from 'react-admin';
import isEqual from 'lodash/isEqual';
import { useHistory } from 'react-router-dom';
import { stringify } from 'query-string';
var useStyles = makeStyles({
    listItem: {
        paddingLeft: '2em',
    },
    listItemText: {
        margin: 0,
    },
});
var SavedQueryFilterListItem = function (props) {
    var label = props.label, value = props.value;
    var _a = useListContext(), filterValues = _a.filterValues, currentSort = _a.currentSort, perPage = _a.perPage, displayedFilters = _a.displayedFilters;
    var history = useHistory();
    var classes = useStyles(props);
    var isSelected = isEqual(value, {
        filter: filterValues,
        sort: currentSort,
        perPage: perPage,
        displayedFilters: displayedFilters,
    });
    var addFilter = function () {
        history.push({
            search: stringify({
                filter: JSON.stringify(value.filter),
                sort: value.sort.field,
                order: value.sort.order,
                page: 1,
                perPage: value.perPage,
                displayedFilters: value.displayedFilters,
            }),
        });
    };
    var removeFilter = function () {
        history.push({
            search: stringify({
                filter: JSON.stringify({}),
            }),
        });
    };
    var toggleFilter = function () {
        return isSelected ? removeFilter() : addFilter();
    };
    return (React.createElement(ListItem, { button: true, onClick: toggleFilter, selected: isSelected, className: classes.listItem },
        React.createElement(ListItemText, { primary: label, className: classes.listItemText }),
        isSelected && (React.createElement(ListItemSecondaryAction, null,
            React.createElement(IconButton, { size: "small", onClick: toggleFilter },
                React.createElement(CancelIcon, null))))));
};
var arePropsEqual = function (prevProps, nextProps) {
    return prevProps.label === nextProps.label &&
        isEqual(prevProps.value, nextProps.value);
};
export default memo(SavedQueryFilterListItem, arePropsEqual);
