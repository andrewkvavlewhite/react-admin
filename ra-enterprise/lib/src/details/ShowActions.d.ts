import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { BreadcrumbProps } from '@react-admin/ra-navigation';
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
export declare const ShowActions: {
    ({ breadcrumb, className, ...rest }: ShowActionsProps): ReactElement;
    propTypes: {
        basePath: PropTypes.Requireable<string>;
        breadcrumb: PropTypes.Requireable<PropTypes.ReactElementLike>;
        className: PropTypes.Requireable<string>;
        hasList: PropTypes.Requireable<boolean>;
    };
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
