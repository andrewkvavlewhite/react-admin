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
import { AuthorInput } from './AuthorInput';
/**
 * A react-admin FilterList allowing to filter events by author. Should be included in a List aside.
 * If the events authors have a dedicated resource, an AutoCompleteInput will be used to select them.
 *
 * @see {@link https://marmelab.com/react-admin/List.html#the-filterlist-sidebar|FilterList}
 * @see {@link https://marmelab.com/react-admin/Inputs.html#autocompleteinput|AutoCompleteInput}
 *
 * @param props The component props
 * @param {string} props.authorResource Optional. The name of the resource for authors.
 *
 * @example <caption>Basic usage</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { FilterLiveSearch } from 'react-admin';
 * import { AuthorFilterList } from '@react-admin/ra-audit-log';
 *
 * export const EventFilterAside = () => {
 *     return (
 *         <Card>
 *             <CardContent>
 *                 <FilterLiveSearch source="q" />
 *                 <AuthorFilterList />
 *             </CardContent>
 *         </Card>
 *     );
 * };
 *
 * @example <caption>With an author resource</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { FilterLiveSearch } from 'react-admin';
 * import { AuthorFilterList } from '@react-admin/ra-audit-log';
 *
 * export const EventFilterAside = () => {
 *     return (
 *         <Card>
 *             <CardContent>
 *                 <FilterLiveSearch source="q" />
 *                 <AuthorFilterList authorResource="users" />
 *             </CardContent>
 *         </Card>
 *     );
 * };
 */
export var AuthorFilterList = function (props) {
    var authorResource = props.authorResource;
    var classes = useStyles(props);
    var _a = useListFilterContext(), filterValues = _a.filterValues, setFilters = _a.setFilters;
    var handleChange = function (eventOrValue) {
        var _a;
        var _b;
        var field = authorResource ? 'author.id' : 'author.fullName';
        var value = authorResource
            ? eventOrValue
            : (_b = eventOrValue.target) === null || _b === void 0 ? void 0 : _b.value;
        setFilters(__assign(__assign({}, filterValues), (_a = {}, _a[field] = value, _a)), null, true);
    };
    var handleFormSubmit = function (values) {
        setFilters(__assign(__assign({}, filterValues), { values: values }), null, false);
    };
    return (React.createElement(FilterList, { label: "ra-audit-log.filter.author", icon: React.createElement(PeopleIcon, null) },
        React.createElement(ListItem, { className: classes.listItem },
            React.createElement(Form, { onSubmit: handleFormSubmit, render: function (_a) {
                    var handleSubmit = _a.handleSubmit;
                    return (React.createElement("form", { className: classes.form, onSubmit: handleSubmit },
                        React.createElement(AuthorInput, { className: classes.input, label: "Author", onChange: handleChange, authorResource: authorResource, initialValue: authorResource
                                ? get(filterValues, 'author.id')
                                : get(filterValues, 'author.fullName') })));
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
    name: 'RaAuthorFilterList',
});
