import * as React from 'react';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, MenuItemProps } from '@material-ui/core';
import {
    useTranslate,
    Record as RaRecord,
    RedirectionSideEffect,
} from 'react-admin';
import { useDeleteBranchWithUndoController } from './controllers';

const DeleteMenuItemWithUndo = forwardRef<
    HTMLLIElement,
    DeleteMenuItemWithUndoProps
>(
    (
        {
            basePath,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            classes: classesOverride,
            className,
            label = 'ra.action.delete',
            record,
            resource,
            redirect: redirectTo = 'list',
            ...props
        },
        ref
    ) => {
        const { loading, handleDelete } = useDeleteBranchWithUndoController({
            record,
            resource,
            redirect: redirectTo,
            basePath,
        });
        const translate = useTranslate();

        return (
            <MenuItem
                className={className}
                disabled={loading}
                onClick={handleDelete}
                ref={ref}
                {...props}
            >
                {translate(label, { _: label })}
            </MenuItem>
        );
    }
);

interface Props {
    basePath?: string;
    classes?: Record<string, unknown>;
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

type DeleteMenuItemWithUndoProps = Props & Omit<MenuItemProps, 'button' | 'id'>;

DeleteMenuItemWithUndo.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.any,
    className: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.any,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func,
    ]),
    resource: PropTypes.string,
};

export default DeleteMenuItemWithUndo;
