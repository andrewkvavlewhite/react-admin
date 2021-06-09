var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import * as React from 'react';
import isEqual from 'lodash/isEqual';
import { useListContext, useTranslate } from 'react-admin';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@material-ui/core';
import { useSavedQueries } from './useSavedQueries';
export var RemoveSavedQueryDialog = function (_a) {
    var open = _a.open, onClose = _a.onClose;
    var translate = useTranslate();
    var _b = useListContext(), resource = _b.resource, filterValues = _b.filterValues, currentSort = _b.currentSort, perPage = _b.perPage, displayedFilters = _b.displayedFilters;
    var _c = useSavedQueries(resource), savedQueries = _c[0], setSavedQueries = _c[1];
    var removeQuery = function () {
        var index = savedQueries.findIndex(function (savedFilter) {
            return isEqual(savedFilter.value, {
                filter: filterValues,
                sort: currentSort,
                perPage: perPage,
                displayedFilters: displayedFilters,
            });
        });
        setSavedQueries(__spreadArrays(savedQueries.slice(0, index), savedQueries.slice(index + 1)));
        onClose();
    };
    return (React.createElement(Dialog, { open: open, onClose: onClose, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description" },
        React.createElement(DialogTitle, { id: "alert-dialog-title" }, translate('ra-preferences.saved_queries.remove_dialog_title', {
            _: 'Remove saved query?',
        })),
        React.createElement(DialogContent, null,
            React.createElement(DialogContentText, null, translate('ra-preferences.saved_queries.remove_message', {
                _: 'Are you sure you want to remove that item from your list of saved queries?',
            }))),
        React.createElement(DialogActions, null,
            React.createElement(Button, { onClick: onClose }, translate('ra.action.cancel')),
            React.createElement(Button, { onClick: removeQuery, color: "primary", 
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus: true }, translate('ra.action.confirm')))));
};
