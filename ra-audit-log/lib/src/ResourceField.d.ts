import { ReactElement } from 'react';
import { FieldProps } from 'react-admin';
import { TypographyProps } from '@material-ui/core';
import { EventRecord } from './types';
/**
 * A react-admin field which displays a the name of the resource targeted by an event.
 */
export declare const ResourceField: {
    (props: ResourceFieldProps & TypographyProps): ReactElement;
    defaultProps: {
        addLabel: boolean;
    };
};
export interface ResourceFieldProps extends Omit<FieldProps<EventRecord>, 'source'> {
    source?: string;
}
