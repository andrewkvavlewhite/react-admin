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
import { useState, useCallback, useRef, forwardRef, } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ContentFilter from '@material-ui/icons/FilterList';
import classnames from 'classnames';
import lodashGet from 'lodash/get';
import { useHistory } from 'react-router-dom';
import { stringify } from 'query-string';
import { Button, FieldTitle, useTranslate, useListContext, } from 'react-admin';
import { useSavedQueries } from './useSavedQueries';
import { AddSavedQueryDialog } from './AddSavedQueryDialog';
import { RemoveSavedQueryDialog } from './RemoveSavedQueryDialog';
var useStyles = makeStyles({
    root: { display: 'inline-block' },
}, { name: 'RaFilterButton' });
export var FilterButtonWithSave = function (props) {
    var filters = props.filters, className = props.className, rest = __rest(props, ["filters", "className"]);
    var _a = useListContext(), filterValues = _a.filterValues, currentSort = _a.currentSort, perPage = _a.perPage, _b = _a.displayedFilters, displayedFilters = _b === void 0 ? {} : _b, showFilter = _a.showFilter, resource = _a.resource;
    var translate = useTranslate();
    var _c = useState(false), open = _c[0], setOpen = _c[1];
    var anchorEl = useRef();
    var classes = useStyles(props);
    var savedQueries = useSavedQueries(resource)[0];
    var history = useHistory();
    var hasFilterValues = !isEqual(filterValues, {});
    var hasSavedCurrentQuery = savedQueries.some(function (savedQuery) {
        return isEqual(savedQuery.value, {
            filter: filterValues,
            sort: currentSort,
            perPage: perPage,
            displayedFilters: displayedFilters,
        });
    });
    var hiddenFilters = filters.filter(function (filterElement) {
        return !filterElement.props.alwaysOn &&
            !displayedFilters[filterElement.props.source] &&
            typeof lodashGet(filterValues, filterElement.props.source) ===
                'undefined';
    });
    // menu state
    var handleClickButton = useCallback(function (event) {
        // This prevents ghost click.
        event.preventDefault();
        setOpen(true);
        anchorEl.current = event.currentTarget;
    }, [anchorEl, setOpen]);
    var handleRequestClose = useCallback(function () {
        setOpen(false);
    }, [setOpen]);
    var handleShow = useCallback(function (_a) {
        var source = _a.source, defaultValue = _a.defaultValue;
        showFilter(source, defaultValue);
        setOpen(false);
    }, [showFilter, setOpen]);
    // add query dialog state
    var _d = useState(false), addSavedQueryDialogOpen = _d[0], setAddSavedQueryDialogOpen = _d[1];
    var hideAddSavedQueryDialog = function () {
        setAddSavedQueryDialogOpen(false);
    };
    var showAddSavedQueryDialog = function () {
        setOpen(false);
        setAddSavedQueryDialogOpen(true);
    };
    // remove query dialog state
    var _e = useState(false), removeSavedQueryDialogOpen = _e[0], setRemoveSavedQueryDialogOpen = _e[1];
    var hideRemoveSavedQueryDialog = function () {
        setRemoveSavedQueryDialogOpen(false);
    };
    var showRemoveSavedQueryDialog = function () {
        setOpen(false);
        setRemoveSavedQueryDialogOpen(true);
    };
    return (React.createElement("div", __assign({ className: classnames(classes.root, className) }, rest),
        React.createElement(Button, { className: "add-filter", label: "ra.action.add_filter", onClick: handleClickButton },
            React.createElement(ContentFilter, null)),
        React.createElement(Menu, { open: open, anchorEl: anchorEl.current, onClose: handleRequestClose },
            hiddenFilters.map(function (filterElement) { return (React.createElement(FilterButtonMenuItem, { key: filterElement.props.source, filter: filterElement, onShow: handleShow, resource: resource })); }),
            savedQueries.map(function (savedQuery, index) {
                return isEqual(savedQuery.value, {
                    filter: filterValues,
                    sort: currentSort,
                    perPage: perPage,
                    displayedFilters: displayedFilters,
                }) ? (React.createElement(MenuItem, { onClick: showRemoveSavedQueryDialog, key: index }, translate('ra-preferences.saved_queries.remove_label_with_name', {
                    _: 'Remove query "%{name}"',
                    name: savedQuery.label,
                }))) : (React.createElement(MenuItem, { onClick: function () {
                        history.push({
                            search: stringify({
                                filter: JSON.stringify(savedQuery.value.filter),
                                sort: savedQuery.value.sort.field,
                                order: savedQuery.value.sort.order,
                                page: 1,
                                perPage: savedQuery.value.perPage,
                                displayedFilters: JSON.stringify(savedQuery.value.displayedFilters),
                            }),
                        });
                        setOpen(false);
                    }, key: index }, savedQuery.label));
            }),
            hasFilterValues && !hasSavedCurrentQuery ? (React.createElement(MenuItem, { onClick: showAddSavedQueryDialog }, translate('ra-preferences.saved_queries.new_label', {
                _: 'Save current query...',
            }))) : null),
        React.createElement(AddSavedQueryDialog, { open: addSavedQueryDialogOpen, onClose: hideAddSavedQueryDialog }),
        React.createElement(RemoveSavedQueryDialog, { open: removeSavedQueryDialogOpen, onClose: hideRemoveSavedQueryDialog })));
};
FilterButtonWithSave.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    filters: PropTypes.arrayOf(PropTypes.node).isRequired,
};
// FIXME: remove once react-admin exports FilterButtonMenuItem
// eslint-disable-next-line react/display-name
var FilterButtonMenuItem = forwardRef(function (props, ref) {
    var filter = props.filter, onShow = props.onShow, resource = props.resource;
    var handleShow = useCallback(function () {
        onShow({
            source: filter.props.source,
            defaultValue: filter.props.defaultValue,
        });
    }, [filter.props.defaultValue, filter.props.source, onShow]);
    return (React.createElement(MenuItem, { className: "new-filter-item", "data-key": filter.props.source, "data-default-value": filter.props.defaultValue, key: filter.props.source, onClick: handleShow, ref: ref },
        React.createElement(FieldTitle, { label: filter.props.label, source: filter.props.source, resource: resource })));
});
FilterButtonMenuItem.propTypes = {
    filter: PropTypes.element.isRequired,
    onShow: PropTypes.func.isRequired,
    resource: PropTypes.string.isRequired,
};
