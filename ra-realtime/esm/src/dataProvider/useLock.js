import { useState, useEffect } from 'react';
import { useDataProvider } from 'react-admin';
import { useDispatch, useSelector } from 'react-redux';
import { LOCK, LOCK_LOADING, LOCK_SUCCESS, LOCK_FAILURE, UNLOCK, UNLOCK_LOADING, UNLOCK_SUCCESS, UNLOCK_FAILURE, GET_LOCK, GET_LOCK_LOADING, GET_LOCK_SUCCESS, GET_LOCK_FAILURE, } from '../actions';
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
function useLock(resource, recordId, identity, options) {
    var dataProvider = useDataProvider();
    var dispatch = useDispatch();
    var _a = useState(true), loading = _a[0], setLoading = _a[1];
    var _b = useState(null), error = _b[0], setError = _b[1];
    // Use lock from the state
    // This way we can claim the lock when the current one is unlocked
    var data = useSelector(function (state) {
        return typeof state.locks[resource] === 'undefined'
            ? undefined
            : state.locks[resource][recordId];
    });
    useEffect(function () {
        // If there's no lock, or if the lock identity is not the same
        // We can claim lock
        if (!data || data.identity !== identity) {
            setLoading(true);
            dispatch({
                type: LOCK_LOADING,
                payload: {},
                meta: {
                    resource: resource,
                    recordId: recordId,
                },
            });
            dataProvider
                .lock(resource, {
                resource: resource,
                recordId: recordId,
                identity: identity,
            })
                .then(function (_a) {
                // Set directly the lock in case of success
                var lock = _a.data;
                dispatch({
                    type: LOCK_SUCCESS,
                    payload: {
                        data: lock,
                    },
                    meta: {
                        resource: resource,
                        recordId: recordId,
                        fetchResponse: LOCK,
                    },
                });
                if ((options === null || options === void 0 ? void 0 : options.onSuccess) != null) {
                    options.onSuccess(lock);
                }
            })
                .catch(function (error) {
                // Get the existing lock in case of failure
                dispatch({
                    type: LOCK_FAILURE,
                    payload: {},
                    meta: {
                        resource: resource,
                        recordId: recordId,
                    },
                });
                setError(error);
                if ((options === null || options === void 0 ? void 0 : options.onFailure) != null) {
                    options.onFailure(error);
                }
                dispatch({
                    type: GET_LOCK_LOADING,
                    payload: {},
                    meta: {
                        resource: resource,
                        recordId: recordId,
                    },
                });
                return dataProvider
                    .getLock(resource, {
                    resource: resource,
                    recordId: recordId,
                    identity: identity,
                })
                    .then(function (_a) {
                    var lock = _a.data;
                    dispatch({
                        type: GET_LOCK_SUCCESS,
                        payload: {
                            data: lock,
                        },
                        meta: {
                            resource: resource,
                            recordId: recordId,
                            fetchResponse: GET_LOCK,
                        },
                    });
                })
                    .catch(function () {
                    dispatch({
                        type: GET_LOCK_FAILURE,
                        payload: {},
                        meta: {
                            resource: resource,
                            recordId: recordId,
                        },
                    });
                });
            })
                .finally(function () {
                setLoading(false);
            });
        }
        // Called on unmount to remove the lock
        var unlockOnUnmount = function () {
            // Resource is already unlocked during the unmount
            // So we ignore it
            if (!data) {
                return;
            }
            dispatch({
                type: UNLOCK_LOADING,
                payload: {},
                meta: {
                    resource: resource,
                    recordId: recordId,
                },
            });
            dataProvider
                .unlock(resource, {
                resource: resource,
                recordId: recordId,
                identity: identity,
            })
                .then(function (_a) {
                var lock = _a.data;
                dispatch({
                    type: UNLOCK_SUCCESS,
                    payload: {
                        data: lock,
                    },
                    meta: {
                        fetchResponse: UNLOCK,
                        resource: resource,
                        recordId: recordId,
                    },
                });
                if ((options === null || options === void 0 ? void 0 : options.onUnlockSuccess) != null) {
                    options.onUnlockSuccess(lock);
                }
            })
                .catch(function (error) {
                dispatch({
                    type: UNLOCK_FAILURE,
                    payload: {},
                    meta: {
                        resource: resource,
                        recordId: recordId,
                    },
                });
                if ((options === null || options === void 0 ? void 0 : options.onUnlockFailure) != null) {
                    options === null || options === void 0 ? void 0 : options.onUnlockFailure(error);
                }
            });
        };
        return unlockOnUnmount;
    }, [data && data.identity]); // eslint-disable-line react-hooks/exhaustive-deps
    return {
        loading: loading,
        loaded: !loading && (data != null || error != null),
        error: error,
        data: data,
    };
}
export default useLock;
