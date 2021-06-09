import * as React from 'react';
import { ReactElement } from 'react';
import PropTypes from 'prop-types';

import {
    TopToolbar,
    ListButton,
    useCreateContext,
    useResourceDefinition,
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
}: CreateActionsProps): any => rest;

/**
 * Action Toolbar for the Create view
 *
 * Internal component. If you want to add or remove actions for a Create view,
 * write your own CreateActions Component. Then, in the <Create> component,
 * use it in the `actions` prop to pass a custom component.
 *
 * @example
 *     import Button from '@material-ui/core/Button';
 *     import { TopToolbar, Create, ListButton } from 'react-admin';
 *
 *     const PostCreateActions = ({ basePath }) => (
 *         <TopToolbar>
 *             <ListButton basePath={basePath} />
 *             // Add your custom actions here //
 *             <Button color="primary" onClick={customAction}>Custom Action</Button>
 *         </TopToolbar>
 *     );
 *
 *     export const PostCreate = (props) => (
 *         <Create actions={<PostCreateActions />} {...props}>
 *             ...
 *         </Create>
 *     );
 */
export const CreateActions = ({
    breadcrumb = <Breadcrumb variant="actions" />,
    className,
    ...rest
}: CreateActionsProps): ReactElement => {
    const { basePath } = useCreateContext(rest);
    const { hasList } = useResourceDefinition(rest);
    return (
        <TopToolbar className={className} {...sanitizeRestProps(rest)}>
            {breadcrumb}
            {hasList && <ListButton basePath={basePath} />}
        </TopToolbar>
    );
};

CreateActions.propTypes = {
    basePath: PropTypes.string,
    breadcrumb: PropTypes.element,
    className: PropTypes.string,
    hasList: PropTypes.bool,
};

export interface CreateActionsProps {
    basePath?: string;
    breadcrumb?: ReactElement<BreadcrumbProps>;
    className?: string;
    hasCreate?: boolean;
    hasEdit?: boolean;
    hasList?: boolean;
    hasShow?: boolean;
    resource?: string;
}
