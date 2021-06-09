import { EventSourcePolyfill } from 'event-source-polyfill';
import debounce from 'lodash/debounce';
import { DataProvider } from 'react-admin';
import {
    RealTimeDataProvider,
    Event,
    EventSources,
    Subscriptions,
} from '../../types';

/**
 * Add realTime methods to a dataProvider based on a Mercure Hub inside API-Platform.
 *
 * @see https://mercure.rocks/
 * @see https://api-platform.com/docs/core/mercure/#creating-async-apis-using-the-mercure-protocol
 *
 * @param {DataProvider} dataProvider The dataProvider to augment
 * @param {string} mercureURL The adress of the Mercure Hub
 * @param {string} jwt The JWT to connect to the Mercure Hub
 * @param {string} topicPrefix The prefix used for each subcription topic
 *
 * @example
 *
 * const realTimeDataProvider = addRealTimeMethodsBasedOnApiPlatform(
 *     dataProvider,
 *     'eyJhbGciOiJIUzI1NiJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdLCJzdWJzY3JpYmUiOlsiKiJdfX0.SWKHNF9wneXTSjBg81YN5iH8Xb2iTf_JwhfUY5Iyhsw',
 *     'http://path.to.my.api/.well-known/mercure'
 * );
 *
 * await realTimeDataProvider.subscribe('resource/post', (event) => {
 *    console.log(`Post ${event.payload.id} modified`);
 * });
 *
 * await realTimeDataProvider.publish('resource/post', {
 *     topic: 'resource/post',
 *     type: 'updated',
 *     payload: { id: 1234 }
 * })
 */
const addRealTimeMethodsBasedOnApiPlatform = (
    dataProvider: DataProvider,
    mercureURL = 'https://localhost:1337/.well-known/mercure',
    jwt = null,
    topicPrefix = 'https://localhost:8443'
): DataProvider & RealTimeDataProvider => {
    let subscriptions: Subscriptions = [];
    const eventSources: EventSources = {};

    const openEventSource = debounce(topic => {
        const url = new URL(mercureURL);
        url.searchParams.append(
            'topic',
            `${topicPrefix}${transformTopicFromRaRealtime(topic)}`
        );

        return new Promise((resolve, reject) => {
            let eventSource = eventSources[topic];
            if (!eventSource) {
                const params =
                    jwt !== null
                        ? { headers: { Authorization: `Bearer ${jwt}` } }
                        : {};

                eventSource = new EventSourcePolyfill(url, params);

                eventSource.onmessage = event => {
                    const callbackEvent = transformEventFromApiPlatform(
                        event,
                        topic
                    );

                    subscriptions.map(subscription => {
                        if (subscription.topic === topic) {
                            subscription.subscriptionCallback(callbackEvent);
                        }
                    });
                };

                eventSource.onopen = () => {
                    resolve({ data: true });
                };

                eventSource.onerror = error => {
                    console.warn('EventSource error: ', error);
                    reject(error);
                };
                eventSources[topic] = eventSource; // Store the event source
            } else {
                // The event source already exists
                resolve({ data: true });
            }
        });
    }, 500);

    const closeEventSource = topic => {
        if (eventSources[topic] && eventSources[topic].close) {
            eventSources[topic].close();
            delete eventSources[topic]; // Delete the event source
        }
        return Promise.resolve({ data: true });
    };

    return {
        ...dataProvider,

        subscribe: async (topic, subscriptionCallback) => {
            const hasAlreadySubscribed = !!subscriptions.find(
                subscription =>
                    subscription.topic === topic &&
                    subscription.subscriptionCallback !== subscriptionCallback
            );
            if (hasAlreadySubscribed) {
                // Don't subscribe the same event several times
                return Promise.resolve({ data: true });
            }

            subscriptions.push({
                topic,
                subscriptionCallback,
            });

            return openEventSource(topic);
        },

        unsubscribe: async (topic, subscriptionCallback) => {
            subscriptions = subscriptions.filter(subscription => {
                return (
                    subscription.topic !== topic ||
                    subscription.subscriptionCallback !== subscriptionCallback
                );
            });

            return closeEventSource(topic);
        },

        publish: (): Promise<any> => {
            // Push events should be triggered by API-Platform
            return Promise.resolve();
        },
    };
};

export default addRealTimeMethodsBasedOnApiPlatform;

/**
 * Transform a topic written using the ra-realtime convention
 * into a topic following the API-Platform convention
 *
 * @param {*} topic The topic in ra-realtime format
 *
 * @returns A topic translated using API-Platform convention
 *
 * @example Subscribe to a record
 *
 * => Format of the ra-realtime topic: `resource/${resource}/${id}`
 * => Format of the id: `/${resource}/${originId}`
 * Should be passed to API-Platform as: `/${resource}/${originId}`
 *
 * @example Subscribe to a list:
 *
 * Format of the ra-realtime topic: `resource/${resource}`
 * => Should be passed to API-Platform as: `/${resource}/{id}`
 *
 * Note that {id} is not interpreted. It's a string meaning all the resource events.
 *
 */
function transformTopicFromRaRealtime(topic: string): string {
    const [_, resource, ...id] = topic.split('/');
    if (!id || id.length === 0) {
        return `/${resource}/{id}`;
    }
    const originId = id[2];
    return `/${resource}/${originId}`;
}

/**
 * Transform an event emitted by API-Platform to add a ra-realtime event type.
 *
 * The event type could be "updated" or "deleted". Creating an element is considered as an update.
 *
 * @param {*} event The event in API-Platform format
 * @param {*} topic The topic
 *
 * @returns An augmented event for ra-realtime
 *
 */
function transformEventFromApiPlatform(event: any, topic: string): Event {
    const eventData = JSON.parse(event.data);
    const type = eventData['@type'] != null ? 'updated' : 'deleted';

    return {
        ...eventData,
        type,
        topic,
    };
}
