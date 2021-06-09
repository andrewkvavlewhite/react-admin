"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHasDashboard = void 0;
var react_1 = require("react");
var AppBreadcrumbContext_1 = require("./AppBreadcrumbContext");
/**
 * A hook which will returns a boolean indicating wether a dashboard exists on the Admin.
 * It relies on the `hasDashboard` prop of the `<AppLocationContext>`
 *
 * You may force its value by passing a props object containing an `hasDashboard` property.
 * @see AppLocationContext
 * @returns A boolean indicating wether a dashboard exists on the Admin.
 */
exports.useHasDashboard = function (props) {
    var context = react_1.useContext(AppBreadcrumbContext_1.AppBreadcrumbContext);
    return props.hasDashboard != undefined
        ? props.hasDashboard
        : context.hasDashboard;
};
