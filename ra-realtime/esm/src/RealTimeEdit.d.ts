import { ReactElement } from 'react';
import { EditProps } from 'react-admin';
import { RecordEvent, SubscriptionCallback } from './types';
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
export declare const RealTimeEdit: ({ children, id, resource, ...props }: RealTimeEditProps & {
    children: ReactElement;
}) => ReactElement;
export interface RealTimeEditProps extends EditProps {
    onEventReceived?: SubscriptionCallback<RecordEvent>;
}
