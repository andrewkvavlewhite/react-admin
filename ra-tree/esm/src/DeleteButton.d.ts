import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { DeleteButtonProps } from 'react-admin';
/**
 * Button used to delete a single branch. Added by default by the <Toolbar> of edit and show views.
 *
 * @typedef {Object} Props The props you can use (other props are injected if you used it in the <Toolbar>)
 * @param {Prop} props
 * @prop {boolean} undoable Confirm the deletion using an undo button in a notification or a confirmation dialog. Defaults to 'false'.
 * @prop {string} className
 * @prop {string} label Button label. Defaults to 'ra.action.delete, translated.
 * @prop {boolean} disabled Disable the button.
 * @prop {string} variant Material-ui variant for the button. Defaults to 'contained'.
 * @prop {ReactElement} icon Override the icon. Defaults to the Delete icon from material-ui.
 *
 * @example Usage in the <TopToolbar> of an <Edit> form
 *
 * import * as React from 'react';
 * import { Edit } from 'react-admin';
 * import { DeleteButton, TopToolbar } from '@react-admin/ra-tree';
 *
 * const EditActions = props => {
 *     const { basePath, data, resource } = props;
 *     return (
 *         <TopToolbar>
 *             <DeleteButton
 *                 basePath={basePath}
 *                 record={data}
 *                 resource={resource}
 *                 undoable={false} // Renders the <DeleteWithConfirmButton>
 *             />
 *         </TopToolbar>
 *     );
 * };
 *
 * const Edit = props => {
 *     return <Edit actions={<EditActions />} {...props} />;
 * };
 */
declare const DeleteButton: {
    ({ undoable, record, ...props }: DeleteButtonProps): ReactElement;
    propTypes: {
        basePath: PropTypes.Requireable<string>;
        label: PropTypes.Requireable<string>;
        record: PropTypes.Requireable<any>;
        redirect: PropTypes.Requireable<string | boolean | ((...args: any[]) => any)>;
        resource: PropTypes.Requireable<string>;
        undoable: PropTypes.Requireable<boolean>;
        icon: PropTypes.Requireable<PropTypes.ReactElementLike>;
    };
    defaultProps: {
        undoable: boolean;
    };
};
export default DeleteButton;
