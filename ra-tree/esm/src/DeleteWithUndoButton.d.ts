import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { DeleteWithUndoButtonProps } from 'react-admin';
declare const DeleteWithUndoButton: {
    (props: DeleteWithUndoButtonProps): ReactElement;
    propTypes: {
        basePath: PropTypes.Requireable<string>;
        classes: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        label: PropTypes.Requireable<string>;
        record: PropTypes.Requireable<any>;
        redirect: PropTypes.Requireable<string | boolean | ((...args: any[]) => any)>;
        resource: PropTypes.Requireable<string>;
        icon: PropTypes.Requireable<PropTypes.ReactElementLike>;
    };
};
export default DeleteWithUndoButton;
