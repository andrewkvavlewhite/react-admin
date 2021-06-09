import { HTMLAttributes, ReactElement } from 'react';
import { LocationDescriptor } from 'history';
export declare type GetLabelFunction = (context: Record<string, unknown>) => string | JSX.Element;
export declare type GetToFunction = (context: Record<string, unknown>) => string | LocationDescriptor;
export declare type BreadcrumbPath = {
    label: string | GetLabelFunction;
    to?: string | LocationDescriptor | GetToFunction;
};
export declare type BreadcrumbItemProps = {
    name: string;
    path?: string;
    hasDashboard?: boolean;
} & BreadcrumbPath & HTMLAttributes<HTMLLIElement>;
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
export declare const BreadcrumbItem: (props: BreadcrumbItemProps) => ReactElement;
