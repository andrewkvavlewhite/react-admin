import { SubscriptionCallback, RecordListEvent } from '../types';
/**
 * Hook to subscribe to the events for a record list
 * on mount (and unsubscribe on unmount).
 *
 * @example // Auto-Updated PostList
 *
 * const PostList: FC<ListProps> = (props) => {
 *     const notify = useNotify();
 *     const refresh = useRefresh();
 *     useSubscribeToRecordList('posts', () => {
 *         refresh();
 *         notify('list updated server-side');
 *     });
 *     return (
 *         <List {...props}>
 *             <Datagrid>
 *                 <TextField source="title" />
 *             </Datagrid>
 *         </List>;
 *     ):
 * };
 */
declare const useSubscribeToRecordList: (resource: string, subscriptionCallback: SubscriptionCallback<RecordListEvent>) => void;
export default useSubscribeToRecordList;
