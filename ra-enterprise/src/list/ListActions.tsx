import * as React from 'react';
import { cloneElement, useMemo, ReactElement } from 'react';
import PropTypes from 'prop-types';
import {
    sanitizeListRestProps,
    Identifier,
    SortPayload,
    Exporter,
    useListContext,
    useResourceContext,
    useResourceDefinition,
} from 'ra-core';
import { ToolbarProps } from '@material-ui/core';

import { CreateButton, ExportButton, TopToolbar } from 'react-admin';
import { Breadcrumb } from '../layout';
import { BreadcrumbProps } from '@react-admin/ra-navigation';

export const ListActions = (props: ListActionsProps): ReactElement => {
    const { breadcrumb, className, exporter, filters, ...rest } = props;

    const {
        currentSort,
        displayedFilters,
        filterValues,
        basePath,
        selectedIds,
        showFilter,
        total,
    } = useListContext(props);
    const resource = useResourceContext(rest);
    const { hasCreate } = useResourceDefinition(rest);
    return useMemo(
        () => (
            <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
                {breadcrumb}
                {filters
                    ? cloneElement(filters, {
                          resource,
                          showFilter,
                          displayedFilters,
                          filterValues,
                          context: 'button',
                      })
                    : null}
                {hasCreate && <CreateButton basePath={basePath} />}
                {exporter !== false && (
                    <ExportButton
                        disabled={total === 0}
                        resource={resource}
                        sort={currentSort}
                        filterValues={filterValues}
                    />
                )}
            </TopToolbar>
        ),
        [resource, displayedFilters, filterValues, selectedIds, filters, total] // eslint-disable-line react-hooks/exhaustive-deps
    );
};

ListActions.propTypes = {
    basePath: PropTypes.string,
    breadcrumb: PropTypes.element,
    className: PropTypes.string,
    currentSort: PropTypes.any,
    displayedFilters: PropTypes.object,
    exporter: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    filters: PropTypes.element,
    filterValues: PropTypes.object,
    hasCreate: PropTypes.bool,
    resource: PropTypes.string,
    onUnselectItems: PropTypes.func.isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.any),
    showFilter: PropTypes.func,
    total: PropTypes.number,
};

ListActions.defaultProps = {
    breadcrumb: <Breadcrumb variant="actions" />,
    selectedIds: [],
    onUnselectItems: (): void => null,
};

export interface ListActionsProps extends ToolbarProps {
    breadcrumb?: ReactElement<BreadcrumbProps>;
    currentSort?: SortPayload;
    className?: string;
    resource?: string;
    filters?: ReactElement<any>;
    displayedFilters?: any;
    exporter?: Exporter | boolean;
    filterValues?: any;
    permanentFilter?: any;
    hasCreate?: boolean;
    basePath?: string;
    selectedIds?: Identifier[];
    onUnselectItems?: () => void;
    showFilter?: (filterName: string, defaultValue: any) => void;
    total?: number;
}
