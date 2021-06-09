import { Identifier } from 'react-admin';

import { SubscriptionCallback, RecordEvent } from '../types';
import useSubscribe from './useSubscribe';

/**
 * Hook to subscribe to the events for a record
 * on mount (and unsubscribe on unmount).
 *
 * @example // Auto-Updated PostShow
 *
 * const PostShow: FC<ShowProps> = (props) => {
 *     const notify = useNotify();
 *     const refresh = useRefresh();
 *     useSubscribeToRecord('posts', props.id, () => {
 *         refresh();
 *         notify('Record updated server-side');
 *     });
 *     return <Show {...props}/>;
 * };
 */
const useSubscribeToRecord = (
    resource: string,
    id: Identifier,
    subscriptionCallback: SubscriptionCallback<RecordEvent>
): void => {
    const topic = `resource/${resource}/${id}`;
    useSubscribe(topic, subscriptionCallback);
};

export default useSubscribeToRecord;
