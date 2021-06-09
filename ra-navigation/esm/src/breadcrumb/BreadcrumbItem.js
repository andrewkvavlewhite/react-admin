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
import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography } from '@material-ui/core';
import { useAppLocationMatcher, DASHBOARD } from '../app-location';
import { useHasDashboard } from '../app-location/useHasDashboard';
var resolveOrReturn = function (valueOrFunction, context) {
    return typeof valueOrFunction === 'function'
        ? valueOrFunction(context)
        : valueOrFunction;
};
/**
 * The <BreadcrumbItem /> is the component used to display the breadcrumb path inside <Breadcrumb />
 *
 * @param {string} name
 * @param {string} path
 * @param {function|string} label
 * @param {function|string} to
 * @param {boolean} hasDashboard
 *
 * @see Breadcrumb
 */
export var BreadcrumbItem = function (props) {
    var locationMatcher = useAppLocationMatcher();
    var hasDashboard = useHasDashboard(props);
    var to = props.to, name = props.name, path = props.path, label = props.label, children = props.children, hasDashboardOverride = props.hasDashboard, rest = __rest(props, ["to", "name", "path", "label", "children", "hasDashboard"]);
    var currentPath = name === DASHBOARD ? '' : "" + (path ? path + "." : '') + name;
    var location = locationMatcher(currentPath);
    if (!location) {
        return null;
    }
    if (name === DASHBOARD && location.path === DASHBOARD) {
        return null;
    }
    var exactMatch = location.path === currentPath;
    var resolvedLabel = resolveOrReturn(label, location.values);
    var resolvedTo = resolveOrReturn(to, location.values);
    return (React.createElement(React.Fragment, null,
        React.createElement("li", __assign({ key: name }, rest), resolvedTo && !exactMatch ? (React.createElement(Link, { variant: "body2", color: "inherit", component: RouterLink, to: resolvedTo }, resolvedLabel)) : (React.createElement(Typography, { variant: "body2", color: "inherit", component: "span" }, resolvedLabel))),
        React.Children.map(children, function (child) {
            return React.cloneElement(child, {
                path: currentPath,
                hasDashboard: hasDashboard,
            });
        })));
};
