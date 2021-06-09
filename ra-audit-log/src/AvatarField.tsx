import * as React from 'react';
import { ReactElement } from 'react';
import { FieldProps, useRecordContext } from 'react-admin';
import get from 'lodash/get';
import { EventAvatar } from './EventAvatar';

/**
 * A react-admin field which displays the avatar of an event author.
 */
export const AvatarField = (props: ResourceFieldProps): ReactElement => {
    const record = useRecordContext(props);
    const { source = 'avatar', fullNameSource = 'fullName', ...rest } = props;
    const src = get(record, source);
    const fullName = get(record, fullNameSource);

    if (!record) {
        return null;
    }

    return (
        <EventAvatar
            src={src}
            fullName={fullName}
            role="presentation"
            {...rest}
        />
    );
};

export interface ResourceFieldProps extends Omit<FieldProps, 'source'> {
    source?: string;
    fullNameSource?: string;
}
