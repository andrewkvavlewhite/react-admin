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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceFilterList = void 0;
var React = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var People_1 = __importDefault(require("@material-ui/icons/People"));
var react_final_form_1 = require("react-final-form");
var react_admin_1 = require("react-admin");
var get_1 = __importDefault(require("lodash/get"));
var ResourceInput_1 = require("./ResourceInput");
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
exports.ResourceFilterList = function (props) {
    var eventResource = props.eventResource;
    var classes = useStyles(props);
    var _a = react_admin_1.useListFilterContext(), filterValues = _a.filterValues, setFilters = _a.setFilters;
    var handleChange = function (eventOrValue) {
        var _a;
        setFilters(__assign(__assign({}, filterValues), { resource: ((_a = eventOrValue === null || eventOrValue === void 0 ? void 0 : eventOrValue.target) === null || _a === void 0 ? void 0 : _a.value) || eventOrValue }), null, true);
    };
    var handleFormSubmit = function (values) {
        setFilters(__assign(__assign({}, filterValues), { values: values }), null, false);
    };
    return (React.createElement(react_admin_1.FilterList, { label: "ra-audit-log.filter.resource", icon: React.createElement(People_1.default, null) },
        React.createElement(core_1.ListItem, { className: classes.listItem },
            React.createElement(react_final_form_1.Form, { onSubmit: handleFormSubmit, render: function (_a) {
                    var handleSubmit = _a.handleSubmit;
                    return (React.createElement("form", { className: classes.form, onSubmit: handleSubmit },
                        React.createElement(ResourceInput_1.ResourceInput, { onChange: handleChange, eventResource: eventResource, className: classes.input, initialValue: get_1.default(filterValues, 'resource') })));
                } }))));
};
var useStyles = styles_1.makeStyles({
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
