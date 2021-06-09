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
import { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { ComponentPropType, defaultExporter, useListContext, getListControllerProps, useVersion, sanitizeListRestProps, } from 'ra-core';
import { Title, TitlePropType, Pagination as DefaultPagination, BulkDeleteButton, BulkActionsToolbar, } from 'react-admin';
import Empty from 'ra-ui-materialui/esm/list/Empty';
import { ListActions } from './ListActions';
import ListToolbar from './ListToolbar';
export var ListView = function (props) {
    var actions = props.actions, aside = props.aside, bulkActionButtons = props.bulkActionButtons, children = props.children, classesOverride = props.classes, className = props.className, Content = props.component, empty = props.empty, _a = props.exporter, exporter = _a === void 0 ? defaultExporter : _a, filters = props.filters, pagination = props.pagination, title = props.title, hasList = props.hasList, hasEdit = props.hasEdit, hasShow = props.hasShow, hasCreate = props.hasCreate, syncWithLocation = props.syncWithLocation, rest = __rest(props, ["actions", "aside", "bulkActionButtons", "children", "classes", "className", "component", "empty", "exporter", "filters", "pagination", "title", "hasList", "hasEdit", "hasShow", "hasCreate", "syncWithLocation"]);
    var controllerProps = getListControllerProps(props); // deprecated, to be removed in v4
    var listContext = useListContext(props);
    var classes = useStyles(props);
    var defaultTitle = listContext.defaultTitle, total = listContext.total, loaded = listContext.loaded, loading = listContext.loading, filterValues = listContext.filterValues, selectedIds = listContext.selectedIds;
    var version = useVersion();
    var renderList = function () {
        var _a;
        return (React.createElement(React.Fragment, null,
            (filters || actions) && (React.createElement(ListToolbar, __assign({ filters: filters }, controllerProps, { actions: actions, exporter: exporter }))),
            React.createElement("div", { className: classes.main },
                React.createElement(Content, { className: classnames(classes.content, (_a = {},
                        _a[classes.bulkActionsDisplayed] = selectedIds.length > 0,
                        _a)), key: version },
                    bulkActionButtons !== false && bulkActionButtons && (React.createElement(BulkActionsToolbar, __assign({}, controllerProps), bulkActionButtons)),
                    children &&
                        cloneElement(Children.only(children), __assign(__assign({}, controllerProps), { hasBulkActions: bulkActionButtons !== false })),
                    pagination && cloneElement(pagination, listContext)),
                aside && cloneElement(aside, listContext))));
    };
    var shouldRenderEmptyPage = loaded && !loading && total === 0 && !Object.keys(filterValues).length;
    return (React.createElement("div", __assign({ className: classnames('list-page', classes.root, className) }, sanitizeListRestProps(rest)),
        React.createElement(Title, { title: title, defaultTitle: defaultTitle }),
        shouldRenderEmptyPage && empty !== false
            ? cloneElement(empty, listContext)
            : renderList()));
};
ListView.propTypes = {
    actions: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    aside: PropTypes.element,
    basePath: PropTypes.string,
    bulkActionButtons: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    children: PropTypes.element,
    className: PropTypes.string,
    classes: PropTypes.object,
    component: ComponentPropType,
    currentSort: PropTypes.shape({
        field: PropTypes.string.isRequired,
        order: PropTypes.string.isRequired,
    }),
    data: PropTypes.any,
    defaultTitle: PropTypes.string,
    displayedFilters: PropTypes.object,
    exporter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    filterDefaultValues: PropTypes.object,
    filters: PropTypes.element,
    filterValues: PropTypes.object,
    hasCreate: PropTypes.bool,
    hideFilter: PropTypes.func,
    ids: PropTypes.array,
    loading: PropTypes.bool,
    onSelect: PropTypes.func,
    onToggleItem: PropTypes.func,
    onUnselectItems: PropTypes.func,
    page: PropTypes.number,
    pagination: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
    perPage: PropTypes.number,
    refresh: PropTypes.func,
    resource: PropTypes.string,
    selectedIds: PropTypes.array,
    setFilters: PropTypes.func,
    setPage: PropTypes.func,
    setPerPage: PropTypes.func,
    setSort: PropTypes.func,
    showFilter: PropTypes.func,
    title: TitlePropType,
    total: PropTypes.number,
    version: PropTypes.number,
};
var DefaultBulkActionButtons = function (props) { return (React.createElement(BulkDeleteButton, __assign({}, props))); };
ListView.defaultProps = {
    actions: React.createElement(ListActions, null),
    classes: {},
    component: Card,
    bulkActionButtons: React.createElement(DefaultBulkActionButtons, null),
    pagination: React.createElement(DefaultPagination, null),
    empty: React.createElement(Empty, null),
};
var useStyles = makeStyles(function (theme) {
    var _a;
    return ({
        root: {},
        main: {
            display: 'flex',
        },
        content: (_a = {
                marginTop: 0,
                transition: theme.transitions.create('margin-top'),
                position: 'relative',
                flex: '1 1 auto'
            },
            _a[theme.breakpoints.down('xs')] = {
                boxShadow: 'none',
            },
            _a.overflow = 'inherit',
            _a),
        bulkActionsDisplayed: {
            marginTop: -theme.spacing(8),
            transition: theme.transitions.create('margin-top'),
        },
        actions: {
            zIndex: 2,
            display: 'flex',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
        },
        noResults: { padding: 20 },
    });
}, { name: 'RaList' });
