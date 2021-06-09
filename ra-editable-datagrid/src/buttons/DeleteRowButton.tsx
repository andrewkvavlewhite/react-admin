import React, { FC } from 'react';
import { Record, Identifier } from 'react-admin';
import DeleteWithConfirmIconButton from './DeleteWithConfirmIconButton';
import DeleteWithUndoIconButton from './DeleteWithUndoIconButton';

const DeleteRowButton: FC<Props> = ({ undoable, ...rest }) =>
    undoable ? (
        <DeleteWithUndoIconButton {...rest} />
    ) : (
        <DeleteWithConfirmIconButton {...rest} />
    );

export interface Props {
    resource?: string;
    record?: Record;
    id?: Identifier;
    undoable?: boolean;
}

export default DeleteRowButton;
