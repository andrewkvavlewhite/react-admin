import * as React from 'react';
import { ReactElement } from 'react';
import {
    FieldProps,
    sanitizeFieldRestProps,
    useRecordContext,
} from 'react-admin';
import get from 'lodash/get';
import { Typography, TypographyProps } from '@material-ui/core';
import { EventRecord } from './types';
import { useGetResourceLabel } from './useGetResourceLabel';

/**
 * A react-admin field which displays a the name of the resource targeted by an event.
 */
export const ResourceField = (
    props: ResourceFieldProps & TypographyProps
): ReactElement => {
    const record = useRecordContext<EventRecord>(props);
    const getResourceLabel = useGetResourceLabel();

    if (!record) {
        return null;
    }
    const { source = 'resource' } = props;
    const resource = get(record, source);

    return (
        <Typography
            component="span"
            variant="body2"
            {...sanitizeFieldRestProps(props)}
        >
            {getResourceLabel(resource, 1)}
        </Typography>
    );
};

ResourceField.defaultProps = {
    addLabel: true,
};

export interface ResourceFieldProps
    extends Omit<FieldProps<EventRecord>, 'source'> {
    source?: string;
}
