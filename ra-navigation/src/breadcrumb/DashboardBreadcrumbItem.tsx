import * as React from 'react';
import { FC, HTMLAttributes } from 'react';
import { useTranslate } from 'react-admin';
import { LocationDescriptor } from 'history';

import {
    BreadcrumbItem,
    GetLabelFunction,
    GetToFunction,
} from './BreadcrumbItem';
import { DASHBOARD, DASHBOARD_LABEL } from '../app-location';

export type DashboardBreadcrumbItemProps = {
    name?: string;
    path?: string;
    label?: string | GetLabelFunction;
    to?: string | LocationDescriptor | GetToFunction;
} & HTMLAttributes<HTMLElement>;

export const DashboardBreadcrumbItem: FC<DashboardBreadcrumbItemProps> = ({
    children,
    ...props
}) => {
    const translate = useTranslate();

    return (
        <BreadcrumbItem
            name={DASHBOARD}
            to="/"
            label={translate(DASHBOARD_LABEL, { _: 'Dashboard' })}
            {...props}
        >
            {children}
        </BreadcrumbItem>
    );
};
