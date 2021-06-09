import { ReactElement } from 'react';
import { ShowProps } from 'react-admin';
import { RecordEvent, SubscriptionCallback } from './types';
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
export declare const RealTimeShow: ({ children, id, resource, ...props }: RealTimeShowProps & {
    children: ReactElement;
}) => ReactElement;
export interface RealTimeShowProps extends ShowProps {
    onEventReceived?: SubscriptionCallback<RecordEvent>;
}
