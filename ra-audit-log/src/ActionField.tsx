import * as React from 'react';
import { ReactElement } from 'react';
import { Typography, TypographyProps } from '@material-ui/core';
import {
    FieldProps,
    sanitizeFieldRestProps,
    useRecordContext,
} from 'react-admin';
import { EventRecord } from './types';
import { useEventLabel } from './useEventLabel';

/**
 * A react-admin field which displays a label specific to an event action.
 */
export const ActionField = (
    props: FieldProps<EventRecord> & TypographyProps
): ReactElement => {
    const record = useRecordContext<EventRecord>(props);
    const actionLabel = useEventLabel({ record, variant: 'inline' });

    if (!record) {
        return null;
    }

    return (
        <Typography
            component="span"
            variant="body2"
            {...sanitizeFieldRestProps(props)}
        >
            {actionLabel}
        </Typography>
    );
};

ActionField.defaultProps = {
    addLabel: true,
};
