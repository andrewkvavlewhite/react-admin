import { useContext } from 'react';
import { AppBreadcrumbContext } from './AppBreadcrumbContext';
/**
 * A hook which will returns a boolean indicating wether a dashboard exists on the Admin.
 * It relies on the `hasDashboard` prop of the `<AppLocationContext>`
 *
 * You may force its value by passing a props object containing an `hasDashboard` property.
 * @see AppLocationContext
 * @returns A boolean indicating wether a dashboard exists on the Admin.
 */
export var useHasDashboard = function (props) {
    var context = useContext(AppBreadcrumbContext);
    return props.hasDashboard != undefined
        ? props.hasDashboard
        : context.hasDashboard;
};
