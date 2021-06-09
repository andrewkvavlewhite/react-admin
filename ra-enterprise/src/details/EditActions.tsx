import * as React from 'react';
import { ReactElement } from 'react';
import PropTypes from 'prop-types';

import {
    TopToolbar,
    useEditContext,
    useResourceDefinition,
    ShowButton,
} from 'react-admin';
import { Breadcrumb } from '../layout';
import { BreadcrumbProps } from '@react-admin/ra-navigation';

const sanitizeRestProps = ({
    basePath,
    className,
    hasList,
    hasShow,
    hasEdit,
    hasCreate,
    resource,
    ...rest
}: EditActionsProps): any => rest;

/**
 * Action Toolbar for the Edit view
 *
 * Internal component. If you want to add or remove actions for a Edit view,
 * write your own EditActions Component. Then, in the <Create> component,
 * use it in the `actions` prop to pass a custom component.
 *
 * @example
 *     import Button from '@material-ui/core/Button';
 *     import { TopToolbar, Edit, ListButton } from 'react-admin';
 *
 *     const PostEditActions = ({ basePath }) => (
 *         <TopToolbar>
 *             <ListButton basePath={basePath} />
 *             // Add your custom actions here //
 *             <Button color="primary" onClick={customAction}>Custom Action</Button>
 *         </TopToolbar>
 *     );
 *
 *     export const PostEdit = (props) => (
 *         <Edit actions={<PostCreateActions />} {...props}>
 *             ...
 *         </Edit>
 *     );
 */
export const EditActions = ({
    breadcrumb = <Breadcrumb variant="actions" />,
    className,
    ...rest
}: EditActionsProps): ReactElement => {
    const { basePath, record } = useEditContext(rest);
    const { hasShow } = useResourceDefinition(rest);

    return (
        <TopToolbar className={className} {...sanitizeRestProps(rest)}>
            {breadcrumb}
            {hasShow && <ShowButton basePath={basePath} record={record} />}
        </TopToolbar>
    );
};

EditActions.propTypes = {
    basePath: PropTypes.string,
    breadcrumb: PropTypes.element,
    className: PropTypes.string,
    hasList: PropTypes.bool,
};

export interface EditActionsProps {
    basePath?: string;
    breadcrumb?: ReactElement<BreadcrumbProps>;
    className?: string;
    hasCreate?: boolean;
    hasEdit?: boolean;
    hasList?: boolean;
    hasShow?: boolean;
    resource?: string;
}
