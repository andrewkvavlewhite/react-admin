import * as React from 'react';
import { useState } from 'react';
import { useListContext, useTranslate } from 'react-admin';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, } from '@material-ui/core';
import { useSavedQueries } from './useSavedQueries';
export var AddSavedQueryDialog = function (_a) {
    var open = _a.open, onClose = _a.onClose;
    var translate = useTranslate();
    var _b = useListContext(), resource = _b.resource, filterValues = _b.filterValues, displayedFilters = _b.displayedFilters, currentSort = _b.currentSort, perPage = _b.perPage;
    var _c = useSavedQueries(resource), savedQueries = _c[0], setSavedQueries = _c[1];
    // input state
    var _d = useState(''), queryName = _d[0], setQueryName = _d[1];
    var handleQueryNameChange = function (event) {
        setQueryName(event.target.value);
    };
    var handleFormSubmit = function (e) {
        e.preventDefault();
        addQuery();
    };
    var addQuery = function () {
        setSavedQueries(savedQueries.concat({
            label: queryName,
            value: {
                filter: filterValues,
                sort: currentSort,
                perPage: perPage,
                displayedFilters: displayedFilters,
            },
        }));
        setQueryName('');
        onClose();
    };
    return (React.createElement(Dialog, { open: open, onClose: onClose, "aria-labelledby": "form-dialog-title" },
        React.createElement(DialogTitle, { id: "form-dialog-title" }, translate('ra-preferences.saved_queries.new_dialog_title', {
            _: 'Save current query as',
        })),
        React.createElement(DialogContent, null,
            React.createElement("form", { onSubmit: handleFormSubmit },
                React.createElement(TextField
                // eslint-disable-next-line jsx-a11y/no-autofocus
                , { 
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus: true, margin: "dense", id: "name", label: translate('ra-preferences.saved_queries.query_name', {
                        _: 'Query name',
                    }), fullWidth: true, value: queryName, onChange: handleQueryNameChange }))),
        React.createElement(DialogActions, null,
            React.createElement(Button, { onClick: onClose }, translate('ra.action.cancel')),
            React.createElement(Button, { onClick: addQuery, color: "primary" }, translate('ra.action.save')))));
};
