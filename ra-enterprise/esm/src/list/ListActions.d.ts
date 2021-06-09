import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { Identifier, SortPayload, Exporter } from 'ra-core';
import { ToolbarProps } from '@material-ui/core';
import { BreadcrumbProps } from '@react-admin/ra-navigation';
export declare const ListActions: {
    (props: ListActionsProps): ReactElement;
    propTypes: {
        basePath: PropTypes.Requireable<string>;
        breadcrumb: PropTypes.Requireable<PropTypes.ReactElementLike>;
        className: PropTypes.Requireable<string>;
        currentSort: PropTypes.Requireable<any>;
        displayedFilters: PropTypes.Requireable<object>;
        exporter: PropTypes.Requireable<boolean | ((...args: any[]) => any)>;
        filters: PropTypes.Requireable<PropTypes.ReactElementLike>;
        filterValues: PropTypes.Requireable<object>;
        hasCreate: PropTypes.Requireable<boolean>;
        resource: PropTypes.Requireable<string>;
        onUnselectItems: PropTypes.Validator<(...args: any[]) => any>;
        selectedIds: PropTypes.Requireable<any[]>;
        showFilter: PropTypes.Requireable<(...args: any[]) => any>;
        total: PropTypes.Requireable<number>;
    };
    defaultProps: {
        breadcrumb: JSX.Element;
        selectedIds: any[];
        onUnselectItems: () => void;
    };
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
