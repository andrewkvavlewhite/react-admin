"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_admin_1 = require("react-admin");
var react_redux_1 = require("react-redux");
var actions_1 = require("../actions");
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
    var dataProvider = react_admin_1.useDataProvider();
    var dispatch = react_redux_1.useDispatch();
    var _a = react_1.useState(true), loading = _a[0], setLoading = _a[1];
    var _b = react_1.useState(null), error = _b[0], setError = _b[1];
    // Use lock from the state
    // This way we can claim the lock when the current one is unlocked
    var data = react_redux_1.useSelector(function (state) {
        return typeof state.locks[resource] === 'undefined'
            ? undefined
            : state.locks[resource][recordId];
    });
    react_1.useEffect(function () {
        // If there's no lock, or if the lock identity is not the same
        // We can claim lock
        if (!data || data.identity !== identity) {
            setLoading(true);
            dispatch({
                type: actions_1.LOCK_LOADING,
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
                    type: actions_1.LOCK_SUCCESS,
                    payload: {
                        data: lock,
                    },
                    meta: {
                        resource: resource,
                        recordId: recordId,
                        fetchResponse: actions_1.LOCK,
                    },
                });
                if ((options === null || options === void 0 ? void 0 : options.onSuccess) != null) {
                    options.onSuccess(lock);
                }
            })
                .catch(function (error) {
                // Get the existing lock in case of failure
                dispatch({
                    type: actions_1.LOCK_FAILURE,
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
                    type: actions_1.GET_LOCK_LOADING,
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
                        type: actions_1.GET_LOCK_SUCCESS,
                        payload: {
                            data: lock,
                        },
                        meta: {
                            resource: resource,
                            recordId: recordId,
                            fetchResponse: actions_1.GET_LOCK,
                        },
                    });
                })
                    .catch(function () {
                    dispatch({
                        type: actions_1.GET_LOCK_FAILURE,
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
                type: actions_1.UNLOCK_LOADING,
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
                    type: actions_1.UNLOCK_SUCCESS,
                    payload: {
                        data: lock,
                    },
                    meta: {
                        fetchResponse: actions_1.UNLOCK,
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
                    type: actions_1.UNLOCK_FAILURE,
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
exports.default = useLock;
