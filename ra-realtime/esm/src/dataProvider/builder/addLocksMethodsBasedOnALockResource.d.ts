import { DataProvider } from 'react-admin';
import { LocksDataProvider } from '../../types';
/**
 * Add locks methods to a dataProvider based on a lock resource which has been declared in the admin.
 *
 * A lock is a semaphore for the unique combinaison (resource, record id). For example "posts/12" is unique.
 *
 * Thanks to the methods provided by this helper, you can list, create and delete the semaphores on a resource.
 *
 * A lock is composed of the following keys:
 * - `id`: a unique identifier. For example "posts/28".
 * - `resource`: the resource to lock. For example "posts".
 * - `recordId`: the record id to lock. For example "28".
 * - `createdAt`: the creation date. For example "2020/09/29 23:00"
 * - `identity`: the lock's owner. For example "Adrien". It could be an auth token.
 *
 * @param {DataProvider} dataProvider The dataProvider to augment
 * @param {string} locksRessourceName The name of the resource used to store locks. Default to "locks".
 * @returns {DataProvider}
 *
 * @example
 *
 * const locksDataProvider = addLocksMethods(dataProvider);
 *
 * await locksDataProvider.lock('post', {
 *     recordId: 143,
 *     identity: 'adrien' // It could be an authentication token
 * });
 *
 * await locksDataProvider.unlock('post', {
 *     recordId: 143,
 *     identity: 'adrien'
 * });
 *
 */
declare const addLocksMethodsBasedOnALockResource: (dataProvider: DataProvider, locksRessourceName?: string) => DataProvider & LocksDataProvider;
export default addLocksMethodsBasedOnALockResource;
