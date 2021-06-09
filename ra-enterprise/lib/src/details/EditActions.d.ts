import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { BreadcrumbProps } from '@react-admin/ra-navigation';
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
export declare const EditActions: {
    ({ breadcrumb, className, ...rest }: EditActionsProps): ReactElement;
    propTypes: {
        basePath: PropTypes.Requireable<string>;
        breadcrumb: PropTypes.Requireable<PropTypes.ReactElementLike>;
        className: PropTypes.Requireable<string>;
        hasList: PropTypes.Requireable<boolean>;
    };
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
