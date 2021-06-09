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
exports.EventDateFilterList = void 0;
var React = __importStar(require("react"));
var AccessTime_1 = __importDefault(require("@material-ui/icons/AccessTime"));
var react_admin_1 = require("react-admin");
var DefaultDateFilters_1 = require("./DefaultDateFilters");
/**
 * A react-admin FilterList allowing to filter events by date. Should be included in a List aside.
 * It provides default common filter such as today, last week or last month but can be customized.
 *
 * @see {@link https://marmelab.com/react-admin/List.html#the-filterlist-sidebar|FilterList}
 *
 * @param props The component props
 * @param {object} props.dateFilters Optional. A map of date filters where the key is the label (which can be a translation key) and the value a function returning a date.
 *
 * @example <caption>Basic usage</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { FilterLiveSearch } from 'react-admin';
 * import { EventDateFilterList } from '@react-admin/ra-audit-log';
 *
 * export const EventFilterAside = () => {
 *     return (
 *         <Card>
 *             <CardContent>
 *                 <FilterLiveSearch source="q" />
 *                 <EventDateFilterList />
 *             </CardContent>
 *         </Card>
 *     );
 * };
 *
 * @example <caption>With custom filters</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { FilterLiveSearch } from 'react-admin';
 * import { DefaultDateFilters, EventDateFilterList } from '@react-admin/ra-audit-log';
 * import startOfYear from 'date-fns/startOfYear';
 *
 * const dateFilters = {
 *     ...DefaultDateFilters,
 *     'This Year': () => startOfYear(new Date()).toISOString(),
 * };
 *
 * export const EventFilterAside = () => {
 *     return (
 *         <Card>
 *             <CardContent>
 *                 <FilterLiveSearch source="q" />
 *                 <EventDateFilterList dateFilters={dateFilters} />
 *             </CardContent>
 *         </Card>
 *     );
 * };
 */
exports.EventDateFilterList = function (props) {
    var _a = props.dateFilters, dateFilters = _a === void 0 ? DefaultDateFilters_1.DefaultDateFilters : _a;
    return (React.createElement(react_admin_1.FilterList, { label: "ra-audit-log.filter.date", icon: React.createElement(AccessTime_1.default, null) }, Object.keys(dateFilters).map(function (periodLabel) { return (React.createElement(react_admin_1.FilterListItem, { key: periodLabel, label: periodLabel, value: {
            date_gte: dateFilters[periodLabel](),
        } })); })));
};
