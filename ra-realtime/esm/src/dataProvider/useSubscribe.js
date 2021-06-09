import { useEffect } from 'react';
import { useDataProvider } from 'react-admin';
/**
 * Hook to subscribe to the events for a custom topic
 * on mount (and unsubscribe on unmount).
 *
 * @example // Auto-Updated Messages Component
 *
 * const MessageComponent: FC<Props> = (props) => {
 *     const notify = useNotify();
 *     const [messages, updateMessages] = useState([]);
 *     useSubscribe('messageEvent', (event) => {
 *         updateMessages([event, ...messages]);
 *         notify('new message');
 *     });
 *     return (
 *         <Card {...props}>
 *             <Messages list={messages} />
 *         </Card>;
 *     ):
 * };
 */
var useSubscribe = function (topic, subscriptionCallback) {
    var dataProvider = useDataProvider();
    useEffect(function () {
        if (!dataProvider || !topic || !subscriptionCallback) {
            return;
        }
        dataProvider.subscribe(topic, subscriptionCallback);
        return function () {
            return dataProvider.unsubscribe(topic, subscriptionCallback);
        };
    }, [dataProvider, topic, subscriptionCallback]);
};
export default useSubscribe;
