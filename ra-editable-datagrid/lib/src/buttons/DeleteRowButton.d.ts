import { FC } from 'react';
import { Record, Identifier } from 'react-admin';
declare const DeleteRowButton: FC<Props>;
export interface Props {
    resource?: string;
    record?: Record;
    id?: Identifier;
    undoable?: boolean;
}
export default DeleteRowButton;
