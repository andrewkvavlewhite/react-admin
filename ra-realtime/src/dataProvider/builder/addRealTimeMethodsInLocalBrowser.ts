/* eslint-disable no-console */
import { DataProvider } from 'react-admin';
import { RealTimeDataProvider, Subscriptions } from '../../types';

/**
 * Add realTime methods to a dataProvider based on a local event bus.
 *
 * The publish/subscribe events happen only in the current browser tab - no
 * event broadcasting to other clients. This is done only for testing purposes.
 *
 * @param {DataProvider} dataProvider The dataProvider to augment
 * @returns {DataProvider}
 *
 * @warning Do not use in production.
 *
 * @example
 *
 * const realTimeDataProvider = addRealTimeMethodsInLocalBrowser(dataProvider);
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
const addRealTimeMethodsInLocalBrowser = (
    dataProvider: DataProvider
): DataProvider & RealTimeDataProvider => {
    let subscriptions: Subscriptions = [];

    return {
        ...dataProvider,

        subscribe: async (topic, subscriptionCallback): Promise<any> => {
            subscriptions.push({ topic, subscriptionCallback });
            console.log(`Subscribed to topic ${topic}`);
            return Promise.resolve({ data: null });
        },

        unsubscribe: async (topic, subscriptionCallback): Promise<any> => {
            subscriptions = subscriptions.filter(
                subscription =>
                    subscription.topic !== topic ||
                    subscription.subscriptionCallback !== subscriptionCallback
            );
            console.log(`Unsubscribed from topic ${topic}`);
            return Promise.resolve({ data: null });
        },

        publish: (topic, event): Promise<any> => {
            if (!topic) {
                return Promise.reject(new Error('ra-realtime.error.topic'));
            }
            if (!event.type) {
                return Promise.reject(new Error('ra-realtime.error.type'));
            }
            console.log(`Published to topic ${topic}`);
            subscriptions.map(subscription => {
                topic === subscription.topic &&
                    subscription.subscriptionCallback(event);
                topic === subscription.topic &&
                    console.log(
                        `Executer listener ${subscription.subscriptionCallback.toString()}`,
                        event
                    );
            });
            return Promise.resolve({ data: null });
        },
    };
};

export default addRealTimeMethodsInLocalBrowser;
