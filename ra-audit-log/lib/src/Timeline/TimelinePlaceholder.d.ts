import { ReactElement } from 'react';
import { ClassesOverride } from 'react-admin';
export declare const TimelinePlaceholder: (props: TimelinePlaceholderProps) => ReactElement;
export interface TimelinePlaceholderProps {
    className?: string;
    classes?: ClassesOverride<typeof useStyles>;
}
declare const useStyles: (props?: any) => Record<"root", string>;
export {};
