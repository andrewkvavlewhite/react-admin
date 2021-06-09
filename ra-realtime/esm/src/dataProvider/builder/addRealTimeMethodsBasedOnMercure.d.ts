import { DataProvider } from 'react-admin';
import { RealTimeDataProvider } from '../../types';
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
declare const addRealTimeMethodsBasedOnMercure: (dataProvider: DataProvider, mercureURL: string, jwt?: string, topicPrefix?: string) => DataProvider & RealTimeDataProvider;
export default addRealTimeMethodsBasedOnMercure;
