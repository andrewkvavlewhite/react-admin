"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var CancelOutlined_1 = __importDefault(require("@material-ui/icons/CancelOutlined"));
var react_admin_1 = require("react-admin");
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var react_router_dom_1 = require("react-router-dom");
var query_string_1 = require("query-string");
var useStyles = styles_1.makeStyles({
    listItem: {
        paddingLeft: '2em',
    },
    listItemText: {
        margin: 0,
    },
});
var SavedQueryFilterListItem = function (props) {
    var label = props.label, value = props.value;
    var _a = react_admin_1.useListContext(), filterValues = _a.filterValues, currentSort = _a.currentSort, perPage = _a.perPage, displayedFilters = _a.displayedFilters;
    var history = react_router_dom_1.useHistory();
    var classes = useStyles(props);
    var isSelected = isEqual_1.default(value, {
        filter: filterValues,
        sort: currentSort,
        perPage: perPage,
        displayedFilters: displayedFilters,
    });
    var addFilter = function () {
        history.push({
            search: query_string_1.stringify({
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
            search: query_string_1.stringify({
                filter: JSON.stringify({}),
            }),
        });
    };
    var toggleFilter = function () {
        return isSelected ? removeFilter() : addFilter();
    };
    return (React.createElement(core_1.ListItem, { button: true, onClick: toggleFilter, selected: isSelected, className: classes.listItem },
        React.createElement(core_1.ListItemText, { primary: label, className: classes.listItemText }),
        isSelected && (React.createElement(core_1.ListItemSecondaryAction, null,
            React.createElement(core_1.IconButton, { size: "small", onClick: toggleFilter },
                React.createElement(CancelOutlined_1.default, null))))));
};
var arePropsEqual = function (prevProps, nextProps) {
    return prevProps.label === nextProps.label &&
        isEqual_1.default(prevProps.value, nextProps.value);
};
exports.default = react_1.memo(SavedQueryFilterListItem, arePropsEqual);
