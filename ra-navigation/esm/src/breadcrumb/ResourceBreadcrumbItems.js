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
import { useResourcesBreadcrumbPaths } from './useResourcesBreadcrumbPaths';
import { BreadcrumbItem } from './BreadcrumbItem';
import { DashboardBreadcrumbItem } from './DashboardBreadcrumbItem';
import { useHasDashboard } from '../app-location/useHasDashboard';
/**
 * The <ResourceBreadcrumbItems /> component allows to render a bunch of <BreadcrumbItem /> from a list of resources
 * By default (without the "resources" props), it'll render all the react-admin registred resources
 *
 * @see BreadcrumbItem
 */
export var ResourceBreadcrumbItems = function (_a) {
    var resources = _a.resources, props = __rest(_a, ["resources"]);
    var resourcesPaths = useResourcesBreadcrumbPaths(resources);
    var hasDashboard = useHasDashboard(props);
    if (hasDashboard) {
        return (React.createElement(DashboardBreadcrumbItem, null, Object.keys(resourcesPaths).map(function (name) { return (React.createElement(BreadcrumbItem, __assign({ key: name, name: name }, resourcesPaths[name]))); })));
    }
    return (React.createElement(React.Fragment, null, Object.keys(resourcesPaths).map(function (name) { return (React.createElement(BreadcrumbItem, __assign({ key: name, name: name }, resourcesPaths[name]))); })));
};
