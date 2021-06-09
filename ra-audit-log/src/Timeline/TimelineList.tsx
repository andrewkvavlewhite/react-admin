import * as React from 'react';
import { ReactElement } from 'react';
import { useListContext } from 'react-admin';
import { EventRecord } from '../types';
import { Timeline, TimelineProps } from './Timeline';

/**
 * A wrapper around the Timeline component which makes it usable directly inside a List.
 * @see Timeline
 */
export const TimelineList = (
    props: Omit<TimelineProps, 'records' | 'loaded'>
): ReactElement => {
    const { data, ids, loaded } = useListContext<EventRecord>();

    const records = ids
        .map(id => data[id])
        .filter(record => record != undefined);

    return <Timeline records={records} loaded={loaded} {...props} />;
};
