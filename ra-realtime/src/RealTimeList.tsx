import * as React from 'react';
import { ReactElement } from 'react';
import { List, ListProps, useRefresh } from 'react-admin';

import { useSubscribeToRecordList } from './dataProvider';
import { RecordListEvent, SubscriptionCallback } from './types';

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
    const refresh = useRefresh();

    const defaultHandleEventReceived: SubscriptionCallback<RecordListEvent> = (): void => {
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
