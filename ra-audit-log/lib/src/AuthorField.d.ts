import { ReactElement } from 'react';
import { ClassesOverride, FieldProps, LinkToType } from 'react-admin';
import { EventRecord } from './types';
/**
 * A react-admin field which displays the author of an event with its avatar if available.
 */
export declare const AuthorField: {
    (props: AuthorFieldProps): ReactElement;
    defaultProps: {
        addLabel: boolean;
    };
};
declare const useStyles: (props?: any) => Record<"small" | "root", string>;
interface AuthorFieldProps extends FieldProps<EventRecord> {
    authorResource?: string;
    className?: string;
    classes?: ClassesOverride<typeof useStyles>;
    link?: LinkToType;
}
export {};
