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
import * as React from 'react';
import { ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PeopleIcon from '@material-ui/icons/People';
import { Form } from 'react-final-form';
import { FilterList, useListFilterContext } from 'react-admin';
import get from 'lodash/get';
import { ResourceInput } from './ResourceInput';
/**
 * A react-admin FilterList allowing to filter events by resource. Should be included in a List aside.
 * It excludes the events resource itself which is named `events` by default.
 *
 * @see {@link https://marmelab.com/react-admin/List.html#the-filterlist-sidebar|FilterList}
 *
 * @param props The component props
 * @param {string} props.eventsResource Optional. The name of the resource for events. Defaults to `events`
 *
 * @example <caption>Basic usage</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { FilterLiveSearch } from 'react-admin';
 * import { ResourceFilterList } from '@react-admin/ra-audit-log';
 *
 * export const EventFilterAside = () => {
 *     return (
 *         <Card>
 *             <CardContent>
 *                 <FilterLiveSearch source="q" />
 *                 <ResourceFilterList />
 *             </CardContent>
 *         </Card>
 *     );
 * };
 *
 * @example <caption>With a custom event resource</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { FilterLiveSearch } from 'react-admin';
 * import { ResourceFilterList } from '@react-admin/ra-audit-log';
 *
 * export const EventFilterAside = () => {
 *     return (
 *         <Card>
 *             <CardContent>
 *                 <FilterLiveSearch source="q" />
 *                 <ResourceFilterList eventResource="users" />
 *             </CardContent>
 *         </Card>
 *     );
 * };
 */
export var ResourceFilterList = function (props) {
    var eventResource = props.eventResource;
    var classes = useStyles(props);
    var _a = useListFilterContext(), filterValues = _a.filterValues, setFilters = _a.setFilters;
    var handleChange = function (eventOrValue) {
        var _a;
        setFilters(__assign(__assign({}, filterValues), { resource: ((_a = eventOrValue === null || eventOrValue === void 0 ? void 0 : eventOrValue.target) === null || _a === void 0 ? void 0 : _a.value) || eventOrValue }), null, true);
    };
    var handleFormSubmit = function (values) {
        setFilters(__assign(__assign({}, filterValues), { values: values }), null, false);
    };
    return (React.createElement(FilterList, { label: "ra-audit-log.filter.resource", icon: React.createElement(PeopleIcon, null) },
        React.createElement(ListItem, { className: classes.listItem },
            React.createElement(Form, { onSubmit: handleFormSubmit, render: function (_a) {
                    var handleSubmit = _a.handleSubmit;
                    return (React.createElement("form", { className: classes.form, onSubmit: handleSubmit },
                        React.createElement(ResourceInput, { onChange: handleChange, eventResource: eventResource, className: classes.input, initialValue: get(filterValues, 'resource') })));
                } }))));
};
var useStyles = makeStyles({
    listItem: {
        paddingRight: 0,
        display: 'flex',
        flexDirection: 'column',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    input: {
        width: '100%',
    },
}, {
    name: 'RaResourceFilterList',
});
