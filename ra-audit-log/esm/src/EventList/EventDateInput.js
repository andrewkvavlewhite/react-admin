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
import { SelectInput } from 'react-admin';
import { DefaultDateFilters } from './DefaultDateFilters';
/**
 * A react-admin input allowing to filter events by date. Should be included in a List filter.
 * It provides default common filter such as today, last week or last month but can be customized.
 *
 * @see {@link https://marmelab.com/react-admin/List.html#the-filter-buttonform-combo|Filter}
 *
 * @param props The component props
 * @param {object} props.dateFilters Optional. A map of date filters where the key is the label (which can be a translation key) and the value a function returning a date.

 * @example <caption>Basic usage</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { Filter } from 'react-admin';
 * import { EventDateInput } from '@react-admin/ra-audit-log';
 *
 * export const EventListFilter = (props) => {
 *     return (
 *         <Filter {...rest}>
 *             <EventDateInput
 *                 source="date"
 *                 // You should specify a label which can be a translation key
 *                 label="Date"
 *             />
 *         </Filter>
 *     );
 * };
 *
 * @example <caption>With custom filters</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { Filter } from 'react-admin';
 * import startOfYear from 'date-fns/startOfYear';
 * import { EventDateInput } from '@react-admin/ra-audit-log';
 *
 * const dateFilters = {
 *     ...DefaultDateFilters,
 *     'This Year': () => startOfYear(new Date()).toISOString(),
 * };
 *
 * export const EventListFilter = (props) => {
 *     return (
 *         <Filter {...rest}>
 *             <EventDateInput
 *                 source="date"
 *                 // You should specify a label which can be a translation key
 *                 label="Date"
 *                 dateFilters={dateFilters}
 *             />
 *         </Filter>
 *     );
 * };
 */
export var EventDateInput = function (props) {
    var _a = props.dateFilters, dateFilters = _a === void 0 ? DefaultDateFilters : _a, rest = __rest(props, ["dateFilters"]);
    var choices = React.useMemo(function () {
        return Object.keys(dateFilters).map(function (periodLabel) { return ({
            name: periodLabel,
            id: dateFilters[periodLabel](),
        }); });
    }, [dateFilters]);
    return React.createElement(SelectInput, __assign({ choices: choices }, rest));
};
