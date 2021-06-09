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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterButtonWithSave = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var prop_types_1 = __importDefault(require("prop-types"));
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var FilterList_1 = __importDefault(require("@material-ui/icons/FilterList"));
var classnames_1 = __importDefault(require("classnames"));
var get_1 = __importDefault(require("lodash/get"));
var react_router_dom_1 = require("react-router-dom");
var query_string_1 = require("query-string");
var react_admin_1 = require("react-admin");
var useSavedQueries_1 = require("./useSavedQueries");
var AddSavedQueryDialog_1 = require("./AddSavedQueryDialog");
var RemoveSavedQueryDialog_1 = require("./RemoveSavedQueryDialog");
var useStyles = styles_1.makeStyles({
    root: { display: 'inline-block' },
}, { name: 'RaFilterButton' });
exports.FilterButtonWithSave = function (props) {
    var filters = props.filters, className = props.className, rest = __rest(props, ["filters", "className"]);
    var _a = react_admin_1.useListContext(), filterValues = _a.filterValues, currentSort = _a.currentSort, perPage = _a.perPage, _b = _a.displayedFilters, displayedFilters = _b === void 0 ? {} : _b, showFilter = _a.showFilter, resource = _a.resource;
    var translate = react_admin_1.useTranslate();
    var _c = react_1.useState(false), open = _c[0], setOpen = _c[1];
    var anchorEl = react_1.useRef();
    var classes = useStyles(props);
    var savedQueries = useSavedQueries_1.useSavedQueries(resource)[0];
    var history = react_router_dom_1.useHistory();
    var hasFilterValues = !isEqual_1.default(filterValues, {});
    var hasSavedCurrentQuery = savedQueries.some(function (savedQuery) {
        return isEqual_1.default(savedQuery.value, {
            filter: filterValues,
            sort: currentSort,
            perPage: perPage,
            displayedFilters: displayedFilters,
        });
    });
    var hiddenFilters = filters.filter(function (filterElement) {
        return !filterElement.props.alwaysOn &&
            !displayedFilters[filterElement.props.source] &&
            typeof get_1.default(filterValues, filterElement.props.source) ===
                'undefined';
    });
    // menu state
    var handleClickButton = react_1.useCallback(function (event) {
        // This prevents ghost click.
        event.preventDefault();
        setOpen(true);
        anchorEl.current = event.currentTarget;
    }, [anchorEl, setOpen]);
    var handleRequestClose = react_1.useCallback(function () {
        setOpen(false);
    }, [setOpen]);
    var handleShow = react_1.useCallback(function (_a) {
        var source = _a.source, defaultValue = _a.defaultValue;
        showFilter(source, defaultValue);
        setOpen(false);
    }, [showFilter, setOpen]);
    // add query dialog state
    var _d = react_1.useState(false), addSavedQueryDialogOpen = _d[0], setAddSavedQueryDialogOpen = _d[1];
    var hideAddSavedQueryDialog = function () {
        setAddSavedQueryDialogOpen(false);
    };
    var showAddSavedQueryDialog = function () {
        setOpen(false);
        setAddSavedQueryDialogOpen(true);
    };
    // remove query dialog state
    var _e = react_1.useState(false), removeSavedQueryDialogOpen = _e[0], setRemoveSavedQueryDialogOpen = _e[1];
    var hideRemoveSavedQueryDialog = function () {
        setRemoveSavedQueryDialogOpen(false);
    };
    var showRemoveSavedQueryDialog = function () {
        setOpen(false);
        setRemoveSavedQueryDialogOpen(true);
    };
    return (React.createElement("div", __assign({ className: classnames_1.default(classes.root, className) }, rest),
        React.createElement(react_admin_1.Button, { className: "add-filter", label: "ra.action.add_filter", onClick: handleClickButton },
            React.createElement(FilterList_1.default, null)),
        React.createElement(core_1.Menu, { open: open, anchorEl: anchorEl.current, onClose: handleRequestClose },
            hiddenFilters.map(function (filterElement) { return (React.createElement(FilterButtonMenuItem, { key: filterElement.props.source, filter: filterElement, onShow: handleShow, resource: resource })); }),
            savedQueries.map(function (savedQuery, index) {
                return isEqual_1.default(savedQuery.value, {
                    filter: filterValues,
                    sort: currentSort,
                    perPage: perPage,
                    displayedFilters: displayedFilters,
                }) ? (React.createElement(core_1.MenuItem, { onClick: showRemoveSavedQueryDialog, key: index }, translate('ra-preferences.saved_queries.remove_label_with_name', {
                    _: 'Remove query "%{name}"',
                    name: savedQuery.label,
                }))) : (React.createElement(core_1.MenuItem, { onClick: function () {
                        history.push({
                            search: query_string_1.stringify({
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
            hasFilterValues && !hasSavedCurrentQuery ? (React.createElement(core_1.MenuItem, { onClick: showAddSavedQueryDialog }, translate('ra-preferences.saved_queries.new_label', {
                _: 'Save current query...',
            }))) : null),
        React.createElement(AddSavedQueryDialog_1.AddSavedQueryDialog, { open: addSavedQueryDialogOpen, onClose: hideAddSavedQueryDialog }),
        React.createElement(RemoveSavedQueryDialog_1.RemoveSavedQueryDialog, { open: removeSavedQueryDialogOpen, onClose: hideRemoveSavedQueryDialog })));
};
exports.FilterButtonWithSave.propTypes = {
    classes: prop_types_1.default.object,
    className: prop_types_1.default.string,
    filters: prop_types_1.default.arrayOf(prop_types_1.default.node).isRequired,
};
// FIXME: remove once react-admin exports FilterButtonMenuItem
// eslint-disable-next-line react/display-name
var FilterButtonMenuItem = react_1.forwardRef(function (props, ref) {
    var filter = props.filter, onShow = props.onShow, resource = props.resource;
    var handleShow = react_1.useCallback(function () {
        onShow({
            source: filter.props.source,
            defaultValue: filter.props.defaultValue,
        });
    }, [filter.props.defaultValue, filter.props.source, onShow]);
    return (React.createElement(core_1.MenuItem, { className: "new-filter-item", "data-key": filter.props.source, "data-default-value": filter.props.defaultValue, key: filter.props.source, onClick: handleShow, ref: ref },
        React.createElement(react_admin_1.FieldTitle, { label: filter.props.label, source: filter.props.source, resource: resource })));
});
FilterButtonMenuItem.propTypes = {
    filter: prop_types_1.default.element.isRequired,
    onShow: prop_types_1.default.func.isRequired,
    resource: prop_types_1.default.string.isRequired,
};
