import { DataProvider } from 'react-admin';
import { RealTimeDataProvider } from '../../types';
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
declare const addRealTimeMethodsBasedOnApiPlatform: (dataProvider: DataProvider, mercureURL?: string, jwt?: any, topicPrefix?: string) => DataProvider & RealTimeDataProvider;
export default addRealTimeMethodsBasedOnApiPlatform;
