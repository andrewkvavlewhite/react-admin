import { ReactElement } from 'react';
import { ListItemProps } from '@material-ui/core';
import { ClassesOverride } from 'react-admin';
import { EventRecord } from '../types';
import { LinkType } from '../useGetActionLink';
/**
 * Default component to display an audit logs.
 * @see Timeline
 */
export declare const TimelineItem: (props: TimelineItemProps) => ReactElement;
declare const useStyles: (props?: any) => Record<"root" | "action" | "content" | "author", string>;
export interface TimelineItemProps extends ListItemProps {
    className?: string;
    classes?: ClassesOverride<typeof useStyles>;
    record?: EventRecord;
    link?: LinkType;
}
export {};
