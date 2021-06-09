import useSubscribe from './useSubscribe';
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
var useSubscribeToRecordList = function (resource, subscriptionCallback) {
    var topic = "resource/" + resource;
    useSubscribe(topic, subscriptionCallback);
};
export default useSubscribeToRecordList;
