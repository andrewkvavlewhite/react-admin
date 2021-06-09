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
var useSubscribeToRecord = function (resource, id, subscriptionCallback) {
    var topic = "resource/" + resource + "/" + id;
    useSubscribe(topic, subscriptionCallback);
};
export default useSubscribeToRecord;
