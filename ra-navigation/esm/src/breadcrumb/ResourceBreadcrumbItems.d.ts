import { ReactElement } from 'react';
export declare type ResourceBreadcrumbItemsProps = {
    resources?: string[];
    hasDashboard?: boolean;
};
/**
 * The <ResourceBreadcrumbItems /> component allows to render a bunch of <BreadcrumbItem /> from a list of resources
 * By default (without the "resources" props), it'll render all the react-admin registred resources
 *
 * @see BreadcrumbItem
 */
export declare const ResourceBreadcrumbItems: ({ resources, ...props }: ResourceBreadcrumbItemsProps) => ReactElement;
