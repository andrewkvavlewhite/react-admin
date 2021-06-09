import { ReactElement } from 'react';
import { FieldProps } from 'react-admin';
/**
 * A react-admin field which displays the avatar of an event author.
 */
export declare const AvatarField: (props: ResourceFieldProps) => ReactElement;
export interface ResourceFieldProps extends Omit<FieldProps, 'source'> {
    source?: string;
    fullNameSource?: string;
}
