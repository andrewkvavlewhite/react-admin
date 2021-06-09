import { ReactElement } from 'react';
import { ClassesOverride } from 'react-admin';
export declare const TimelineSkeleton: (props: TimelineSkeletonProps) => ReactElement;
declare const useStyles: (props?: any) => Record<"root" | "card" | "subTitle", string>;
export interface TimelineSkeletonProps {
    classes?: ClassesOverride<typeof useStyles>;
    length?: number;
}
export {};
