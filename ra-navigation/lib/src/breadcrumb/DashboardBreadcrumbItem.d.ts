import { FC, HTMLAttributes } from 'react';
import { LocationDescriptor } from 'history';
import { GetLabelFunction, GetToFunction } from './BreadcrumbItem';
export declare type DashboardBreadcrumbItemProps = {
    name?: string;
    path?: string;
    label?: string | GetLabelFunction;
    to?: string | LocationDescriptor | GetToFunction;
} & HTMLAttributes<HTMLElement>;
export declare const DashboardBreadcrumbItem: FC<DashboardBreadcrumbItemProps>;
