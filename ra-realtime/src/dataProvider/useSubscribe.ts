import { useEffect } from 'react';
import { useDataProvider, DataProvider } from 'react-admin';

import { SubscriptionCallback, Event, RealTimeDataProvider } from '../types';

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
const useSubscribe = (
    topic: string,
    subscriptionCallback: SubscriptionCallback<Event>
): void => {
    const dataProvider = useDataProvider() as DataProvider &
        RealTimeDataProvider;
    useEffect(() => {
        if (!dataProvider || !topic || !subscriptionCallback) {
            return;
        }

        dataProvider.subscribe(topic, subscriptionCallback);
        return (): Promise<void> =>
            dataProvider.unsubscribe(topic, subscriptionCallback);
    }, [dataProvider, topic, subscriptionCallback]);
};

export default useSubscribe;
