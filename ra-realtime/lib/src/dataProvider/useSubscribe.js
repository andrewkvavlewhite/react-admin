"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_admin_1 = require("react-admin");
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
    var dataProvider = react_admin_1.useDataProvider();
    react_1.useEffect(function () {
        if (!dataProvider || !topic || !subscriptionCallback) {
            return;
        }
        dataProvider.subscribe(topic, subscriptionCallback);
        return function () {
            return dataProvider.unsubscribe(topic, subscriptionCallback);
        };
    }, [dataProvider, topic, subscriptionCallback]);
};
exports.default = useSubscribe;
