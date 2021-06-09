/* eslint-disable no-console */
import { DataProvider } from 'react-admin';
import { LocksDataProvider, Lock } from '../../types';

const LOCKS_RESOURCE_NAME = 'locks';

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
const addLocksMethodsBasedOnALockResource = (
    dataProvider: DataProvider,
    locksRessourceName: string = LOCKS_RESOURCE_NAME
): DataProvider & LocksDataProvider => {
    return {
        ...dataProvider,

        /**
         * Create a lock on a record
         *
         * @param {string} resource A React-Admin resource name
         * @param {Lock} data The data used to create a lock
         *
         * @returns A promise resolved with the created lock
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
         */
        lock: async (resource: string, data: Lock): Promise<any> => {
            const { recordId, identity } = data;
            const createdAt = new Date();

            const { total } = await dataProvider.getList(locksRessourceName, {
                pagination: { page: 1, perPage: 1 },
                sort: { field: 'id', order: 'ASC' },
                filter: {
                    resource,
                    recordId,
                },
            });

            if (total > 0) {
                return Promise.reject(
                    new Error('ra-realtime.error.lock.lockedBySomeoneElse')
                );
            }

            return dataProvider.create(locksRessourceName, {
                data: {
                    identity,
                    resource,
                    recordId,
                    createdAt,
                },
            });
        },

        /**
         * Unlock a record
         *
         * @param {string} resource A React-Admin resource name
         * @param {Lock} data The data used to remove a lock
         *
         * @returns A promise resolved with the removed lock
         *
         * @example
         *
         * const locksDataProvider = addLocksMethods(dataProvider);
         *
         * await locksDataProvider.unlock('post', {
         *     recordId: 143,
         *     identity: 'adrien' // It could be an authentication token
         * });
         *
         */
        unlock: async (resource: string, data: Lock): Promise<any> => {
            const { recordId, identity } = data;

            const { data: locks, total } = await dataProvider.getList(
                locksRessourceName,
                {
                    pagination: { page: 1, perPage: 1 },
                    sort: { field: 'id', order: 'ASC' },
                    filter: {
                        resource,
                        recordId,
                    },
                }
            );

            if (total === 0) {
                return Promise.reject(
                    new Error('ra-realtime.error.lock.noLock')
                );
            }

            if (locks[0].identity !== identity) {
                return Promise.reject(
                    new Error('ra-realtime.error.lock.cannotUnlock')
                );
            }

            const currentLock = locks[0];
            return dataProvider.delete(locksRessourceName, {
                id: currentLock.id,
                previousData: {
                    ...currentLock,
                },
            });
        },

        /**
         * Get an existing lock on a record
         *
         * @param {string} resource A React-Admin resource name
         * @param {Lock} data The data used to get a lock
         *
         * @returns A promise resolved with the lock
         *
         * @example
         *
         * const locksDataProvider = addLocksMethods(dataProvider);
         *
         * await locksDataProvider.getLock('post', {
         *     recordId: 143,
         * });
         *
         */
        getLock: async (resource: string, data: Lock): Promise<any> => {
            const { recordId } = data;

            const { data: locks, total } = await dataProvider.getList(
                locksRessourceName,
                {
                    pagination: { page: 1, perPage: 1 },
                    sort: { field: 'id', order: 'ASC' },
                    filter: {
                        resource,
                        recordId,
                    },
                }
            );

            if (total === 0) {
                return Promise.reject(
                    new Error('ra-realtime.error.lock.noLock')
                );
            }
            return Promise.resolve({ data: locks[0] });
        },

        /**
         * Get the list of locks for a resource
         *
         * @param {string} resource A React-Admin resource name
         *
         * @returns A promise resolved with the locks
         *
         * @example
         *
         * const locksDataProvider = addLocksMethods(dataProvider);
         *
         * await locksDataProvider.getLocks('post');
         *
         */
        getLocks: async (resource: string): Promise<any> => {
            return dataProvider.getList(locksRessourceName, {
                // "pagination" and "sort" field are required by getList
                pagination: { page: 1, perPage: 1000 },
                sort: { field: 'id', order: 'ASC' },
                filter: {
                    resource,
                },
            });
        },
    };
};

export default addLocksMethodsBasedOnALockResource;
