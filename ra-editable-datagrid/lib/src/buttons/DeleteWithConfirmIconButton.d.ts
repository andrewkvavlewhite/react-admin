import { FC, ReactElement } from 'react';
import { Record, RedirectionSideEffect } from 'react-admin';
declare const DeleteWithConfirmIconButton: FC<DeleteWithConfirmIconButtonProps>;
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
declare type DeleteWithConfirmIconButtonProps = Props;
export default DeleteWithConfirmIconButton;
