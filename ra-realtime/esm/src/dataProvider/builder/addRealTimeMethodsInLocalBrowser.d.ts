import { DataProvider } from 'react-admin';
import { RealTimeDataProvider } from '../../types';
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
declare const addRealTimeMethodsInLocalBrowser: (dataProvider: DataProvider) => DataProvider & RealTimeDataProvider;
export default addRealTimeMethodsInLocalBrowser;
