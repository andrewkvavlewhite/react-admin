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
exports.AuthorFilterList = void 0;
var React = __importStar(require("react"));
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var People_1 = __importDefault(require("@material-ui/icons/People"));
var react_final_form_1 = require("react-final-form");
var react_admin_1 = require("react-admin");
var get_1 = __importDefault(require("lodash/get"));
var AuthorInput_1 = require("./AuthorInput");
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
exports.AuthorFilterList = function (props) {
    var authorResource = props.authorResource;
    var classes = useStyles(props);
    var _a = react_admin_1.useListFilterContext(), filterValues = _a.filterValues, setFilters = _a.setFilters;
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
    return (React.createElement(react_admin_1.FilterList, { label: "ra-audit-log.filter.author", icon: React.createElement(People_1.default, null) },
        React.createElement(core_1.ListItem, { className: classes.listItem },
            React.createElement(react_final_form_1.Form, { onSubmit: handleFormSubmit, render: function (_a) {
                    var handleSubmit = _a.handleSubmit;
                    return (React.createElement("form", { className: classes.form, onSubmit: handleSubmit },
                        React.createElement(AuthorInput_1.AuthorInput, { className: classes.input, label: "Author", onChange: handleChange, authorResource: authorResource, initialValue: authorResource
                                ? get_1.default(filterValues, 'author.id')
                                : get_1.default(filterValues, 'author.fullName') })));
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
    name: 'RaAuthorFilterList',
});
