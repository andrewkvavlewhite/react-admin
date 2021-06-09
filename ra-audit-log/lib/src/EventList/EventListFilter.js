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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventListFilter = void 0;
var React = __importStar(require("react"));
var react_admin_1 = require("react-admin");
var AuthorInput_1 = require("./AuthorInput");
var EventDateInput_1 = require("./EventDateInput");
var ResourceInput_1 = require("./ResourceInput");
/**
 * Includes all the default filters for the EventList in a component usable as the list filter.
 * @param props The component props
 * @param {string} props.authorResource Optional. The name of the resource for authors.
 * @param {object} props.dateFilters Optional. A map of date filters where the key is the label (which can be a translation key) and the value a function returning a date.
 * @param {string} props.eventsResource Optional. The name of the resource for events. Defaults to `events`
 */
exports.EventListFilter = function (props) {
    var authorResource = props.authorResource, dateFilters = props.dateFilters, eventResource = props.eventResource, rest = __rest(props, ["authorResource", "dateFilters", "eventResource"]);
    var translate = react_admin_1.useTranslate();
    return (React.createElement(react_admin_1.Filter, __assign({}, rest),
        React.createElement(react_admin_1.TextInput, { label: "Search", source: "q", alwaysOn: true }),
        dateFilters !== false && (React.createElement(EventDateInput_1.EventDateInput, { source: "date_gte", 
            // Needed to avoid having `Date gte` as the filter label
            label: translate("resources." + eventResource + ".fields.date", {
                _: 'Date',
            }), dateFilters: dateFilters })),
        React.createElement(ResourceInput_1.ResourceInput, { source: "resource", eventResource: eventResource, label: "resources." + eventResource + ".fields.resource" }),
        React.createElement(AuthorInput_1.AuthorInput, { source: "author", label: "resources." + eventResource + ".fields.author", authorResource: authorResource })));
};
