import React, { FC, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@material-ui/core';
import ActionDelete from '@material-ui/icons/Delete';
import classnames from 'classnames';
import { useTranslate, Record, RedirectionSideEffect } from 'react-admin';

import useDeleteWithUndoController from './useDeleteWithUndoController';

const DeleteWithConfirmIconButton: FC<DeleteWithConfirmIconButtonProps> = ({
    basePath,
    className,
    label = 'ra.action.delete',
    record,
    resource,
    redirect: redirectTo = 'list',
}) => {
    const { loading, handleDelete } = useDeleteWithUndoController({
        resource,
        record,
        redirect: redirectTo,
        basePath,
    });
    const translate = useTranslate();

    return (
        <Tooltip title={translate(label, { _: label })}>
            <IconButton
                disabled={loading}
                onClick={handleDelete}
                className={classnames('ra-delete-button', className)}
                key="button"
                size="small"
            >
                <ActionDelete color="error" />
            </IconButton>
        </Tooltip>
    );
};

interface Props {
    basePath?: string;
    className?: string;
    confirmTitle?: string;
    confirmContent?: string;
    icon?: ReactElement;
    label?: string;
    onClick?: (e: MouseEvent) => void;
    record?: Record;
    redirect?: RedirectionSideEffect;
    resource?: string;
    invalid?: boolean;
    pristine?: boolean;
    saving?: boolean;
    submitOnEnter?: boolean;
    undoable?: boolean;
}

type DeleteWithConfirmIconButtonProps = Props;

DeleteWithConfirmIconButton.propTypes = {
    basePath: PropTypes.string,
    className: PropTypes.string,
    confirmTitle: PropTypes.string,
    confirmContent: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.any,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func,
    ]),
    resource: PropTypes.string,
    icon: PropTypes.element,
};

export default DeleteWithConfirmIconButton;
