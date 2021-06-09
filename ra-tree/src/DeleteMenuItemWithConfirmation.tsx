import * as React from 'react';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, MenuItemProps } from '@material-ui/core';
import inflection from 'inflection';
import {
    useTranslate,
    Record as RaRecord,
    RedirectionSideEffect,
    Confirm,
} from 'react-admin';

import { useDeleteBranchWithConfirmController } from './controllers';

const DeleteMenuItemWithConfirmation = forwardRef<
    HTMLLIElement,
    DeleteMenuItemWithConfirmation
>(
    (
        {
            basePath,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            classes: classesOverride,
            className,
            confirmTitle = 'ra.message.delete_title',
            confirmContent = 'ra.message.delete_content',
            label = 'ra.action.delete',
            record,
            resource,
            redirect: redirectTo = 'list',
            ...props
        },
        ref
    ) => {
        const {
            open,
            loading,
            handleDialogOpen,
            handleDialogClose,
            handleDelete,
        } = useDeleteBranchWithConfirmController({
            record,
            resource,
            redirect: redirectTo,
            basePath,
        });
        const translate = useTranslate();

        return (
            <>
                <MenuItem
                    className={className}
                    onClick={handleDialogOpen}
                    ref={ref}
                    {...props}
                >
                    {translate(label, { _: label })}
                </MenuItem>
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
                        id: record.id,
                    }}
                    onConfirm={handleDelete}
                    onClose={handleDialogClose}
                />
            </>
        );
    }
);

interface Props {
    basePath?: string;
    classes?: Record<string, unknown>;
    confirmTitle?: string;
    confirmContent?: string;
    label?: string;
    record?: RaRecord;
    redirect?: RedirectionSideEffect;
    resource?: string;
    invalid?: boolean;
    pristine?: boolean;
    saving?: boolean;
    submitOnEnter?: boolean;
    undoable?: boolean;
}

type DeleteMenuItemWithConfirmation = Props &
    Omit<MenuItemProps, 'button' | 'id'>;

DeleteMenuItemWithConfirmation.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.any,
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
};

export default DeleteMenuItemWithConfirmation;
