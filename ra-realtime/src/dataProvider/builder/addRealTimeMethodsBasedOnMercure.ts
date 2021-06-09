import { EventSourcePolyfill } from 'event-source-polyfill';
import qs from 'querystring';
import debounce from 'lodash/debounce';
import { DataProvider } from 'react-admin';

import { RealTimeDataProvider, Event, Subscriptions } from '../../types';

/**
 * Add realTime methods to a dataProvider based on a Mercure Hub.
 *
 * @see https://mercure.rocks/
 *
 * @param {DataProvider} dataProvider The dataProvider to augment
 * @param {string} mercureURL The adress of the Mercure hub
 * @param {string} jwt The JWT to connect to Mercure hub
 * @param {string} topicPrefix The prefix used for each subcription topics (without slash at the end)
 *
 * @example
 *
 * const realTimeDataProvider = addRealTimeMethodsBasedOnMercure(
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
const addRealTimeMethodsBasedOnMercure = (
    dataProvider: DataProvider,
    mercureURL: string,
    jwt = 'set_jwt_key',
    topicPrefix = 'http://localhost/mercure'
): DataProvider & RealTimeDataProvider => {
    let subscriptions: Subscriptions = [];
    let eventSource: EventSourcePolyfill;

    const openEventSource = debounce((): Promise<any> => {
        eventSource && eventSource.close && eventSource.close();
        const url = new URL(mercureURL);
        const topics = Array.from(
            new Set(subscriptions.map(subscription => subscription.topic))
        );
        topics.forEach(topic =>
            url.searchParams.append('topic', `${topicPrefix}/${topic}`)
        );
        return new Promise((resolve, reject) => {
            eventSource = new EventSourcePolyfill(url, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            eventSource.onmessage = (e: any): void => {
                const event: Event = JSON.parse(e.data);
                subscriptions.map(subscription => {
                    event.topic === subscription.topic &&
                        subscription.subscriptionCallback(event);
                });
            };

            eventSource.onopen = (): any => resolve({ data: true });

            eventSource.onerror = (err): void => {
                // eslint-disable-next-line no-console
                console.warn('EventSource error: ', err);
                reject(err);
            };
            return { data: true };
        });
    }, 500);

    const setPromise = (error?: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            if (error) {
                return reject(error);
            }
            try {
                return { data: true };
            } catch (e) {
                return reject(e);
            }
        });
    };

    const pushEvent = (topic: string, payload: string): Promise<any> => {
        const body = {
            topic: `${topicPrefix}/${topic}`,
            data: payload,
        };

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${jwt}`,
        };

        return fetch(mercureURL, {
            method: 'POST',
            body: qs.stringify(body),
            headers,
        })
            .then(mercureRes => {
                console.log('Push mercure done'); // eslint-disable-line no-console
                console.log(mercureRes); // eslint-disable-line no-console
                return { data: true };
            })
            .catch(mercureError => {
                return { data: new Error(mercureError) };
            });
    };

    return {
        ...dataProvider,

        subscribe: async (topic, subscriptionCallback): Promise<any> => {
            subscriptions.push({ topic, subscriptionCallback });
            return openEventSource();
        },

        unsubscribe: async (topic, subscriptionCallback): Promise<any> => {
            subscriptions = subscriptions.filter(
                subscription =>
                    subscription.topic !== topic ||
                    subscription.subscriptionCallback !== subscriptionCallback
            );
            return openEventSource();
        },

        publish: (topic, event): Promise<any> => {
            if (!topic) {
                return setPromise(new Error('ra-realtime.error.topic'));
            }
            if (!event.type) {
                return setPromise(new Error('ra-realtime.error.type'));
            }
            const payload = JSON.stringify(event);
            return pushEvent(topic, payload);
        },
    };
};

export default addRealTimeMethodsBasedOnMercure;
