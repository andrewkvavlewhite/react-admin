import * as React from 'react';
import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { ToolbarProps } from '@material-ui/core';
import { Exporter, ClassesOverride } from 'react-admin';
import { BreadcrumbProps } from '@react-admin/ra-navigation';
export interface ListToolbarProps extends Omit<ToolbarProps, 'classes' | 'onSelect'> {
    actions?: ReactElement | boolean;
    breadcrumb?: ReactElement<BreadcrumbProps>;
    classes?: ClassesOverride<typeof useStyles>;
    filters?: ReactElement;
    exporter?: Exporter | boolean;
}
declare const useStyles: (props?: any) => Record<"toolbar" | "actions", string>;
declare const _default: React.MemoExoticComponent<{
    (props: ListToolbarProps): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
    propTypes: {
        breadcrumb: PropTypes.Requireable<PropTypes.ReactElementLike>;
        classes: PropTypes.Requireable<object>;
        filters: PropTypes.Requireable<PropTypes.ReactElementLike>;
        actions: PropTypes.Requireable<boolean | PropTypes.ReactElementLike>;
        exporter: PropTypes.Requireable<boolean | ((...args: any[]) => any)>;
    };
}>;
export default _default;
