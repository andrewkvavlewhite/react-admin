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
exports.SavedQueriesList = void 0;
var React = __importStar(require("react"));
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var react_admin_1 = require("react-admin");
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var BookmarkBorder_1 = __importDefault(require("@material-ui/icons/BookmarkBorder"));
var HelpOutline_1 = __importDefault(require("@material-ui/icons/HelpOutline"));
var useSavedQueries_1 = require("./useSavedQueries");
var SavedQueryFilterListItem_1 = __importDefault(require("./SavedQueryFilterListItem"));
var AddSavedQueryIconButton_1 = require("./AddSavedQueryIconButton");
var RemoveSavedQueryIconButton_1 = require("./RemoveSavedQueryIconButton");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    floatingIcon: {
        position: 'absolute',
        top: '-1.8em',
        right: 0,
    },
    floatingTooltip: {
        position: 'absolute',
        top: '-1.2em',
        right: 3,
        color: theme.palette.action.disabled,
    },
    titleContainer: {
        alignItems: 'center',
        display: 'flex',
        marginTop: theme.spacing(2),
    },
    titleIcon: {
        marginRight: theme.spacing(1),
    },
}); });
/**
 * FilterList-like component allowing to save and restore a query (filters, sort, perPage).
 *
 * Use this component in a Filter sidebar to let users store custom queries
 * that they can reuse later. The saved queries will appear as FilterListItems,
 * and can be removed.
 *
 * This component uses usePreference under the hood to store saved queries in
 * localStorage, one set of saved queries per resource.
 *
 * @example
 *
 * import { FilterList, FilterListItem, List, Datagrid } from 'react-admin';
 * import { Card, CardContent } from '@material-ui/core';
 *
 * import { SavedQueriesList } from '@react-admin/ra-preferences';
 *
 * const PostFilterSidebar: FC = () => (
 *     <Card>
 *         <CardContent>
 *             <SavedQueriesList />
 *             <FilterList label="Category" icon={<CategoryIcon />}>
 *                 ...
 *             </FilterList>
 *             <FilterList label="Published" icon={<DateRangeIcon />}>
 *                ...
 *             </FilterList>
 *             <FilterList label="Popularity" icon={<DateRangeIcon />}>
 *                ...
 *             </FilterList>
 *         </CardContent>
 *     </Card>
 * );
 *
 * const PostList: FC<Props> = props => (
 *     <List {...props} aside={<PostFilterSidebar />}>
 *         <Datagrid>
 *             ...
 *         </Datagrid>
 *     </List>
 * );
 *
 */
exports.SavedQueriesList = function (_a) {
    var _b = _a.icon, icon = _b === void 0 ? defaultIcon : _b;
    var translate = react_admin_1.useTranslate();
    var classes = useStyles();
    var _c = react_admin_1.useListContext(), resource = _c.resource, filterValues = _c.filterValues, displayedFilters = _c.displayedFilters, currentSort = _c.currentSort, perPage = _c.perPage;
    var savedQueries = useSavedQueries_1.useSavedQueries(resource)[0];
    var hasSavedCurrentFilterValue = savedQueries.some(function (savedQuery) {
        return isEqual_1.default(savedQuery.value, {
            filter: filterValues,
            sort: currentSort,
            perPage: perPage,
            displayedFilters: displayedFilters,
        });
    });
    var hasFilterValues = !isEqual_1.default(filterValues, {});
    // note: we don't use react-admin's FilterList because it doesn't accept a default translation
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: classes.titleContainer },
            React.createElement("div", { className: classes.titleIcon }, icon),
            React.createElement(core_1.Typography, { variant: "overline" }, translate('ra-preferences.saved_queries.label', {
                _: 'Saved Queries',
            }))),
        React.createElement(core_1.List, { dense: true, disablePadding: true },
            hasSavedCurrentFilterValue ? (React.createElement(RemoveSavedQueryIconButton_1.RemoveSavedQueryIconButton, { className: classes.floatingIcon })) : hasFilterValues ? (React.createElement(AddSavedQueryIconButton_1.AddSavedQueryIconButton, { className: classes.floatingIcon })) : (React.createElement(core_1.Tooltip, { title: translate('ra-preferences.saved_queries.help', {
                    _: 'Filter the list and save this query for later',
                }), className: classes.floatingTooltip },
                React.createElement(HelpOutline_1.default, null))),
            savedQueries.map(function (savedQuery, index) { return (React.createElement(SavedQueryFilterListItem_1.default, { label: savedQuery.label, value: savedQuery.value, key: index })); }))));
};
var defaultIcon = React.createElement(BookmarkBorder_1.default, null);
