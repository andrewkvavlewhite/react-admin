import * as React from 'react';
import { ReactElement, useState } from 'react';

import { Edit, EditProps, useTranslate } from 'react-admin';
import { Collapse } from '@material-ui/core';

import { useSubscribeToRecord } from './dataProvider';
import { EventType, RecordEvent, SubscriptionCallback } from './types';
import Warning from './Warning';

/**
 * <Edit> equivalent, but with real-time updates
 *
 * Displays a warning when editing a record that was modified by another user,
 * and offers to refresh the page. Also, displays a warning when editing a
 * record that was deleted by another user.
 *
 * @example
 *
 * import { RealTimeEdit } from '@react-admin/ra-realtime'
 *
 * const PostEdit = props => (
 *     <RealTimeEdit {...props}>
 *         <SimpleForm>
 *             <TextInput source="title" />
 *         </SimpleForm>
 *     </RealTimeEdit>
 * );
 *
 * @example
 * import React from 'react';
 * import { SimpleForm, TextInput, useRefresh } from 'react-admin';
 * import { RealTimeEdit } from '@react-admin/ra-realtime';
 *
 * const PostEdit = props => {
 *     const refresh = useRefresh();
 *     const handleEventReceived = (event) => {
 *         refresh();
 *     };
 *
 *     return (
 *         <RealTimeEdit {...props} onEventReceived={handleEventReceived}>
 *             <SimpleForm>
 *                 <TextInput source="title" />
 *             </SimpleForm>
 *         </RealTimeEdit>
 *     );
 * };
 */
export const RealTimeEdit = ({
    children,
    id,
    resource,
    ...props
}: RealTimeEditProps & { children: ReactElement }): ReactElement => {
    const translate = useTranslate();
    const [deleted, setDeleted] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [updatedDisplayed, setUpdatedDisplayed] = useState(false);

    const defaultHandleEventReceived: SubscriptionCallback<RecordEvent> = event => {
        if (event.type === EventType.Updated) {
            setUpdated(true);
            setUpdatedDisplayed(true);
        } else if (event.type === EventType.Deleted) {
            setDeleted(true);
            setUpdated(false);
            setUpdatedDisplayed(true);
        }
    };
    const { onEventReceived = defaultHandleEventReceived, ...rest } = props;

    useSubscribeToRecord(resource, id, onEventReceived);

    return (
        <>
            <Collapse in={deleted || updatedDisplayed}>
                {deleted && (
                    <Warning
                        message={translate(
                            'ra-realtime.notification.record.deleted'
                        )}
                    />
                )}
                {updated && (
                    <Warning
                        message={translate(
                            'ra-realtime.notification.record.updated'
                        )}
                        refresh
                        onRefresh={(): void => {
                            // we want the collapse to happen after the refresh
                            // but if we setUpdated(false) right away, the content is empty
                            // so we delay the setUpdated(false)
                            setUpdatedDisplayed(false);
                            setTimeout(() => {
                                setUpdated(false);
                            }, 500);
                        }}
                    />
                )}
            </Collapse>
            <Edit resource={resource} id={id} {...rest}>
                {children}
            </Edit>
        </>
    );
};

export interface RealTimeEditProps extends EditProps {
    onEventReceived?: SubscriptionCallback<RecordEvent>;
}
