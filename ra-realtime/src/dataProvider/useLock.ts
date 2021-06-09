import { useState, useEffect } from 'react';
import { useDataProvider, DataProvider, Identifier } from 'react-admin';

import { useDispatch, useSelector } from 'react-redux';

import {
    LOCK,
    LOCK_LOADING,
    LOCK_SUCCESS,
    LOCK_FAILURE,
    UNLOCK,
    UNLOCK_LOADING,
    UNLOCK_SUCCESS,
    UNLOCK_FAILURE,
    GET_LOCK,
    GET_LOCK_LOADING,
    GET_LOCK_SUCCESS,
    GET_LOCK_FAILURE,
} from '../actions';

import { LocksDataProvider, UseLock, UseLockOptions } from '../types';

/**
 * Hook to lock a record on mount. The record is unlocked when unmounting the component.
 * Be careful, you cannot have two locks on the same record.
 * If you just want to get the current lock (for example to display a warning),
 * please use the `useHasLock` hook instead.
 *
 * @param {string} resource The resource to lock
 * @param {any} recordId The record id to lock
 * @param {string} identity The identity of the locker
 * @param {Object} options Options applied to the lock / unlock mechanism
 * @param {Function} options.onSuccess Side effect function to be executed upon lock success, e.g. `{ onSuccess: () => notify('ra-realtime.notification.lock.lockedByMe') } }`
 * @param {Function} options.onFailure Side effect function to be executed upon lock failure, e.g. `{ onFailure: error => notify(error) } }`
 * @param {Function} options.onUnlockSuccess Side effect function to be executed upon unlock success, e.g. `{ onUnlockSuccess: () => notify('ra-realtime.notification.lock.unlocked') } }`
 * @param {Function} options.onUnlockFailure Side effect function to be executed upon unlock failure, e.g. `{ onUnlockFailure: error => notify(error) } }`
 *
 * @returns The current request state. Destructure as `{ data, error, loading, loaded }`.
 *
 * @example Simple Usage
 *
 * const MyLockedEditView: FC<any> = props => {
 *     const { resource, id } = props;
 *
 *     const { loading } = useLock(resource, id, 'mario');
 *
 *     if (loading) {
 *         return <CircularProgress />;
 *     }
 *
 *     return (
 *         <Edit {...props}>
 *             <SimpleForm>
 *                 <TextInput source="title" />
 *             </SimpleForm>
 *         </Edit>
 *     );
 * };
 *
 */
function useLock(
    resource: string,
    recordId: Identifier,
    identity: string,
    options?: UseLockOptions
): UseLock {
    const dataProvider = useDataProvider() as DataProvider & LocksDataProvider;
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Use lock from the state
    // This way we can claim the lock when the current one is unlocked
    const data = useSelector(state => {
        return typeof state.locks[resource] === 'undefined'
            ? undefined
            : state.locks[resource][recordId];
    });

    useEffect(() => {
        // If there's no lock, or if the lock identity is not the same
        // We can claim lock
        if (!data || data.identity !== identity) {
            setLoading(true);

            dispatch({
                type: LOCK_LOADING,
                payload: {},
                meta: {
                    resource,
                    recordId,
                },
            });

            dataProvider
                .lock(resource, {
                    resource,
                    recordId,
                    identity,
                })
                .then(({ data: lock }) => {
                    // Set directly the lock in case of success

                    dispatch({
                        type: LOCK_SUCCESS,
                        payload: {
                            data: lock,
                        },
                        meta: {
                            resource,
                            recordId,
                            fetchResponse: LOCK,
                        },
                    });

                    if (options?.onSuccess != null) {
                        options.onSuccess(lock);
                    }
                })
                .catch(error => {
                    // Get the existing lock in case of failure
                    dispatch({
                        type: LOCK_FAILURE,
                        payload: {},
                        meta: {
                            resource,
                            recordId,
                        },
                    });

                    setError(error);

                    if (options?.onFailure != null) {
                        options.onFailure(error);
                    }

                    dispatch({
                        type: GET_LOCK_LOADING,
                        payload: {},
                        meta: {
                            resource,
                            recordId,
                        },
                    });

                    return dataProvider
                        .getLock(resource, {
                            resource,
                            recordId,
                            identity,
                        })
                        .then(({ data: lock }) => {
                            dispatch({
                                type: GET_LOCK_SUCCESS,
                                payload: {
                                    data: lock,
                                },
                                meta: {
                                    resource,
                                    recordId,
                                    fetchResponse: GET_LOCK,
                                },
                            });
                        })
                        .catch(() => {
                            dispatch({
                                type: GET_LOCK_FAILURE,
                                payload: {},
                                meta: {
                                    resource,
                                    recordId,
                                },
                            });
                        });
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        // Called on unmount to remove the lock
        const unlockOnUnmount = (): void => {
            // Resource is already unlocked during the unmount
            // So we ignore it
            if (!data) {
                return;
            }

            dispatch({
                type: UNLOCK_LOADING,
                payload: {},
                meta: {
                    resource,
                    recordId,
                },
            });
            dataProvider
                .unlock(resource, {
                    resource,
                    recordId,
                    identity,
                })
                .then(({ data: lock }) => {
                    dispatch({
                        type: UNLOCK_SUCCESS,
                        payload: {
                            data: lock,
                        },
                        meta: {
                            fetchResponse: UNLOCK,
                            resource,
                            recordId,
                        },
                    });
                    if (options?.onUnlockSuccess != null) {
                        options.onUnlockSuccess(lock);
                    }
                })
                .catch(error => {
                    dispatch({
                        type: UNLOCK_FAILURE,
                        payload: {},
                        meta: {
                            resource,
                            recordId,
                        },
                    });
                    if (options?.onUnlockFailure != null) {
                        options?.onUnlockFailure(error);
                    }
                });
        };

        return unlockOnUnmount;
    }, [data && data.identity]); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        loading,
        loaded: !loading && (data != null || error != null),
        error,
        data,
    };
}

export default useLock;
