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
import { Filter, TextInput, useTranslate } from 'react-admin';
import { AuthorInput } from './AuthorInput';
import { EventDateInput } from './EventDateInput';
import { ResourceInput } from './ResourceInput';
/**
 * Includes all the default filters for the EventList in a component usable as the list filter.
 * @param props The component props
 * @param {string} props.authorResource Optional. The name of the resource for authors.
 * @param {object} props.dateFilters Optional. A map of date filters where the key is the label (which can be a translation key) and the value a function returning a date.
 * @param {string} props.eventsResource Optional. The name of the resource for events. Defaults to `events`
 */
export var EventListFilter = function (props) {
    var authorResource = props.authorResource, dateFilters = props.dateFilters, eventResource = props.eventResource, rest = __rest(props, ["authorResource", "dateFilters", "eventResource"]);
    var translate = useTranslate();
    return (React.createElement(Filter, __assign({}, rest),
        React.createElement(TextInput, { label: "Search", source: "q", alwaysOn: true }),
        dateFilters !== false && (React.createElement(EventDateInput, { source: "date_gte", 
            // Needed to avoid having `Date gte` as the filter label
            label: translate("resources." + eventResource + ".fields.date", {
                _: 'Date',
            }), dateFilters: dateFilters })),
        React.createElement(ResourceInput, { source: "resource", eventResource: eventResource, label: "resources." + eventResource + ".fields.resource" }),
        React.createElement(AuthorInput, { source: "author", label: "resources." + eventResource + ".fields.author", authorResource: authorResource })));
};
