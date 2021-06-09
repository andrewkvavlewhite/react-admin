import { ReactElement } from 'react';
import { AvatarProps } from '@material-ui/core';
/**
 * A Material-UI Avatar with fallback to the Person icon if no url was provided for an image.
 */
export declare const EventAvatar: (props: EventAvatarProps) => ReactElement;
export interface EventAvatarProps extends AvatarProps {
    fullName?: string;
}
export declare const getInitials: (name: string) => string;
