import * as React from 'react';
import { ReactElement } from 'react';

import { useResourcesBreadcrumbPaths } from './useResourcesBreadcrumbPaths';
import { BreadcrumbItem } from './BreadcrumbItem';
import { DashboardBreadcrumbItem } from './DashboardBreadcrumbItem';
import { useHasDashboard } from '../app-location/useHasDashboard';

export type ResourceBreadcrumbItemsProps = {
    resources?: string[];
    hasDashboard?: boolean;
};

/**
 * The <ResourceBreadcrumbItems /> component allows to render a bunch of <BreadcrumbItem /> from a list of resources
 * By default (without the "resources" props), it'll render all the react-admin registred resources
 *
 * @see BreadcrumbItem
 */
export const ResourceBreadcrumbItems = ({
    resources,
    ...props
}: ResourceBreadcrumbItemsProps): ReactElement => {
    const resourcesPaths = useResourcesBreadcrumbPaths(resources);
    const hasDashboard = useHasDashboard(props);

    if (hasDashboard) {
        return (
            <DashboardBreadcrumbItem>
                {Object.keys(resourcesPaths).map(name => (
                    <BreadcrumbItem
                        key={name}
                        name={name}
                        {...resourcesPaths[name]}
                    />
                ))}
            </DashboardBreadcrumbItem>
        );
    }
    return (
        <>
            {Object.keys(resourcesPaths).map(name => (
                <BreadcrumbItem
                    key={name}
                    name={name}
                    {...resourcesPaths[name]}
                />
            ))}
        </>
    );
};
