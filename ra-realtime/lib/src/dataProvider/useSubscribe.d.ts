import { SubscriptionCallback, Event } from '../types';
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
declare const useSubscribe: (topic: string, subscriptionCallback: SubscriptionCallback<Event>) => void;
export default useSubscribe;
