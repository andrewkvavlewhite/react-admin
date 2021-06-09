import * as React from 'react';
import { ReactElement } from 'react';
import PropTypes from 'prop-types';

import {
    TopToolbar,
    useShowContext,
    useResourceDefinition,
    EditButton,
} from 'react-admin';
import { Breadcrumb } from '../layout';
import { BreadcrumbProps } from '@react-admin/ra-navigation';

const sanitizeRestProps = ({
    basePath,
    className,
    hasCreate,
    hasEdit,
    hasList,
    hasShow,
    resource,
    ...rest
}: ShowActionsProps): any => rest;

/**
 * Action Toolbar for the Show view
 *
 * Internal component. If you want to add or remove actions for a Show view,
 * write your own ShowActions Component. Then, in the <Create> component,
 * use it in the `actions` prop to pass a custom component.
 *
 * @example
 *     import Button from '@material-ui/core/Button';
 *     import { TopToolbar, Show, ListButton } from 'react-admin';
 *
 *     const PostShowActions = ({ basePath }) => (
 *         <TopToolbar>
 *             <ListButton basePath={basePath} />
 *             // Add your custom actions here //
 *             <Button color="primary" onClick={customAction}>Custom Action</Button>
 *         </TopToolbar>
 *     );
 *
 *     export const PostShow = (props) => (
 *         <Show actions={<PostCreateActions />} {...props}>
 *             ...
 *         </Show>
 *     );
 */
export const ShowActions = ({
    breadcrumb = <Breadcrumb variant="actions" />,
    className,
    ...rest
}: ShowActionsProps): ReactElement => {
    const { basePath, record } = useShowContext(rest);
    const { hasEdit } = useResourceDefinition(rest);

    return (
        <TopToolbar className={className} {...sanitizeRestProps(rest)}>
            {breadcrumb}
            {hasEdit && <EditButton basePath={basePath} record={record} />}
        </TopToolbar>
    );
};

ShowActions.propTypes = {
    basePath: PropTypes.string,
    breadcrumb: PropTypes.element,
    className: PropTypes.string,
    hasList: PropTypes.bool,
};

export interface ShowActionsProps {
    basePath?: string;
    breadcrumb?: ReactElement<BreadcrumbProps>;
    className?: string;
    hasCreate?: boolean;
    hasEdit?: boolean;
    hasList?: boolean;
    hasShow?: boolean;
    resource?: string;
}
