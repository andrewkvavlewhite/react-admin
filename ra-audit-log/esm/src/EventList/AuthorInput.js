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
import { AutocompleteInput, ReferenceInput, TextInput, } from 'react-admin';
/**
 * A react-admin input allowing to filter events by author. Should be included in a List filter.
 * If the events authors have a dedicated resource, an AutoCompleteInput will be used to select them.
 *
 * @see {@link https://marmelab.com/react-admin/List.html#the-filter-buttonform-combo|Filter}
 * @see {@link https://marmelab.com/react-admin/Inputs.html#autocompleteinput|AutoCompleteInput}
 *
 * @param props The component props
 * @param {string} props.authorResource Optional. The name of the resource for authors.
 *
 * @example <caption>Basic usage</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { Filter } from 'react-admin';
 * import { AuthorInput } from '@react-admin/ra-audit-log';
 *
 * export const EventListFilter = (props) => {
 *     return (
 *         <Filter {...rest}>
 *             <AuthorInput
 *                 // source is required by react-admin but it won't be used by the AuthorInput
 *                 source="author"
 *                 // You should specify a label which can be a translation key
 *                 label="Authors"
 *             />
 *         </Filter>
 *     );
 * };
 *
 * @example <caption>With an author resource</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { Filter } from 'react-admin';
 * import { AuthorInput } from '@react-admin/ra-audit-log';
 *
 * export const EventListFilter = (props) => {
 *     return (
 *         <Filter {...rest}>
 *             <AuthorInput
 *                 // source is required by react-admin but it won't be used by the AuthorInput
 *                 source="author"
 *                 // You should specify a label which can be a translation key
 *                 label="Authors"
 *                 authorResource="users"
 *             />
 *         </Filter>
 *     );
 * };
 */
export var AuthorInput = function (props) {
    var authorResource = props.authorResource, className = props.className, source = props.source, rest = __rest(props, ["authorResource", "className", "source"]);
    if (authorResource) {
        return (React.createElement(ReferenceInput, __assign({ reference: authorResource, source: "author.id" }, rest),
            React.createElement(AutocompleteInput, { className: className, optionText: "fullName", resettable: true })));
    }
    return (React.createElement(TextInput, __assign({ source: "author.fullName", className: className, resettable: true }, rest)));
};
