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
exports.ListView = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var prop_types_1 = __importDefault(require("prop-types"));
var Card_1 = __importDefault(require("@material-ui/core/Card"));
var classnames_1 = __importDefault(require("classnames"));
var styles_1 = require("@material-ui/core/styles");
var ra_core_1 = require("ra-core");
var react_admin_1 = require("react-admin");
var Empty_1 = __importDefault(require("ra-ui-materialui/esm/list/Empty"));
var ListActions_1 = require("./ListActions");
var ListToolbar_1 = __importDefault(require("./ListToolbar"));
exports.ListView = function (props) {
    var actions = props.actions, aside = props.aside, bulkActionButtons = props.bulkActionButtons, children = props.children, classesOverride = props.classes, className = props.className, Content = props.component, empty = props.empty, _a = props.exporter, exporter = _a === void 0 ? ra_core_1.defaultExporter : _a, filters = props.filters, pagination = props.pagination, title = props.title, hasList = props.hasList, hasEdit = props.hasEdit, hasShow = props.hasShow, hasCreate = props.hasCreate, syncWithLocation = props.syncWithLocation, rest = __rest(props, ["actions", "aside", "bulkActionButtons", "children", "classes", "className", "component", "empty", "exporter", "filters", "pagination", "title", "hasList", "hasEdit", "hasShow", "hasCreate", "syncWithLocation"]);
    var controllerProps = ra_core_1.getListControllerProps(props); // deprecated, to be removed in v4
    var listContext = ra_core_1.useListContext(props);
    var classes = useStyles(props);
    var defaultTitle = listContext.defaultTitle, total = listContext.total, loaded = listContext.loaded, loading = listContext.loading, filterValues = listContext.filterValues, selectedIds = listContext.selectedIds;
    var version = ra_core_1.useVersion();
    var renderList = function () {
        var _a;
        return (React.createElement(React.Fragment, null,
            (filters || actions) && (React.createElement(ListToolbar_1.default, __assign({ filters: filters }, controllerProps, { actions: actions, exporter: exporter }))),
            React.createElement("div", { className: classes.main },
                React.createElement(Content, { className: classnames_1.default(classes.content, (_a = {},
                        _a[classes.bulkActionsDisplayed] = selectedIds.length > 0,
                        _a)), key: version },
                    bulkActionButtons !== false && bulkActionButtons && (React.createElement(react_admin_1.BulkActionsToolbar, __assign({}, controllerProps), bulkActionButtons)),
                    children &&
                        react_1.cloneElement(react_1.Children.only(children), __assign(__assign({}, controllerProps), { hasBulkActions: bulkActionButtons !== false })),
                    pagination && react_1.cloneElement(pagination, listContext)),
                aside && react_1.cloneElement(aside, listContext))));
    };
    var shouldRenderEmptyPage = loaded && !loading && total === 0 && !Object.keys(filterValues).length;
    return (React.createElement("div", __assign({ className: classnames_1.default('list-page', classes.root, className) }, ra_core_1.sanitizeListRestProps(rest)),
        React.createElement(react_admin_1.Title, { title: title, defaultTitle: defaultTitle }),
        shouldRenderEmptyPage && empty !== false
            ? react_1.cloneElement(empty, listContext)
            : renderList()));
};
exports.ListView.propTypes = {
    actions: prop_types_1.default.oneOfType([prop_types_1.default.bool, prop_types_1.default.element]),
    aside: prop_types_1.default.element,
    basePath: prop_types_1.default.string,
    bulkActionButtons: prop_types_1.default.oneOfType([prop_types_1.default.bool, prop_types_1.default.element]),
    children: prop_types_1.default.element,
    className: prop_types_1.default.string,
    classes: prop_types_1.default.object,
    component: ra_core_1.ComponentPropType,
    currentSort: prop_types_1.default.shape({
        field: prop_types_1.default.string.isRequired,
        order: prop_types_1.default.string.isRequired,
    }),
    data: prop_types_1.default.any,
    defaultTitle: prop_types_1.default.string,
    displayedFilters: prop_types_1.default.object,
    exporter: prop_types_1.default.oneOfType([prop_types_1.default.func, prop_types_1.default.bool]),
    filterDefaultValues: prop_types_1.default.object,
    filters: prop_types_1.default.element,
    filterValues: prop_types_1.default.object,
    hasCreate: prop_types_1.default.bool,
    hideFilter: prop_types_1.default.func,
    ids: prop_types_1.default.array,
    loading: prop_types_1.default.bool,
    onSelect: prop_types_1.default.func,
    onToggleItem: prop_types_1.default.func,
    onUnselectItems: prop_types_1.default.func,
    page: prop_types_1.default.number,
    pagination: prop_types_1.default.oneOfType([prop_types_1.default.element, prop_types_1.default.bool]),
    perPage: prop_types_1.default.number,
    refresh: prop_types_1.default.func,
    resource: prop_types_1.default.string,
    selectedIds: prop_types_1.default.array,
    setFilters: prop_types_1.default.func,
    setPage: prop_types_1.default.func,
    setPerPage: prop_types_1.default.func,
    setSort: prop_types_1.default.func,
    showFilter: prop_types_1.default.func,
    title: react_admin_1.TitlePropType,
    total: prop_types_1.default.number,
    version: prop_types_1.default.number,
};
var DefaultBulkActionButtons = function (props) { return (React.createElement(react_admin_1.BulkDeleteButton, __assign({}, props))); };
exports.ListView.defaultProps = {
    actions: React.createElement(ListActions_1.ListActions, null),
    classes: {},
    component: Card_1.default,
    bulkActionButtons: React.createElement(DefaultBulkActionButtons, null),
    pagination: React.createElement(react_admin_1.Pagination, null),
    empty: React.createElement(Empty_1.default, null),
};
var useStyles = styles_1.makeStyles(function (theme) {
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
