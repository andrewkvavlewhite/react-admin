import React, { Fragment, FC, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@material-ui/core';
import ActionDelete from '@material-ui/icons/Delete';
import classnames from 'classnames';
import inflection from 'inflection';
import {
    Confirm,
    useTranslate,
    Record,
    RedirectionSideEffect,
} from 'react-admin';

import useDeleteWithConfirmController from './useDeleteWithConfirmController';

const DeleteWithConfirmIconButton: FC<DeleteWithConfirmIconButtonProps> = ({
    basePath,
    className,
    confirmTitle = 'ra.message.delete_title',
    confirmContent = 'ra.message.delete_content',
    label = 'ra.action.delete',
    record,
    resource,
    redirect: redirectTo = 'list',
}) => {
    const {
        open,
        loading,
        handleClick,
        handleDialogClose,
        handleDelete,
    } = useDeleteWithConfirmController({
        resource,
        record,
        redirect: redirectTo,
        basePath,
    });
    const translate = useTranslate();

    return (
        <Fragment>
            <Tooltip title={translate(label, { _: label })}>
                <IconButton
                    onClick={handleClick}
                    className={classnames('ra-delete-button', className)}
                    key="button"
                    size="small"
                >
                    <ActionDelete color="error" />
                </IconButton>
            </Tooltip>
            <Confirm
                isOpen={open}
                loading={loading}
                title={confirmTitle}
                content={confirmContent}
                translateOptions={{
                    name: inflection.humanize(
                        translate(`resources.${resource}.name`, {
                            smart_count: 1,
                            _: inflection.singularize(resource),
                        }),
                        true
                    ),
                    id: record ? record.id : undefined,
                }}
                onConfirm={handleDelete}
                onClose={handleDialogClose}
            />
        </Fragment>
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
