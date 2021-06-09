import { useContext } from 'react';
import { AppBreadcrumbContext } from './AppBreadcrumbContext';

interface PropsWithHasDashboard {
    hasDashboard?: boolean;
}

/**
 * A hook which will returns a boolean indicating wether a dashboard exists on the Admin.
 * It relies on the `hasDashboard` prop of the `<AppLocationContext>`
 *
 * You may force its value by passing a props object containing an `hasDashboard` property.
 * @see AppLocationContext
 * @returns A boolean indicating wether a dashboard exists on the Admin.
 */
export const useHasDashboard = <
    T extends PropsWithHasDashboard = PropsWithHasDashboard
>(
    props: T
): boolean => {
    const context = useContext(AppBreadcrumbContext);

    return props.hasDashboard != undefined
        ? props.hasDashboard
        : context.hasDashboard;
};
