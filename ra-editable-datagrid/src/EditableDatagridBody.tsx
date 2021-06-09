import React, { ReactNode, ReactElement, FC } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TableBody } from '@material-ui/core';
import { Identifier, Record, useDatagridStyles } from 'react-admin';

import EditableDatagridRow from './EditableDatagridRow';
import EditableDatagridCreateForm from './EditableDatagridCreateForm';

const EditableDatagridBody: FC<EditableDatagridProps> = ({
    basePath,
    children,
    classes,
    className,
    data,
    expand,
    hasBulkActions,
    hover,
    ids,
    onToggleItem,
    resource,
    rowClick,
    rowStyle,
    selectedIds,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    version,
    isRowSelectable,
    editForm,
    createForm,
    undoable,
    hasStandaloneCreateForm = false,
    isStandaloneCreateFormVisible,
    closeStandaloneCreateForm,
    ...rest
}) => (
    <TableBody className={classnames('datagrid-body', className)} {...rest}>
        {createForm && (
            <EditableDatagridCreateForm
                basePath={basePath}
                classes={classes}
                closeStandaloneCreateForm={closeStandaloneCreateForm}
                createForm={createForm}
                expand={expand}
                hasBulkActions={hasBulkActions}
                hasStandaloneCreateForm={hasStandaloneCreateForm}
                isStandaloneCreateFormVisible={isStandaloneCreateFormVisible}
                resource={resource}
            />
        )}
        {ids.map((id, rowIndex) => (
            <EditableDatagridRow
                basePath={basePath}
                classes={classes}
                className={classnames(classes.row, {
                    [classes.rowEven]: rowIndex % 2 === 0,
                    [classes.rowOdd]: rowIndex % 2 !== 0,
                    [classes.clickableRow]: rowClick,
                })}
                expand={expand}
                form={editForm}
                hasBulkActions={hasBulkActions}
                hover={hover}
                id={id}
                key={id}
                onToggleItem={onToggleItem}
                record={data[id]}
                resource={resource}
                rowClick={rowClick}
                selectable={!isRowSelectable || isRowSelectable(data[id])}
                selected={selectedIds.includes(id)}
                style={rowStyle ? rowStyle(data[id], rowIndex) : null}
                undoable={undoable}
            >
                {children}
            </EditableDatagridRow>
        ))}
    </TableBody>
);

export interface EditableDatagridProps {
    basePath?: string;
    children?: ReactNode;
    className?: string;
    classes?: ReturnType<typeof useDatagridStyles>;
    data?: any;
    expand?: ReactNode;
    hasBulkActions?: boolean;
    hover?: boolean;
    ids?: Identifier[];
    onToggleItem?: () => void;
    resource?: string;
    rowClick?: string;
    rowStyle?: (record: Record, index: number) => void;
    selectedIds?: Identifier[];
    version?: number;
    isRowSelectable?: (record: Record) => boolean;
    editForm?: ReactElement;
    createForm?: ReactElement;
    undoable?: boolean;
    hasStandaloneCreateForm?: boolean;
    isStandaloneCreateFormVisible: boolean;
    closeStandaloneCreateForm: () => void;
}

EditableDatagridBody.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.any,
    className: PropTypes.string,
    children: PropTypes.node,
    data: PropTypes.object.isRequired,
    expand: PropTypes.oneOfType([PropTypes.element, PropTypes.elementType]),
    hasBulkActions: PropTypes.bool.isRequired,
    hover: PropTypes.bool,
    ids: PropTypes.arrayOf(PropTypes.any).isRequired,
    onToggleItem: PropTypes.func,
    resource: PropTypes.string,
    rowClick: PropTypes.string,
    rowStyle: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any),
    isRowSelectable: PropTypes.func,
    version: PropTypes.number,
};

EditableDatagridBody.defaultProps = {
    data: {},
    hasBulkActions: false,
    ids: [],
};

// trick material-ui Table into thinking this is one of the child type it supports
// @ts-ignore
EditableDatagridBody.muiName = 'TableBody';

export default EditableDatagridBody;
