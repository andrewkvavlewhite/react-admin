import { Identifier } from 'react-admin';
import { SubscriptionCallback, RecordEvent } from '../types';
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
declare const useSubscribeToRecord: (resource: string, id: Identifier, subscriptionCallback: SubscriptionCallback<RecordEvent>) => void;
export default useSubscribeToRecord;
