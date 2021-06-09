import * as React from 'react';
import isEqual from 'lodash/isEqual';
import { useListContext, useTranslate } from 'react-admin';
import { Tooltip, Typography, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BookmarkIcon from '@material-ui/icons/BookmarkBorder';
import HelpIcon from '@material-ui/icons/HelpOutline';
import { useSavedQueries } from './useSavedQueries';
import SavedQueryFilterListItem from './SavedQueryFilterListItem';
import { AddSavedQueryIconButton } from './AddSavedQueryIconButton';
import { RemoveSavedQueryIconButton } from './RemoveSavedQueryIconButton';
var useStyles = makeStyles(function (theme) { return ({
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
export var SavedQueriesList = function (_a) {
    var _b = _a.icon, icon = _b === void 0 ? defaultIcon : _b;
    var translate = useTranslate();
    var classes = useStyles();
    var _c = useListContext(), resource = _c.resource, filterValues = _c.filterValues, displayedFilters = _c.displayedFilters, currentSort = _c.currentSort, perPage = _c.perPage;
    var savedQueries = useSavedQueries(resource)[0];
    var hasSavedCurrentFilterValue = savedQueries.some(function (savedQuery) {
        return isEqual(savedQuery.value, {
            filter: filterValues,
            sort: currentSort,
            perPage: perPage,
            displayedFilters: displayedFilters,
        });
    });
    var hasFilterValues = !isEqual(filterValues, {});
    // note: we don't use react-admin's FilterList because it doesn't accept a default translation
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: classes.titleContainer },
            React.createElement("div", { className: classes.titleIcon }, icon),
            React.createElement(Typography, { variant: "overline" }, translate('ra-preferences.saved_queries.label', {
                _: 'Saved Queries',
            }))),
        React.createElement(List, { dense: true, disablePadding: true },
            hasSavedCurrentFilterValue ? (React.createElement(RemoveSavedQueryIconButton, { className: classes.floatingIcon })) : hasFilterValues ? (React.createElement(AddSavedQueryIconButton, { className: classes.floatingIcon })) : (React.createElement(Tooltip, { title: translate('ra-preferences.saved_queries.help', {
                    _: 'Filter the list and save this query for later',
                }), className: classes.floatingTooltip },
                React.createElement(HelpIcon, null))),
            savedQueries.map(function (savedQuery, index) { return (React.createElement(SavedQueryFilterListItem, { label: savedQuery.label, value: savedQuery.value, key: index })); }))));
};
var defaultIcon = React.createElement(BookmarkIcon, null);
