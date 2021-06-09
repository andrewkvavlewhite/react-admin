import * as React from 'react';
import { ReactElement } from 'react';
import { ListProps, useNotify, useRefresh, useTranslate } from 'react-admin';
import inflection from 'inflection';
import get from 'lodash/get';

import {
    useSubscribeToRecordList,
    RecordListEvent,
    SubscriptionCallback,
} from '@react-admin/ra-realtime';
import { List } from './List';

/**
 * <List> equivalent, but with real-time updates.
 *
 * Shows a event and refreshes the page when a record is created,
 * updated, or deleted.
 *
 * @example
 *
 * import { RealTimeList } from '@react-admin/ra-realtime';
 *
 * const PostList = props => (
 *     <RealTimeList {...props}>
 *         <Datagrid>
 *             <TextField source="title" />
 *         </Datagrid>
 *     </RealTimeList>
 * );
 *
 * @example <caption>With custom side effect on new event</caption>
 *
 * import { useRefresh } from 'react-admin';
 * import { RealTimeList } from '@react-admin/ra-realtime';
 *
 * const PostList = props => {
 *     const refresh = useRefresh();
 *
 *     const handleEventReceived = (event) => {
 *         refresh();
 *     };
 *
 *     return (
 *         <RealTimeList {...props} onEventReceived={handleListEventReceived}>
 *             <Datagrid>
 *                 <TextField source="title" />
 *             </Datagrid>
 *         </RealTimeList>
 *     );
 * };
 */
export const RealTimeList = ({
    children,
    resource,
    ...props
}: RealTimeListProps & { children: ReactElement }): ReactElement => {
    const notify = useNotify();
    const refresh = useRefresh();
    const translate = useTranslate();

    const defaultHandleEventReceived: SubscriptionCallback<RecordListEvent> = (
        event
    ): void => {
        const count = get(event, 'payload.ids.length', 1);

        notify('ra-realtime.notification.list.refreshed', 'info', {
            smart_count: count,
            name: inflection.humanize(
                translate(`resources.${resource}.name`, {
                    smart_count: 1,
                    _: inflection.singularize(resource),
                }),
                true
            ),
            type: translate(`ra-realtime.event_type.${event.type}`, {
                smart_count: count,
            }),
        });
        refresh();
    };

    const { onEventReceived = defaultHandleEventReceived, ...rest } = props;

    useSubscribeToRecordList(resource, onEventReceived);
    return (
        <List resource={resource} {...rest}>
            {children}
        </List>
    );
};

export interface RealTimeListProps extends ListProps {
    onEventReceived?: SubscriptionCallback<RecordListEvent>;
}
