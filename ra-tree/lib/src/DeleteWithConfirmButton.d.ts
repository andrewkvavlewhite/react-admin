import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { DeleteWithConfirmButtonProps } from 'react-admin';
declare const DeleteWithConfirmButton: {
    (props: DeleteWithConfirmButtonProps): ReactElement;
    propTypes: {
        basePath: PropTypes.Requireable<string>;
        classes: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        confirmTitle: PropTypes.Requireable<string>;
        confirmContent: PropTypes.Requireable<string>;
        label: PropTypes.Requireable<string>;
        record: PropTypes.Requireable<any>;
        redirect: PropTypes.Requireable<string | boolean | ((...args: any[]) => any)>;
        resource: PropTypes.Requireable<string>;
        icon: PropTypes.Requireable<PropTypes.ReactElementLike>;
    };
};
export default DeleteWithConfirmButton;
