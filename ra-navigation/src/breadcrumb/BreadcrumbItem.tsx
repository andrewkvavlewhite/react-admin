import * as React from 'react';
import { HTMLAttributes, ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { LocationDescriptor } from 'history';
import { Link, Typography } from '@material-ui/core';

import { useAppLocationMatcher, DASHBOARD } from '../app-location';
import { useHasDashboard } from '../app-location/useHasDashboard';

export type GetLabelFunction = (
    context: Record<string, unknown>
) => string | JSX.Element;

export type GetToFunction = (
    context: Record<string, unknown>
) => string | LocationDescriptor;

export type BreadcrumbPath = {
    label: string | GetLabelFunction;
    to?: string | LocationDescriptor | GetToFunction;
};

export type BreadcrumbItemProps = {
    name: string;
    path?: string;
    hasDashboard?: boolean;
} & BreadcrumbPath &
    HTMLAttributes<HTMLLIElement>;

const resolveOrReturn = (valueOrFunction: any, context: any): any =>
    typeof valueOrFunction === 'function'
        ? valueOrFunction(context)
        : valueOrFunction;

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
export const BreadcrumbItem = (props: BreadcrumbItemProps): ReactElement => {
    const locationMatcher = useAppLocationMatcher();
    const hasDashboard = useHasDashboard(props);

    const {
        to,
        name,
        path,
        label,
        children,
        hasDashboard: hasDashboardOverride,
        ...rest
    } = props;

    const currentPath =
        name === DASHBOARD ? '' : `${path ? `${path}.` : ''}${name}`;

    const location = locationMatcher(currentPath);
    if (!location) {
        return null;
    }
    if (name === DASHBOARD && location.path === DASHBOARD) {
        return null;
    }

    const exactMatch = location.path === currentPath;

    const resolvedLabel = resolveOrReturn(label, location.values);
    const resolvedTo = resolveOrReturn(to, location.values);

    return (
        <>
            <li key={name} {...rest}>
                {resolvedTo && !exactMatch ? (
                    <Link
                        variant="body2"
                        color="inherit"
                        component={RouterLink}
                        to={resolvedTo}
                    >
                        {resolvedLabel}
                    </Link>
                ) : (
                    <Typography
                        variant="body2"
                        color="inherit"
                        component="span"
                    >
                        {resolvedLabel}
                    </Typography>
                )}
            </li>
            {React.Children.map(children, child =>
                React.cloneElement(child as ReactElement<any>, {
                    path: currentPath,
                    hasDashboard,
                })
            )}
        </>
    );
};
