import { FC } from 'react';
import { ButtonProps, Identifier } from 'react-admin';
export declare type Lock = {
    resource: string;
    recordId: Identifier;
    identity?: string;
};
declare type UnlockButtonProps = {
    variant?: string;
    lock: Lock;
} & ButtonProps;
declare const UnlockButton: FC<UnlockButtonProps>;
export default UnlockButton;
