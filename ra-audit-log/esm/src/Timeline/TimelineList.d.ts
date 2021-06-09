import { ReactElement } from 'react';
import { TimelineProps } from './Timeline';
/**
 * A wrapper around the Timeline component which makes it usable directly inside a List.
 * @see Timeline
 */
export declare const TimelineList: (props: Omit<TimelineProps, 'records' | 'loaded'>) => ReactElement;
