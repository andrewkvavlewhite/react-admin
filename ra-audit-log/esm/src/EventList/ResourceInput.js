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
import inflection from 'inflection';
import { useSelector } from 'react-redux';
import { AutocompleteInput, getResources, useTranslate, } from 'react-admin';
import { DefaultAuditLogResource } from '../constants';
/**
 * A react-admin input allowing to filter events by resource. an AutoCompleteInput will be used to select them. It should be included in a List filter.
 * It excludes the events resource itself which is named `events` by default.
 *
 * @see {@link https://marmelab.com/react-admin/List.html#the-filter-buttonform-combo|Filter}
 * @see {@link https://marmelab.com/react-admin/Inputs.html#autocompleteinput|AutoCompleteInput}
 *
 * @param props The component props
 * @param {string} props.eventsResource Optional. The name of the resource for events. Defaults to `events`
 *
 * @example <caption>Basic usage</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { Filter } from 'react-admin';
 * import { ResourceInput } from '@react-admin/ra-audit-log';
 *
 * export const EventListFilter = (props) => {
 *     return (
 *         <Filter {...rest}>
 *             <ResourceInput
 *                 source="resource"
 *                 // You should specify a label which can be a translation key
 *                 label="Resources"
 *             />
 *         </Filter>
 *     );
 * };
 *
 * @example <caption>With a custom event resource</caption>
 * import { Card, CardContent } from '@material-ui/core';
 * import { Filter } from 'react-admin';
 * import { ResourceInput } from '@react-admin/ra-audit-log';
 *
 * export const EventListFilter = (props) => {
 *     return (
 *         <Filter {...rest}>
 *             <ResourceInput
 *                 source="resource"
 *                 // You should specify a label which can be a translation key
 *                 label="Resources"
 *                 eventsResource="aydit-logs"
 *             />
 *         </Filter>
 *     );
 * };
 */
export var ResourceInput = function (props) {
    var _a = props.eventResource, eventResource = _a === void 0 ? DefaultAuditLogResource : _a, source = props.source, rest = __rest(props, ["eventResource", "source"]);
    var resources = useSelector(getResources);
    var translate = useTranslate();
    var choices = resources
        .filter(function (_a) {
        var name = _a.name;
        return name !== eventResource;
    })
        .map(function (_a) {
        var name = _a.name, options = _a.options;
        return ({
            id: name,
            name: translate("resources." + name + ".name", {
                smart_count: 2,
                _: (options === null || options === void 0 ? void 0 : options.label) ? translate(options.label, {
                    smart_count: 2,
                    _: options.label,
                })
                    : inflection.humanize(inflection.pluralize(name)),
            }),
        });
    });
    return (React.createElement(AutocompleteInput, __assign({ source: "resource", choices: choices, resettable: true }, rest)));
};
