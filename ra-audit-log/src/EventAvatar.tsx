import * as React from 'react';
import { ReactElement } from 'react';
import { Avatar, AvatarProps } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

/**
 * A Material-UI Avatar with fallback to the Person icon if no url was provided for an image.
 */
export const EventAvatar = (props: EventAvatarProps): ReactElement => {
    const { src, fullName, ...rest } = props;

    return (
        <Avatar src={src} {...rest}>
            {!!src ? null : fullName ? getInitials(fullName) : <PersonIcon />}
        </Avatar>
    );
};

export interface EventAvatarProps extends AvatarProps {
    fullName?: string;
}

export const getInitials = (name: string): string =>
    name
        .match(/(^\w\w?|\b\w)?/g)
        .join('')
        .match(/(^\w|\w$)?/g)
        .join('')
        .toUpperCase();
