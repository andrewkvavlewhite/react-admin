import * as React from 'react';
import { ReactElement } from 'react';
import {
    Breadcrumb as DefaultBreadcrumb,
    BreadcrumbProps,
    ResourceBreadcrumbItems,
} from '@react-admin/ra-navigation';

/**
 * A <Breadcrumb> component for ra-enterprise
 *
 */
const Breadcrumb = (props: BreadcrumbProps): ReactElement => {
    return (
        <DefaultBreadcrumb {...props}>
            <ResourceBreadcrumbItems />
        </DefaultBreadcrumb>
    );
};

Breadcrumb.defaultProps = {};

export default Breadcrumb;
