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
exports.ResourceBreadcrumbItems = void 0;
var React = __importStar(require("react"));
var useResourcesBreadcrumbPaths_1 = require("./useResourcesBreadcrumbPaths");
var BreadcrumbItem_1 = require("./BreadcrumbItem");
var DashboardBreadcrumbItem_1 = require("./DashboardBreadcrumbItem");
var useHasDashboard_1 = require("../app-location/useHasDashboard");
/**
 * The <ResourceBreadcrumbItems /> component allows to render a bunch of <BreadcrumbItem /> from a list of resources
 * By default (without the "resources" props), it'll render all the react-admin registred resources
 *
 * @see BreadcrumbItem
 */
exports.ResourceBreadcrumbItems = function (_a) {
    var resources = _a.resources, props = __rest(_a, ["resources"]);
    var resourcesPaths = useResourcesBreadcrumbPaths_1.useResourcesBreadcrumbPaths(resources);
    var hasDashboard = useHasDashboard_1.useHasDashboard(props);
    if (hasDashboard) {
        return (React.createElement(DashboardBreadcrumbItem_1.DashboardBreadcrumbItem, null, Object.keys(resourcesPaths).map(function (name) { return (React.createElement(BreadcrumbItem_1.BreadcrumbItem, __assign({ key: name, name: name }, resourcesPaths[name]))); })));
    }
    return (React.createElement(React.Fragment, null, Object.keys(resourcesPaths).map(function (name) { return (React.createElement(BreadcrumbItem_1.BreadcrumbItem, __assign({ key: name, name: name }, resourcesPaths[name]))); })));
};
