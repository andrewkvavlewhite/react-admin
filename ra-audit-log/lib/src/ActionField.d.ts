import { ReactElement } from 'react';
import { TypographyProps } from '@material-ui/core';
import { FieldProps } from 'react-admin';
import { EventRecord } from './types';
/**
 * A react-admin field which displays a label specific to an event action.
 */
export declare const ActionField: {
    (props: FieldProps<EventRecord> & TypographyProps): ReactElement;
    defaultProps: {
        addLabel: boolean;
    };
};
