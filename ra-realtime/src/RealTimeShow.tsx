import * as React from 'react';
import { ReactElement, useState } from 'react';
import {
    Show,
    ShowProps,
    useNotify,
    useRefresh,
    useTranslate,
} from 'react-admin';
import { Collapse } from '@material-ui/core';

import { useSubscribeToRecord } from './dataProvider';
import { EventType, RecordEvent, SubscriptionCallback } from './types';
import Warning from './Warning';

/**
 * <Show> equivalent, but with real-time updates
 *
 * Shows a event and refreshes the page when the record is modified by
 * another user. Also, it displays a warning when the record is deleted by
 * another user.
 *
 * @example
 *
 * import { RealTimeShow } from '@react-admin/ra-realtime'
 *
 * const PostShow = props => (
 *     <RealTimeShow {...props}>
 *         <SimpleShowLayout>
 *             <TextField source="title" />
 *         </SimpleShowLayout>
 *     </RealTimeShow>
 * );
 *
 * @example <caption>With custom side effects on new event</caption>
 *
 * import { SimpleShowLayout, TextField, useRefresh } from 'react-admin';
 * import { RealTimeShow } from '@react-admin/ra-realtime';
 *
 * const PostShow = props => {
 *    const refresh = useRefresh();
 *    const handleEventReceived = (event) => {
 *        refresh();
 *    };
 *
 *    return (
 *        <RealTimeShow {...props} onEventReceived={handleEventReceived}>
 *            <SimpleShowLayout>
 *                <TextField source="title" />
 *            </SimpleShowLayout>
 *        </RealTimeShow>
 *    );
 * };
 */
export const RealTimeShow = ({
    children,
    id,
    resource,
    ...props
}: RealTimeShowProps & { children: ReactElement }): ReactElement => {
    const notify = useNotify();
    const refresh = useRefresh();
    const translate = useTranslate();
    const [deleted, setDeleted] = useState(false);

    const defaultHandleEventReceived: SubscriptionCallback<RecordEvent> = event => {
        if (event.type === EventType.Updated) {
            refresh();
            notify('ra-realtime.notification.record.updated');
        } else if (event.type === EventType.Deleted) {
            setDeleted(true);
        }
    };

    const { onEventReceived = defaultHandleEventReceived, ...rest } = props;

    useSubscribeToRecord(resource, id, onEventReceived);
    return (
        <>
            <Collapse in={deleted}>
                {deleted && (
                    <Warning
                        message={translate(
                            'ra-realtime.notification.record.deleted'
                        )}
                    />
                )}
            </Collapse>
            <Show resource={resource} id={id} {...rest}>
                {children}
            </Show>
        </>
    );
};

export interface RealTimeShowProps extends ShowProps {
    onEventReceived?: SubscriptionCallback<RecordEvent>;
}
