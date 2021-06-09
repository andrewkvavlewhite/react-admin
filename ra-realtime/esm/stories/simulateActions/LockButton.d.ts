import { FC } from 'react';
import { ButtonProps, Identifier } from 'react-admin';
export declare type Lock = {
    resource: string;
    recordId: Identifier;
    identity?: string;
};
declare type LockButtonProps = {
    variant?: string;
    lock: Lock;
} & ButtonProps;
declare const LockButton: FC<LockButtonProps>;
export default LockButton;
